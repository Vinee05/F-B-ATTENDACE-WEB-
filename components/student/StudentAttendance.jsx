import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, UserCheck, FileText, Bell, Filter, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export function StudentAttendance({
  appState,
  user,
  onNavigate,
  onLogout
}) {
  const [filters, setFilters] = useState({
    courseId: '',
    startDate: '',
    endDate: ''
  });
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
  const myAttendance = appState.attendance.filter(a => a.studentId === user.id).filter(a => {
    if (filters.courseId && a.courseId !== filters.courseId) return false;
    if (filters.startDate && a.date < filters.startDate) return false;
    if (filters.endDate && a.date > filters.endDate) return false;
    return true;
  }).sort((a, b) => b.date.localeCompare(a.date));
  const totalPresent = myAttendance.filter(a => a.status === 'present').length;
  const totalAbsent = myAttendance.filter(a => a.status === 'absent').length;
  const totalExcused = myAttendance.filter(a => a.status === 'excused').length;
  const totalSessions = myAttendance.length;
  const percentage = totalSessions > 0 ? Math.round(totalPresent / totalSessions * 100) : 0;

  // Chart data - by month
  const attendanceByMonth = myAttendance.reduce((acc, record) => {
    const month = record.date.substring(0, 7);
    const existing = acc.find(item => item.month === month);
    if (existing) {
      if (record.status === 'present') existing.present++;
      if (record.status === 'absent') existing.absent++;
      if (record.status === 'excused') existing.excused++;
    } else {
      acc.push({
        month,
        present: record.status === 'present' ? 1 : 0,
        absent: record.status === 'absent' ? 1 : 0,
        excused: record.status === 'excused' ? 1 : 0
      });
    }
    return acc;
  }, []).sort((a, b) => a.month.localeCompare(b.month));
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "attendance",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "My Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "View your attendance records and analytics")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-5 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Sessions"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, totalSessions)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Present"), /*#__PURE__*/React.createElement("p", {
    className: "text-green-600 mt-2"
  }, totalPresent)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Absent"), /*#__PURE__*/React.createElement("p", {
    className: "text-red-600 mt-2"
  }, totalAbsent)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Excused"), /*#__PURE__*/React.createElement("p", {
    className: "text-yellow-600 mt-2"
  }, totalExcused)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Percentage"), /*#__PURE__*/React.createElement("p", {
    className: `mt-2 ${percentage >= 75 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`
  }, percentage, "%"))), percentage < 75 && totalSessions > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-yellow-50 border border-yellow-200 rounded-xl p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-yellow-100 p-2 rounded-lg"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "text-yellow-600",
    size: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-yellow-900"
  }, "Attendance Warning"), /*#__PURE__*/React.createElement("p", {
    className: "text-yellow-700 mt-1"
  }, "Your attendance is below 75%. You need to attend more classes to meet the minimum requirement.")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-4"
  }, /*#__PURE__*/React.createElement(Filter, {
    size: 20,
    className: "text-gray-600"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Filters")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Course"), /*#__PURE__*/React.createElement("select", {
    value: filters.courseId,
    onChange: e => setFilters({
      ...filters,
      courseId: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Courses"), appState.courses.map(course => /*#__PURE__*/React.createElement("option", {
    key: course.id,
    value: course.id
  }, course.code, " - ", course.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Start Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: filters.startDate,
    onChange: e => setFilters({
      ...filters,
      startDate: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "End Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: filters.endDate,
    onChange: e => setFilters({
      ...filters,
      endDate: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilters({
      courseId: '',
      startDate: '',
      endDate: ''
    }),
    className: "mt-4 text-indigo-600 hover:text-indigo-700"
  }, "Clear Filters")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Attendance Trend"), attendanceByMonth.length > 0 ? /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: attendanceByMonth
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month"
  }), /*#__PURE__*/React.createElement(YAxis, null), /*#__PURE__*/React.createElement(Tooltip, null), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "present",
    fill: "#10b981",
    name: "Present"
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "absent",
    fill: "#ef4444",
    name: "Absent"
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "excused",
    fill: "#f59e0b",
    name: "Excused"
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12 text-gray-500"
  }, /*#__PURE__*/React.createElement("p", null, "No data available for chart"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Session-wise Details")), /*#__PURE__*/React.createElement("div", {
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
  }, "Batch"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Instructor"))), /*#__PURE__*/React.createElement("tbody", null, myAttendance.map(record => {
    const course = appState.courses.find(c => c.id === record.courseId);
    const recordBatch = appState.batches.find(b => b.id === record.batchId);
    const instructor = appState.instructors.find(i => i.id === record.takenBy);
    return /*#__PURE__*/React.createElement("tr", {
      key: record.id,
      className: "border-t border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, record.date), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, course?.code || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, recordBatch?.name || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-flex px-3 py-1 rounded-full ${record.status === 'present' ? 'bg-green-100 text-green-700' : record.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`
    }, record.status)), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, instructor?.name || 'Admin'));
  }), myAttendance.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    className: "py-8 text-center text-gray-500"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 48,
    className: "mx-auto mb-4 text-gray-400"
  }), /*#__PURE__*/React.createElement("p", null, "No attendance records found")))))))));
}