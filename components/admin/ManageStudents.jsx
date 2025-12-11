import React, { useState, useRef } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
import { parseCSV } from './csvUtils';

export function ManageStudents({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    batchId: '',
    parentsEmail: '',
    password: ''
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
      rollNo: '',
      batchId: '',
      parentsEmail: '',
      password: ''
    });
    setEditingStudent(null);
    setShowAddModal(true);
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name || '',
      email: student.email || '',
      rollNo: student.rollNo || '',
      batchId: student.batchId ? String(student.batchId) : '',
      parentsEmail: student.parentsEmail || '',
      password: ''
    });
    setEditingStudent(student);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const payload = { ...formData };
        console.log('Payload before send:', payload);
        
        if (editingStudent && !payload.password) {
          delete payload.password; // avoid clearing existing password
        }
        
        if (editingStudent) {
          console.log('Updating student with ID:', editingStudent.id);
          console.log('Payload:', payload);
          const res = await fetch(`/api/students/${editingStudent.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Update failed');
          }
          const updated = await res.json();
          console.log('Student updated:', updated);
        } else {
          const res = await fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Create failed');
          }
        }

        // Refresh students from API
        const studentsRes = await fetch('/api/students');
        if (!studentsRes.ok) throw new Error('Failed to reload students');
        const students = await studentsRes.json();
        console.log('Reloaded students:', students);
        setAppState(prev => ({ ...prev, students }));
        setShowAddModal(false);
        alert(`Student ${editingStudent ? 'updated' : 'created'} successfully!`);
      } catch (err) {
        console.error('Error:', err);
        alert('Failed to save student: ' + err.message);
      }
    })();
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
        const students = rows.map(r => {
          const batchName = r.batchName || r.batch || '';
          const batch = batchName ? appState.batches.find(b => b.name === batchName) : null;
          return {
            rollNo: r.rollNo || r.roll || '',
            name: r.name || '',
            email: r.email || '',
            parentsEmail: r.parentsEmail || r.parents_email || r.parents || '',
            batchId: batch ? batch.id : (r.batchId || '')
          };
        });

        const res = await fetch('/api/students/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ students })
        });

        if (!res.ok) {
          const err = await res.json();
          alert(`Import failed: ${err.error}`);
          return;
        }

        const result = await res.json();

        // Refresh students list from API to ensure server-authoritative state
        const studentsRes = await fetch('/api/students');
        if (!studentsRes.ok) throw new Error('Failed to reload students after import');
        const latestStudents = await studentsRes.json();
        setAppState(prev => ({ ...prev, students: latestStudents }));

        if (result.imported && result.imported.length > 0) {
          alert(`Successfully imported ${result.imported.length} students${result.errors.length > 0 ? `. ${result.errors.length} rows had errors.` : '.'}`);
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

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      (async () => {
        try {
          const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error((await res.json()).error || 'Delete failed');
          const studentsRes = await fetch('/api/students');
          if (!studentsRes.ok) throw new Error('Failed to reload students');
          const students = await studentsRes.json();
          setAppState(prev => ({ ...prev, students }));
        } catch (err) {
          console.error(err);
          alert('Failed to delete student: ' + err.message);
        }
      })();
    }
  };

  return (
    <Layout
      user={user}
      currentPage="students"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Manage Students</h1>
            <p className="text-gray-600 mt-1">Enroll and manage student records</p>
          </div>
          <div className="flex">
            <button
              onClick={handleAdd}
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mr-2"
            >
              <Plus size={20} />
              <span>Add New Student</span>
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
                <th className="text-left py-3 px-4 text-gray-700">Roll No</th>
                <th className="text-left py-3 px-4 text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-gray-700">Batch</th>
                <th className="text-left py-3 px-4 text-gray-700">Parent Email</th>
                <th className="text-right py-3 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appState.students.map(student => {
                const batch = appState.batches.find(b => b.id === student.batchId);
                const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;
                return (
                  <tr key={student.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{student.rollNo}</td>
                    <td className="py-3 px-4 text-gray-900">{student.name}</td>
                    <td className="py-3 px-4 text-gray-600">{student.email}</td>
                    <td className="py-3 px-4 text-gray-600">{batch ? `${batch.name} (${course?.code})` : 'Not Assigned'}</td>
                    <td className="py-3 px-4 text-gray-600">{student.parentsEmail || '-'}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleEdit(student)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(student.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
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
                <h2 className="text-gray-900">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
                <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Student Name</label>
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

                <div>
                  <label className="block text-gray-700 mb-2">Password {editingStudent ? '(leave blank to keep)' : ''}</label>
                  <input
                    type={showStudentPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Default: changeme123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                    <input
                      type="checkbox"
                      checked={showStudentPassword}
                      onChange={e => setShowStudentPassword(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 accent-indigo-600"
                    />
                    Show password
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Parent Email</label>
                  <input
                    type="email"
                    value={formData.parentsEmail}
                    onChange={e => setFormData({ ...formData, parentsEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Assign to Batch</label>
                  <select
                    value={formData.batchId}
                    onChange={e => setFormData({ ...formData, batchId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Batch</option>
                    {appState.batches.map(batch => {
                      const course = appState.courses.find(c => c.id === batch.courseId);
                      return <option key={batch.id} value={batch.id}>{batch.name} - {course?.name}</option>;
                    })}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">{editingStudent ? 'Update' : 'Add'} Student</button>
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
