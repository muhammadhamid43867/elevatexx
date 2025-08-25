import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, X, ChevronDown, Layers, Shield, Zap, Workflow, Code, MessageCircle } from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';

const categories = [
  { id: 'all', label: 'All Questions', icon: Layers },
  { id: 'general', label: 'General', icon: MessageCircle },
  { id: 'technical', label: 'Technical', icon: Code },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'performance', label: 'Performance', icon: Zap },
  { id: 'workflow', label: 'Workflow', icon: Workflow },
];

const faqs = [
  {
    id: 1,
    question: "How does your AI integration process work?",
    answer: "Our AI integration process follows a systematic approach: First, we analyze your existing systems and requirements. Then, we design a custom solution that seamlessly integrates AI capabilities. Finally, we implement and test the solution thoroughly before deployment.",
    category: "technical",
    icon: Code
  },
  {
    id: 2,
    question: "What security measures do you implement?",
    answer: "We implement multiple layers of security including end-to-end encryption, regular security audits, and compliance with industry standards. Our security protocols are regularly updated to protect against emerging threats.",
    category: "security",
    icon: Shield
  },
  {
    id: 3,
    question: "How do you ensure optimal performance?",
    answer: "We optimize performance through efficient code architecture, CDN implementation, image optimization, and regular performance monitoring. Our solutions are built with scalability in mind.",
    category: "performance",
    icon: Zap
  },
  {
    id: 4,
    question: "What is your development workflow?",
    answer: "Our development workflow follows agile methodologies with regular sprints, continuous integration/deployment, and thorough code reviews. We maintain transparent communication throughout the process.",
    category: "workflow",
    icon: Workflow
  },
  {
    id: 5,
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer comprehensive support packages including regular maintenance, updates, and technical assistance. Our support team is available 24/7 to address any concerns.",
    category: "general",
    icon: MessageCircle
  }
];

const Card3D = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const buttonHandlers = useCursorHandlers('button');
  const searchHandlers = useCursorHandlers('text', 'Search FAQs');

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setExpandedId(null);
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchRef.current?.focus();
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about our services and solutions
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search FAQs..."
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              {...searchHandlers}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  {...buttonHandlers}
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              )}
              <Search className="w-5 h-5 text-white/70" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card3D key={category.id} className="perspective">
                <motion.button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all transform-gpu
                    ${selectedCategory === category.id
                      ? 'bg-white text-black shadow-lg'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  {...buttonHandlers}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </motion.button>
              </Card3D>
            );
          })}
        </div>

        {/* FAQ Cards */}
        <div className="grid gap-6 max-w-3xl mx-auto">
          <AnimatePresence>
            {filteredFaqs.map((faq) => {
              const Icon = faq.icon;
              const isExpanded = expandedId === faq.id;

              return (
                <Card3D key={faq.id} className="perspective">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative"
                  >
                    <motion.button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="w-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-left transition-colors hover:bg-white/10"
                      whileHover={{ scale: 1.02 }}
                      {...buttonHandlers}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-white/10 rounded-xl">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 text-white/70 leading-relaxed"
                              >
                                {faq.answer}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-white/70 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </motion.button>
                  </motion.div>
                </Card3D>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FAQ;