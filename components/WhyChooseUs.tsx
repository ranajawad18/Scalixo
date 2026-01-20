
import React, { useState, useEffect } from 'react';

interface FeatureItemProps {
  title: string;
  desc: string;
  icon: string;
  iconColor: string;
  videoUrl: string;
  isDarkMode: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, desc, icon, iconColor, videoUrl, isDarkMode }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({ x: (y - centerY) / 10, y: (centerX - x) / 10 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden h-full cursor-default
        ${isDarkMode 
          ? 'bg-gray-900/30 border-white/5 hover:border-coral/40 backdrop-blur-xl shadow-2xl' 
          : 'bg-white/70 border-gray-100 hover:border-coral/30 shadow-sm hover:shadow-2xl backdrop-blur-md'}`}
    >
      
      {/* Moving Sheen Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sheen_1.5s_infinite] transition-all duration-1000"></div>
      </div>

      {/* Background Video */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 
        ${isDarkMode ? 'opacity-10 group-hover:opacity-40' : 'opacity-5 group-hover:opacity-20'}`}>
        <video className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
          ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'}`}>
          <i className={`${icon} ${iconColor} text-xl`}></i>
        </div>
        <h3 className={`text-base font-extrabold mb-2 transition-colors group-hover:text-coral ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        <p className={`text-xs font-medium leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-slate-500 group-hover:text-slate-800'}`}>
          {desc}
        </p>
      </div>

      {/* Hover Glow Corner */}
      <div className={`absolute -bottom-10 -right-10 w-20 h-20 blur-3xl rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-40 bg-coral`}></div>
    </div>
  );
};

const WhyChooseUs: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [currentBg, setCurrentBg] = useState(0);
  const bgImages = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentBg((prev) => (prev + 1) % bgImages.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: "Award-Winning Quality",
      desc: "Consistently delivering excellence recognized by industry leaders and satisfied clients.",
      icon: "fas fa-award",
      iconColor: "text-orange-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-award-statue-rotating-on-a-black-background-40509-large.mp4"
    },
    {
      title: "On-Time Delivery",
      desc: "We respect deadlines and deliver projects on schedule, every time without compromise.",
      icon: "fas fa-clock",
      iconColor: "text-emerald-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-clock-moving-fast-41716-large.mp4"
    },
    {
      title: "Expert Team",
      desc: "Highly skilled professionals with years of experience in cutting-edge digital technologies.",
      icon: "fas fa-users-gear",
      iconColor: "text-blue-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-people-shaking-hands-close-up-1025-large.mp4"
    },
    {
      title: "Secure & Reliable",
      desc: "Enterprise-grade security measures and 99.9% uptime guarantee for all our solutions.",
      icon: "fas fa-shield-halved",
      iconColor: "text-purple-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-padlock-security-concept-animation-40507-large.mp4"
    },
    {
      title: "High Performance",
      desc: "Optimized solutions that deliver lightning-fast performance and seamless scalability.",
      icon: "fas fa-bolt",
      iconColor: "text-rose-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-lines-and-dots-connecting-in-the-dark-40501-large.mp4"
    },
    {
      title: "ROI Focused",
      desc: "Solutions designed to maximize your return on investment and drive business growth.",
      icon: "fas fa-chart-line",
      iconColor: "text-indigo-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-woman-analyzing-data-on-a-digital-screen-40523-large.mp4"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((img, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-[3000ms] ${i === currentBg ? 'opacity-10' : 'opacity-0'}`}>
            <div className="w-full h-full bg-cover bg-center animate-pulse" style={{ backgroundImage: `url(${img})` }} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Large Visual Card */}
        <div className="relative fade-in">
          <div className={`absolute -top-4 -left-4 w-full h-full rounded-[2.5rem] border opacity-20 ${isDarkMode ? 'border-white' : 'border-slate-300'}`}></div>
          <div className={`absolute top-4 left-4 w-full h-full rounded-[2.5rem] border opacity-10 ${isDarkMode ? 'border-white' : 'border-slate-400'}`}></div>
          
          <div className={`group relative aspect-square md:aspect-auto md:h-[600px] rounded-[2.5rem] overflow-hidden border shadow-2xl flex flex-col items-center justify-center p-12 transition-all duration-700
            ${isDarkMode ? 'bg-gray-900/60 border-white/10 shadow-black/50 backdrop-blur-2xl' : 'bg-white border-gray-100 shadow-slate-200/50 backdrop-blur-xl'}`}>
            
            {/* Moving Sheen for Big Card */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sheen_2s_infinite]"></div>
            </div>

            <div className={`absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000`}>
              <video className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000" autoPlay loop muted playsInline>
                <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-shimmering-blue-dots-40502-large.mp4" type="video/mp4" />
              </video>
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/60' : 'bg-white/40'}`}></div>
            </div>

            <div className="relative z-10 text-center space-y-4">
              <h4 className="text-8xl md:text-[10rem] font-black text-coral leading-none tracking-tighter drop-shadow-2xl transition-transform group-hover:scale-110 duration-700">99%</h4>
              <p className={`text-xl md:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Client Satisfaction
              </p>
            </div>

            <div className="absolute top-8 right-0 translate-x-1/4 bg-coral text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-coral/30 animate-float">
              Premium Quality
            </div>
            <div className="absolute bottom-12 left-0 -translate-x-1/4 bg-coral text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-coral/30 animate-float [animation-delay:1s]">
              Expert Team
            </div>
          </div>
        </div>

        {/* Right Side: Header & Grid */}
        <div className="space-y-10 fade-in">
          <div className="space-y-4">
            <span className="text-coral font-bold uppercase tracking-[0.3em] text-[10px]">Why Choose Us</span>
            <h2 className={`text-4xl md:text-6xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Excellence in Every <br /> Detail
            </h2>
            <p className={`text-lg leading-relaxed max-w-lg ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              We don't just build solutions; we craft experiences that drive results and exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <FeatureItem key={idx} {...feature} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
