
import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  onNavigate?: (view: 'home' | 'services' | 'about' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, onNavigate }) => {
  return (
    <footer className={`py-20 px-6 border-t transition-colors ${isDarkMode ? 'bg-gray-950 border-white/5' : 'bg-white border-gray-100'}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Logo - Scalixo */}
          <div onClick={() => onNavigate?.('home')} className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-12 h-12 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-green-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform shadow-lg"></div>
               <span className="relative text-white font-black text-2xl italic">S</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className={`text-3xl font-black tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Scali</span>
                <span className="text-3xl font-black tracking-tighter text-coral">xo</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 -mt-1">Scale. Grow. Succeed.</span>
            </div>
          </div>

          {/* Footer Nav */}
          <nav className={`flex flex-wrap justify-center gap-8 font-bold text-xs uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            <button onClick={() => onNavigate?.('home')} className="hover:text-coral transition-colors">Home</button>
            <button onClick={() => onNavigate?.('services')} className="hover:text-coral transition-colors">Services</button>
            <button onClick={() => onNavigate?.('about')} className="hover:text-coral transition-colors">About</button>
            <button onClick={() => onNavigate?.('contact')} className="hover:text-coral transition-colors">Contact</button>
            <a href="#" className="hover:text-coral transition-colors">Portfolio</a>
            <a href="#" className="hover:text-coral transition-colors">Privacy</a>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/Scalixo" target="_blank" rel="noopener noreferrer" 
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:bg-coral hover:text-white hover:border-coral hover:-translate-y-1
                ${isDarkMode ? 'border-white/10 text-white bg-white/5' : 'border-gray-200 text-slate-900 bg-gray-50 shadow-sm'}`}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://github.com/ranajawad18" target="_blank" rel="noopener noreferrer" 
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:bg-coral hover:text-white hover:border-coral hover:-translate-y-1
                ${isDarkMode ? 'border-white/10 text-white bg-white/5' : 'border-gray-200 text-slate-900 bg-gray-50 shadow-sm'}`}>
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/jawad-qadeer-a54a65330/" target="_blank" rel="noopener noreferrer" 
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:bg-coral hover:text-white hover:border-coral hover:-translate-y-1
                ${isDarkMode ? 'border-white/10 text-white bg-white/5' : 'border-gray-200 text-slate-900 bg-gray-50 shadow-sm'}`}>
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:bg-coral hover:text-white hover:border-coral hover:-translate-y-1
                ${isDarkMode ? 'border-white/10 text-white bg-white/5' : 'border-gray-200 text-slate-900 bg-gray-50 shadow-sm'}`}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className={`pt-12 border-t flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <p className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
            &copy; {new Date().getFullYear()} Scalixo Digital Agency. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Systems Online | HQ Okara</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
