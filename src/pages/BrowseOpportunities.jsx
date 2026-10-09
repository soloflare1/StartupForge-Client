import React, { useState, useEffect } from 'react';
import API from '../api';
import { Search, Briefcase, Building, Calendar, ChevronLeft, ChevronRight, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BrowseOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState('');
  const [workType, setWorkType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [motivation, setMotivation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/opportunities', {
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

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
      const applicant_email = userInfo.email;

      if (!applicant_email) {
        toast.error('Please log in to apply');
        return;
      }

      await API.post('/api/applications', {
        opportunity_id: selectedOpp._id,
        applicant_email,
        portfolio_link: portfolioLink,
        motivation
      });

      toast.success('Application submitted successfully!');
      setSelectedOpp(null);
      setPortfolioLink('');
      setMotivation('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-500" /> Explore Opportunities
            </h1>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base">Find elite startup roles and project opportunities.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-zinc-400" />
              <input 
                type="text"
                placeholder="Search role or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
              />
            </div>

            <select 
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-zinc-900 text-white">All Work Types</option>
              <option value="Remote" className="bg-zinc-900 text-white">Remote</option>
              <option value="On-site" className="bg-zinc-900 text-white">On-site</option>
              <option value="Hybrid" className="bg-zinc-900 text-white">Hybrid</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500 font-medium">Loading opportunities...</div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 font-medium bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
            No opportunities found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div key={opp._id} className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">{opp.role_title}</h3>
                    <span className="text-xs bg-blue-950/80 text-blue-400 border border-blue-800/50 px-3 py-1 rounded-full font-semibold whitespace-nowrap">{opp.work_type}</span>
                  </div>
                  <p className="text-sm text-zinc-400 flex items-center gap-1.5 mb-4">
                    <Building className="w-4 h-4 text-blue-500" /> {opp.startup_id?.startup_name || 'Startup Partner'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opp.required_skills.map((skill, index) => (
                      <span key={index} className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700/60 px-2.5 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center mt-4">
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-zinc-500" /> {new Date(opp.deadline).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => setSelectedOpp(opp)}
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
                  >
                    <Send className="w-4 h-4" /> Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Application Modal */}
        {selectedOpp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl text-white">
              <button 
                onClick={() => setSelectedOpp(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-xl font-bold mb-1">Apply for {selectedOpp.role_title}</h2>
              <p className="text-sm text-zinc-400 mb-6">Submit your details to the startup team.</p>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Portfolio Link / Resume</label>
                  <input 
                    type="url"
                    required
                    placeholder="https://yourportfolio.com"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Why should we hire you?</label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="Briefly describe your experience and motivation..."
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-12">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl disabled:opacity-30 hover:bg-zinc-800 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-zinc-400">Page {page} of {totalPages || 1}</span>
          <button 
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(p => p + 1)}
            className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl disabled:opacity-30 hover:bg-zinc-800 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}