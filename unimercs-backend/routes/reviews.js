const express = require('express');
const router  = express.Router();
const Review  = require('../models/review');
const User    = require('../models/user');
const Post    = require('../models/post');
const { protect } = require('../middleware/auth');
const { sendNotification } = require('../services/notificationService');

// POST /api/reviews (HU-13 / RF-13)
router.post('/', protect, async (req, res) => {
  try {
    const { sellerId, postId, rating, comment } = req.body;
    
    if (!sellerId || !rating || !comment) {
      return res.status(400).json({ message: 'Vendedor, calificación (1-5) y comentario son obligatorios' });
    }

    if (String(sellerId) === req.user.id) {
      return res.status(400).json({ message: 'No puedes calificarte a ti mismo' });
    }

    const seller = await User.findById(sellerId);
    if (!seller) return res.status(404).json({ message: 'Vendedor no encontrado' });

    let postTitle = '';
    if (postId) {
      const post = await Post.findById(postId);
      if (post) postTitle = post.title;
    }

    const review = await Review.create({
      sellerId,
      buyerId:    req.user.id,
      buyerName:  req.user.name,
      buyerEmail: req.user.email,
      postId:     postId || null,
      postTitle,
      rating:     Number(rating),
      comment:    comment.trim()
    });

    // Recalcular promedio de calificación del vendedor
    const allSellerReviews = await Review.find({ sellerId });
    const totalScore = allSellerReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avgScore = Number((totalScore / allSellerReviews.length).toFixed(1));

    seller.ratingAverage = avgScore;
    seller.ratingCount = allSellerReviews.length;
    await seller.save();

    // Notificar al vendedor de la nueva reseña recibida (HU-17)
    await sendNotification({
      userId: sellerId,
      title: 'Nueva calificacion recibida',
      message: `${req.user.name} te ha calificado con ${rating} sobre 5: "${comment.trim()}"`,
      type: 'review'
    });

    res.status(201).json({ review, sellerRatingAverage: avgScore, sellerRatingCount: allSellerReviews.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reviews/seller/:sellerId (HU-13 / RF-13)
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const reviews = await Review.find({ sellerId: req.params.sellerId }).sort({ createdAt: -1 });
    const seller = await User.findById(req.params.sellerId).select(
      'name ratingAverage ratingCount isVerified university accountType storeName storeDescription profilePicture'
    );
    
    res.json({
      seller,
      reviews
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/post/:postId', async (req, res) => {
  try {
    const reviews = await Review.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reviews written by the signed-in user, for the profile activity view.
router.get('/mine', protect, async (req, res) => {
  try {
    const reviews = await Review.find({ buyerId: req.user.id }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/reviews/:id (Editar calificacion dada)
router.put('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });

    if (String(review.buyerId) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para editar esta reseña' });
    }

    const { rating, comment } = req.body;
    if (rating) review.rating = Number(rating);
    if (comment !== undefined) review.comment = comment.trim();

    await review.save();

    // Recalcular promedio del vendedor
    const seller = await User.findById(review.sellerId);
    if (seller) {
      const allSellerReviews = await Review.find({ sellerId: review.sellerId });
      const totalScore = allSellerReviews.reduce((acc, curr) => acc + curr.rating, 0);
      seller.ratingAverage = Number((totalScore / (allSellerReviews.length || 1)).toFixed(1));
      seller.ratingCount = allSellerReviews.length;
      await seller.save();
    }

    res.json({ message: 'Calificación actualizada con éxito', review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/reviews/:id (Eliminar calificacion dada)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });

    if (String(review.buyerId) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta reseña' });
    }

    const sellerId = review.sellerId;
    await review.deleteOne();

    // Recalcular promedio del vendedor
    const seller = await User.findById(sellerId);
    if (seller) {
      const allSellerReviews = await Review.find({ sellerId });
      if (allSellerReviews.length > 0) {
        const totalScore = allSellerReviews.reduce((acc, curr) => acc + curr.rating, 0);
        seller.ratingAverage = Number((totalScore / allSellerReviews.length).toFixed(1));
        seller.ratingCount = allSellerReviews.length;
      } else {
        seller.ratingAverage = 5.0;
        seller.ratingCount = 0;
      }
      await seller.save();
    }

    res.json({ message: 'Calificación eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

