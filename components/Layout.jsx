import React from 'react';
export const Layout = ({
  user,
  currentPage,
  onNavigate,
  onLogout,
  sidebarItems = [],
  children
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gray-100 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex h-screen"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "w-64 bg-gray-900 text-white shadow-lg flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-8 border-b border-gray-700"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-white"
  }, "Attendance"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-xs mt-1"
  }, "Management System")), /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-4 border-b border-gray-700"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-300 font-medium"
  }, user?.name || 'Guest')), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 space-y-2 p-4 overflow-y-auto"
  }, sidebarItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => onNavigate(item.id),
    className: `w-full text-left px-4 py-3 rounded-md flex items-center gap-3 transition ${currentPage === item.id ? 'bg-blue-600 text-white font-medium' : 'text-gray-300 hover:bg-gray-800'}`
  }, item.icon, /*#__PURE__*/React.createElement("span", null, item.label)))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-700 p-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
  }, "Logout"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8"
  }, children))));
};
export default Layout;