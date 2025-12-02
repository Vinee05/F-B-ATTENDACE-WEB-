const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNo: { type: String },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
