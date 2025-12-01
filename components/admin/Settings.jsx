import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings as SettingsIcon, GraduationCap, Save } from 'lucide-react';
export function Settings({
  user,
  onNavigate,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('profile');
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
    icon: /*#__PURE__*/React.createElement(SettingsIcon, {
      size: 20
    })
  }];
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "settings",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Manage system preferences and configuration")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl border border-gray-200 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('profile'),
    className: `flex-1 px-6 py-4 ${activeTab === 'profile' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`
  }, "Profile Settings"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('system'),
    className: `flex-1 px-6 py-4 ${activeTab === 'system' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`
  }, "System Settings"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('notifications'),
    className: `flex-1 px-6 py-4 ${activeTab === 'notifications' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`
  }, "Notification Settings")), /*#__PURE__*/React.createElement("div", {
    className: "p-6"
  }, activeTab === 'profile' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: user.name,
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    defaultValue: user.email,
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Current Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Enter current password",
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "New Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Enter new password",
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("button", {
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
  }, /*#__PURE__*/React.createElement(Save, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Save Changes"))), activeTab === 'system' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Academic Year"), /*#__PURE__*/React.createElement("select", {
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", null, "2024-2025"), /*#__PURE__*/React.createElement("option", null, "2025-2026"), /*#__PURE__*/React.createElement("option", null, "2026-2027"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Minimum Attendance Requirement (%)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    defaultValue: "75",
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Time Zone"), /*#__PURE__*/React.createElement("select", {
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", null, "UTC (GMT+0)"), /*#__PURE__*/React.createElement("option", null, "EST (GMT-5)"), /*#__PURE__*/React.createElement("option", null, "PST (GMT-8)"), /*#__PURE__*/React.createElement("option", null, "IST (GMT+5:30)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-gray-700"
  }, "Allow instructors to mark attendance"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-gray-700"
  }, "Require document upload for leave requests"))), /*#__PURE__*/React.createElement("button", {
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
  }, /*#__PURE__*/React.createElement(Save, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Save System Settings"))), activeTab === 'notifications' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "Email Notifications"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-gray-700"
  }, "New leave requests")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-gray-700"
  }, "Low attendance alerts")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-gray-700"
  }, "Weekly reports")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-4"
  }, "System Notifications"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-gray-700"
  }, "New user registrations")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-gray-700"
  }, "Course updates")))), /*#__PURE__*/React.createElement("button", {
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
  }, /*#__PURE__*/React.createElement(Save, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Save Notification Settings")))))));
}