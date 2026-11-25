const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  sellerId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName:     { type: String, required: true },
  sellerEmail:    { type: String, required: true },
  sellerPhone:    { type: String, default: '' },
  sellerVerified: { type: Boolean, default: true },
  sellerRating:   { type: Number, default: 5.0 },
  title:          { type: String, required: true, trim: true },
  description:    { type: String, default: '', trim: true },
  category:       { type: String, required: true },
  condition:      {
    type: String,
    enum: [
      'new',
      'used_like_new',
      'used_very_good',
      'used_good',
      'used_acceptable',
      'renewed',
      // Legacy aliases for backward compatibility:
      'barely used',
      'used',
      'refurbished'
    ],
    default: 'used_good'
  },
  price:          { type: Number, required: true, min: 0 },
  stock:          { type: Number, default: 1, min: 0 },
  sku:            { type: String, default: '' },
  imageUrl:       { type: String, default: '' },
  images:         [{ type: String }],
  status:         { type: String, enum: ['Disponible', 'Reservado', 'Vendido'], default: 'Disponible' },
  safeZone:       { type: String, default: 'Cafetería Edificio Rafael Arboleda' },
  views:          { type: Number, default: 0 },
  createdAt:      { type: Date, default: Date.now }
});

postSchema.index({ category: 1, status: 1, createdAt: -1 });
postSchema.index({ price: 1 });
postSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Post', postSchema);