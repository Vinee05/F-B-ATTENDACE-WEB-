import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User, AttendanceRecord } from '../../App';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Filter, Edit, Save } from 'lucide-react';

interface AttendanceManagementProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function AttendanceManagement({ appState, setAppState, user, onNavigate, onLogout }: AttendanceManagementProps) {
  const [filters, setFilters] = useState({
    courseId: '',
    batchId: '',
    date: '',
    studentId: '',
  });
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<'present' | 'absent' | 'excused'>('present');

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

  const filteredAttendance = appState.attendance.filter(record => {
    if (filters.courseId && record.courseId !== filters.courseId) return false;
    if (filters.batchId && record.batchId !== filters.batchId) return false;
    if (filters.date && record.date !== filters.date) return false;
    if (filters.studentId && record.studentId !== filters.studentId) return false;
    return true;
  });

  const handleEdit = (record: AttendanceRecord) => {
    setEditingRecordId(record.id);
    setEditStatus(record.status);
  };

  const handleSave = (recordId: string) => {
    setAppState(prev => ({
      ...prev,
      attendance: prev.attendance.map(a =>
        a.id === recordId ? { ...a, status: editStatus } : a
      ),
    }));
    setEditingRecordId(null);
  };

  const availableBatches = filters.courseId
    ? appState.batches.filter(b => b.courseId === filters.courseId)
    : appState.batches;

  return (
    <Layout
      user={user}
      currentPage="attendance"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">View and edit attendance records</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="text-gray-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Course</label>
              <select
                value={filters.courseId}
                onChange={(e) => setFilters({ ...filters, courseId: e.target.value, batchId: '' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Courses</option>
                {appState.courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Batch</label>
              <select
                value={filters.batchId}
                onChange={(e) => setFilters({ ...filters, batchId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={!filters.courseId}
              >
                <option value="">All Batches</option>
                {availableBatches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Student</label>
              <select
                value={filters.studentId}
                onChange={(e) => setFilters({ ...filters, studentId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Students</option>
                {appState.students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.rollNo})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setFilters({ courseId: '', batchId: '', date: '', studentId: '' })}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Clear Filters
          </button>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-gray-700">Roll No</th>
                  <th className="text-left py-3 px-4 text-gray-700">Course</th>
                  <th className="text-left py-3 px-4 text-gray-700">Batch</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700">Taken By</th>
                  <th className="text-right py-3 px-4 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  filteredAttendance.map((record) => {
                    const student = appState.students.find(s => s.id === record.studentId);
                    const course = appState.courses.find(c => c.id === record.courseId);
                    const batch = appState.batches.find(b => b.id === record.batchId);
                    const instructor = appState.instructors.find(i => i.id === record.takenBy);
                    const isEditing = editingRecordId === record.id;

                    return (
                      <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{record.date}</td>
                        <td className="py-3 px-4 text-gray-900">{student?.name || 'Unknown'}</td>
                        <td className="py-3 px-4 text-gray-600">{student?.rollNo || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-600">{course?.code || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-600">{batch?.name || 'N/A'}</td>
                        <td className="py-3 px-4">
                          {isEditing ? (
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value as 'present' | 'absent' | 'excused')}
                              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="present">Present</option>
                              <option value="absent">Absent</option>
                              <option value="excused">Excused</option>
                            </select>
                          ) : (
                            <span className={`inline-flex px-3 py-1 rounded-full ${
                              record.status === 'present' ? 'bg-green-100 text-green-700' :
                              record.status === 'absent' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {record.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{instructor?.name || 'Admin'}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            {isEditing ? (
                              <button
                                onClick={() => handleSave(record.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                              >
                                <Save size={18} />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEdit(record)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Records</p>
            <p className="text-gray-900 mt-2">{filteredAttendance.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Present</p>
            <p className="text-green-600 mt-2">
              {filteredAttendance.filter(a => a.status === 'present').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Absent</p>
            <p className="text-red-600 mt-2">
              {filteredAttendance.filter(a => a.status === 'absent').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Excused</p>
            <p className="text-yellow-600 mt-2">
              {filteredAttendance.filter(a => a.status === 'excused').length}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
