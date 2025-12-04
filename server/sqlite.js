const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// SQLite file path in server folder
const dbPath = path.join(__dirname, 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

// Models
const Student = sequelize.define('Student', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  rollNo: DataTypes.STRING,
  parentsEmail: DataTypes.STRING
}, { timestamps: false });

const Course = sequelize.define('Course', {
  id: { type: DataTypes.STRING, primaryKey: true },
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.TEXT
}, { timestamps: false });

const Instructor = sequelize.define('Instructor', {
  id: { type: DataTypes.STRING, primaryKey: true },
  employeeId: DataTypes.STRING,
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, { timestamps: false });

const Batch = sequelize.define('Batch', {
  id: { type: DataTypes.STRING, primaryKey: true },
  courseId: DataTypes.STRING,
  name: DataTypes.STRING,
  startDate: DataTypes.STRING,
  endDate: DataTypes.STRING,
  year: DataTypes.STRING
}, { timestamps: false });

const Attendance = sequelize.define('Attendance', {
  id: { type: DataTypes.STRING, primaryKey: true },
  studentId: DataTypes.STRING,
  courseId: DataTypes.STRING,
  batchId: DataTypes.STRING,
  date: DataTypes.STRING,
  status: DataTypes.STRING,
  takenBy: DataTypes.STRING
}, { timestamps: false });

// Join tables
const CourseInstructor = sequelize.define('CourseInstructor', {
  id: { type: DataTypes.STRING, primaryKey: true },
  courseId: DataTypes.STRING,
  instructorId: DataTypes.STRING
}, { timestamps: false });

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.STRING, primaryKey: true },
  studentId: DataTypes.STRING,
  batchId: DataTypes.STRING
}, { timestamps: false });

// Admins, LeaveRequests, Notifications
const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  employeeId: DataTypes.STRING,
  status: DataTypes.STRING,
  createdAt: DataTypes.STRING
}, { timestamps: false });

const LeaveRequest = sequelize.define('LeaveRequest', {
  id: { type: DataTypes.STRING, primaryKey: true },
  userId: DataTypes.STRING,
  userName: DataTypes.STRING,
  userRole: DataTypes.STRING,
  startDate: DataTypes.STRING,
  endDate: DataTypes.STRING,
  reason: DataTypes.TEXT,
  status: DataTypes.STRING,
  appliedDate: DataTypes.STRING,
  document: DataTypes.STRING
}, { timestamps: false });

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.STRING, primaryKey: true },
  title: DataTypes.STRING,
  message: DataTypes.TEXT,
  target: DataTypes.STRING,
  createdAt: DataTypes.STRING,
  createdBy: DataTypes.STRING
}, { timestamps: false });

async function init() {
  await sequelize.authenticate();
  await sequelize.sync();
}

module.exports = {
  sequelize,
  init,
  Student,
  Course,
  Instructor,
  Batch,
  Attendance,
  CourseInstructor,
  Enrollment
  , Admin
  , LeaveRequest
  , Notification
};
