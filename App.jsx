import React, { useState, useEffect } from 'react';
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
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentAttendance } from './components/student/StudentAttendance';
import { StudentLeave } from './components/student/StudentLeave';
export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // App will load authoritative data from the API on mount
  const [appState, setAppState] = useState({
    courses: [],
    batches: [],
    students: [],
    instructors: [],
    attendance: [],
    leaveRequests: [],
    notifications: [],
    admins: []
  });

  useEffect(() => {
    async function loadAll() {
      try {
        const [coursesRes, batchesRes, studentsRes, instructorsRes, attendanceRes, leavesRes, notesRes, adminsRes] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/batches'),
          fetch('/api/students'),
          fetch('/api/instructors'),
          fetch('/api/attendance'),
          fetch('/api/leaverequests'),
          fetch('/api/notifications'),
          fetch('/api/admins')
        ]);

        const [courses, batches, students, instructors, attendance, leaveRequests, notifications, admins] = await Promise.all([
          coursesRes.json(), batchesRes.json(), studentsRes.json(), instructorsRes.json(), attendanceRes.json(), leavesRes.json(), notesRes.json(), adminsRes.json()
        ]);

        setAppState({ courses, batches, students, instructors, attendance, leaveRequests, notifications, admins });
      } catch (err) {
        console.error('Failed to load data from API', err);
      }
    }
    loadAll();
  }, []);
  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        // Expecting { id, name, email, role }
        setUser({ id: data.id || '', name: data.name || data.email, email: data.email, role: data.role || 'student' });
        setCurrentPage('dashboard');
        return;
      }
      console.warn('Login request failed, falling back to local mock auth');
    } catch (err) {
      console.error('Login API error, falling back to mock', err);
    }

    // Fallback: Mock authentication - detect role from email
    let role = 'student';
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
  const navigate = (page, courseId, studentId) => {
    setCurrentPage(page);
    if (courseId) setSelectedCourseId(courseId);
    if (studentId) setSelectedStudentId(studentId);
  };
  if (!user) {
    return /*#__PURE__*/React.createElement(LoginPage, {
      onLogin: handleLogin
    });
  }

  // Admin Routes
  if (user.role === 'admin') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, currentPage === 'dashboard' && /*#__PURE__*/React.createElement(AdminDashboard, {
      appState: appState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'courses' && /*#__PURE__*/React.createElement(ManageCourses, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'batches' && /*#__PURE__*/React.createElement(ManageBatches, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'students' && /*#__PURE__*/React.createElement(ManageStudents, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'instructors' && /*#__PURE__*/React.createElement(ManageInstructors, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'attendance' && /*#__PURE__*/React.createElement(AttendanceManagement, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'leaves' && /*#__PURE__*/React.createElement(LeaveRequests, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'notifications' && /*#__PURE__*/React.createElement(Notifications, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'reports' && /*#__PURE__*/React.createElement(Reports, {
      appState: appState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'settings' && /*#__PURE__*/React.createElement(Settings, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }));
  }

  // Instructor Routes
  if (user.role === 'instructor') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, currentPage === 'dashboard' && /*#__PURE__*/React.createElement(InstructorDashboard, {
      appState: appState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'course' && selectedCourseId && /*#__PURE__*/React.createElement(CoursePage, {
      appState: appState,
      user: user,
      courseId: selectedCourseId,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'take-attendance' && selectedCourseId && /*#__PURE__*/React.createElement(TakeAttendance, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      courseId: selectedCourseId,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'student-history' && selectedStudentId && /*#__PURE__*/React.createElement(StudentHistory, {
      appState: appState,
      user: user,
      studentId: selectedStudentId,
      onNavigate: navigate,
      onLogout: handleLogout
    }));
  }

  // Student Routes
  if (user.role === 'student') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, currentPage === 'dashboard' && /*#__PURE__*/React.createElement(StudentDashboard, {
      appState: appState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'attendance' && /*#__PURE__*/React.createElement(StudentAttendance, {
      appState: appState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }), currentPage === 'leave' && /*#__PURE__*/React.createElement(StudentLeave, {
      appState: appState,
      setAppState: setAppState,
      user: user,
      onNavigate: navigate,
      onLogout: handleLogout
    }));
  }
  return null;
}