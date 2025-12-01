import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User, LeaveRequest } from '../../App';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Filter, Check, X as XIcon, Eye } from 'lucide-react';

interface LeaveRequestsProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function LeaveRequests({ appState, setAppState, user, onNavigate, onLogout }: LeaveRequestsProps) {
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    startDate: '',
    endDate: '',
  });
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'courses', label: 'Manage Courses', icon: <BookOpen size={20} /> },
    { id: 'batches', label: 'Manage Batches', icon: <Calendar size={20} /> },
    { id: 'students', label: 'Manage Students', icon: <GraduationCap size={20} /> },
    { id: 'instructors', label: 'Manage Instructors', icon: <Users size={20} /> },
    { id: 'attendance', label: 'Attendance Management', icon: <UserCheck size={20} /> },
    { id: 'leaves', label: 'Leave Requests', icon: <FileText size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const filteredLeaves = appState.leaveRequests.filter(leave => {
    if (filters.role && leave.userRole !== filters.role) return false;
    if (filters.status && leave.status !== filters.status) return false;
    if (filters.startDate && leave.startDate < filters.startDate) return false;
    if (filters.endDate && leave.endDate > filters.endDate) return false;
    return true;
  });

  const handleApprove = (leaveId: string) => {
    setAppState(prev => ({
      ...prev,
      leaveRequests: prev.leaveRequests.map(l =>
        l.id === leaveId ? { ...l, status: 'approved' as const } : l
      ),
    }));
  };

  const handleReject = (leaveId: string) => {
    setAppState(prev => ({
      ...prev,
      leaveRequests: prev.leaveRequests.map(l =>
        l.id === leaveId ? { ...l, status: 'rejected' as const } : l
      ),
    }));
  };

  return (
    <Layout
      user={user}
      currentPage="leaves"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900">Leave Requests</h1>
          <p className="text-gray-600 mt-1">Manage all leave applications</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="text-gray-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={() => setFilters({ role: '', status: '', startDate: '', endDate: '' })}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Clear Filters
          </button>
        </div>

        {/* Leave Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLeaves.map((leave) => (
            <div key={leave.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-gray-900">{leave.userName}</h3>
                  <p className="text-gray-600 capitalize">{leave.userRole}</p>
                </div>
                <span className={`px-3 py-1 rounded-full ${
                  leave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {leave.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Leave Period:</span>
                  <span className="text-gray-900">{leave.startDate} to {leave.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applied On:</span>
                  <span className="text-gray-900">{leave.appliedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="text-gray-900">
                    {Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-1">Reason:</p>
                <p className="text-gray-900">{leave.reason}</p>
              </div>

              {leave.document && (
                <div className="mb-4">
                  <button
                    onClick={() => setSelectedLeave(leave)}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
                  >
                    <Eye size={18} />
                    <span>View Document</span>
                  </button>
                </div>
              )}

              {leave.status === 'pending' && (
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(leave.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    <Check size={18} />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(leave.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    <XIcon size={18} />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {filteredLeaves.length === 0 && (
            <div className="col-span-2 text-center py-12 text-gray-500">
              No leave requests found
            </div>
          )}
        </div>

        {/* Document Preview Modal */}
        {selectedLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Document Preview</h2>
                <button onClick={() => setSelectedLeave(null)}>
                  <XIcon size={24} />
                </button>
              </div>

              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-900 mb-2">{selectedLeave.document}</p>
                <p className="text-gray-600">Document preview would be displayed here</p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted by:</span>
                  <span className="text-gray-900">{selectedLeave.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Leave Period:</span>
                  <span className="text-gray-900">{selectedLeave.startDate} to {selectedLeave.endDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
