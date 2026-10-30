import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  Search,
  Star,
  Award,
  Heart,
  Moon,
  Compass,
  Zap,
  ChevronRight,
  ChevronLeft,
  Share2,
} from 'lucide-react';
import {
  ISLAMIC_TEACHINGS,
  ISLAMIC_TRACKS,
  IslamicTeaching,
  IslamicTrack,
} from '../../data/islamicTeachingsData';
import { sound } from '../../utils/audio';

interface IslamicTeachingsViewProps {
  onBackToExplorerHub?: () => void;
  onBackToHome?: () => void;
  initialCategory?: string;
}

export const IslamicTeachingsView: React.FC<IslamicTeachingsViewProps> = ({
  onBackToExplorerHub,
  onBackToHome,
  initialCategory,
}) => {
  // View mode: 'hub' shows the big luxury cards (like Explorer), 'detail' shows the interactive reader
  const [viewMode, setViewMode] = useState<'hub' | 'detail'>(
    initialCategory && initialCategory !== 'all' ? 'detail' : 'hub'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'prophets');
  const [hubFilter, setHubFilter] = useState<'all' | 'prophets' | 'quran-hadith' | 'manners-hobbies'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<IslamicTeaching | null>(() => {
    if (initialCategory && initialCategory !== 'all') {
      const match = ISLAMIC_TEACHINGS.find((i) => i.category === initialCategory);
      if (match) return match;
    }
    return ISLAMIC_TEACHINGS[0];
  });
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Memorized / Mastered items stored in localStorage
  const [memorizedIds, setMemorizedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vidya_memorized_duas');
      return saved ? JSON.parse(saved) : ['prophet-adam', 'quran-surah-al-fatiha'];
    } catch {
      return ['prophet-adam', 'quran-surah-al-fatiha'];
    }
  });

  // Filtered tracks for the hub
  const filteredTracks = ISLAMIC_TRACKS.filter((track) => {
    const matchesSearch =
      !searchQuery ||
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.urduTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (hubFilter === 'prophets') {
      return track.id === 'prophets' || track.id === 'seerah' || track.id === 'sahabah';
    }
    if (hubFilter === 'quran-hadith') {
      return track.id === 'quran' || track.id === 'hadith' || track.id === 'namaz';
    }
    if (hubFilter === 'manners-hobbies') {
      return track.id === 'manners' || track.id === 'hobbies' || track.id === 'good-talks' || track.id === 'awliya' || track.id === 'arabic-basics';
    }
    return true;
  });

  // Filtered lessons for the detail reader view
  const filteredTeachings = ISLAMIC_TEACHINGS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.urduTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.arabicText && item.arabicText.includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  const handleOpenTrack = (trackId: IslamicTeaching['category']) => {
    sound.playPop();
    setSearchQuery('');
    setSelectedCategory(trackId);
    const firstInCat = ISLAMIC_TEACHINGS.find((i) => i.category === trackId);
    if (firstInCat) setActiveItem(firstInCat);
    setViewMode('detail');
  };

  const toggleMemorized = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playSuccess();
    setMemorizedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('vidya_memorized_duas', JSON.stringify(next));
      } catch {
        // Ignore
      }
      if (!prev.includes(id)) {
        try {
          confetti({
            particleCount: 40,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'],
          });
        } catch {
          // Ignore
        }
      }
      return next;
    });
  };

  const handleSpeak = (item: IslamicTeaching) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === item.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${item.title}. ${item.translationEng}. ${item.explanation}. Practical tip: ${item.practicalTip}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9;
    utterance.pitch = 1.05;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleNavigateNext = () => {
    sound.playPop();
    const currentIndex = filteredTeachings.findIndex((i) => i.id === currentItem?.id);
    if (currentIndex >= 0 && currentIndex < filteredTeachings.length - 1) {
      setActiveItem(filteredTeachings[currentIndex + 1]);
    }
  };

  const handleNavigatePrev = () => {
    sound.playPop();
    const currentIndex = filteredTeachings.findIndex((i) => i.id === currentItem?.id);
    if (currentIndex > 0) {
      setActiveItem(filteredTeachings[currentIndex - 1]);
    }
  };

  // =========================================================================
  // VIEW MODE: HUB OF CARDS (EXACT MATCH TO THE EXPLORER SCREENSHOT)
  // =========================================================================
  if (viewMode === 'hub') {
    return (
      <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-6 select-none pb-28">
        {/* Top Header Banner */}
        <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-5 rounded-3xl border-2 border-emerald-200/90 shadow-lg">
          <div className="flex items-center gap-3">
            {(onBackToHome || onBackToExplorerHub) && (
              <button
                onClick={() => {
                  sound.playPop();
                  if (onBackToHome) onBackToHome();
                  else if (onBackToExplorerHub) onBackToExplorerHub();
                }}
                className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                <span className="text-xs font-black hidden sm:inline">Back</span>
              </button>
            )}

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
              🕌
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Islamic Academy Hub
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                  11 Core Tracks
                </span>
              </div>
              <p className="text-xs md:text-sm font-extrabold text-emerald-700 font-urdu mt-0.5">
                سیرتِ پاک، قصص الانبیاء، قرآن کریم، احادیثِ نبویہ ﷺ، اخلاق و آداب اور اذکار
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 px-4 py-2 rounded-2xl shadow-sm">
              <Award className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-800 block tracking-wider">
                  Lessons Mastered
                </span>
                <span className="text-xs font-black text-emerald-950">
                  {memorizedIds.length} / {ISLAMIC_TEACHINGS.length} Mastered
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All 11 Tracks', icon: '✨' },
              { id: 'prophets', label: 'Prophets & Seerah', icon: '🌟' },
              { id: 'quran-hadith', label: 'Quran & Hadith', icon: '📖' },
              { id: 'manners-hobbies', label: 'Manners & Sunnah', icon: '🌸' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  sound.playPop();
                  setHubFilter(pill.id as any);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                  hubFilter === pill.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-200 scale-102 ring-2 ring-emerald-400/40'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Prophets, Surahs, Hadiths, Manners..."
              className="w-full pl-9.5 pr-4 py-2.5 bg-white rounded-2xl border-2 border-emerald-100 focus:border-emerald-500 focus:outline-hidden text-xs font-bold text-slate-800 placeholder-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* MASTER CARDS GRID (EXACT LUXURY DESIGN FROM EXPLORER SCREENSHOT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              onClick={() => handleOpenTrack(track.id)}
              className={`group relative bg-gradient-to-br ${track.color} rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border-2 ${track.borderColor} overflow-hidden flex flex-col justify-between`}
            >
              {/* 3D Visual Floating Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute -bottom-10 -right-6 text-9xl opacity-15 pointer-events-none select-none group-hover:rotate-6 transition-transform duration-500">
                {track.icon}
              </div>

              <div className="relative z-10 space-y-4">
                {/* Top Badge & Floating Icon */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>{track.badge}</span>
                  </span>
                  <span className="text-3xl animate-bounce">{track.icon}</span>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">
                    {track.title}
                  </h2>
                  <p className="text-base md:text-lg font-bold text-amber-200/95 font-urdu mt-1 text-right">
                    {track.urduTitle}
                  </p>
                  <p className="text-xs md:text-sm font-extrabold text-white/90 mt-2 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                {/* Highlights 3 Stat Boxes (Exact Match) */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                    <span className="block text-lg font-black">{track.stat1Value}</span>
                    <span className="text-[10px] font-bold text-white/80 uppercase">
                      {track.stat1Label}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                    <span className="block text-lg font-black">{track.stat2Value}</span>
                    <span className="text-[10px] font-bold text-white/80 uppercase">
                      {track.stat2Label}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                    <span className="block text-lg font-black">{track.stat3Value}</span>
                    <span className="text-[10px] font-bold text-white/80 uppercase">
                      {track.stat3Label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Bar with Action Button (Exact Match) */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-xs font-black text-white/90 flex items-center gap-1.5">
                  <span className="text-amber-300 font-black">✦</span>
                  <span className="hidden sm:inline">{track.featureLabel}</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenTrack(track.id);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-slate-900 group-hover:bg-amber-300 font-black text-xs shadow-lg transition-all cursor-pointer"
                >
                  <span>{track.actionBtnLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE: DETAILED INTERACTIVE READER (WITH HUMAN READABLE URDU FONT)
  // =========================================================================
  const currentTrack = ISLAMIC_TRACKS.find((t) => t.id === selectedCategory) || ISLAMIC_TRACKS[0];

  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-5 select-none pb-28">
      {/* Top Header with Back to Hub Button */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-3xl border-2 border-emerald-200/90 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              setViewMode('hub');
            }}
            className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
            title="Back to All Tracks"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs font-black hidden sm:inline">All Tracks</span>
          </button>

          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentTrack.color} flex items-center justify-center text-white text-2xl shadow-md border-2 border-white`}
          >
            {currentTrack.icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {currentTrack.title}
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                {filteredTeachings.length} Lessons
              </span>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-emerald-700 font-urdu mt-0.5">
              {currentTrack.urduTitle}
            </p>
          </div>
        </div>

        {/* Mastered Progress */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 px-4 py-2 rounded-2xl shadow-sm">
          <Award className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-800 block tracking-wider">
              Track Progress
            </span>
            <span className="text-xs font-black text-emerald-950">
              {filteredTeachings.filter((i) => memorizedIds.includes(i.id)).length} / {filteredTeachings.length} Learned
            </span>
          </div>
        </div>
      </header>

      {/* Track Selector Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ISLAMIC_TRACKS.map((track) => {
            const isSelected = selectedCategory === track.id;
            return (
              <button
                key={track.id}
                onClick={() => {
                  sound.playPop();
                  setSearchQuery('');
                  setSelectedCategory(track.id);
                  const firstItem = ISLAMIC_TEACHINGS.find((i) => i.category === track.id);
                  if (firstItem) setActiveItem(firstItem);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-black text-xs transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-200 scale-102 ring-2 ring-emerald-400/40'
                    : 'bg-white hover:bg-emerald-50/70 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{track.icon}</span>
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search this track..."
            className="w-full pl-9.5 pr-4 py-2 bg-white rounded-2xl border-2 border-emerald-100 focus:border-emerald-500 focus:outline-hidden text-xs font-bold text-slate-800 placeholder-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* 2-Column Responsive Layout: Left list, Right full interactive study viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: List of items */}
        <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-200">
          {filteredTeachings.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-400">
              <p className="text-3xl mb-2">🔍</p>
              <p className="font-black text-slate-700 text-sm">No teachings found</p>
              <p className="text-xs text-slate-400 mt-1">Try another search keyword.</p>
            </div>
          ) : (
            filteredTeachings.map((item) => {
              const isSelected = currentItem?.id === item.id;
              const isMemorized = memorizedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playPop();
                    setActiveItem(item);
                  }}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500 shadow-lg scale-101 ring-2 ring-emerald-300/40'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xs text-white bg-gradient-to-br ${item.color}`}
                      >
                        {item.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {item.badge}
                          </span>
                        </div>
                        {/* Human-readable Urdu title */}
                        <p className="text-sm font-bold text-emerald-800 font-urdu mt-0.5 text-right">
                          {item.urduTitle}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleMemorized(item.id, e)}
                      title={isMemorized ? 'Learned!' : 'Mark as Learned'}
                      className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                        isMemorized
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-emerald-600'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {item.arabicText && (
                    <div className="mt-2.5 p-2 rounded-xl bg-emerald-50/70 border border-emerald-100/80 text-right">
                      <p className="text-sm font-bold text-emerald-950 font-arabic leading-relaxed">
                        {item.arabicText.slice(0, 110)}...
                      </p>
                    </div>
                  )}

                  <p className="text-[11px] font-bold text-slate-600 mt-2 line-clamp-2">
                    {item.explanation}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Full Interactive Reading & Audio Lesson Pane */}
        <div className="lg:col-span-7">
          {(() => {
            const currentItem =
              activeItem && (selectedCategory === 'all' || currentItem.category === selectedCategory)
                ? activeItem
                : filteredTeachings[0] || ISLAMIC_TEACHINGS.find((i) => i.category === selectedCategory) || ISLAMIC_TEACHINGS[0];

            return currentItem ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-200/90 shadow-xl overflow-hidden p-6 md:p-8 space-y-6">
              {/* Header of Active Item */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md text-white bg-gradient-to-br ${currentItem.color}`}
                  >
                    {currentItem.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">
                      {currentItem.categoryUrdu} • {currentItem.badge}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      {currentItem.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(currentItem)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 font-black text-xs ${
                      speakingId === currentItem.id
                        ? 'bg-emerald-600 text-white border-emerald-700 animate-pulse'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                    }`}
                  >
                    {speakingId === currentItem.id ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Listen Audio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => toggleMemorized(currentItem.id, e)}
                    className={`px-4 py-2.5 rounded-2xl border font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
                      memorizedIds.includes(currentItem.id)
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>{memorizedIds.includes(currentItem.id) ? 'Mastered ✓' : 'Mark as Learned'}</span>
                  </button>
                </div>
              </div>

              {/* Crystal-clear Human-Readable Urdu Heading */}
              <div className="bg-gradient-to-r from-emerald-50/70 to-teal-50/70 p-4 rounded-2xl border border-emerald-200/80 text-right">
                <h3 className="text-xl md:text-2xl font-bold text-emerald-950 font-urdu leading-loose">
                  {currentItem.urduTitle}
                </h3>
              </div>

              {/* Sacred Arabic Quran / Hadith Text with Full Tashkeel */}
              {currentItem.arabicText && (
                <div className="bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-white p-6 rounded-3xl border-2 border-emerald-300/80 text-right shadow-inner">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-950 font-arabic leading-loose tracking-wide">
                    {currentItem.arabicText}
                  </p>
                </div>
              )}

              {/* Human-Readable Urdu Translation with Generous Line-Height */}
              <div className="space-y-2 text-right bg-slate-50/80 p-5 rounded-3xl border border-slate-200">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                  با محاورہ اردو ترجمہ و مفہوم:
                </span>
                <p className="text-base md:text-lg font-medium text-slate-900 font-urdu leading-loose">
                  {currentItem.translationUrdu}
                </p>
              </div>

              {/* English Meaning & Tafseer */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                  English Meaning & Guidance:
                </span>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  {currentItem.translationEng}
                </p>
              </div>

              {/* Life Lesson & Practical Tip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <span className="text-xs font-black text-amber-900 uppercase block mb-1 flex items-center gap-1">
                    <span>💡</span> Deep Moral Wisdom
                  </span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    {currentItem.explanation}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <span className="text-xs font-black text-emerald-900 uppercase block mb-1 flex items-center gap-1">
                    <span>🌟</span> Daily Sunnah Action
                  </span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    {currentItem.practicalTip}
                  </p>
                </div>
              </div>

              {/* Previous / Next Lesson Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={handleNavigatePrev}
                  className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNavigateNext}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-400">
                <p className="text-4xl mb-2">🕌</p>
                <p className="font-black text-slate-700">Select a teaching from the left</p>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
