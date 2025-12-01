import React from 'react';
import type { User } from '../App';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface LayoutProps {
  user: User | null;
  currentPage?: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  sidebarItems?: SidebarItem[];
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ user, currentPage, onNavigate, onLogout, sidebarItems = [], children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-sm">
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Attendance App</h2>
            <p className="text-gray-500 text-xs">{user?.name || 'Guest'}</p>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 ${currentPage === item.id ? 'bg-gray-100 font-medium' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6">
            <button onClick={onLogout} className="w-full text-left text-red-600 hover:underline">Logout</button>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
