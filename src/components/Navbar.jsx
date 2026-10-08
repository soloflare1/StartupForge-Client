import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Briefcase, Users, LogIn, UserPlus, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
   const isAuthenticated = false; 

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
              <Rocket className="w-6 h-6" />
              <span>StartupForge</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition font-medium">Home</Link>
            <Link to="/startups" className="text-gray-600 hover:text-blue-600 transition font-medium flex items-center gap-1">
              <Users className="w-4 h-4" /> Startups
            </Link>
            <Link to="/opportunities" className="text-gray-600 hover:text-blue-600 transition font-medium flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> Opportunities
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium px-3 py-2">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link to="/register" className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b px-4 pt-2 pb-4 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Home</Link>
          <Link to="/startups" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Startups</Link>
          <Link to="/opportunities" onClick={() => setIsOpen(false)} className="block text-gray-600 font-medium">Opportunities</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block text-blue-600 font-medium">Login</Link>
          <Link to="/register" onClick={() => setIsOpen(false)} className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium">Register</Link>
        </div>
      )}
    </nav>
  );
}
