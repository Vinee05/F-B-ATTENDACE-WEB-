import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Filter, Check, X as XIcon, Eye } from 'lucide-react';
export function LeaveRequests({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    startDate: '',
    endDate: ''
  });
  const [selectedLeave, setSelectedLeave] = useState(null);
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
  const filteredLeaves = appState.leaveRequests.filter(leave => {
    if (filters.role && leave.userRole !== filters.role) return false;
    if (filters.status && leave.status !== filters.status) return false;
    if (filters.startDate && leave.startDate < filters.startDate) return false;
    if (filters.endDate && leave.endDate > filters.endDate) return false;
    return true;
  });
  const handleApprove = leaveId => {
    setAppState(prev => ({
      ...prev,
      leaveRequests: prev.leaveRequests.map(l => l.id === leaveId ? {
        ...l,
        status: 'approved'
      } : l)
    }));
  };
  const handleReject = leaveId => {
    setAppState(prev => ({
      ...prev,
      leaveRequests: prev.leaveRequests.map(l => l.id === leaveId ? {
        ...l,
        status: 'rejected'
      } : l)
    }));
  };
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "leaves",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Leave Requests"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Manage all leave applications")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-4"
  }, /*#__PURE__*/React.createElement(Filter, {
    size: 20,
    className: "text-gray-600"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, "Filters")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Role"), /*#__PURE__*/React.createElement("select", {
    value: filters.role,
    onChange: e => setFilters({
      ...filters,
      role: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Roles"), /*#__PURE__*/React.createElement("option", {
    value: "student"
  }, "Student"), /*#__PURE__*/React.createElement("option", {
    value: "instructor"
  }, "Instructor"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    value: filters.status,
    onChange: e => setFilters({
      ...filters,
      status: e.target.value
    }),
    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All Status"), /*#__PURE__*/React.createElement("option", {
    value: "pending"
  }, "Pending"), /*#__PURE__*/React.createElement("option", {
    value: "approved"
  }, "Approved"), /*#__PURE__*/React.createElement("option", {
    value: "rejected"
  }, "Rejected"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
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
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilters({
      role: '',
      status: '',
      startDate: '',
      endDate: ''
    }),
    className: "mt-4 text-indigo-600 hover:text-indigo-700"
  }, "Clear Filters")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, filteredLeaves.map(leave => /*#__PURE__*/React.createElement("div", {
    key: leave.id,
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900"
  }, leave.userName), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 capitalize"
  }, leave.userRole)), /*#__PURE__*/React.createElement("span", {
    className: `px-3 py-1 rounded-full ${leave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : leave.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`
  }, leave.status)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-4"
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
  }, "Applied On:"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, leave.appliedDate)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Duration:"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1, " day(s)"))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-1"
  }, "Reason:"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900"
  }, leave.reason)), leave.document && /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedLeave(leave),
    className: "flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
  }, /*#__PURE__*/React.createElement(Eye, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "View Document"))), leave.status === 'pending' && /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-3 pt-4 border-t border-gray-200"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleApprove(leave.id),
    className: "flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Approve")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleReject(leave.id),
    className: "flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
  }, /*#__PURE__*/React.createElement(XIcon, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Reject"))))), filteredLeaves.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "col-span-2 text-center py-12 text-gray-500"
  }, "No leave requests found")), selectedLeave && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 w-full max-w-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900"
  }, "Document Preview"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedLeave(null)
  }, /*#__PURE__*/React.createElement(XIcon, {
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-100 rounded-lg p-8 text-center"
  }, /*#__PURE__*/React.createElement(FileText, {
    size: 64,
    className: "mx-auto text-gray-400 mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-900 mb-2"
  }, selectedLeave.document), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Document preview would be displayed here")), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Submitted by:"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, selectedLeave.userName)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Leave Period:"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900"
  }, selectedLeave.startDate, " to ", selectedLeave.endDate)))))));
}