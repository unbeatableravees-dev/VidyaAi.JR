import React from 'react';
import { Home, Grid, BookOpen, BarChart3, Settings, Gamepad2, Compass, Moon, X, User } from 'lucide-react';
import { APP_IMAGES } from '../../assets/images';
import { sound } from '../../utils/audio';
import { StudentProfile } from '../../types/student';
import { getNavLabels } from '../../utils/language';

export type NavTab =
  | 'home'
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
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  studentProfile?: StudentProfile | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onSwitchProfile,
  isOpenMobile = false,
  onCloseMobile,
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
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const renderContent = (isMobile: boolean = false) => (
    <div className="flex flex-col justify-between h-full min-h-full select-none text-white">
      <div>
        {/* Brand Header - Sleek & Compact */}
        <div className="flex items-center justify-between px-1 mb-2.5 pt-0.5">
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-white/15 backdrop-blur-md rounded-xl p-1 flex items-center justify-center shadow-md border border-white/30 group-hover:scale-105 transition-transform">
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
                  <g transform="translate(18, -4) rotate(-8 32 30)">
                    <polygon points="32,15 58,25 32,35 6,25" fill="#0f172a" />
                    <path d="M 18 28 Q 32 34 46 28 L 46 33 Q 32 38 18 33 Z" fill="#0f172a" />
                    <path d="M 32 25 Q 48 30 50 42" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                    <circle cx="50" cy="44" r="2.5" fill="#D97706" />
                  </g>
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 px-1 py-0.2 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-950 text-[8.5px] font-black rounded-full border border-white shadow-xs">
                Jr
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-lg font-black tracking-tight text-white flex items-center font-['Nunito',sans-serif]">
                Vidya<span className="text-cyan-300">AI</span>
              </span>
              <span className="px-1.5 py-0.2 rounded-md bg-yellow-400 text-slate-950 text-[9.5px] font-black shadow-xs tracking-wide">
                JR
              </span>
            </div>
          </div>

          {/* Close button on mobile drawer */}
          {isMobile && onCloseMobile && (
            <button
              onClick={() => {
                sound.playPop();
                onCloseMobile();
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all cursor-pointer border border-white/20 flex items-center justify-center shadow-xs"
              title="Close Menu"
              aria-label="Close Navigation"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Navigation Items - Compact, Sleek Padding & Sizing with Original Vibrant Route Pill */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentTab === item.id ||
              (item.id === 'islamic' && (currentTab === 'islamic' || currentTab === 'islamic-teachings')) ||
              (item.id === 'explorer' && (currentTab === 'explorer' || currentTab === 'body-explorer')) ||
              (item.id === 'categories' && currentTab === 'category-detail') ||
              (item.id === 'learning' && (currentTab === 'learning' || currentTab === 'quiz' || currentTab === 'quiz-results'));

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl font-bold transition-all duration-150 text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-md shadow-blue-950/50 border border-white/30 glossy-pill translate-x-1'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white hover:translate-x-0.5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                  <div>
                    <span className="block leading-tight text-xs font-black text-white">{item.label}</span>
                    <span className="text-[9px] font-bold text-blue-200/80 block leading-tight">
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

      {/* Bottom Switch Profile Button & 3D Mascot */}
      <div className="pt-2 border-t border-white/10 flex flex-col items-center">
        {onSwitchProfile && (
          <button
            onClick={() => {
              sound.playPop();
              if (isMobile && onCloseMobile) onCloseMobile();
              onSwitchProfile();
            }}
            className="w-full mb-1.5 py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[10.5px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/20 active:scale-98 shadow-xs"
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch Student</span>
          </button>
        )}

        <div className="relative w-14 h-16 flex items-center justify-center">
          <img
            src={APP_IMAGES.explorerMascot}
            alt="VidyaAI Kid Explorer"
            className="w-full h-full object-contain filter drop-shadow-md animate-float-slow"
          />
        </div>
        <p className="text-[9px] font-black text-blue-200/90 mt-0.5">Young Minds ⭐</p>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. MOBILE DRAWER (Only rendered when isOpenMobile is true on mobile screens) */}
      {isOpenMobile && (
        <div className="md:hidden">
          {/* Dark Backdrop Overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Off-canvas Slide-out Drawer with SOLID DEEP ROYAL BLUE */}
          <aside
            style={{
              backgroundColor: '#0c2e6b',
              backgroundImage: 'linear-gradient(180deg, #0d3b88 0%, #0c2e6b 50%, #082252 100%)',
            }}
            className="sidebar-royal-blue fixed inset-y-0 left-0 z-50 w-56 max-w-[80vw] text-white py-3 px-2.5 select-none shadow-2xl border-r border-blue-400/30 overflow-y-auto animate-in slide-in-from-left duration-200"
          >
            {renderContent(true)}
          </aside>
        </div>
      )}

      {/* 2. DESKTOP SIDEBAR - SOLID DEEP ROYAL BLUE, COMPACT w-52 / w-56 */}
      <aside
        style={{
          backgroundColor: '#0c2e6b',
          backgroundImage: 'linear-gradient(180deg, #0d3b88 0%, #0c2e6b 50%, #082252 100%)',
        }}
        className="sidebar-royal-blue hidden md:flex flex-col justify-between shrink-0 w-52 lg:w-56 min-h-screen py-3 px-2.5 select-none shadow-2xl border-r border-blue-400/20"
      >
        {renderContent(false)}
      </aside>
    </>
  );
};
