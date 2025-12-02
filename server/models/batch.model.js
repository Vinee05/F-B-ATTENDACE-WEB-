const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  name: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Batch', BatchSchema);
