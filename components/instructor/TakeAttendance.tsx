import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User, AttendanceRecord } from '../../App';
import { LayoutDashboard, FileText, ArrowLeft, Save, CheckCircle } from 'lucide-react';

interface TakeAttendanceProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  user: User;
  courseId: string;
  onNavigate: (page: string, courseId?: string) => void;
  onLogout: () => void;
}

export function TakeAttendance({ appState, setAppState, user, courseId, onNavigate, onLogout }: TakeAttendanceProps) {
  const course = appState.courses.find(c => c.id === courseId);
  const courseBatches = appState.batches.filter(b => b.courseId === courseId);
  const [selectedBatchId, setSelectedBatchId] = useState(courseBatches[0]?.id || '');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [studentStatuses, setStudentStatuses] = useState<Record<string, 'present' | 'absent'>>({});
  const [saved, setSaved] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'leave', label: 'Apply Leave', icon: <FileText size={20} /> },
  ];

  const selectedBatch = appState.batches.find(b => b.id === selectedBatchId);
  const batchStudents = selectedBatch ? appState.students.filter(s => s.batchId === selectedBatch.id) : [];

  // Initialize all students as absent
  React.useEffect(() => {
    const initialStatuses: Record<string, 'present' | 'absent'> = {};
    batchStudents.forEach(student => {
      initialStatuses[student.id] = 'absent';
    });
    setStudentStatuses(initialStatuses);
  }, [selectedBatchId]);

  const toggleStudentStatus = (studentId: string) => {
    setStudentStatuses(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present',
    }));
  };

  const markAllPresent = () => {
    const allPresent: Record<string, 'present' | 'absent'> = {};
    batchStudents.forEach(student => {
      allPresent[student.id] = 'present';
    });
    setStudentStatuses(allPresent);
  };

  const handleSave = () => {
    const newRecords: AttendanceRecord[] = batchStudents.map(student => ({
      id: `a${Date.now()}_${student.id}`,
      studentId: student.id,
      courseId: courseId,
      batchId: selectedBatchId,
      date: attendanceDate,
      status: studentStatuses[student.id] || 'absent',
      takenBy: user.id,
    }));

    setAppState(prev => ({
      ...prev,
      attendance: [...prev.attendance, ...newRecords],
    }));

    setSaved(true);
    setTimeout(() => {
      onNavigate('course', courseId);
    }, 1500);
  };

  const presentCount = Object.values(studentStatuses).filter(s => s === 'present').length;
  const absentCount = batchStudents.length - presentCount;

  if (!course) {
    return null;
  }

  return (
    <Layout
      user={user}
      currentPage="take-attendance"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div>
          <button
            onClick={() => onNavigate('course', courseId)}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Course</span>
          </button>
          
          <h1 className="text-gray-900">Take Attendance</h1>
          <p className="text-gray-600 mt-1">{course.name} - {course.code}</p>
        </div>

        {/* Configuration */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Select Batch</label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {courseBatches.map((batch) => (
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
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Total Students</p>
            <p className="text-gray-900 mt-2">{batchStudents.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Present</p>
            <p className="text-green-600 mt-2">{presentCount}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600">Absent</p>
            <p className="text-red-600 mt-2">{absentCount}</p>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-gray-900">Mark Attendance (Default: Absent)</h3>
            <button
              onClick={markAllPresent}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <CheckCircle size={18} />
              <span>Mark All Present</span>
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {batchStudents.map((student) => {
              const isPresent = studentStatuses[student.id] === 'present';

              return (
                <div
                  key={student.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleStudentStatus(student.id)}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={isPresent}
                      onChange={() => toggleStudentStatus(student.id)}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <div>
                      <p className="text-gray-900">{student.name}</p>
                      <p className="text-gray-600">{student.rollNo}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-lg ${
                    isPresent
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {isPresent ? 'Present' : 'Absent'}
                  </span>
                </div>
              );
            })}

            {batchStudents.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No students enrolled in this batch
              </div>
            )}
          </div>
        </div>

        {/* Save Button (Sticky) */}
        {batchStudents.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg rounded-xl">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div>
                <p className="text-gray-700">Present: {presentCount} | Absent: {absentCount}</p>
              </div>
              <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {saved ? <CheckCircle size={20} /> : <Save size={20} />}
                <span>{saved ? 'Attendance Saved!' : 'Save Attendance'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
