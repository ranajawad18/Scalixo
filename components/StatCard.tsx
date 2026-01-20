
import React, { useState, useEffect, useRef } from 'react';

interface StatCardProps {
  number: number;
  suffix: string;
  label: string;
  videoUrl?: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, suffix, label, videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-loops-2753-large.mp4" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);

  const isDarkMode = !document.body.classList.contains('light-mode');

  const animate = (target: number) => {
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * target);
      
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(update);
      }
    };

    animationRef.current = requestAnimationFrame(update);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animate(number);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative p-8 rounded-2xl border transition-all duration-500 cursor-default group overflow-hidden h-full
        ${isHovered 
          ? (isDarkMode ? 'bg-white border-white scale-105 shadow-2xl' : 'bg-white border-coral scale-105 shadow-xl ring-4 ring-coral/5') 
          : (isDarkMode ? 'bg-white/5 border-white/10 shadow-lg' : 'bg-gray-50 border-gray-100 shadow-md')}
      `}
    >
      {/* Card Video Background - Highly visible motion */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-700 
        ${isHovered ? 'opacity-20 grayscale-0' : 'opacity-10 grayscale'}`}>
        <video 
          className="h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-gray-900 via-transparent to-transparent' : 'bg-gradient-to-t from-white via-transparent to-transparent'}`}></div>
      </div>

      <div className="relative z-10">
        <div className={`text-4xl font-black mb-1 transition-colors duration-300 ${isHovered && isDarkMode ? 'text-coral' : 'text-coral'}`}>
          {displayValue}{suffix}
        </div>
        <div className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 
          ${isHovered 
            ? (isDarkMode ? 'text-gray-600' : 'text-gray-900') 
            : (isDarkMode ? 'text-gray-500' : 'text-gray-500')}`}>
          {label}
        </div>
      </div>

      <div className={`absolute -inset-1 bg-gradient-to-tr from-coral/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
    </div>
  );
};

export default StatCard;
