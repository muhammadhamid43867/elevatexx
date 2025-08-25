import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';
import ProjectForm from '../ui/ProjectForm';

const services = [
  {
    "title": "Basic Plan (150$)",
    "description": "👉 Best for: Small businesses or startups seeking a straightforward online presence.",
    "features": [
      "1 Landing Page Design",
      "Speed Optimization",
      "Basic SEO Setup",
      "1 CTA Button",
      "Mobile Responsive Design",
      "Free Hosting (1st Year)"
    ]
  },
  {
    "title": "Standard Plan (299$)",
    "description": "👉 Best for: Businesses aiming to enhance lead generation and user interaction.",
    "features": [
      "Everything in Basic Plan",
      "Advanced SEO Optimization",
      "Persuasive Copywriting",
      "Email Capture & Basic Automation",
      "2 CTA Sections",
      "Interactive Elements"
    ]
  },
  {
    "title": "Premium Plan (599$)",
    "description": "👉 Best for: Established businesses seeking a comprehensive, high-converting online presence.",
    "features": [
      "Everything in Standard Plan",
      "AI Chatbot Integration",
      "Full Email Automation",
      "Advanced Animations",
      "Custom Graphics & Illustrations",
      "Free Hosting (1st Year)"
    ]
  }
];

const Services = () => {
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const buttonHandlers = useCursorHandlers('button', 'Get Started');

  return (
    <section className="py-32 relative overflow-hidden" id="services">
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
            Our Services
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Comprehensive digital solutions to elevate your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="service-card">
                <div className="card__border"></div>
                <div className="card_title__container">
                  <span className="card_title">{service.title}</span>
                  <p className="card_paragraph">
                    {service.description}
                  </p>
                </div>
                <hr className="line" />
                <ul className="card__list">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="card__list_item">
                      <span className="check">
                        <Check className="check_svg" />
                      </span>
                      <span className="list_text">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="button"
                  onClick={() => setIsProjectFormOpen(true)}
                  {...buttonHandlers}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectForm 
        isOpen={isProjectFormOpen} 
        onClose={() => setIsProjectFormOpen(false)} 
      />
    </section>
  );
};

export default Services;