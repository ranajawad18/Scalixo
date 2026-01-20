
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'about' | 'contact'>('home');

  const slides = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
  const navigate = (view: 'home' | 'services' | 'about' | 'contact', sectionId?: string) => {
    setCurrentView(view);
    
    // Use timeout to allow component to mount before scrolling
    setTimeout(() => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Global Cinematic Image Slider Background */}
      <div className="fixed inset-0 z-[-2] bg-black overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-40 scale-100' : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'opacity-1.5s ease-in-out, transform-10s linear'
            }}
          />
        ))}
        <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? 'bg-black/40' : 'bg-white/10'}`}></div>
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isDarkMode ? 'to-black' : 'to-white'}`}></div>
      </div>

      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleDarkMode} 
        onNavigate={navigate}
        currentView={currentView}
      />
      
      <main className="relative z-10">
        {currentView === 'home' && <LandingPage isDarkMode={isDarkMode} />}
        {currentView === 'services' && <ServicesPage isDarkMode={isDarkMode} />}
        {currentView === 'about' && <AboutPage isDarkMode={isDarkMode} />}
        {currentView === 'contact' && <ContactPage isDarkMode={isDarkMode} />}
      </main>

      {/* Subtle depth gradient */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-60 bg-[radial-gradient(circle_at_30%_30%,rgba(255,94,94,0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.05)_0%,transparent_50%)]"></div>
    </div>
  );
};

export default App;
