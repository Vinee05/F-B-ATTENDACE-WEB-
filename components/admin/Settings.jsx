import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, FileText, Bell, BarChart3, Settings as SettingsIcon, GraduationCap, Save, Plus, Trash2 } from 'lucide-react';

export function Settings({
  appState,
  setAppState,
  user,
  onNavigate,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    name: '',
    email: '',
    employeeId: '',
    password: ''
  });
  const [systemSettings, setSystemSettings] = useState({
    academicYear: '2024-2025',
    minAttendance: '75'
  });
  const [notifSettings, setNotifSettings] = useState({
    email_new_leave_requests: 'true'
  });

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/system-settings');
        if (res.ok) {
          const data = await res.json();
          setSystemSettings({
            academicYear: data.academicYear || '2024-2025',
            minAttendance: data.minAttendance || '75'
          });
          setNotifSettings({
            email_new_leave_requests: data.email_new_leave_requests || 'true'
          });
        }
      } catch (err) {
        console.error('load settings failed', err);
      }
    })();
  }, []);

  const sidebarItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(LayoutDashboard, { size: 20 })
  }, {
    id: 'courses',
    label: 'Manage Courses',
    icon: /*#__PURE__*/React.createElement(BookOpen, { size: 20 })
  }, {
    id: 'batches',
    label: 'Manage Batches',
    icon: /*#__PURE__*/React.createElement(Calendar, { size: 20 })
  }, {
    id: 'students',
    label: 'Manage Students',
    icon: /*#__PURE__*/React.createElement(GraduationCap, { size: 20 })
  }, {
    id: 'instructors',
    label: 'Manage Instructors',
    icon: /*#__PURE__*/React.createElement(Users, { size: 20 })
  }, {
    id: 'attendance',
    label: 'Attendance Management',
    icon: /*#__PURE__*/React.createElement(UserCheck, { size: 20 })
  }, {
    id: 'leaves',
    label: 'Leave Requests',
    icon: /*#__PURE__*/React.createElement(FileText, { size: 20 })
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: /*#__PURE__*/React.createElement(Bell, { size: 20 })
  }, {
    id: 'reports',
    label: 'Reports',
    icon: /*#__PURE__*/React.createElement(BarChart3, { size: 20 })
  }, {
    id: 'settings',
    label: 'Settings',
    icon: /*#__PURE__*/React.createElement(SettingsIcon, { size: 20 })
  }];

  const refreshAdmins = async () => {
    const res = await fetch('/api/admins');
    if (res.ok) {
      const admins = await res.json();
      setAppState(prev => ({ ...prev, admins }));
    }
  };

  React.useEffect(() => {
    refreshAdmins();
  }, []);

  const saveSettings = async (settings) => {
    const res = await fetch('/api/system-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to save settings');
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminForm.name || !newAdminForm.email || !newAdminForm.employeeId) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'admin',
          name: newAdminForm.name,
          email: newAdminForm.email,
          employeeId: newAdminForm.employeeId,
          password: newAdminForm.password || 'changeme123'
        })
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to add admin');
        return;
      }
      await refreshAdmins();
      setNewAdminForm({ name: '', email: '', employeeId: '', password: '' });
      setShowAddAdmin(false);
      alert('Admin added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add admin');
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (adminId === user.id) {
      alert('You cannot delete your own admin account');
      return;
    }
    if ((appState.admins || []).length <= 1) {
      alert('You must have at least one admin in the system');
      return;
    }
    try {
      const res = await fetch(`/api/admins/${adminId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to delete admin');
        return;
      }
      await refreshAdmins();
      alert('Admin removed successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete admin');
    }
  };

  const handleStatusChange = async (adminId, status) => {
    try {
      const res = await fetch(`/api/admins/${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to update status');
        return;
      }
      await refreshAdmins();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "settings",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", { className: "space-y-6" }, 
    /*#__PURE__*/React.createElement("div", null, 
      /*#__PURE__*/React.createElement("h1", { className: "text-gray-900" }, "Settings"),
      /*#__PURE__*/React.createElement("p", { className: "text-gray-600 mt-1" }, "Manage system preferences and configuration")
    ),
    /*#__PURE__*/React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 overflow-hidden" },
      /*#__PURE__*/React.createElement("div", { className: "flex border-b border-gray-200 overflow-x-auto" },
        /*#__PURE__*/React.createElement("button", {
          onClick: () => setActiveTab('profile'),
          className: `px-6 py-4 ${activeTab === 'profile' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`
        }, "Profile Settings"),
        /*#__PURE__*/React.createElement("button", {
          onClick: () => setActiveTab('system'),
          className: `px-6 py-4 ${activeTab === 'system' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`
        }, "System Settings"),
        /*#__PURE__*/React.createElement("button", {
          onClick: () => setActiveTab('notifications'),
          className: `px-6 py-4 ${activeTab === 'notifications' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`
        }, "Notification Settings"),
        /*#__PURE__*/React.createElement("button", {
          onClick: () => setActiveTab('admins'),
          className: `px-6 py-4 ${activeTab === 'admins' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`
        }, "Admin Management")
      ),
      /*#__PURE__*/React.createElement("div", { className: "p-6" },
        activeTab === 'profile' && /*#__PURE__*/React.createElement("div", { className: "space-y-6" },
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "Full Name"),
            /*#__PURE__*/React.createElement("input", { type: "text", defaultValue: user.name, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" })
          ),
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "Email Address"),
            /*#__PURE__*/React.createElement("input", { type: "email", defaultValue: user.email, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" })
          ),
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "Current Password"),
            /*#__PURE__*/React.createElement("input", {
              type: showPasswords ? 'text' : 'password',
              value: currentPassword,
              onChange: e => setCurrentPassword(e.target.value),
              placeholder: "Enter current password",
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            })
          ),
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "New Password"),
            /*#__PURE__*/React.createElement("input", {
              type: showPasswords ? 'text' : 'password',
              value: newPassword,
              onChange: e => setNewPassword(e.target.value),
              placeholder: "Enter new password",
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            })
          ),
          /*#__PURE__*/React.createElement("div", { className: "flex items-center gap-3" },
            /*#__PURE__*/React.createElement("label", { className: "flex items-center gap-2 text-sm text-gray-700" },
              /*#__PURE__*/React.createElement("input", {
                type: "checkbox",
                checked: showPasswords,
                onChange: e => setShowPasswords(e.target.checked),
                className: "w-4 h-4 rounded border-gray-300 accent-indigo-600"
              }),
              "Show passwords"
            )
          ),
          /*#__PURE__*/React.createElement("button", {
            className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700",
            onClick: async () => {
              if (!currentPassword || !newPassword) {
                alert('Please enter current and new password');
                return;
              }
              try {
                const res = await fetch('/api/users/password', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    role: user.role,
                    email: user.email,
                    currentPassword,
                    newPassword
                  })
                });
                if (!res.ok) {
                  const err = await res.json();
                  alert(err.error || 'Failed to update password');
                  return;
                }
                alert('Password updated successfully');
                setCurrentPassword('');
                setNewPassword('');
              } catch (err) {
                console.error(err);
                alert('Failed to update password');
              }
            }
          },
            /*#__PURE__*/React.createElement(Save, { size: 20 }),
            /*#__PURE__*/React.createElement("span", null, "Save Changes")
          )
        ),
        activeTab === 'system' && /*#__PURE__*/React.createElement("div", { className: "space-y-6" },
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "Academic Year"),
            /*#__PURE__*/React.createElement("select", {
              value: systemSettings.academicYear,
              onChange: e => setSystemSettings({ ...systemSettings, academicYear: e.target.value }),
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            },
              /*#__PURE__*/React.createElement("option", { value: "2024-2025" }, "2024-2025"),
              /*#__PURE__*/React.createElement("option", { value: "2025-2026" }, "2025-2026"),
              /*#__PURE__*/React.createElement("option", { value: "2026-2027" }, "2026-2027")
            )
          ),
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "Minimum Attendance Requirement (%)"),
            /*#__PURE__*/React.createElement("input", {
              type: "number",
              value: systemSettings.minAttendance,
              onChange: e => setSystemSettings({ ...systemSettings, minAttendance: e.target.value }),
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            })
          ),
          /*#__PURE__*/React.createElement("button", {
            className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700",
            onClick: async () => {
              try {
                await saveSettings({
                  academicYear: systemSettings.academicYear,
                  minAttendance: systemSettings.minAttendance
                });
                alert('System settings saved');
              } catch (err) {
                console.error(err);
                alert(err.message);
              }
            }
          },
            /*#__PURE__*/React.createElement(Save, { size: 20 }),
            /*#__PURE__*/React.createElement("span", null, "Save System Settings")
          )
        ),
        activeTab === 'notifications' && /*#__PURE__*/React.createElement("div", { className: "space-y-6" },
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("h3", { className: "text-gray-900 mb-4" }, "Email Notifications"),
            /*#__PURE__*/React.createElement("div", { className: "space-y-3" },
              /*#__PURE__*/React.createElement("label", { className: "flex items-center" },
                /*#__PURE__*/React.createElement("input", {
                  type: "checkbox",
                  className: "rounded border-gray-300 text-indigo-600",
                  checked: notifSettings.email_new_leave_requests === 'true',
                  onChange: e => setNotifSettings({
                    ...notifSettings,
                    email_new_leave_requests: e.target.checked ? 'true' : 'false'
                  })
                }),
                /*#__PURE__*/React.createElement("span", { className: "ml-2 text-gray-700" }, "New leave requests")
              )
            )
          ),
          /*#__PURE__*/React.createElement("button", {
            className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700",
            onClick: async () => {
              try {
                await saveSettings({ email_new_leave_requests: notifSettings.email_new_leave_requests });
                alert('Notification settings saved');
              } catch (err) {
                console.error(err);
                alert(err.message);
              }
            }
          },
            /*#__PURE__*/React.createElement(Save, { size: 20 }),
            /*#__PURE__*/React.createElement("span", null, "Save Notification Settings")
          )
        ),
        activeTab === 'admins' && /*#__PURE__*/React.createElement("div", { className: "space-y-6" },
          /*#__PURE__*/React.createElement("div", { className: "flex justify-between items-center mb-6" },
            /*#__PURE__*/React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, `Total Admins: ${appState.admins ? appState.admins.length : 0}`),
            /*#__PURE__*/React.createElement("button", {
              onClick: () => setShowAddAdmin(!showAddAdmin),
              className: "flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            },
              /*#__PURE__*/React.createElement(Plus, { size: 20 }),
              /*#__PURE__*/React.createElement("span", null, "Add New Admin")
            )
          ),
          showAddAdmin && /*#__PURE__*/React.createElement("div", { className: "bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6" },
            /*#__PURE__*/React.createElement("h4", { className: "text-md font-semibold text-gray-900 mb-4" }, "Add New Administrator"),
            /*#__PURE__*/React.createElement("div", { className: "space-y-4" },
              /*#__PURE__*/React.createElement("div", null,
                /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 font-medium mb-2" }, "Full Name"),
                /*#__PURE__*/React.createElement("input", {
                  type: "text",
                  value: newAdminForm.name,
                  onChange: e => setNewAdminForm({ ...newAdminForm, name: e.target.value }),
                  placeholder: "Enter full name",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                })
              ),
              /*#__PURE__*/React.createElement("div", null,
                /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 font-medium mb-2" }, "Email Address"),
                /*#__PURE__*/React.createElement("input", {
                  type: "email",
                  value: newAdminForm.email,
                  onChange: e => setNewAdminForm({ ...newAdminForm, email: e.target.value }),
                  placeholder: "Enter email address",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                })
              ),
              /*#__PURE__*/React.createElement("div", null,
                /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 font-medium mb-2" }, "Employee ID"),
                /*#__PURE__*/React.createElement("input", {
                  type: "text",
                  value: newAdminForm.employeeId,
                  onChange: e => setNewAdminForm({ ...newAdminForm, employeeId: e.target.value }),
                  placeholder: "Enter employee ID",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                })
              ),
              /*#__PURE__*/React.createElement("div", null,
                /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 font-medium mb-2" }, "Password (optional)"),
                /*#__PURE__*/React.createElement("input", {
                  type: showAdminPassword ? 'text' : 'password',
                  value: newAdminForm.password,
                  onChange: e => setNewAdminForm({ ...newAdminForm, password: e.target.value }),
                  placeholder: "Default: changeme123",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                })
              ),
              /*#__PURE__*/React.createElement("label", { className: "flex items-center gap-2 text-sm text-gray-700" },
                /*#__PURE__*/React.createElement("input", {
                  type: "checkbox",
                  checked: showAdminPassword,
                  onChange: e => setShowAdminPassword(e.target.checked),
                  className: "w-4 h-4 rounded border-gray-300 accent-indigo-600"
                }),
                "Show password"
              ),
              /*#__PURE__*/React.createElement("div", { className: "flex space-x-3" },
                /*#__PURE__*/React.createElement("button", {
                  onClick: handleAddAdmin,
                  className: "flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium"
                }, "Add Admin"),
                /*#__PURE__*/React.createElement("button", {
                  onClick: () => setShowAddAdmin(false),
                  className: "flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 font-medium"
                }, "Cancel")
              )
            )
          ),
          /*#__PURE__*/React.createElement("div", { className: "overflow-x-auto" },
            /*#__PURE__*/React.createElement("table", { className: "w-full" },
              /*#__PURE__*/React.createElement("thead", { className: "bg-gray-100 border-b border-gray-200" },
                /*#__PURE__*/React.createElement("tr", null,
                  /*#__PURE__*/React.createElement("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900" }, "Name"),
                  /*#__PURE__*/React.createElement("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900" }, "Email"),
                  /*#__PURE__*/React.createElement("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900" }, "Employee ID"),
                  /*#__PURE__*/React.createElement("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900" }, "Status"),
                  /*#__PURE__*/React.createElement("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900" }, "Created"),
                  /*#__PURE__*/React.createElement("th", { className: "px-6 py-3 text-left text-sm font-semibold text-gray-900" }, "Actions")
                )
              ),
              /*#__PURE__*/React.createElement("tbody", null,
                appState.admins && appState.admins.map(admin => /*#__PURE__*/React.createElement("tr", {
                  key: admin.id,
                  className: "border-b border-gray-200 hover:bg-gray-50"
                },
                  /*#__PURE__*/React.createElement("td", { className: "px-6 py-4" }, /*#__PURE__*/React.createElement("span", { className: "font-medium text-gray-900" }, admin.name)),
                  /*#__PURE__*/React.createElement("td", { className: "px-6 py-4 text-gray-700" }, admin.email),
                  /*#__PURE__*/React.createElement("td", { className: "px-6 py-4 text-gray-700" }, admin.employeeId),
                  /*#__PURE__*/React.createElement("td", { className: "px-6 py-4" }, /*#__PURE__*/React.createElement("select", {
                    value: admin.status,
                    onChange: e => handleStatusChange(admin.id, e.target.value),
                    className: "px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  },
                    /*#__PURE__*/React.createElement("option", { value: "active" }, "active"),
                    /*#__PURE__*/React.createElement("option", { value: "inactive" }, "inactive")
                  )),
                  /*#__PURE__*/React.createElement("td", { className: "px-6 py-4 text-gray-700" }, admin.createdAt),
                  /*#__PURE__*/React.createElement("td", { className: "px-6 py-4" },
                    /*#__PURE__*/React.createElement("button", {
                      onClick: () => handleDeleteAdmin(admin.id),
                      disabled: admin.id === user.id,
                      className: "text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                    }, /*#__PURE__*/React.createElement(Trash2, { size: 18 }))
                  )
                ))
              )
            )
          )
        )
      )
    )
  ));
}
