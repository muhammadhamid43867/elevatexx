import React, { useState } from 'react';
import { Home, FileText, PenSquare, Users, Phone, Book, ArrowRight } from 'lucide-react';
import { AnimeNavBar } from '../ui/anime-navbar';
import { motion } from 'framer-motion';
import { useCursorHandlers } from '../../hooks/useCursor';
import ProjectForm from '../ui/ProjectForm';
import { Link } from 'react-router-dom';

const items = [
  {
    name: "Home",
    url: "/#home",
    icon: Home,
  },
  {
    name: "Services",
    url: "/#services",
    icon: FileText,
  },
  {
    name: "Our Work",
    url: "/#work",
    icon: PenSquare,
  },
  // {
  //   name: "Portfolio",
  //   url: "/portfolio",
  //   icon: PenSquare,
  // },
  {
    name: "Our Clients",
    url: "/#testimonials",
    icon: Users,
  }
  {
    name: "Resources",
    url: "/resources",
    icon: Book,
  },
  {
    name: "Contact Us",
    url: "/#contact",
    icon: Phone,
  },
];

const Navbar = () => {
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const buttonHandlers = useCursorHandlers('button', 'Start Project');

  return (
    <div className="relative">
      {/* Logo - Hidden on mobile, visible from md breakpoint */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-3 sm:top-4 md:top-8 lg:top-12 left-3 sm:left-4 md:left-8 lg:left-16 z-[100] items-center hidden md:flex"
      >
        <Link to="/" className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white hover:text-white/80 transition-colors cursor-pointer">
          <span>Elevate X</span>
        </Link>
      </motion.div>
      
      {/* Updated Start Project Button */}
      <div className="fixed top-6 sm:top-8 md:top-8 lg:top-12 right-3 sm:right-4 md:right-8 lg:right-16 z-[100] hidden sm:block pointer-events-auto">
        <motion.button
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          onClick={() => setIsProjectFormOpen(true)}
          className="relative w-full h-full bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all cursor-pointer select-none px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 pointer-events-auto text-sm md:text-base min-h-[44px]"
          {...buttonHandlers}
        >
          Start Your Project
        </motion.button>
      </div>
      
      {/* Existing Navbar with reduced size for mobile */}
      <div className="py-1 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base">
        <AnimeNavBar items={items} defaultActive="Home" />
      </div>

      {/* Project Form */}
      <ProjectForm 
        isOpen={isProjectFormOpen} 
        onClose={() => setIsProjectFormOpen(false)} 
      />
    </div>
  );
};

export default Navbar;