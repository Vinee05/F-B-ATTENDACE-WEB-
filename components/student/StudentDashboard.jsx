import React, { useState } from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, UserCheck, FileText, Bell, Filter, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export function StudentDashboard({
  appState,
  user,
  onNavigate,
  onLogout
}) {
  const [selectedCourse, setSelectedCourse] = useState('');

  const sidebarItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: React.createElement(LayoutDashboard, { size: 20 })
  }, {
    id: 'attendance',
    label: 'My Attendance',
    icon: React.createElement(UserCheck, { size: 20 })
  }, {
    id: 'leave',
    label: 'Leave Requests',
    icon: React.createElement(FileText, { size: 20 })
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: React.createElement(Bell, { size: 20 })
  }];

  const student = appState.students.find(s => s.id === user.id);
  
  // Get courses from student's batch
  const studentCourses = student?.batchId 
    ? appState.courses.filter(c => {
        const batch = appState.batches.find(b => b.id === student.batchId);
        return batch && batch.courseId === c.id;
      })
    : [];

  // Get batch and course for display
  const batch = student?.batchId ? appState.batches.find(b => b.id === student.batchId) : null;
  const course = batch ? appState.courses.find(c => c.id === batch.courseId) : null;

  // Default the filter to the student's enrolled course so it shows up immediately
  React.useEffect(() => {
    if (!selectedCourse && studentCourses.length > 0) {
      setSelectedCourse(studentCourses[0].id);
    }
  }, [studentCourses, selectedCourse]);

  console.log('StudentDashboard Debug:', {
    userId: user.id,
    student: student,
    batchId: student?.batchId,
    batch: batch,
    course: course,
    studentCourses: studentCourses
  });
  
  const filteredAttendance = appState.attendance.filter(a => a.studentId === user.id).filter(a => {
    if (selectedCourse && a.courseId !== selectedCourse) return false;
    return true;
  });
  
  const totalPresent = filteredAttendance.filter(a => a.status === 'present').length;
  const totalAbsent = filteredAttendance.filter(a => a.status === 'absent').length;
  const totalExcused = filteredAttendance.filter(a => a.status === 'excused').length;
  const totalSessions = filteredAttendance.length;
  const percentage = totalSessions > 0 ? Math.round(totalPresent / totalSessions * 100) : 0;

  const pieChartData = [
    { name: 'Present', value: totalPresent, color: '#10b981' },
    { name: 'Absent', value: totalAbsent, color: '#ef4444' },
    { name: 'Excused', value: totalExcused, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  const attendanceByMonth = filteredAttendance.reduce((acc, record) => {
    const month = record.date.substring(0, 7);
    const existing = acc.find(item => item.month === month);
    if (existing) {
      if (record.status === 'present') existing.present++;
      if (record.status === 'absent') existing.absent++;
      if (record.status === 'excused') existing.excused++;
    } else {
      acc.push({
        month,
        present: record.status === 'present' ? 1 : 0,
        absent: record.status === 'absent' ? 1 : 0,
        excused: record.status === 'excused' ? 1 : 0
      });
    }
    return acc;
  }, []).sort((a, b) => a.month.localeCompare(b.month));

  const myNotifications = appState.notifications.filter(n => n.target === 'all' || n.target === 'students');

  return React.createElement(Layout, {
    user: user,
    currentPage: "dashboard",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, 
    React.createElement("div", { className: "space-y-8 p-4 md:p-8" }, 
      // Header
      React.createElement("div", null, 
        React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Student Dashboard"), 
        React.createElement("p", { className: "text-gray-600 mt-1" }, "Welcome back, ", user.name)
      ),

      // Enrollment summary
      React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" },
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
          React.createElement("div", { className: "p-4 border rounded-lg bg-gray-50" },
            React.createElement("p", { className: "text-xs uppercase text-gray-500 font-semibold" }, "Course"),
            React.createElement("p", { className: "text-gray-900 font-bold mt-1" }, course?.name || course?.code || 'Not Enrolled')
          ),
          React.createElement("div", { className: "p-4 border rounded-lg bg-gray-50" },
            React.createElement("p", { className: "text-xs uppercase text-gray-500 font-semibold" }, "Batch"),
            React.createElement("p", { className: "text-gray-900 font-bold mt-1" }, batch?.name || batch?.id || 'Not Assigned')
          ),
          React.createElement("div", { className: "p-4 border rounded-lg bg-gray-50" },
            React.createElement("p", { className: "text-xs uppercase text-gray-500 font-semibold" }, "Roll Number"),
            React.createElement("p", { className: "text-gray-900 font-bold mt-1" }, student?.rollNo || 'N/A')
          )
        )
      ),
      
      // Course Filter
      React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
        React.createElement("div", { className: "flex items-center space-x-2 mb-4" }, 
          React.createElement(Filter, { size: 20, className: "text-gray-600" }), 
          React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, "Filter by Course")
        ), 
        React.createElement("select", {
          value: selectedCourse,
          onChange: e => setSelectedCourse(e.target.value),
          className: "w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        }, 
          React.createElement("option", { value: "" }, "All Courses"), 
          studentCourses.map(c => React.createElement("option", { key: c.id, value: c.id }, c.code, " - ", c.name))
        )
      ),
      
      // Stats Cards
      React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, 
        React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
          React.createElement("div", { className: "flex items-center justify-between" }, 
            React.createElement("div", null, 
              React.createElement("p", { className: "text-gray-600 text-sm font-medium" }, "Total Present"), 
              React.createElement("h2", { className: "text-4xl font-bold text-green-600 mt-2" }, totalPresent)
            ), 
            React.createElement("div", { className: "bg-green-100 p-4 rounded-lg" }, 
              React.createElement(UserCheck, { className: "text-green-600", size: 28 })
            )
          )
        ), 
        React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
          React.createElement("div", { className: "flex items-center justify-between" }, 
            React.createElement("div", null, 
              React.createElement("p", { className: "text-gray-600 text-sm font-medium" }, "Total Absent"), 
              React.createElement("h2", { className: "text-4xl font-bold text-red-600 mt-2" }, totalAbsent)
            ), 
            React.createElement("div", { className: "bg-red-100 p-4 rounded-lg" }, 
              React.createElement(UserCheck, { className: "text-red-600", size: 28 })
            )
          )
        ), 
        React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
          React.createElement("div", { className: "flex items-center justify-between" }, 
            React.createElement("div", null, 
              React.createElement("p", { className: "text-gray-600 text-sm font-medium" }, "Attendance %"), 
              React.createElement("h2", { 
                className: `text-4xl font-bold mt-2 ${percentage >= 75 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`
              }, percentage, "%")
            ), 
            React.createElement("div", { className: "bg-indigo-100 p-4 rounded-lg" }, 
              React.createElement(TrendingUp, { className: "text-indigo-600", size: 28 })
            )
          )
        )
      ),
      
      // Charts Section
      React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, 
        // Pie Chart
        React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
          React.createElement("h3", { className: "text-xl font-bold text-gray-900 mb-6" }, "Attendance Distribution"),
          React.createElement("div", { style: { width: '100%', height: '350px' } },
            pieChartData.length > 0 ? 
              React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                React.createElement(PieChart, null,
                  React.createElement(Pie, {
                    data: pieChartData,
                    cx: "50%",
                    cy: "50%",
                    labelLine: true,
                    label: ({ name, value }) => `${name}: ${value}`,
                    outerRadius: 100,
                    fill: "#8884d8",
                    dataKey: "value"
                  },
                    pieChartData.map((entry, index) => 
                      React.createElement(Cell, {
                        key: `cell-${index}`,
                        fill: entry.color
                      })
                    )
                  ),
                  React.createElement(Tooltip, null),
                  React.createElement(Legend, null)
                )
              )
              : React.createElement("div", { className: "text-center py-16 text-gray-400" }, 
                  React.createElement("p", { className: "text-lg" }, "No attendance data available")
                )
          )
        ),
        
        // Bar Chart
        React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
          React.createElement("h3", { className: "text-xl font-bold text-gray-900 mb-6" }, "Attendance Trend"),
          React.createElement("div", { style: { width: '100%', height: '350px' } },
            attendanceByMonth.length > 0 ? 
              React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
                React.createElement(BarChart, { data: attendanceByMonth, margin: { top: 20, right: 30, left: 0, bottom: 20 } },
                  React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }),
                  React.createElement(XAxis, { dataKey: "month", stroke: "#6b7280" }),
                  React.createElement(YAxis, { stroke: "#6b7280" }),
                  React.createElement(Tooltip, { contentStyle: { backgroundColor: '#fff', border: '1px solid #e5e7eb' } }),
                  React.createElement(Legend, null),
                  React.createElement(Bar, { dataKey: "present", fill: "#10b981", name: "Present", radius: [8, 8, 0, 0] }),
                  React.createElement(Bar, { dataKey: "absent", fill: "#ef4444", name: "Absent", radius: [8, 8, 0, 0] }),
                  React.createElement(Bar, { dataKey: "excused", fill: "#f59e0b", name: "Excused", radius: [8, 8, 0, 0] })
                )
              )
              : React.createElement("div", { className: "text-center py-16 text-gray-400" }, 
                  React.createElement("p", { className: "text-lg" }, "No data available for chart")
                )
          )
        )
      ),
      
      // My Information
      React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
        React.createElement("h3", { className: "text-xl font-bold text-gray-900 mb-6" }, "My Information"), 
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" }, 
          React.createElement("div", null, 
            React.createElement("p", { className: "text-gray-500 text-sm font-semibold uppercase tracking-wide" }, "Roll Number"), 
            React.createElement("p", { className: "text-gray-900 font-bold text-lg mt-2" }, student?.rollNo || 'N/A')
          ), 
          React.createElement("div", null, 
            React.createElement("p", { className: "text-gray-500 text-sm font-semibold uppercase tracking-wide" }, "Course"), 
            React.createElement("p", { className: "text-gray-900 font-bold text-lg mt-2" }, course?.name || course?.id || 'Not Enrolled')
          ), 
          React.createElement("div", null, 
            React.createElement("p", { className: "text-gray-500 text-sm font-semibold uppercase tracking-wide" }, "Batch"), 
            React.createElement("p", { className: "text-gray-900 font-bold text-lg mt-2" }, batch?.name || batch?.id || 'Not Assigned')
          )
        )
      ),
      
      // Quick Actions
      React.createElement("div", null, 
        React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Quick Actions"), 
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, 
          React.createElement("button", {
            onClick: () => onNavigate('attendance'),
            className: "flex items-center space-x-4 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 rounded-lg transition-all shadow-sm"
          }, 
            React.createElement("div", { className: "flex-shrink-0 bg-indigo-600 p-3 rounded-lg" },
              React.createElement(UserCheck, { className: "text-white", size: 24 })
            ), 
            React.createElement("div", { className: "text-left" }, 
              React.createElement("p", { className: "text-gray-900 font-semibold text-lg" }, "View My Attendance"), 
              React.createElement("p", { className: "text-gray-600 text-sm" }, "Check detailed attendance records")
            )
          )
        )
      ),
      
      // Recent Notifications
      React.createElement("div", { className: "bg-white rounded-lg p-6 shadow-sm border border-gray-200" }, 
        React.createElement("h3", { className: "text-xl font-bold text-gray-900 mb-6" }, "Recent Notifications"), 
        myNotifications.length > 0 ? 
          React.createElement("div", { className: "space-y-4" }, 
            myNotifications.slice(0, 3).map(notification => 
              React.createElement("div", {
                key: notification.id,
                className: "p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg"
              }, 
                React.createElement("div", { className: "flex items-start justify-between" }, 
                  React.createElement("div", { className: "flex-1" }, 
                    React.createElement("h4", { className: "text-gray-900 font-semibold" }, notification.title), 
                    React.createElement("p", { className: "text-gray-600 mt-1 text-sm" }, notification.message)
                  ), 
                  React.createElement("span", { className: "text-gray-400 text-xs font-medium" }, notification.createdAt)
                )
              )
            )
          )
          : React.createElement("p", { className: "text-gray-500 text-center py-8" }, "No new notifications")
      )
    )
  );
}

export default StudentDashboard;
