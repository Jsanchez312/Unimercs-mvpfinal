const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Sin token de autenticación' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unimercs_super_secreto_2025');
    
    // Verificar en base de datos si el usuario sigue activo (HU-02 / HU-16)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    if (user.status === 'banned') {
      return res.status(403).json({ message: 'Tu cuenta ha sido baneada permanentemente por infringir las normas de la comunidad.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Tu cuenta se encuentra temporalmente suspendida.' });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

const optionalAuth = async function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unimercs_super_secreto_2025');
    const user = await User.findById(decoded.id);
    if (user && user.status === 'active') {
      req.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified
      };
    } else {
      req.user = null;
    }
  } catch {
    req.user = null;
  }
  next();
};

const adminOnly = function (req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: se requieren permisos de Administrador.' });
  }
  next();
};

module.exports = { protect, optionalAuth, adminOnly };