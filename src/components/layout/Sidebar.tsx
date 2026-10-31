import React from 'react';
import { Home, Grid, BookOpen, BarChart3, Settings, Gamepad2, Compass, Moon, User, GraduationCap, ShieldCheck } from 'lucide-react';
import { APP_IMAGES } from '../../assets/images';
import { sound } from '../../utils/audio';
import { StudentProfile } from '../../types/student';
import { getNavLabels } from '../../utils/language';

export type NavTab =
  | 'home'
  | 'curriculum'
  | 'islamic'
  | 'islamic-teachings'
  | 'punjabi'
  | 'hindi'
  | 'explorer'
  | 'categories'
  | 'practice'
  | 'body-explorer'
  | 'learning'
  | 'progress'
  | 'settings'
  | 'quiz'
  | 'quiz-results'
  | 'category-detail';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onSwitchProfile?: () => void;
  onOpenAdmin?: () => void;
  studentProfile?: StudentProfile | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onSwitchProfile,
  onOpenAdmin,
  studentProfile,
}) => {
  const religion = studentProfile?.religion || 'muslim';
  const localized = getNavLabels(religion);

  const navItems = [
    {
      id: 'home' as NavTab,
      label: localized.home.primary,
      secondary: localized.home.secondary,
      icon: Home,
    },
    {
      id: 'curriculum' as NavTab,
      label: 'Class Curriculum',
      secondary: `${studentProfile?.gradeClass || 'Nursery - 10'} LMS`,
      icon: GraduationCap,
      badge: '🎯',
    },
    {
      id: 'categories' as NavTab,
      label: localized.categories.primary,
      secondary: localized.categories.secondary,
      icon: Grid,
    },
    ...(religion === 'muslim'
      ? [
          {
            id: 'islamic' as NavTab,
            label: localized.islamic?.primary || 'Islamic Teachings',
            secondary: localized.islamic?.secondary || 'اسلامی تعلیمات',
            icon: Moon,
            badge: '🕌',
          },
        ]
      : religion === 'sikh'
      ? [
          {
            id: 'punjabi' as NavTab,
            label: localized.punjabi?.primary || 'Punjabi & Gurmukhi',
            secondary: localized.punjabi?.secondary || 'ਪੰਜਾਬੀ ਸਿੱਖਿਆ',
            icon: BookOpen,
            badge: '☬',
          },
        ]
      : religion === 'hindu'
      ? [
          {
            id: 'hindi' as NavTab,
            label: localized.hindi?.primary || 'Hindi & Culture',
            secondary: localized.hindi?.secondary || 'हिन्दी ज्ञान',
            icon: BookOpen,
            badge: '🕉️',
          },
        ]
      : []),
    {
      id: 'explorer' as NavTab,
      label: localized.explorer.primary,
      secondary: localized.explorer.secondary,
      icon: Compass,
    },
    {
      id: 'practice' as NavTab,
      label: localized.practice.primary,
      secondary: localized.practice.secondary,
      icon: Gamepad2,
    },
    {
      id: 'learning' as NavTab,
      label: localized.learning.primary,
      secondary: localized.learning.secondary,
      icon: BookOpen,
    },
    {
      id: 'progress' as NavTab,
      label: localized.progress.primary,
      secondary: localized.progress.secondary,
      icon: BarChart3,
    },
    {
      id: 'settings' as NavTab,
      label: localized.settings.primary,
      secondary: localized.settings.secondary,
      icon: Settings,
    },
  ];

  const handleItemClick = (id: NavTab) => {
    sound.playPop();
    onTabChange(id);
  };

  const renderContent = () => (
    <div className="flex h-full min-h-0 flex-col select-none text-white">
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Brand Header - Compact & Sleek */}
        <div className="flex items-center justify-between px-1.5 mb-3 pt-1">
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-white/15 backdrop-blur-md rounded-2xl p-1.5 flex items-center justify-center shadow-md border border-white/30 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                  <path
                    d="M 50 8 L 62 36 L 94 38 L 70 59 L 77 90 L 50 74 L 23 90 L 30 59 L 6 38 L 38 36 Z"
                    fill="#FACC15"
                    stroke="#CA8A04"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <circle cx="50" cy="50" r="16" fill="#3B82F6" />
                  <path
                    d="M 50 38 L 54 46 L 62 48 L 56 54 L 58 62 L 50 58 L 42 62 L 44 54 L 38 48 L 46 46 Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[9px] rounded-full shadow-xs border border-white/40">
                Jr
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-lg font-black tracking-tight text-white font-['Nunito',sans-serif] leading-tight">
                  Vidya<span className="text-yellow-300 drop-shadow-xs">AI</span>
                </h1>
                <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 font-black text-[9px] rounded-full shadow-xs">
                  JR
                </span>
              </div>
              <p className="text-[10px] font-bold text-blue-200/90 leading-tight">
                Personalized Learning
              </p>
            </div>
          </div>
        </div>

        {/* Quick Profile Summary Card */}
        {studentProfile && (
          <div className="mx-1 mb-2.5 px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2.5">
            <span className="text-xl">
              {studentProfile.avatar?.includes('girl') ? '👧' : '👦'}
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-black block truncate text-white">
                {studentProfile.name}
              </span>
              <span className="text-[10px] font-bold block text-blue-200 truncate">
                {studentProfile.gradeClass} ({studentProfile.age}y)
              </span>
            </div>
          </div>
        )}

        {/* Navigation list */}
        <nav
          className="flex-1 space-y-1 overflow-y-auto pr-1 overflow-x-hidden min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Sidebar Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentTab === item.id ||
              (item.id === 'islamic' && currentTab === 'islamic-teachings') ||
              (item.id === 'categories' && currentTab === 'category-detail') ||
              (item.id === 'explorer' && currentTab === 'body-explorer') ||
              (item.id === 'learning' && (currentTab === 'learning' || currentTab === 'quiz' || currentTab === 'quiz-results'));

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center justify-between px-2.5 py-[6.5px] rounded-2xl font-bold transition-all duration-300 text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-[#3988ff] via-[#2878ff] to-[#1762ed] text-white shadow-lg shadow-blue-950/40 translate-x-1 border border-blue-200/50 glossy-pill'
                    : 'text-blue-100 hover:bg-white/10 hover:backdrop-blur-md hover:text-white hover:translate-x-0.5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                  <div>
                    <span className="block leading-tight text-[13.5px] font-black">{item.label}</span>
                    <span className="text-[9.5px] font-bold text-blue-200/80 block leading-tight">
                      {item.secondary}
                    </span>
                  </div>
                </div>
                {item.badge && <span className="text-xs shrink-0">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Admin Actions */}
      <div className="shrink-0 pt-2 border-t border-white/15 flex flex-col items-center">
        <div className="relative w-[10.5rem] h-[6.5rem] flex items-center justify-center">
          <img
            src={APP_IMAGES.explorerMascot}
            alt="VidyaAI Kid Explorer"
            className="w-full h-full object-contain filter drop-shadow-md animate-float-slow"
          />
        </div>
        <p className="text-[10px] font-black text-blue-200/90 mt-1">Young Minds ⭐</p>

        {onSwitchProfile && (
          <button
            onClick={() => {
              sound.playPop();
              onSwitchProfile();
            }}
            className="w-full mt-2 py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/25 active:scale-98 shadow-xs"
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch Student</span>
          </button>
        )}

        {onOpenAdmin && (
          <button
            onClick={() => {
              sound.playPop();
              onOpenAdmin();
            }}
            className="w-full mt-1.5 py-1.5 px-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-yellow-300 text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-yellow-400/30 active:scale-98 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
            <span>Super Admin Portal 🔐</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <aside className="sidebar-royal-blue relative z-20 flex h-screen min-h-0 w-60 shrink-0 flex-col overflow-hidden py-3 pl-4 pr-3 select-none shadow-2xl border-r border-blue-400/20 lg:w-64">
      {renderContent()}
    </aside>
  );
};
