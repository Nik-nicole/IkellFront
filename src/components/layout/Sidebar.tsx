import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useUser } from '../../context/UserContext';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: 'Home',
    path: '/home',
  },
  
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    label: 'Companies',
    path: '/companies',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
    label: 'Projects',
    path: '/projects',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-3H7a3 3 0 00-5.356 3v2h5zM7 9a5 5 0 0110 0v6a5 5 0 01-10 0V9a5 5 0 0110 0z"
        />
      </svg>
    ),
    label: 'Workers',
    path: '/workers',
  },
  
];

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (value: boolean) => void;
}

export default function Sidebar({
  isCollapsed: externalIsCollapsed,
  setIsCollapsed: externalSetIsCollapsed,
}: SidebarProps) {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const isCollapsed =
    externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;
  const setIsCollapsed = externalSetIsCollapsed || setInternalIsCollapsed;
  const { userData } = useUser();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg z-50">
      <div
        className={`
          flex flex-col h-full
          transition-all duration-200 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className={`border-b border-gray-200 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center gap-3 w-full
              ${isCollapsed ? '' : 'border border-gray-200 rounded-xl shadow-sm p-1.5'}
            `}
          >
            <img
              src="/logo pagina.png"
              alt="Logo"
              className={`object-contain shrink-0 ${isCollapsed ? 'w-12 h-12' : 'w-10 h-10'}`}
            />

            <span
              className={`
                text-sm text-gray-600 whitespace-nowrap
                transition-opacity duration-200
                ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              `}
            >
              Free Plan
            </span>
          </button>
        </div>

        {/* User Profile Section */}
        <div className={` border-gray-200 ${isCollapsed ? 'p-2' : 'p-4 '}`}>
          {/* User avatar for collapsed sidebar */}
          <div className={`flex justify-center ${isCollapsed ? 'opacity-100 mt-2' : 'opacity-0 pointer-events-none absolute'}`}>
            <img 
              src={userData.photo}
              alt="User Avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          
          {/* Full user profile for expanded sidebar */}
          <div className={`border border-gray-200 rounded-xl shadow-sm p-3 ${isCollapsed ? 'hidden ' : 'opacity-100'}`}>
            <Link to="/user-section" className="flex-1">
                <div className="flex items-center gap-3">
                  <img 
                    src={userData.photo}
                    alt="User Avatar" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{userData.name}</h4>
                    <p className="text-xs text-gray-500">{userData.role}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center h-10 rounded-lg
                  transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                  ${isCollapsed ? 'w-full pl-5' : 'px-3'}
                `}
              >
                {/* Icon */}
                <span className="flex items-center justify-center w-5 h-5 shrink-0">
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className={`
                    ml-3 text-sm
                    transition-opacity duration-200
                    ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                  `}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Log out button */}
        <div className={`px-6 py-3 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Button 
            variant="secondary"
            className="flex items-center gap-3 w-full text-xs font-semibold uppercase tracking-wider text-red-800 border border-red-800 rounded-xl shadow-sm p-3 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log out
          </Button>
        </div>

        {/* Log out icon for collapsed sidebar */}
        <div className={`px-1 pb-4 transition-opacity duration-200 ${isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button className="w-full h-10 flex items-center justify-center text-red-800 hover:bg-red-50 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
