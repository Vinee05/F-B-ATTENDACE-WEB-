import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User } from '../../App';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsProps {
  appState: AppState;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Reports({ appState, user, onNavigate, onLogout }: ReportsProps) {
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

  // Calculate attendance by date
  const attendanceByDate = appState.attendance.reduce((acc, record) => {
    const existing = acc.find(item => item.date === record.date);
    if (existing) {
      if (record.status === 'present') existing.present++;
      if (record.status === 'absent') existing.absent++;
      if (record.status === 'excused') existing.excused++;
    } else {
      acc.push({
        date: record.date,
        present: record.status === 'present' ? 1 : 0,
        absent: record.status === 'absent' ? 1 : 0,
        excused: record.status === 'excused' ? 1 : 0,
      });
    }
    return acc;
  }, [] as Array<{ date: string; present: number; absent: number; excused: number }>).sort((a, b) => a.date.localeCompare(b.date));

  // Calculate attendance by course
  const attendanceByCourse = appState.courses.map(course => {
    const courseAttendance = appState.attendance.filter(a => a.courseId === course.id);
    const present = courseAttendance.filter(a => a.status === 'present').length;
    const total = courseAttendance.length;
    return {
      name: course.code,
      attendance: total > 0 ? Math.round((present / total) * 100) : 0,
    };
  });

  // Status distribution
  const statusData = [
    { name: 'Present', value: appState.attendance.filter(a => a.status === 'present').length, color: '#10b981' },
    { name: 'Absent', value: appState.attendance.filter(a => a.status === 'absent').length, color: '#ef4444' },
    { name: 'Excused', value: appState.attendance.filter(a => a.status === 'excused').length, color: '#f59e0b' },
  ];

  return (
    <Layout
      user={user}
      currentPage="reports"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Attendance insights and statistics</p>
          </div>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Sessions</p>
            <p className="text-gray-900 mt-2">{new Set(appState.attendance.map(a => a.date)).size}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Present</p>
            <p className="text-green-600 mt-2">{appState.attendance.filter(a => a.status === 'present').length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Absent</p>
            <p className="text-red-600 mt-2">{appState.attendance.filter(a => a.status === 'absent').length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Overall Rate</p>
            <p className="text-gray-900 mt-2">
              {appState.attendance.length > 0
                ? Math.round((appState.attendance.filter(a => a.status === 'present').length / appState.attendance.length) * 100)
                : 0}%
            </p>
          </div>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10b981" name="Present" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" name="Absent" />
              <Line type="monotone" dataKey="excused" stroke="#f59e0b" name="Excused" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance by Course */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Attendance Rate by Course</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceByCourse}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#6366f1" name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Student Attendance Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-gray-700">Roll No</th>
                  <th className="text-center py-3 px-4 text-gray-700">Present</th>
                  <th className="text-center py-3 px-4 text-gray-700">Absent</th>
                  <th className="text-center py-3 px-4 text-gray-700">Excused</th>
                  <th className="text-center py-3 px-4 text-gray-700">Total</th>
                  <th className="text-center py-3 px-4 text-gray-700">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {appState.students.map(student => {
                  const studentAttendance = appState.attendance.filter(a => a.studentId === student.id);
                  const present = studentAttendance.filter(a => a.status === 'present').length;
                  const absent = studentAttendance.filter(a => a.status === 'absent').length;
                  const excused = studentAttendance.filter(a => a.status === 'excused').length;
                  const total = studentAttendance.length;
                  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

                  return (
                    <tr key={student.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{student.name}</td>
                      <td className="py-3 px-4 text-gray-600">{student.rollNo}</td>
                      <td className="py-3 px-4 text-center text-green-600">{present}</td>
                      <td className="py-3 px-4 text-center text-red-600">{absent}</td>
                      <td className="py-3 px-4 text-center text-yellow-600">{excused}</td>
                      <td className="py-3 px-4 text-center text-gray-900">{total}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full ${
                          percentage >= 75 ? 'bg-green-100 text-green-700' :
                          percentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
