import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full text-red-500 mb-4">
        <AlertTriangle className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 max-w-md mb-6">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium shadow-md"
      >
        <Home className="w-5 h-5" /> Back Home
      </Link>
    </div>
  );
}