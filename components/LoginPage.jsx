import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
export const LoginPage = ({
  onLogin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const submit = e => {
    e.preventDefault();
    onLogin(email.trim(), password);
  };
  const demoAccounts = [{
    role: 'Admin',
    email: 'admin@example.com'
  }, {
    role: 'Instructor',
    email: 'sarah@example.com'
  }, {
    role: 'Student',
    email: 'alice@example.com'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-3xl shadow-lg"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "text-white",
    size: 40
  }))), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-gray-900 mb-2"
  }, "Attendance Management"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600"
  }, "Sign in to your account")), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: "bg-white rounded-2xl shadow-xl p-8 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-900 mb-2"
  }, "Email Address"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400",
    size: 20
  }), /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "your.email@example.com",
    className: "w-full border-2 border-gray-200 rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors",
    type: "email",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-900 mb-2"
  }, "Password"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Lock, {
    className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400",
    size: 20
  }), /*#__PURE__*/React.createElement("input", {
    value: password,
    onChange: e => setPassword(e.target.value),
    placeholder: "Enter your password",
    className: "w-full border-2 border-gray-200 rounded-lg pl-12 pr-12 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors",
    type: showPassword ? 'text' : 'password',
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPassword(!showPassword),
    className: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
  }, showPassword ? /*#__PURE__*/React.createElement(EyeOff, {
    size: 20
  }) : /*#__PURE__*/React.createElement(Eye, {
    size: 20
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-8"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center gap-2 cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: rememberMe,
    onChange: e => setRememberMe(e.target.checked),
    className: "w-4 h-4 rounded border-gray-300 accent-blue-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-700"
  }, "Remember me")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-sm font-medium text-blue-600 hover:text-blue-700"
  }, "Forgot Password?")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl active:scale-95 transform"
  }, "Sign In")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl shadow-xl p-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-gray-900 mb-4"
  }, "Demo Accounts:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, demoAccounts.map((account, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-1 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-gray-900"
  }, account.role, ": ", /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-blue-600"
  }, account.email)))))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-4"
  }, "Use any demo account email with any password to test different roles."))));
};
export default LoginPage;