const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  sellerId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyerId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyerName:  { type: String, required: true },
  buyerEmail: { type: String, required: true },
  postId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  postTitle:  { type: String, default: '' },
  rating:     { type: Number, required: true, min: 1, max: 5 },
  comment:    { type: String, required: true, trim: true },
  createdAt:  { type: Date, default: Date.now }
});

reviewSchema.index({ sellerId: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
