import React, { useEffect, useState } from 'react';
import API from '../api';
import toast from 'react-hot-toast';
import { Users, FileText, DollarSign, ShieldAlert, Trash2, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ totalUsers: 0, totalStartups: 0, totalOpportunities: 0, totalRevenue: 0 });
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsRes = await API.get('/api/admin/stats');
      setStats(statsRes.data);

      const txRes = await API.get('/api/admin/transactions');
      setTransactions(txRes.data);

      const usersRes = await API.get('/api/admin/users');
      setUsers(usersRes.data);

      const startupsRes = await API.get('/api/startups');
      setStartups(startupsRes.data);
    } catch (error) {
      console.error('Failed to load admin metrics');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (email) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/api/admin/users/${email}`);
      setUsers(users.filter(u => u.email !== email));
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const handleDeleteStartup = async (id) => {
    if (!window.confirm('Are you sure you want to delete this startup post?')) return;
    try {
      await API.delete(`/api/startups/${id}`);
      setStartups(startups.filter(s => s._id !== id));
      toast.success('Startup post deleted successfully');
    } catch (err) {
      toast.error('Failed to delete startup post');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold tracking-wide">Admin Control Panel</h1>
          <p className="text-zinc-400 mt-1">Platform overview, system analytics, and live transactions tracking.</p>
        </div>

        <div className="flex gap-6 mb-8 border-b border-zinc-800">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-medium transition text-sm flex items-center gap-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <DollarSign className="w-4 h-4" /> Overview & Transactions
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`pb-3 font-medium transition text-sm flex items-center gap-2 ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <Users className="w-4 h-4" /> Manage Users ({users.length})
          </button>
          <button 
            onClick={() => setActiveTab('startups')}
            className={`pb-3 font-medium transition text-sm flex items-center gap-2 ${activeTab === 'startups' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-zinc-400 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" /> Manage Startups ({startups.length})
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
                <h4 className="text-zinc-400 text-sm font-medium">Total Users</h4>
                <p className="text-3xl font-extrabold text-white mt-2">{loading ? '...' : stats.totalUsers}</p>
              </div>
              <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
                <h4 className="text-zinc-400 text-sm font-medium">Active Startups</h4>
                <p className="text-3xl font-extrabold text-blue-400 mt-2">{loading ? '...' : stats.totalStartups}</p>
              </div>
              <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
                <h4 className="text-zinc-400 text-sm font-medium">Open Opportunities</h4>
                <p className="text-3xl font-extrabold text-indigo-400 mt-2">{loading ? '...' : stats.totalOpportunities}</p>
              </div>
              <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
                <h4 className="text-zinc-400 text-sm font-medium">Platform Revenue</h4>
                <p className="text-3xl font-extrabold text-emerald-400 mt-2">${loading ? '...' : stats.totalRevenue}</p>
              </div>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-800 p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">Recent Transactions</h3>
              {transactions.length === 0 ? (
                <p className="text-zinc-500">No transactions recorded yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                        <th className="py-3 px-4">User Email</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Transaction ID</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-sm">
                      {transactions.map((tx) => (
                        <tr key={tx._id} className="hover:bg-zinc-800/50">
                          <td className="py-3 px-4 text-zinc-300">{tx.user_email}</td>
                          <td className="py-3 px-4 font-semibold text-emerald-400">${tx.amount}</td>
                          <td className="py-3 px-4 text-zinc-400 font-mono text-xs">{tx.transaction_id}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-emerald-950 text-emerald-400 rounded text-xs border border-emerald-800">
                              {tx.payment_status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-zinc-400">{new Date(tx.paid_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Manage Platform Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-sm">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-zinc-800/50">
                      <td className="py-3 px-4 font-medium text-white">{u.name}</td>
                      <td className="py-3 px-4 text-zinc-300">{u.email}</td>
                      <td className="py-3 px-4"><span className="px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full text-xs">{u.role}</span></td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => handleDeleteUser(u.email)}
                          className="px-3 py-1 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 rounded text-xs transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'startups' && (
          <div className="bg-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Manage Startup Posts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                    <th className="py-3 px-4">Startup Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Founder Email</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-sm">
                  {startups.map((s) => (
                    <tr key={s._id} className="hover:bg-zinc-800/50">
                      <td className="py-3 px-4 font-medium text-white">{s.name}</td>
                      <td className="py-3 px-4 text-zinc-300">{s.category}</td>
                      <td className="py-3 px-4 text-zinc-400">{s.founder_email}</td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => handleDeleteStartup(s._id)}
                          className="px-3 py-1 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 rounded text-xs transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}