const { init, sequelize, Student, Course, Batch, Instructor, Attendance, CourseInstructor, Enrollment, Admin, LeaveRequest, Notification } = require('./sqlite');

async function main() {
  await init();
  console.log('Clearing all tables...');

  await sequelize.transaction(async (t) => {
    // Delete dependent tables first
    await Attendance.destroy({ where: {}, truncate: true, transaction: t });
    await CourseInstructor.destroy({ where: {}, truncate: true, transaction: t });
    await Enrollment.destroy({ where: {}, truncate: true, transaction: t });

    // Then base tables
    await Student.destroy({ where: {}, truncate: true, transaction: t });
    await Batch.destroy({ where: {}, truncate: true, transaction: t });
    await Course.destroy({ where: {}, truncate: true, transaction: t });
    await Instructor.destroy({ where: {}, truncate: true, transaction: t });
    await Admin.destroy({ where: {}, truncate: true, transaction: t });
    await LeaveRequest.destroy({ where: {}, truncate: true, transaction: t });
    await Notification.destroy({ where: {}, truncate: true, transaction: t });
  });

  console.log('Seeding fresh data (10 rows per table)...');

  const instructors = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    return {
      id: `inst${100 + idx}`,
      employeeId: `EMP${100 + idx}`,
      name: `Instructor ${idx}`,
      email: `instructor${idx}@example.com`
    };
  });

  const courses = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    return {
      id: `course${100 + idx}`,
      code: `C-${100 + idx}`,
      name: `Course ${idx}`,
      description: `Description for Course ${idx}`
    };
  });

  const batches = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    return {
      id: `b${100 + idx}`,
      courseId: courses[i].id,
      name: `Batch ${idx}`,
      startDate: `2025-01-${String(idx).padStart(2, '0')}`,
      endDate: `2025-06-${String(idx).padStart(2, '0')}`,
      year: '2025'
    };
  });

  const students = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    return {
      id: `s${100 + idx}`,
      name: `Student ${idx}`,
      email: `student${idx}@example.com`,
      rollNo: `STU${100 + idx}`,
      parentsEmail: `parent${idx}@example.com`
    };
  });

  const enrollments = students.map((s, i) => {
    const batch = batches[i % batches.length];
    return {
      id: `en-${s.id}-${batch.id}`,
      studentId: s.id,
      batchId: batch.id
    };
  });

  const courseInstructors = courses.map((c, i) => {
    const inst = instructors[i % instructors.length];
    return {
      id: `ci-${c.id}-${inst.id}`,
      courseId: c.id,
      instructorId: inst.id
    };
  });

  const attendance = students.map((s, i) => {
    const batch = batches[i % batches.length];
    const course = courses[i % courses.length];
    return {
      id: `a${100 + i + 1}`,
      studentId: s.id,
      courseId: course.id,
      batchId: batch.id,
      date: '2025-12-01',
      status: i % 3 === 0 ? 'present' : i % 3 === 1 ? 'absent' : 'excused',
      takenBy: courseInstructors[i % courseInstructors.length].instructorId
    };
  });

  const admins = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    return {
      id: `admin${idx}`,
      name: `Admin ${idx}`,
      email: `admin${idx}@example.com`,
      employeeId: `ADM${100 + idx}`,
      status: 'active',
      createdAt: '2025-01-01'
    };
  });

  const notifications = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    return {
      id: `n${idx}`,
      title: `Notice ${idx}`,
      message: `Notification message ${idx}`,
      target: idx % 2 === 0 ? 'students' : 'all',
      createdAt: `2025-11-${String(10 + idx).padStart(2, '0')}`,
      createdBy: 'admin'
    };
  });

  const leaveRequests = Array.from({ length: 10 }).map((_, i) => {
    const idx = i + 1;
    const userIsStudent = i % 2 === 0;
    const user = userIsStudent ? students[i % students.length] : instructors[i % instructors.length];
    return {
      id: `l${100 + idx}`,
      userId: user.id,
      userName: user.name,
      userRole: userIsStudent ? 'student' : 'instructor',
      startDate: `2025-12-${String(1 + idx).padStart(2, '0')}`,
      endDate: `2025-12-${String(2 + idx).padStart(2, '0')}`,
      reason: `Reason ${idx}`,
      status: idx % 3 === 0 ? 'approved' : idx % 3 === 1 ? 'pending' : 'rejected',
      appliedDate: `2025-11-${String(20 + idx).padStart(2, '0')}`,
      document: null
    };
  });

  await sequelize.transaction(async (t) => {
    await Instructor.bulkCreate(instructors, { transaction: t });
    await Course.bulkCreate(courses, { transaction: t });
    await Batch.bulkCreate(batches, { transaction: t });
    await Student.bulkCreate(students, { transaction: t });
    await Enrollment.bulkCreate(enrollments, { transaction: t });
    await CourseInstructor.bulkCreate(courseInstructors, { transaction: t });
    await Attendance.bulkCreate(attendance, { transaction: t });
    await Admin.bulkCreate(admins, { transaction: t });
    await Notification.bulkCreate(notifications, { transaction: t });
    await LeaveRequest.bulkCreate(leaveRequests, { transaction: t });
  });

  console.log('Database reset complete. Seeded 10 rows per table.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Reset/seed error', err);
  process.exit(1);
});
