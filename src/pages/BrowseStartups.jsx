import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building, Globe, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BrowseStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/startups')
      .then(res => setStartups(res.data))
      .catch(() => toast.error('Failed to load startups'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Startups</h1>
        <p className="text-gray-500">Discover approved startups building the future.</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading startups...</div>
      ) : startups.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium">No approved startups available right now.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <div key={startup._id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={startup.logo} alt={startup.startup_name} className="w-16 h-16 object-cover rounded-xl border" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{startup.startup_name}</h3>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-semibold">{startup.industry}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{startup.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span>Stage: {startup.funding_stage}</span>
                <span className="font-medium text-gray-700">{startup.founder_email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}