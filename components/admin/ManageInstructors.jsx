import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
export function ManageInstructors({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: ''
  });
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
      email: '',
      employeeId: ''
    });
    setEditingInstructor(null);
    setShowAddModal(true);
  };
  const handleEdit = instructor => {
    setFormData({
      name: instructor.name,
      email: instructor.email,
      employeeId: instructor.employeeId
    });
    setEditingInstructor(instructor);
    setShowAddModal(true);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (editingInstructor) {
      setAppState(prev => ({
        ...prev,
        instructors: prev.instructors.map(i => i.id === editingInstructor.id ? {
          ...i,
          ...formData
        } : i)
      }));
    } else {
      const newInstructor = {
        id: `inst${Date.now()}`,
        ...formData
      };
      setAppState(prev => ({
        ...prev,
        instructors: [...prev.instructors, newInstructor]
      }));
    }
    setShowAddModal(false);
  };
  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this instructor?')) {
      setAppState(prev => ({
        ...prev,
        instructors: prev.instructors.filter(i => i.id !== id)
      }));
    }
  };
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "instructors",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Manage Instructors"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Add and manage instructor records")), /*#__PURE__*/React.createElement("button", {
    onClick: handleAdd,
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Add New Instructor"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Employee ID"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Email"), /*#__PURE__*/React.createElement("th", {
    className: "text-left py-3 px-4 text-gray-700"
  }, "Assigned Courses"), /*#__PURE__*/React.createElement("th", {
    className: "text-right py-3 px-4 text-gray-700"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, appState.instructors.map(instructor => {
    const assignedCourses = appState.courses.filter(c => c.instructorId === instructor.id);
    return /*#__PURE__*/React.createElement("tr", {
      key: instructor.id,
      className: "border-t border-gray-100 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, instructor.employeeId), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-900"
    }, instructor.name), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, instructor.email), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4 text-gray-600"
    }, assignedCourses.length > 0 ? assignedCourses.map(c => c.code).join(', ') : 'No courses assigned'), /*#__PURE__*/React.createElement("td", {
      className: "py-3 px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-end space-x-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => handleEdit(instructor),
      className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
    }, /*#__PURE__*/React.createElement(Edit, {
      size: 18
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDelete(instructor.id),
      className: "p-2 text-red-600 hover:bg-red-50 rounded-lg"
    }, /*#__PURE__*/React.createElement(Trash2, {
      size: 18
    })))));
  })))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 w-full max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900"
  }, editingInstructor ? 'Edit Instructor' : 'Add New Instructor'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAddModal(false)
  }, /*#__PURE__*/React.createElement(X, {
    size: 24
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Employee ID"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.employeeId,
    onChange: e => setFormData({
      ...formData,
      employeeId: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
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
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: formData.email,
    onChange: e => setFormData({
      ...formData,
      email: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-3 pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
  }, editingInstructor ? 'Update' : 'Add', " Instructor"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowAddModal(false),
    className: "flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
  }, "Cancel")))))));
}