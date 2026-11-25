const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  message:     { type: String, required: true },
  type:        { type: String, enum: ['post_status', 'review', 'report_update', 'security', 'system'], default: 'system' },
  read:        { type: Boolean, default: false },
  emailSentTo: { type: String, default: '' },
  createdAt:   { type: Date, default: Date.now }
});

notificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
