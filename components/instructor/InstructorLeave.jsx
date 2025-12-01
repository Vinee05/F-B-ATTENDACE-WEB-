import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, FileText, Upload, Plus } from 'lucide-react';
export function InstructorLeave({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    document: ''
  });
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
  const myLeaves = appState.leaveRequests.filter(l => l.userId === user.id);
  const handleSubmit = e => {
    e.preventDefault();
    const newLeave = {
      id: `l${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userRole: 'instructor',
      ...formData,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setAppState(prev => ({
      ...prev,
      leaveRequests: [newLeave, ...prev.leaveRequests]
    }));
    setFormData({
      startDate: '',
      endDate: '',
      reason: '',
      document: ''
    });
    setShowApplyForm(false);
  };
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "leave",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Leave Requests"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Apply and manage your leave applications")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowApplyForm(true),
    className: "flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Apply for Leave"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Requests"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-2"
  }, myLeaves.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Pending"), /*#__PURE__*/React.createElement("p", {
    className: "text-yellow-600 mt-2"
  }, myLeaves.filter(l => l.status === 'pending').length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Approved"), /*#__PURE__*/React.createElement("p", {
    className: "text-green-600 mt-2"
  }, myLeaves.filter(l => l.status === 'approved').length))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, myLeaves.map(leave => /*#__PURE__*/React.createElement("div", {
    key: leave.id,
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Leave Request"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Applied on ", leave.appliedDate)), /*#__PURE__*/React.createElement("span", {
    className: `px-3 py-1 rounded-full ${leave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : leave.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`
  }, leave.status)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Leave Period:"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, leave.startDate, " to ", leave.endDate)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Duration:"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1, " day(s)")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Reason:"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mt-1"
  }, leave.reason)), leave.document && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Document:"), /*#__PURE__*/React.createElement("p", {
    className: "text-indigo-600 mt-1"
  }, leave.document))))), myLeaves.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-12 border border-gray-200 text-center"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "mx-auto text-gray-400 mb-4",
    size: 48
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-2"
  }, "No Leave Requests"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "You haven't applied for any leaves yet"))), showApplyForm && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 w-full max-w-md"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mb-4"
  }, "Apply for Leave"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Start Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: formData.startDate,
    onChange: e => setFormData({
      ...formData,
      startDate: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "End Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: formData.endDate,
    onChange: e => setFormData({
      ...formData,
      endDate: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Reason"), /*#__PURE__*/React.createElement("textarea", {
    value: formData.reason,
    onChange: e => setFormData({
      ...formData,
      reason: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    rows: 4,
    placeholder: "Enter reason for leave",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Upload Document (Optional)"), /*#__PURE__*/React.createElement("div", {
    className: "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
  }, /*#__PURE__*/React.createElement(Upload, {
    className: "mx-auto text-gray-400 mb-2",
    size: 32
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Click to upload or drag and drop"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.document,
    onChange: e => setFormData({
      ...formData,
      document: e.target.value
    }),
    className: "w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
    placeholder: "Enter document name"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-3 pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
  }, "Submit Request"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowApplyForm(false),
    className: "flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
  }, "Cancel")))))));
}