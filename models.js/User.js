const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','instructor','student'], default: 'student' },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', default: null },
  refreshToken: { type: String, default: null },      // store (hashed) refresh token if you want server-side revocation
  createdAt: { type: Date, default: Date.now }
});

// ensure unique index on email (mongoose sets from unique: true but create explicit)
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
