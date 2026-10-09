import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/jwt', { email, password }, { withCredentials: true });
      toast.success('Logged in successfully');
      
      const userRole = response.data.role || response.data.user?.role || 'Collaborator';
      
      const userData = {
        name: response.data.user?.name || 'User',
        email: response.data.user?.email || email,
        role: userRole
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('authChange'));
      
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
    <div className="min-h-[85vh] bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-sm text-center text-zinc-400 mb-6">Sign in to your StartupForge account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
            <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-zinc-400 mr-2" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full bg-transparent outline-none text-sm text-white placeholder-zinc-500" 
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-zinc-400 mr-2" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full bg-transparent outline-none text-sm text-white placeholder-zinc-500" 
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-white focus:outline-none ml-2"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-sm mt-2"
          >
            <LogIn className="w-5 h-5" /> Sign In
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Don't have an account? <Link to="/register" className="text-blue-400 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}