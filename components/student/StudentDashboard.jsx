import React from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, UserCheck, FileText, Bell, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
export function StudentDashboard({
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
    id: 'attendance',
    label: 'My Attendance',
    icon: /*#__PURE__*/React.createElement(UserCheck, {
      size: 20
    })
  }, {
    id: 'leave',
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
  }];
  const student = appState.students.find(s => s.id === user.id);
  const batch = student ? appState.batches.find(b => b.id === student.batchId) : null;
  const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;
  const myAttendance = appState.attendance.filter(a => a.studentId === user.id);
  const totalPresent = myAttendance.filter(a => a.status === 'present').length;
  const totalAbsent = myAttendance.filter(a => a.status === 'absent').length;
  const totalExcused = myAttendance.filter(a => a.status === 'excused').length;
  const totalSessions = myAttendance.length;
  const percentage = totalSessions > 0 ? Math.round(totalPresent / totalSessions * 100) : 0;
  const myLeaves = appState.leaveRequests.filter(l => l.userId === user.id);
  const myNotifications = appState.notifications.filter(n => n.target === 'all' || n.target === 'students');
  const chartData = [{
    name: 'Present',
    value: totalPresent,
    color: '#10b981'
  }, {
    name: 'Absent',
    value: totalAbsent,
    color: '#ef4444'
  }, {
    name: 'Excused',
    value: totalExcused,
    color: '#f59e0b'
  }].filter(item => item.value > 0);
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
  }, "Student Dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Welcome back, ", user.name)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Present"), /*#__PURE__*/React.createElement("h2", {
    className: "text-green-600 mt-2"
  }, totalPresent)), /*#__PURE__*/React.createElement("div", {
    className: "bg-green-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(UserCheck, {
    className: "text-green-600",
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Absent"), /*#__PURE__*/React.createElement("h2", {
    className: "text-red-600 mt-2"
  }, totalAbsent)), /*#__PURE__*/React.createElement("div", {
    className: "bg-red-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(UserCheck, {
    className: "text-red-600",
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Attendance %"), /*#__PURE__*/React.createElement("h2", {
    className: `mt-2 ${percentage >= 75 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`
  }, percentage, "%")), /*#__PURE__*/React.createElement("div", {
    className: "bg-indigo-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    className: "text-indigo-600",
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Current Batch"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mt-2"
  }, batch?.name || 'N/A')), /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(LayoutDashboard, {
    className: "text-purple-600",
    size: 24
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "My Information"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Roll Number"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, student?.rollNo || 'N/A')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Course"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, course?.name || 'Not Enrolled')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Batch"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, batch?.name || 'Not Assigned')))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Attendance Distribution"), chartData.length > 0 ? /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 250
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: chartData,
    cx: "50%",
    cy: "50%",
    labelLine: false,
    label: ({
      name,
      value
    }) => `${name}: ${value}`,
    outerRadius: 80,
    fill: "#8884d8",
    dataKey: "value"
  }, chartData.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  }))), /*#__PURE__*/React.createElement(Tooltip, null))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12 text-gray-500"
  }, /*#__PURE__*/React.createElement("p", null, "No attendance data available"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Quick Actions"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('attendance'),
    className: "w-full flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors text-left"
  }, /*#__PURE__*/React.createElement(UserCheck, {
    className: "text-indigo-600",
    size: 24
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900"
  }, "View My Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Check detailed attendance records"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('leave'),
    className: "w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "text-purple-600",
    size: 24
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900"
  }, "Apply for Leave"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Submit a new leave request")))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Recent Notifications"), myNotifications.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, myNotifications.slice(0, 3).map(notification => /*#__PURE__*/React.createElement("div", {
    key: notification.id,
    className: "p-4 bg-blue-50 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-gray-900"
  }, notification.title), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, notification.message)), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, notification.createdAt))))) : /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-center py-8"
  }, "No new notifications")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Recent Attendance")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Date"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Course"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, myAttendance.slice(-5).reverse().map(record => {
    const recordCourse = appState.courses.find(c => c.id === record.courseId);
    return /*#__PURE__*/React.createElement("tr", {
      key: record.id,
      className: "border-t border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, record.date), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, recordCourse?.code || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-flex px-3 py-1 rounded-full ${record.status === 'present' ? 'bg-green-100 text-green-700' : record.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`
    }, record.status)));
  }), myAttendance.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 3,
    className: "py-8 text-center text-gray-500"
  }, "No attendance records yet"))))))));
}