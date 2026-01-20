
import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';

interface ServicesPageProps {
  isDarkMode: boolean;
}

const DetailedServiceCard: React.FC<{
  title: string;
  desc: string;
  icon: string;
  features: string[];
  tech: string[];
  isDarkMode: boolean;
}> = ({ title, desc, icon, features, tech, isDarkMode }) => (
  <div className={`group relative p-10 rounded-[3rem] border transition-all duration-700 fade-in
    ${isDarkMode 
      ? 'bg-gray-900/40 border-white/5 hover:border-coral/40 backdrop-blur-3xl' 
      : 'bg-white/80 border-gray-100 hover:border-coral/30 shadow-xl shadow-slate-200/50 backdrop-blur-2xl'}`}>
    
    <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-3xl mb-8 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6
      ${isDarkMode ? 'bg-white/5 text-coral border border-white/10' : 'bg-gray-50 text-coral border border-gray-100'}`}>
      <i className={icon}></i>
    </div>

    <h3 className={`text-3xl font-black mb-4 tracking-tighter transition-colors group-hover:text-coral ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
    <p className={`text-lg mb-8 leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-slate-600'}`}>{desc}</p>

    <div className="space-y-6">
      <div>
        <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Key Features</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <li key={i} className={`flex items-center gap-3 text-sm font-bold transition-transform group-hover:translate-x-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              <i className="fas fa-check-circle text-coral text-xs"></i> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 border-t border-white/5">
        <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span key={i} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all hover:bg-coral hover:text-white hover:border-coral
              ${isDarkMode ? 'border-white/10 bg-white/5 text-gray-400' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage: React.FC<ServicesPageProps> = ({ isDarkMode }) => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const detailedServices = {
    web: [
      {
        title: "Enterprise Web Platforms",
        desc: "Scalable, high-performance web applications built for the future of business.",
        icon: "fas fa-globe",
        features: ["Micro-frontends", "Server-side Rendering", "Global CDN", "Auth Systems"],
        tech: ["Next.js", "TypeScript", "Vercel", "Supabase"]
      },
      {
        title: "E-Commerce Engines",
        desc: "Custom-built shopping experiences that convert visitors into loyal customers.",
        icon: "fas fa-cart-shopping",
        features: ["Headless Commerce", "One-click Checkout", "Inventory Sync", "Analytics"],
        tech: ["Shopify", "Stripe", "Hydrogen", "Medusa"]
      }
    ],
    marketing: [
      {
        title: "SEO & Growth",
        desc: "Dominating search engine results through technical SEO and content authority.",
        icon: "fas fa-magnifying-glass-chart",
        features: ["Technical Audit", "Keyword Mastery", "Backlink Strategy", "Content Plan"],
        tech: ["Ahrefs", "Semrush", "Google Analytics", "Search Console"]
      },
      {
        title: "Paid Performance",
        desc: "ROI-driven advertising campaigns across Google, Meta, and LinkedIn.",
        icon: "fas fa-bullseye",
        features: ["A/B Testing", "Retargeting Funnels", "Copywriting", "Creative Assets"],
        tech: ["Ads Manager", "Tag Manager", "Looker Studio", "Hotjar"]
      }
    ],
    design: [
      {
        title: "Visual Identity",
        desc: "Crafting iconic brand stories through world-class graphic design and art direction.",
        icon: "fas fa-pen-nib",
        features: ["Logo Systems", "Brand Guidelines", "Visual Strategy", "Illustration"],
        tech: ["Adobe CC", "Procreate", "Figma", "Canva Pro"]
      },
      {
        title: "Premium UI/UX",
        desc: "User journeys that feel like magic. Intuitive, accessible, and breathtaking.",
        icon: "fas fa-bezier-curve",
        features: ["Prototyping", "User Research", "Interaction Design", "Design Systems"],
        tech: ["Figma", "Framer", "Rive", "Principle"]
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Services Hero with Slider Background */}
      <section id="all-services" className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
                index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className={`w-full h-full bg-cover bg-center transition-transform duration-[12000ms] ease-linear ${
                  index === currentHeroSlide ? 'scale-125' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${slide})` }}
              />
            </div>
          ))}
          <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? 'bg-black/75' : 'bg-white/85'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isDarkMode ? 'to-black' : 'to-white'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-coral/30 bg-coral/10 text-coral text-xs font-black uppercase tracking-[0.4em] fade-in shadow-lg shadow-coral/20">
            Infinite Capabilities
          </div>
          <h1 className={`text-6xl md:text-9xl font-black tracking-tighter leading-none fade-in delay-100 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Explore Our <br /> <span className="text-coral">Digital Services</span>
          </h1>
          <p className={`max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed fade-in delay-200 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
            From technical engineering to creative marketing, we cover the entire digital spectrum with precision.
          </p>
          
          <div className="flex justify-center pt-8 fade-in delay-300">
             <button className="px-12 py-6 bg-coral hover:bg-[#ff4d4d] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-coral/30 hover:scale-110 hover:-translate-y-1 transition-all active:scale-95">
               Start Your Project
             </button>
          </div>
        </div>
      </section>

      {/* Section 1: Web Development Excellence */}
      <section id="web-dev" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 fade-in">
            <div className="space-y-4">
              <span className="text-coral font-black uppercase tracking-widest text-xs">Innovation Hub</span>
              <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Web & Software <br /> <span className="opacity-40 italic">Engineering</span>
              </h2>
            </div>
            <p className={`max-w-md text-lg ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              We build architectures that are as robust as they are beautiful, ensuring your brand stays fast and scalable.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {detailedServices.web.map((s, idx) => (
              <DetailedServiceCard key={idx} {...s} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Premium Graphic Design */}
      <section id="graphic-design" className="py-32 px-6 relative overflow-hidden">
        <div className={`absolute inset-0 z-0 opacity-10 transition-colors duration-700 ${isDarkMode ? 'bg-coral/5' : 'bg-gray-100'}`}></div>
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4 fade-in">
            <span className="text-coral font-black uppercase tracking-widest text-xs">Creative Studio</span>
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Visual Identity & <span className="text-coral">Design Systems</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {detailedServices.design.map((s, idx) => (
              <DetailedServiceCard key={idx} {...s} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Digital Marketing & Growth */}
      <section id="digital-marketing" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row-reverse justify-between items-end gap-8 fade-in">
            <div className="space-y-4 text-right">
              <span className="text-coral font-black uppercase tracking-widest text-xs">Growth Engineering</span>
              <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Digital Marketing <br /> <span className="opacity-40 italic">& SEO Mastery</span>
              </h2>
            </div>
            <p className={`max-w-md text-lg text-left ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              We don't just find visitors; we find your future loyal community through data-backed marketing strategies.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {detailedServices.marketing.map((s, idx) => (
              <DetailedServiceCard key={idx} {...s} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className={`text-5xl md:text-7xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Strategic <span className="text-coral">Partnership</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Select the level of engagement that fits your current growth phase.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "2.5k", desc: "Perfect for startups needing a rapid digital foundation.", color: "bg-blue-500" },
              { name: "Professional", price: "7.5k", desc: "Designed for scaling brands requiring complex systems.", color: "bg-coral" },
              { name: "Enterprise", price: "Custom", desc: "Complete digital transformation for global corporations.", color: "bg-purple-600" }
            ].map((pkg, i) => (
              <div key={i} className={`p-12 rounded-[3rem] border transition-all duration-500 hover:-translate-y-4 hover:border-coral/30
                ${isDarkMode ? 'bg-gray-900/40 border-white/5 shadow-2xl shadow-black' : 'bg-white border-gray-100 shadow-2xl shadow-slate-200/50'}`}>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-8 inline-block ${pkg.color}`}>
                  {pkg.name}
                </span>
                <div className="mb-8">
                  <span className={`text-5xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {pkg.price !== 'Custom' ? `$${pkg.price}` : pkg.price}
                  </span>
                  {pkg.price !== 'Custom' && <span className="text-gray-500 text-sm font-bold ml-2">/ month</span>}
                </div>
                <p className={`mb-10 text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{pkg.desc}</p>
                <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95
                  ${i === 1 ? 'bg-coral text-white shadow-xl shadow-coral/30' : (isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-900 text-white hover:bg-slate-800')}`}>
                  Select {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className={`max-w-5xl mx-auto p-16 md:p-24 rounded-[4rem] text-center space-y-10 relative overflow-hidden group
          ${isDarkMode ? 'bg-coral text-white shadow-2xl shadow-coral/20' : 'bg-slate-900 text-white shadow-2xl'}`}>
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">Ready to start?</h2>
            <p className="text-xl opacity-80 font-medium">Get a free consultation today and find out how we can transform your digital footprint.</p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <button className="px-12 py-6 bg-white text-slate-900 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-110 active:scale-95 transition-all">
                Contact Our Experts
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity">
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-shimmering-blue-dots-40502-large.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ServicesPage;
