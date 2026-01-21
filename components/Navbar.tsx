
import React, { useState } from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact', sectionId?: string) => void;
  currentView: 'home' | 'services' | 'about' | 'contact';
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { name: "Digital All Services", icon: "fas fa-cubes-stacked", desc: "Full-scale digital transformation.", color: "text-blue-400", bg: "bg-blue-500/10", id: "all-services" },
    { name: "Web Development", icon: "fas fa-laptop-code", desc: "Performance-optimized platforms.", color: "text-emerald-400", bg: "bg-emerald-500/10", id: "web-dev" },
    { name: "Graphic Design", icon: "fas fa-wand-magic-sparkles", desc: "Premium brand identity & UI/UX.", color: "text-purple-400", bg: "bg-purple-500/10", id: "graphic-design" },
    { name: "Digital Marketing", icon: "fas fa-rocket", desc: "Growth-focused marketing.", color: "text-orange-400", bg: "bg-orange-500/10", id: "digital-marketing" },
  ];

  const handleNavigate = (view: any, id?: string) => {
    onNavigate(view, id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 glass h-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-green-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform shadow-lg opacity-80"></div>
               <span className="relative text-white font-black text-xl italic">S</span>
            </div>
            <div className="flex items-center">
              <span className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Scali</span>
              <span className="text-xl md:text-2xl font-black tracking-tight text-coral">xo</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center gap-8 h-full font-semibold text-sm transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <button onClick={() => handleNavigate('home')} className={`flex items-center gap-2 transition-all duration-300 ${currentView === 'home' ? 'text-coral' : 'hover:text-coral'}`}>
              <i className="fas fa-home-alt opacity-70"></i> Home
            </button>
            <button onClick={() => handleNavigate('services')} className={`flex items-center gap-2 transition-all duration-300 ${currentView === 'services' ? 'text-coral' : 'hover:text-coral'}`}>
              <i className="fas fa-grid-2 opacity-70"></i> Services
            </button>
            <button onClick={() => handleNavigate('about')} className={`flex items-center gap-2 transition-all duration-300 ${currentView === 'about' ? 'text-coral' : 'hover:text-coral'}`}>
              <i className="fas fa-info-circle opacity-70"></i> About
            </button>
            <button onClick={() => handleNavigate('contact')} className={`flex items-center gap-2 transition-all duration-300 ${currentView === 'contact' ? 'text-coral' : 'hover:text-coral'}`}>
              <i className="fas fa-envelope opacity-70"></i> Contact
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={onToggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-gray-100 text-indigo-600 hover:bg-gray-200 shadow-md'}`}
            >
              <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            
            <button 
              onClick={() => handleNavigate('contact')}
              className="hidden md:block bg-coral hover:bg-sky-500 text-white px-7 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-sky-500/25"
            >
              Get Started
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <i className="fas fa-bars-staggered text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-sm transition-transform duration-500 ease-out p-8 flex flex-col shadow-2xl
          ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-slate-900'}
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex items-center justify-between mb-12">
            <span className="text-2xl font-black italic">Scalixo</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-gray-100/10 flex items-center justify-center">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {[
              { id: 'home', label: 'Home', icon: 'fa-home-alt' },
              { id: 'services', label: 'Services', icon: 'fa-grid-2' },
              { id: 'about', label: 'About', icon: 'fa-info-circle' },
              { id: 'contact', label: 'Contact', icon: 'fa-envelope' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id as any)}
                className={`flex items-center gap-4 text-xl font-black transition-colors ${currentView === link.id ? 'text-coral' : 'opacity-60 hover:opacity-100'}`}
              >
                <i className={`fas ${link.icon} text-sm text-coral`}></i>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10">
            <button 
              onClick={() => handleNavigate('contact')}
              className="w-full bg-coral text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-coral/20"
            >
              Start Project
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
