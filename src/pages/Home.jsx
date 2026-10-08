import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Briefcase, Users, CheckCircle2, Award, TrendingUp, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [startups, setStartups] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
   axios.get('http://localhost:5000/api/startups')
      .then(res => setStartups(res.data.slice(0, 3)))
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/api/opportunities?limit=3')
      .then(res => setOpportunities(res.data.opportunities || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-16 pb-16">
     
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-24 px-4 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-400/30">
            <Sparkles className="w-4 h-4" /> The Ultimate Startup Team Builder Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Build Your Dream Startup Team Today
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            StartupForge bridges visionary founders with elite developers, designers, and marketers to bring revolutionary ideas to life.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/opportunities" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium transition flex items-center gap-2 shadow-lg">
              Explore Opportunities <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/register" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-medium transition">
              Get Started
            </Link>
          </div>
        </div>
      </motion.section>

  
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Startups</h2>
            <p className="text-sm text-gray-500">Discover innovative startups looking for top-tier talent.</p>
          </div>
          <Link to="/startups" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startups.length > 0 ? startups.map(startup => (
            <div key={startup._id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <img src={startup.logo} alt={startup.startup_name} className="w-14 h-14 object-cover rounded-xl mb-4 border" />
              <h3 className="text-lg font-bold text-gray-900">{startup.startup_name}</h3>
              <p className="text-xs font-semibold text-blue-600 mb-2">{startup.industry}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{startup.description}</p>
              <div className="text-xs text-gray-500 flex justify-between pt-3 border-t">
                <span>Funding: {startup.funding_stage}</span>
                <span>Founder: {startup.founder_email}</span>
              </div>
            </div>
          )) : (
            <div className="col-span-3 text-center py-10 text-gray-400">Loading featured startups...</div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Opportunities</h2>
            <p className="text-sm text-gray-500">Jump right into high-impact roles.</p>
          </div>
          <Link to="/opportunities" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
            Browse All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.length > 0 ? opportunities.map(opp => (
            <div key={opp._id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{opp.role_title}</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">{opp.work_type}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Commitment: {opp.commitment_level}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.required_skills.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Link to="/opportunities" className="w-full text-center bg-gray-900 hover:bg-blue-600 text-white py-2 rounded-xl text-sm font-medium transition">
                Apply Now
              </Link>
            </div>
          )) : (
            <div className="col-span-3 text-center py-10 text-gray-400">Loading opportunities...</div>
          )}
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-blue-600 mb-1">500+</p>
            <p className="text-sm text-gray-600 font-medium">Active Startups</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600 mb-1">1,200+</p>
            <p className="text-sm text-gray-600 font-medium">Open Opportunities</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600 mb-1">98%</p>
            <p className="text-sm text-gray-600 font-medium">Successful Matches</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600 mb-1">$45M</p>
            <p className="text-sm text-gray-600 font-medium">Raised Capital</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose StartupForge</h2>
          <p className="text-gray-600">We provide the most robust ecosystem for early-stage startup collaboration and recruitment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Talent</h3>
            <p className="text-gray-600 text-sm">Connect with vetted developers, designers, and domain experts ready to build.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Role-Based Access</h3>
            <p className="text-gray-600 text-sm">Dedicated secure dashboards customized specifically for founders, collaborators, and admins.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">Integrated Stripe checkout for premium features and seamless monetization management.</p>
          </div>
        </div>
      </section>
    </div>
  );
}