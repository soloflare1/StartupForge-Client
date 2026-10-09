import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Briefcase, Users, LogIn, UserPlus, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const checkUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('authChange', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('authChange', checkUser);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userInfo');
      setUser(null);
      window.dispatchEvent(new Event('authChange'));
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'Admin') return '/admin-dashboard';
    if (user.role === 'Founder') return '/founder-dashboard';
    return '/collaborator-dashboard';
  };

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-400">
              <Rocket className="w-6 h-6" />
              <span>StartupForge</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition font-medium">Home</Link>
            <Link to="/startups" className="text-gray-300 hover:text-blue-400 transition font-medium flex items-center gap-1">
              <Users className="w-4 h-4" /> Startups
            </Link>
            <Link to="/opportunities" className="text-gray-300 hover:text-blue-400 transition font-medium flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> Opportunities
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to={getDashboardPath()} className="flex items-center gap-1 text-gray-300 hover:text-blue-400 font-medium">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard ({user.role})
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-950/80 text-red-400 border border-red-800 px-3 py-2 rounded-lg hover:bg-red-900 transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="flex items-center gap-1 text-gray-300 hover:text-blue-400 font-medium px-3 py-2">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link to="/register" className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 pt-2 pb-4 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium">Home</Link>
          <Link to="/startups" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium">Startups</Link>
          <Link to="/opportunities" onClick={() => setIsOpen(false)} className="block text-gray-300 font-medium">Opportunities</Link>
          {user ? (
            <>
              <Link to={getDashboardPath()} onClick={() => setIsOpen(false)} className="block text-blue-400 font-medium">Dashboard ({user.role})</Link>
              <button onClick={() => { setIsOpen(false); handleLogout(); }} className="block w-full text-left text-red-400 font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-blue-400 font-medium">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}