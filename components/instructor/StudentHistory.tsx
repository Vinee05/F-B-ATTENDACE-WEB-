import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User } from '../../App';
import { LayoutDashboard, FileText, ArrowLeft, Calendar } from 'lucide-react';

interface StudentHistoryProps {
  appState: AppState;
  user: User;
  studentId: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function StudentHistory({ appState, user, studentId, onNavigate, onLogout }: StudentHistoryProps) {
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'leave', label: 'Apply Leave', icon: <FileText size={20} /> },
  ];

  const student = appState.students.find(s => s.id === studentId);
  const studentAttendance = appState.attendance
    .filter(a => a.studentId === studentId)
    .filter(a => {
      if (dateFilter.start && a.date < dateFilter.start) return false;
      if (dateFilter.end && a.date > dateFilter.end) return false;
      if (statusFilter && a.status !== statusFilter) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const batch = student ? appState.batches.find(b => b.id === student.batchId) : null;
  const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;

  const totalPresent = studentAttendance.filter(a => a.status === 'present').length;
  const totalAbsent = studentAttendance.filter(a => a.status === 'absent').length;
  const totalExcused = studentAttendance.filter(a => a.status === 'excused').length;
  const totalSessions = studentAttendance.length;
  const percentage = totalSessions > 0 ? Math.round((totalPresent / totalSessions) * 100) : 0;

  // Calendar view data - group by month
  const attendanceByMonth = studentAttendance.reduce((acc, record) => {
    const month = record.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = [];
    acc[month].push(record);
    return acc;
  }, {} as Record<string, typeof studentAttendance>);

  if (!student) {
    return (
      <Layout
        user={user}
        currentPage="student-history"
        onNavigate={onNavigate}
        onLogout={onLogout}
        sidebarItems={sidebarItems}
      >
        <div className="text-center py-12">
          <p className="text-gray-600">Student not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      user={user}
      currentPage="student-history"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-gray-900">Student Attendance History</h1>
          <p className="text-gray-600 mt-1">{student.name} ({student.rollNo})</p>
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600">Roll Number</p>
              <p className="text-gray-900 mt-1">{student.rollNo}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="text-gray-900 mt-1">{student.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Batch</p>
              <p className="text-gray-900 mt-1">{batch?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Course</p>
              <p className="text-gray-900 mt-1">{course?.code || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Sessions</p>
            <p className="text-gray-900 mt-2">{totalSessions}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Present</p>
            <p className="text-green-600 mt-2">{totalPresent}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Absent</p>
            <p className="text-red-600 mt-2">{totalAbsent}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Excused</p>
            <p className="text-yellow-600 mt-2">{totalExcused}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Percentage</p>
            <p className={`mt-2 ${
              percentage >= 75 ? 'text-green-600' :
              percentage >= 60 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {percentage}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={dateFilter.start}
                onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={dateFilter.end}
                onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="excused">Excused</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => {
              setDateFilter({ start: '', end: '' });
              setStatusFilter('');
            }}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Clear Filters
          </button>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-indigo-600" size={24} />
            <h3 className="text-gray-900">Calendar View</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(attendanceByMonth).map(([month, records]) => (
              <div key={month} className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-gray-900 mb-3">{month}</h4>
                <div className="grid grid-cols-7 gap-2">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className={`p-2 rounded text-center ${
                        record.status === 'present' ? 'bg-green-100 text-green-700' :
                        record.status === 'absent' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}
                      title={`${record.date} - ${record.status}`}
                    >
                      <div>{record.date.split('-')[2]}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-gray-900">Attendance Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Course</th>
                  <th className="text-left py-3 px-4 text-gray-700">Batch</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700">Marked By</th>
                </tr>
              </thead>
              <tbody>
                {studentAttendance.map((record) => {
                  const recordCourse = appState.courses.find(c => c.id === record.courseId);
                  const recordBatch = appState.batches.find(b => b.id === record.batchId);
                  const instructor = appState.instructors.find(i => i.id === record.takenBy);

                  return (
                    <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{record.date}</td>
                      <td className="py-3 px-4 text-gray-600">{recordCourse?.code || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">{recordBatch?.name || 'N/A'}</td>
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

                {studentAttendance.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No attendance records found
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
