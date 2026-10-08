import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
        <p className="text-gray-600">Platform overview, user management, and system moderation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="text-gray-500 text-sm">Total Users</h4>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="text-gray-500 text-sm">Active Startups</h4>
          <p className="text-3xl font-bold text-blue-600 mt-2">512</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="text-gray-500 text-sm">Open Opportunities</h4>
          <p className="text-3xl font-bold text-indigo-600 mt-2">320</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="text-gray-500 text-sm">Platform Revenue</h4>
          <p className="text-3xl font-bold text-green-600 mt-2">$4,250</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold mb-4">Manage Platform Startups & Users</h3>
        <p className="text-gray-500">System list loading...</p>
      </div>
    </div>
  );
}