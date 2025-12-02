const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory data seeded from App.jsx
let appState = {
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
    { id: 's1', name: 'Alice Williams', email: 'alice@example.com', rollNo: 'STU001', batchId: 'b1' },
    { id: 's2', name: 'Bob Martinez', email: 'bob@example.com', rollNo: 'STU002', batchId: 'b1' },
    { id: 's3', name: 'Carol Davis', email: 'carol@example.com', rollNo: 'STU003', batchId: 'b1' },
    { id: 's4', name: 'David Lee', email: 'david@example.com', rollNo: 'STU004', batchId: 'b2' },
    { id: 's5', name: 'Emma Wilson', email: 'emma@example.com', rollNo: 'STU005', batchId: 'b3' },
    { id: 's6', name: 'Frank Garcia', email: 'frank@example.com', rollNo: 'STU006', batchId: 'b3' }
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

// Utility helpers
function findById(arr, id) {
  return arr.find(x => x.id === id);
}
function removeById(arr, id) {
  const idx = arr.findIndex(x => x.id === id);
  if (idx === -1) return false;
  arr.splice(idx, 1);
  return true;
}
function genId(prefix) {
  return `${prefix}${Date.now()}`;
}

// --- Authentication ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });

  // Mock: determine role from email
  let role = 'student';
  let id = '';
  let name = 'User';

  if (email.includes('admin')) {
    role = 'admin';
    id = 'admin1';
    name = 'Admin User';
  } else if (email.includes('sarah') || email.includes('michael') || email.includes('emily')) {
    role = 'instructor';
    const instructor = appState.instructors.find(i => i.email === email);
    if (instructor) { id = instructor.id; name = instructor.name; }
  } else {
    role = 'student';
    const student = appState.students.find(s => s.email === email);
    if (student) { id = student.id; name = student.name; }
  }

  return res.json({ user: { id, name, email, role } });
});

// --- Courses ---
app.get('/api/courses', (req, res) => res.json(appState.courses));
app.post('/api/courses', (req, res) => {
  const course = { id: genId('course'), ...req.body };
  appState.courses.push(course);
  res.status(201).json(course);
});
app.put('/api/courses/:id', (req, res) => {
  const course = findById(appState.courses, req.params.id);
  if (!course) return res.status(404).json({ error: 'not found' });
  Object.assign(course, req.body);
  res.json(course);
});
app.delete('/api/courses/:id', (req, res) => {
  if (removeById(appState.courses, req.params.id)) return res.json({ ok: true });
  res.status(404).json({ error: 'not found' });
});

// --- Batches ---
app.get('/api/batches', (req, res) => res.json(appState.batches));
app.post('/api/batches', (req, res) => {
  const b = { id: genId('b'), ...req.body };
  appState.batches.push(b);
  res.status(201).json(b);
});
app.put('/api/batches/:id', (req, res) => {
  const b = findById(appState.batches, req.params.id);
  if (!b) return res.status(404).json({ error: 'not found' });
  Object.assign(b, req.body);
  res.json(b);
});
app.delete('/api/batches/:id', (req, res) => {
  if (removeById(appState.batches, req.params.id)) return res.json({ ok: true });
  res.status(404).json({ error: 'not found' });
});

// --- Students ---
app.get('/api/students', (req, res) => res.json(appState.students));
app.post('/api/students', (req, res) => {
  const s = { id: genId('s'), ...req.body };
  appState.students.push(s);
  res.status(201).json(s);
});
app.put('/api/students/:id', (req, res) => {
  const s = findById(appState.students, req.params.id);
  if (!s) return res.status(404).json({ error: 'not found' });
  Object.assign(s, req.body);
  res.json(s);
});
app.delete('/api/students/:id', (req, res) => {
  if (removeById(appState.students, req.params.id)) return res.json({ ok: true });
  res.status(404).json({ error: 'not found' });
});

// --- Instructors ---
app.get('/api/instructors', (req, res) => res.json(appState.instructors));
app.post('/api/instructors', (req, res) => {
  const i = { id: genId('inst'), ...req.body };
  appState.instructors.push(i);
  res.status(201).json(i);
});
app.put('/api/instructors/:id', (req, res) => {
  const i = findById(appState.instructors, req.params.id);
  if (!i) return res.status(404).json({ error: 'not found' });
  Object.assign(i, req.body);
  res.json(i);
});
app.delete('/api/instructors/:id', (req, res) => {
  if (removeById(appState.instructors, req.params.id)) return res.json({ ok: true });
  res.status(404).json({ error: 'not found' });
});

// --- Admins ---
app.get('/api/admins', (req, res) => res.json(appState.admins));
app.post('/api/admins', (req, res) => {
  const a = { id: genId('admin'), ...req.body, createdAt: new Date().toISOString().split('T')[0], status: 'active' };
  appState.admins.push(a);
  res.status(201).json(a);
});
app.delete('/api/admins/:id', (req, res) => {
  if (removeById(appState.admins, req.params.id)) return res.json({ ok: true });
  res.status(404).json({ error: 'not found' });
});

// --- Attendance ---
app.get('/api/attendance', (req, res) => {
  // Optional filters: courseId, studentId
  const { courseId, studentId } = req.query;
  let list = appState.attendance;
  if (courseId) list = list.filter(a => a.courseId === courseId);
  if (studentId) list = list.filter(a => a.studentId === studentId);
  res.json(list);
});
app.post('/api/attendance', (req, res) => {
  const a = { id: genId('a'), ...req.body };
  appState.attendance.push(a);
  res.status(201).json(a);
});

// --- Leave Requests ---
app.get('/api/leaverequests', (req, res) => res.json(appState.leaveRequests));
app.post('/api/leaverequests', (req, res) => {
  const l = { id: genId('l'), ...req.body };
  appState.leaveRequests.push(l);
  res.status(201).json(l);
});
app.put('/api/leaverequests/:id', (req, res) => {
  const l = findById(appState.leaveRequests, req.params.id);
  if (!l) return res.status(404).json({ error: 'not found' });
  Object.assign(l, req.body);
  res.json(l);
});

// --- Notifications ---
app.get('/api/notifications', (req, res) => res.json(appState.notifications));
app.post('/api/notifications', (req, res) => {
  const n = { id: genId('n'), createdAt: new Date().toISOString().split('T')[0], ...req.body };
  appState.notifications.push(n);
  res.status(201).json(n);
});
app.delete('/api/notifications/:id', (req, res) => {
  if (removeById(appState.notifications, req.params.id)) return res.json({ ok: true });
  res.status(404).json({ error: 'not found' });
});

// --- Reports ---
app.get('/api/reports', (req, res) => {
  const totalStudents = appState.students.length;
  const totalInstructors = appState.instructors.length;
  const totalCourses = appState.courses.length;
  const totalAttendance = appState.attendance.length;
  const totalPresent = appState.attendance.filter(a => a.status === 'present').length;
  const attendanceRate = totalAttendance > 0 ? (totalPresent / totalAttendance * 100).toFixed(1) : '0.0';
  res.json({ totalStudents, totalInstructors, totalCourses, totalAttendance, totalPresent, attendanceRate });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve frontend if built into `dist/`
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('/', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
} else {
  app.get('/', (req, res) => res.send('<h2>FB Attendance API</h2><p>API is available under <code>/api/*</code>. Run the frontend (Vite) separately or build into <code>dist/</code>.</p>'));
}

// Catch-all for unknown routes under /api
app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found' }));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
