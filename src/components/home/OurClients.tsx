import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Twitter, Linkedin, X, 
  Rocket, PenTool, BarChart3 
} from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';

// Define types for our data
interface Client {
  name: string;
  description: string;
  icon: React.ReactNode;
  year: string;
  popupTitle: string;
  popupDescription: string;
  socialLinks: {
    website: string;
    twitter: string;
    linkedin: string;
  };
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

// Extended client data with popup information
const clients: Client[] = [
  {
    name: "Designs",
    description: "Our landing pages are built to turn visitors into customers with strategic layouts and AI-driven personalization",
    icon: <PenTool size={28} />,
    year: "2024",
    popupTitle: "How We Create High-Converting Designs?",
    popupDescription: "We combine data-driven design principles with psychological triggers to create landing pages that convert visitors into customers. Our process involves extensive market research, A/B testing, and strategic implementation of conversion-focused elements. We leverage AI-driven personalization to dynamically adjust content based on user behavior, ensuring each visitor sees the most relevant messaging. Our designs are built with clear visual hierarchies that guide users toward conversion actions, supported by compelling testimonials and trust indicators placed at key decision points.",
    socialLinks: {
      website: "https://tesla.com",
      twitter: "https://twitter.com/tesla",
      linkedin: "https://linkedin.com/company/tesla-motors"
    }
  },
  {
    name: "Performance",
    description: "Speed matters! We create ultra-fast landing pages that keep users engaged and reduce bounce rates",
    icon: <Rocket size={28} />,
    year: "2023",
    popupTitle: "How We Optimize for Speed?",
    popupDescription: "Our performance optimization approach focuses on minimizing loading times to maximize user engagement and conversion rates. We implement advanced techniques including code splitting to load only what's needed, lazy loading for images and components, and server-side rendering for faster initial page loads. Our development process includes rigorous performance testing at every stage, ensuring optimal Core Web Vitals scores. We utilize next-generation image formats with proper sizing and compression, implement effective browser caching strategies, and minimize third-party scripts that can slow down your page. The result is lightning-fast landing pages that keep users engaged and dramatically reduce bounce rates.",
    socialLinks: {
      website: "https://spacex.com",
      twitter: "https://twitter.com/spacex",
      linkedin: "https://linkedin.com/company/spacex"
    }
  },
  {
    name: "Sales",
    description: "From copy to call-to-action, every element is designed to maximize conversions and revenue",
    icon: <BarChart3 size={28} />,
    year: "2023",
    popupTitle: "How We Optimize for Sales?",
    popupDescription: "Our sales-driven approach focuses on creating landing pages where every element works together to drive conversions. We craft compelling copy that addresses customer pain points and clearly communicates your unique value proposition. Our strategic placement of calls-to-action guides users through an optimized conversion funnel, with A/B testing to continuously improve performance. We implement psychological triggers like scarcity, social proof, and urgency to motivate action, while our mobile-first design ensures a seamless experience across all devices. We also integrate advanced analytics to track user behavior and make data-driven optimizations that continuously improve your conversion rates and maximize revenue.",
    socialLinks: {
      website: "https://microsoft.com",
      twitter: "https://twitter.com/microsoft",
      linkedin: "https://linkedin.com/company/microsoft"
    }
  }
];

// Popup component for displaying detailed card information
const CardDetailsPopup = ({ 
  isOpen, 
  onClose, 
  title, 
  description 
}: PopupProps) => {
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
            className="bg-black border border-white/20 rounded-xl p-8 max-w-2xl w-full relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              onClick={onClose}
              {...closeButtonHandlers}
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">{title}</h2>
            <p className="text-white/80 leading-relaxed">{description}</p>
            
            <motion.button 
              className="mt-8 px-6 py-2 bg-transparent border border-white/30 rounded-full text-white hover:bg-white/10 transition-all mx-auto block"
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

const OurClients = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ title: '', description: '' });
  
  const cardHandlers = useCursorHandlers('button', 'Learn More');

  const handleCardClick = (client: Client) => {
    setSelectedCard({
      title: client.popupTitle,
      description: client.popupDescription
    });
    setIsPopupOpen(true);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full -top-64 -right-32 animate-spin-slower" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 right-1/4 animate-pulse" />
        <div className="absolute w-2 h-2 bg-white rounded-full bottom-1/4 left-1/4 animate-pulse delay-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Landing pages that don't just look good, but drive real results. 🚀
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="parent cursor-pointer"
              onClick={() => handleCardClick(client)}
              {...cardHandlers}
            >
              <div className="card bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                <div className="glass" />
                <div className="logo">
                  {[1, 2, 3, 4, 5].map((circle) => (
                    <span
                      key={circle}
                      className={`circle circle${circle} bg-white/5 backdrop-blur-sm`}
                    >
                      {circle === 5 && (
                        <span className="text-white flex items-center justify-center">
                          {client.icon}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="content">
                  <span className="title text-white font-bold">
                    {client.name}
                  </span>
                  <span className="text text-white/70">
                    {client.description}
                  </span>
                </div>
                <div className="bottom">
                  <div className="view-more">
                    <button className="view-more-button text-white">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup for displaying card details */}
      <CardDetailsPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={selectedCard.title}
        description={selectedCard.description}
      />
    </section>
  );
};

export default OurClients;