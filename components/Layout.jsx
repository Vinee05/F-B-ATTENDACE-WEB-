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
    className: "min-h-screen bg-gray-50 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "w-64 bg-white border-r border-gray-200 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-semibold"
  }, "Attendance App"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-xs"
  }, user?.name || 'Guest')), /*#__PURE__*/React.createElement("nav", {
    className: "space-y-1"
  }, sidebarItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => onNavigate(item.id),
    className: `w-full text-left px-3 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 ${currentPage === item.id ? 'bg-gray-100 font-medium' : ''}`
  }, item.icon, /*#__PURE__*/React.createElement("span", null, item.label)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "w-full text-left text-red-600 hover:underline"
  }, "Logout"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 p-6"
  }, children)));
};
export default Layout;