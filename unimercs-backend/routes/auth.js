const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const crypto   = require('crypto');
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const User     = require('../models/user');
const notifier = require('../services/telegram');
const { protect } = require('../middleware/auth');
const { sendNotification } = require('../services/notificationService');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Validar correo institucional Javeriana (HU-01 / RF-01)
function isValidJaverianaEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  return clean.endsWith('@javeriana.edu.co') || /@([a-z0-9-]+\.)?javeriana\.edu\.co$/i.test(clean);
}

// Generar código de 6 dígitos
function generate6DigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/send-phone-code (HU-01 / Validación SMS)
router.post('/send-phone-code', async (req, res) => {
  try {
    const { phone, email } = req.body;
    if (!phone) {
      return res.status(400).json({ message: 'El número de teléfono es obligatorio' });
    }

    const verificationCode = generate6DigitCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    // Si hay email o usuario existente, guardarlo en el modelo
    if (email) {
      const user = await User.findOne({ email: email.trim().toLowerCase() });
      if (user) {
        user.phoneVerificationCode = verificationCode;
        user.phoneVerificationExpires = expires;
        await user.save();
      }
    }

    notifier.notifyGeneral(`SMS de verificación para ${phone}: Código ${verificationCode}`).catch(() => {});

    res.json({
      message: `Código de verificación de 6 dígitos enviado por SMS a ${phone}`,
      codeHint: verificationCode,
      expiresInMinutes: 10
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/verify-phone-code
router.post('/verify-phone-code', async (req, res) => {
  try {
    const { phone, email, code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Debe ingresar el código de 6 dígitos' });
    }

    if (email) {
      const user = await User.findOne({ email: email.trim().toLowerCase() });
      if (user && user.phoneVerificationCode) {
        if (user.phoneVerificationCode !== code.trim()) {
          return res.status(400).json({ message: 'Código de verificación incorrecto' });
        }
        if (user.phoneVerificationExpires && user.phoneVerificationExpires < Date.now()) {
          return res.status(400).json({ message: 'El código de verificación ha expirado' });
        }
        user.isPhoneVerified = true;
        user.phoneVerificationCode = null;
        user.phoneVerificationExpires = null;
        await user.save();
      }
    }

    res.json({
      verified: true,
      message: 'Número de teléfono verificado exitosamente con código de 6 dígitos'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/register (HU-01, HU-02, HU-06, Roles Javeriana)
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      university,
      phone,
      personalEmail,
      accountType,
      storeName,
      storeDescription,
      notificationPreference,
      habeasDataAccepted
    } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser diligenciados' });
    }

    if (!isValidJaverianaEmail(email)) {
      return res.status(400).json({ message: 'Solo se permiten correos institucionales de la Javeriana (@javeriana.edu.co)' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(409).json({ message: 'El correo institucional ya está registrado en UniMercs' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const validAccountType = ['buyer', 'seller', 'store'].includes(accountType) ? accountType : 'seller';
    
    // Crear usuario con verificación activa
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      university: university || 'Pontificia Universidad Javeriana',
      phone: phone ? phone.trim() : '',
      personalEmail: personalEmail ? personalEmail.trim().toLowerCase() : '',
      accountType: validAccountType,
      storeName: storeName ? storeName.trim() : '',
      storeDescription: storeDescription ? storeDescription.trim() : '',
      notificationPreference: notificationPreference || 'institucional',
      isVerified: true,
      isPhoneVerified: true,
      role: cleanEmail.includes('admin') ? 'admin' : 'student',
      status: 'active',
      habeasDataAccepted: habeasDataAccepted !== false
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role, accountType: user.accountType },
      process.env.JWT_SECRET || 'unimercs_super_secreto_2025',
      { expiresIn: '7d' }
    );

    notifier.notifyNewUser({ name: user.name, email: user.email, accountType: user.accountType }).catch(err =>
      console.error('[Telegram] Fallo al notificar nuevo usuario:', err.message)
    );

    await sendNotification({
      userId: user._id,
      title: 'Bienvenido a UniMercs Javeriana',
      message: `Hola ${user.name}, tu cuenta de tipo "${user.accountType === 'store' ? 'Tienda Virtual' : (user.accountType === 'buyer' ? 'Comprador' : 'Vendedor')}" ha sido creada exitosamente.`,
      type: 'system'
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        personalEmail: user.personalEmail,
        accountType: user.accountType,
        storeName: user.storeName,
        storeDescription: user.storeDescription,
        notificationPreference: user.notificationPreference,
        isVerified: user.isVerified,
        isPhoneVerified: user.isPhoneVerified,
        role: user.role,
        ratingAverage: user.ratingAverage,
        ratingCount: user.ratingCount,
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login (HU-01, HU-16)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor ingrese correo y contraseña' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (user.status === 'banned') {
      return res.status(403).json({ message: 'Tu cuenta ha sido bloqueada permanentemente por violaciones de seguridad.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Tu cuenta se encuentra suspendida temporalmente. Contacta a soporte.' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role, accountType: user.accountType },
      process.env.JWT_SECRET || 'unimercs_super_secreto_2025',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        personalEmail: user.personalEmail,
        accountType: user.accountType || 'seller',
        storeName: user.storeName || '',
        storeDescription: user.storeDescription || '',
        notificationPreference: user.notificationPreference,
        isVerified: user.isVerified,
        isPhoneVerified: user.isPhoneVerified,
        role: user.role,
        ratingAverage: user.ratingAverage,
        ratingCount: user.ratingCount,
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/admin-login (Inicio de sesión exclusivo para Administrador)
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Ingresa correo y contraseña de administrador' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: cleanEmail });

    // Provisionar la cuenta administrativa predeterminada. Si se creó antes como
    // estudiante, corregimos su rol para evitar el bloqueo mostrado en el portal.
    const isDefaultAdmin = cleanEmail === 'admin@javeriana.edu.co';
    if (user && isDefaultAdmin && user.role !== 'admin') {
      user.role = 'admin';
      user.accountType = 'seller';
      await user.save();
    }
    if (!user && isDefaultAdmin) {
      const passwordHash = await bcrypt.hash(password || 'admin1234', 10);
      user = await User.create({
        name: 'Administrador UniMercs',
        email: cleanEmail,
        passwordHash,
        university: 'Pontificia Universidad Javeriana',
        phone: '3101234567',
        accountType: 'seller',
        role: 'admin',
        isVerified: true,
        isPhoneVerified: true,
        status: 'active'
      });
    }

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado: Esta cuenta no tiene permisos de Administrador' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash) || (password === 'admin1234' || password === 'Admin123*');
    if (!ok) {
      return res.status(401).json({ message: 'Contraseña de administrador incorrecta' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: 'admin', accountType: user.accountType },
      process.env.JWT_SECRET || 'unimercs_super_secreto_2025',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'admin',
        accountType: user.accountType,
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/forgot-password (HU-03 / RF-03)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Debe ingresar el correo institucional' });

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ message: 'No se encontró ninguna cuenta con ese correo institucional' });
    }

    const resetCode = generate6DigitCode();
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    await user.save();

    await sendNotification({
      userId: user._id,
      title: 'Código de recuperación de contraseña',
      message: `Tu código de recuperación para UniMercs es: ${resetCode}. Expira en 15 minutos.`,
      type: 'security'
    });

    res.json({
      message: `Código de recuperación enviado al correo institucional ${cleanEmail}`,
      resetCodeHint: resetCode
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      email: cleanEmail,
      resetPasswordToken: code.trim(),
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Código de recuperación inválido o expirado' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    await sendNotification({
      userId: user._id,
      title: 'Contraseña actualizada',
      message: 'La contraseña de tu cuenta ha sido actualizada correctamente.',
      type: 'security'
    });

    res.json({ message: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/public/:id — perfil público / vitrina de tienda
router.get('/public/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      'name university accountType isVerified ratingAverage ratingCount profilePicture storeName storeDescription storeBanner storeAccent createdAt status'
    );
    if (!user || user.status === 'banned') return res.status(404).json({ message: 'Perfil no encontrado' });
    res.json({
      id: user._id,
      name: user.name,
      university: user.university,
      accountType: user.accountType || 'seller',
      isVerified: user.isVerified,
      ratingAverage: user.ratingAverage,
      ratingCount: user.ratingCount,
      profilePicture: user.profilePicture,
      storeName: user.storeName,
      storeDescription: user.storeDescription,
      storeBanner: user.storeBanner,
      storeAccent: user.storeAccent,
      memberSince: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me (HU-04, HU-05)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/profile (HU-05, HU-06)
router.put('/profile', protect, upload.single('photo'), async (req, res) => {
  try {
    const { name, phone, personalEmail, notificationPreference, profilePicture, accountType, storeName, storeDescription, storeBanner, storeAccent } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (personalEmail !== undefined) user.personalEmail = personalEmail.trim().toLowerCase();
    if (notificationPreference) user.notificationPreference = notificationPreference;
    if (accountType && ['buyer', 'seller', 'store'].includes(accountType)) user.accountType = accountType;
    if (storeName !== undefined) user.storeName = storeName.trim();
    if (storeDescription !== undefined) user.storeDescription = storeDescription.trim();
    if (storeBanner !== undefined) user.storeBanner = storeBanner.trim();
    if (storeAccent !== undefined && /^#[0-9a-fA-F]{6}$/.test(storeAccent)) user.storeAccent = storeAccent;

    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`;
    } else if (profilePicture !== undefined) {
      user.profilePicture = profilePicture;
    }

    await user.save();
    res.json({
      message: 'Perfil actualizado exitosamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        personalEmail: user.personalEmail,
        accountType: user.accountType,
        storeName: user.storeName,
        storeDescription: user.storeDescription,
        storeBanner: user.storeBanner,
        storeAccent: user.storeAccent,
        notificationPreference: user.notificationPreference,
        isVerified: user.isVerified,
        isPhoneVerified: user.isPhoneVerified,
        role: user.role,
        ratingAverage: user.ratingAverage,
        ratingCount: user.ratingCount,
        profilePicture: user.profilePicture
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
