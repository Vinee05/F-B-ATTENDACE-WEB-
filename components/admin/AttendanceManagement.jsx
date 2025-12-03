import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Filter, Edit, Save } from 'lucide-react';
export function AttendanceManagement({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [filters, setFilters] = useState({
    courseId: '',
    batchId: '',
    startDate: '',
    endDate: '',
    studentId: ''
  });
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editStatus, setEditStatus] = useState('present');
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
  const filteredAttendance = appState.attendance.filter(record => {
    if (filters.courseId && record.courseId !== filters.courseId) return false;
    if (filters.batchId && record.batchId !== filters.batchId) return false;
    if (filters.startDate && record.date < filters.startDate) return false;
    if (filters.endDate && record.date > filters.endDate) return false;
    if (filters.studentId && record.studentId !== filters.studentId) return false;
    return true;
  });
  const handleEdit = record => {
    setEditingRecordId(record.id);
    setEditStatus(record.status);
  };
  const handleSave = recordId => {
    setAppState(prev => ({
      ...prev,
      attendance: prev.attendance.map(a => a.id === recordId ? {
        ...a,
        status: editStatus
      } : a)
    }));
    setEditingRecordId(null);
  };
  const availableBatches = filters.courseId ? appState.batches.filter(b => b.courseId === filters.courseId) : appState.batches;
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
  }, "Attendance Management"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "View and edit attendance records")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-4"
  }, /*#__PURE__*/React.createElement(Filter, {
    size: 20,
    className: "text-gray-600"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Filters")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-5 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Course"), /*#__PURE__*/React.createElement("select", {
    value: filters.courseId,
    onChange: e => setFilters({
      ...filters,
      courseId: e.target.value,
      batchId: ''
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Courses"), appState.courses.map(course => /*#__PURE__*/React.createElement("option", {
    key: course.id,
    value: course.id
  }, course.code, " - ", course.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Batch"), /*#__PURE__*/React.createElement("select", {
    value: filters.batchId,
    onChange: e => setFilters({
      ...filters,
      batchId: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    disabled: !filters.courseId
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Batches"), availableBatches.map(batch => /*#__PURE__*/React.createElement("option", {
    key: batch.id,
    value: batch.id
  }, batch.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "From Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: filters.startDate,
    onChange: e => setFilters({
      ...filters,
      startDate: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "To Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: filters.endDate,
    onChange: e => setFilters({
      ...filters,
      endDate: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Student"), /*#__PURE__*/React.createElement("select", {
    value: filters.studentId,
    onChange: e => setFilters({
      ...filters,
      studentId: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Students"), appState.students.map(student => /*#__PURE__*/React.createElement("option", {
    key: student.id,
    value: student.id
  }, student.name, " (", student.rollNo, ")"))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilters({
      courseId: '',
      batchId: '',
      startDate: '',
      endDate: '',
      studentId: ''
    }),
    className: "mt-4 text-indigo-600 hover:text-indigo-700"
  }, "Clear Filters")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Date"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Student"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Roll No"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Course"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Batch"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Taken By"), /*#__PURE__*/React.createElement("th", {
    className: "text-right py-3 px-4 text-gray-700"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, filteredAttendance.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 8,
    className: "py-8 text-center text-gray-500"
  }, "No attendance records found")) : filteredAttendance.map(record => {
    const student = appState.students.find(s => s.id === record.studentId);
    const course = appState.courses.find(c => c.id === record.courseId);
    const batch = appState.batches.find(b => b.id === record.batchId);
    const instructor = appState.instructors.find(i => i.id === record.takenBy);
    const isEditing = editingRecordId === record.id;
    return /*#__PURE__*/React.createElement("tr", {
      key: record.id,
      className: "border-t border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, record.date), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, student?.name || 'Unknown'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, student?.rollNo || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, course?.code || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, batch?.name || 'N/A'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4"
    }, isEditing ? /*#__PURE__*/React.createElement("select", {
      value: editStatus,
      onChange: e => setEditStatus(e.target.value),
      className: "px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    }, /*#__PURE__*/React.createElement("option", {
      value: "present"
    }, "Present"), /*#__PURE__*/React.createElement("option", {
      value: "absent"
    }, "Absent"), /*#__PURE__*/React.createElement("option", {
      value: "excused"
    }, "Excused")) : /*#__PURE__*/React.createElement("span", {
      className: `inline-flex px-3 py-1 rounded-full ${record.status === 'present' ? 'bg-green-100 text-green-700' : record.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`
    }, record.status)), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, instructor?.name || 'Admin'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-end space-x-2"
    }, isEditing ? /*#__PURE__*/React.createElement("button", {
      onClick: () => handleSave(record.id),
      className: "p-2 text-green-600 hover:bg-green-50 rounded-lg"
    }, /*#__PURE__*/React.createElement(Save, {
      size: 18
    })) : /*#__PURE__*/React.createElement("button", {
      onClick: () => handleEdit(record),
      className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
    }, /*#__PURE__*/React.createElement(Edit, {
      size: 18
    })))));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Records"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, filteredAttendance.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Present"), /*#__PURE__*/React.createElement("p", {
    className: "text-green-600 mt-2"
  }, filteredAttendance.filter(a => a.status === 'present').length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Absent"), /*#__PURE__*/React.createElement("p", {
    className: "text-red-600 mt-2"
  }, filteredAttendance.filter(a => a.status === 'absent').length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Excused"), /*#__PURE__*/React.createElement("p", {
    className: "text-yellow-600 mt-2"
  }, filteredAttendance.filter(a => a.status === 'excused').length)))));
}