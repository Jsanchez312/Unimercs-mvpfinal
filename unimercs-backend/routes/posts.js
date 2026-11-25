const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const Post     = require('../models/post');
const User     = require('../models/user');
const { protect, optionalAuth } = require('../middleware/auth');
const notifier = require('../services/telegram');
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
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/posts (HU-08, RNF-04, RNF-05, RNF-11)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, condition, status, sellerId } = req.query;
    const filter = {};

    if (category && category !== 'all' && category !== 'todos') {
      const catAliases = {
        'books': ['books', 'libros', 'Libros', 'libro', 'textbooks'],
        'libros': ['books', 'libros', 'Libros', 'libro', 'textbooks'],
        'electronics': ['electronics', 'electrónica', 'electronica', 'Electrónica', 'Electronica'],
        'electrónica': ['electronics', 'electrónica', 'electronica', 'Electrónica', 'Electronica'],
        'electronica': ['electronics', 'electrónica', 'electronica', 'Electrónica', 'Electronica'],
        'computers': ['computers', 'computadores', 'computador', 'Computadores', 'laptops'],
        'computadores': ['computers', 'computadores', 'computador', 'Computadores', 'laptops'],
        'dorm': ['dorm', 'dormitorio', 'hogar', 'Dorm', 'Dormitorio', 'muebles'],
        'dormitorio': ['dorm', 'dormitorio', 'hogar', 'Dorm', 'Dormitorio', 'muebles'],
        'stationery': ['stationery', 'papelería', 'papeleria', 'Papelería', 'Papeleria'],
        'papelería': ['stationery', 'papelería', 'papeleria', 'Papelería', 'Papeleria'],
        'papeleria': ['stationery', 'papelería', 'papeleria', 'Papelería', 'Papeleria'],
        'fashion': ['fashion', 'moda', 'ropa', 'Moda', 'Moda y ropa', 'Moda y Ropa'],
        'moda': ['fashion', 'moda', 'ropa', 'Moda', 'Moda y ropa', 'Moda y Ropa'],
        'bikes': ['bikes', 'bicis', 'bicicletas', 'Bicis', 'Bicicletas', 'rides'],
        'bicis': ['bikes', 'bicis', 'bicicletas', 'Bicis', 'Bicicletas', 'rides'],
        'bicicletas': ['bikes', 'bicis', 'bicicletas', 'Bicis', 'Bicicletas', 'rides'],
        'tutoring': ['tutoring', 'tutorías', 'tutorias', 'Tutorías', 'Tutorias', 'gigs', 'servicios'],
        'tutorías': ['tutoring', 'tutorías', 'tutorias', 'Tutorías', 'Tutorias', 'gigs', 'servicios'],
        'tutorias': ['tutoring', 'tutorías', 'tutorias', 'Tutorías', 'Tutorias', 'gigs', 'servicios'],
        'other': ['other', 'otros', 'Otros', 'varios', 'gratis'],
        'otros': ['other', 'otros', 'Otros', 'varios', 'gratis'],
        'gratis': ['gratis', 'free', 'free stuff', 'otros', 'Otros']
      };
      const key = category.trim().toLowerCase();
      if (catAliases[key]) {
        filter.category = { $in: catAliases[key].map(c => new RegExp(`^${c}$`, 'i')) };
      } else {
        filter.category = { $regex: new RegExp(category.trim(), 'i') };
      }
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (condition && condition !== 'all' && condition !== 'cualquiera') {
      // Map aliases for backward compatibility:
      if (condition === 'barely used') {
        filter.condition = { $in: ['barely used', 'used_like_new'] };
      } else if (condition === 'used') {
        filter.condition = { $in: ['used', 'used_good', 'used_very_good', 'used_acceptable'] };
      } else {
        filter.condition = condition;
      }
    }
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (sellerId) {
      filter.sellerId = sellerId;
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

    // RNF-04: Proteger número de WhatsApp si el usuario NO ha iniciado sesión
    const sanitizedPosts = posts.map(p => {
      if (!req.user) {
        return { ...p, sellerPhone: 'Inicia sesión para ver el WhatsApp' };
      }
      return p;
    });

    res.json(sanitizedPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/posts/:id (HU-08, HU-11, HU-12)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

    // Incrementar contador de visualizaciones
    post.views = (post.views || 0) + 1;
    await post.save();

    const postObj = post.toObject();
    
    // Obtener información actualizada del vendedor
    const seller = await User.findById(post.sellerId);
    if (seller) {
      postObj.sellerRating = seller.ratingAverage || 5.0;
      postObj.sellerRatingCount = seller.ratingCount || 0;
      postObj.sellerVerified = seller.isVerified;
      postObj.sellerAccountType = seller.accountType || 'seller';
      postObj.sellerStoreName = seller.storeName || '';
      postObj.sellerProfilePicture = seller.profilePicture || '';
      postObj.sellerUniversity = seller.university || '';
    }

    // RNF-04: Ocultar teléfono si es usuario invitado
    if (!req.user) {
      postObj.sellerPhone = '';
      postObj.phoneLocked = true;
    } else {
      postObj.phoneLocked = false;
    }

    res.json(postObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/posts (HU-07 / RF-07)
router.post('/', protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
  try {
    const { title, category, condition, price, description, safeZone, phone, stock, sku } = req.body;
    if (!title || !category || !price) {
      return res.status(400).json({ message: 'Título, categoría y precio son obligatorios' });
    }

    const sellerUser = await User.findById(req.user.id);
    const sellerPhone = phone || sellerUser.phone || '';

    // Handle single or multiple images
    let uploadedImages = [];
    if (req.files) {
      if (req.files['image'] && req.files['image'][0]) {
        uploadedImages.push(`/uploads/${req.files['image'][0].filename}`);
      }
      if (req.files['images'] && Array.isArray(req.files['images'])) {
        uploadedImages.push(...req.files['images'].map(f => `/uploads/${f.filename}`));
      }
    } else if (req.file) {
      uploadedImages.push(`/uploads/${req.file.filename}`);
    }

    const imageUrl = uploadedImages[0] || (req.body.imageUrl || '');
    const images = uploadedImages.length ? uploadedImages : (req.body.images ? (Array.isArray(req.body.images) ? req.body.images : [req.body.images]) : (imageUrl ? [imageUrl] : []));
    const initialStock = stock !== undefined && stock !== '' ? Math.max(0, Number(stock)) : 1;

    const post = await Post.create({
      sellerId:       req.user.id,
      sellerName:     sellerUser.storeName || req.user.name,
      sellerEmail:    req.user.email,
      sellerPhone:    sellerPhone,
      sellerVerified: sellerUser.isVerified,
      sellerRating:   sellerUser.ratingAverage || 5.0,
      title:          title.trim(),
      description:    description ? description.trim() : '',
      category,
      condition:      condition || 'used_good',
      price:          Number(price),
      stock:          initialStock,
      sku:            sku ? sku.trim() : '',
      imageUrl,
      images,
      status:         initialStock === 0 ? 'Vendido' : 'Disponible',
      safeZone:       safeZone || 'Cafetería Edificio Rafael Arboleda'
    });

    notifier.notifyNewPost(post).catch(err =>
      console.error('[Telegram] Fallo al notificar nuevo post:', err.message)
    );

    await sendNotification({
      userId: req.user.id,
      title: 'Publicación creada con éxito',
      message: `Tu artículo "${post.title}" ya está disponible en el catálogo de UniMercs con stock inicial de ${initialStock} unidades.`,
      type: 'post_status'
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/posts/:id/status (HU-09 / RF-09: Marcar como Disponible, Reservado, Vendido)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Disponible', 'Reservado', 'Vendido'].includes(status)) {
      return res.status(400).json({ message: 'Estado inválido. Debe ser: Disponible, Reservado o Vendido' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });
    
    if (String(post.sellerId) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para modificar esta publicación' });
    }

    const prevStatus = post.status;
    post.status = status;
    await post.save();

    await sendNotification({
      userId: post.sellerId,
      title: `Estado actualizado: ${post.title}`,
      message: `El estado de tu publicación cambió de "${prevStatus}" a "${status}".`,
      type: 'post_status'
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/posts/:id/stock (Incrementar / Reducir / Ajustar inventario)
router.patch('/:id/stock', protect, async (req, res) => {
  try {
    const { action, amount = 1, newStock } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

    if (String(post.sellerId) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para modificar el inventario de esta publicación' });
    }

    let currentStock = Number(post.stock !== undefined ? post.stock : 1);
    if (action === 'increment') {
      currentStock += Number(amount);
    } else if (action === 'decrement') {
      currentStock = Math.max(0, currentStock - Number(amount));
    } else if (action === 'set' && newStock !== undefined) {
      currentStock = Math.max(0, Number(newStock));
    }

    post.stock = currentStock;
    if (currentStock === 0) {
      post.status = 'Vendido';
    } else if (post.status === 'Vendido' && currentStock > 0) {
      post.status = 'Disponible';
    }

    await post.save();
    res.json({ message: 'Inventario actualizado correctamente', post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/posts/:id (HU-10 / RF-10)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    
    if (String(post.sellerId) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado para editar esta publicación' });
    }

    const { title, category, condition, price, description, safeZone, status, phone, stock, sku } = req.body;
    
    if (title) post.title = title.trim();
    if (category) post.category = category;
    if (condition) post.condition = condition;
    if (price !== undefined) post.price = Number(price);
    if (description !== undefined) post.description = description.trim();
    if (safeZone) post.safeZone = safeZone;
    if (status) post.status = status;
    if (phone) post.sellerPhone = phone.trim();
    if (stock !== undefined && stock !== '') {
      post.stock = Math.max(0, Number(stock));
      if (post.stock === 0 && !status) post.status = 'Vendido';
      else if (post.stock > 0 && post.status === 'Vendido' && !status) post.status = 'Disponible';
    }
    if (sku !== undefined) post.sku = sku.trim();
    if (req.file) post.imageUrl = `/uploads/${req.file.filename}`;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/posts/:id (HU-10 / RF-10)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    
    if (String(post.sellerId) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado para eliminar esta publicación' });
    }

    await post.deleteOne();
    res.json({ message: 'Publicación eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
