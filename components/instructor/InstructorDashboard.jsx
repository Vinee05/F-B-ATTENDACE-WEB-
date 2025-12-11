import React from 'react';
import { Layout } from '../Layout';
import { LayoutDashboard, BookOpen, UserCheck, Calendar } from 'lucide-react';

export function InstructorDashboard({
  appState,
  user,
  onNavigate,
  onLogout
}) {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />
    }
  ];

  const myCourses = appState.courses.filter(c => 
    c.instructorIds && Array.isArray(c.instructorIds) && c.instructorIds.includes(user.id)
  );

  const myBatches = appState.batches.filter(b => 
    myCourses.some(c => c.id === b.courseId)
  );

  const totalStudents = myBatches.reduce((acc, batch) => {
    return acc + appState.students.filter(s => s.batchId === batch.id).length;
  }, 0);

  return (
    <Layout
      user={user}
      currentPage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Instructor Dashboard</h1>
          <p className="text-slate-600">Welcome back, {user.name}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">My Courses</p>
                <h2 className="text-slate-900 text-3xl font-bold mt-2">{myCourses.length}</h2>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <BookOpen className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Batches</p>
                <h2 className="text-slate-900 text-3xl font-bold mt-2">{myBatches.length}</h2>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <Calendar className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Students</p>
                <h2 className="text-slate-900 text-3xl font-bold mt-2">{totalStudents}</h2>
              </div>
              <div className="bg-sky-100 p-4 rounded-lg">
                <UserCheck className="text-sky-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-slate-900 text-xl font-bold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map(course => {
              const courseBatches = appState.batches.filter(b => b.courseId === course.id);
              const courseStudents = courseBatches.reduce((acc, batch) => {
                return acc + appState.students.filter(s => s.batchId === batch.id).length;
              }, 0);
              return (
                  <button
                    key={course.id}
                    onClick={() => onNavigate('course', course.id)}
                    className="bg-white rounded-lg p-6 border border-slate-200 shadow hover:shadow-lg transition-shadow hover:border-blue-300 text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold mb-2">
                        {course.code}
                      </span>
                      <h3 className="text-slate-900 font-semibold group-hover:text-purple-600 transition">{course.name}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <UserCheck size={16} />
                      <span className="font-medium">{courseStudents} Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={16} />
                      <span className="font-medium">{courseBatches.length} Batches</span>
                    </div>
                  </div>
                </button>
              );
            })}
            {myCourses.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <BookOpen size={48} className="mx-auto mb-4 text-slate-400" />
                <p className="text-slate-500">No courses assigned yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}