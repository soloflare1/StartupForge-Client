import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';
import { Plus, Briefcase, Users, FileText, CreditCard } from 'lucide-react';

export default function FounderDashboard() {
  const [activeTab, setActiveTab] = useState('startups');
  const [startups, setStartups] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showPostModal, setShowPostModal] = useState(false);
  const [roleTitle, setRoleTitle] = useState('');
  const [workType, setWorkType] = useState('Remote');
  const [commitmentLevel, setCommitmentLevel] = useState('Full-time');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedStartupId, setSelectedStartupId] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
      const email = userInfo.email;

      const startupsRes = await API.get(`/api/startups/founder/${email}`);
      setStartups(startupsRes.data);
      if (startupsRes.data.length > 0) {
        setSelectedStartupId(startupsRes.data[0]._id);
      }

      const oppsRes = await API.get('/api/opportunities');
      setOpportunities(oppsRes.data.opportunities || []);

      const appsRes = await API.get('/api/applications');
      setApplicants(appsRes.data || []);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get('session_id');

    if (sessionId) {
      const recordPayment = async () => {
        try {
          const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
          await API.post('/api/save-payment', {
            user_email: userInfo.email,
            amount: 49,
            transaction_id: sessionId
          });
          
          toast.success('Payment recorded successfully!');
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {
          console.error('Failed to record payment');
        }
      };
      recordPayment();
    }

    fetchData();
  }, []);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await API.patch(`/api/applications/${appId}/status`, {
        status: newStatus
      });
      toast.success(`Application status updated to ${newStatus}`);
      fetchData();
    } catch (err) {
      toast.error('Failed to update application status');
    }
  };

  const handlePostOpportunity = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
      
      await API.post('/api/opportunities', {
        startup_id: selectedStartupId,
        role_title: roleTitle,
        work_type: workType,
        commitment_level: commitmentLevel,
        required_skills: skillsArray,
        deadline
      });

      toast.success('Opportunity posted successfully!');
      setShowPostModal(false);
      setRoleTitle('');
      setRequiredSkills('');
      setDeadline('');
      fetchData();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Failed to post opportunity';
      if (errorMsg.includes('limit') || err.response?.status === 403) {
        toast.error('Opportunity limit reached. Redirecting to payment...');
        handleStripePayment();
      } else {
        toast.error(errorMsg);
      }
    }
  };

  const handleStripePayment = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await API.post('/api/create-checkout-session', {
        email: userInfo.email
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Could not initiate payment session');
      }
    } catch (err) {
      toast.error('Stripe payment integration error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-500" /> Founder Dashboard
            </h1>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base">Manage your startups, hire talent, and review applications.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleStripePayment}
              className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 text-emerald-400 px-4 py-2.5 rounded-xl hover:bg-zinc-800 transition text-sm font-medium shadow-lg"
            >
              <CreditCard className="w-4 h-4" /> Upgrade Plan
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-500 transition text-sm font-medium shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" /> Post New Opportunity
            </button>
          </div>
        </div>

        <div className="flex gap-6 mb-8 border-b border-zinc-800">
          <button 
            onClick={() => setActiveTab('startups')}
            className={`pb-3 font-medium transition text-sm flex items-center gap-2 ${activeTab === 'startups' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <Users className="w-4 h-4" /> My Startups
          </button>
          <button 
            onClick={() => setActiveTab('opportunities')}
            className={`pb-3 font-medium transition text-sm flex items-center gap-2 ${activeTab === 'opportunities' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <Briefcase className="w-4 h-4" /> Active Opportunities
          </button>
          <button 
            onClick={() => setActiveTab('applicants')}
            className={`pb-3 font-medium transition text-sm flex items-center gap-2 ${activeTab === 'applicants' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" /> Applicants
          </button>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl">
          {loading ? (
            <div className="text-center py-12 text-zinc-500">Loading data...</div>
          ) : (
            <>
              {activeTab === 'startups' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Your Registered Startups</h3>
                  {startups.length === 0 ? (
                    <p className="text-zinc-500 text-sm">No startups added yet. Create one to showcase your vision!</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {startups.map(s => (
                        <div key={s._id} className="bg-zinc-800/50 border border-zinc-700/60 p-4 rounded-xl flex items-center gap-4">
                          <img src={s.logo || 'https://via.placeholder.com/150'} alt="" className="w-12 h-12 rounded-lg object-cover bg-zinc-700" />
                          <div>
                            <h4 className="font-bold text-white">{s.startup_name}</h4>
                            <p className="text-xs text-zinc-400">{s.industry} | {s.funding_stage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'opportunities' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Posted Opportunities</h3>
                  {opportunities.length === 0 ? (
                    <p className="text-zinc-500 text-sm">No active job openings or roles posted.</p>
                  ) : (
                    <div className="space-y-3">
                      {opportunities.map(opp => (
                        <div key={opp._id} className="bg-zinc-800/50 border border-zinc-700/60 p-4 rounded-xl flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-white">{opp.role_title}</h4>
                            <p className="text-xs text-zinc-400 mt-1">{opp.work_type} | Deadline: {new Date(opp.deadline).toLocaleDateString()}</p>
                          </div>
                          <span className="text-xs bg-blue-950/80 text-blue-400 border border-blue-800 px-3 py-1 rounded-full">Active</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'applicants' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Recent Applications</h3>
                  {applicants.length === 0 ? (
                    <p className="text-zinc-500 text-sm">No candidate applications received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {applicants.map(app => (
                        <div key={app._id} className="bg-zinc-800/50 border border-zinc-700/60 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <p className="font-medium text-white text-sm">Applicant: {app.applicant_email}</p>
                            <p className="text-xs text-zinc-400 mt-1">Motivation: {app.motivation}</p>
                            <a href={app.portfolio_link} target="_blank" rel="noreferrer" className="text-xs text-blue-400 underline mt-1 inline-block">View Portfolio</a>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full">{app.status}</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleStatusUpdate(app._id, 'Accepted')}
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition font-medium"
                              >
                                Accept
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition font-medium"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {showPostModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl text-white max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-1">Post New Opportunity</h2>
              <p className="text-sm text-zinc-400 mb-6">Create a job or project opening for talent.</p>

              <form onSubmit={handlePostOpportunity} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Select Startup</label>
                  <select 
                    value={selectedStartupId}
                    onChange={(e) => setSelectedStartupId(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">Select your startup</option>
                    {startups && startups.length > 0 ? (
                      startups.map(s => (
                        <option key={s._id} value={s._id} className="bg-zinc-900 text-white">{s.startup_name}</option>
                      ))
                    ) : (
                      <option value="" disabled className="bg-zinc-900 text-zinc-500">No startups found</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Role Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Senior Full Stack Engineer"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Work Type</label>
                  <select 
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Remote" className="bg-zinc-900 text-white">Remote</option>
                    <option value="On-site" className="bg-zinc-900 text-white">On-site</option>
                    <option value="Hybrid" className="bg-zinc-900 text-white">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Commitment Level</label>
                  <select 
                    value={commitmentLevel}
                    onChange={(e) => setCommitmentLevel(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time" className="bg-zinc-900 text-white">Full-time</option>
                    <option value="Part-time" className="bg-zinc-900 text-white">Part-time</option>
                    <option value="Contract" className="bg-zinc-900 text-white">Contract</option>
                    <option value="Internship" className="bg-zinc-900 text-white">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Required Skills (Comma separated)</label>
                  <input 
                    type="text"
                    required
                    placeholder="React, Node.js, MongoDB"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Deadline</label>
                  <input 
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="w-1/2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="w-1/2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}