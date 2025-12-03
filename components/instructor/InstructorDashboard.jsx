import React from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, UserCheck, Clock } from 'lucide-react';
export function InstructorDashboard({
  appState,
  user,
  onNavigate,
  onLogout
}) {
  const sidebarItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: /*#__PURE__*/React.createElement(LayoutDashboard, {
      size: 20
    })
  }];
  const myCourses = appState.courses.filter(c => c.instructorId === user.id);
  return /*#__PURE__*/React.createElement(Layout, {
    user: user,
    currentPage: "dashboard",
    onNavigate: onNavigate,
    onLogout: onLogout,
    sidebarItems: sidebarItems
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-900"
  }, "Instructor Dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mt-1"
  }, "Welcome back, ", user.name)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "My Courses"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mt-2"
  }, myCourses.length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-indigo-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "text-indigo-600",
    size: 24
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 border border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Total Batches"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mt-2"
  }, appState.batches.filter(b => myCourses.some(c => c.id === b.courseId)).length)), /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-100 p-3 rounded-lg"
  }, /*#__PURE__*/React.createElement(UserCheck, {
    className: "text-purple-600",
    size: 24
  })))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-900 mb-4"
  }, "My Courses"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, myCourses.map(course => {
    const courseBatches = appState.batches.filter(b => b.courseId === course.id);
    const totalStudents = courseBatches.reduce((acc, batch) => {
      return acc + appState.students.filter(s => s.batchId === batch.id).length;
    }, 0);
    return /*#__PURE__*/React.createElement("div", {
      key: course.id,
      onClick: () => onNavigate('course', course.id),
      className: "bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full"
    }, course.code)), /*#__PURE__*/React.createElement("h3", {
      className: "text-gray-900 mb-2"
    }, course.name), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 mb-4"
    }, course.description), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between pt-4 border-t border-gray-200"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-gray-600"
    }, /*#__PURE__*/React.createElement(UserCheck, {
      size: 18
    }), /*#__PURE__*/React.createElement("span", null, totalStudents, " Students")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-gray-600"
    }, /*#__PURE__*/React.createElement(Clock, {
      size: 18
    }), /*#__PURE__*/React.createElement("span", null, courseBatches.length, " Batches"))));
  }), myCourses.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "col-span-3 text-center py-12 text-gray-500"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    size: 48,
    className: "mx-auto mb-4 text-gray-400"
  }), /*#__PURE__*/React.createElement("p", null, "No courses assigned yet")))));
}