import React from 'react';
import { Layout } from '../Layout';
import { AppState, User } from '../../App';
import { LayoutDashboard, UserCheck, FileText, Bell, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StudentDashboardProps {
  appState: AppState;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function StudentDashboard({ appState, user, onNavigate, onLogout }: StudentDashboardProps) {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'attendance', label: 'My Attendance', icon: <UserCheck size={20} /> },
    { id: 'leave', label: 'Leave Requests', icon: <FileText size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  ];

  const student = appState.students.find(s => s.id === user.id);
  const batch = student ? appState.batches.find(b => b.id === student.batchId) : null;
  const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;

  const myAttendance = appState.attendance.filter(a => a.studentId === user.id);
  const totalPresent = myAttendance.filter(a => a.status === 'present').length;
  const totalAbsent = myAttendance.filter(a => a.status === 'absent').length;
  const totalExcused = myAttendance.filter(a => a.status === 'excused').length;
  const totalSessions = myAttendance.length;
  const percentage = totalSessions > 0 ? Math.round((totalPresent / totalSessions) * 100) : 0;

  const myLeaves = appState.leaveRequests.filter(l => l.userId === user.id);
  const myNotifications = appState.notifications.filter(
    n => n.target === 'all' || n.target === 'students'
  );

  const chartData = [
    { name: 'Present', value: totalPresent, color: '#10b981' },
    { name: 'Absent', value: totalAbsent, color: '#ef4444' },
    { name: 'Excused', value: totalExcused, color: '#f59e0b' },
  ].filter(item => item.value > 0);

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
          <h1 className="text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Present</p>
                <h2 className="text-green-600 mt-2">{totalPresent}</h2>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Absent</p>
                <h2 className="text-red-600 mt-2">{totalAbsent}</h2>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <UserCheck className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Attendance %</p>
                <h2 className={`mt-2 ${
                  percentage >= 75 ? 'text-green-600' :
                  percentage >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {percentage}%
                </h2>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BarChart3 className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Current Batch</p>
                <h2 className="text-gray-900 mt-2">{batch?.name || 'N/A'}</h2>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <LayoutDashboard className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">My Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600">Roll Number</p>
              <p className="text-gray-900 mt-1">{student?.rollNo || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Course</p>
              <p className="text-gray-900 mt-1">{course?.name || 'Not Enrolled'}</p>
            </div>
            <div>
              <p className="text-gray-600">Batch</p>
              <p className="text-gray-900 mt-1">{batch?.name || 'Not Assigned'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Attendance Distribution</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No attendance data available</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('attendance')}
                className="w-full flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors text-left"
              >
                <UserCheck className="text-indigo-600" size={24} />
                <div>
                  <p className="text-gray-900">View My Attendance</p>
                  <p className="text-gray-600">Check detailed attendance records</p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('leave')}
                className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
              >
                <FileText className="text-purple-600" size={24} />
                <div>
                  <p className="text-gray-900">Apply for Leave</p>
                  <p className="text-gray-600">Submit a new leave request</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Recent Notifications</h3>
          {myNotifications.length > 0 ? (
            <div className="space-y-3">
              {myNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-gray-900">{notification.title}</h4>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    <span className="text-gray-500">{notification.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No new notifications</p>
          )}
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">Recent Attendance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Course</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {myAttendance.slice(-5).reverse().map((record) => {
                  const recordCourse = appState.courses.find(c => c.id === record.courseId);
                  
                  return (
                    <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{record.date}</td>
                      <td className="py-3 px-4 text-gray-600">{recordCourse?.code || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full ${
                          record.status === 'present' ? 'bg-green-100 text-green-700' :
                          record.status === 'absent' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {myAttendance.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      No attendance records yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
