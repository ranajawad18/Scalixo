import React, { useState } from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact', sectionId?: string) => void;
  currentView: 'home' | 'services' | 'about' | 'contact';
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    { 
      name: "Digital All Services", 
      icon: "fas fa-cubes-stacked", 
      desc: "Full-scale digital transformation and brand strategy.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      id: "all-services"
    },
    { 
      name: "Web Development", 
      icon: "fas fa-laptop-code", 
      desc: "Performance-optimized web platforms and SaaS.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      id: "web-dev"
    },
    { 
      name: "Graphic Design", 
      icon: "fas fa-wand-magic-sparkles", 
      desc: "Premium brand identity and award-winning UI/UX.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      id: "graphic-design"
    },
    { 
      name: "Digital Marketing", 
      icon: "fas fa-rocket", 
      desc: "Growth-focused marketing and ROI-driven SEO.",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      id: "digital-marketing"
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Logo - Scalixo */}
        <div 
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-green-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform shadow-lg opacity-80"></div>
             <span className="relative text-white font-black text-xl italic">S</span>
          </div>
          <div className="flex items-center">
            <span className={`text-2xl font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Scali</span>
            <span className="text-2xl font-black tracking-tight text-coral">xo</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden lg:flex items-center gap-8 h-full font-semibold text-sm transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <button 
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-2 transition-all duration-300 ${currentView === 'home' ? 'text-coral' : 'hover:text-coral'}`}
          >
            <i className="fas fa-home-alt opacity-70"></i> Home
          </button>
          
          <div className="relative group h-full flex items-center">
            <button 
              onClick={() => onNavigate('services')}
              className={`flex items-center gap-2 transition-colors ${currentView === 'services' ? 'text-coral' : 'group-hover:text-coral'}`}
            >
              <i className="fas fa-grid-2 opacity-70"></i> Services 
              <i className="fas fa-chevron-down text-[10px] transition-transform duration-300 group-hover:rotate-180"></i>
            </button>
            
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-full h-10 bg-transparent"></div>

            <div className={`absolute top-[calc(100%-5px)] left-1/2 -translate-x-1/2 w-[540px] invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out
                ${isDarkMode 
                  ? 'bg-[#0a0a0c]/90 border-white/10 shadow-black/80' 
                  : 'bg-white/95 border-gray-200 shadow-gray-200/50'} border rounded-[2rem] p-6 shadow-2xl`}
            >
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <button 
                    key={index}
                    onClick={() => onNavigate('services', service.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all group/item border border-transparent text-left
                      ${isDarkMode ? 'hover:bg-white/[0.03] hover:border-white/5' : 'hover:bg-gray-50 hover:border-gray-100'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center text-xl ${service.color} group-hover/item:scale-110 transition-transform shadow-lg`}>
                      <i className={service.icon}></i>
                    </div>
                    <div className="flex-1">
                      <div className={`text-[15px] font-bold group-hover/item:text-coral transition-colors ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {service.name}
                      </div>
                      <div className={`text-xs leading-snug mt-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {service.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('about')}
            className={`flex items-center gap-2 transition-all duration-300 ${currentView === 'about' ? 'text-coral' : 'hover:text-coral'}`}
          >
            <i className="fas fa-info-circle opacity-70"></i> About
          </button>
          
          <button 
            onClick={() => onNavigate('contact')}
            className={`flex items-center gap-2 transition-all duration-300 ${currentView === 'contact' ? 'text-coral' : 'hover:text-coral'}`}
          >
            <i className="fas fa-envelope opacity-70"></i> Contact
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleTheme}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-gray-100 text-indigo-600 hover:bg-gray-200 shadow-md'}`}
          >
            <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
          
          <button 
            onClick={() => onNavigate('contact')}
            className="hidden md:block bg-coral hover:bg-sky-500 text-white px-7 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-sky-500/25"
          >
            Get Started
          </button>
          
          {/* Hamburger for mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <i className="fas fa-bars-staggered text-xl"></i>
          </button>
        </div>
      </div>

    {/* Mobile Sidebar Menu */}
{isMobileMenuOpen && (
  <div className="fixed inset-0 z-50 lg:hidden flex">
    {/* Background overlay */}
    <div 
      className="fixed inset-0 bg-black/70" 
      onClick={() => setMobileMenuOpen(false)}
    ></div>

    {/* Sidebar */}
    <div 
      className="relative bg-white/20 w-64 min-h-full shadow-xl flex flex-col pt-6"
      style={{ animation: 'slideIn 0.3s ease-out forwards' }}
    >
      {/* Close Button */}
      <button 
        onClick={() => setMobileMenuOpen(false)}
        className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-white/10 rounded-full transition"
      >
        &times;
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col bg-white/20 mt-10 gap-4 px-4">
        <button 
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
          className="text-white text-xl py-2 px-2 text-left hover:bg-white/10 rounded transition"
        >
          Home
        </button>
        <button 
          onClick={() => { onNavigate('services'); setMobileMenuOpen(false); }} 
          className="text-white text-xl py-2 px-2 text-left hover:bg-white/10 rounded transition"
        >
          Services
        </button>
        <button 
          onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} 
          className="text-white text-xl py-2 px-2 text-left hover:bg-white/10 rounded transition"
        >
          About
        </button>
        <button 
          onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} 
          className="text-white text-xl py-2 px-2 text-left hover:bg-white/10 rounded transition"
        >
          Contact
        </button>
      </nav>

      {/* Inline keyframes for animation */}
      <style>{`
        @keyframes slideIn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  </div>
)}


    </nav>
  );
};

export default Navbar;
