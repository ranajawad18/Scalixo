
import React from 'react';
import { AppView } from '../types';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const FeatureCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: string; 
  color: string; 
  videoUrl: string;
  onClick: () => void;
}> = ({ title, description, icon, color, videoUrl, onClick }) => (
  <button 
    onClick={onClick}
    className="group relative flex flex-col p-6 rounded-3xl bg-gray-900/40 border border-gray-800 transition-all duration-500 hover:border-gray-500 hover:bg-gray-800/60 text-left overflow-hidden h-full shadow-xl"
  >
    {/* Background Motion Video */}
    <div className="absolute inset-0 z-0 opacity-[0.03] group-hover:opacity-15 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
      <video className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" autoPlay loop muted playsInline>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
    </div>

    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-${color}-500 group-hover:text-white transition-all duration-500 shadow-lg`}>
        <i className={`${icon} text-2xl text-${color}-400 group-hover:text-white`}></i>
      </div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">{description}</p>
      
      <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all">
        Launch Module <i className="fas fa-arrow-right text-[8px]"></i>
      </div>
    </div>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-20">
      <section className="text-center space-y-4 max-w-2xl mx-auto pt-10">
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
          The Next Gen <br />
          <span className="text-coral">Creative Workflow</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Harness the power of Gemini 3 models to transform your ideas into reality through voice, vision, and cinematic generation.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          title="Intelligent Chat"
          description="Powered by Gemini 3 Flash for lightning-fast reasoning and context-aware coding assistance."
          icon="fas fa-comment-dots"
          color="blue"
          videoUrl="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4"
          onClick={() => onNavigate(AppView.CHAT)}
        />
        <FeatureCard 
          title="Image Studio"
          description="Generate hyper-realistic 4K images or edit existing ones using advanced prompt engineering."
          icon="fas fa-wand-magic-sparkles"
          color="purple"
          videoUrl="https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-shimmering-blue-dots-40502-large.mp4"
          onClick={() => onNavigate(AppView.IMAGE)}
        />
        <FeatureCard 
          title="Cinematic Video"
          description="Turn text or static images into breathtaking cinematic videos with Veo 3.1 models."
          icon="fas fa-video"
          color="pink"
          videoUrl="https://assets.mixkit.co/videos/preview/mixkit-digital-shopping-experience-with-neon-lines-40504-large.mp4"
          onClick={() => onNavigate(AppView.VIDEO)}
        />
        <FeatureCard 
          title="Live Workspace"
          description="Interactive low-latency voice session with Gemini for real-time collaboration."
          icon="fas fa-microphone"
          color="emerald"
          videoUrl="https://assets.mixkit.co/videos/preview/mixkit-business-woman-analyzing-data-on-a-digital-screen-40523-large.mp4"
          onClick={() => onNavigate(AppView.LIVE)}
        />
      </div>

      <section className="rounded-[3rem] p-12 bg-gradient-to-br from-gray-900 to-black border border-gray-800 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-10">
           <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-animation-of-shimmering-blue-dots-40502-large.mp4" type="video/mp4" />
           </video>
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-block px-3 py-1 rounded-full bg-coral/20 text-coral text-[10px] font-black uppercase tracking-widest mb-4">New Release</div>
          <h2 className="text-4xl font-black mb-4">Cinematic Video Generation</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">Experience the power of Veo 3.1 Fast. Generate 1080p landscape videos from simple text prompts in minutes. Perfectly synchronized frames and artistic control.</p>
          <button 
            onClick={() => onNavigate(AppView.VIDEO)}
            className="px-10 py-4 bg-coral text-white font-black rounded-2xl hover:bg-[#ff4d4d] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-coral/30"
          >
            Try Veo Video
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
