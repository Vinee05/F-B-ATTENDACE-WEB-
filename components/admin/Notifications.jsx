import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, X, Send } from 'lucide-react';
export function Notifications({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'all'
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
  const handleSubmit = e => {
    e.preventDefault();
    const newNotification = {
      id: `n${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user.id
    };
    setAppState(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications]
    }));
    setFormData({
      title: '',
      message: '',
      target: 'all'
    });
    setShowCreateModal(false);
  };
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "notifications",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Notifications"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Send announcements and notifications")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowCreateModal(true),
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Create Notification"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, appState.notifications.map(notification => /*#__PURE__*/React.createElement("div", {
    key: notification.id,
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, notification.title), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-2"
  }, notification.message)), /*#__PURE__*/React.createElement(Bell, {
    className: "text-indigo-600",
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-4 border-t border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Target: ", /*#__PURE__*/React.createElement("span", {
    className: "capitalize text-gray-900"
  }, notification.target)), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Created: ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, notification.createdAt)))))), appState.notifications.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-12 border border-gray-200 text-center"
  }, /*#__PURE__*/React.createElement(Bell, {
    className: "mx-auto text-gray-400 mb-4",
    size: 48
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-2"
  }, "No Notifications Yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Create your first notification to send announcements"))), showCreateModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 w-full max-w-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900"
  }, "Create Notification"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowCreateModal(false)
  }, /*#__PURE__*/React.createElement(X, {
    size: 24
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.title,
    onChange: e => setFormData({
      ...formData,
      title: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    placeholder: "Enter notification title",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Message"), /*#__PURE__*/React.createElement("textarea", {
    value: formData.message,
    onChange: e => setFormData({
      ...formData,
      message: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    rows: 4,
    placeholder: "Enter notification message",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Target Audience"), /*#__PURE__*/React.createElement("select", {
    value: formData.target,
    onChange: e => setFormData({
      ...formData,
      target: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "All Users"), /*#__PURE__*/React.createElement("option", {
    value: "students"
  }, "Students Only"), /*#__PURE__*/React.createElement("option", {
    value: "instructors"
  }, "Instructors Only"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-50 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-gray-900 mb-2"
  }, "Preview"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-4 rounded-lg border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900"
  }, formData.title || 'Notification Title'), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-2"
  }, formData.message || 'Notification message will appear here'), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 mt-2"
  }, "Target: ", formData.target))), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-3 pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
  }, /*#__PURE__*/React.createElement(Send, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Send Notification")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowCreateModal(false),
    className: "flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
  }, "Cancel")))))));
}