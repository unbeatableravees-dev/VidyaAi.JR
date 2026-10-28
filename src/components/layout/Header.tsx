import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Award, Star, User, LogOut, Volume2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  userGrade?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProfileClick?: () => void;
  onSwitchProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  userGrade = 'Grade 1',
  searchQuery,
  onSearchChange,
  onProfileClick,
  onSwitchProfile,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-18 px-8 py-3.5 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for lessons, videos, or topics..."
          className="w-full pl-11 pr-4 py-2 text-sm bg-white/90 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-700 shadow-inner"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Voice Hello Button */}
        <button
          onClick={() => {
            sound.playPop();
            sound.speakText(`Hello ${userName}! Ready to learn today?`);
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black hover:bg-amber-100 transition-all cursor-pointer shadow-sm animate-pulse-glow"
          title="Say Hello"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
          <span>Say Hi</span>
        </button>

        {/* Notification Bell */}
        <button
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
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all cursor-pointer shadow-sm hover:scale-102"
          >
            {/* Cartoon Boy Avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden ring-2 ring-blue-300 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="45" r="28" fill="#fed7aa" />
                <path d="M 24 40 C 22 18 38 10 52 10 C 68 10 74 18 76 38 C 70 28 62 20 50 20 C 38 20 30 28 24 40 Z" fill="#451a03" />
                <circle cx="42" cy="42" r="3" fill="#1e293b" />
                <circle cx="58" cy="42" r="3" fill="#1e293b" />
                <path d="M 46 48 Q 50 52 54 48" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <path d="M 22 75 Q 50 65 78 75 L 82 100 L 18 100 Z" fill="#2563eb" />
              </svg>
            </div>
            <span className="text-sm font-black text-slate-800">Hi, {userName}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 z-50 text-slate-700 animate-in fade-in slide-in-from-top-2 duration-150 select-none">
              <div className="px-5 py-2 border-b border-slate-100">
                <p className="font-black text-sm text-slate-900">{userName}</p>
                <p className="text-xs font-bold text-blue-600">{userGrade} • Super Learner</p>
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
                  if (onSwitchProfile) onSwitchProfile();
                }}
                className="w-full px-5 py-2.5 text-left text-xs font-black text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer border-t border-slate-100"
              >
                <LogOut className="w-4 h-4 text-rose-500" /> Change Name / Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
