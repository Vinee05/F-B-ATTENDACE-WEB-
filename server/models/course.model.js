const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  description: { type: String },
  instructorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);

