import React from 'react';
import { Home, Grid, BookOpen, BarChart3, Settings, Sparkles, Gamepad2 } from 'lucide-react';
import { SidebarKidsIllustration } from '../illustrations/Illustrations';
import { APP_IMAGES } from '../../assets/images';

export type NavTab = 'home' | 'categories' | 'practice' | 'learning' | 'progress' | 'settings' | 'quiz' | 'quiz-results' | 'category-detail';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onSwitchProfile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, onSwitchProfile }) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'categories' as NavTab, label: 'Categories (13)', icon: Grid },
    { id: 'practice' as NavTab, label: 'Practice Games 🎮', icon: Gamepad2 },
    { id: 'learning' as NavTab, label: 'My Learning', icon: BookOpen },
    { id: 'progress' as NavTab, label: 'Progress', icon: BarChart3 },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#103b87] via-[#14479e] to-[#0f3475] text-white flex flex-col justify-between shrink-0 min-h-screen py-5 px-4 select-none relative shadow-2xl z-20 border-r border-blue-400/20">
      <div>
        {/* Brand Logo with JR pill */}
        <div
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer group mb-7"
        >
          <div className="relative">
            <div className="w-11 h-11 bg-white/15 backdrop-blur-md rounded-2xl p-1.5 flex items-center justify-center shadow-lg border border-white/30 group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                <path
                  d="M 50 8 L 62 36 L 94 38 L 70 59 L 77 90 L 50 74 L 23 90 L 30 59 L 6 38 L 38 36 Z"
                  fill="#FACC15"
                  stroke="#CA8A04"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <circle cx="42" cy="50" r="3" fill="#1E293B" />
                <circle cx="58" cy="50" r="3" fill="#1E293B" />
                <ellipse cx="36" cy="56" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />
                <ellipse cx="64" cy="56" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />
                <path d="M 44 57 Q 50 63 56 57" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                {/* Cap */}
                <g transform="translate(18, -4) rotate(-8 32 30)">
                  <polygon points="32,15 58,25 32,35 6,25" fill="#0f172a" />
                  <path d="M 18 28 Q 32 34 46 28 L 46 33 Q 32 38 18 33 Z" fill="#0f172a" />
                  <path d="M 32 25 Q 48 30 50 42" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                  <circle cx="50" cy="44" r="2.5" fill="#D97706" />
                </g>
              </svg>
            </div>
            {/* Glowing JR Badge */}
            <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-900 text-[10px] font-black rounded-full border border-white shadow-sm animate-pulse-glow">
              Jr
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-white flex items-center font-['Nunito',sans-serif]">
              Vidya<span className="text-cyan-300">AI</span>
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-yellow-400 text-slate-950 text-[11px] font-black shadow-sm tracking-wide">
              JR
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentTab === item.id ||
              (item.id === 'categories' && currentTab === 'category-detail') ||
              (item.id === 'learning' && (currentTab === 'learning' || currentTab === 'quiz' || currentTab === 'quiz-results'));

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/50 translate-x-1.5 border border-white/20 glossy-pill'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white hover:translate-x-1'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom 3D Mascot Character */}
      <div className="pt-3 border-t border-white/10 flex flex-col items-center">
        <div className="relative w-32 h-36 flex items-center justify-center">
          <img
            src={APP_IMAGES.explorerMascot}
            alt="VidyaAI Kid Explorer"
            className="w-full h-full object-contain filter drop-shadow-xl animate-float-slow"
          />
        </div>
        <p className="text-[11px] font-black text-blue-200 mt-1">Made for Young Minds ⭐</p>
      </div>
    </aside>
  );
};
