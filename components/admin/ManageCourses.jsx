import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
import { MultiDayPicker } from '../ui/multi-day-picker';
export function ManageCourses({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    instructorId: '',
    courseDays: []
  });
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [holidays, setHolidays] = useState([]);
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
  const handleAdd = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      instructorId: '',
      courseDays: []
    });
    setEditingCourse(null);
    setShowAddModal(true);
  };
  const handleEdit = course => {
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      instructorId: course.instructorId || '',
      courseDays: course.courseDays || []
    });
    setEditingCourse(course);
    setShowAddModal(true);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const instructor = appState.instructors.find(i => i.id === formData.instructorId);
    if (editingCourse) {
      setAppState(prev => ({
        ...prev,
        courses: prev.courses.map(c => c.id === editingCourse.id ? {
          ...c,
          ...formData,
          instructorName: instructor?.name
        } : c)
      }));
    } else {
      const newCourse = {
        id: `c${Date.now()}`,
        ...formData,
        instructorName: instructor?.name
      };
      setAppState(prev => ({
        ...prev,
        courses: [...prev.courses, newCourse]
      }));
    }
    setShowAddModal(false);
  };
  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this course?')) {
      setAppState(prev => ({
        ...prev,
        courses: prev.courses.filter(c => c.id !== id)
      }));
    }
  };
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "courses",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Manage Courses"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Create and manage all courses")), /*#__PURE__*/React.createElement("button", {
    onClick: handleAdd,
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Add New Course"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Code"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Course Name"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Description"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Instructor"), /*#__PURE__*/React.createElement("th", {
    className: "text-right py-3 px-4 text-gray-700"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, appState.courses.map(course => /*#__PURE__*/React.createElement("tr", {
    key: course.id,
    className: "border-t border-gray-100 hover:bg-gray-50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-gray-900"
  }, course.code), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedCourse(course),
    className: "text-indigo-600 hover:text-indigo-700"
  }, course.name)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-gray-600"
  }, course.description), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-gray-600"
  }, course.instructorName || 'Not Assigned'), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end space-x-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleEdit(course),
    className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
  }, /*#__PURE__*/React.createElement(Edit, {
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDelete(course.id),
    className: "p-2 text-red-600 hover:bg-red-50 rounded-lg"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 18
  }))))))))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 w-full max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900"
  }, editingCourse ? 'Edit Course' : 'Add New Course'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAddModal(false)
  }, /*#__PURE__*/React.createElement(X, {
    size: 24
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Course Code"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.code,
    onChange: e => setFormData({
      ...formData,
      code: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Course Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.name,
    onChange: e => setFormData({
      ...formData,
      name: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    value: formData.description,
    onChange: e => setFormData({
      ...formData,
      description: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    rows: 3,
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Assign Instructor"), /*#__PURE__*/React.createElement("select", {
    value: formData.instructorId,
    onChange: e => setFormData({
      ...formData,
      instructorId: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Instructor"), appState.instructors.map(instructor => /*#__PURE__*/React.createElement("option", {
    key: instructor.id,
    value: instructor.id
  }, instructor.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 16
  }), " Course Days (Excluding Weekends & Holidays)"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowDayPicker(true),
    className: "w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium text-gray-900"
  }, formData.courseDays.length > 0 ? `${formData.courseDays.length} days selected` : 'Click to select days'), formData.courseDays.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex flex-wrap gap-1"
  }, formData.courseDays.slice(0, 3).map(day => /*#__PURE__*/React.createElement("span", {
    key: day,
    className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
  }, new Date(day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }))), formData.courseDays.length > 3 && /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
  }, "+", formData.courseDays.length - 3, " more"))), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-3 pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
  }, editingCourse ? 'Update' : 'Add', " Course"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowAddModal(false),
    className: "flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
  }, "Cancel"))))), showDayPicker && /*#__PURE__*/React.createElement(MultiDayPicker, {
    selectedDays: formData.courseDays,
    holidays: holidays,
    onSelectDays: days => {
      setFormData({
        ...formData,
        courseDays: days
      });
      setShowDayPicker(false);
    },
    onClose: () => setShowDayPicker(false)
  }), selectedCourse && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900"
  }, "Course Details"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedCourse(null)
  }, /*#__PURE__*/React.createElement(X, {
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Course Code"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, selectedCourse.code)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Instructor"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, selectedCourse.instructorName || 'Not Assigned'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Course Name"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, selectedCourse.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Description"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, selectedCourse.description)), selectedCourse.courseDays && selectedCourse.courseDays.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50 p-4 rounded-lg border border-blue-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: 16
  }), " Course Days (", selectedCourse.courseDays.length, " days)"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, selectedCourse.courseDays.map(day => /*#__PURE__*/React.createElement("span", {
    key: day,
    className: "text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium"
  }, new Date(day).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-3"
  }, "Batches"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, appState.batches.filter(b => b.courseId === selectedCourse.id).map(batch => /*#__PURE__*/React.createElement("div", {
    key: batch.id,
    className: "bg-gray-50 p-4 rounded-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900"
  }, batch.name), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, batch.startDate, " to ", batch.endDate)), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, batch.year)))), appState.batches.filter(b => b.courseId === selectedCourse.id).length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500"
  }, "No batches assigned"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-3"
  }, "Enrolled Students"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, appState.students.filter(s => {
    const batch = appState.batches.find(b => b.id === s.batchId);
    return batch?.courseId === selectedCourse.id;
  }).map(student => /*#__PURE__*/React.createElement("div", {
    key: student.id,
    className: "bg-gray-50 p-4 rounded-lg flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900"
  }, student.name), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, student.rollNo)), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, student.email))), appState.students.filter(s => {
    const batch = appState.batches.find(b => b.id === s.batchId);
    return batch?.courseId === selectedCourse.id;
  }).length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500"
  }, "No students enrolled"))))))));
}