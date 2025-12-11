import React, { useState, useRef } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
import { parseCSV } from './csvUtils';

export function ManageBatches({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [formData, setFormData] = useState({
    courseId: '',
    name: '',
    startDate: '',
    endDate: '',
    year: ''
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
      courseId: '',
      name: '',
      startDate: '',
      endDate: '',
      year: ''
    });
    setEditingBatch(null);
    setShowAddModal(true);
  };

  const handleEdit = (batch) => {
    setFormData({
      courseId: batch.courseId,
      name: batch.name,
      startDate: batch.startDate,
      endDate: batch.endDate,
      year: batch.year
    });
    setEditingBatch(batch);
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        if (editingBatch) {
          const res = await fetch(`/api/batches/${editingBatch.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error((await res.json()).error || 'Update failed');
        } else {
          const res = await fetch('/api/batches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error((await res.json()).error || 'Create failed');
        }

        const batchesRes = await fetch('/api/batches');
        if (!batchesRes.ok) throw new Error('Failed to reload batches');
        const batches = await batchesRes.json();
        setAppState(prev => ({ ...prev, batches }));
        setShowAddModal(false);
        alert(`Batch ${editingBatch ? 'updated' : 'created'} successfully!`);
      } catch (err) {
        console.error(err);
        alert('Failed to save batch: ' + err.message);
      }
    })();
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
        const batches = rows.map(r => {
          const course = appState.courses.find(c => c.code === r.courseCode || c.code === r.code || c.id === r.courseId);
          return {
            courseId: course ? course.id : (r.courseId || ''),
            name: r.name || r.batchName || '',
            startDate: r.startDate || '',
            endDate: r.endDate || '',
            year: r.year || ''
          };
        });

        const res = await fetch('/api/batches/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ batches })
        });

        if (!res.ok) {
          const err = await res.json();
          alert(`Import failed: ${err.error}`);
          return;
        }

        const result = await res.json();
        // Refresh batches from API to get server-authoritative state
        const batchesRes = await fetch('/api/batches');
        if (!batchesRes.ok) throw new Error('Failed to reload batches after import');
        const latestBatches = await batchesRes.json();
        setAppState(prev => ({ ...prev, batches: latestBatches }));

        if (result.imported && result.imported.length > 0) {
          alert(`Successfully imported ${result.imported.length} batches${result.errors.length > 0 ? `. ${result.errors.length} rows had errors.` : '.'}`);
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
    if (confirm('Are you sure you want to delete this batch?')) {
      (async () => {
        try {
          const res = await fetch(`/api/batches/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error((await res.json()).error || 'Delete failed');
          const batchesRes = await fetch('/api/batches');
          if (!batchesRes.ok) throw new Error('Failed to reload batches');
          const batches = await batchesRes.json();
          setAppState(prev => ({ ...prev, batches }));
        } catch (err) {
          console.error(err);
          alert('Failed to delete batch: ' + err.message);
        }
      })();
    }
  };

  return (
    <Layout
      user={user}
      currentPage="batches"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Manage Batches</h1>
            <p className="text-gray-600 mt-1">Create and manage course batches</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add New Batch</span>
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
                <th className="text-left py-3 px-4 text-gray-700">Batch Name</th>
                <th className="text-left py-3 px-4 text-gray-700">Course</th>
                <th className="text-left py-3 px-4 text-gray-700">Start Date</th>
                <th className="text-left py-3 px-4 text-gray-700">End Date</th>
                <th className="text-left py-3 px-4 text-gray-700">Year</th>
                <th className="text-left py-3 px-4 text-gray-700">Students</th>
                <th className="text-right py-3 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appState.batches.map(batch => {
                const course = appState.courses.find(c => c.id === batch.courseId);
                const studentCount = appState.students.filter(s => s.batchId === batch.id).length;
                return (
                  <tr key={batch.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{batch.name}</td>
                    <td className="py-3 px-4 text-gray-600">{course?.name || 'Unknown'}</td>
                    <td className="py-3 px-4 text-gray-600">{batch.startDate}</td>
                    <td className="py-3 px-4 text-gray-600">{batch.endDate}</td>
                    <td className="py-3 px-4 text-gray-600">{batch.year}</td>
                    <td className="py-3 px-4 text-gray-600">{studentCount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleEdit(batch)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(batch.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
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
                <h2 className="text-gray-900">{editingBatch ? 'Edit Batch' : 'Add New Batch'}</h2>
                <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Course</label>
                  <select
                    value={formData.courseId}
                    onChange={e => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Course</option>
                    {appState.courses.map(course => (
                      <option key={course.id} value={course.id}>{course.code} - {course.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Batch Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Batch A1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="2025"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">{editingBatch ? 'Update' : 'Add'} Batch</button>
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
