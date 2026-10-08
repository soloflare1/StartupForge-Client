import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Eta add korun
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import BrowseStartups from './pages/BrowseStartups';
import BrowseOpportunities from './pages/BrowseOpportunities';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import AdminDashboard from './pages/dashboard/AdminDashboard';
import FounderDashboard from './pages/dashboard/FounderDashboard';
import CollaboratorDashboard from './pages/dashboard/CollaboratorDashboard';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} /> {/* Eta add korun */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/startups" element={<BrowseStartups />} />
            <Route path="/opportunities" element={<BrowseOpportunities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Role-based Dashboards */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/founder-dashboard" 
              element={
                <ProtectedRoute allowedRole="Founder">
                  <FounderDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/collaborator-dashboard" 
              element={
                <ProtectedRoute allowedRole="Collaborator">
                  <CollaboratorDashboard />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;