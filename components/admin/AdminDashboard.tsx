import React from 'react';
import { Layout } from '../Layout';
import { AppState, User } from '../../App';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap } from 'lucide-react';

interface AdminDashboardProps {
  appState: AppState;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({ appState, user, onNavigate, onLogout }: AdminDashboardProps) {
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

  const pendingLeaves = appState.leaveRequests.filter(l => l.status === 'pending').length;
  const totalPresent = appState.attendance.filter(a => a.status === 'present').length;
  const totalAttendance = appState.attendance.length;
  const attendanceRate: string = totalAttendance > 0 ? ((totalPresent / totalAttendance) * 100).toFixed(1) : '0.0';

  const recentAttendance = appState.attendance.slice(-5).reverse();
  const recentLeaves = appState.leaveRequests.slice(-5).reverse();

  return (
    <Layout
      user={user}
      currentPage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of the attendance management system</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Students</p>
                <h2 className="text-gray-900 mt-2">{appState.students.length}</h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <GraduationCap className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Instructors</p>
                <h2 className="text-gray-900 mt-2">{appState.instructors.length}</h2>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Courses</p>
                <h2 className="text-gray-900 mt-2">{appState.courses.length}</h2>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <BookOpen className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pending Leave Requests</p>
                <h2 className="text-gray-900 mt-2">{pendingLeaves}</h2>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FileText className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">System Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600">Overall Attendance Rate</p>
              <div className="mt-2 flex items-baseline">
                <span className="text-gray-900">{attendanceRate}%</span>
                <span className="ml-2 text-green-600">↑ Good</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600">Total Batches</p>
              <p className="text-gray-900 mt-2">{appState.batches.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Active Sessions</p>
              <p className="text-gray-900 mt-2">{new Set(appState.attendance.map(a => a.date)).size}</p>
            </div>
          </div>
        </div>

        {/* Recent Attendance Sessions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Recent Attendance Sessions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-gray-700">Course</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700">Marked By</th>
                </tr>
              </thead>
              <tbody>
                {recentAttendance.map((record) => {
                  const student = appState.students.find(s => s.id === record.studentId);
                  const course = appState.courses.find(c => c.id === record.courseId);
                  const instructor = appState.instructors.find(i => i.id === record.takenBy);
                  
                  return (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{record.date}</td>
                      <td className="py-3 px-4 text-gray-900">{student?.name || 'Unknown'}</td>
                      <td className="py-3 px-4 text-gray-600">{course?.code || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full ${
                          record.status === 'present' ? 'bg-green-100 text-green-700' :
                          record.status === 'absent' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{instructor?.name || 'Admin'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>



        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Recent Leave Applications</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Applied Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-gray-700">Leave Period</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{leave.appliedDate}</td>
                    <td className="py-3 px-4 text-gray-900">{leave.userName}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-gray-600">{leave.userRole}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full ${
                        leave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
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
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
          >
            <BookOpen className="text-indigo-600 mb-3" size={32} />
            <h3 className="text-gray-900">Add New Course</h3>
            <p className="text-gray-600 mt-1">Create and manage courses</p>
          </button>

          <button
            onClick={() => onNavigate('students')}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
          >
            <GraduationCap className="text-indigo-600 mb-3" size={32} />
            <h3 className="text-gray-900">Add New Student</h3>
            <p className="text-gray-600 mt-1">Enroll students in system</p>
          </button>

          <button
            onClick={() => onNavigate('attendance')}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
          >
            <UserCheck className="text-indigo-600 mb-3" size={32} />
            <h3 className="text-gray-900">View Attendance</h3>
            <p className="text-gray-600 mt-1">Monitor attendance records</p>
          </button>
        </div>
      </div>
    </Layout>
  );
}