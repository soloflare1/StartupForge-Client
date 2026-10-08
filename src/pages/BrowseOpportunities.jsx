import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Briefcase, Building, Calendar, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BrowseOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState('');
  const [workType, setWorkType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/opportunities`, {
        params: { page, limit: 6, search, work_type: workType }
      });
      setOpportunities(res.data.opportunities);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error('Failed to fetch opportunities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [page, search, workType]);

  const handleApply = (oppId) => {
    toast.success('Redirecting to application form...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Opportunities</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search role or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
            />
          </div>

          <select 
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl outline-none bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Work Types</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading opportunities...</div>
      ) : opportunities.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium">No opportunities found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <div key={opp._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{opp.role_title}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-semibold">{opp.work_type}</span>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <Building className="w-4 h-4" /> {opp.startup_id?.startup_name || 'Startup Partner'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {opp.required_skills.map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {new Date(opp.deadline).toLocaleDateString()}
                </span>
                <button 
                  onClick={() => handleApply(opp._id)}
                  className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
                >
                  <Send className="w-4 h-4" /> Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button 
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          className="p-2 border rounded-xl disabled:opacity-50 hover:bg-gray-50 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-gray-700">Page {page} of {totalPages || 1}</span>
        <button 
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(p => p + 1)}
          className="p-2 border rounded-xl disabled:opacity-50 hover:bg-gray-50 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}