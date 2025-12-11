import React, { useState, useMemo } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Filter, X as XIcon } from 'lucide-react';

export function LeaveRequests({ appState, setAppState, user, onNavigate, onLogout }) {
  const [filters, setFilters] = useState({ courseId: '', batchId: '', status: '', startDate: '', endDate: '' });
  const [selectedLeave, setSelectedLeave] = useState(null);

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
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const availableBatches = useMemo(() => (filters.courseId ? appState.batches.filter(b => b.courseId === filters.courseId) : appState.batches), [filters.courseId, appState.batches]);

  const getUserAssociation = (leave) => {
    const student = appState.students.find(s => s.id === leave.userId);
    const instructor = appState.instructors.find(i => i.id === leave.userId);
    if (student) {
      const batch = appState.batches.find(b => b.id === student.batchId);
      const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;
      return { type: 'student', batchName: batch ? batch.name : '', courseName: course ? course.name : '' };
    }
    if (instructor) {
      const courses = appState.courses.filter(c => (Array.isArray(c.instructorIds) ? c.instructorIds.includes(instructor.id) : c.instructorId === instructor.id)).map(c => c.name);
      return { type: 'instructor', courseNames: courses };
    }
    return {};
  };

  const filteredLeaves = appState.leaveRequests.filter(leave => {
    const student = appState.students.find(s => s.id === leave.userId);
    const instructor = appState.instructors.find(i => i.id === leave.userId);
    const userBatchId = student ? student.batchId : undefined;

    let userCourseIds = [];
    if (student) {
      const batch = appState.batches.find(b => b.id === student.batchId);
      if (batch && batch.courseId) userCourseIds.push(batch.courseId);
    }
    if (instructor) {
      userCourseIds = userCourseIds.concat(appState.courses.filter(c => (Array.isArray(c.instructorIds) ? c.instructorIds.includes(instructor.id) : c.instructorId === instructor.id)).map(c => c.id));
    }

    if (filters.courseId && (!userCourseIds || !userCourseIds.includes(filters.courseId))) return false;
    if (filters.batchId && userBatchId !== filters.batchId) return false;
    if (filters.status && leave.status !== filters.status) return false;
    if (filters.startDate && leave.startDate < filters.startDate) return false;
    if (filters.endDate && leave.endDate > filters.endDate) return false;
    return true;
  });

  const handleApprove = async (leaveId) => {
    try {
      const res = await fetch(`/api/leaverequests/${leaveId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
      if (!res.ok) throw new Error('Failed to approve leave request');
      
      const leaveRes = await fetch('/api/leaverequests');
      if (!leaveRes.ok) throw new Error('Failed to reload leave requests');
      const leaveRequests = await leaveRes.json();
      setAppState(prev => ({ ...prev, leaveRequests }));
      alert('Leave request approved successfully!');
    } catch (err) {
      console.error('Error approving leave:', err);
      alert('Failed to approve leave request: ' + err.message);
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const res = await fetch(`/api/leaverequests/${leaveId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      if (!res.ok) throw new Error('Failed to reject leave request');
      
      const leaveRes = await fetch('/api/leaverequests');
      if (!leaveRes.ok) throw new Error('Failed to reload leave requests');
      const leaveRequests = await leaveRes.json();
      setAppState(prev => ({ ...prev, leaveRequests }));
      alert('Leave request rejected successfully!');
    } catch (err) {
      console.error('Error rejecting leave:', err);
      alert('Failed to reject leave request: ' + err.message);
    }
  };

  const selectedAssociationLabel = selectedLeave
    ? (() => {
        const assoc = getUserAssociation(selectedLeave);
        if (assoc.type === 'student') return `${assoc.batchName}${assoc.courseName ? ' / ' + assoc.courseName : ''}`;
        if (assoc.type === 'instructor') return assoc.courseNames && assoc.courseNames.length ? assoc.courseNames.join(', ') : '—';
        return '—';
      })()
    : '';

  return (
    <Layout user={user} currentPage="leaves" onNavigate={onNavigate} onLogout={onLogout} sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900">Leave Requests</h1>
          <p className="text-gray-600 mt-1">Manage all leave applications</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="text-gray-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Course</label>
              <select value={filters.courseId} onChange={e => setFilters({ ...filters, courseId: e.target.value, batchId: '' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="">All Courses</option>
                {appState.courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Batch</label>
              <select value={filters.batchId} onChange={e => setFilters({ ...filters, batchId: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled={!filters.courseId}>
                <option value="">All Batches</option>
                {availableBatches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">From Date</label>
              <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
          </div>

          <div className="md:col-span-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">To Date</label>
              <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>

            <div className="flex items-end">
              <button onClick={() => setFilters({ courseId: '', batchId: '', status: '', startDate: '', endDate: '' })} className="text-indigo-600 hover:text-indigo-700">
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Requests ({filteredLeaves.length})</h3>
          <div className="space-y-3">
            {filteredLeaves.map(leave => {
              const assoc = getUserAssociation(leave);
              const assocLabel = assoc.type === 'student' ? `${assoc.batchName}${assoc.courseName ? ' / ' + assoc.courseName : ''}` : assoc.type === 'instructor' ? (assoc.courseNames && assoc.courseNames.length ? assoc.courseNames.join(', ') : '—') : '—';
              return (
                <div key={leave.id} className="p-4 border rounded-md flex items-center justify-between">
                  <div>
                    <div className="text-gray-900 font-medium">{leave.userName}</div>
                    <div className="text-sm text-gray-600">{assocLabel}</div>
                    <div className="text-sm text-gray-600">{leave.startDate} to {leave.endDate}</div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => setSelectedLeave(leave)} className="text-indigo-600 hover:text-indigo-700">View</button>
                    {leave.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(leave.id)} className="text-green-600 hover:text-green-700">Approve</button>
                        <button onClick={() => handleReject(leave.id)} className="text-red-600 hover:text-red-700">Reject</button>
                      </>
                    )}
                    {leave.status !== 'pending' && <span className="text-sm text-gray-500">{leave.status}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 text-xl font-semibold">Leave Request Details</h2>
                <button onClick={() => setSelectedLeave(null)} className="text-gray-500 hover:text-gray-700">
                  <XIcon size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">Submitted by:</span>
                    <p className="text-gray-900 font-medium">{selectedLeave.userName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Role:</span>
                    <p className="text-gray-900 font-medium capitalize">{selectedLeave.userRole}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Batch / Course:</span>
                    <p className="text-gray-900 font-medium">{selectedAssociationLabel || '—'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Applied Date:</span>
                    <p className="text-gray-900 font-medium">{selectedLeave.appliedDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Leave Period:</span>
                    <p className="text-gray-900 font-medium">{selectedLeave.startDate} to {selectedLeave.endDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Duration:</span>
                    <p className="text-gray-900 font-medium">
                      {Math.ceil((new Date(selectedLeave.endDate).getTime() - new Date(selectedLeave.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-gray-600 text-sm">Reason:</span>
                  <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{selectedLeave.reason}</p>
                </div>

                <div>
                  <span className="text-gray-600 text-sm">Status:</span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm ${selectedLeave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : selectedLeave.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
                  </span>
                </div>
              </div>

              {selectedLeave.document ? (
                <div>
                  <span className="text-gray-600 text-sm mb-2 block">Supporting Document:</span>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText size={24} className="text-indigo-600" />
                        <span className="text-gray-900 font-medium">{selectedLeave.document.split('/').pop()}</span>
                      </div>
                      <a href={selectedLeave.document} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        Open File
                      </a>
                    </div>
                    {selectedLeave.document.match(/\.(jpg|jpeg|png)$/i) ? (
                      <div className="text-center p-4 bg-white rounded border border-gray-200">
                        <p className="text-gray-600 mb-3">Image Preview:</p>
                        <img src={selectedLeave.document} alt="Leave document" className="max-w-full max-h-96 mx-auto rounded" />
                      </div>
                    ) : selectedLeave.document.match(/\.pdf$/i) ? (
                      <div className="text-center p-4 bg-white rounded border border-gray-200">
                        <p className="text-gray-600 mb-3">PDF Document:</p>
                        <iframe src={selectedLeave.document} title="PDF Preview" className="w-full h-96 rounded border" />
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-white rounded border border-gray-200">
                        <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">{selectedLeave.document.split('/').pop()}</p>
                        <a href={selectedLeave.document} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 text-sm mt-2 inline-block">
                          Download File
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
                  <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">No supporting document attached</p>
                </div>
              )}

              {selectedLeave.status === 'pending' && (
                <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <button onClick={() => { handleApprove(selectedLeave.id); setSelectedLeave(null); }} className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Approve Request
                  </button>
                  <button onClick={() => { handleReject(selectedLeave.id); setSelectedLeave(null); }} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
