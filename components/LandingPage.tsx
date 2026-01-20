
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
      if (!heroRef.current) return;
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
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Premium Hero Section with Integrated Slider */}
      <section ref={heroRef} className="relative pt-40 pb-32 px-6 min-h-[95vh] flex items-center overflow-hidden perspective-1000">
        
        {/* Background Slider with Ken Burns Effect */}
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
                  index === currentHeroSlide ? 'scale-125 translate-x-4' : 'scale-100 translate-x-0'
                }`}
                style={{ backgroundImage: `url(${slide})` }}
              />
            </div>
          ))}
          {/* Overlays for depth and contrast */}
          <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? 'bg-black/75' : 'bg-white/85'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-black via-black/40 to-transparent' : 'from-white via-white/40 to-transparent'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black to-transparent' : 'from-white to-transparent'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Column: Text Content with Parallax */}
          <div 
            className="text-left space-y-8 fade-in"
            style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
          >
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-500
              ${isDarkMode ? 'border-coral/30 bg-coral/10 text-coral shadow-lg shadow-coral/10' : 'border-coral/20 bg-coral/5 text-coral shadow-sm'}
              text-[11px] font-black uppercase tracking-[0.3em]`}>
              <i className="fas fa-bolt-lightning text-[10px] animate-pulse"></i> Next-Gen Creative Partner
            </div>

            <h1 className={`text-6xl md:text-8xl xl:text-9xl font-black leading-[0.95] tracking-tighter transition-colors
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Design <br />
              <span className="text-coral">The Future</span>
            </h1>

            <p className={`max-w-xl text-lg md:text-2xl leading-relaxed transition-colors font-medium
              ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              We engineer high-performance software and luxury digital identities for industry leaders who refuse to settle.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
              <button className="w-full sm:w-auto px-12 py-6 bg-coral hover:bg-[#ff4d4d] text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-coral/40 hover:scale-110 hover:-translate-y-1 active:scale-95 group">
                Start a Project <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-2 transition-transform"></i>
              </button>
              <button className={`w-full sm:w-auto px-12 py-6 bg-transparent border-2 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-110 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3
                ${isDarkMode ? 'border-white/20 hover:border-coral/50 hover:bg-coral/10 text-white backdrop-blur-md' : 'border-slate-200 hover:border-slate-900 text-slate-900 backdrop-blur-sm'}`}>
                <i className="fas fa-play text-[10px]"></i> View Reel
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className={`flex items-center gap-8 pt-10 opacity-60 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-coral text-[10px]">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">5.0 Industry Rating</span>
              </div>
              <div className="h-8 w-px bg-current opacity-20"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-black">250+</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Global Launches</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Video Container with 3D Hover Tilt */}
          <div 
            className="relative fade-in group lg:pl-10 transition-all duration-300 ease-out"
            style={{ 
              transform: `perspective(1000px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)`,
              filter: `drop-shadow(${mousePos.x * -20}px ${mousePos.y * -20}px 30px rgba(255, 94, 94, 0.1))`
            }}
          >
            {/* Outer Glow */}
            <div className={`absolute -inset-10 rounded-[4rem] blur-[80px] opacity-0 group-hover:opacity-40 bg-coral transition-opacity duration-700`}></div>
            
            <div className={`relative aspect-video rounded-[3rem] overflow-hidden border-[12px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] transform transition-all duration-700
              ${isDarkMode ? 'border-white/10 bg-gray-900 shadow-black' : 'border-white bg-gray-100 shadow-slate-300'}`}>
              
              <video 
                className="w-full h-full object-cover" 
                autoPlay 
                loop 
                muted 
                playsInline
                poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-lines-and-dots-in-dark-blue-40502-large.mp4" type="video/mp4" />
              </video>
              
              {/* Video Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              
              <div className="absolute top-6 left-6">
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> Live HQ Feed
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between translate-z-20">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-coral drop-shadow-lg">Featured Module</span>
                  <h4 className="text-2xl font-black text-white tracking-tighter drop-shadow-2xl">Lumina AI Ecosystem</h4>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center hover:bg-coral hover:border-coral transition-all cursor-pointer shadow-lg shadow-black/20">
                  <i className="fas fa-play text-sm ml-1"></i>
                </div>
              </div>
            </div>
            
            {/* Modern Corner Decals */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-coral/40 rounded-tl-[3.5rem] -z-10 transition-all duration-700"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-coral/40 rounded-br-[3.5rem] -z-10 transition-all duration-700"></div>
          </div>
        </div>

        {/* Floating Background Text Decoration */}
        <div 
          className={`absolute bottom-10 right-10 text-[12vw] font-black leading-none opacity-[0.03] select-none pointer-events-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)` }}
        >
          CREATIVE
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 transition-opacity hover:opacity-100 cursor-pointer
          ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
          Scroll Down
          <div className={`w-6 h-10 rounded-full border-2 flex justify-center p-1.5 ${isDarkMode ? 'border-gray-600' : 'border-slate-300'}`}>
            <div className="w-1 h-2 bg-coral rounded-full mouse-scroll"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Refined */}
      <section className={`px-6 -mt-16 relative z-20`}>
        <div className="max-w-7xl mx-auto">
          <div className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
