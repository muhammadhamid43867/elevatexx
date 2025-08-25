import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';

const videoTestimonials = [
  {
    id: 1,
    url: "https://drive.google.com/file/d/1X04fjJPFVjgm4caTk6GWmub0B0lAlx9m/preview",
    title: "Client Nexus Growthh"
  },
  {
    id: 2,
    url: "https://drive.google.com/file/d/1Fne2xejDttvQHV87rt_e4DlNAnPWArcP/preview",
    title: "Client Usman"
  }
];

const textTestimonials = [
  {
    id: 1,
    content: "Working with this team has been transformative for our business. Their attention to detail and innovative solutions have helped us achieve remarkable growth.",
    author: "David Wilson",
    company: "GrowthTech Solutions"
  },
  {
    id: 2,
    content: "The AI integration services provided by the team have revolutionized our customer support system. We've seen a 300% increase in customer satisfaction.",
    author: "Lisa Zhang",
    company: "AI Innovations"
  },
  {
    id: 3,
    content: "Their design expertise and technical prowess created a website that not only looks stunning but performs exceptionally well. Couldn't be happier!",
    author: "James Anderson",
    company: "Digital Ventures"
  },
  {
    id: 4,
    content: "The custom web development solutions delivered by the team exceeded our expectations. Our conversion rates have doubled since launch.",
    author: "Maria Garcia",
    company: "E-commerce Plus"
  },
  {
    id: 5,
    content: "Outstanding service and remarkable results. The team's dedication to excellence is evident in every aspect of their work.",
    author: "Tom Bradley",
    company: "Innovation Hub"
  }
];

const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-[280px] h-[560px] bg-black rounded-[3rem] border-[14px] border-black shadow-xl overflow-hidden">
      {/* Phone Details */}
      <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl z-10">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-neutral-800 rounded-full" />
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-neutral-800 rounded-full z-10" />
      
      {/* Phone Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-[2rem] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-silver/20 rounded-full filter blur-xl" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-silver/10 rounded-full filter blur-xl" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-transparent">
        {children}
      </div>
    </div>
  );
};

const VideoPlayer = ({ testimonial }: { testimonial: typeof videoTestimonials[0] }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="relative h-full w-full bg-transparent">
      <iframe
        ref={iframeRef}
        src={`${testimonial.url}`}
        className="absolute inset-0 w-full h-full rounded-2xl"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        title={testimonial.title}
        allowFullScreen
      />
    </div>
  );
};

const TextTestimonialSlider = ({ 
  testimonials, 
  direction = 'up'
}: { 
  testimonials: typeof textTestimonials,
  direction?: 'up' | 'down'
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight / 2;
      setContentHeight(height);
    }
  }, []);

  useEffect(() => {
    if (contentRef.current && !animationRef.current) {
      const keyframes = direction === 'up' 
        ? [
            { transform: `translateY(0px)` },
            { transform: `translateY(-${contentHeight}px)` }
          ]
        : [
            { transform: `translateY(-${contentHeight}px)` },
            { transform: `translateY(0px)` }
          ];

      animationRef.current = contentRef.current.animate(keyframes, {
        duration: 30000,
        iterations: Infinity,
        easing: 'linear'
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };
  }, [contentHeight, direction]);

  // Handle pause/play
  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={contentRef}
        className="space-y-6"
      >
        {/* First set of testimonials */}
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4"
          >
            <p className="text-white/90 leading-relaxed">"{testimonial.content}"</p>
            <div>
              <p className="text-white font-medium">{testimonial.author}</p>
              <p className="text-white/60 text-sm">{testimonial.company}</p>
            </div>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {testimonials.map((testimonial) => (
          <div
            key={`${testimonial.id}-clone`}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4"
          >
            <p className="text-white/90 leading-relaxed">"{testimonial.content}"</p>
            <div>
              <p className="text-white font-medium">{testimonial.author}</p>
              <p className="text-white/60 text-sm">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const prevButtonHandlers = useCursorHandlers('button', 'Previous');
  const nextButtonHandlers = useCursorHandlers('button', 'Next');

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full -top-64 -left-32 animate-spin-slower" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-2 h-2 bg-white rounded-full bottom-1/4 right-1/4 animate-pulse delay-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Hear directly from our clients about their transformative experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Testimonials */}
          <div className="flex justify-center flex-col items-center">
            <PhoneFrame>
              <VideoPlayer testimonial={videoTestimonials[currentVideo]} />
            </PhoneFrame>
            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <button
                {...prevButtonHandlers}
                aria-label="Previous video"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition"
                onClick={() => setCurrentVideo((prev) => (prev === 0 ? videoTestimonials.length - 1 : prev - 1))}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                {...nextButtonHandlers}
                aria-label="Next video"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition"
                onClick={() => setCurrentVideo((prev) => (prev === videoTestimonials.length - 1 ? 0 : prev + 1))}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Text Testimonials */}
          <div className="grid grid-cols-2 gap-8">
            <TextTestimonialSlider testimonials={textTestimonials} direction="up" />
            <TextTestimonialSlider testimonials={[...textTestimonials].reverse()} direction="down" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;