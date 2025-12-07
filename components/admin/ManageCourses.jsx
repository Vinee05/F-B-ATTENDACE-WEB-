import React, { useState, useRef } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
import { MultiDayPicker } from '../ui/multi-day-picker';
import { parseCSV } from './csvUtils';

export function ManageCourses({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    instructorIds: [],
    courseDays: []
  });
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [holidays, setHolidays] = useState([]);

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

  const fileRef = useRef();

  const handleAdd = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      instructorIds: [],
      courseDays: []
    });
    setEditingCourse(null);
    setShowAddModal(true);
  };

  const handleImportClick = () => {
    fileRef.current?.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const rows = parseCSV(evt.target.result);
        const courses = rows.map(r => ({
          code: r.code || r.courseCode || '',
          name: r.name || r.courseName || '',
          description: r.description || ''
        }));
        
        const res = await fetch('/api/courses/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courses })
        });
        
        if (!res.ok) {
          const err = await res.json();
          alert(`Import failed: ${err.error}`);
          return;
        }
        
        const result = await res.json();
        // Refresh courses from API to get server-authoritative state
        const coursesRes = await fetch('/api/courses');
        if (!coursesRes.ok) throw new Error('Failed to reload courses after import');
        const latestCourses = await coursesRes.json();
        setAppState(prev => ({ ...prev, courses: latestCourses }));

        if (result.imported && result.imported.length > 0) {
          alert(`Successfully imported ${result.imported.length} courses${result.errors.length > 0 ? `. ${result.errors.length} rows had errors.` : '.'}`);  
        } else {
          alert(`Import completed with errors.\n${result.errors.map(e => `Row ${e.row}: ${e.message}`).join('\n')}`);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to import CSV: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleEdit = (course) => {
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      instructorIds: course.instructorIds || [],
      courseDays: course.courseDays || []
    });
    setEditingCourse(course);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        if (editingCourse) {
          const res = await fetch(`/api/courses/${editingCourse.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error((await res.json()).error || 'Update failed');
        } else {
          const res = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error((await res.json()).error || 'Create failed');
        }

        const coursesRes = await fetch('/api/courses');
        if (!coursesRes.ok) throw new Error('Failed to reload courses');
        const courses = await coursesRes.json();
        setAppState(prev => ({ ...prev, courses }));
        setShowAddModal(false);
      } catch (err) {
        console.error(err);
        alert('Failed to save course: ' + err.message);
      }
    })();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
      (async () => {
        try {
          const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error((await res.json()).error || 'Delete failed');
          const coursesRes = await fetch('/api/courses');
          if (!coursesRes.ok) throw new Error('Failed to reload courses');
          const courses = await coursesRes.json();
          setAppState(prev => ({ ...prev, courses }));
        } catch (err) {
          console.error(err);
          alert('Failed to delete course: ' + err.message);
        }
      })();
    }
  };

  const handleInstructorChange = (instructorId, isChecked) => {
    if (isChecked) {
      setFormData({
        ...formData,
        instructorIds: [...formData.instructorIds, instructorId]
      });
    } else {
      setFormData({
        ...formData,
        instructorIds: formData.instructorIds.filter(id => id !== instructorId)
      });
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
          <div className="flex">
            <button
              onClick={handleAdd}
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mr-2"
            >
              <Plus size={20} />
              <span>Add New Course</span>
            </button>
            <button onClick={handleImportClick} className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Import CSV</button>
            <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} style={{ display: 'none' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-700">Code</th>
                <th className="text-left py-3 px-4 text-gray-700">Course Name</th>
                <th className="text-left py-3 px-4 text-gray-700">Description</th>
                <th className="text-left py-3 px-4 text-gray-700">Instructors</th>
                <th className="text-right py-3 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appState.courses.map(course => (
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
                  <td className="py-3 px-4 text-gray-600">
                    {course.instructorNames && course.instructorNames.length > 0 
                      ? course.instructorNames.join(', ') 
                      : 'Not Assigned'}
                  </td>
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
                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Course Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Assign Instructors</label>
                  <div className="space-y-2 border-2 border-gray-300 rounded-lg p-4 max-h-56 overflow-y-auto bg-gray-50">
                    {appState.instructors && appState.instructors.length > 0 ? (
                      appState.instructors.map(instructor => (
                        <label
                          key={instructor.id}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-white p-3 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.instructorIds.includes(instructor.id)}
                            onChange={(e) => {
                              console.log('Checkbox changed:', instructor.id, e.target.checked);
                              handleInstructorChange(instructor.id, e.target.checked);
                            }}
                            className="w-5 h-5 cursor-pointer accent-indigo-600"
                          />
                          <span className="text-gray-800 font-medium">{instructor.name}</span>
                        </label>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic">No instructors available</p>
                    )}
                  </div>
                  {formData.instructorIds.length > 0 && (
                    <div className="mt-2 text-sm text-indigo-600 font-medium">
                      {formData.instructorIds.length} instructor{formData.instructorIds.length !== 1 ? 's' : ''} selected
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    Course Days (Excluding Weekends & Holidays)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDayPicker(true)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium text-gray-900"
                  >
                    {formData.courseDays.length > 0 ? `${formData.courseDays.length} days selected` : 'Click to select days'}
                  </button>
                  {formData.courseDays.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.courseDays.slice(0, 3).map(day => (
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
                    <p className="text-gray-600">Instructors</p>
                    <div className="text-gray-900 mt-1 flex flex-wrap gap-2">
                      {selectedCourse.instructorNames && selectedCourse.instructorNames.length > 0 ? (
                        selectedCourse.instructorNames.map((name, idx) => (
                          <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm">
                            {name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Not Assigned</span>
                      )}
                    </div>
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
                      <Calendar size={16} />
                      Course Days ({selectedCourse.courseDays.length} days)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.courseDays.map(day => (
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
                    {appState.batches.filter(b => b.courseId === selectedCourse.id).map(batch => (
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
                    {appState.students.filter(s => {
                      const batch = appState.batches.find(b => b.id === s.batchId);
                      return batch?.courseId === selectedCourse.id;
                    }).map(student => (
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
