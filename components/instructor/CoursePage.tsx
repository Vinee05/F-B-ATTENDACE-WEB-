import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User } from '../../App';
import { LayoutDashboard, FileText, ArrowLeft, UserCheck, Calendar, Users } from 'lucide-react';

interface CoursePageProps {
  appState: AppState;
  user: User;
  courseId: string;
  onNavigate: (page: string, courseId?: string, studentId?: string) => void;
  onLogout: () => void;
}

export function CoursePage({ appState, user, courseId, onNavigate, onLogout }: CoursePageProps) {
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'leave', label: 'Apply Leave', icon: <FileText size={20} /> },
  ];

  const course = appState.courses.find(c => c.id === courseId);
  const courseBatches = appState.batches.filter(b => b.courseId === courseId);
  const selectedBatch = selectedBatchId ? appState.batches.find(b => b.id === selectedBatchId) : courseBatches[0];
  const batchStudents = selectedBatch ? appState.students.filter(s => s.batchId === selectedBatch.id) : [];

  if (!course) {
    return (
      <Layout
        user={user}
        currentPage="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
        sidebarItems={sidebarItems}
      >
        <div className="text-center py-12">
          <p className="text-gray-600">Course not found</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Return to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  React.useEffect(() => {
    if (courseBatches.length > 0 && !selectedBatchId) {
      setSelectedBatchId(courseBatches[0].id);
    }
  }, [courseBatches, selectedBatchId]);

  return (
    <Layout
      user={user}
      currentPage="course"
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
          
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full mb-2">
                {course.code}
              </span>
              <h1 className="text-gray-900">{course.name}</h1>
              <p className="text-gray-600 mt-1">{course.description}</p>
            </div>
          </div>
        </div>

        {/* Batch Selector */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <label className="block text-gray-700 mb-2">Select Batch</label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {courseBatches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name} ({batch.startDate} to {batch.endDate})
              </option>
            ))}
          </select>
        </div>

        {selectedBatch && (
          <>
            {/* Batch Details */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Batch Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600">Batch Name</p>
                  <p className="text-gray-900 mt-1">{selectedBatch.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Duration</p>
                  <p className="text-gray-900 mt-1">{selectedBatch.startDate} to {selectedBatch.endDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Students</p>
                  <p className="text-gray-900 mt-1">{batchStudents.length}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => onNavigate('take-attendance', courseId)}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
              >
                <UserCheck className="text-indigo-600 mb-3" size={32} />
                <h3 className="text-gray-900">Take Attendance</h3>
                <p className="text-gray-600 mt-1">Mark attendance for today's session</p>
              </button>

              <button
                onClick={() => alert('View Attendance History')}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
              >
                <Calendar className="text-indigo-600 mb-3" size={32} />
                <h3 className="text-gray-900">Attendance History</h3>
                <p className="text-gray-600 mt-1">View past attendance records</p>
              </button>
            </div>

            {/* Student List */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900">Student List</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-700">Roll No</th>
                      <th className="text-left py-3 px-4 text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-gray-700">Email</th>
                      <th className="text-center py-3 px-4 text-gray-700">Total Sessions</th>
                      <th className="text-center py-3 px-4 text-gray-700">Present</th>
                      <th className="text-center py-3 px-4 text-gray-700">Attendance %</th>
                      <th className="text-center py-3 px-4 text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchStudents.map((student) => {
                      const studentAttendance = appState.attendance.filter(
                        a => a.studentId === student.id && a.courseId === courseId && a.batchId === selectedBatch.id
                      );
                      const present = studentAttendance.filter(a => a.status === 'present').length;
                      const total = studentAttendance.length;
                      const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

                      return (
                        <tr key={student.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{student.rollNo}</td>
                          <td className="py-3 px-4 text-gray-900">{student.name}</td>
                          <td className="py-3 px-4 text-gray-600">{student.email}</td>
                          <td className="py-3 px-4 text-center text-gray-900">{total}</td>
                          <td className="py-3 px-4 text-center text-green-600">{present}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex px-3 py-1 rounded-full ${
                              percentage >= 75 ? 'bg-green-100 text-green-700' :
                              percentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {percentage}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => onNavigate('student-history', undefined, student.id)}
                              className="text-indigo-600 hover:text-indigo-700"
                            >
                              View History
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {batchStudents.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          <Users size={48} className="mx-auto mb-4 text-gray-400" />
                          <p>No students enrolled in this batch</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
