const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:                       { type: String, required: true },
  email:                      { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash:               { type: String, required: true },
  university:                 { type: String, default: 'Pontificia Universidad Javeriana' },
  phone:                      { type: String, default: '' },
  personalEmail:              { type: String, default: '', lowercase: true, trim: true },
  accountType:                { type: String, enum: ['buyer', 'seller', 'store'], default: 'seller' },
  notificationPreference:     { type: String, enum: ['institucional', 'personal', 'ambos'], default: 'institucional' },
  isVerified:                 { type: Boolean, default: true },
  isPhoneVerified:            { type: Boolean, default: true },
  phoneVerificationCode:      { type: String, default: null },
  phoneVerificationExpires:    { type: Date, default: null },
  role:                       { type: String, enum: ['student', 'admin'], default: 'student' },
  status:                     { type: String, enum: ['active', 'suspended', 'banned'], default: 'active' },
  ratingAverage:              { type: Number, default: 5.0, min: 1, max: 5 },
  ratingCount:                { type: Number, default: 0 },
  profilePicture:             { type: String, default: '' },
  storeName:                  { type: String, default: '' },
  storeDescription:           { type: String, default: '' },
  storeBanner:                { type: String, default: '' },
  storeAccent:                { type: String, default: '#1F3D36' },
  habeasDataAccepted:         { type: Boolean, default: true },
  resetPasswordToken:         { type: String, default: null },
  resetPasswordExpires:       { type: Date, default: null },
  createdAt:                  { type: Date, default: Date.now }
});

userSchema.index({ role: 1 });
userSchema.index({ accountType: 1 });
userSchema.index({ status: 1 });

module.exports = mongoose.model('User', userSchema);
