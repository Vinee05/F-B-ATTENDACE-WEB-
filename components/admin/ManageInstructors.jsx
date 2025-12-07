import React, { useState, useRef } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
import { parseCSV } from './csvUtils';

export function ManageInstructors({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const readJsonSafe = async (res) => {
    // Fallback parser so we do not crash when the server returns an empty or non-JSON body
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (err) {
      return null;
    }
  };

  const getErrorMessage = async (res, fallback) => {
    const data = await readJsonSafe(res);
    if (!data) return fallback;
    if (typeof data === 'string') return data;
    return data.error || data.message || fallback;
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: ''
  });
  const fileRef = useRef();

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

  const handleAdd = () => {
    setFormData({
      name: '',
      email: '',
      employeeId: ''
    });
    setEditingInstructor(null);
    setShowAddModal(true);
  };

  const handleImportClick = () => {
    fileRef.current?.click();
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') return;

        const rows = parseCSV(text);
        const instructors = rows.map(r => ({
          name: r.name || '',
          email: r.email || '',
          employeeId: r.employeeId || r.employee_id || r.empId || ''
        }));

        const res = await fetch('/api/instructors/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ instructors })
        });

        if (!res.ok) {
          const message = await getErrorMessage(res, 'Import failed');
          alert(`Import failed: ${message}`);
          return;
        }

        const result = await res.json();
        // Refresh instructors from API to get server-authoritative state
        const instructorsRes = await fetch('/api/instructors');
        if (!instructorsRes.ok) throw new Error('Failed to reload instructors after import');
        const latestInstructors = await instructorsRes.json();
        setAppState(prev => ({ ...prev, instructors: latestInstructors }));

        if (result.imported && result.imported.length > 0) {
          alert(`Successfully imported ${result.imported.length} instructors${result.errors.length > 0 ? `. ${result.errors.length} rows had errors.` : '.'}`);
        } else {
          alert(`Import completed with errors. Check details:\n${result.errors.map(e => `Row ${e.row}: ${e.message}`).join('\n')}`);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to import CSV: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleEdit = (instructor) => {
    setFormData({
      name: instructor.name,
      email: instructor.email,
      employeeId: instructor.employeeId
    });
    setEditingInstructor(instructor);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        if (editingInstructor) {
          const res = await fetch(`/api/instructors/${editingInstructor.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error(await getErrorMessage(res, 'Update failed'));
        } else {
          const res = await fetch('/api/instructors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error(await getErrorMessage(res, 'Create failed'));
        }

        const instructorsRes = await fetch('/api/instructors');
        if (!instructorsRes.ok) throw new Error('Failed to reload instructors');
        const instructors = await instructorsRes.json();
        setAppState(prev => ({ ...prev, instructors }));
        setShowAddModal(false);
      } catch (err) {
        console.error(err);
        alert('Failed to save instructor: ' + err.message);
      }
    })();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this instructor?')) {
      (async () => {
        try {
          const res = await fetch(`/api/instructors/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error(await getErrorMessage(res, 'Delete failed'));
          const instructorsRes = await fetch('/api/instructors');
          if (!instructorsRes.ok) throw new Error('Failed to reload instructors');
          const instructors = await instructorsRes.json();
          setAppState(prev => ({ ...prev, instructors }));
        } catch (err) {
          console.error(err);
          alert('Failed to delete instructor: ' + err.message);
        }
      })();
    }
  };

  return (
    <Layout
      user={user}
      currentPage="instructors"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Manage Instructors</h1>
            <p className="text-gray-600 mt-1">Add and manage instructor records</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add New Instructor</span>
            </button>
            <button
              onClick={handleImportClick}
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>Import CSV</span>
            </button>
            <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} style={{ display: 'none' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-700">Employee ID</th>
                <th className="text-left py-3 px-4 text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-gray-700">Assigned Courses</th>
                <th className="text-right py-3 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appState.instructors.map(instructor => {
                const assignedCourses = appState.courses.filter(c => c.instructorId === instructor.id);
                return (
                  <tr key={instructor.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{instructor.employeeId}</td>
                    <td className="py-3 px-4 text-gray-900">{instructor.name}</td>
                    <td className="py-3 px-4 text-gray-600">{instructor.email}</td>
                    <td className="py-3 px-4 text-gray-600">{assignedCourses.length > 0 ? assignedCourses.map(c => c.code).join(', ') : 'No courses assigned'}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleEdit(instructor)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(instructor.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">{editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}</h2>
                <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">{editingInstructor ? 'Update' : 'Add'} Instructor</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
