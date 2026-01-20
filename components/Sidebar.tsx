
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isOpen, onToggle }) => {
  const menuItems = [
    { view: AppView.DASHBOARD, icon: 'fas fa-th-large', label: 'Overview' },
    { view: AppView.CHAT, icon: 'fas fa-comment-dots', label: 'Chat Assistant' },
    { view: AppView.IMAGE, icon: 'fas fa-wand-magic-sparkles', label: 'Creative Image' },
    { view: AppView.VIDEO, icon: 'fas fa-video', label: 'Cinematic Video' },
    { view: AppView.LIVE, icon: 'fas fa-microphone', label: 'Live Session' },
  ];

  return (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
             <i className="fas fa-sparkles text-white"></i>
          </div>
          {isOpen && (
            <span className="font-bold text-xl tracking-tight">Lumina</span>
          )}
        </div>
        <button onClick={onToggle} className="lg:block hidden text-gray-500 hover:text-white">
           <i className={`fas fa-angle-double-${isOpen ? 'left' : 'right'}`}></i>
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${activeView === item.view 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}
            `}
          >
            <i className={`${item.icon} text-lg w-6 flex justify-center`}></i>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="px-6 pt-6 border-t border-gray-800/50">
        <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/50">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">API Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
            <span className="text-xs font-medium text-gray-300">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
