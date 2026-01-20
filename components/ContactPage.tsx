
import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';

interface ContactPageProps {
  isDarkMode: boolean;
}

const ContactInfoCard: React.FC<{
  title: string;
  value: string;
  icon: string;
  isDarkMode: boolean;
}> = ({ title, value, icon, isDarkMode }) => {
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
      className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 overflow-hidden cursor-default
        ${isDarkMode ? 'bg-gray-900/40 border-white/10 shadow-2xl backdrop-blur-3xl' : 'bg-white border-gray-100 shadow-xl shadow-slate-200/50'}`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg transition-all group-hover:scale-110 group-hover:-rotate-6
        ${isDarkMode ? 'bg-coral/10 text-coral border border-coral/20' : 'bg-white text-coral border border-gray-100'}`}>
        <i className={icon}></i>
      </div>
      <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>{title}</p>
      <h3 className={`text-xl font-black transition-colors group-hover:text-coral ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
      
      <div className="absolute -inset-1 bg-gradient-to-tr from-coral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

const ContactPage: React.FC<ContactPageProps> = ({ isDarkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const slides = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully! Our team will contact you shortly.');
    }, 2000);
  };

  const optionClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-slate-900';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          {slides.map((s, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-[2000ms] ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <div className={`w-full h-full bg-cover bg-center transition-transform duration-[12s] ${i === currentSlide ? 'scale-125' : 'scale-100'}`} style={{ backgroundImage: `url(${s})` }}></div>
            </div>
          ))}
          <div className={`absolute inset-0 transition-colors duration-700 ${isDarkMode ? 'bg-black/75' : 'bg-white/85'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isDarkMode ? 'to-black' : 'to-white'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-coral/30 bg-coral/10 text-coral text-xs font-black uppercase tracking-[0.4em] fade-in shadow-lg shadow-coral/20">
            Let's Collaborate
          </div>
          <h1 className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] fade-in delay-100 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Start Your <br /> <span className="text-coral">Legacy Today</span>
          </h1>
          <p className={`max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed fade-in delay-200 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
            Ready to design the future? Our architects are waiting to hear about your next big project.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 px-6 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details (Left Side - 4 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="fade-in space-y-6">
              <ContactInfoCard icon="fas fa-location-dot" title="Headquarters" value="Okara, Punjab, Pakistan" isDarkMode={isDarkMode} />
              <ContactInfoCard icon="fas fa-phone" title="Direct Line" value="+92 319 0603710" isDarkMode={isDarkMode} />
              <ContactInfoCard icon="fas fa-envelope" title="Inquiries" value="jawadrana8660@gmail.com" isDarkMode={isDarkMode} />
              <ContactInfoCard icon="fas fa-headset" title="Support" value="24/7 VIP Channels" isDarkMode={isDarkMode} />
            </div>

            {/* Social Connection */}
            <div className={`p-10 rounded-[2.5rem] border fade-in delay-300
              ${isDarkMode ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
              <h4 className={`text-sm font-black uppercase tracking-[0.2em] mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Connect Socially</h4>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/Scalixo" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-coral hover:text-white hover:-translate-y-1
                  ${isDarkMode ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-white text-slate-500 border border-gray-100 shadow-sm'}`}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://github.com/ranajawad18" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-coral hover:text-white hover:-translate-y-1
                  ${isDarkMode ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-white text-slate-500 border border-gray-100 shadow-sm'}`}>
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/jawad-qadeer-a54a65330/" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-coral hover:text-white hover:-translate-y-1
                  ${isDarkMode ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-white text-slate-500 border border-gray-100 shadow-sm'}`}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <button className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-coral hover:text-white hover:-translate-y-1
                  ${isDarkMode ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-white text-slate-500 border border-gray-100 shadow-sm'}`}>
                  <i className="fab fa-instagram"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side - 7 Columns) */}
          <div className="lg:col-span-7">
            <div className={`p-12 md:p-16 rounded-[3.5rem] border transition-all duration-700 fade-in
              ${isDarkMode ? 'bg-gray-900/40 border-white/10 shadow-2xl backdrop-blur-3xl' : 'bg-white border-gray-100 shadow-2xl shadow-slate-200/50'}`}>
              
              <div className="mb-12 space-y-4">
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Project Brief</h2>
                <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Tell us what you're imagining.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Full Name</label>
                    <input required type="text" className={`w-full bg-transparent border-b-2 outline-none py-4 text-base font-bold transition-all ${isDarkMode ? 'border-white/10 text-white focus:border-coral' : 'border-gray-200 text-slate-900 focus:border-coral'}`} placeholder="Enter your name" />
                  </div>
                  <div className="space-y-3">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Email Address</label>
                    <input required type="email" className={`w-full bg-transparent border-b-2 outline-none py-4 text-base font-bold transition-all ${isDarkMode ? 'border-white/10 text-white focus:border-coral' : 'border-gray-200 text-slate-900 focus:border-coral'}`} placeholder="name@company.com" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Service Category</label>
                  <select className={`w-full bg-transparent border-b-2 outline-none py-4 text-base font-bold transition-all cursor-pointer ${isDarkMode ? 'border-white/10 text-white focus:border-coral bg-gray-900' : 'border-gray-200 text-slate-900 focus:border-coral bg-white'}`}>
                    <option className={optionClass}>Digital All Services</option>
                    <option className={optionClass}>Web & App Development</option>
                    <option className={optionClass}>Graphic & Visual Identity</option>
                    <option className={optionClass}>AI Ecosystem Integration</option>
                    <option className={optionClass}>Growth & Performance Marketing</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Tell us more</label>
                  <textarea required rows={5} className={`w-full bg-transparent border-b-2 outline-none py-4 text-base font-bold transition-all resize-none ${isDarkMode ? 'border-white/10 text-white focus:border-coral' : 'border-gray-200 text-slate-900 focus:border-coral'}`} placeholder="What are your goals and timelines?"></textarea>
                </div>

                <div className="flex items-center gap-2 py-4">
                   <input type="checkbox" className="w-5 h-5 rounded border-coral text-coral focus:ring-coral" />
                   <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>I agree to the terms and privacy policy.</span>
                </div>

                <button 
                  disabled={isSubmitting}
                  className={`w-full py-6 rounded-2xl bg-coral hover:bg-[#ff4d4d] text-white font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-coral/30 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Dispatching...</>
                  ) : (
                    <><i className="fas fa-paper-plane text-xs"></i> Send Project Brief</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Visual Section */}
      <section className="py-24 px-6">
        <div className={`max-w-7xl mx-auto h-[500px] rounded-[4rem] overflow-hidden relative shadow-2xl border transition-colors
          ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
           <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2070" 
            className={`w-full h-full object-cover transition-all duration-1000 ${isDarkMode ? 'grayscale brightness-50 contrast-125' : 'grayscale-0'}`} 
            alt="Okara Location" 
           />
           <div className="absolute inset-0 bg-coral/5 mix-blend-multiply pointer-events-none"></div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center text-white shadow-2xl shadow-coral/50 animate-bounce cursor-pointer group">
               <i className="fas fa-location-dot text-2xl"></i>
               <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                 Visit Scalixo HQ in Okara
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Frequently Asked Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 fade-in">
            <h2 className={`text-4xl md:text-6xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Pre-Talk <span className="text-coral">Checklist</span></h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Quick answers to prepare for our first consultation.</p>
          </div>

          <div className="space-y-6">
            {[
              { q: "How fast do you respond?", a: "Our typical response window is under 12 hours for new business inquiries." },
              { q: "Do you offer free consultations?", a: "Yes, we provide a 30-minute high-level technical audit for every qualified lead." },
              { q: "Are NDAs standard?", a: "Absolutely. We prioritize your privacy and can sign an NDA before any deep project discussion." },
              { q: "Do you work with startups?", a: "We work with visionaries at every scale, from seed-funded startups to Fortune 500 giants." }
            ].map((item, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border transition-all hover:border-coral/40 fade-in
                ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.q}</h4>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`absolute top-1/2 right-0 text-[20vw] font-black opacity-[0.02] select-none pointer-events-none -translate-y-1/2 translate-x-1/4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          TALK
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ContactPage;
