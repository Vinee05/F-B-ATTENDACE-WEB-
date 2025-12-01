import React from 'react';
import { Layout } from '../Layout';
import { AppState, User } from '../../App';
import { LayoutDashboard, BookOpen, UserCheck, FileText, Clock } from 'lucide-react';

interface InstructorDashboardProps {
  appState: AppState;
  user: User;
  onNavigate: (page: string, courseId?: string) => void;
  onLogout: () => void;
}

export function InstructorDashboard({ appState, user, onNavigate, onLogout }: InstructorDashboardProps) {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'leave', label: 'Apply Leave', icon: <FileText size={20} /> },
  ];

  const myCourses = appState.courses.filter(c => c.instructorId === user.id);
  const myLeaves = appState.leaveRequests.filter(l => l.userId === user.id);
  const pendingLeaves = myLeaves.filter(l => l.status === 'pending').length;

  return (
    <Layout
      user={user}
      currentPage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-gray-900">Instructor Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">My Courses</p>
                <h2 className="text-gray-900 mt-2">{myCourses.length}</h2>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BookOpen className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Batches</p>
                <h2 className="text-gray-900 mt-2">
                  {appState.batches.filter(b => 
                    myCourses.some(c => c.id === b.courseId)
                  ).length}
                </h2>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <UserCheck className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pending Leave</p>
                <h2 className="text-gray-900 mt-2">{pendingLeaves}</h2>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FileText className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-gray-900 mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course) => {
              const courseBatches = appState.batches.filter(b => b.courseId === course.id);
              const totalStudents = courseBatches.reduce((acc, batch) => {
                return acc + appState.students.filter(s => s.batchId === batch.id).length;
              }, 0);

              return (
                <div
                  key={course.id}
                  onClick={() => onNavigate('course', course.id)}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                      {course.code}
                    </span>
                  </div>
                  
                  <h3 className="text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <UserCheck size={18} />
                      <span>{totalStudents} Students</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={18} />
                      <span>{courseBatches.length} Batches</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {myCourses.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-500">
                <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                <p>No courses assigned yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">My Leave Requests</h3>
          {myLeaves.length > 0 ? (
            <div className="space-y-3">
              {myLeaves.slice(0, 3).map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">{leave.startDate} to {leave.endDate}</p>
                    <p className="text-gray-600">{leave.reason}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full ${
                    leave.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No leave requests</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
