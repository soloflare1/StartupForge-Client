import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Bookmark, UserCheck, FileText } from 'lucide-react';

export default function CollaboratorDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollaboratorData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        const res = await axios.get(`http://localhost:5000/api/applications?email=${userInfo.email}`, { withCredentials: true });
        setApplications(res.data || []);
      } catch (err) {
        console.error('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchCollaboratorData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-blue-500" /> Collaborator Dashboard
          </h1>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">Track your applications, saved startups, and skill profile.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-6 rounded-2xl shadow-xl">
            <h4 className="text-zinc-400 text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-400" /> Applied Roles</h4>
            <p className="text-3xl font-bold text-blue-400 mt-2">{applications.length}</p>
          </div>
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-6 rounded-2xl shadow-xl">
            <h4 className="text-zinc-400 text-sm flex items-center gap-2"><Bookmark className="w-4 h-4 text-indigo-400" /> Saved Startups</h4>
            <p className="text-3xl font-bold text-indigo-400 mt-2">0</p>
          </div>
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-6 rounded-2xl shadow-xl">
            <h4 className="text-zinc-400 text-sm flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-400" /> Profile Completion</h4>
            <p className="text-3xl font-bold text-emerald-400 mt-2">80%</p>
          </div>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-semibold mb-6 text-white">Your Applications</h3>
          {loading ? (
            <p className="text-zinc-500 text-sm">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-zinc-500 text-sm">You haven't applied to any opportunities yet. Browse opportunities to join exciting teams!</p>
          ) : (
            <div className="space-y-3">
              {applications.map(app => (
                <div key={app._id} className="bg-zinc-800/50 border border-zinc-700/60 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">{app.role_title || 'Opportunity Application'}</h4>
                    <p className="text-xs text-zinc-400 mt-1">Status: {app.status}</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full">{app.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}