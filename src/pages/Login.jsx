import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/jwt', { email, password }, { withCredentials: true });
      toast.success('Logged in successfully');
      
      const userRole = response.data.role || response.data.user?.role || 'Collaborator';
    
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      
      if (userRole === 'Admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'Founder') {
        navigate('/founder-dashboard');
      } else {
        navigate('/collaborator-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign in to your StartupForge account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full outline-none text-sm" 
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full outline-none text-sm" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
          >
            <LogIn className="w-5 h-5" /> Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}