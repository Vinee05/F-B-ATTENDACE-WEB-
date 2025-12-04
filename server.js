const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory data now extracted to a separate module so it can be re-used by the seeder
const appState = require('./server/appState');

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

// Initialize SQLite (Sequelize) - don't block server startup
const { init, sequelize, Student, Course, Batch, Instructor, Attendance, CourseInstructor, Enrollment, Admin, LeaveRequest, Notification } = require('./server/sqlite');
let dbReady = false;
init().then(() => { dbReady = true; console.log('SQLite DB initialized'); }).catch(err => console.error('DB init error', err));

// --- Authentication ---
app.post('/api/login', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });
  try {
    // Check admins
    const admin = await Admin.findOne({ where: { email } });
    if (admin) return res.json({ user: { id: admin.id, name: admin.name, email, role: 'admin' } });
    const instructor = await Instructor.findOne({ where: { email } });
    if (instructor) return res.json({ user: { id: instructor.id, name: instructor.name, email, role: 'instructor' } });
    const student = await Student.findOne({ where: { email } });
    if (student) return res.json({ user: { id: student.id, name: student.name, email, role: 'student' } });
    return res.json({ user: { id: '', name: 'User', email, role: 'student' } });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ error: 'internal' });
  }
});

// --- Courses ---
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const id = genId('course');
    const created = await Course.create({ id, ...req.body });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    const c = await Course.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: 'not found' });
    await c.update(req.body);
    res.json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    const c = await Course.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: 'not found' });
    await c.destroy();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

// --- Batches ---
app.get('/api/batches', async (req, res) => {
  try {
    const batches = await Batch.findAll();
    res.json(batches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/batches', async (req, res) => {
  try {
    const id = genId('b');
    const created = await Batch.create({ id, ...req.body });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.put('/api/batches/:id', async (req, res) => {
  try {
    const b = await Batch.findByPk(req.params.id);
    if (!b) return res.status(404).json({ error: 'not found' });
    await b.update(req.body);
    res.json(b);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.delete('/api/batches/:id', async (req, res) => {
  try {
    const b = await Batch.findByPk(req.params.id);
    if (!b) return res.status(404).json({ error: 'not found' });
    await b.destroy();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

// --- Students ---
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const payload = req.body;
    const id = genId('s');
    const created = await Student.create({ id, ...payload });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const s = await Student.findByPk(req.params.id);
    if (!s) return res.status(404).json({ error: 'not found' });
    await s.update(req.body);
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const s = await Student.findByPk(req.params.id);
    if (!s) return res.status(404).json({ error: 'not found' });
    await s.destroy();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

// --- Instructors ---
app.get('/api/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.findAll();
    res.json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/instructors', async (req, res) => {
  try {
    const id = genId('inst');
    const created = await Instructor.create({ id, ...req.body });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.put('/api/instructors/:id', async (req, res) => {
  try {
    const i = await Instructor.findByPk(req.params.id);
    if (!i) return res.status(404).json({ error: 'not found' });
    await i.update(req.body);
    res.json(i);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.delete('/api/instructors/:id', async (req, res) => {
  try {
    const i = await Instructor.findByPk(req.params.id);
    if (!i) return res.status(404).json({ error: 'not found' });
    await i.destroy();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

// --- Bulk Imports ---
app.post('/api/students/bulk', async (req, res) => {
  const { students } = req.body;
  if (!Array.isArray(students)) return res.status(400).json({ error: 'students must be an array' });
  const imported = [];
  const errors = [];
  try {
    await sequelize.transaction(async (t) => {
      for (let idx = 0; idx < students.length; idx++) {
        const s = students[idx];
        if (!s.name || !s.email || !s.rollNo) {
          errors.push({ row: idx, message: 'name, email, rollNo are required' });
          continue;
        }
        const payload = { id: s.id || genId('s'), name: s.name, email: s.email, rollNo: s.rollNo, parentsEmail: s.parentsEmail || null };
        const [record] = await Student.findOrCreate({ where: { id: payload.id }, defaults: payload, transaction: t });
        imported.push(record);
        if (s.batchId) {
          const en = { id: `en-${record.id}-${s.batchId}`, studentId: record.id, batchId: s.batchId };
          await Enrollment.findOrCreate({ where: { id: en.id }, defaults: en, transaction: t });
        }
      }
    });
    res.status(201).json({ imported, errors, total: students.length });
  } catch (err) {
    console.error('students bulk error', err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/courses/bulk', async (req, res) => {
  const { courses } = req.body;
  if (!Array.isArray(courses)) return res.status(400).json({ error: 'courses must be an array' });
  const imported = [];
  const errors = [];
  try {
    await sequelize.transaction(async (t) => {
      for (let idx = 0; idx < courses.length; idx++) {
        const c = courses[idx];
        if (!c.code || !c.name) { errors.push({ row: idx, message: 'code and name are required' }); continue; }
        const payload = { id: c.id || genId('course'), code: c.code, name: c.name, description: c.description || '' };
        const [record] = await Course.findOrCreate({ where: { id: payload.id }, defaults: payload, transaction: t });
        imported.push(record);
        if (c.instructorId) {
          const ci = { id: `ci-${record.id}-${c.instructorId}`, courseId: record.id, instructorId: c.instructorId };
          await CourseInstructor.findOrCreate({ where: { id: ci.id }, defaults: ci, transaction: t });
        }
      }
    });
    res.status(201).json({ imported, errors, total: courses.length });
  } catch (err) {
    console.error('courses bulk error', err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/batches/bulk', async (req, res) => {
  const { batches } = req.body;
  if (!Array.isArray(batches)) return res.status(400).json({ error: 'batches must be an array' });
  const imported = [];
  const errors = [];
  try {
    await sequelize.transaction(async (t) => {
      for (let idx = 0; idx < batches.length; idx++) {
        const b = batches[idx];
        if (!b.courseId || !b.name) { errors.push({ row: idx, message: 'courseId and name are required' }); continue; }
        const payload = { id: b.id || genId('b'), courseId: b.courseId, name: b.name, startDate: b.startDate || null, endDate: b.endDate || null, year: b.year || null };
        const [record] = await Batch.findOrCreate({ where: { id: payload.id }, defaults: payload, transaction: t });
        imported.push(record);
      }
    });
    res.status(201).json({ imported, errors, total: batches.length });
  } catch (err) {
    console.error('batches bulk error', err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/instructors/bulk', async (req, res) => {
  const { instructors } = req.body;
  if (!Array.isArray(instructors)) return res.status(400).json({ error: 'instructors must be an array' });
  const imported = [];
  const errors = [];
  try {
    await sequelize.transaction(async (t) => {
      for (let idx = 0; idx < instructors.length; idx++) {
        const i = instructors[idx];
        if (!i.name || !i.email || !i.employeeId) { errors.push({ row: idx, message: 'name, email, employeeId are required' }); continue; }
        const payload = { id: i.id || genId('inst'), name: i.name, email: i.email, employeeId: i.employeeId };
        const [record] = await Instructor.findOrCreate({ where: { id: payload.id }, defaults: payload, transaction: t });
        imported.push(record);
      }
    });
    res.status(201).json({ imported, errors, total: instructors.length });
  } catch (err) {
    console.error('instructors bulk error', err);
    res.status(500).json({ error: 'internal' });
  }
});

// --- Admins ---
app.get('/api/admins', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});
app.post('/api/admins', async (req, res) => {
  try {
    const payload = { id: req.body.id || genId('admin'), name: req.body.name, email: req.body.email, employeeId: req.body.employeeId || null, createdAt: new Date().toISOString().split('T')[0], status: req.body.status || 'active' };
    const created = await Admin.create(payload);
    res.status(201).json(created);
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});
app.delete('/api/admins/:id', async (req, res) => {
  try {
    const a = await Admin.findByPk(req.params.id);
    if (!a) return res.status(404).json({ error: 'not found' });
    await a.destroy();
    res.json({ ok: true });
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});

// --- Attendance ---
app.get('/api/attendance', async (req, res) => {
  try {
    const { batchId, date } = req.query;
    const where = {};
    if (batchId) where.batchId = batchId;
    if (date) where.date = date;
    const rows = await Attendance.findAll({ where });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

app.post('/api/attendance', async (req, res) => {
  try {
    const id = genId('a');
    const created = await Attendance.create({ id, ...req.body });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

// --- Leave Requests ---
app.get('/api/leaverequests', async (req, res) => {
  try {
    const list = await LeaveRequest.findAll();
    res.json(list);
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});
app.post('/api/leaverequests', async (req, res) => {
  try {
    const payload = { id: req.body.id || genId('l'), userId: req.body.userId, userName: req.body.userName, userRole: req.body.userRole, startDate: req.body.startDate, endDate: req.body.endDate, reason: req.body.reason, status: req.body.status || 'pending', appliedDate: req.body.appliedDate || new Date().toISOString().split('T')[0], document: req.body.document || null };
    const created = await LeaveRequest.create(payload);
    res.status(201).json(created);
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});
app.put('/api/leaverequests/:id', async (req, res) => {
  try {
    const l = await LeaveRequest.findByPk(req.params.id);
    if (!l) return res.status(404).json({ error: 'not found' });
    await l.update(req.body);
    res.json(l);
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});

// --- Notifications ---
app.get('/api/notifications', async (req, res) => {
  try {
    const list = await Notification.findAll();
    res.json(list);
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});
app.post('/api/notifications', async (req, res) => {
  try {
    const payload = { id: req.body.id || genId('n'), title: req.body.title, message: req.body.message, target: req.body.target || 'all', createdAt: new Date().toISOString().split('T')[0], createdBy: req.body.createdBy || 'admin' };
    const created = await Notification.create(payload);
    res.status(201).json(created);
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});
app.delete('/api/notifications/:id', async (req, res) => {
  try {
    const n = await Notification.findByPk(req.params.id);
    if (!n) return res.status(404).json({ error: 'not found' });
    await n.destroy();
    res.json({ ok: true });
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
});

// --- Reports ---
app.get('/api/reports', async (req, res) => {
  try {
    const totalStudents = await Student.count();
    const totalInstructors = await Instructor.count();
    const totalCourses = await Course.count();
    const totalAttendance = await Attendance.count();
    const totalPresent = await Attendance.count({ where: { status: 'present' } });
    const attendanceRate = totalAttendance > 0 ? ((totalPresent / totalAttendance) * 100).toFixed(1) : '0.0';
    res.json({ totalStudents, totalInstructors, totalCourses, totalAttendance, totalPresent, attendanceRate });
  } catch (err) { console.error(err); res.status(500).json({ error: 'internal' }); }
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
