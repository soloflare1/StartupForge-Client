import React from 'react';

export default function CollaboratorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Collaborator Dashboard</h1>
        <p className="text-gray-600">Track your applications, saved startups, and skill profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="text-gray-500 text-sm">Applied Roles</h4>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="text-gray-500 text-sm">Saved Startups</h4>
          <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="text-gray-500 text-sm">Profile Completion</h4>
          <p className="text-3xl font-bold text-green-600 mt-2">80%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold mb-4">Your Applications</h3>
        <p className="text-gray-500">You haven't applied to any opportunities yet. Browse opportunities to join exciting teams!</p>
      </div>
    </div>
  );
}