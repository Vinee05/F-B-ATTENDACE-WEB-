import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, ArrowLeft, Save, CheckCircle } from 'lucide-react';
export function TakeAttendance({
  appState,
  setAppState,
  user,
  courseId,
  onNavigate,
  onLogout
}) {
  const course = appState.courses.find(c => c.id === courseId);
  const courseBatches = appState.batches.filter(b => b.courseId === courseId);
  const [selectedBatchId, setSelectedBatchId] = useState(courseBatches[0]?.id || '');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [studentStatuses, setStudentStatuses] = useState({});
  const [saved, setSaved] = useState(false);
  const sidebarItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(LayoutDashboard, {
      size: 20
    })
  }];
  const selectedBatch = appState.batches.find(b => b.id === selectedBatchId);
  const batchStudents = selectedBatch ? appState.students.filter(s => s.batchId === selectedBatch.id) : [];

  // Initialize all students as absent
  React.useEffect(() => {
    const initialStatuses = {};
    batchStudents.forEach(student => {
      initialStatuses[student.id] = 'absent';
    });
    setStudentStatuses(initialStatuses);
  }, [selectedBatchId]);
  const toggleStudentStatus = studentId => {
    setStudentStatuses(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
    }));
  };
  const markAllPresent = () => {
    const allPresent = {};
    batchStudents.forEach(student => {
      allPresent[student.id] = 'present';
    });
    setStudentStatuses(allPresent);
  };
  const handleSave = () => {
    const newRecords = batchStudents.map(student => ({
      id: `a${Date.now()}_${student.id}`,
      studentId: student.id,
      courseId: courseId,
      batchId: selectedBatchId,
      date: attendanceDate,
      status: studentStatuses[student.id] || 'absent',
      takenBy: user.id
    }));
    setAppState(prev => ({
      ...prev,
      attendance: [...prev.attendance, ...newRecords]
    }));
    setSaved(true);
    setTimeout(() => {
      onNavigate('course', courseId);
    }, 1500);
  };
  const presentCount = Object.values(studentStatuses).filter(s => s === 'present').length;
  const absentCount = batchStudents.length - presentCount;
  if (!course) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "take-attendance",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('course', courseId),
    className: "flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-4"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Back to Course")), /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Take Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, course.name, " - ", course.code)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Select Batch"), /*#__PURE__*/React.createElement("select", {
    value: selectedBatchId,
    onChange: e => setSelectedBatchId(e.target.value),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, courseBatches.map(batch => /*#__PURE__*/React.createElement("option", {
    key: batch.id,
    value: batch.id
  }, batch.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: attendanceDate,
    onChange: e => setAttendanceDate(e.target.value),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Students"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, batchStudents.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Present"), /*#__PURE__*/React.createElement("p", {
    className: "text-green-600 mt-2"
  }, presentCount)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Absent"), /*#__PURE__*/React.createElement("p", {
    className: "text-red-600 mt-2"
  }, absentCount))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-gray-200 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Mark Attendance (Default: Absent)"), /*#__PURE__*/React.createElement("button", {
    onClick: markAllPresent,
    className: "flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Mark All Present"))), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-gray-100"
  }, batchStudents.map(student => {
    const isPresent = studentStatuses[student.id] === 'present';
    return /*#__PURE__*/React.createElement("div", {
      key: student.id,
      className: "p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer",
      onClick: () => toggleStudentStatus(student.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: isPresent,
      onChange: () => toggleStudentStatus(student.id),
      className: "w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-900"
    }, student.name), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600"
    }, student.rollNo))), /*#__PURE__*/React.createElement("span", {
      className: `px-4 py-2 rounded-lg ${isPresent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`
    }, isPresent ? 'Present' : 'Absent'));
  }), batchStudents.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center text-gray-500"
  }, "No students enrolled in this batch"))), batchStudents.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg rounded-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-700"
  }, "Present: ", presentCount, " | Absent: ", absentCount)), /*#__PURE__*/React.createElement("button", {
    onClick: handleSave,
    disabled: saved,
    className: `flex items-center space-x-2 px-6 py-3 rounded-lg ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`
  }, saved ? /*#__PURE__*/React.createElement(CheckCircle, {
    size: 20
  }) : /*#__PURE__*/React.createElement(Save, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, saved ? 'Attendance Saved!' : 'Save Attendance'))))));
}