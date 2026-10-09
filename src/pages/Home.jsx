import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ArrowRight, Briefcase, Users, CheckCircle2, Award, TrendingUp, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import API from '../api';

const bannerImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80", 
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80", 
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80"  
];

const fallbackStartups = [
  {
    _id: "1",
    startup_name: "NexusAI",
    industry: "Artificial Intelligence",
    description: "Building next-generation automated workflow optimization systems using advanced machine learning models.",
    funding_stage: "Seed",
    founder_email: "founder@nexusai.com",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "2",
    startup_name: "PayFlow",
    industry: "FinTech",
    description: "Seamless cross-border payment gateway solutions tailored specifically for modern remote-first tech enterprises.",
    funding_stage: "Series A",
    founder_email: "ceo@payflow.io",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "3",
    startup_name: "EcoCloud",
    industry: "GreenTech",
    description: "Zero-emission cloud infrastructure management platform providing deep energy analytics for data centers.",
    funding_stage: "Pre-Seed",
    founder_email: "contact@ecocloud.org",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
  }
];

export default function Home() {
  const [startups, setStartups] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    API.get('/api/startups')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.startups || []);
        setStartups(data.length > 0 ? data.slice(0, 3) : fallbackStartups);
      })
      .catch(err => {
        console.error("Using fallback startups due to API error:", err);
        setStartups(fallbackStartups);
      });

    API.get('/api/opportunities?limit=3')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.opportunities || []);
        setOpportunities(data.slice(0, 3));
      })
      .catch(err => console.error("Error fetching opportunities:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24 pb-24 bg-neutral-950 text-neutral-100 min-h-screen selection:bg-blue-600 selection:text-white">
      
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden pt-44 pb-36 px-4 text-center border-b border-neutral-800/80"
      >
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentBannerIndex}
              src={bannerImages[currentBannerIndex]}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full object-cover"
              alt="Corporate Workspace Banner"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/80 to-neutral-950" />
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 bg-neutral-900/90 text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-neutral-800 shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> The Ultimate Startup Team Builder Platform
          </span>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Build Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Startup Team</span> Today
          </h1>
          
          <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-normal">
            StartupForge bridges visionary founders with elite developers, designers, and marketers to bring revolutionary ideas to life.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link to="/opportunities" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40">
              Explore Opportunities <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/register" className="bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-xl backdrop-blur-md">
              Get Started Free
            </Link>
          </div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Featured Startups</h2>
            <p className="text-sm text-neutral-400 mt-1">Discover innovative startups looking for top-tier talent.</p>
          </div>
          <Link to="/startups" className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center gap-1.5 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {startups.length > 0 ? startups.map(startup => (
            <div 
              key={startup._id || startup.startup_name} 
              className="group relative bg-neutral-900/60 border border-neutral-800/90 hover:border-blue-500/50 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-900/15 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-neutral-950">
                <img 
                  src={startup.logo} 
                  alt={startup.startup_name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold text-blue-400 bg-blue-950/80 border border-blue-900/60 px-3 py-1 rounded-full backdrop-blur-md">
                  {startup.industry}
                </span>
              </div>

              <div className="p-7 pt-3 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors mb-2">
                    {startup.startup_name}
                  </h3>
                  <p className="text-sm text-neutral-300/90 line-clamp-3 mb-6 font-normal leading-relaxed">
                    {startup.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span className="bg-neutral-950/60 px-3 py-1.5 rounded-lg border border-neutral-800">
                    Funding: <strong className="text-neutral-200">{startup.funding_stage}</strong>
                  </span>
                  <span className="truncate max-w-[140px] text-neutral-400" title={startup.founder_email}>
                    {startup.founder_email}
                  </span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-3 text-center py-16 text-neutral-500 bg-neutral-900/30 rounded-3xl border border-neutral-800 backdrop-blur-xl">
              Loading featured startups...
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Featured Opportunities</h2>
            <p className="text-sm text-neutral-400 mt-1">Jump right into high-impact roles.</p>
          </div>
          <Link to="/opportunities" className="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center gap-1.5 transition-colors group">
            Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opportunities.length > 0 ? opportunities.map(opp => (
            <div 
              key={opp._id || opp.role_title} 
              className="group relative bg-neutral-900/60 border border-neutral-800/90 hover:border-indigo-500/50 backdrop-blur-2xl rounded-3xl p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-900/10 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors">{opp.role_title}</h3>
                  <span className="text-xs bg-indigo-950/60 text-indigo-300 border border-indigo-900/50 px-3 py-1 rounded-full font-medium shrink-0">
                    {opp.work_type}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mb-5 font-medium flex items-center gap-2">
                  <span>Commitment:</span> <strong className="text-neutral-200 bg-neutral-950/60 px-2.5 py-1 rounded-md border border-neutral-800">{opp.commitment_level}</strong>
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {opp.required_skills && opp.required_skills.map((skill, idx) => (
                    <span key={idx} className="text-xs bg-neutral-950/80 text-neutral-300 border border-neutral-800 px-3 py-1.5 rounded-lg font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                to="/opportunities" 
                className="w-full text-center bg-neutral-800/80 hover:bg-blue-600 text-neutral-200 hover:text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg border border-neutral-700/60 hover:border-blue-500 flex items-center justify-center gap-2"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )) : (
            <div className="col-span-3 text-center py-16 text-neutral-500 bg-neutral-900/30 rounded-3xl border border-neutral-800 backdrop-blur-xl">
              Loading opportunities...
            </div>
          )}
        </div>
      </section>

      <section className="bg-neutral-900/40 border-y border-neutral-800/80 backdrop-blur-2xl py-16 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">500+</p>
            <p className="text-sm text-neutral-400 font-medium">Active Startups</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">1,200+</p>
            <p className="text-sm text-neutral-400 font-medium">Open Opportunities</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">98%</p>
            <p className="text-sm text-neutral-400 font-medium">Successful Matches</p>
          </div>
          <div className="space-y-1">
            <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">$45M</p>
            <p className="text-sm text-neutral-400 font-medium">Raised Capital</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Why Choose StartupForge</h2>
          <p className="text-neutral-400 text-sm">We provide the most robust ecosystem for early-stage startup collaboration and recruitment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900/60 border border-neutral-800/90 hover:border-neutral-700 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl transition-all">
            <div className="w-12 h-12 bg-blue-950/60 text-blue-400 rounded-2xl flex items-center justify-center mb-5 border border-blue-900/50 shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Verified Talent</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Connect with vetted developers, designers, and domain experts ready to build from day one.</p>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800/90 hover:border-neutral-700 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl transition-all">
            <div className="w-12 h-12 bg-indigo-950/60 text-indigo-400 rounded-2xl flex items-center justify-center mb-5 border border-indigo-900/50 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Role-Based Access</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Dedicated secure dashboards customized specifically for founders, collaborators, and admins.</p>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800/90 hover:border-neutral-700 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl transition-all">
            <div className="w-12 h-12 bg-emerald-950/60 text-emerald-400 rounded-2xl flex items-center justify-center mb-5 border border-emerald-900/50 shadow-inner">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Payments</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Integrated Stripe checkout for premium features and seamless monetization management.</p>
          </div>
        </div>
      </section>

    </div>
  );
}