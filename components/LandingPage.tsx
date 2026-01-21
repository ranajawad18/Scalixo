
import React, { useEffect, useState, useRef } from 'react';
import StatCard from './StatCard';
import ServicesSection from './ServicesSection';
import WhyChooseUs from './WhyChooseUs';
import ProcessSection from './ProcessSection';
import PortfolioSection from './PortfolioSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

interface LandingPageProps {
  isDarkMode: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode }) => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Premium Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 min-h-[90vh] flex items-center overflow-hidden">
        
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${index === currentHeroSlide ? 'opacity-100' : 'opacity-0'}`}>
              <div 
                className={`w-full h-full bg-cover bg-center transition-transform duration-[12000ms] ease-linear ${index === currentHeroSlide ? 'scale-125 translate-x-4' : 'scale-100 translate-x-0'}`}
                style={{ backgroundImage: `url(${slide})` }}
              />
            </div>
          ))}
          <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? 'bg-black/75' : 'bg-white/85'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r ${isDarkMode ? 'from-black via-black/40 to-transparent' : 'from-white via-white/40 to-transparent'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black to-transparent' : 'from-white to-transparent'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 text-center lg:text-left">
          
          {/* Left Column */}
          <div 
            className="space-y-6 md:space-y-8 fade-in"
            style={{ transform: window.innerWidth >= 1024 ? `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` : 'none' }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-500 mx-auto lg:mx-0
              ${isDarkMode ? 'border-coral/30 bg-coral/10 text-coral shadow-lg' : 'border-coral/20 bg-coral/5 text-coral'}
              text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em]`}>
              <i className="fas fa-bolt-lightning text-[10px] animate-pulse"></i> Next-Gen Creative Partner
            </div>

            <h1 className={`text-5xl md:text-8xl xl:text-9xl font-black leading-[1.1] md:leading-[0.95] tracking-tighter transition-colors
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Design <br />
              <span className="text-coral">The Future</span>
            </h1>

            <p className={`max-w-xl mx-auto lg:mx-0 text-base md:text-2xl leading-relaxed transition-colors font-medium
              ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              We engineer high-performance software and luxury digital identities for industry leaders who refuse to settle.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5 pt-4 md:pt-6">
              <button className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 bg-coral hover:bg-[#ff4d4d] text-white rounded-full font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-coral/40 hover:scale-105 active:scale-95 group">
                Start a Project <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-2 transition-transform"></i>
              </button>
              <button className={`w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 bg-transparent border-2 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3
                ${isDarkMode ? 'border-white/20 hover:border-coral/50 hover:bg-coral/10 text-white backdrop-blur-md' : 'border-slate-200 hover:border-slate-900 text-slate-900 backdrop-blur-sm'}`}>
                <i className="fas fa-play text-[10px]"></i> View Reel
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 pt-8 md:pt-10 opacity-60 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <div className="flex gap-1 text-coral text-[8px] md:text-[10px]">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">5.0 Industry Rating</span>
              </div>
              <div className="hidden sm:block h-8 w-px bg-current opacity-20"></div>
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <span className="text-lg md:text-xl font-black">250+</span>
                <span className="text-[9px] font-black uppercase tracking-widest">Global Launches</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div 
            className="relative fade-in group transition-all duration-300 ease-out mt-10 lg:mt-0"
            style={{ 
              transform: window.innerWidth >= 1024 ? `perspective(1000px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)` : 'none'
            }}
          >
            <div className={`relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border-[8px] md:border-[12px] shadow-2xl transform transition-all duration-700
              ${isDarkMode ? 'border-white/10 bg-gray-900' : 'border-white bg-gray-100'}`}>
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-loops-2753-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> Live HQ Feed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Background Text */}
        <div className={`hidden lg:block absolute bottom-10 right-10 text-[12vw] font-black leading-none opacity-[0.03] select-none pointer-events-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          CREATIVE
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-6 -mt-10 md:-mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="fade-in grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard number={250} suffix="+" label="Premium Projects" />
            <StatCard number={100} suffix="%" label="Client Satisfaction" />
            <StatCard number={15} suffix="+" label="Industry Awards" />
            <StatCard number={24} suffix="/7" label="VIP Support" />
          </div>
        </div>
      </section>

      <ServicesSection isDarkMode={isDarkMode} />
      <WhyChooseUs isDarkMode={isDarkMode} />
      <ProcessSection isDarkMode={isDarkMode} />
      <PortfolioSection isDarkMode={isDarkMode} />
      <ContactSection isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;
