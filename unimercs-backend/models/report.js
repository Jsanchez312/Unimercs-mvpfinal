const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporterId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reporterName: { type: String, required: true },
  reporterEmail:{ type: String, required: true },
  targetType:   { type: String, enum: ['post', 'user'], required: true },
  targetId:     { type: String, required: true },
  targetTitle:  { type: String, default: '' },
  reason:       { type: String, required: true },
  description:  { type: String, required: true, trim: true },
  status:       { type: String, enum: ['pendiente', 'investigando', 'resuelto', 'descartado'], default: 'pendiente' },
  actionTaken:  { type: String, default: '' },
  resolvedBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  resolvedAt:   { type: Date, default: null },
  createdAt:    { type: Date, default: Date.now }
});

reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ targetId: 1 });

module.exports = mongoose.model('Report', reportSchema);
