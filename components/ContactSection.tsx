
import React from 'react';

const ContactSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main CTA Card */}
        <div className={`group relative p-12 md:p-20 rounded-[3.5rem] border transition-all duration-1000 overflow-hidden
          ${isDarkMode 
            ? 'bg-gray-900/60 border-white/10 shadow-2xl shadow-black/60 backdrop-blur-3xl' 
            : 'bg-white border-gray-100 shadow-2xl shadow-slate-200/50 backdrop-blur-2xl'}`}>
          
          {/* Background Video Layer */}
          <div className={`absolute inset-0 z-0 opacity-10 transition-opacity duration-1000 group-hover:opacity-30`}>
            <video className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[5s]" autoPlay loop muted playsInline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-shimmering-blue-dots-40502-large.mp4" type="video/mp4" />
            </video>
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-950 via-transparent to-gray-950' : 'bg-gradient-to-br from-white via-transparent to-white'}`}></div>
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-coral/20 rounded-full blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-[80px] animate-pulse [animation-delay:1.5s]"></div>

          <div className="relative z-10 max-w-xl">
             <div className="inline-block px-4 py-1.5 rounded-full bg-coral/10 border border-coral/20 text-coral text-[10px] font-black uppercase tracking-[0.4em] mb-4">Get In Touch</div>
             <h2 className={`text-5xl md:text-7xl font-black tracking-tighter leading-none transition-colors mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
               Let's Build <br /> <span className="text-coral">Something Great</span>
             </h2>
             <p className={`text-xl transition-colors leading-relaxed font-medium mb-10 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
               Ready to transform your digital presence? Our team in Okara is standing by to help you innovate and scale your success.
             </p>

             <div className="space-y-6">
               <div className="flex items-center gap-6 group/item cursor-pointer">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 group-hover/item:scale-110 group-hover/item:bg-coral group-hover/item:text-white
                   ${isDarkMode ? 'bg-white/5 border border-white/10 text-coral' : 'bg-gray-50 border border-gray-200 text-coral'}`}>
                   <i className="fas fa-envelope"></i>
                 </div>
                 <div>
                   <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Email Us</p>
                   <p className={`text-lg font-bold transition-colors ${isDarkMode ? 'text-white group-hover/item:text-coral' : 'text-slate-900 group-hover/item:text-coral'}`}>jawadrana8660@gmail.com</p>
                 </div>
               </div>

               <div className="flex items-center gap-6 group/item cursor-pointer">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 group-hover/item:scale-110 group-hover/item:bg-coral group-hover/item:text-white
                   ${isDarkMode ? 'bg-white/5 border border-white/10 text-coral' : 'bg-gray-50 border border-gray-200 text-coral'}`}>
                   <i className="fas fa-phone"></i>
                 </div>
                 <div>
                   <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Call Us</p>
                   <p className={`text-lg font-bold transition-colors ${isDarkMode ? 'text-white group-hover/item:text-coral' : 'text-slate-900 group-hover/item:text-coral'}`}>+92 319 0603710</p>
                 </div>
               </div>
             </div>
          </div>
          
          {/* Decorative Corner Decals */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-coral/20 rounded-[3.5rem] transition-colors duration-1000 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
