import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook,
  Linkedin, 
  Instagram,
  Heart,
  ExternalLink
} from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';

const Footer = () => {
  const buttonHandlers = useCursorHandlers('button');

  const socialLinks = [
    { 
      icon: <Facebook className="w-5 h-5 text-white" />, 
      url: "https://web.facebook.com/profile.php?id=61566053774133", 
      label: "Visit Facebook",
      cursorText: "Visit Facebook"
    },
    { 
      icon: <Instagram className="w-5 h-5 text-white" />, 
      url: "https://www.instagram.com/elevate._.x/profilecard/", 
      label: "Visit Instagram",
      cursorText: "Visit Instagram"
    },
    { 
      icon: <Linkedin className="w-5 h-5 text-white" />, 
      url: "https://www.linkedin.com/in/muhammad-hamid-244587333/", 
      label: "Visit LinkedIn",
      cursorText: "Visit LinkedIn"
    }
  ];

  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/10 py-10">
      {/* Silver Gradient Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-gray-300/10 to-gray-500/10 rounded-full blur-[100px] -bottom-20 -left-20" />
        <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-gray-400/10 to-gray-600/10 rounded-full blur-[80px] -top-20 -right-20" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center mb-6">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h2 className="text-2xl font-serif font-bold text-white">ELEVATE <span className="text-silver">X</span></h2>
          </motion.div>
          
          {/* Vision Statement */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white max-w-2xl text-center mb-4 text-sm"
          >
            Transforming digital experiences through innovative design and cutting-edge technology. 
            We create solutions that elevate your brand and drive meaningful connections.
          </motion.p>
          
          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 mb-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black border border-silver/20 rounded-full hover:border-silver/50 hover:bg-silver/5 transition-all duration-300"
                whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(192, 192, 192, 0.1)' }}
                {...useCursorHandlers('link', social.cursorText)}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent mb-4"></div>
        
        {/* Attribution */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-2"
        >
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} ELEVATE X. All rights reserved.
          </p>
          <p className="text-white/60 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" /> by 
            <a 
              href="https://www.linkedin.com/in/muhammad-hamid-244587333/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-silver inline-flex items-center gap-1 transition-colors duration-300"
              {...useCursorHandlers('link', 'Visit LinkedIn')}
            >
              Hamid <ExternalLink className="w-2 h-2" />
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;