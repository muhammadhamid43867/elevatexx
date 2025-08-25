import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Send, Facebook, Instagram } from 'lucide-react';
import { useCursorHandlers } from '../../hooks/useCursor';
import emailjs from '@emailjs/browser';

const ContactCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
      className="relative will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: typeof Github; label: string }) => {
  const linkHandlers = useCursorHandlers('link', 'Visit');
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors relative"
      style={{ transform: "translateZ(20px)" }}
      whileHover={{ y: -2 }}
      aria-label={label}
      {...linkHandlers}
    >
      <Icon className="w-6 h-6 text-white" />
    </motion.a>
  );
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_zrzqr99',
        'template_fed5ein',
        formRef.current,
        'YmYhAluM9o0L3qJMF'
      );
      
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Enhanced glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full -top-64 -right-32 animate-spin-slower" />
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 right-1/4 animate-pulse shadow-glow" />
        <div className="absolute w-2 h-2 bg-white rounded-full bottom-1/4 left-1/4 animate-pulse delay-300 shadow-glow" />
        <div className="absolute w-[300px] h-[300px] bg-purple-500/30 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
        <div className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-[80px] top-1/4 right-1/4 animate-pulse-slow delay-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 [text-shadow:_0_4px_8px_rgb(0_0_0_/_50%)] relative">
            <span className="relative">
              Get in Touch
              <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-50" />
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Let's discuss how we can help transform your digital presence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <ContactCard>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 relative transform-gpu">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl" />
              
              <div className="relative space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6" style={{ transform: "translateZ(40px)" }}>
                    Contact Information
                  </h3>

                  <div className="space-y-4" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="p-3 bg-white/5 rounded-xl">
                        <Mail className="w-6 h-6" />
                      </div>
                      <span>Services@elevatexlab.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="p-3 bg-white/5 rounded-xl">
                        <Phone className="w-6 h-6" />
                      </div>
                      <span>+92 3101028091</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="p-3 bg-white/5 rounded-xl">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <span>Islamabad, Pakistan</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white" style={{ transform: "translateZ(20px)" }}>
                    Connect With Us
                  </h4>
                  <div className="flex gap-4" style={{ transform: "translateZ(20px)" }}>
                    <SocialLink href="https://web.facebook.com/profile.php?id=61566053774133" icon={Facebook} label="Visit our Facebook" />
                    <SocialLink href="https://www.instagram.com/elevate._.x/profilecard/" icon={Instagram} label="Follow us on Instagram" />
                    {/* <SocialLink href="https://twitter.com" icon={Twitter} label="Follow us on Twitter" /> */}
                    <SocialLink href="https://www.linkedin.com/in/muhammad-hamid-244587333/" icon={Linkedin} label="Connect on LinkedIn" />
                  </div>
                </div>
              </div>
            </div>
          </ContactCard>

          {/* Contact Form */}
          <ContactCard>
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 relative transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl" />
              
              <div className="relative space-y-6">
                <div style={{ transform: "translateZ(20px)" }}>
                  <label htmlFor="from_name" className="block text-sm font-medium text-white/80 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div style={{ transform: "translateZ(20px)" }}>
                  <label htmlFor="to_name" className="block text-sm font-medium text-white/80 mb-2">
                    To Name
                  </label>
                  <input
                    type="text"
                    id="to_name"
                    name="to_name"
                    value="Admin"
                    readOnly
                    hidden
                  />
                </div>

                <div style={{ transform: "translateZ(20px)" }}>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div style={{ transform: "translateZ(20px)" }}>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ transform: "translateZ(30px)" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </div>
            </form>
          </ContactCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;