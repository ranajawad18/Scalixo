
import React, { useState, useEffect } from 'react';

interface ProcessStep {
  number: number;
  title: string;
  desc: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  videoUrl: string;
}

const StepCard: React.FC<{ step: ProcessStep; isDarkMode: boolean }> = ({ step, isDarkMode }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({ x: (y - centerY) / 15, y: (centerX - x) / 15 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      className="relative group pt-10 transition-transform duration-500 ease-out"
    >
      {/* Step Number Badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-12 h-12 rounded-full bg-coral text-white font-black text-lg flex items-center justify-center shadow-xl shadow-coral/40 group-hover:scale-125 transition-transform duration-500 ease-out border-4 border-black/10">
        {step.number}
      </div>

      <div className={`relative p-10 rounded-[2.5rem] border transition-all duration-700 overflow-hidden h-full flex flex-col items-center text-center cursor-default
        ${isDarkMode 
          ? 'bg-gray-950/40 border-white/5 hover:border-coral/40 backdrop-blur-2xl shadow-2xl' 
          : 'bg-white/90 border-gray-100 hover:border-coral/30 shadow-sm hover:shadow-2xl backdrop-blur-xl'}`}>
        
        {/* Premium Glass Sheen Reflection */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sheen_2.5s_infinite]"></div>
        </div>

        {/* Cinematic Background Video */}
        <div className={`absolute inset-0 z-0 transition-all duration-1000 
          ${isDarkMode ? 'opacity-5 group-hover:opacity-25' : 'opacity-5 group-hover:opacity-15'}`}>
          <video className="w-full h-full object-cover scale-150 group-hover:scale-105 transition-transform duration-1000" autoPlay loop muted playsInline>
            <source src={step.videoUrl} type="video/mp4" />
          </video>
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-gray-950/80 via-transparent to-gray-950/80' : 'bg-gradient-to-b from-white/80 via-transparent to-white/80'}`}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 border
            ${step.bgColor} ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}>
            <i className={`${step.icon} text-white text-2xl`}></i>
          </div>

          <h3 className={`text-xl font-black mb-4 transition-colors group-hover:text-coral tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {step.title}
          </h3>
          <p className={`text-[15px] leading-relaxed transition-colors font-medium px-2 ${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-slate-500 group-hover:text-slate-800'}`}>
            {step.desc}
          </p>
        </div>

        {/* Interactive Border Light Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-coral/20 rounded-[2.5rem] transition-colors duration-700"></div>
      </div>
    </div>
  );
};

const ProcessSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [bgIndex, setBgIndex] = useState(0);
  const processBgs = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
  ];

  useEffect(() => {
    const timer = setInterval(() => setBgIndex(prev => (prev + 1) % processBgs.length), 9000);
    return () => clearInterval(timer);
  }, []);

  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Discovery & Research",
      desc: "We analyze your business needs, target audience, and competitors to create a comprehensive strategy.",
      icon: "fas fa-magnifying-glass",
      iconColor: "text-blue-400",
      bgColor: "bg-sky-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-woman-analyzing-data-on-a-digital-screen-40523-large.mp4"
    },
    {
      number: 2,
      title: "UI/UX Design",
      desc: "Crafting intuitive interfaces and seamless user experiences that engage and convert.",
      icon: "fas fa-pen-nib",
      iconColor: "text-purple-400",
      bgColor: "bg-fuchsia-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-shimmering-blue-dots-40502-large.mp4"
    },
    {
      number: 3,
      title: "Development",
      desc: "Building robust, scalable solutions using cutting-edge technologies and best practices.",
      icon: "fas fa-code",
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"
    },
    {
      number: 4,
      title: "Testing & QA",
      desc: "Rigorous testing ensures flawless performance, security, and cross-platform compatibility.",
      icon: "fas fa-flask",
      iconColor: "text-orange-400",
      bgColor: "bg-amber-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-clock-moving-fast-41716-large.mp4"
    },
    {
      number: 5,
      title: "Deployment",
      desc: "Seamless launch with proper monitoring, documentation, and team training.",
      icon: "fas fa-rocket",
      iconColor: "text-rose-400",
      bgColor: "bg-rose-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-lines-and-dots-connecting-in-the-dark-40501-large.mp4"
    },
    {
      number: 6,
      title: "Maintenance",
      desc: "Ongoing support, updates, and optimization to keep your solution performing at its best.",
      icon: "fas fa-gear",
      iconColor: "text-indigo-400",
      bgColor: "bg-indigo-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-loops-2753-large.mp4"
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {processBgs.map((img, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-[3000ms] ${i === bgIndex ? 'opacity-[0.07]' : 'opacity-0'}`}>
            <div className="w-full h-full bg-cover bg-center animate-pulse" style={{ backgroundImage: `url(${img})` }} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto fade-in">
          <span className="text-coral font-black uppercase tracking-[0.5em] text-[10px] drop-shadow-sm">Our Process</span>
          <h2 className={`text-6xl md:text-8xl font-black tracking-tighter leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            How We Work
          </h2>
          <p className={`text-lg md:text-xl transition-colors leading-relaxed font-medium ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
            A streamlined, transparent process that ensures quality, efficiency, and successful project delivery.
          </p>
        </div>

        {/* Process Grid */}
        <div className="relative">
          <div className={`hidden lg:block absolute top-[48%] left-1/2 -translate-x-1/2 w-[95%] h-0.5 z-0 transition-all duration-700
            ${isDarkMode ? 'bg-coral/30' : 'bg-coral/20'}`}>
            <div className="absolute inset-0 animate-pulse bg-coral/40"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="fade-in" style={{ transitionDelay: `${idx * 100}ms` }}>
                <StepCard step={step} isDarkMode={isDarkMode} />
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coral/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
    </section>
  );
};

export default ProcessSection;
