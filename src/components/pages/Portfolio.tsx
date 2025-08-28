import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, Filter, X } from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';
import { 
  portfolioProjects, 
  serviceCategories, 
  getMixedProjects,
  getProjectsByService,
  getProjectsByCategory,
  getProjectsByServiceAndCategory,
  type Project 
} from '../../data/portfolioData';

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

// Project Card Component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [videoPopup, setVideoPopup] = useState({ isOpen: false, videoSrc: '' });
  const projectHandlers = useCursorHandlers('image', 'View Project');
  const videoHandlers = useCursorHandlers('button', 'Watch Demo');
  const linkHandlers = useCursorHandlers('link', 'Click');

  const handleCardClick = (e: React.MouseEvent) => {
    if (project.video) {
      e.preventDefault();
      setVideoPopup({ isOpen: true, videoSrc: project.video });
    }
  };

  return (
    <>
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 cursor-pointer"
        onClick={(e) => handleCardClick(e)}
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
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-white text-black rounded-full text-sm font-medium">
              Featured
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

      <VideoPopup 
        isOpen={videoPopup.isOpen} 
        onClose={() => setVideoPopup({ isOpen: false, videoSrc: '' })} 
        videoSrc={videoPopup.videoSrc} 
      />
    </>
  );
};

// Filter Component
const FilterSection = ({ 
  selectedService, 
  selectedCategory, 
  onServiceChange, 
  onCategoryChange,
  onClearFilters 
}: {
  selectedService: string | null;
  selectedCategory: string | null;
  onServiceChange: (service: string | null) => void;
  onCategoryChange: (category: string | null) => void;
  onClearFilters: () => void;
}) => {
  const buttonHandlers = useCursorHandlers('button');
  const clearHandlers = useCursorHandlers('button', 'Clear Filters');

  const availableCategories = selectedService 
    ? serviceCategories.find(s => s.id === selectedService)?.subcategories || []
    : [];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-white/70" />
          <span className="text-white/70 font-medium">Filter by:</span>
        </div>
        {(selectedService || selectedCategory) && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm hover:bg-red-500/30 transition-colors flex items-center gap-2"
            {...clearHandlers}
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Primary Service Filter */}
      <div className="mb-6">
        <h3 className="text-white font-medium mb-3">Services</h3>
        <div className="flex flex-wrap gap-3">
          {serviceCategories.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceChange(selectedService === service.id ? null : service.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedService === service.id
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              {...buttonHandlers}
            >
              <span>{service.icon}</span>
              {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Category Filter */}
      {selectedService && availableCategories.length > 0 && (
        <div>
          <h3 className="text-white font-medium mb-3">Categories</h3>
          <div className="flex flex-wrap gap-3">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
                {...buttonHandlers}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Portfolio = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!selectedService && !selectedCategory) {
      return getMixedProjects();
    }
    
    if (selectedService && selectedCategory) {
      return getProjectsByServiceAndCategory(selectedService, selectedCategory);
    }
    
    if (selectedService) {
      return getProjectsByService(selectedService);
    }
    
    if (selectedCategory) {
      return getProjectsByCategory(selectedCategory);
    }
    
    return portfolioProjects;
  }, [selectedService, selectedCategory]);

  const handleClearFilters = () => {
    setSelectedService(null);
    setSelectedCategory(null);
  };

  const handleServiceChange = (service: string | null) => {
    setSelectedService(service);
    setSelectedCategory(null); // Reset category when service changes
  };

  return (
    <section className="pt-40 pb-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full -top-64 -right-32 animate-spin-slower" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 right-1/4 animate-pulse shadow-glow" />
        <div className="absolute w-2 h-2 bg-white rounded-full bottom-1/4 left-1/4 animate-pulse delay-300 shadow-glow" />
        <div className="absolute w-[300px] h-[300px] bg-purple-500/30 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 [text-shadow:_0_4px_8px_rgb(0_0_0_/_50%)]">
            <span className="relative">
              Our Portfolio
              <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-50" />
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore our diverse collection of projects across web development, marketing, AI chatbots, and design
          </p>
        </motion.div>

        {/* Filter Section */}
        <FilterSection
          selectedService={selectedService}
          selectedCategory={selectedCategory}
          onServiceChange={handleServiceChange}
          onCategoryChange={setSelectedCategory}
          onClearFilters={handleClearFilters}
        />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <p className="text-white/60 text-sm">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {selectedService && (
              <span> in {serviceCategories.find(s => s.id === selectedService)?.name}</span>
            )}
            {selectedCategory && (
              <span> • {selectedCategory}</span>
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedService}-${selectedCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg mb-4">No projects found matching your criteria</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;