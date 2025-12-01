import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User, LeaveRequest } from '../../App';
import { LayoutDashboard, UserCheck, FileText, Bell, Upload, Plus } from 'lucide-react';

interface StudentLeaveProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function StudentLeave({ appState, setAppState, user, onNavigate, onLogout }: StudentLeaveProps) {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    document: '',
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'attendance', label: 'My Attendance', icon: <UserCheck size={20} /> },
    { id: 'leave', label: 'Leave Requests', icon: <FileText size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  ];

  const myLeaves = appState.leaveRequests.filter(l => l.userId === user.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLeave: LeaveRequest = {
      id: `l${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userRole: 'student',
      ...formData,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setAppState(prev => ({
      ...prev,
      leaveRequests: [newLeave, ...prev.leaveRequests],
    }));

    setFormData({ startDate: '', endDate: '', reason: '', document: '' });
    setShowApplyForm(false);
  };

  return (
    <Layout
      user={user}
      currentPage="leave"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Leave Requests</h1>
            <p className="text-gray-600 mt-1">Apply and manage your leave applications</p>
          </div>
          <button
            onClick={() => setShowApplyForm(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} />
            <span>Apply for Leave</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Requests</p>
            <p className="text-gray-900 mt-2">{myLeaves.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Pending</p>
            <p className="text-yellow-600 mt-2">{myLeaves.filter(l => l.status === 'pending').length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Approved</p>
            <p className="text-green-600 mt-2">{myLeaves.filter(l => l.status === 'approved').length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Rejected</p>
            <p className="text-red-600 mt-2">{myLeaves.filter(l => l.status === 'rejected').length}</p>
          </div>
        </div>

        {/* Leave History */}
        <div className="space-y-4">
          {myLeaves.map((leave) => (
            <div key={leave.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-gray-900">Leave Request</h3>
                  <p className="text-gray-600 mt-1">Applied on {leave.appliedDate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full ${
                  leave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {leave.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Leave Period:</span>
                  <span className="text-gray-900">{leave.startDate} to {leave.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="text-gray-900">
                    {Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Reason:</span>
                  <p className="text-gray-900 mt-1">{leave.reason}</p>
                </div>
                {leave.document && (
                  <div>
                    <span className="text-gray-600">Document:</span>
                    <p className="text-indigo-600 mt-1">{leave.document}</p>
                  </div>
                )}
              </div>

              {leave.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600">Your leave request is being reviewed by the administration.</p>
                </div>
              )}

              {leave.status === 'approved' && (
                <div className="mt-4 pt-4 border-t border-gray-200 bg-green-50 p-3 rounded-lg">
                  <p className="text-green-700">Your leave request has been approved.</p>
                </div>
              )}

              {leave.status === 'rejected' && (
                <div className="mt-4 pt-4 border-t border-gray-200 bg-red-50 p-3 rounded-lg">
                  <p className="text-red-700">Your leave request has been rejected.</p>
                </div>
              )}
            </div>
          ))}

          {myLeaves.length === 0 && (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-gray-900 mb-2">No Leave Requests</h3>
              <p className="text-gray-600 mb-4">You haven't applied for any leaves yet</p>
              <button
                onClick={() => setShowApplyForm(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Apply for Leave
              </button>
            </div>
          )}
        </div>

        {/* Apply Leave Modal */}
        {showApplyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-gray-900 mb-4">Apply for Leave</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Reason</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                    placeholder="Enter reason for leave (e.g., Medical emergency, Family function)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Upload Supporting Document (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-gray-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                    <input
                      type="text"
                      value={formData.document}
                      onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter document name (e.g., medical-certificate.pdf)"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-blue-900 mb-2">Important Information</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Leave requests must be submitted in advance</li>
                    <li>• Supporting documents may be required</li>
                    <li>• Approval is subject to administrative review</li>
                  </ul>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
