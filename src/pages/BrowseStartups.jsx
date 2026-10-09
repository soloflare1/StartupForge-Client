import React, { useState, useEffect } from 'react';
import API from '../../api';
import { Building, Globe, ExternalLink, Rocket } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BrowseStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get('/api/startups')
      .then(res => setStartups(res.data))
      .catch(() => toast.error('Failed to load startups'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center sm:justify-start gap-3">
            <Rocket className="w-8 h-8 text-blue-500" /> Explore Startups
          </h1>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">Discover approved startups building the future.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500 font-medium">Loading startups...</div>
        ) : startups.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 font-medium bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
            No approved startups available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <div 
                key={startup._id} 
                className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={startup.logo || 'https://via.placeholder.com/150'} 
                      alt={startup.startup_name} 
                      className="w-16 h-16 object-cover rounded-xl border border-zinc-700 bg-zinc-800" 
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">{startup.startup_name}</h3>
                      <span className="text-xs bg-blue-950/80 text-blue-400 border border-blue-800/50 px-2.5 py-1 rounded-full font-semibold inline-block mt-1">
                        {startup.industry}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300 mb-6 leading-relaxed">{startup.description}</p>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
                  <span className="bg-zinc-800/80 px-2.5 py-1 rounded-md text-zinc-300">Stage: {startup.funding_stage}</span>
                  <span className="font-medium text-zinc-300 truncate max-w-[150px]">{startup.founder_email}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}