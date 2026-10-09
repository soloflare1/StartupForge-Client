import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Image as ImageIcon, UserPlus, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Collaborator');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error('Password must be 6+ chars and have uppercase & lowercase letters.');
      return;
    }

    try {
      const response = await API.post('/api/auth/register', {
        name,
        email,
        password,
        role,
        image
      });

      if (response.data.success || response.status === 201) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-2 tracking-tight">Create Account</h2>
        <p className="text-sm text-center text-zinc-400 mb-6">Join StartupForge as a Founder or Collaborator</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Full Name</label>
            <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
              <User className="w-5 h-5 text-zinc-400 mr-2" />
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full bg-transparent outline-none text-sm text-white placeholder-zinc-500" 
                placeholder="Nosratee Naba"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Role Selection</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Collaborator" className="bg-zinc-900 text-white py-2">Collaborator</option>
              <option value="Founder" className="bg-zinc-900 text-white py-2">Founder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Profile Image URL (ImgBB)</label>
            <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
              <ImageIcon className="w-5 h-5 text-zinc-400 mr-2" />
              <input 
                type="text" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                className="w-full bg-transparent outline-none text-sm text-white placeholder-zinc-500" 
                placeholder="https://i.ibb.co/..."
              />
            </div>
          </div>

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
                placeholder="Min 6 chars (Upper/Lower)"
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
            <UserPlus className="w-5 h-5" /> Register
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Already have an account? <Link to="/login" className="text-blue-400 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}