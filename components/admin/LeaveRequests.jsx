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

  const handleApprove = leaveId => setAppState(prev => ({ ...prev, leaveRequests: prev.leaveRequests.map(l => (l.id === leaveId ? { ...l, status: 'approved' } : l)) }));
  const handleReject = leaveId => setAppState(prev => ({ ...prev, leaveRequests: prev.leaveRequests.map(l => (l.id === leaveId ? { ...l, status: 'rejected' } : l)) }));

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
          <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Document Preview</h2>
              <button onClick={() => setSelectedLeave(null)}><XIcon size={24} /></button>
            </div>

            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-900 mb-2">{selectedLeave.document || 'No document'}</p>
              <p className="text-gray-600">Document preview would be displayed here</p>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted by:</span>
                <span className="text-gray-900">{selectedLeave.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Batch / Course:</span>
                <span className="text-gray-900">{selectedAssociationLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Leave Period:</span>
                <span className="text-gray-900">{selectedLeave.startDate} to {selectedLeave.endDate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
