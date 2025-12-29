import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafb] flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 p-8 overflow-auto`}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative h-96 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Dashboard</h1>
                <p className="text-xl text-gray-300">Welcome to your control panel</p>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-gray-600">+12% from last month</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-gray-900">$45,678</p>
              <p className="text-sm text-gray-600">+8% from last month</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Projects</h3>
              <p className="text-3xl font-bold text-gray-900">42</p>
              <p className="text-sm text-gray-600">+5 from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
