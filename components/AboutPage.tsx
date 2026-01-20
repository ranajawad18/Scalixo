
import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';

interface AboutPageProps {
  isDarkMode: boolean;
}

const TeamCard: React.FC<{
  name: string;
  role: string;
  image: string;
  isDarkMode: boolean;
}> = ({ name, role, image, isDarkMode }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({ x: (y - centerY) / 10, y: (centerX - x) / 10 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      className={`group relative rounded-[2.5rem] overflow-hidden border transition-all duration-500 aspect-[3/4] cursor-default
        ${isDarkMode ? 'bg-gray-900/40 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h4 className="text-2xl font-black text-white tracking-tighter">{name}</h4>
        <p className="text-coral font-bold uppercase tracking-widest text-[10px] mt-1">{role}</p>
        <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
          <i className="fab fa-linkedin-in text-white/70 hover:text-white cursor-pointer transition-colors"></i>
          <i className="fab fa-twitter text-white/70 hover:text-white cursor-pointer transition-colors"></i>
          <i className="fab fa-instagram text-white/70 hover:text-white cursor-pointer transition-colors"></i>
        </div>
      </div>
    </div>
  );
};

const ValueItem: React.FC<{
  title: string;
  desc: string;
  icon: string;
  isDarkMode: boolean;
}> = ({ title, desc, icon, isDarkMode }) => (
  <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 hover:border-coral/40 group
    ${isDarkMode ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg transition-all group-hover:scale-110 group-hover:-rotate-6
      ${isDarkMode ? 'bg-coral/10 text-coral border border-coral/20' : 'bg-white text-coral border border-gray-100'}`}>
      <i className={icon}></i>
    </div>
    <h3 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{desc}</p>
  </div>
);

const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Expanded Team Array - 24 Members
  const team = [
    { name: "Professor Rai Shahzad Hussain", role: "CEO & Lead Architect", image: "assets/ceo.jpg" },
     { name: "PMS", role: "Ceo Graphics", image: "assets/Graphics Ceo.png" },
      { name: "Haris Sab", role: "Digital Marketing", image: "assets/digital ceo.jpeg" },
       { name: "Muzamil Sab", role: "Wordpress Ceo", image: "assets/wordpress.jpeg" },
     { name: "Jawad Qadeer", role: "Senior Developer", image: "assets/ceo.png" },
    { name: "Junaid Ehtihsam", role: "Web Developer", image: "assets/web4.jpeg" },
    { name: "Fiaz Hussain", role: "web Developer", image: "assets/web3.jpeg" },
    { name: "Zohaib", role: "Web Developer", image: "assets/web1.jpeg" },
    { name: "Khalil Ahmed", role: "Web Developer", image: "assets/web2.jpeg" },
    { name: "Rehman Qureshi", role: "Web Developer", image: "assets/web5.jpeg" },
    { name: "Manan Ahmed", role: "web Developer", image: "assets/Manan.jpeg" },
    { name: "Sheraz Ali", role: "Web Developer", image: "assets/web.jpeg" },
    { name: "Faizan", role: "Visuals Graphics", image: "assets/graphic2.jpeg" },
    { name: "Azhar ", role: "Senior Graphics Designer", image: "assets/designer.jpeg" },
    { name: "Shahbram", role: "Deigner", image: "assets/graphic.jpg" },
    { name: "Haseeb Umar", role: "Deigner", image: "assets/graphic1.jpeg" },
    { name: "Waqas", role: "Lead Designer", image: "assets/waqas.png" },
    { name: "Fakhar Ali", role: "Graphics Designer", image: "assets/graphic4.jpeg" },
    { name: "Asad Ali", role: "Designer", image: "assets/graphic5.jpg" },
    { name: "Asad", role: "Wordpress", image: "assets/wordpress1.jpeg" },
    { name: "Mubashar", role: "Wordpress", image: "assets/word.jpeg" },
    { name: "Talha Bukhari", role: "Digital Marketing", image: "assets/digital.jpg" },
    { name: "Haseeb Hassan", role: "Digital Marketing", image: "assets/digital1.jpeg" },
    { name: "Mubashar", role: "Graphic", image: "assets/Mubasher.jpeg" },

  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          {slides.map((s, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-[2000ms] ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <div className={`w-full h-full bg-cover bg-center transition-transform duration-[12s] ${i === currentSlide ? 'scale-125' : 'scale-100'}`} style={{ backgroundImage: `url(${s})` }}></div>
            </div>
          ))}
          <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? 'bg-black/75' : 'bg-white/85'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-black via-black/40 to-transparent' : 'from-white via-white/40 to-transparent'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
          <div className="space-y-8 fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-coral/30 bg-coral/10 text-coral text-[10px] font-black uppercase tracking-[0.4em] shadow-lg">Our Story</div>
            <h1 className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              The Heart of <br /> <span className="text-coral">Scalixo</span>
            </h1>
            <p className={`max-w-xl text-xl md:text-2xl font-medium leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              Founded on the intersection of bold aesthetics and technical precision, Scalixo is more than an agency—it's a digital revolution.
            </p>
          </div>
          <div className="hidden lg:block relative fade-in delay-200">
             <div className="aspect-square rounded-[4rem] overflow-hidden border-8 border-white/10 shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Agency Culture" />
                <div className="absolute inset-0 bg-coral/20 mix-blend-overlay"></div>
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-coral rounded-[3rem] p-8 flex flex-col justify-center shadow-2xl animate-float">
                <span className="text-5xl font-black text-white">10+</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest mt-2">Years of Legacy</span>
             </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto fade-in">
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Our <span className="text-coral">Philosophy</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              We believe that every pixel should serve a purpose and every interaction should inspire an action.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueItem icon="fas fa-lightbulb" title="Radical Innovation" desc="We don't follow trends; we engineer the next wave of digital standard." isDarkMode={isDarkMode} />
            <ValueItem icon="fas fa-handshake" title="Deep Partnership" desc="Your success is our heartbeat. We work as an extension of your own vision." isDarkMode={isDarkMode} />
            <ValueItem icon="fas fa-shield-halved" title="Absolute Integrity" desc="Transparency and ethics are the bedrock of everything we create." isDarkMode={isDarkMode} />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 fade-in">
            <div className="space-y-4">
              <span className="text-coral font-black uppercase tracking-widest text-xs">The Collective</span>
              <h2 className={`text-6xl md:text-8xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Meet The <br /> <span className="text-coral">Architects</span>
              </h2>
            </div>
            <p className={`max-w-md text-lg ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              A global powerhouse of {team.length} designers, engineers, and strategists obsessed with perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="fade-in" style={{ transitionDelay: `${idx * 50}ms` }}>
                <TeamCard {...t} isDarkMode={isDarkMode} />
              </div>
            ))}
          </div>
        </div>
        <div className={`absolute top-1/2 left-0 text-[30vw] font-black opacity-[0.03] select-none pointer-events-none -translate-x-1/4 -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          CREW
        </div>
      </section>

      {/* Legacy Timeline */}
      <section className={`py-32 px-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center fade-in">
             <h2 className={`text-4xl md:text-6xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Our Journey</h2>
          </div>
          
          <div className="space-y-12">
            {[
              { year: "2014", title: "The Spark", desc: "Started as a small boutique design studio in a garage." },
              { year: "2018", title: "Digital Expansion", desc: "Successfully scaled to a full-service agency with 20+ experts." },
              { year: "2021", title: "Award Season", desc: "Won multiple industry awards for groundbreaking UI/UX." },
              { year: "2024", title: "Global Reach", desc: "Pioneering AI-driven digital identities for world-class brands." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 group fade-in">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-coral flex items-center justify-center text-white font-black text-xl shadow-xl shadow-coral/30 group-hover:scale-110 transition-transform">
                    {item.year.slice(-2)}
                  </div>
                  <div className="w-0.5 flex-1 bg-coral/20 my-4"></div>
                </div>
                <div className="py-2 space-y-2">
                  <h4 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                  <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className={`max-w-5xl mx-auto p-16 md:p-24 rounded-[4rem] text-center space-y-10 relative overflow-hidden group
          ${isDarkMode ? 'bg-coral text-white shadow-2xl shadow-coral/20' : 'bg-slate-900 text-white shadow-2xl'}`}>
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Become Part of <br /> The Story</h2>
            <p className="text-xl opacity-80 font-medium">Join our roster of world-class clients and redefine what's possible for your brand.</p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <button className="px-12 py-6 bg-white text-slate-900 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-110 active:scale-95 transition-all">
                Let's Collaborate
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity">
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-lines-and-dots-in-dark-blue-40502-large.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default AboutPage;
