import React from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap } from 'lucide-react';
export function AdminDashboard({
  appState,
  user,
  onNavigate,
  onLogout
}) {
  const sidebarItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(LayoutDashboard, {
      size: 20
    })
  }, {
    id: 'courses',
    label: 'Manage Courses',
    icon: /*#__PURE__*/React.createElement(BookOpen, {
      size: 20
    })
  }, {
    id: 'batches',
    label: 'Manage Batches',
    icon: /*#__PURE__*/React.createElement(Calendar, {
      size: 20
    })
  }, {
    id: 'students',
    label: 'Manage Students',
    icon: /*#__PURE__*/React.createElement(GraduationCap, {
      size: 20
    })
  }, {
    id: 'instructors',
    label: 'Manage Instructors',
    icon: /*#__PURE__*/React.createElement(Users, {
      size: 20
    })
  }, {
    id: 'attendance',
    label: 'Attendance Management',
    icon: /*#__PURE__*/React.createElement(UserCheck, {
      size: 20
    })
  }, {
    id: 'leaves',
    label: 'Leave Requests',
    icon: /*#__PURE__*/React.createElement(FileText, {
      size: 20
    })
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: /*#__PURE__*/React.createElement(Bell, {
      size: 20
    })
  }, {
    id: 'reports',
    label: 'Reports',
    icon: /*#__PURE__*/React.createElement(BarChart3, {
      size: 20
    })
  }, {
    id: 'settings',
    label: 'Settings',
    icon: /*#__PURE__*/React.createElement(Settings, {
      size: 20
    })
  }];
  const pendingLeaves = appState.leaveRequests.filter(l => l.status === 'pending').length;
  const totalPresent = appState.attendance.filter(a => a.status === 'present').length;
  const totalAttendance = appState.attendance.length;
  const attendanceRate = totalAttendance > 0 ? (totalPresent / totalAttendance * 100).toFixed(1) : '0.0';
  const recentAttendance = appState.attendance.slice(-5).reverse();
  const recentLeaves = appState.leaveRequests.slice(-5).reverse();
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "dashboard",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Admin Dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Overview of the attendance management system")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Students"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mt-2"
  }, appState.students.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    className: "text-blue-600",
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Instructors"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mt-2"
  }, appState.instructors.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(Users, {
    className: "text-purple-600",
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Active Courses"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mt-2"
  }, appState.courses.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-green-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "text-green-600",
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Pending Leave Requests"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mt-2"
  }, pendingLeaves)), /*#__PURE__*/React.createElement("div", {
    className: "bg-yellow-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "text-yellow-600",
    size: 24
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "System Statistics"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Overall Attendance Rate"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex items-baseline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, attendanceRate, "%"), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-green-600"
  }, "\u2191 Good"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Batches"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, appState.batches.length)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Active Sessions"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, new Set(appState.attendance.map(a => a.date)).size)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Recent Attendance Sessions"), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Date"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Student"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Course"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Marked By"))), /*#__PURE__*/React.createElement("tbody", null, recentAttendance.map(record => {
    const student = appState.students.find(s => s.id === record.studentId);
    const course = appState.courses.find(c => c.id === record.courseId);
    const instructor = appState.instructors.find(i => i.id === record.takenBy);
    return /*#__PURE__*/React.createElement("tr", {
      key: record.id,
      className: "border-b border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, record.date), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, student?.name || 'Unknown'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, course?.code || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-flex px-3 py-1 rounded-full ${record.status === 'present' ? 'bg-green-100 text-green-700' : record.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`
    }, record.status)), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, instructor?.name || 'Admin'));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Recent Leave Applications"), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Applied Date"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Role"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Leave Period"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, recentLeaves.map(leave => /*#__PURE__*/React.createElement("tr", {
    key: leave.id,
    className: "border-b border-gray-100 hover:bg-gray-50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-gray-900"
  }, leave.appliedDate), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-gray-900"
  }, leave.userName), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "capitalize text-gray-600"
  }, leave.userRole)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-gray-600"
  }, leave.startDate, " to ", leave.endDate), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: `inline-flex px-3 py-1 rounded-full ${leave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : leave.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`
  }, leave.status)))))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('courses'),
    className: "bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "text-indigo-600 mb-3",
    size: 32
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Add New Course"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Create and manage courses")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('students'),
    className: "bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
  }, /*#__PURE__*/React.createElement(GraduationCap, {
    className: "text-indigo-600 mb-3",
    size: 32
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Add New Student"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Enroll students in system")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('attendance'),
    className: "bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
  }, /*#__PURE__*/React.createElement(UserCheck, {
    className: "text-indigo-600 mb-3",
    size: 32
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "View Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Monitor attendance records")))));
}