import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Image as ImageIcon, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Collaborator');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error('Password must be 6+ chars and have uppercase & lowercase letters.');
      return;
    }
    toast.success('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white border rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Join StartupForge as a Founder or Collaborator</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full outline-none text-sm" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Selection</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full border rounded-xl px-3 py-2 text-sm outline-none bg-white"
            >
              <option value="Collaborator">Collaborator</option>
              <option value="Founder">Founder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL (ImgBB)</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <ImageIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                className="w-full outline-none text-sm" 
                placeholder="https://i.ibb.co/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center border rounded-xl px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="email" 
                value= {email} 
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
                placeholder="Min 6 chars (Upper/Lower)"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
          >
            <UserPlus className="w-5 h-5" /> Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}