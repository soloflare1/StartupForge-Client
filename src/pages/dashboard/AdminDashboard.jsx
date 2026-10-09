import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStartups: 0, totalOpportunities: 0, totalRevenue: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsRes = await axios.get('http://localhost:5000/api/admin/stats', { withCredentials: true });
      setStats(statsRes.data);

      const txRes = await axios.get('http://localhost:5000/api/admin/transactions', { withCredentials: true });
      setTransactions(txRes.data);
    } catch (error) {
      toast.error('Failed to load admin metrics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-bold tracking-wide">Admin Control Panel</h1>
          <p className="text-gray-400 mt-1">Platform overview, system analytics, and live transactions tracking.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
            <h4 className="text-gray-400 text-sm font-medium">Total Users</h4>
            <p className="text-3xl font-extrabold text-white mt-2">{loading ? '...' : stats.totalUsers}</p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
            <h4 className="text-gray-400 text-sm font-medium">Active Startups</h4>
            <p className="text-3xl font-extrabold text-blue-400 mt-2">{loading ? '...' : stats.totalStartups}</p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
            <h4 className="text-gray-400 text-sm font-medium">Open Opportunities</h4>
            <p className="text-3xl font-extrabold text-indigo-400 mt-2">{loading ? '...' : stats.totalOpportunities}</p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-800 shadow-lg">
            <h4 className="text-gray-400 text-sm font-medium">Platform Revenue</h4>
            <p className="text-3xl font-extrabold text-emerald-400 mt-2">${loading ? '...' : stats.totalRevenue}</p>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div className="bg-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-800 p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-gray-400 text-sm">
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
                      <td className="py-3 px-4 text-gray-300">{tx.user_email}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-400">${tx.amount}</td>
                      <td className="py-3 px-4 text-gray-400 font-mono text-xs">{tx.transaction_id}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-emerald-950 text-emerald-400 rounded text-xs border border-emerald-800">
                          {tx.payment_status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{new Date(tx.paid_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}