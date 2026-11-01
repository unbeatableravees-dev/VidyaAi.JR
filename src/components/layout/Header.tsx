import React, { useEffect, useState } from 'react';
import { Search, Bell, ChevronDown, Award, Star, User, Settings, LogOut, Menu, ShieldCheck, X, BookOpen, Compass, Gamepad2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';
import { StudentProfile, RELIGION_CONFIGS } from '../../types/student';
import { getGreeting } from '../../utils/language';
import { getStudentProgress } from '../../utils/studentProgress';
import { getStudentStreakData } from '../../utils/streakManager';
import { getStudentStoreData, STORE_ACCESSORIES } from '../../utils/starStore';
import { ALL_CATEGORIES } from '../../data/learningData';
import { CATEGORY_DETAILS } from '../../data/categoryLessons';
import { LmsStorageService } from '../../services/lmsStorage';

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  userGrade?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSwitchProfile?: () => void;
  onOpenBazaar?: () => void;
  onOpenStreak?: () => void;
  studentProfile?: StudentProfile | null;
  onToggleMobileMenu?: () => void;
  onOpenAdmin?: () => void;
  onNavigateToCategory?: (catId: string) => void;
  onNavigateToLesson?: (catId: string, lessonId: string) => void;
  onNavigateToPractice?: (gameId?: string) => void;
  onNavigateToExplorer?: (moduleId?: string) => void;
}

const AVATAR_STYLES: Record<string, { emoji: string; color: string }> = {
  'boy-aarav': { emoji: '👦', color: 'from-blue-400 to-indigo-500' },
  'girl-ananya': { emoji: '👧', color: 'from-pink-400 to-rose-500' },
  'boy-kabir': { emoji: '🧑‍🚀', color: 'from-amber-400 to-orange-500' },
  'girl-meera': { emoji: '🐼', color: 'from-emerald-400 to-teal-500' },
  'boy-sheru': { emoji: '🦁', color: 'from-yellow-400 to-amber-600' },
  'girl-zehra': { emoji: '🎨', color: 'from-purple-400 to-violet-600' },
  'boy-gurpreet': { emoji: '👳', color: 'from-orange-400 to-red-500' },
  'girl-fatima': { emoji: '🧕', color: 'from-teal-400 to-emerald-600' },
  // Unlocked Kids' Favorite Characters
  'hero-spiderman': { emoji: '🦸‍♂️', color: 'from-red-500 to-blue-700' },
  'hero-astronaut': { emoji: '🚀', color: 'from-blue-600 to-purple-800' },
  'hero-ninja': { emoji: '🥷', color: 'from-slate-700 to-black' },
  'hero-fairy': { emoji: '🧚‍♀️', color: 'from-pink-400 to-purple-600' },
  'hero-dino': { emoji: '🦖', color: 'from-emerald-500 to-teal-800' },
  'hero-robot': { emoji: '🤖', color: 'from-cyan-500 to-blue-800' },
  'hero-safari': { emoji: '🦁', color: 'from-amber-500 to-orange-600' },
  'hero-detective': { emoji: '🕵️‍♂️', color: 'from-amber-700 to-stone-900' },
  'hero-unicorn': { emoji: '🦄', color: 'from-fuchsia-400 to-pink-500' },
  'hero-wizard': { emoji: '🧙‍♂️', color: 'from-violet-600 to-indigo-900' },
};

export const Header: React.FC<HeaderProps> = ({
  userName,
  userAvatar = 'boy-aarav',
  userGrade = 'Class 2',
  searchQuery,
  onSearchChange,
  onProfileClick,
  onSettingsClick,
  onSwitchProfile,
  onOpenBazaar,
  onOpenStreak,
  studentProfile,
  onToggleMobileMenu,
  onOpenAdmin,
  onNavigateToCategory,
  onNavigateToLesson,
  onNavigateToPractice,
  onNavigateToExplorer,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [, setProgressVersion] = useState(0);
  const studentId = studentProfile?.id;
  const storeData = getStudentStoreData(studentId);
  const streak = getStudentStreakData(studentId);
  const activeCharKey = storeData.equippedCharacterId || userAvatar;
  const activeAvatar = AVATAR_STYLES[activeCharKey] || AVATAR_STYLES['boy-aarav'];
  const activeAccessory = STORE_ACCESSORIES.find((a) => a.id === storeData.equippedAccessoryId);
  const progress = getStudentProgress(studentId);

  useEffect(() => {
    const handleProgressChange = () => {
      setProgressVersion((v) => v + 1);
    };
    window.addEventListener('studentprogresschange', handleProgressChange);
    window.addEventListener('studentstreakchange', handleProgressChange);
    window.addEventListener('studentstorechange', handleProgressChange);
    return () => {
      window.removeEventListener('studentprogresschange', handleProgressChange);
      window.removeEventListener('studentstreakchange', handleProgressChange);
      window.removeEventListener('studentstorechange', handleProgressChange);
    };
  }, []);

  // Search Results Computation
  const cleanQ = searchQuery.trim().toLowerCase();
  const matchedCategories = cleanQ
    ? ALL_CATEGORIES.filter(
        (c) => c.name.toLowerCase().includes(cleanQ) || c.desc.toLowerCase().includes(cleanQ)
      ).slice(0, 4)
    : [];

  const matchedLessons: { id: string; title: string; categoryId: string; categoryName: string }[] = [];
  if (cleanQ) {
    // 1. From CATEGORY_DETAILS
    Object.entries(CATEGORY_DETAILS).forEach(([catId, detail]) => {
      detail.lessons.forEach((l) => {
        if (
          l.title.toLowerCase().includes(cleanQ) ||
          l.topic.toLowerCase().includes(cleanQ) ||
          l.description.toLowerCase().includes(cleanQ)
        ) {
          if (matchedLessons.length < 6) {
            matchedLessons.push({
              id: l.id,
              title: l.title,
              categoryId: catId,
              categoryName: detail.title,
            });
          }
        }
      });
    });

    // 2. From Admin Content
    LmsStorageService.getAllContent().forEach((item) => {
      if (
        item.title.toLowerCase().includes(cleanQ) ||
        item.description.toLowerCase().includes(cleanQ) ||
        (item.chapter && item.chapter.toLowerCase().includes(cleanQ))
      ) {
        if (matchedLessons.length < 8 && !matchedLessons.some((m) => m.id === item.id)) {
          matchedLessons.push({
            id: item.id,
            title: item.title,
            categoryId: item.subject.toLowerCase(),
            categoryName: item.subject,
          });
        }
      }
    });
  }

  const explorerModules = [
    { id: 'body', title: 'Human Body 3D Explorer', icon: '🫀' },
    { id: 'space', title: 'Solar System & Space Galaxy', icon: '🪐' },
    { id: 'animals', title: 'Animal World & Soundboard', icon: '🦁' },
    { id: 'plants', title: 'Plants Anatomy & Life Cycle', icon: '🌿' },
    { id: 'islamic', title: 'Islamic Teachings & Duas', icon: '🕌' },
  ];
  const matchedExplorer = cleanQ
    ? explorerModules.filter((m) => m.title.toLowerCase().includes(cleanQ)).slice(0, 3)
    : [];
  const earnedBadges = [
    progress.completedLessonIds.length > 0,
    progress.quizAttempts > 0,
    progress.examAttempts > 0,
    progress.activityCompletions > 0,
    progress.discoveredOrganIds.length > 0,
  ].filter(Boolean).length;

  useEffect(() => {
    const handleProgressChange = (event: Event) => {
      if ((event as CustomEvent<string>).detail === studentId) {
        setProgressVersion((version) => version + 1);
      }
    };
    window.addEventListener('studentprogresschange', handleProgressChange);
    return () => window.removeEventListener('studentprogresschange', handleProgressChange);
  }, [studentId]);

  const religion = studentProfile?.religion || 'muslim';
  const relConfig = RELIGION_CONFIGS[religion] || RELIGION_CONFIGS.muslim;
  const greeting = getGreeting(religion, userName || 'Explorer');
  const cleanLangBadge = religion === 'muslim' ? 'English + Urdu' : relConfig.languageBadge;

  return (
    <header className="h-16 md:h-20 shrink-0 w-full px-3 sm:px-6 md:px-8 py-2.5 flex items-center justify-between border-b border-white/70 bg-white/80 backdrop-blur-2xl z-40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-visible select-none relative">
      {/* Left side: Mobile Menu Button & Search Bar */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => {
            sound.playPop();
            onToggleMobileMenu?.();
          }}
          className="md:hidden p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer shrink-0"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search lessons, stories, topics..."
            className="w-full pl-9 sm:pl-11 pr-8 sm:pr-9 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/70 backdrop-blur-sm border border-white/80 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-700 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Live Search Results Dropdown */}
          {cleanQ && (
            <div className="absolute left-0 top-full mt-2 w-full min-w-[280px] sm:min-w-[400px] bg-white rounded-3xl shadow-2xl border-2 border-slate-200/90 p-4 z-[160] max-h-[75vh] overflow-y-auto space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-blue-600" /> Search Results for "{searchQuery}"
                </span>
                <button
                  onClick={() => onSearchChange('')}
                  className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>

              {matchedCategories.length === 0 && matchedLessons.length === 0 && matchedExplorer.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs font-bold">
                  No matching lessons or subjects found. Try searching "Math", "Science", "Stories" or "Space"!
                </div>
              ) : null}

              {/* Matched Categories */}
              {matchedCategories.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">Subjects</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {matchedCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          sound.playPop();
                          onNavigateToCategory?.(cat.id);
                          onSearchChange('');
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 text-left transition-colors cursor-pointer group border border-slate-100"
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 group-hover:text-blue-600 truncate">{cat.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{cat.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Explorer Modules */}
              {matchedExplorer.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-purple-600">3D Explorers</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {matchedExplorer.map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => {
                          sound.playPop();
                          onNavigateToExplorer?.(exp.id);
                          onSearchChange('');
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-purple-50 text-left transition-colors cursor-pointer group border border-purple-100"
                      >
                        <span className="text-xl">{exp.icon}</span>
                        <p className="text-xs font-black text-slate-800 group-hover:text-purple-600 truncate flex-1">{exp.title}</p>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Lessons */}
              {matchedLessons.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Interactive Lessons</p>
                  <div className="space-y-1">
                    {matchedLessons.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          sound.playPop();
                          onNavigateToLesson?.(l.categoryId, l.id);
                          onSearchChange('');
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 text-left transition-colors cursor-pointer group border border-slate-100"
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 truncate">{l.title}</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                          {l.categoryName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3D Kid Explorer on Navbar */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/70 backdrop-blur-md rounded-full border border-white/80 shadow-sm shrink-0">
          <img
            src={APP_IMAGES.explorerMascot}
            alt="VidyaAI Explorer"
            className="w-9 h-10 object-contain filter drop-shadow animate-bounce-gentle"
          />
          <div className="text-left hidden sm:block">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block leading-tight">
              {relConfig.icon} {userGrade}
            </span>
            <span className="text-xs font-black text-slate-800 leading-tight">
              {cleanLangBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Tailored Greeting Pill */}
        <div className="hidden lg:flex flex-col text-right">
          <span className="text-xs font-black text-slate-800 leading-tight">
            {greeting.text}
          </span>
          <span className="text-[10px] font-bold text-slate-400 leading-tight">
            {cleanLangBadge}
          </span>
        </div>

        {/* Daily Streak Flame Pill */}
        <button
          onClick={() => {
            sound.playPop();
            if (onOpenStreak) onOpenStreak();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-300 text-orange-950 font-black text-xs shadow-sm hover:scale-105 transition cursor-pointer"
          title="Daily Learning Streak & Quests"
        >
          <span className="text-sm">🔥</span>
          <span>{streak.currentStreak}d</span>
        </button>

        {/* Star Bazaar Pill */}
        <button
          onClick={() => {
            sound.playPop();
            if (onOpenBazaar) onOpenBazaar();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 text-amber-950 font-black text-xs shadow-sm hover:scale-105 transition cursor-pointer"
          title="Star Bazaar & Reward Store"
        >
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{progress.starsEarned} ⭐</span>
        </button>

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

        {/* User Profile Dropdown Container */}
        <div className="relative z-50">
          <button
            onClick={() => {
              sound.playPop();
              setShowProfileMenu(!showProfileMenu);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all cursor-pointer shadow-sm hover:scale-102"
          >
            <div className={`relative w-9 h-9 rounded-full bg-gradient-to-br ${activeAvatar.color} ring-2 ring-blue-300 flex items-center justify-center text-2xl shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-[-8deg]`}>
              <span role="img" aria-label="Selected character">{activeAvatar.emoji}</span>
              {activeAccessory && (
                <span className="absolute -top-2 -right-1.5 text-xs drop-shadow-sm animate-bounce">
                  {activeAccessory.emoji}
                </span>
              )}
            </div>
            <span className="text-sm font-black text-slate-800 hidden sm:inline">Hi, {userName}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {/* Profile Dropdown with Backdrop & Top Layering */}
          {showProfileMenu && (
            <>
              {/* Click-outside backdrop */}
              <div
                className="fixed inset-0 z-[140] bg-black/5"
                onClick={() => setShowProfileMenu(false)}
              />

              {/* Elevated Dropdown Menu on top of everything */}
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] border-2 border-slate-200/90 py-3 z-[150] text-slate-700 animate-in fade-in slide-in-from-top-2 duration-150 select-none">
                <div className="px-5 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeAvatar.color} flex items-center justify-center text-2xl shadow-sm`}>
                      {activeAvatar.emoji}
                    </span>
                    <div>
                      <p className="font-black text-sm text-slate-900">{userName}</p>
                      <p className="text-xs font-bold text-blue-600">
                        {userGrade} • {relConfig.label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Language & Community Badge */}
                <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 my-2 mx-3 rounded-2xl border border-blue-200 text-xs">
                  <span className="text-[10px] font-black text-blue-700 uppercase block tracking-wider">
                    Active Languages
                  </span>
                  <span className="font-black text-slate-800">{cleanLangBadge}</span>
                </div>

                <div className="px-4 py-2 flex items-center justify-between text-xs font-black text-slate-600 bg-amber-50/80 my-2 mx-3 rounded-2xl border border-amber-200/50">
                  <span className="flex items-center gap-1.5 text-amber-600">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> {progress.starsEarned} Stars
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Award className="w-4 h-4 text-blue-500" /> {earnedBadges} Badges
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

                {onOpenAdmin && (
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenAdmin();
                    }}
                    className="w-full px-5 py-2.5 text-left text-xs font-black text-indigo-700 hover:bg-indigo-50 flex items-center gap-2.5 cursor-pointer border-t border-slate-100"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-600" /> Super Admin Portal Login
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onSwitchProfile) onSwitchProfile();
                  }}
                  className="w-full px-5 py-2.5 text-left text-xs font-black text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer border-t border-slate-100"
                >
                  <LogOut className="w-4 h-4 text-rose-500" /> Switch / Register New Student
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
