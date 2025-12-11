import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    onLogin(email.trim(), password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header with Atria logo */}
        <div className="text-center mb-10">
          <div className="mb-6 flex justify-center">
            <img src="/atria-logo.png" alt="Atria University" className="h-24 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">ATRIA UNIVERSITY</h1>
          <p className="text-slate-600 font-medium">Attendance Management System</p>
          <p className="text-slate-500 text-sm mt-3">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={submit} className="bg-white rounded shadow-sm p-7 border border-gray-200">
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            Sign In
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded">
          <p className="text-xs text-gray-700 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600 mb-1">Admin: admin1@example.com / admin123</p>
          <p className="text-xs text-gray-600 mb-1">Instructor: instructor1@example.com / instructor1123</p>
          <p className="text-xs text-gray-600">Student: student1@example.com / student1123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
