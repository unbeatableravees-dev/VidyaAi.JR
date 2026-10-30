import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
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
} from 'lucide-react';
import { ISLAMIC_TEACHINGS, IslamicTeaching } from '../../data/islamicTeachingsData';
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
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
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
      return saved ? JSON.parse(saved) : ['seerah-lineage-birth'];
    } catch {
      return ['seerah-lineage-birth'];
    }
  });

  const categories = [
    { id: 'all', label: 'All (تمام)', urduLabel: 'تمام اسباق', icon: '✨' },
    { id: 'seerah', label: 'سیرت النبی ﷺ', urduLabel: 'Seerat-e-Rasool', icon: '💚' },
    { id: 'namaz', label: 'نماز و وضو', urduLabel: 'Namaz & Wudu', icon: '🕌' },
    { id: 'quran', label: 'قرآن کریم', urduLabel: 'Quran Studies', icon: '📖' },
    { id: 'hadith', label: 'احادیث مبارکہ', urduLabel: 'Hadith', icon: '📜' },
    { id: 'prophets', label: 'پیغمبرانِ الٰہی', urduLabel: 'Prophets', icon: '🌟' },
    { id: 'sahabah', label: 'صحابہ کرام', urduLabel: 'Sahabah R.A.', icon: '🛡️' },
    { id: 'awliya', label: 'اولیاء اللہ', urduLabel: 'Awliya Allah', icon: '🕊️' },
    { id: 'manners', label: 'حسن اخلاق', urduLabel: 'Manners', icon: '🌸' },
    { id: 'good-talks', label: 'اچھی باتیں', urduLabel: 'Good Talks', icon: '🗣️' },
    { id: 'hobbies', label: 'سنت مشاغل', urduLabel: 'Hobbies', icon: '🏹' },
  ];

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
            particleCount: 35,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'],
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

  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-5 select-none">
      {/* Top Navigation Banner */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-3xl border-2 border-emerald-200/90 shadow-lg">
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
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Islamic Academy 🕌 (اسلامی اکیڈمی)
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                Comprehensive Studies
              </span>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-emerald-700 font-urdu">
              سیرتِ رسولِ پاک ﷺ • نماز و وضو • قرآن و حدیث • پیغمبرانِ الٰہی • صحابہ کرام • اولیاء اللہ • حسن اخلاق
            </p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 px-4 py-2 rounded-2xl shadow-sm">
          <Award className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-800 block tracking-wider">
              Duas Learned
            </span>
            <span className="text-xs font-black text-emerald-950">
              {memorizedIds.length} / {ISLAMIC_TEACHINGS.length} Mastered
            </span>
          </div>
        </div>
      </header>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-200 scale-102 ring-2 ring-emerald-400/40'
                    : 'bg-white hover:bg-emerald-50/70 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-[11px] opacity-80 font-urdu hidden sm:inline">
                  ({cat.urduLabel})
                </span>
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
            placeholder="Search duas, pillars, morals..."
            className="w-full pl-9.5 pr-4 py-2 bg-white rounded-2xl border-2 border-emerald-100 focus:border-emerald-500 focus:outline-hidden text-xs font-bold text-slate-800 placeholder-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* Main 2-Column Responsive View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Interactive Cards List */}
        <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-200">
          {filteredTeachings.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-400">
              <p className="text-3xl mb-2">🔍</p>
              <p className="font-black text-slate-700 text-sm">No teachings found</p>
              <p className="text-xs text-slate-400 mt-1">Try another search keyword or category.</p>
            </div>
          ) : (
            filteredTeachings.map((item) => {
              const isSelected = activeItem?.id === item.id;
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
                        <p className="text-xs font-bold text-emerald-800 font-urdu mt-0.5">
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
                        {item.arabicText}
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

        {/* Right Column: Detailed Master Learning Showcase Card */}
        <div className="lg:col-span-7">
          {activeItem ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-300/80 shadow-xl overflow-hidden">
              {/* Header Banner */}
              <div
                className={`p-6 bg-gradient-to-r ${activeItem.color} text-white relative overflow-hidden`}
              >
                {/* Decorative background stars */}
                <div className="absolute right-3 -bottom-4 text-8xl opacity-15 pointer-events-none">
                  {activeItem.icon}
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-xs">
                        {activeItem.categoryUrdu}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-xs">
                        {activeItem.badge}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black mt-2 text-white drop-shadow-sm">
                      {activeItem.title}
                    </h2>
                    <p className="text-base font-bold text-white/95 font-urdu mt-1">
                      {activeItem.urduTitle}
                    </p>
                  </div>

                  {/* Audio & Memorize Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleSpeak(activeItem)}
                      className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all cursor-pointer ${
                        speakingId === activeItem.id
                          ? 'bg-rose-500 text-white border-white ring-2 ring-rose-300'
                          : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                      }`}
                      title={speakingId === activeItem.id ? 'Stop Audio' : 'Listen with Audio'}
                    >
                      {speakingId === activeItem.id ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => toggleMemorized(activeItem.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-black backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                        memorizedIds.includes(activeItem.id)
                          ? 'bg-emerald-400 text-emerald-950 font-black'
                          : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                      <span>{memorizedIds.includes(activeItem.id) ? 'Mastered!' : 'I Learned This!'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-5">
                {/* 1. Large Arabic Text Showcase */}
                {activeItem.arabicText && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-200/90 shadow-inner text-center">
                    <span className="text-[11px] font-black uppercase text-emerald-800 tracking-wider block mb-2">
                      ✨ متنِ قرآنی و مسنون دعا (Arabic Text)
                    </span>
                    <p className="text-2xl md:text-3xl font-extrabold text-emerald-950 font-arabic leading-loose tracking-wide dir-rtl">
                      {activeItem.arabicText}
                    </p>
                  </div>
                )}

                {/* 2. Authentic Urdu Translation */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-right">
                  <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block mb-1">
                    📖 اردو ترجمہ (Urdu Meaning)
                  </span>
                  <p className="text-base md:text-lg font-bold text-emerald-950 font-urdu leading-relaxed">
                    {activeItem.translationUrdu}
                  </p>
                </div>

                {/* 3. English Translation */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">
                    🌐 English Translation
                  </span>
                  <p className="text-sm font-extrabold text-slate-800 leading-snug">
                    "{activeItem.translationEng}"
                  </p>
                </div>

                {/* 4. Child-Friendly Explanation */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Why This Matters (سیکھنے کی بات)</span>
                  </h4>
                  <p className="text-xs md:text-sm font-extrabold text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
                    {activeItem.explanation}
                  </p>
                </div>

                {/* 5. Daily Good Deed Action Tip */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 flex items-start gap-3 shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider block">
                      🌟 Good Deed for Today (آج کی نیکی)
                    </span>
                    <p className="text-xs md:text-sm font-black text-amber-950 leading-snug mt-0.5">
                      {activeItem.practicalTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border-2 border-slate-200 text-slate-400">
              <Moon className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
              <p className="font-black text-slate-700 text-base">Select any lesson from the left</p>
              <p className="text-xs text-slate-400 mt-1">
                Explore the 5 Pillars, daily Duas, and Sunnah morals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
