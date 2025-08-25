import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Clock, User, Tag } from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';

const resources = [
  {
    id: 1,
    title: "Z-Pattern Guide 2025",
    description: "A comprehensive guide on the Z-pattern layout in web design. Learn how to create visually appealing and user-friendly interfaces using the Z-pattern technique.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    category: "Design",
    author: "Muhammad Hamid",
    date: "Mar 15, 2025",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=1qo1FYI0f_niuwMBGdr6JDySE3zS5MuoD&export=download",
    previewUrl: "https://drive.google.com/file/d/1qo1FYI0f_niuwMBGdr6JDySE3zS5MuoD/view?usp=sharing",
    fileSize: "4.27 MB",
    fileType: "PDF"
  },
  {
    id: 2,
    title: "7 Landing Page Tips That Actually Work (No Fluff)",
    description: "Tired of landing pages that look good but don’t convert? This guide breaks down 7 simple, proven tweaks you can make today — even if you’re not a designer. It’s short, visual, and straight to the point.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
    category: "Design",
    author: "Hamid",
    date: "APR 08, 2025",
    downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=1py8PjQrI299PLfl5uQ6BYVL9aKLculHi&export=download",
    previewUrl: "https://drive.google.com/file/d/1py8PjQrI299PLfl5uQ6BYVL9aKLculHi/view?usp=sharing",
    fileSize: "2.44 MB",
    fileType: "PDF"
  },
  // {
  //   id: 3,
  //   title: "AI Integration Handbook",
  //   description: "Learn how to integrate artificial intelligence into your web applications. This guide covers everything from basic machine learning concepts to practical implementation examples.",
  //   image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2670&auto=format&fit=crop",
  //   category: "AI",
  //   author: "Emily Davis",
  //   date: "Mar 10, 2025",
  //   downloadUrl: "https://example.com/download/ai-handbook.pdf",
  //   previewUrl: "https://example.com/preview/ai-handbook",
  //   fileSize: "18.5 MB",
  //   fileType: "PDF"
  // }
];

const ResourceCard = ({ resource }: { resource: typeof resources[0] }) => {
  const buttonHandlers = useCursorHandlers('button');
  const linkHandlers = useCursorHandlers('link');
  const cardHandlers = useCursorHandlers('link', 'View Preview');

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click if clicking on buttons
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    window.open(resource.previewUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
      {...cardHandlers}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="relative aspect-[16/9] md:aspect-auto">
          <img
            src={resource.image}
            alt={resource.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 md:pr-8 flex flex-col h-full justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="px-3 py-1 bg-white/10 rounded-full">
                {resource.category}
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {resource.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {resource.author}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {resource.title}
            </h3>

            <p className="text-white/70 line-clamp-3">
              {resource.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-white/60">
              <Tag className="w-4 h-4" />
              <span>{resource.fileType}</span>
              <span>•</span>
              <span>{resource.fileSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <motion.a
              href={resource.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              {...buttonHandlers}
            >
              <Download className="w-4 h-4" />
              Download
            </motion.a>

            <motion.a
              href={resource.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => e.stopPropagation()}
              {...linkHandlers}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Resources = () => {
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
              Resources
              <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-50" />
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore our collection of valuable resources to enhance your digital journey
          </p>
        </motion.div>

        <div className="space-y-8">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;