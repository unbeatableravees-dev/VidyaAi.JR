import React from 'react';
import { Home, Grid, BookOpen, BarChart3, Settings } from 'lucide-react';
import { SidebarKidsIllustration } from '../illustrations/Illustrations';

export type NavTab = 'home' | 'categories' | 'learning' | 'progress' | 'settings' | 'quiz' | 'quiz-results';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'categories' as NavTab, label: 'Categories', icon: Grid },
    { id: 'learning' as NavTab, label: 'My Learning', icon: BookOpen },
    { id: 'progress' as NavTab, label: 'Progress', icon: BarChart3 },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#14479e] text-white flex flex-col justify-between shrink-0 min-h-screen py-5 px-4 select-none relative shadow-2xl z-20">
      <div>
        {/* Brand Logo */}
        <div
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer group mb-7"
        >
          <div className="w-11 h-11 bg-white/10 rounded-2xl p-1.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
              {/* Star face with grad cap */}
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
          <span className="text-2xl font-black tracking-tight text-white flex items-center font-['Nunito',sans-serif]">
            Vidya<span className="text-blue-300">AI</span>
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentTab === item.id ||
              (item.id === 'learning' && (currentTab === 'learning' || currentTab === 'quiz' || currentTab === 'quiz-results'));

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-900/40 translate-x-1'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Illustration (Kids reading book on cloud) */}
      <div className="pt-4 border-t border-blue-400/20">
        <SidebarKidsIllustration />
      </div>
    </aside>
  );
};
