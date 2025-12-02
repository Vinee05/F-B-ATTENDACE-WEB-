const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

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

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

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
app.get('/api/courses', (req, res) => res.json(appState.courses));
app.post('/api/courses', (req, res) => { const c = { id: genId('course'), ...req.body }; appState.courses.push(c); res.status(201).json(c); });
app.put('/api/courses/:id', (req, res) => { const c = findById(appState.courses, req.params.id); if (!c) return res.status(404).json({ error: 'not found' }); Object.assign(c, req.body); res.json(c); });
app.delete('/api/courses/:id', (req, res) => { if (removeById(appState.courses, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' }); });

// --- Batches ---
app.get('/api/batches', (req, res) => res.json(appState.batches));
app.post('/api/batches', (req, res) => { const b = { id: genId('b'), ...req.body }; appState.batches.push(b); res.status(201).json(b); });
app.put('/api/batches/:id', (req, res) => { const b = findById(appState.batches, req.params.id); if (!b) return res.status(404).json({ error: 'not found' }); Object.assign(b, req.body); res.json(b); });
app.delete('/api/batches/:id', (req, res) => { if (removeById(appState.batches, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' }); });

// --- Students ---
app.get('/api/students', (req, res) => res.json(appState.students));
app.post('/api/students', (req, res) => { const s = { id: genId('s'), ...req.body }; appState.students.push(s); res.status(201).json(s); });
app.put('/api/students/:id', (req, res) => { const s = findById(appState.students, req.params.id); if (!s) return res.status(404).json({ error: 'not found' }); Object.assign(s, req.body); res.json(s); });
app.delete('/api/students/:id', (req, res) => { if (removeById(appState.students, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' }); });

// --- Instructors ---
app.get('/api/instructors', (req, res) => res.json(appState.instructors));
app.post('/api/instructors', (req, res) => { const i = { id: genId('inst'), ...req.body }; appState.instructors.push(i); res.status(201).json(i); });
app.put('/api/instructors/:id', (req, res) => { const i = findById(appState.instructors, req.params.id); if (!i) return res.status(404).json({ error: 'not found' }); Object.assign(i, req.body); res.json(i); });
app.delete('/api/instructors/:id', (req, res) => { if (removeById(appState.instructors, req.params.id)) return res.json({ ok: true }); res.status(404).json({ error: 'not found' }); });

// --- Admins ---
app.get('/api/admins', (req, res) => res.json(appState.admins));
app.post('/api/admins', (req, res) => { const a = { id: genId('admin'), ...req.body, createdAt: new Date().toISOString().split('T')[0], status: 'active' }; appState.admins.push(a); res.status(201).json(a); });

// --- Attendance ---
// GET supports filters: courseId, studentId, batchId, date
app.get('/api/attendance', (req, res) => {
  const { courseId, studentId, batchId, date } = req.query;
  let list = appState.attendance;
  if (courseId) list = list.filter(a => a.courseId === courseId);
  if (studentId) list = list.filter(a => a.studentId === studentId);
  if (batchId) list = list.filter(a => a.batchId === batchId);
  if (date) list = list.filter(a => a.date === date);
  res.json(list);
});

app.post('/api/attendance', (req, res) => { const a = { id: genId('a'), ...req.body }; appState.attendance.push(a); res.status(201).json(a); });

// bulk attendance (recommended)
app.post('/api/attendance/bulk', (req, res) => {
  const records = Array.isArray(req.body) ? req.body : (req.body.records || []);
  const created = records.map(r => { const a = { id: genId('a'), ...r }; appState.attendance.push(a); return a; });
  res.status(201).json({ createdCount: created.length, created });
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

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => console.log(`Light API server listening on http://localhost:${port}`));
