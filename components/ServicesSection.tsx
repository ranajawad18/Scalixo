
import React, { useState, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: string;
  points: string[];
  moreCount: number;
  videoUrl: string;
  isDarkMode: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, icon, points, moreCount, videoUrl, isDarkMode }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      className={`group relative fade-in overflow-hidden rounded-[2.5rem] border p-10 transition-all duration-500 ease-out cursor-default
      ${isDarkMode 
        ? 'bg-gray-900/40 border-white/5 hover:border-coral/50 backdrop-blur-2xl shadow-2xl shadow-black/40' 
        : 'bg-white/80 border-gray-100 hover:border-coral/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(255,94,94,0.15)]'}`}
    >
      
      {/* Premium Sheen Reflection */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute -inset-full top-0 block h-full w-3/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent group-hover:animate-[sheen_2s_infinite]"></div>
      </div>

      {/* Background Video Animation */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 
        ${isDarkMode ? 'opacity-20 group-hover:opacity-50' : 'opacity-10 group-hover:opacity-25'}`}>
        <video 
          className="h-full w-full object-cover scale-125 group-hover:scale-105 transition-transform duration-[4s] ease-out" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 
          ${isDarkMode ? 'bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent' : 'bg-gradient-to-t from-white via-white/70 to-transparent'}`}></div>
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Icon with Glass Background */}
        <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6 shadow-xl
          ${isDarkMode 
            ? 'bg-white/5 border border-white/10 text-coral group-hover:bg-coral group-hover:text-white group-hover:border-coral' 
            : 'bg-white border border-gray-100 text-coral group-hover:bg-coral group-hover:text-white group-hover:border-coral'}`}>
          <i className={icon}></i>
        </div>

        {/* Content */}
        <h3 className={`mb-4 text-2xl font-black tracking-tight transition-colors group-hover:text-coral
          ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        
        <p className={`mb-8 text-[15px] leading-relaxed transition-colors
          ${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-slate-600 group-hover:text-slate-900 font-medium'}`}>
          {desc}
        </p>

        {/* Bullet Points with Premium Tick Icons */}
        <ul className="mb-6 space-y-3 flex-grow">
          {points.map((point, i) => (
            <li key={i} className={`flex items-center gap-3 text-[13px] font-bold transition-all duration-300 group-hover:translate-x-2
              ${isDarkMode ? 'text-gray-500 group-hover:text-gray-300' : 'text-slate-500 group-hover:text-slate-800'}`}>
              <div className="h-4 w-4 rounded-full bg-coral/10 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-coral group-hover:scale-150 transition-transform"></div>
              </div>
              {point}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className={`mt-auto pt-6 flex flex-col gap-6 border-t transition-colors ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <button className="text-[11px] w-fit font-black uppercase tracking-[0.2em] text-coral hover:underline decoration-2 underline-offset-4 transition-all">
            +{moreCount} premium services
          </button>
          
          <button className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black transition-all border
            ${isDarkMode 
              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
              : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-xl'}`}>
            Explore Module
            <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ServicesSectionProps {
  isDarkMode: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isDarkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "Software Engineering",
      desc: "Architecting robust, scalable digital infrastructures using modern frameworks. We turn complex logic into seamless performance.",
      icon: "fas fa-code",
      points: ["Microservices Architecture", "Scalable SaaS Platforms", "API Ecosystems"],
      moreCount: 12,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"
    },
    {
      title: "Mobile Innovation",
      desc: "Crafting fluid native and hybrid experiences that live in your pocket. Focused on performance, battery, and delight.",
      icon: "fas fa-mobile-screen",
      points: ["Native iOS & Android", "React Native Specialists", "App Store Strategy"],
      moreCount: 5,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-finger-pointing-to-a-smart-watch-screen-34533-large.mp4"
    },
    {
      title: "Web Ecosystems",
      desc: "Building the next generation of the web. Progressive Web Apps and high-conversion landing zones designed to perform.",
      icon: "fas fa-laptop-code",
      points: ["Next.js Architecture", "Real-time Dashboards", "SEO Optimized Web Apps"],
      moreCount: 8,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-computer-keyboard-in-a-dark-room-41718-large.mp4"
    },
    {
      title: "Strategic UI/UX",
      desc: "User-centric design that doesn't just look beautiful but converts. We map every click and scroll to user psychology.",
      icon: "fas fa-palette",
      points: ["Behavioral UX Design", "Design Systems (Atomic)", "High-Fidelity Mockups"],
      moreCount: 4,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-shimmering-blue-dots-40502-large.mp4"
    },
    {
      title: "Growth Engineering",
      desc: "Data-driven marketing that scales. We combine SEO, SEM, and performance creative to dominate your vertical.",
      icon: "fas fa-chart-line",
      points: ["Conversion Optimization", "Omnichannel Growth", "Data Analytics & Insight"],
      moreCount: 6,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-woman-analyzing-data-on-a-digital-screen-40523-large.mp4"
    },
    {
      title: "Global E-Commerce",
      desc: "Powering global sales with high-performance storefronts. Optimized checkout flows and inventory integration.",
      icon: "fas fa-cart-shopping",
      points: ["Headless E-commerce", "Custom Shopify Engines", "Global Payment Gateways"],
      moreCount: 9,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-shopping-experience-with-neon-lines-40504-large.mp4"
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Dynamic Section Background Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              index === currentSlide ? 'opacity-20' : 'opacity-0'
            }`}
          >
            <div 
              className={`w-full h-full bg-cover bg-center transition-transform duration-[15000ms] ease-linear ${
                index === currentSlide ? 'scale-110 translate-y-10' : 'scale-100 translate-y-0'
              }`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          </div>
        ))}
        <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? 'bg-black/60' : 'bg-white/80'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-coral/10 border border-coral/20 text-coral text-[10px] font-black uppercase tracking-[0.4em] mb-4">Our Expertise</div>
          <h2 className={`text-5xl md:text-7xl font-black tracking-tight leading-tight transition-colors fade-in ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Next-Gen Digital <br /> <span className="text-coral">Capabilities</span>
          </h2>
          <p className={`text-xl fade-in transition-colors leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            We deliver end-to-end innovation for brands ready to lead the digital frontier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} isDarkMode={isDarkMode} />
          ))}
        </div>

        <div className="flex justify-center fade-in pt-10">
          <button className={`group relative flex items-center gap-4 rounded-full border-2 px-12 py-5 font-black text-lg transition-all hover:bg-coral hover:text-white hover:border-coral hover:shadow-2xl hover:shadow-coral/40
            ${isDarkMode 
              ? 'border-white/20 bg-white/5 text-white' 
              : 'border-slate-300 bg-white text-slate-900 shadow-xl'}`}>
            View Full Service Map
            <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
