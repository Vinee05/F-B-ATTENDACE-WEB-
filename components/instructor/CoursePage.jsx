import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, FileText, ArrowLeft, UserCheck, Calendar, Users } from 'lucide-react';
export function CoursePage({
  appState,
  user,
  courseId,
  onNavigate,
  onLogout
}) {
  const [selectedBatchId, setSelectedBatchId] = useState('');
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
  const course = appState.courses.find(c => c.id === courseId);
  const courseBatches = appState.batches.filter(b => b.courseId === courseId);
  const selectedBatch = selectedBatchId ? appState.batches.find(b => b.id === selectedBatchId) : courseBatches[0];
  const batchStudents = selectedBatch ? appState.students.filter(s => s.batchId === selectedBatch.id) : [];
  if (!course) {
    return /*#__PURE__*/React.createElement(Layout, {
      user: user,
      currentPage: "dashboard",
      onNavigate: onNavigate,
      onLogout: onLogout,
      sidebarItems: sidebarItems
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center py-12"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600"
    }, "Course not found"), /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate('dashboard'),
      className: "mt-4 text-indigo-600 hover:text-indigo-700"
    }, "Return to Dashboard")));
  }
  React.useEffect(() => {
    if (courseBatches.length > 0 && !selectedBatchId) {
      setSelectedBatchId(courseBatches[0].id);
    }
  }, [courseBatches, selectedBatchId]);
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "course",
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
  }), /*#__PURE__*/React.createElement("span", null, "Back to Dashboard")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full mb-2"
  }, course.code), /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, course.name), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, course.description)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Select Batch"), /*#__PURE__*/React.createElement("select", {
    value: selectedBatchId,
    onChange: e => setSelectedBatchId(e.target.value),
    className: "w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, courseBatches.map(batch => /*#__PURE__*/React.createElement("option", {
    key: batch.id,
    value: batch.id
  }, batch.name, " (", batch.startDate, " to ", batch.endDate, ")")))), selectedBatch && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Batch Details"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Batch Name"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, selectedBatch.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Duration"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, selectedBatch.startDate, " to ", selectedBatch.endDate)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Students"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, batchStudents.length)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('take-attendance', courseId),
    className: "bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
  }, /*#__PURE__*/React.createElement(UserCheck, {
    className: "text-indigo-600 mb-3",
    size: 32
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Take Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Mark attendance for today's session")), /*#__PURE__*/React.createElement("button", {
    onClick: () => alert('View Attendance History'),
    className: "bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "text-indigo-600 mb-3",
    size: 32
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Attendance History"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "View past attendance records"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Student List")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Roll No"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Email"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Total Sessions"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Present"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Attendance %"), /*#__PURE__*/React.createElement("th", {
    className: "text-center py-3 px-4 text-gray-700"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, batchStudents.map(student => {
    const studentAttendance = appState.attendance.filter(a => a.studentId === student.id && a.courseId === courseId && a.batchId === selectedBatch.id);
    const present = studentAttendance.filter(a => a.status === 'present').length;
    const total = studentAttendance.length;
    const percentage = total > 0 ? Math.round(present / total * 100) : 0;
    return /*#__PURE__*/React.createElement("tr", {
      key: student.id,
      className: "border-t border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, student.rollNo), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, student.name), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, student.email), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center text-gray-900"
    }, total), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center text-green-600"
    }, present), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: `inline-flex px-3 py-1 rounded-full ${percentage >= 75 ? 'bg-green-100 text-green-700' : percentage >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`
    }, percentage, "%")), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-center"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate('student-history', undefined, student.id),
      className: "text-indigo-600 hover:text-indigo-700"
    }, "View History")));
  }), batchStudents.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    className: "py-8 text-center text-gray-500"
  }, /*#__PURE__*/React.createElement(Users, {
    size: 48,
    className: "mx-auto mb-4 text-gray-400"
  }), /*#__PURE__*/React.createElement("p", null, "No students enrolled in this batch"))))))))));
}