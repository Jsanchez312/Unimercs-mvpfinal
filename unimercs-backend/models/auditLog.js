const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  adminId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adminEmail: { type: String, required: true },
  action:     { type: String, required: true }, // e.g., 'BAN_USER', 'SUSPEND_USER', 'ACTIVATE_USER', 'DELETE_POST', 'RESOLVE_REPORT', 'EXPORT_BACKUP'
  targetType: { type: String, default: '' },
  targetId:   { type: String, required: true },
  details:    { type: String, default: '' },
  ip:         { type: String, default: '' },
  createdAt:  { type: Date, default: Date.now }
});

auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
