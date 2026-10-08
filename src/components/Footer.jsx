import React from 'react';
import { Rocket, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <Rocket className="w-6 h-6 text-blue-500" />
            <span>StartupForge</span>
          </div>
          <p className="text-sm text-gray-400">
            Connecting visionary startup founders with talented collaborators, developers, and designers worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/startups" className="hover:text-blue-400 transition">Browse Startups</Link></li>
            <li><Link to="/opportunities" className="hover:text-blue-400 transition">Explore Opportunities</Link></li>
            <li><Link to="/register" className="hover:text-blue-400 transition">Join as Founder</Link></li>
            <li><Link to="/register" className="hover:text-blue-400 transition">Join as Collaborator</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact Information</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> support@startupforge.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> +1 (555) 234-5678</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> Silicon Valley, CA, USA</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Social Links</h3>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition text-white">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition text-white">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition text-white">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StartupForge Platform. All rights reserved.
      </div>
    </footer>
  );
}