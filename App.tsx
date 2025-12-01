import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ManageCourses } from './components/admin/ManageCourses';
import { AttendanceManagement } from './components/admin/AttendanceManagement';
import { LeaveRequests } from './components/admin/LeaveRequests';
import { Notifications } from './components/admin/Notifications';
import { ManageStudents } from './components/admin/ManageStudents';
import { ManageInstructors } from './components/admin/ManageInstructors';
import { ManageBatches } from './components/admin/ManageBatches';
import { Reports } from './components/admin/Reports';
import { Settings } from './components/admin/Settings';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { CoursePage } from './components/instructor/CoursePage';
import { TakeAttendance } from './components/instructor/TakeAttendance';
import { StudentHistory } from './components/instructor/StudentHistory';
import { InstructorLeave } from './components/instructor/InstructorLeave';
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentAttendance } from './components/student/StudentAttendance';
import { StudentLeave } from './components/student/StudentLeave';

export type UserRole = 'admin' | 'instructor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  courseDays?: string[];
  excludeWeekends?: boolean;
  holidays?: string[];
  instructorId?: string;
  instructorName?: string;
}

export interface Batch {
  id: string;
  courseId: string;
  name: string;
  startDate: string;
  endDate: string;
  year: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  batchId?: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  employeeId: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  batchId: string;
  date: string;
  status: 'present' | 'absent' | 'excused';
  takenBy: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  startDate: string;
  endDate: string;
  reason: string;
  document?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  target: 'all' | 'students' | 'instructors' | string;
  createdAt: string;
  createdBy: string;
}

export interface AppState {
  courses: Course[];
  batches: Batch[];
  students: Student[];
  instructors: Instructor[];
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  notifications: Notification[];
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Initialize mock data
  const [appState, setAppState] = useState<AppState>({
    courses: [
      { id: '1', name: 'Computer Science Fundamentals', code: 'CS101', description: 'Introduction to programming', instructorId: 'inst1', instructorName: 'Dr. Sarah Johnson' },
      { id: '2', name: 'Data Structures & Algorithms', code: 'CS201', description: 'Advanced data structures', instructorId: 'inst2', instructorName: 'Prof. Michael Chen' },
      { id: '3', name: 'Web Development', code: 'CS301', description: 'Full stack web development', instructorId: 'inst1', instructorName: 'Dr. Sarah Johnson' },
      { id: '4', name: 'Database Systems', code: 'CS202', description: 'Relational and NoSQL databases', instructorId: 'inst3', instructorName: 'Dr. Emily Brown' },
    ],
    batches: [
      { id: 'b1', courseId: '1', name: 'Batch A1', startDate: '2025-01-15', endDate: '2025-06-15', year: '2025' },
      { id: 'b2', courseId: '1', name: 'Batch A2', startDate: '2025-01-15', endDate: '2025-06-15', year: '2025' },
      { id: 'b3', courseId: '2', name: 'Batch B1', startDate: '2025-02-01', endDate: '2025-07-01', year: '2025' },
      { id: 'b4', courseId: '3', name: 'Batch C1', startDate: '2025-01-20', endDate: '2025-05-20', year: '2025' },
    ],
    students: [
      { id: 's1', name: 'Alice Williams', email: 'alice@example.com', rollNo: 'STU001', batchId: 'b1' },
      { id: 's2', name: 'Bob Martinez', email: 'bob@example.com', rollNo: 'STU002', batchId: 'b1' },
      { id: 's3', name: 'Carol Davis', email: 'carol@example.com', rollNo: 'STU003', batchId: 'b1' },
      { id: 's4', name: 'David Lee', email: 'david@example.com', rollNo: 'STU004', batchId: 'b2' },
      { id: 's5', name: 'Emma Wilson', email: 'emma@example.com', rollNo: 'STU005', batchId: 'b3' },
      { id: 's6', name: 'Frank Garcia', email: 'frank@example.com', rollNo: 'STU006', batchId: 'b3' },
    ],
    instructors: [
      { id: 'inst1', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', employeeId: 'EMP001' },
      { id: 'inst2', name: 'Prof. Michael Chen', email: 'michael@example.com', employeeId: 'EMP002' },
      { id: 'inst3', name: 'Dr. Emily Brown', email: 'emily@example.com', employeeId: 'EMP003' },
    ],
    attendance: [
      { id: 'a1', studentId: 's1', courseId: '1', batchId: 'b1', date: '2025-11-25', status: 'present', takenBy: 'inst1' },
      { id: 'a2', studentId: 's2', courseId: '1', batchId: 'b1', date: '2025-11-25', status: 'present', takenBy: 'inst1' },
      { id: 'a3', studentId: 's3', courseId: '1', batchId: 'b1', date: '2025-11-25', status: 'absent', takenBy: 'inst1' },
      { id: 'a4', studentId: 's1', courseId: '1', batchId: 'b1', date: '2025-11-26', status: 'present', takenBy: 'inst1' },
      { id: 'a5', studentId: 's2', courseId: '1', batchId: 'b1', date: '2025-11-26', status: 'absent', takenBy: 'inst1' },
      { id: 'a6', studentId: 's3', courseId: '1', batchId: 'b1', date: '2025-11-26', status: 'excused', takenBy: 'inst1' },
    ],
    leaveRequests: [
      { id: 'l1', userId: 's1', userName: 'Alice Williams', userRole: 'student', startDate: '2025-11-28', endDate: '2025-11-29', reason: 'Medical emergency', status: 'pending', appliedDate: '2025-11-27', document: 'medical-cert.pdf' },
      { id: 'l2', userId: 'inst2', userName: 'Prof. Michael Chen', userRole: 'instructor', startDate: '2025-12-05', endDate: '2025-12-07', reason: 'Conference attendance', status: 'approved', appliedDate: '2025-11-20', document: 'conference-invite.pdf' },
      { id: 'l3', userId: 's5', userName: 'Emma Wilson', userRole: 'student', startDate: '2025-11-30', endDate: '2025-11-30', reason: 'Family function', status: 'rejected', appliedDate: '2025-11-28' },
    ],
    notifications: [
      { id: 'n1', title: 'Holiday Notice', message: 'Campus will be closed on December 25th for Christmas', target: 'all', createdAt: '2025-11-20', createdBy: 'admin' },
      { id: 'n2', title: 'Exam Schedule', message: 'Final exams will begin from January 10th', target: 'students', createdAt: '2025-11-22', createdBy: 'admin' },
    ],
  });

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - detect role from email
    let role: UserRole = 'student';
    let name = 'User';
    let id = '';

    if (email.includes('admin')) {
      role = 'admin';
      name = 'Admin User';
      id = 'admin1';
    } else if (email.includes('sarah') || email.includes('michael') || email.includes('emily')) {
      role = 'instructor';
      const instructor = appState.instructors.find(i => i.email === email);
      if (instructor) {
        name = instructor.name;
        id = instructor.id;
      }
    } else {
      role = 'student';
      const student = appState.students.find(s => s.email === email);
      if (student) {
        name = student.name;
        id = student.id;
      }
    }

    setUser({ id, name, email, role });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  const navigate = (page: string, courseId?: string, studentId?: string) => {
    setCurrentPage(page);
    if (courseId) setSelectedCourseId(courseId);
    if (studentId) setSelectedStudentId(studentId);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Admin Routes
  if (user.role === 'admin') {
    return (
      <>
        {currentPage === 'dashboard' && (
          <AdminDashboard
            appState={appState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'courses' && (
          <ManageCourses
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'batches' && (
          <ManageBatches
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'students' && (
          <ManageStudents
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'instructors' && (
          <ManageInstructors
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'attendance' && (
          <AttendanceManagement
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'leaves' && (
          <LeaveRequests
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'notifications' && (
          <Notifications
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'reports' && (
          <Reports
            appState={appState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'settings' && (
          <Settings
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
      </>
    );
  }

  // Instructor Routes
  if (user.role === 'instructor') {
    return (
      <>
        {currentPage === 'dashboard' && (
          <InstructorDashboard
            appState={appState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'course' && selectedCourseId && (
          <CoursePage
            appState={appState}
            user={user}
            courseId={selectedCourseId}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'take-attendance' && selectedCourseId && (
          <TakeAttendance
            appState={appState}
            setAppState={setAppState}
            user={user}
            courseId={selectedCourseId}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'student-history' && selectedStudentId && (
          <StudentHistory
            appState={appState}
            user={user}
            studentId={selectedStudentId}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'leave' && (
          <InstructorLeave
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
      </>
    );
  }

  // Student Routes
  if (user.role === 'student') {
    return (
      <>
        {currentPage === 'dashboard' && (
          <StudentDashboard
            appState={appState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'attendance' && (
          <StudentAttendance
            appState={appState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'leave' && (
          <StudentLeave
            appState={appState}
            setAppState={setAppState}
            user={user}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        )}
      </>
    );
  }

  return null;
}