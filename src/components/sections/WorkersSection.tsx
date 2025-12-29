import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';

export default function WorkersSection() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafb] flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 p-8 overflow-auto`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Workers</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Workers Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-3H7a3 3 0 00-5.356 3v2h5zM7 9a5 5 0 0110 0v6a5 5 0 01-10 0V9a5 5 0 0110 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">John Smith</h3>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Department</span>
                  <span className="font-medium">Engineering</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-3H7a3 3 0 00-5.356 3v2h5zM7 9a5 5 0 0110 0v6a5 5 0 01-10 0V9a5 5 0 0110 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">UI/UX Designer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Department</span>
                  <span className="font-medium">Design</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-3H7a3 3 0 00-5.356 3v2h5zM7 9a5 5 0 0110 0v6a5 5 0 01-10 0V9a5 5 0 0110 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Mike Davis</h3>
                  <p className="text-sm text-gray-500">Backend Developer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Department</span>
                  <span className="font-medium">Engineering</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">On Leave</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-medium">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Worker Button */}
          <div className="mt-8">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              + Add New Worker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
