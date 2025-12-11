import React, { useState, useMemo } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap } from 'lucide-react';

export function AdminDashboard({
  appState,
  user,
  onNavigate,
  onLogout
}) {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');

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

  // Filter batches based on selected course
  const filteredBatches = useMemo(() => {
    if (!selectedCourseId) return appState.batches;
    return appState.batches.filter(b => b.courseId === selectedCourseId);
  }, [selectedCourseId, appState.batches]);

  const getUserAssociation = (leave) => {
    const student = appState.students.find(s => s.id === leave.userId);
    const instructor = appState.instructors.find(i => i.id === leave.userId);
    if (student) {
      const batch = appState.batches.find(b => b.id === student.batchId);
      const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;
      return batch ? `${batch.name}${course ? ' / ' + course.name : ''}` : '—';
    }
    if (instructor) {
      const courses = appState.courses.filter(c => (Array.isArray(c.instructorIds) ? c.instructorIds.includes(instructor.id) : c.instructorId === instructor.id)).map(c => c.name);
      return courses && courses.length ? courses.join(', ') : '—';
    }
    return '—';
  };

  // Calculate statistics based on selections
  const stats = useMemo(() => {
    let relevantBatches = appState.batches;
    let relevantStudents = appState.students;
    let relevantAttendance = appState.attendance;

    // Filter by selected course
    if (selectedCourseId) {
      relevantBatches = appState.batches.filter(b => b.courseId === selectedCourseId);
    }

    // Filter by selected batch
    if (selectedBatchId) {
      relevantBatches = relevantBatches.filter(b => b.id === selectedBatchId);
    }

    // Get batch IDs for student filtering
    const batchIds = relevantBatches.map(b => b.id);

    // Filter students
    relevantStudents = appState.students.filter(s => batchIds.includes(s.batchId));

    // Filter attendance
    relevantAttendance = appState.attendance.filter(a => {
      const courseMatch = !selectedCourseId || a.courseId === selectedCourseId;
      const batchMatch = !selectedBatchId || a.batchId === selectedBatchId;
      return courseMatch && batchMatch;
    });

    const totalPresent = relevantAttendance.filter(a => a.status === 'present').length;
    const totalAttendance = relevantAttendance.length;
    const attendanceRate = totalAttendance > 0 ? (totalPresent / totalAttendance * 100).toFixed(1) : '0.0';

    // Get course information
    const selectedCourse = selectedCourseId 
      ? appState.courses.find(c => c.id === selectedCourseId)
      : null;

    // Get batch information
    const selectedBatch = selectedBatchId
      ? appState.batches.find(b => b.id === selectedBatchId)
      : null;

    return {
      totalStudents: relevantStudents.length,
      totalBatches: relevantBatches.length,
      totalAttendanceRecords: totalAttendance,
      presentCount: totalPresent,
      attendanceRate,
      activeSessions: new Set(relevantAttendance.map(a => a.date)).size,
      selectedCourse,
      selectedBatch,
      recentAttendance: relevantAttendance.slice(-5).reverse(),
      instructorsInCourse: selectedCourse?.instructorNames || []
    };
  }, [selectedCourseId, selectedBatchId, appState]);

  const pendingLeaves = appState.leaveRequests.filter(l => l.status === 'pending').length;
  const recentLeaves = appState.leaveRequests.slice(-5).reverse();

  return (
    <Layout
      user={user}
      currentPage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">System overview and management controls</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-slate-900 font-semibold mb-4">Filter by Course & Batch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">Select Course</label>
              <select
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  setSelectedBatchId('');
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
              >
                <option value="">All Courses</option>
                {appState.courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">Select Batch</label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
                disabled={filteredBatches.length === 0}
              >
                <option value="">All Batches</option>
                {filteredBatches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Students</p>
                <h2 className="text-slate-900 text-3xl font-bold mt-2">{stats.totalStudents}</h2>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <GraduationCap className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Batches</p>
                <h2 className="text-slate-900 text-3xl font-bold mt-2">{stats.totalBatches}</h2>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <Calendar className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Attendance Records</p>
                <h2 className="text-slate-900 text-3xl font-bold mt-2">{stats.totalAttendanceRecords}</h2>
                <p className="text-sky-600 text-xs mt-1">✓ {stats.presentCount} Present</p>
              </div>
              <div className="bg-sky-100 p-4 rounded-lg">
                <UserCheck className="text-sky-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Attendance Rate</p>
                <h2 className="text-slate-900 text-3xl font-bold mt-2">{stats.attendanceRate}%</h2>
                <p className="text-sky-600 text-xs mt-1">↑ {stats.activeSessions} sessions</p>
              </div>
              <div className="bg-cyan-100 p-4 rounded-lg">
                <BarChart3 className="text-cyan-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Course Details */}
        {selectedCourseId && stats.selectedCourse && (
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-900 font-semibold mb-4">Selected Course Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-slate-600 text-sm font-medium">Course Name</p>
                <p className="text-slate-900 font-semibold mt-1">{stats.selectedCourse.name}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Course Code</p>
                <p className="text-slate-900 font-semibold mt-1">{stats.selectedCourse.code}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm font-medium">Instructors</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {stats.instructorsInCourse.length > 0 ? (
                    stats.instructorsInCourse.map((name, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">
                        {name}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-xs">No instructors assigned</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Statistics */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-slate-900 font-semibold mb-4">System Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-600 text-sm font-medium">Attendance Rate {selectedCourseId || selectedBatchId ? '(Selection)' : '(System-wide)'}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-slate-900 text-2xl font-bold">{stats.attendanceRate}%</span>
                <span className="text-green-600 text-xs font-semibold">✓ Good</span>
              </div>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Active Sessions {selectedCourseId || selectedBatchId ? '(Selection)' : '(All)'}</p>
              <p className="text-slate-900 text-2xl font-bold mt-2">{stats.activeSessions}</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Pending Requests</p>
              <p className="text-slate-900 text-2xl font-bold mt-2">{pendingLeaves}</p>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-slate-900 font-semibold mb-4">Recent Attendance Sessions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Student</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Course</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Batch</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Marked By</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAttendance.length > 0 ? (
                  stats.recentAttendance.map(record => {
                    const student = appState.students.find(s => s.id === record.studentId);
                    const course = appState.courses.find(c => c.id === record.courseId);
                    const batch = appState.batches.find(b => b.id === record.batchId);
                    const instructor = appState.instructors.find(i => i.id === record.takenBy);
                    return (
                      <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-900 text-sm">{record.date}</td>
                        <td className="py-3 px-4 text-slate-900 text-sm font-medium">{student?.name || 'Unknown'}</td>
                        <td className="py-3 px-4 text-slate-600 text-sm">{course?.code || 'N/A'}</td>
                        <td className="py-3 px-4 text-slate-600 text-sm">{batch?.name || 'N/A'}</td>
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              record.status === 'present'
                                ? 'bg-green-100 text-green-700'
                                : record.status === 'absent'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-sm">{instructor?.name || 'Admin'}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 px-4 text-center text-slate-500 text-sm">
                      No attendance records found for the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leaves */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-slate-900 font-semibold mb-4">Recent Leave Applications</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Applied Date</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Batch / Course</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Leave Period</th>
                  <th className="text-left py-3 px-4 text-slate-700 text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map(leave => (
                  <tr key={leave.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900 text-sm">{leave.appliedDate}</td>
                    <td className="py-3 px-4 text-slate-900 text-sm font-medium">{leave.userName}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{getUserAssociation(leave)}</td>
                    <td className="py-3 px-4 text-slate-600 text-sm">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          leave.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : leave.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate('courses')}
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-blue-300 text-left group"
          >
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3 group-hover:bg-blue-200 transition">
              <BookOpen className="text-blue-600" size={28} />
            </div>
            <h3 className="text-slate-900 font-semibold">Add New Course</h3>
            <p className="text-slate-600 mt-1 text-sm">Create and manage courses</p>
          </button>

          <button
            onClick={() => onNavigate('students')}
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-blue-300 text-left group"
          >
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3 group-hover:bg-blue-200 transition">
              <GraduationCap className="text-blue-600" size={28} />
            </div>
            <h3 className="text-slate-900 font-semibold">Add New Student</h3>
            <p className="text-slate-600 mt-1 text-sm">Enroll students in system</p>
          </button>

          <button
            onClick={() => onNavigate('attendance')}
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-blue-300 text-left group"
          >
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3 group-hover:bg-blue-200 transition">
              <UserCheck className="text-blue-600" size={28} />
            </div>
            <h3 className="text-slate-900 font-semibold">View Attendance</h3>
            <p className="text-slate-600 mt-1 text-sm">Monitor attendance records</p>
          </button>
        </div>
      </div>
    </Layout>
  );
}
