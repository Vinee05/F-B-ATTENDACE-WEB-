import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, UserCheck, FileText, Bell, Upload, Plus } from 'lucide-react';
export function StudentLeave({
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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sidebarItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(LayoutDashboard, {
      size: 20
    })
  }, {
    id: 'attendance',
    label: 'My Attendance',
    icon: /*#__PURE__*/React.createElement(UserCheck, {
      size: 20
    })
  }, {
    id: 'leave',
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
  }];
  const myLeaves = appState.leaveRequests.filter(l => l.userId === user.id);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, JPG, and PNG files are allowed');
        e.target.value = '';
        return;
      }
      setUploadedFile(file);
      setFormData({ ...formData, document: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let documentPath = null;

      // Upload file if selected
      if (uploadedFile) {
        const formDataFile = new FormData();
        formDataFile.append('file', uploadedFile);

        const uploadRes = await fetch('/api/leaverequests/upload', {
          method: 'POST',
          body: formDataFile
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error || 'Failed to upload file');
        }

        const uploadedData = await uploadRes.json();
        documentPath = uploadedData.path; // e.g., /uploads/1733900000-document.pdf
      }

      const payload = {
        userId: user.id,
        userName: user.name,
        userRole: 'student',
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        document: documentPath || null, // Store the full path
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0]
      };

      const res = await fetch('/api/leaverequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit leave request');
      }

      const created = await res.json();

      // Refresh leave requests from backend
      const leaveRes = await fetch('/api/leaverequests');
      if (!leaveRes.ok) throw new Error('Failed to reload leave requests');
      const leaveRequests = await leaveRes.json();
      
      setAppState(prev => ({
        ...prev,
        leaveRequests
      }));

      setFormData({
        startDate: '',
        endDate: '',
        reason: '',
        document: ''
      });
      setUploadedFile(null);
      setShowApplyForm(false);
      alert('Leave request submitted successfully!');
    } catch (err) {
      console.error('Error submitting leave request:', err);
      alert('Failed to submit leave request: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
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
    className: "grid grid-cols-1 md:grid-cols-4 gap-6"
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
  }, myLeaves.filter(l => l.status === 'approved').length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Rejected"), /*#__PURE__*/React.createElement("p", {
    className: "text-red-600 mt-2"
  }, myLeaves.filter(l => l.status === 'rejected').length))), /*#__PURE__*/React.createElement("div", {
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
  }, leave.document))), leave.status === 'pending' && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Your leave request is being reviewed by the administration.")), leave.status === 'approved' && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t border-gray-200 bg-green-50 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-green-700"
  }, "Your leave request has been approved.")), leave.status === 'rejected' && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t border-gray-200 bg-red-50 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-red-700"
  }, "Your leave request has been rejected.")))), myLeaves.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-12 border border-gray-200 text-center"
  }, /*#__PURE__*/React.createElement(FileText, {
    className: "mx-auto text-gray-400 mb-4",
    size: 48
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-gray-900 mb-2"
  }, "No Leave Requests"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-4"
  }, "You haven't applied for any leaves yet"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowApplyForm(true),
    className: "bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
  }, "Apply for Leave"))), showApplyForm && /*#__PURE__*/React.createElement("div", {
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
    placeholder: "Enter reason for leave (e.g., Medical emergency, Family function)",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-gray-700 mb-2"
  }, "Upload Supporting Document (Optional)"), /*#__PURE__*/React.createElement("div", {
    className: "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors cursor-pointer",
    onClick: () => document.getElementById('file-upload').click()
  }, /*#__PURE__*/React.createElement(Upload, {
    className: "mx-auto text-gray-400 mb-2",
    size: 32
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 mt-1"
  }, "PDF, JPG, PNG up to 5MB"), /*#__PURE__*/React.createElement("input", {
    id: "file-upload",
    type: "file",
    accept: ".pdf,.jpg,.jpeg,.png",
    onChange: handleFileChange,
    className: "hidden"
  }), uploadedFile && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: (e) => {
      e.stopPropagation();
      setUploadedFile(null);
      setFormData({ ...formData, document: '' });
      document.getElementById('file-upload').value = '';
    },
    className: "mt-2 text-red-600 hover:text-red-700 text-sm"
  }, "Remove file"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50 border border-blue-200 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-blue-900 mb-2"
  }, "Important Information"), /*#__PURE__*/React.createElement("ul", {
    className: "text-blue-700 space-y-1"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Leave requests must be submitted in advance"), /*#__PURE__*/React.createElement("li", null, "\u2022 Supporting documents may be required"), /*#__PURE__*/React.createElement("li", null, "\u2022 Approval is subject to administrative review"))), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-3 pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
  }, isSubmitting ? "Submitting..." : "Submit Request"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setShowApplyForm(false);
      setUploadedFile(null);
      setFormData({ startDate: '', endDate: '', reason: '', document: '' });
    },
    disabled: isSubmitting,
    className: "flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
  }, "Cancel")))))));
}