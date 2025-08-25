import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Play } from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';

// Define project type with optional video property
interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  video?: string;
}

const projects: Project[] = [
  {
    title: "Modern Landing Page",
    description: "Product landing page for a Video editing agency",
    image: "https://images.unsplash.com/vector-1742413749811-8133c8c64ced?q=80&w=2490&auto=format&fit=crop",
    link: "https://nexusgrowthh.com/",
    tags: ["React", "TypeScript", "Tailwind"]
  },
  {
    title: "AI Chat Assistant", 
    description: "Custom chatbot with natural language processing and seamless API integration.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2106&auto=format&fit=crop",
    link: "#",
    tags: ["OpenAI", "Node.js", "WebSocket"],
    video: "https://drive.google.com/file/d/1f2pgrJMDR4XuYu2RnQ8UYm9pYY7XdR6V/preview"
  },
  {
    title: "Portfolio Website",
    description: "modern portfolio website for a software engineer",
    image: "https://images.unsplash.com/vector-1742413284810-e36a1454175f?q=80&w=2490&auto=format&fit=crop", 
    link: "https://friendly-haupia-a1f91e.netlify.app/",
    tags: ["React", "TypeScript", "Tailwind"]
  }
];

// Video popup component
const VideoPopup = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => {
  const closeButtonHandlers = useCursorHandlers('button', 'Close');
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="bg-black border border-white/20 rounded-xl p-4 max-w-md w-full relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors z-10 bg-black/50 rounded-full p-1"
              onClick={onClose}
              {...closeButtonHandlers}
            >
              <X size={24} />
            </button>
            
            <div className="aspect-[9/16] w-full">
              <iframe 
                src={videoSrc} 
                width="100%" 
                height="100%" 
                className="rounded-lg"
                allow="autoplay" 
                allowFullScreen
              ></iframe>
            </div>
            
            <motion.button 
              className="mt-4 px-6 py-2 bg-transparent border border-white/30 rounded-full text-white hover:bg-white/10 transition-all mx-auto block"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...closeButtonHandlers}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const OurWork = () => {
  const [videoPopup, setVideoPopup] = useState({ isOpen: false, videoSrc: '' });
  const projectHandlers = useCursorHandlers('image', 'View Project');
  const videoHandlers = useCursorHandlers('button', 'Watch Demo');
  const linkHandlers = useCursorHandlers('link', 'Click');

  const handleCardClick = (project: Project, e: React.MouseEvent) => {
    if (project.video) {
      e.preventDefault();
      setVideoPopup({ isOpen: true, videoSrc: project.video });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] border border-white/10 rounded-full top-1/2 -right-64 animate-spin-slower" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 right-1/4 animate-pulse" />
        <div className="absolute w-2 h-2 bg-white rounded-full bottom-1/4 left-1/4 animate-pulse delay-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Our Recent Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Explore our latest projects and see how we've helped businesses transform their digital presence
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 cursor-pointer"
              onClick={(e) => handleCardClick(project, e)}
              {...(project.video ? videoHandlers : projectHandlers)}
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {project.video && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 backdrop-blur-sm p-3 rounded-full">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                  {...linkHandlers}
                >
                  <span>{project.video ? "Watch Demo" : "View Project"}</span>
                  {project.video ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Video Popup */}
      <VideoPopup 
        isOpen={videoPopup.isOpen} 
        onClose={() => setVideoPopup({ isOpen: false, videoSrc: '' })} 
        videoSrc={videoPopup.videoSrc} 
      />
    </section>
  );
};

export default OurWork;