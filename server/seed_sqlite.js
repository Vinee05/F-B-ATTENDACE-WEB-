const { init, Student, Course, Batch, Instructor, Attendance, CourseInstructor, Enrollment, sequelize } = require('./sqlite');
const appState = require('./appState');

async function seed() {
  try {
    await init();
    console.log('Seeding SQLite from appState...');

    // Use transactions to keep things consistent
    await sequelize.transaction(async (t) => {
      // Instructors
      for (const inst of appState.instructors) {
        await Instructor.findOrCreate({ where: { id: inst.id }, defaults: inst, transaction: t });
      }

      // Courses
      for (const c of appState.courses) {
        const courseData = { id: c.id, code: c.code || '', name: c.name, description: c.description || '' };
        await Course.findOrCreate({ where: { id: c.id }, defaults: courseData, transaction: t });
        // map course-instructor if instructorId present
        if (c.instructorId) {
          const ci = { id: `ci-${c.id}-${c.instructorId}`, courseId: c.id, instructorId: c.instructorId };
          await CourseInstructor.findOrCreate({ where: { id: ci.id }, defaults: ci, transaction: t });
        }
      }

      // Batches
      for (const b of appState.batches) {
        const batchData = {
          id: b.id,
          courseId: b.courseId,
          name: b.name,
          startDate: b.startDate || null,
          endDate: b.endDate || null,
          year: b.year || null
        };
        await Batch.findOrCreate({ where: { id: b.id }, defaults: batchData, transaction: t });
      }

      // Students + Enrollment
      for (const s of appState.students) {
        const studentData = { id: s.id, name: s.name, email: s.email, rollNo: s.rollNo || null, parentsEmail: s.parentsEmail || null };
        await Student.findOrCreate({ where: { id: s.id }, defaults: studentData, transaction: t });
        if (s.batchId) {
          const en = { id: `en-${s.id}-${s.batchId}`, studentId: s.id, batchId: s.batchId };
          await Enrollment.findOrCreate({ where: { id: en.id }, defaults: en, transaction: t });
        }
      }

      // Attendance
      for (const a of appState.attendance) {
        const att = {
          id: a.id,
          studentId: a.studentId,
          courseId: a.courseId,
          batchId: a.batchId,
          date: a.date,
          status: a.status,
          takenBy: a.takenBy
        };
        await Attendance.findOrCreate({ where: { id: a.id }, defaults: att, transaction: t });
      }

      // LeaveRequests, Notifications, Admins remain in-memory (optional to persist later)
    });

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeder error:', err);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  seed().then(() => process.exit(0));
}

module.exports = { seed };
