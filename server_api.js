const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { connect, mongoose } = require('./server/db');

// models (for DB-backed operations)
const Course = require('./server/models/course.model');
const Batch = require('./server/models/batch.model');
const Student = require('./server/models/student.model');
const Instructor = require('./server/models/instructor.model');
const Admin = require('./server/models/admin.model');
const Attendance = require('./server/models/attendance.model');

let isDbReady = false;
connect().then(() => {
  if (mongoose && mongoose.connection && mongoose.connection.readyState === 1) {
    isDbReady = true;
  }
  mongoose.connection.once('open', () => { isDbReady = true; console.log('Mongoose connection open'); });
}).catch(err => console.warn('DB connect error:', err && err.message));
const app = express();
// Prefer `SERVER_API_PORT` or default to 5000 to avoid clashing with other servers
const port = process.env.SERVER_API_PORT || 5000;

app.use(cors());
app.use(express.json());

// Minimal in-memory data (subset needed for these endpoints)
let appState = {
  courses: [
    { id: '1', name: 'Computer Science Fundamentals', code: 'CS101', description: 'Introduction to programming', instructorId: 'inst1' },
    { id: '2', name: 'Data Structures & Algorithms', code: 'CS201', description: 'Advanced data structures', instructorId: 'inst2' }
  ],
  batches: [
    { id: 'b1', courseId: '1', name: 'Batch A1', startDate: '2025-01-15', endDate: '2025-06-15' },
    { id: 'b2', courseId: '1', name: 'Batch A2', startDate: '2025-01-15', endDate: '2025-06-15' }
  ],
  students: [
    { id: 's1', name: 'Alice Williams', email: 'alice@example.com', rollNo: 'STU001', batchId: 'b1' },
    { id: 's2', name: 'Bob Martinez', email: 'bob@example.com', rollNo: 'STU002', batchId: 'b1' }
  ],
  instructors: [
    { id: 'inst1', name: 'Dr. Sarah Johnson', email: 'sarah@example.com' },
    { id: 'inst2', name: 'Prof. Michael Chen', email: 'michael@example.com' }
  ],
  attendance: [
    { id: 'a1', studentId: 's1', courseId: '1', batchId: 'b1', date: '2025-11-25', status: 'present', takenBy: 'inst1' }
  ],
  admins: [
    { id: 'admin1', name: 'System Administrator', email: 'admin@example.com', employeeId: 'ADM001', createdAt: '2025-01-01', status: 'active' }
  ]
};

function genId(prefix) { return `${prefix}${Date.now()}`; }
function findById(arr, id) { return arr.find(x => x.id === id); }
function removeById(arr, id) { const i = arr.findIndex(x => x.id === id); if (i===-1) return false; arr.splice(i,1); return true; }

// --- Auth & Health ---
app.post('/api/login', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });
  let role = 'student', id = '', name = 'User';
  if (email.includes('admin')) { role = 'admin'; id = 'admin1'; name = 'Admin User'; }
  else if (email.includes('sarah') || email.includes('michael')) { role = 'instructor'; const inst = appState.instructors.find(i=>i.email===email); if (inst) { id = inst.id; name = inst.name; } }
  else { const s = appState.students.find(s=>s.email===email); if (s) { id = s.id; name = s.name; } }
  res.json({ user: { id, name, email, role } });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', db: isDbReady ? 'connected' : 'standalone' }));

// Serve frontend build if available, otherwise show a helpful root message
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('/', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send(`
      <html>
        <head><title>Light API</title></head>
        <body>
          <h2>Light API server</h2>
          <p>This is a lightweight API server. Use the following endpoints:</p>
          <ul>
            <li><a href="/api/health">/api/health</a></li>
            <li><a href="/api/courses">/api/courses</a></li>
            <li><a href="/api/batches">/api/batches</a></li>
            <li><a href="/api/students">/api/students</a></li>
            <li><a href="/api/instructors">/api/instructors</a></li>
            <li><a href="/api/attendance">/api/attendance</a></li>
            <li><a href="/api/reports">/api/reports</a></li>
          </ul>
        </body>
      </html>
    `);
  });
}

// --- Courses ---
app.get('/api/courses', async (req, res) => {
  if (isDbReady) {
    const docs = await Course.find().lean();
    return res.json(docs);
  }
  return res.json(appState.courses);
});
app.post('/api/courses', async (req, res) => {
  if (isDbReady) {
    const doc = await Course.create(req.body);
    return res.status(201).json(doc);
  }
  const c = { id: genId('course'), ...req.body }; appState.courses.push(c); res.status(201).json(c);
});
app.put('/api/courses/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: 'not found' });
    return res.json(doc);
  }
  const c = findById(appState.courses, req.params.id); if (!c) return res.status(404).json({ error: 'not found' }); Object.assign(c, req.body); res.json(c);
});
app.delete('/api/courses/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Course.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'not found' });
    return res.json({ ok: true });
  }
  if (removeById(appState.courses, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' });
});

// --- Batches ---
app.get('/api/batches', async (req, res) => {
  if (isDbReady) return res.json(await Batch.find().lean());
  return res.json(appState.batches);
});
app.post('/api/batches', async (req, res) => {
  if (isDbReady) {
    const doc = await Batch.create(req.body); return res.status(201).json(doc);
  }
  const b = { id: genId('b'), ...req.body }; appState.batches.push(b); res.status(201).json(b);
});
app.put('/api/batches/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!doc) return res.status(404).json({ error: 'not found' }); return res.json(doc);
  }
  const b = findById(appState.batches, req.params.id); if (!b) return res.status(404).json({ error: 'not found' }); Object.assign(b, req.body); res.json(b);
});
app.delete('/api/batches/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Batch.findByIdAndDelete(req.params.id); if (!doc) return res.status(404).json({ error: 'not found' }); return res.json({ ok: true });
  }
  if (removeById(appState.batches, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' });
});

// --- Students ---
app.get('/api/students', async (req, res) => {
  if (isDbReady) return res.json(await Student.find().lean());
  return res.json(appState.students);
});
app.post('/api/students', async (req, res) => {
  if (isDbReady) {
    const doc = await Student.create(req.body); return res.status(201).json(doc);
  }
  const s = { id: genId('s'), ...req.body }; appState.students.push(s); res.status(201).json(s);
});
app.put('/api/students/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!doc) return res.status(404).json({ error: 'not found' }); return res.json(doc);
  }
  const s = findById(appState.students, req.params.id); if (!s) return res.status(404).json({ error: 'not found' }); Object.assign(s, req.body); res.json(s);
});
app.delete('/api/students/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Student.findByIdAndDelete(req.params.id); if (!doc) return res.status(404).json({ error: 'not found' }); return res.json({ ok: true });
  }
  if (removeById(appState.students, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' });
});

// --- Instructors ---
app.get('/api/instructors', async (req, res) => {
  if (isDbReady) return res.json(await Instructor.find().lean());
  return res.json(appState.instructors);
});
app.post('/api/instructors', async (req, res) => {
  if (isDbReady) {
    const doc = await Instructor.create(req.body); return res.status(201).json(doc);
  }
  const i = { id: genId('inst'), ...req.body }; appState.instructors.push(i); res.status(201).json(i);
});
app.put('/api/instructors/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!doc) return res.status(404).json({ error: 'not found' }); return res.json(doc);
  }
  const i = findById(appState.instructors, req.params.id); if (!i) return res.status(404).json({ error: 'not found' }); Object.assign(i, req.body); res.json(i);
});
app.delete('/api/instructors/:id', async (req, res) => {
  if (isDbReady) {
    const doc = await Instructor.findByIdAndDelete(req.params.id); if (!doc) return res.status(404).json({ error: 'not found' }); return res.json({ ok: true });
  }
  if (removeById(appState.instructors, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' });
});

// --- Admins ---
app.get('/api/admins', async (req, res) => {
  if (isDbReady) return res.json(await Admin.find().lean());
  return res.json(appState.admins);
});
app.post('/api/admins', async (req, res) => {
  if (isDbReady) {
    const doc = await Admin.create(req.body); return res.status(201).json(doc);
  }
  const a = { id: genId('admin'), ...req.body, createdAt: new Date().toISOString().split('T')[0], status: 'active' }; appState.admins.push(a); res.status(201).json(a);
});

// --- Attendance ---
// GET supports filters: courseId, studentId, batchId, date

app.get('/api/attendance', async (req, res) => {
  const { courseId, studentId, batchId, date } = req.query;
  if (isDbReady) {
    const filter = {};
    if (courseId) filter.courseId = courseId;
    if (studentId) filter.studentId = studentId;
    if (batchId) filter.batchId = batchId;
    if (date) filter.date = date;
    const docs = await Attendance.find(filter).lean();
    return res.json(docs);
  }
  let list = appState.attendance;
  if (courseId) list = list.filter(a => a.courseId === courseId);
  if (studentId) list = list.filter(a => a.studentId === studentId);
  if (batchId) list = list.filter(a => a.batchId === batchId);
  if (date) list = list.filter(a => a.date === date);
  res.json(list);
});

app.post('/api/attendance', async (req, res) => {
  if (isDbReady) {
    const doc = await Attendance.create(req.body); return res.status(201).json(doc);
  }
  const a = { id: genId('a'), ...req.body }; appState.attendance.push(a); res.status(201).json(a);
});

// bulk attendance (recommended)
app.post('/api/attendance/bulk', (req, res) => {
  const records = Array.isArray(req.body) ? req.body : (req.body.records || []);
  if (isDbReady) {
    (async () => {
      const created = [];
      for (const r of records) { const doc = await Attendance.create(r); created.push(doc); }
      res.status(201).json({ createdCount: created.length, created });
    })();
    return;
  }
  const created = records.map(r => { const a = { id: genId('a'), ...r }; appState.attendance.push(a); return a; });
  res.status(201).json({ createdCount: created.length, created });
});

// --- Reports ---
app.get('/api/reports', async (req, res) => {
  if (isDbReady) {
    const totalStudents = await Student.countDocuments();
    const totalInstructors = await Instructor.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalAttendance = await Attendance.countDocuments();
    const totalPresent = await Attendance.countDocuments({ status: 'present' });
    const attendanceRate = totalAttendance > 0 ? (totalPresent / totalAttendance * 100).toFixed(1) : '0.0';
    return res.json({ totalStudents, totalInstructors, totalCourses, totalAttendance, totalPresent, attendanceRate });
  }
  const totalStudents = appState.students.length;
  const totalInstructors = appState.instructors.length;
  const totalCourses = appState.courses.length;
  const totalAttendance = appState.attendance.length;
  const totalPresent = appState.attendance.filter(a => a.status === 'present').length;
  const attendanceRate = totalAttendance > 0 ? (totalPresent / totalAttendance * 100).toFixed(1) : '0.0';
  res.json({ totalStudents, totalInstructors, totalCourses, totalAttendance, totalPresent, attendanceRate });
});

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => console.log(`Light API server listening on http://localhost:${port}`));
