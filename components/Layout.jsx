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
    className: "flex h-screen"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "w-60 bg-slate-900 text-white shadow-md flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-5 border-b border-slate-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/atria-logo.png",
    alt: "Atria Logo",
    className: "h-10 w-auto"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-white text-sm"
  }, "ATRIA")), /*#__PURE__*/React.createElement("p", {
    className: "text-amber-400 text-xs font-medium"
  }, "Attendance System")), /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-3 border-b border-slate-700"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 font-medium text-sm"
  }, user?.name || 'Guest')), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 space-y-1 p-3 overflow-y-auto"
  }, sidebarItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => onNavigate(item.id),
    className: `w-full text-left px-3 py-2.5 rounded flex items-center gap-3 text-sm transition ${currentPage === item.id ? 'bg-amber-500 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'}`
  }, item.icon, /*#__PURE__*/React.createElement("span", null, item.label)))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-700 p-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "w-full px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition font-medium"
  }, "Logout"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 overflow-auto bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8"
  }, children))));
};
export default Layout;