
import React, { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  imageUrl: string;
  description: string;
  client: string;
  year: string;
}

const ProjectCard: React.FC<{ project: Project; isDarkMode: boolean; onClick: () => void }> = ({ project, isDarkMode, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative p-8 rounded-[2.5rem] border transition-all duration-700 overflow-hidden h-[450px] flex flex-col justify-end cursor-pointer
      ${isDarkMode 
        ? 'bg-gray-950/40 border-white/5 hover:border-coral/40 shadow-2xl shadow-black/40' 
        : 'bg-white border-gray-100 hover:border-coral/30 shadow-sm hover:shadow-2xl'}`}
    >
      {/* Background Image with Hover Zoom */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200";
          }}
        />
        {/* Gradients to ensure text readability */}
        <div className={`absolute inset-0 bg-gradient-to-t via-black/30 to-transparent ${isDarkMode ? 'from-gray-950' : 'from-black/80'}`}></div>
        <div className="absolute inset-0 bg-coral/5 opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
      </div>

      {/* Sheen Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sheen_2s_infinite]"></div>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Category Badge */}
        <span className="text-coral font-black uppercase tracking-[0.2em] text-[10px] drop-shadow-lg">
          {project.category}
        </span>
        
        {/* Title */}
        <h3 className="text-3xl font-black tracking-tight leading-none transition-all group-hover:translate-x-1 text-white">
          {project.title}
        </h3>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/20 bg-white/10 text-white backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Add Icon */}
      <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl z-30">
        <i className="fas fa-arrow-up-right-from-square text-sm"></i>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-coral/20 rounded-[2.5rem] transition-colors duration-700"></div>
    </div>
  );
};

const PortfolioSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Web Development', 'Mobile App', 'AI/ML', 'Software Development'];

  const projects: Project[] = [
    // Web Development
    {
      id: 1,
      title: "Marketplace OS",
      category: "Web Development",
      tags: ["Next.js", "Node.js", "Redis"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      description: "A hyper-fast e-commerce engine designed for global scalability and sub-second load times.",
      client: "Vertex Global",
      year: "2024"
    },
    {
      id: 6,
      title: "Logistics Hub",
      category: "Web Development",
      tags: ["React", "PostgreSQL", "Google Maps"],
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
      description: "End-to-end supply chain visibility platform for international shipping and real-time tracking.",
      client: "Speedy Logistics",
      year: "2023"
    },
    // Mobile App
    {
      id: 2,
      title: "NeoBank Mobile",
      category: "Mobile App",
      tags: ["React Native", "Firebase", "Redux"],
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
      description: "A modern banking experience with instant peer-to-peer transfers and smart budgeting.",
      client: "Neo Financial",
      year: "2024"
    },
    {
      id: 4,
      title: "Pulse Fitness",
      category: "Mobile App",
      tags: ["Flutter", "HealthKit", "Dart"],
      imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
      description: "AI-driven workout coaching that adapts to your biometric data and progress in real-time.",
      client: "Pulse Athletics",
      year: "2023"
    },
    {
      id: 15,
      title: "Vibe Messenger",
      category: "Mobile App",
      tags: ["SwiftUI", "WebRTC", "PostgreSQL"],
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
      description: "Ultra-secure encrypted messaging platform with seamless real-time video conferencing.",
      client: "Vibe Tech",
      year: "2024"
    },
    // AI/ML
    {
      id: 3,
      title: "Sentient Analytics",
      category: "AI/ML",
      tags: ["Python", "PyTorch", "AWS"],
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e90526354a?auto=format&fit=crop&q=80&w=1200",
      description: "Enterprise-grade sentiment analysis tool processing millions of data points hourly.",
      client: "Insight Corp",
      year: "2024"
    },
    {
      id: 7,
      title: "Vision Pro AI",
      category: "AI/ML",
      tags: ["TensorFlow", "OpenCV", "NVIDIA"],
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
      description: "Computer vision solution for automated quality control in precision manufacturing.",
      client: "Industrial Automate",
      year: "2024"
    },
    {
      id: 16,
      title: "Neural Studio",
      category: "AI/ML",
      tags: ["Keras", "FastAPI", "Docker"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
      description: "An interactive workspace for designing and deploying custom neural network architectures.",
      client: "DeepLayer Systems",
      year: "2024"
    },
    // Software Development
    {
      id: 5,
      title: "Core CRM",
      category: "Software Development",
      tags: [".NET", "SQL Server", "Azure"],
      imageUrl: "https://images.unsplash.com/photo-1454165833762-0204b28c674a?auto=format&fit=crop&q=80&w=1200",
      description: "Deeply integrated customer relations platform for large-scale enterprise sales operations.",
      client: "Nexus Enterprise",
      year: "2024"
    },
    {
      id: 8,
      title: "Infrastructure X",
      category: "Software Development",
      tags: ["Go", "Kubernetes", "Prometheus"],
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200",
      description: "Auto-scaling infrastructure management tool that optimizes server costs by up to 40%.",
      client: "SkyFlow Systems",
      year: "2024"
    },
    {
      id: 17,
      title: "Enterprise ERP",
      category: "Software Development",
      tags: ["Java", "Spring Boot", "Oracle"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      description: "Unified enterprise resource planning system for manufacturing giants with global footprints.",
      client: "Global Industry Ltd",
      year: "2024"
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.portfolio-item');
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-coral font-black uppercase tracking-[0.5em] text-[10px]">Case Studies</span>
          <h2 className={`text-6xl md:text-8xl font-black tracking-tighter leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Featured Work
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
            A selection of high-impact digital solutions built for global brands.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 sticky top-24 z-40 py-4">
          <div className={`flex flex-wrap justify-center gap-3 p-2.5 rounded-full border backdrop-blur-2xl ${isDarkMode ? 'bg-black/60 border-white/10 shadow-2xl' : 'bg-white/90 border-slate-100 shadow-xl'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300
                  ${filter === cat 
                    ? 'bg-coral text-white shadow-lg shadow-coral/30' 
                    : (isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-coral hover:bg-slate-50')
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10 min-h-[600px] transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
        >
          {filteredProjects.map((project) => (
            <div 
              key={`${project.id}-${filter}`} 
              className="portfolio-item opacity-0 translate-y-10 transition-all duration-[1.2s] ease-out"
            >
              <ProjectCard 
                project={project} 
                isDarkMode={isDarkMode} 
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-16">
          <button className={`group flex items-center gap-4 px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest border-2 transition-all hover:bg-coral hover:text-white hover:border-coral hover:shadow-2xl hover:shadow-coral/40
            ${isDarkMode ? 'border-white/20 text-white' : 'border-slate-300 text-slate-900 shadow-xl'}`}>
            Browse All Projects
            <i className="fas fa-arrow-right text-[10px] transition-transform group-hover:translate-x-2"></i>
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl transition-opacity cursor-pointer"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className={`relative w-full max-w-6xl rounded-[3rem] md:rounded-[4rem] overflow-hidden border shadow-2xl transition-all animate-scaleIn
            ${isDarkMode ? 'bg-gray-950 border-white/10' : 'bg-white border-gray-100'}`}>
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 z-50 w-14 h-14 rounded-full bg-black/50 hover:bg-coral text-white transition-all flex items-center justify-center backdrop-blur-md"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-[400px] lg:h-auto min-h-[500px] relative">
                <img src={selectedProject.imageUrl} className="w-full h-full object-cover" alt={selectedProject.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              </div>
              
              <div className="p-10 md:p-20 space-y-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <span className="text-coral font-black uppercase tracking-[0.4em] text-xs">{selectedProject.category}</span>
                  <h2 className={`text-5xl md:text-6xl font-black leading-tight tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {selectedProject.title}
                  </h2>
                </div>

                <p className={`text-lg md:text-xl leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Partner</p>
                    <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedProject.client}</p>
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>Launch</p>
                    <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedProject.year}</p>
                  </div>
                </div>

                <div className="pt-8">
                  <button className="w-full md:w-auto px-12 py-6 bg-coral hover:bg-[#ff4d4d] text-white rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-coral/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                    View Live Project <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Glow */}
      <div className={`absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,94,94,0.15)_0%,transparent_70%)]`}></div>
    </section>
  );
};

export default PortfolioSection;
