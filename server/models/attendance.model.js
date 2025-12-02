const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  date: { type: String, required: true },
  status: { type: String, enum: ['present','absent','late'], default: 'present' },
  takenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
