import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Award, Star, User, Settings, LogOut } from 'lucide-react';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  userGrade?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSwitchProfile?: () => void;
}

const AVATAR_STYLES: Record<string, { emoji: string; color: string }> = {
  'boy-aarav': { emoji: '👦', color: 'from-blue-400 to-indigo-500' },
  'girl-ananya': { emoji: '👧', color: 'from-pink-400 to-rose-500' },
  'boy-kabir': { emoji: '🧑‍🚀', color: 'from-amber-400 to-orange-500' },
  'girl-meera': { emoji: '🐼', color: 'from-emerald-400 to-teal-500' },
};

export const Header: React.FC<HeaderProps> = ({
  userName,
  userAvatar = 'boy-aarav',
  userGrade = 'Grade 1',
  searchQuery,
  onSearchChange,
  onProfileClick,
  onSettingsClick,
  onSwitchProfile,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const activeAvatar = AVATAR_STYLES[userAvatar] || AVATAR_STYLES['boy-aarav'];

  return (
    <header className="h-20 shrink-0 w-full px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between border-b border-white/70 bg-white/75 backdrop-blur-2xl z-30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden select-none">
      {/* Search Input & Navbar 3D Mascot */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for lessons, videos, or topics..."
            className="w-full pl-11 pr-4 py-2 text-sm bg-white/70 backdrop-blur-sm border border-white/80 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-700 shadow-inner"
          />
        </div>

        {/* 3D Kid Explorer on Navbar (png1.png as requested) */}
        <div className="flex items-center gap-2 px-3 py-1 bg-white/70 backdrop-blur-md rounded-full border border-white/80 shadow-sm shrink-0">
          <img
            src={APP_IMAGES.explorerMascot}
            alt="VidyaAI Explorer"
            className="w-9 h-10 object-contain filter drop-shadow animate-bounce-gentle"
          />
          <div className="text-left hidden sm:block">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block leading-tight">
              Jr Explorer
            </span>
            <span className="text-xs font-black text-slate-800 leading-tight">
              {userGrade}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          onClick={() => sound.playPop()}
          className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              sound.playPop();
              setShowProfileMenu(!showProfileMenu);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all cursor-pointer shadow-sm hover:scale-102"
          >
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${activeAvatar.color} ring-2 ring-blue-300 flex items-center justify-center text-2xl shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-[-8deg]`}>
              <span role="img" aria-label="Selected character">{activeAvatar.emoji}</span>
            </div>
            <span className="text-sm font-black text-slate-800">Hi, {userName}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 z-50 text-slate-700 animate-in fade-in slide-in-from-top-2 duration-150 select-none">
              <div className="px-5 py-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeAvatar.color} flex items-center justify-center text-2xl shadow-sm`}>
                    {activeAvatar.emoji}
                  </span>
                  <div>
                    <p className="font-black text-sm text-slate-900">{userName}</p>
                    <p className="text-xs font-bold text-blue-600">{userGrade} • Super Learner</p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-2 flex items-center justify-between text-xs font-black text-slate-600 bg-amber-50/80 my-2 mx-3 rounded-2xl border border-amber-200/50">
                <span className="flex items-center gap-1.5 text-amber-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> 140 Stars
                </span>
                <span className="flex items-center gap-1.5 text-blue-600">
                  <Award className="w-4 h-4 text-blue-500" /> 8 Badges
                </span>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onProfileClick) onProfileClick();
                }}
                className="w-full px-5 py-2.5 text-left text-xs font-black text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-400" /> View Report & Badges
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onSettingsClick) onSettingsClick();
                }}
                className="w-full px-5 py-2.5 text-left text-xs font-black text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
              >
                <Settings className="w-4 h-4 text-slate-400" /> Edit Profile & Settings
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onSwitchProfile) onSwitchProfile();
                }}
                className="w-full px-5 py-2.5 text-left text-xs font-black text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer border-t border-slate-100"
              >
                <LogOut className="w-4 h-4 text-rose-500" /> Switch / Change Name
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
