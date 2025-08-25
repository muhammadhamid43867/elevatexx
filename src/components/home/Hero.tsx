import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, X, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCursorHandlers } from '../../hooks/useCursor';
import ProjectForm from '../ui/ProjectForm';

const ProfileCard = () => {
  return (
    <div className="container-3d">
      <div className="card-3d">
        <div className="front">
          <div className="card-top">
            <p className="card-top-para">Profile</p>
          </div>
          
          <div className="profile-icon">
            <X className="w-24 h-24" />
          </div>
          <p className="heading">Front Card</p>
          <p className="follow">Follow me for more...</p>
        </div>
        <div className="back">
          <p className="heading">Follow Me</p>
          
          <div className="profile-icon">
            <X className="w-24 h-24" />
          </div>

          <div className="icons">
            <a 
              href="https://www.instagram.com/elevate._.x/profilecard/?igsh=MXAxYzA2MTZ5a2tqcA==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              {...useCursorHandlers('link', 'Visit Instagram')}
            >
              <Instagram className="w-8 h-8 hover:text-purple-400 transition-colors" />
            </a>
            <a 
              href="https://web.facebook.com/profile.php?id=61566053774133" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              {...useCursorHandlers('link', 'Visit Facebook')}
            >
              <Facebook className="w-8 h-8 hover:text-blue-400 transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/company/elevatex11" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              {...useCursorHandlers('link', 'Visit LinkedIn')}
            >
              <Linkedin className="w-8 h-8 hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] border border-white/10 rounded-full -top-48 -right-24 animate-spin-slow" />
        <div className="absolute w-[300px] h-[300px] border border-white/10 rounded-full top-96 -left-24 animate-spin-slower" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-3/4 right-1/3 animate-pulse delay-300" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/3 right-1/4 animate-pulse delay-700" />
      </div>

      {/* Main content - Added more top padding */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 flex flex-col lg:flex-row items-start justify-between gap-12">
        <div className="text-center lg:text-left lg:max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Elevate Your Digital
            <span className="block">Presence</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
            We craft stunning landing pages and intelligent chatbots that transform visitors into loyal customers. Experience the perfect blend of design and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all flex items-center justify-center group"
              onClick={() => setIsProjectFormOpen(true)}
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href="#work"
              className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all inline-flex items-center justify-center"
            >
              View Our Work
            </a>
          </div>
        </div>

        {/* Card - Hidden on mobile, visible from md breakpoint */}
        <div className="lg:w-[400px] hidden md:flex items-start justify-center lg:mt-20">
          <ProfileCard />
        </div>
      </div>

      {/* Stats section - Moved closer to text */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-8 justify-center">
          {[
            { number: '100+', label: 'Projects Completed' },
            { number: '95%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Support Available' },
            { number: '50+', label: 'Active Clients' }
          ].map((stat, index) => (
            <div
              key={index}
              className="stats-outer w-full md:w-[220px]"
            >
              <div className="stats-dot"></div>
              <div className="stats-card p-4 md:p-8">
                <div className="stats-ray"></div>
                <div className="stats-text">{stat.number}</div>
                <div className="text-white/70 mt-2 text-xs md:text-sm font-medium">{stat.label}</div>
                <div className="stats-line stats-topl"></div>
                <div className="stats-line stats-leftl"></div>
                <div className="stats-line stats-bottoml"></div>
                <div className="stats-line stats-rightl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectForm 
        isOpen={isProjectFormOpen} 
        onClose={() => setIsProjectFormOpen(false)} 
      />
    </div>
  );
};

export default Hero;