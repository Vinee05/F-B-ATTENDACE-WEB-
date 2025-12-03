import React, { useState, useMemo } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReportsFixed({ appState, user, onNavigate, onLogout }) {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

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

  const courses = appState?.courses || [];
  const batches = useMemo(() => selectedCourse ? (appState?.batches || []).filter(b => b.courseId === selectedCourse) : (appState?.batches || []), [selectedCourse, appState]);
  const students = useMemo(() => selectedBatch ? (appState?.students || []).filter(s => s.batchId === selectedBatch) : (appState?.students || []), [selectedBatch, appState]);

  const filteredAttendance = (appState?.attendance || []).filter(a => {
    if (selectedCourse && a.courseId !== selectedCourse) return false;
    if (selectedBatch && a.batchId !== selectedBatch) return false;
    if (selectedStudent && a.studentId !== selectedStudent) return false;
    return true;
  });

  const attendanceByDate = filteredAttendance.reduce((acc, record) => {
    const existing = acc.find(item => item.date === record.date);
    if (existing) {
      if (record.status === 'present') existing.present++;
      if (record.status === 'absent') existing.absent++;
      if (record.status === 'excused') existing.excused++;
    } else {
      acc.push({ date: record.date, present: record.status === 'present' ? 1 : 0, absent: record.status === 'absent' ? 1 : 0, excused: record.status === 'excused' ? 1 : 0 });
    }
    return acc;
  }, []).sort((a, b) => a.date.localeCompare(b.date));

  const attendanceByCourse = (courses || []).map(course => {
    const courseAttendance = filteredAttendance.filter(a => a.courseId === course.id);
    const present = courseAttendance.filter(a => a.status === 'present').length;
    const total = courseAttendance.length;
    return { name: course.code || course.name || 'N/A', attendance: total > 0 ? Math.round(present / total * 100) : 0 };
  });

  const statusData = [
    { name: 'Present', value: filteredAttendance.filter(a => a.status === 'present').length, color: '#10b981' },
    { name: 'Absent', value: filteredAttendance.filter(a => a.status === 'absent').length, color: '#ef4444' },
    { name: 'Excused', value: filteredAttendance.filter(a => a.status === 'excused').length, color: '#f59e0b' }
  ];

  const displayedStudents = selectedBatch ? students : (appState?.students || []);

  return (
    <Layout user={user} currentPage="reports" onNavigate={onNavigate} onLogout={onLogout} sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Attendance insights and statistics</p>
          </div>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"><Download size={20} /><span>Export Report</span></button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Course</label>
              <select className="w-full px-3 py-2 border rounded" value={selectedCourse} onChange={e => { setSelectedCourse(e.target.value); setSelectedBatch(''); setSelectedStudent(''); }}>
                <option value="">All Courses</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Batch</label>
              <select className="w-full px-3 py-2 border rounded" value={selectedBatch} onChange={e => { setSelectedBatch(e.target.value); setSelectedStudent(''); }}>
                <option value="">All Batches</option>
                {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Student</label>
              <select className="w-full px-3 py-2 border rounded" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                <option value="">All Students</option>
                {(selectedBatch ? students : appState?.students || []).map(s => <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>)}
              </select>
            </div>
            <div>
              <button className="px-4 py-2 bg-gray-100 rounded" onClick={() => { setSelectedCourse(''); setSelectedBatch(''); setSelectedStudent(''); }}>Reset</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Sessions</p>
            <p className="text-gray-900 mt-2">{new Set(filteredAttendance.map(a => a.date)).size}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Present</p>
            <p className="text-green-600 mt-2">{filteredAttendance.filter(a => a.status === 'present').length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Absent</p>
            <p className="text-red-600 mt-2">{filteredAttendance.filter(a => a.status === 'absent').length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Overall Rate</p>
            <p className="text-gray-900 mt-2">{filteredAttendance.length > 0 ? Math.round(filteredAttendance.filter(a => a.status === 'present').length / filteredAttendance.length * 100) : 0}%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Attendance Trend</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Attendance Rate by Course</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceByCourse}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#6366f1" name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Status Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                    {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Student Summary */}
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
                {displayedStudents.map(student => {
                  const studentAttendance = filteredAttendance.filter(a => a.studentId === student.id);
                  const present = studentAttendance.filter(a => a.status === 'present').length;
                  const absent = studentAttendance.filter(a => a.status === 'absent').length;
                  const excused = studentAttendance.filter(a => a.status === 'excused').length;
                  const total = studentAttendance.length;
                  const percentage = total > 0 ? Math.round(present / total * 100) : 0;
                  return (
                    <tr key={student.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{student.name}</td>
                      <td className="py-3 px-4 text-gray-600">{student.rollNo}</td>
                      <td className="py-3 px-4 text-center text-green-600">{present}</td>
                      <td className="py-3 px-4 text-center text-red-600">{absent}</td>
                      <td className="py-3 px-4 text-center text-yellow-600">{excused}</td>
                      <td className="py-3 px-4 text-center text-gray-900">{total}</td>
                      <td className="py-3 px-4 text-center"><span className={`inline-flex px-3 py-1 rounded-full ${percentage >= 75 ? 'bg-green-100 text-green-700' : percentage >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{percentage}%</span></td>
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
