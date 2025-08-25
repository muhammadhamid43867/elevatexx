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
  {
    name: "Our Clients",
    url: "/#testimonials",
    icon: Users,
  },
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
        className="fixed top-5 md:top-16 left-5 md:left-20 z-[100] flex items-center"
      >
        <Link to="/" className="text-xl md:text-2xl font-serif font-bold text-white hover:text-white/80 transition-colors cursor-pointer">
          <span className="block md:hidden text-4xl leading-none">X</span>
          <span className="hidden md:block">Elevate X</span>
        </Link>
      </motion.div>
      
      {/* Updated Start Project Button */}
      <div className="fixed top-8 md:top-16 right-4 md:right-20 z-[100] hidden md:block pointer-events-auto">
        <motion.button
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          onClick={() => setIsProjectFormOpen(true)}
          className="relative w-full h-full bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all cursor-pointer select-none px-6 md:px-8 py-3 md:py-4 pointer-events-auto text-sm md:text-base"
          {...buttonHandlers}
        >
          Start Your Project
        </motion.button>
      </div>
      
      {/* Existing Navbar with reduced size for mobile */}
      <div className="py-1 md:py-4 text-xs md:text-sm">
        <AnimeNavBar items={items} defaultActive="Home" className="text-xs py-2" />
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