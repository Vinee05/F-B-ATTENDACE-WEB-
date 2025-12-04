// Centralized in-memory seed data exported for seeding SQLite and for legacy features.
const appState = {
  courses: [
    { id: '1', name: 'Computer Science Fundamentals', code: 'CS101', description: 'Introduction to programming', instructorId: 'inst1', instructorName: 'Dr. Sarah Johnson' },
    { id: '2', name: 'Data Structures & Algorithms', code: 'CS201', description: 'Advanced data structures', instructorId: 'inst2', instructorName: 'Prof. Michael Chen' },
    { id: '3', name: 'Web Development', code: 'CS301', description: 'Full stack web development', instructorId: 'inst1', instructorName: 'Dr. Sarah Johnson' },
    { id: '4', name: 'Database Systems', code: 'CS202', description: 'Relational and NoSQL databases', instructorId: 'inst3', instructorName: 'Dr. Emily Brown' }
  ],
  batches: [
    { id: 'b1', courseId: '1', name: 'Batch A1', startDate: '2025-01-15', endDate: '2025-06-15', year: '2025' },
    { id: 'b2', courseId: '1', name: 'Batch A2', startDate: '2025-01-15', endDate: '2025-06-15', year: '2025' },
    { id: 'b3', courseId: '2', name: 'Batch B1', startDate: '2025-02-01', endDate: '2025-07-01', year: '2025' },
    { id: 'b4', courseId: '3', name: 'Batch C1', startDate: '2025-01-20', endDate: '2025-05-20', year: '2025' }
  ],
  students: [
    { id: 's1', name: 'Alice Williams', email: 'alice@example.com', rollNo: 'STU001', batchId: 'b1', parentsEmail: '' },
    { id: 's2', name: 'Bob Martinez', email: 'bob@example.com', rollNo: 'STU002', batchId: 'b1', parentsEmail: '' },
    { id: 's3', name: 'Carol Davis', email: 'carol@example.com', rollNo: 'STU003', batchId: 'b1', parentsEmail: '' },
    { id: 's4', name: 'David Lee', email: 'david@example.com', rollNo: 'STU004', batchId: 'b2', parentsEmail: '' },
    { id: 's5', name: 'Emma Wilson', email: 'emma@example.com', rollNo: 'STU005', batchId: 'b3', parentsEmail: '' },
    { id: 's6', name: 'Frank Garcia', email: 'frank@example.com', rollNo: 'STU006', batchId: 'b3', parentsEmail: '' }
  ],
  instructors: [
    { id: 'inst1', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', employeeId: 'EMP001' },
    { id: 'inst2', name: 'Prof. Michael Chen', email: 'michael@example.com', employeeId: 'EMP002' },
    { id: 'inst3', name: 'Dr. Emily Brown', email: 'emily@example.com', employeeId: 'EMP003' }
  ],
  attendance: [
    { id: 'a1', studentId: 's1', courseId: '1', batchId: 'b1', date: '2025-11-25', status: 'present', takenBy: 'inst1' },
    { id: 'a2', studentId: 's2', courseId: '1', batchId: 'b1', date: '2025-11-25', status: 'present', takenBy: 'inst1' },
    { id: 'a3', studentId: 's3', courseId: '1', batchId: 'b1', date: '2025-11-25', status: 'absent', takenBy: 'inst1' },
    { id: 'a4', studentId: 's1', courseId: '1', batchId: 'b1', date: '2025-11-26', status: 'present', takenBy: 'inst1' },
    { id: 'a5', studentId: 's2', courseId: '1', batchId: 'b1', date: '2025-11-26', status: 'absent', takenBy: 'inst1' },
    { id: 'a6', studentId: 's3', courseId: '1', batchId: 'b1', date: '2025-11-26', status: 'excused', takenBy: 'inst1' }
  ],
  leaveRequests: [
    { id: 'l1', userId: 's1', userName: 'Alice Williams', userRole: 'student', startDate: '2025-11-28', endDate: '2025-11-29', reason: 'Medical emergency', status: 'pending', appliedDate: '2025-11-27', document: 'medical-cert.pdf' },
    { id: 'l2', userId: 'inst2', userName: 'Prof. Michael Chen', userRole: 'instructor', startDate: '2025-12-05', endDate: '2025-12-07', reason: 'Conference attendance', status: 'approved', appliedDate: '2025-11-20', document: 'conference-invite.pdf' },
    { id: 'l3', userId: 's5', userName: 'Emma Wilson', userRole: 'student', startDate: '2025-11-30', endDate: '2025-11-30', reason: 'Family function', status: 'rejected', appliedDate: '2025-11-28' }
  ],
  notifications: [
    { id: 'n1', title: 'Holiday Notice', message: 'Campus will be closed on December 25th for Christmas', target: 'all', createdAt: '2025-11-20', createdBy: 'admin' },
    { id: 'n2', title: 'Exam Schedule', message: 'Final exams will begin from January 10th', target: 'students', createdAt: '2025-11-22', createdBy: 'admin' }
  ],
  admins: [
    { id: 'admin1', name: 'System Administrator', email: 'admin@example.com', employeeId: 'ADM001', createdAt: '2025-01-01', status: 'active' }
  ]
};

module.exports = appState;
