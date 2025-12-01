import React, { useState } from 'react';
import { Layout } from '../Layout';
import { AppState, User, Notification } from '../../App';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings, GraduationCap, Plus, X, Send } from 'lucide-react';

interface NotificationsProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Notifications({ appState, setAppState, user, onNavigate, onLogout }: NotificationsProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'all',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNotification: Notification = {
      id: `n${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user.id,
    };

    setAppState(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications],
    }));

    setFormData({ title: '', message: '', target: 'all' });
    setShowCreateModal(false);
  };

  return (
    <Layout
      user={user}
      currentPage="notifications"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Send announcements and notifications</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            <span>Create Notification</span>
          </button>
        </div>

        {/* Notification History */}
        <div className="space-y-4">
          {appState.notifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-gray-900">{notification.title}</h3>
                  <p className="text-gray-600 mt-2">{notification.message}</p>
                </div>
                <Bell className="text-indigo-600" size={24} />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Target: <span className="capitalize text-gray-900">{notification.target}</span>
                  </span>
                  <span className="text-gray-600">
                    Created: <span className="text-gray-900">{notification.createdAt}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {appState.notifications.length === 0 && (
            <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-gray-900 mb-2">No Notifications Yet</h3>
              <p className="text-gray-600">Create your first notification to send announcements</p>
            </div>
          )}
        </div>

        {/* Create Notification Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Create Notification</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter notification title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                    placeholder="Enter notification message"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Users</option>
                    <option value="students">Students Only</option>
                    <option value="instructors">Instructors Only</option>
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-gray-900 mb-2">Preview</h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-900">{formData.title || 'Notification Title'}</p>
                    <p className="text-gray-600 mt-2">{formData.message || 'Notification message will appear here'}</p>
                    <p className="text-gray-500 mt-2">Target: {formData.target}</p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                  >
                    <Send size={18} />
                    <span>Send Notification</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
