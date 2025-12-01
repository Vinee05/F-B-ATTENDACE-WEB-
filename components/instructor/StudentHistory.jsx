import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, FileText, ArrowLeft, Calendar } from 'lucide-react';
export function StudentHistory({
  appState,
  user,
  studentId,
  onNavigate,
  onLogout
}) {
  const [dateFilter, setDateFilter] = useState({
    start: '',
    end: ''
  });
  const [statusFilter, setStatusFilter] = useState('');
  const sidebarItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(LayoutDashboard, {
      size: 20
    })
  }, {
    id: 'leave',
    label: 'Apply Leave',
    icon: /*#__PURE__*/React.createElement(FileText, {
      size: 20
    })
  }];
  const student = appState.students.find(s => s.id === studentId);
  const studentAttendance = appState.attendance.filter(a => a.studentId === studentId).filter(a => {
    if (dateFilter.start && a.date < dateFilter.start) return false;
    if (dateFilter.end && a.date > dateFilter.end) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  }).sort((a, b) => b.date.localeCompare(a.date));
  const batch = student ? appState.batches.find(b => b.id === student.batchId) : null;
  const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;
  const totalPresent = studentAttendance.filter(a => a.status === 'present').length;
  const totalAbsent = studentAttendance.filter(a => a.status === 'absent').length;
  const totalExcused = studentAttendance.filter(a => a.status === 'excused').length;
  const totalSessions = studentAttendance.length;
  const percentage = totalSessions > 0 ? Math.round(totalPresent / totalSessions * 100) : 0;

  // Calendar view data - group by month
  const attendanceByMonth = studentAttendance.reduce((acc, record) => {
    const month = record.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = [];
    acc[month].push(record);
    return acc;
  }, {});
  if (!student) {
    return /*#__PURE__*/React.createElement(Layout, {
      user: user,
      currentPage: "student-history",
      onNavigate: onNavigate,
      onLogout: onLogout,
      sidebarItems: sidebarItems
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center py-12"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600"
    }, "Student not found")));
  }
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "student-history",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('dashboard'),
    className: "flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Back to Dashboard")), /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Student Attendance History"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, student.name, " (", student.rollNo, ")")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Roll Number"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, student.rollNo)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Email"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, student.email)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Batch"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, batch?.name || 'N/A')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Course"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, course?.code || 'N/A')))), /*#__PURE__*/React.createElement("div", {
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
  }, percentage, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Filters"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Start Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateFilter.start,
    onChange: e => setDateFilter({
      ...dateFilter,
      start: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "End Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: dateFilter.end,
    onChange: e => setDateFilter({
      ...dateFilter,
      end: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    value: statusFilter,
    onChange: e => setStatusFilter(e.target.value),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Status"), /*#__PURE__*/React.createElement("option", {
    value: "present"
  }, "Present"), /*#__PURE__*/React.createElement("option", {
    value: "absent"
  }, "Absent"), /*#__PURE__*/React.createElement("option", {
    value: "excused"
  }, "Excused")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDateFilter({
        start: '',
        end: ''
      });
      setStatusFilter('');
    },
    className: "mt-4 text-indigo-600 hover:text-indigo-700"
  }, "Clear Filters")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-4"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "text-indigo-600",
    size: 24
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Calendar View")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, Object.entries(attendanceByMonth).map(([month, records]) => /*#__PURE__*/React.createElement("div", {
    key: month,
    className: "border border-gray-200 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-gray-900 mb-3"
  }, month), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-2"
  }, records.map(record => /*#__PURE__*/React.createElement("div", {
    key: record.id,
    className: `p-2 rounded text-center ${record.status === 'present' ? 'bg-green-100 text-green-700' : record.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`,
    title: `${record.date} - ${record.status}`
  }, /*#__PURE__*/React.createElement("div", null, record.date.split('-')[2])))))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Attendance Records")), /*#__PURE__*/React.createElement("div", {
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
  }, "Marked By"))), /*#__PURE__*/React.createElement("tbody", null, studentAttendance.map(record => {
    const recordCourse = appState.courses.find(c => c.id === record.courseId);
    const recordBatch = appState.batches.find(b => b.id === record.batchId);
    const instructor = appState.instructors.find(i => i.id === record.takenBy);
    return /*#__PURE__*/React.createElement("tr", {
      key: record.id,
      className: "border-t border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, record.date), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, recordCourse?.code || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, recordBatch?.name || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-flex px-3 py-1 rounded-full ${record.status === 'present' ? 'bg-green-100 text-green-700' : record.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`
    }, record.status)), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, instructor?.name || 'Admin'));
  }), studentAttendance.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    className: "py-8 text-center text-gray-500"
  }, "No attendance records found"))))))));
}