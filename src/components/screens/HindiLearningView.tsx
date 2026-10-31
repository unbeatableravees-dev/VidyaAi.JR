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
  Award,
  ChevronRight,
  Play,
  Compass,
} from 'lucide-react';
import {
  HINDI_TRACKS,
  HINDI_LESSONS,
  HindiLesson,
  HindiTrack,
} from '../../data/hindiData';
import { sound } from '../../utils/audio';
import { femaleVoice } from '../../utils/speech';
import { getStudentProgress, setLessonCompleted } from '../../utils/studentProgress';
import { IslamicExamModal } from '../modals/IslamicExamModal';

interface HindiLearningViewProps {
  studentId?: string;
  onBackToHome?: () => void;
  initialCategory?: string;
}

const LESSONS_PER_PAGE = 12;

export const HindiLearningView: React.FC<HindiLearningViewProps> = ({
  studentId,
  onBackToHome,
  initialCategory,
}) => {
  const [viewMode, setViewMode] = useState<'hub' | 'detail'>(
    initialCategory && initialCategory !== 'all' ? 'detail' : 'hub'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'hindi-varnamala');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLesson, setActiveLesson] = useState<HindiLesson>(() => {
    if (initialCategory && initialCategory !== 'all') {
      const match = HINDI_LESSONS.find((l) => l.category === initialCategory);
      if (match) return match;
    }
    return HINDI_LESSONS[0];
  });
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeExamId, setActiveExamId] = useState<string | null>(null);

  const [completedIds, setCompletedIds] = useState<string[]>(() =>
    getStudentProgress(studentId).completedLessonIds
      .filter((id) => id.startsWith('hindi:'))
      .map((id) => id.slice('hindi:'.length))
  );

  const filteredTracks = HINDI_TRACKS.filter((track) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      track.title.toLowerCase().includes(q) ||
      track.hindiTitle.toLowerCase().includes(q) ||
      track.description.toLowerCase().includes(q) ||
      track.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const filteredLessons = HINDI_LESSONS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    if (!searchQuery) return matchesCategory;
    const q = searchQuery.toLowerCase();
    return (
      matchesCategory &&
      (item.title.toLowerCase().includes(q) ||
        item.hindiTitle.toLowerCase().includes(q) ||
        item.hindiText.includes(searchQuery) ||
        item.explanation.toLowerCase().includes(q))
    );
  });

  const pageCount = Math.max(1, Math.ceil(filteredLessons.length / LESSONS_PER_PAGE));
  const visibleLessons = filteredLessons.slice(
    (currentPage - 1) * LESSONS_PER_PAGE,
    currentPage * LESSONS_PER_PAGE
  );

  const toggleLearned = (id: string) => {
    sound.playSuccess();
    const isCompleted = completedIds.includes(id);
    setCompletedIds((prev) =>
      isCompleted ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setLessonCompleted(studentId, `hindi:${id}`, !isCompleted);
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 45,
          spread: 75,
          origin: { y: 0.5 },
          colors: ['#ea580c', '#f59e0b', '#10b981', '#3b82f6'],
        });
      } catch {
        // Ignore
      }
    }
  };

  const handleSpeak = (text: string, id: string) => {
    if (speakingId === id) {
      femaleVoice.stop();
      setSpeakingId(null);
      return;
    }
    sound.playPop();
    setSpeakingId(id);
    femaleVoice.speak({
      text,
      lang: 'hi',
      rate: 0.86,
      pitch: 1.15,
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
    });
  };

  const openTrackDetail = (trackId: string) => {
    sound.playPop();
    setSelectedCategory(trackId);
    const firstLesson = HINDI_LESSONS.find((l) => l.category === trackId) || HINDI_LESSONS[0];
    setActiveLesson(firstLesson);
    setCurrentPage(1);
    setViewMode('detail');
  };

  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-6 select-none pb-28">
      {/* Top Header Banner */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl border-2 border-orange-200/90 shadow-lg">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={() => {
                femaleVoice.stop();
                sound.playPop();
                onBackToHome();
              }}
              className="p-2.5 rounded-2xl bg-orange-50 text-orange-900 hover:bg-orange-100 border border-orange-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="text-xs font-black hidden sm:inline">Home</span>
            </button>
          )}

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-600 to-red-600 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white shrink-0">
            🕉️
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-['Nunito',sans-serif]">
                Hindi & Cultural Wisdom Academy
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 text-[11px] font-black uppercase tracking-wider">
                हिन्दी ज्ञान
              </span>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-orange-800 font-hindi mt-0.5">
              वर्णमाला, पंचतंत्र कथाएं, सनातन संस्कार, रामायण प्रसंग, सरल श्लोक एवं बाल योग
            </p>
          </div>
        </div>

        {/* Action Controls & Progress Badge */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playPop();
              setActiveExamId('hindi-values-quiz');
            }}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Play Exam Quiz</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setViewMode((prev) => (prev === 'hub' ? 'detail' : 'hub'));
            }}
            className={`px-3.5 py-2 rounded-2xl border-2 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'hub'
                ? 'bg-orange-100 text-orange-950 border-orange-300'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            <span>{viewMode === 'hub' ? 'Reader View' : 'Hub View'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 px-3.5 py-1.5 rounded-2xl shadow-sm">
            <Award className="w-4 h-4 text-orange-600 shrink-0" />
            <div>
              <span className="text-[9px] font-black uppercase text-orange-800 block tracking-wider">
                Progress
              </span>
              <span className="text-xs font-black text-orange-950">
                {completedIds.length} / {HINDI_LESSONS.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HUB MODE: Luxury Topic Cards */}
      {viewMode === 'hub' ? (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-700" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="वर्णमाला, श्लोक, पंचतंत्र या त्यौहार खोजें..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border-2 border-orange-200 text-slate-900 placeholder:text-slate-400 font-bold text-xs focus:outline-none focus:border-orange-500 shadow-sm"
            />
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => openTrackDetail(track.id)}
                className={`rounded-[2rem] bg-white border-2 ${track.borderColor} p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group select-none relative overflow-hidden`}
              >
                {/* Top header badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100 text-orange-900">
                      {track.badge}
                    </span>
                    <span className="text-2xl group-hover:scale-125 transition-transform">
                      {track.icon}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs font-extrabold text-orange-700 font-hindi mt-0.5">
                    {track.hindiTitle}
                  </p>
                  <p className="text-xs text-slate-600 font-semibold mt-2 line-clamp-2">
                    {track.description}
                  </p>
                </div>

                {/* Stats & Footer */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-orange-50/80 rounded-xl p-1.5">
                      <span className="block text-xs font-black text-orange-950">{track.stat1Value}</span>
                      <span className="block text-[9px] font-bold text-orange-700">{track.stat1Label}</span>
                    </div>
                    <div className="bg-amber-50/80 rounded-xl p-1.5">
                      <span className="block text-xs font-black text-amber-950">{track.stat2Value}</span>
                      <span className="block text-[9px] font-bold text-amber-700">{track.stat2Label}</span>
                    </div>
                    <div className="bg-yellow-50/80 rounded-xl p-1.5">
                      <span className="block text-xs font-black text-yellow-950">{track.stat3Value}</span>
                      <span className="block text-[9px] font-bold text-yellow-700">{track.stat3Label}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-black text-orange-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {track.actionBtnLabel} <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* DETAIL MODE: Interactive Lesson Browser */
        <div className="space-y-6">
          {/* Category Tabs Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => {
                sound.playPop();
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              All Topics ({HINDI_LESSONS.length})
            </button>
            {HINDI_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedCategory(t.id);
                  const firstInCat = HINDI_LESSONS.find((l) => l.category === t.id);
                  if (firstInCat) setActiveLesson(firstInCat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === t.id
                    ? 'bg-orange-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.title}</span>
              </button>
            ))}
          </div>

          {/* Active Lesson Showcase Card */}
          {activeLesson && (
            <div className="rounded-[2.5rem] bg-white border-3 border-orange-200/90 p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-orange-100 pb-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-500 to-red-500 text-white text-3xl flex items-center justify-center shadow-lg shrink-0">
                    {activeLesson.icon}
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-[10px] font-black uppercase tracking-wider">
                      {activeLesson.badge}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                      {activeLesson.title}
                    </h2>
                    <p className="text-sm font-extrabold text-orange-700 font-hindi">
                      {activeLesson.hindiTitle}
                    </p>
                  </div>
                </div>

                {/* Audio Listen & Mark Learned Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(activeLesson.hindiText, activeLesson.id)}
                    className={`px-4 py-2 rounded-2xl font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      speakingId === activeLesson.id
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-orange-50 text-orange-900 hover:bg-orange-100 border border-orange-300'
                    }`}
                  >
                    {speakingId === activeLesson.id ? (
                      <>
                        <VolumeX className="w-4 h-4" /> Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-orange-600" /> Listen Audio
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleLearned(activeLesson.id)}
                    className={`px-4 py-2 rounded-2xl font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      completedIds.includes(activeLesson.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{completedIds.includes(activeLesson.id) ? 'Learned ⭐' : 'Mark Learned'}</span>
                  </button>
                </div>
              </div>

              {/* Main Text & Meanings */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-orange-50/60 p-5 rounded-3xl border border-orange-200/80">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-800">
                    <BookOpen className="w-4 h-4" />
                    <span>Hindi Text & Recitation</span>
                  </div>
                  <p className="text-lg md:text-xl font-bold font-hindi leading-loose text-slate-900 whitespace-pre-line">
                    {activeLesson.hindiText}
                  </p>
                  <p className="text-xs font-semibold text-orange-950/80 italic">
                    {activeLesson.transliteration}
                  </p>
                </div>

                <div className="space-y-4 bg-amber-50/60 p-5 rounded-3xl border border-amber-200/80">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>English Meaning & Life Lesson</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">
                    {activeLesson.englishMeaning}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeLesson.explanation}
                  </p>
                  <div className="pt-2 border-t border-amber-200/60 flex items-center gap-2">
                    <span className="text-xs font-black text-amber-900">💡 Daily Golden Tip:</span>
                    <span className="text-xs font-bold text-slate-700">{activeLesson.moralTip}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lessons Grid in this Category */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-600">
              Browse Lessons ({filteredLessons.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleLessons.map((l) => {
                const isSelected = activeLesson.id === l.id;
                const isCompleted = completedIds.includes(l.id);
                return (
                  <div
                    key={l.id}
                    onClick={() => {
                      sound.playPop();
                      setActiveLesson(l);
                    }}
                    className={`rounded-2xl p-4 border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/90 shadow-md scale-102'
                        : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0">{l.icon}</span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-slate-900 truncate">{l.title}</h4>
                        <p className="text-[11px] font-extrabold text-orange-700 font-hindi truncate">
                          {l.hindiTitle}
                        </p>
                      </div>
                    </div>
                    {isCompleted && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-[10px] font-black">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Faith Exam Modal */}
      {activeExamId && (
        <IslamicExamModal
          examId={activeExamId}
          userGrade="Class 2"
          onClose={() => setActiveExamId(null)}
          onComplete={(_res) => {
            sound.playSuccess();
            setActiveExamId(null);
          }}
        />
      )}
    </div>
  );
};
