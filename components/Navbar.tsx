
import React, { useState } from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact', sectionId?: string) => void;
  currentView: 'home' | 'services' | 'about' | 'contact';
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const services = [
    { name: "All Expertise", icon: "fas fa-layer-group", desc: "Our complete capability map.", id: "all-services", color: "text-blue-400" },
    { name: "Web Engineering", icon: "fas fa-code", desc: "High-performance platforms.", id: "web-dev", color: "text-emerald-400" },
    { name: "Graphic Design", icon: "fas fa-wand-magic-sparkles", desc: "Visual identity & branding.", id: "graphic-design", color: "text-purple-400" },
    { name: "Digital Growth", icon: "fas fa-rocket", desc: "SEO & performance marketing.", id: "digital-marketing", color: "text-orange-400" },
  ];

  const handleNavigate = (view: any, id?: string) => {
    onNavigate(view, id);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 glass h-20 transition-all duration-500 ${isDropdownOpen ? 'bg-black/10' : ''}`}>
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
          <div className={`hidden lg:flex items-center gap-10 h-full font-bold text-[13px] uppercase tracking-widest transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <button 
              onClick={() => handleNavigate('home')} 
              className={`hover:text-coral transition-all ${currentView === 'home' ? 'text-coral' : ''}`}
            >
              Home
            </button>

            {/* Services Dropdown Trigger */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => handleNavigate('services')}
                className={`flex items-center gap-2 hover:text-coral transition-all ${currentView === 'services' ? 'text-coral' : ''}`}
              >
                Services <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-[80%] left-1/2 -translate-x-1/2 w-80 pt-4 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible pointer-events-none'}`}>
                <div className={`p-4 rounded-[2rem] border shadow-2xl backdrop-blur-3xl overflow-hidden ${isDarkMode ? 'bg-gray-950/90 border-white/10' : 'bg-white/95 border-gray-100 shadow-slate-200'}`}>
                  <div className="space-y-1">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleNavigate('services', s.id)}
                        className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left group/item
                          ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-500/10 ${s.color} transition-all group-hover/item:scale-110`}>
                          <i className={s.icon}></i>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-black mb-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{s.name}</p>
                          <p className="text-[10px] font-medium text-gray-500 normal-case">{s.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className={`mt-2 p-3 border-t text-center ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                     <button onClick={() => handleNavigate('services')} className="text-[10px] font-black text-coral hover:underline">View All Solutions</button>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleNavigate('about')} 
              className={`hover:text-coral transition-all ${currentView === 'about' ? 'text-coral' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigate('contact')} 
              className={`hover:text-coral transition-all ${currentView === 'contact' ? 'text-coral' : ''}`}
            >
              Contact
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
              className="hidden md:block bg-coral hover:bg-sky-500 text-white px-7 py-3 rounded-full font-bold text-xs transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-sky-500/25"
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
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm transition-transform duration-500 ease-out p-8 flex flex-col shadow-2xl overflow-y-auto
          ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-slate-900'}
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex items-center justify-between mb-10">
            <span className="text-2xl font-black italic">Scalixo</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-gray-100/10 flex items-center justify-center">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            <button onClick={() => handleNavigate('home')} className={`text-2xl font-black text-left ${currentView === 'home' ? 'text-coral' : 'opacity-60'}`}>Home</button>
            
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-coral opacity-100">Our Services</p>
              <div className="grid grid-cols-1 gap-3">
                {services.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => handleNavigate('services', s.id)}
                    className={`flex items-center gap-4 p-3 rounded-2xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}
                  >
                    <i className={`${s.icon} ${s.color}`}></i>
                    <span className="text-sm font-bold">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => handleNavigate('about')} className={`text-2xl font-black text-left ${currentView === 'about' ? 'text-coral' : 'opacity-60'}`}>About</button>
            <button onClick={() => handleNavigate('contact')} className={`text-2xl font-black text-left ${currentView === 'contact' ? 'text-coral' : 'opacity-60'}`}>Contact</button>
          </nav>

          <div className="mt-auto pt-10">
            <button 
              onClick={() => handleNavigate('contact')}
              className="w-full bg-coral text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-coral/20"
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

