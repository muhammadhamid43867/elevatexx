export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  primaryService: string;
  secondaryCategory: string;
  featured?: boolean;
  video?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '💻',
    subcategories: ['E-commerce', 'Portfolio/Landing Pages', 'Business Websites', 'Custom Web Apps']
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    icon: '📈',
    subcategories: ['Life Coach Websites', 'Agency Websites', 'Marketing Funnels', 'Lead Generation']
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    icon: '🤖',
    subcategories: ['Customer Support Bots', 'Sales Automation', 'Lead Qualification', 'FAQ Assistants']
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    icon: '🎨',
    subcategories: ['Mobile Apps', 'Web Interfaces', 'Brand Identity', 'User Experience']
  }
];

export const portfolioProjects: Project[] = [
  // Web Development Projects
  {
    id: 1,
    title: "Nexus Growth Agency",
    description: "Modern landing page for a video editing agency with stunning animations and conversion-focused design.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    link: "https://nexusgrowthh.com/",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    primaryService: "web-development",
    secondaryCategory: "Portfolio/Landing Pages",
    featured: true
  },
  {
    id: 2,
    title: "Software Engineer Portfolio",
    description: "Clean and professional portfolio website showcasing technical skills and projects.",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop",
    link: "https://friendly-haupia-a1f91e.netlify.app/",
    tags: ["React", "TypeScript", "Tailwind"],
    primaryService: "web-development",
    secondaryCategory: "Portfolio/Landing Pages"
  },
  {
    id: 3,
    title: "E-commerce Fashion Store",
    description: "Full-featured online store with shopping cart, payment integration, and inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
    primaryService: "web-development",
    secondaryCategory: "E-commerce"
  },
  {
    id: 4,
    title: "Restaurant Management System",
    description: "Complete restaurant website with online ordering, table reservations, and menu management.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    primaryService: "web-development",
    secondaryCategory: "Business Websites"
  },
  {
    id: 5,
    title: "Real Estate Platform",
    description: "Property listing platform with advanced search, virtual tours, and agent management.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Next.js", "Prisma", "PostgreSQL", "MapBox"],
    primaryService: "web-development",
    secondaryCategory: "Custom Web Apps"
  },

  // Marketing Projects
  {
    id: 6,
    title: "Life Coach Sarah Johnson",
    description: "Inspiring website for a life coach with booking system and client testimonials.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["WordPress", "Elementor", "Calendly", "PayPal"],
    primaryService: "marketing",
    secondaryCategory: "Life Coach Websites"
  },
  {
    id: 7,
    title: "Digital Marketing Agency",
    description: "Professional agency website showcasing services, case studies, and client success stories.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["React", "Gatsby", "GraphQL", "Netlify CMS"],
    primaryService: "marketing",
    secondaryCategory: "Agency Websites",
    featured: true
  },
  {
    id: 8,
    title: "Sales Funnel for SaaS",
    description: "High-converting sales funnel with lead magnets, email sequences, and conversion tracking.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["ClickFunnels", "Mailchimp", "Google Analytics", "Zapier"],
    primaryService: "marketing",
    secondaryCategory: "Marketing Funnels"
  },
  {
    id: 9,
    title: "Lead Generation Landing Page",
    description: "Optimized landing page for lead generation with A/B tested elements and form optimization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["HTML", "CSS", "JavaScript", "Unbounce"],
    primaryService: "marketing",
    secondaryCategory: "Lead Generation"
  },

  // Chatbot Projects
  {
    id: 10,
    title: "Customer Support AI Assistant",
    description: "Intelligent chatbot handling customer inquiries with natural language processing.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2106&auto=format&fit=crop",
    link: "#",
    tags: ["OpenAI", "Node.js", "WebSocket", "MongoDB"],
    primaryService: "chatbot",
    secondaryCategory: "Customer Support Bots",
    video: "https://drive.google.com/file/d/1f2pgrJMDR4XuYu2RnQ8UYm9pYY7XdR6V/preview"
  },
  {
    id: 11,
    title: "Sales Automation Bot",
    description: "AI-powered sales assistant that qualifies leads and schedules appointments automatically.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Dialogflow", "Firebase", "Calendly API", "Slack"],
    primaryService: "chatbot",
    secondaryCategory: "Sales Automation"
  },
  {
    id: 12,
    title: "Lead Qualification Chatbot",
    description: "Smart chatbot that qualifies leads through conversational forms and integrates with CRM.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Botpress", "HubSpot API", "React", "Express"],
    primaryService: "chatbot",
    secondaryCategory: "Lead Qualification"
  },
  {
    id: 13,
    title: "FAQ Assistant Bot",
    description: "Intelligent FAQ bot that provides instant answers and reduces support ticket volume.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Microsoft Bot Framework", "LUIS", "Azure", "Teams"],
    primaryService: "chatbot",
    secondaryCategory: "FAQ Assistants"
  },

  // Design Projects
  {
    id: 14,
    title: "Fitness Mobile App UI",
    description: "Modern and intuitive mobile app design for fitness tracking and workout planning.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Figma", "Sketch", "Principle", "InVision"],
    primaryService: "design",
    secondaryCategory: "Mobile Apps"
  },
  {
    id: 15,
    title: "SaaS Dashboard Interface",
    description: "Clean and functional dashboard design for a project management SaaS platform.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Figma", "Adobe XD", "Zeplin", "Storybook"],
    primaryService: "design",
    secondaryCategory: "Web Interfaces",
    featured: true
  },
  {
    id: 16,
    title: "Tech Startup Brand Identity",
    description: "Complete brand identity design including logo, color palette, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["Adobe Illustrator", "Photoshop", "InDesign", "Brand Guidelines"],
    primaryService: "design",
    secondaryCategory: "Brand Identity"
  },
  {
    id: 17,
    title: "E-learning Platform UX",
    description: "User experience design for an online learning platform with focus on engagement and retention.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2340&auto=format&fit=crop",
    link: "#",
    tags: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    primaryService: "design",
    secondaryCategory: "User Experience"
  }
];

// Get featured projects for homepage
export const getFeaturedProjects = (): Project[] => {
  return portfolioProjects.filter(project => project.featured);
};

// Get projects by service
export const getProjectsByService = (serviceId: string): Project[] => {
  return portfolioProjects.filter(project => project.primaryService === serviceId);
};

// Get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  return portfolioProjects.filter(project => project.secondaryCategory === category);
};

// Get projects by service and category
export const getProjectsByServiceAndCategory = (serviceId: string, category: string): Project[] => {
  return portfolioProjects.filter(
    project => project.primaryService === serviceId && project.secondaryCategory === category
  );
};

// Get mixed selection for default view
export const getMixedProjects = (): Project[] => {
  const featured = portfolioProjects.filter(project => project.featured);
  const nonFeatured = portfolioProjects.filter(project => !project.featured);
  
  // Mix featured and non-featured projects
  const mixed = [];
  const maxItems = Math.min(12, portfolioProjects.length);
  
  // Add featured projects first
  featured.forEach(project => mixed.push(project));
  
  // Fill remaining slots with non-featured projects
  let nonFeaturedIndex = 0;
  while (mixed.length < maxItems && nonFeaturedIndex < nonFeatured.length) {
    mixed.push(nonFeatured[nonFeaturedIndex]);
    nonFeaturedIndex++;
  }
  
  return mixed;
};