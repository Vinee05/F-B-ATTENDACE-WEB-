import React from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export function Reports({
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

  // Calculate attendance by date
  const attendanceByDate = appState.attendance.reduce((acc, record) => {
    const existing = acc.find(item => item.date === record.date);
    if (existing) {
      if (record.status === 'present') existing.present++;
      if (record.status === 'absent') existing.absent++;
      if (record.status === 'excused') existing.excused++;
    } else {
      acc.push({
        date: record.date,
        present: record.status === 'present' ? 1 : 0,
        absent: record.status === 'absent' ? 1 : 0,
        excused: record.status === 'excused' ? 1 : 0
      });
    }
    return acc;
  }, []).sort((a, b) => a.date.localeCompare(b.date));

  // Calculate attendance by course
  const attendanceByCourse = appState.courses.map(course => {
    const courseAttendance = appState.attendance.filter(a => a.courseId === course.id);
    const present = courseAttendance.filter(a => a.status === 'present').length;
    const total = courseAttendance.length;
    return {
      name: course.code,
      attendance: total > 0 ? Math.round(present / total * 100) : 0
    };
  });

  // Status distribution
  const statusData = [{
    name: 'Present',
    value: appState.attendance.filter(a => a.status === 'present').length,
    color: '#10b981'
  }, {
    name: 'Absent',
    value: appState.attendance.filter(a => a.status === 'absent').length,
    color: '#ef4444'
  }, {
    name: 'Excused',
    value: appState.attendance.filter(a => a.status === 'excused').length,
    color: '#f59e0b'
  }];
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "reports",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Reports & Analytics"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Attendance insights and statistics")), /*#__PURE__*/React.createElement("button", {
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
  }, /*#__PURE__*/React.createElement(Download, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Export Report"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Sessions"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, new Set(appState.attendance.map(a => a.date)).size)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Present"), /*#__PURE__*/React.createElement("p", {
    className: "text-green-600 mt-2"
  }, appState.attendance.filter(a => a.status === 'present').length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Absent"), /*#__PURE__*/React.createElement("p", {
    className: "text-red-600 mt-2"
  }, appState.attendance.filter(a => a.status === 'absent').length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Overall Rate"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, appState.attendance.length > 0 ? Math.round(appState.attendance.filter(a => a.status === 'present').length / appState.attendance.length * 100) : 0, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Attendance Trend"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: attendanceByDate
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date"
  }), /*#__PURE__*/React.createElement(YAxis, null), /*#__PURE__*/React.createElement(Tooltip, null), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "present",
    stroke: "#10b981",
    name: "Present"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "absent",
    stroke: "#ef4444",
    name: "Absent"
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "excused",
    stroke: "#f59e0b",
    name: "Excused"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Attendance Rate by Course"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: attendanceByCourse
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "name"
  }), /*#__PURE__*/React.createElement(YAxis, null), /*#__PURE__*/React.createElement(Tooltip, null), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "attendance",
    fill: "#6366f1",
    name: "Attendance %"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Status Distribution"), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: statusData,
    cx: "50%",
    cy: "50%",
    labelLine: false,
    label: ({
      name,
      value
    }) => `${name}: ${value}`,
    outerRadius: 100,
    fill: "#8884d8",
    dataKey: "value"
  }, statusData.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: entry.color
  }))), /*#__PURE__*/React.createElement(Tooltip, null))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Student Attendance Summary"), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Student"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Roll No"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Present"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Absent"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Excused"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Total"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Percentage"))), /*#__PURE__*/React.createElement("tbody", null, appState.students.map(student => {
    const studentAttendance = appState.attendance.filter(a => a.studentId === student.id);
    const present = studentAttendance.filter(a => a.status === 'present').length;
    const absent = studentAttendance.filter(a => a.status === 'absent').length;
    const excused = studentAttendance.filter(a => a.status === 'excused').length;
    const total = studentAttendance.length;
    const percentage = total > 0 ? Math.round(present / total * 100) : 0;
    return /*#__PURE__*/React.createElement("tr", {
      key: student.id,
      className: "border-t border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, student.name), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, student.rollNo), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center text-green-600"
    }, present), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center text-red-600"
    }, absent), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center text-yellow-600"
    }, excused), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center text-gray-900"
    }, total), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-flex px-3 py-1 rounded-full ${percentage >= 75 ? 'bg-green-100 text-green-700' : percentage >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`
    }, percentage, "%")));
  })))))));
}