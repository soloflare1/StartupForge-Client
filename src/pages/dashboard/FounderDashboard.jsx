import React, { useState } from 'react';

export default function FounderDashboard() {
  const [activeTab, setActiveTab] = useState('startups');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Founder Dashboard</h1>
          <p className="text-gray-600">Manage your startups, hire talent, and review applications.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Post New Opportunity
        </button>
      </div>

   
      <div className="flex gap-4 mb-6 border-b">
        <button 
          onClick={() => setActiveTab('startups')}
          className={`pb-2 font-medium ${activeTab === 'startups' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          My Startups
        </button>
        <button 
          onClick={() => setActiveTab('opportunities')}
          className={`pb-2 font-medium ${activeTab === 'opportunities' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Active Opportunities
        </button>
        <button 
          onClick={() => setActiveTab('applicants')}
          className={`pb-2 font-medium ${activeTab === 'applicants' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Applicants
        </button>
      </div>

     
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {activeTab === 'startups' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Registered Startups</h3>
            <p className="text-gray-500">No startups added yet. Create one to showcase your vision!</p>
          </div>
        )}
        {activeTab === 'opportunities' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Posted Opportunities</h3>
            <p className="text-gray-500">No active job openings or roles posted.</p>
          </div>
        )}
        {activeTab === 'applicants' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
            <p className="text-gray-500">No candidate applications received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}