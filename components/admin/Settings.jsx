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
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    name: '',
    email: '',
    employeeId: ''
  });

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

  const handleAddAdmin = () => {
    if (!newAdminForm.name || !newAdminForm.email || !newAdminForm.employeeId) {
      alert('Please fill in all fields');
      return;
    }

    const newAdmin = {
      id: `admin${Date.now()}`,
      name: newAdminForm.name,
      email: newAdminForm.email,
      employeeId: newAdminForm.employeeId,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setAppState({
      ...appState,
      admins: [...appState.admins, newAdmin]
    });

    setNewAdminForm({ name: '', email: '', employeeId: '' });
    setShowAddAdmin(false);
    alert('Admin added successfully!');
  };

  const handleDeleteAdmin = (adminId) => {
    if (adminId === user.id) {
      alert('You cannot delete your own admin account');
      return;
    }
    if (appState.admins.length <= 1) {
      alert('You must have at least one admin in the system');
      return;
    }
    setAppState({
      ...appState,
      admins: appState.admins.filter(a => a.id !== adminId)
    });
    alert('Admin removed successfully!');
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
            /*#__PURE__*/React.createElement("input", { type: "password", placeholder: "Enter current password", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" })
          ),
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "New Password"),
            /*#__PURE__*/React.createElement("input", { type: "password", placeholder: "Enter new password", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" })
          ),
          /*#__PURE__*/React.createElement("button", { className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700" },
            /*#__PURE__*/React.createElement(Save, { size: 20 }),
            /*#__PURE__*/React.createElement("span", null, "Save Changes")
          )
        ),
        activeTab === 'system' && /*#__PURE__*/React.createElement("div", { className: "space-y-6" },
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "Academic Year"),
            /*#__PURE__*/React.createElement("select", { className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" },
              /*#__PURE__*/React.createElement("option", null, "2024-2025"),
              /*#__PURE__*/React.createElement("option", null, "2025-2026"),
              /*#__PURE__*/React.createElement("option", null, "2026-2027")
            )
          ),
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("label", { className: "block text-gray-700 mb-2" }, "Minimum Attendance Requirement (%)"),
            /*#__PURE__*/React.createElement("input", { type: "number", defaultValue: "75", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" })
          ),
          /*#__PURE__*/React.createElement("button", { className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700" },
            /*#__PURE__*/React.createElement(Save, { size: 20 }),
            /*#__PURE__*/React.createElement("span", null, "Save System Settings")
          )
        ),
        activeTab === 'notifications' && /*#__PURE__*/React.createElement("div", { className: "space-y-6" },
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("h3", { className: "text-gray-900 mb-4" }, "Email Notifications"),
            /*#__PURE__*/React.createElement("div", { className: "space-y-3" },
              /*#__PURE__*/React.createElement("label", { className: "flex items-center" },
                /*#__PURE__*/React.createElement("input", { type: "checkbox", className: "rounded border-gray-300 text-indigo-600", defaultChecked: true }),
                /*#__PURE__*/React.createElement("span", { className: "ml-2 text-gray-700" }, "New leave requests")
              )
            )
          ),
          /*#__PURE__*/React.createElement("button", { className: "flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700" },
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
                  /*#__PURE__*/React.createElement("td", { className: "px-6 py-4" }, /*#__PURE__*/React.createElement("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}` }, admin.status)),
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
