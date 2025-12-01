import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User, Course } from '../../App';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
import { MultiDayPicker } from '../ui/multi-day-picker';

interface ManageCoursesProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function ManageCourses({ appState, setAppState, user, onNavigate, onLogout }: ManageCoursesProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '', instructorId: '', courseDays: [] as string[] });
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [holidays, setHolidays] = useState<string[]>([]);

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

  const handleAdd = () => {
    setFormData({ name: '', code: '', description: '', instructorId: '', courseDays: [] });
    setEditingCourse(null);
    setShowAddModal(true);
  };

  const handleEdit = (course: Course) => {
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      instructorId: course.instructorId || '',
      courseDays: course.courseDays || [],
    });
    setEditingCourse(course);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const instructor = appState.instructors.find(i => i.id === formData.instructorId);
    
    if (editingCourse) {
      setAppState(prev => ({
        ...prev,
        courses: prev.courses.map(c =>
          c.id === editingCourse.id
            ? { ...c, ...formData, instructorName: instructor?.name }
            : c
        ),
      }));
    } else {
      const newCourse: Course = {
        id: `c${Date.now()}`,
        ...formData,
        instructorName: instructor?.name,
      };
      setAppState(prev => ({
        ...prev,
        courses: [...prev.courses, newCourse],
      }));
    }
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setAppState(prev => ({
        ...prev,
        courses: prev.courses.filter(c => c.id !== id),
      }));
    }
  };

  return (
    <Layout
      user={user}
      currentPage="courses"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Manage Courses</h1>
            <p className="text-gray-600 mt-1">Create and manage all courses</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add New Course</span>
          </button>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-700">Code</th>
                <th className="text-left py-3 px-4 text-gray-700">Course Name</th>
                <th className="text-left py-3 px-4 text-gray-700">Description</th>
                <th className="text-left py-3 px-4 text-gray-700">Instructor</th>
                <th className="text-right py-3 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appState.courses.map((course) => (
                <tr key={course.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{course.code}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      {course.name}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{course.description}</td>
                  <td className="py-3 px-4 text-gray-600">{course.instructorName || 'Not Assigned'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
                <button onClick={() => setShowAddModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Course Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Course Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Assign Instructor</label>
                  <select
                    value={formData.instructorId}
                    onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Instructor</option>
                    {appState.instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Course Days (Excluding Weekends & Holidays)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDayPicker(true)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium text-gray-900"
                  >
                    {formData.courseDays.length > 0 
                      ? `${formData.courseDays.length} days selected` 
                      : 'Click to select days'}
                  </button>
                  {formData.courseDays.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.courseDays.slice(0, 3).map((day) => (
                        <span key={day} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      ))}
                      {formData.courseDays.length > 3 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          +{formData.courseDays.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                  >
                    {editingCourse ? 'Update' : 'Add'} Course
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Multi-Day Picker Modal */}
        {showDayPicker && (
          <MultiDayPicker
            selectedDays={formData.courseDays}
            holidays={holidays}
            onSelectDays={(days) => {
              setFormData({ ...formData, courseDays: days });
              setShowDayPicker(false);
            }}
            onClose={() => setShowDayPicker(false)}
          />
        )}

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Course Details</h2>
                <button onClick={() => setSelectedCourse(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Course Code</p>
                    <p className="text-gray-900 mt-1">{selectedCourse.code}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Instructor</p>
                    <p className="text-gray-900 mt-1">{selectedCourse.instructorName || 'Not Assigned'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600">Course Name</p>
                  <p className="text-gray-900 mt-1">{selectedCourse.name}</p>
                </div>

                <div>
                  <p className="text-gray-600">Description</p>
                  <p className="text-gray-900 mt-1">{selectedCourse.description}</p>
                </div>

                {selectedCourse.courseDays && selectedCourse.courseDays.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-gray-600 flex items-center gap-2 mb-3">
                      <Calendar size={16} /> Course Days ({selectedCourse.courseDays.length} days)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.courseDays.map((day) => (
                        <span key={day} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium">
                          {new Date(day).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-gray-900 mb-3">Batches</h3>
                  <div className="space-y-2">
                    {appState.batches.filter(b => b.courseId === selectedCourse.id).map((batch) => (
                      <div key={batch.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-900">{batch.name}</p>
                            <p className="text-gray-600">{batch.startDate} to {batch.endDate}</p>
                          </div>
                          <span className="text-gray-600">{batch.year}</span>
                        </div>
                      </div>
                    ))}
                    {appState.batches.filter(b => b.courseId === selectedCourse.id).length === 0 && (
                      <p className="text-gray-500">No batches assigned</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-3">Enrolled Students</h3>
                  <div className="space-y-2">
                    {appState.students
                      .filter(s => {
                        const batch = appState.batches.find(b => b.id === s.batchId);
                        return batch?.courseId === selectedCourse.id;
                      })
                      .map((student) => (
                        <div key={student.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="text-gray-900">{student.name}</p>
                            <p className="text-gray-600">{student.rollNo}</p>
                          </div>
                          <span className="text-gray-600">{student.email}</span>
                        </div>
                      ))}
                    {appState.students.filter(s => {
                      const batch = appState.batches.find(b => b.id === s.batchId);
                      return batch?.courseId === selectedCourse.id;
                    }).length === 0 && (
                      <p className="text-gray-500">No students enrolled</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
