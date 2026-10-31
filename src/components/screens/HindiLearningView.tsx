import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, BookOpen, Volume2, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { HINDI_TRACKS, HINDI_LESSONS, HindiLesson } from '../../data/hindiData';
import { sound } from '../../utils/audio';
import { getStudentProgress, setLessonCompleted } from '../../utils/studentProgress';

interface HindiLearningViewProps {
  studentId?: string;
  onBackToHome?: () => void;
}

export const HindiLearningView: React.FC<HindiLearningViewProps> = ({ studentId, onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('hindi-varnamala');
  const [activeLesson, setActiveLesson] = useState<HindiLesson>(HINDI_LESSONS[0]);
  const [completedIds, setCompletedIds] = useState<string[]>(() =>
    getStudentProgress(studentId).completedLessonIds
      .filter((id) => id.startsWith('hindi:'))
      .map((id) => id.slice('hindi:'.length))
  );

  const filteredLessons = HINDI_LESSONS.filter(
    (l) => selectedCategory === 'all' || l.category === selectedCategory
  );

  const toggleLearned = (id: string) => {
    sound.playSuccess();
    const isCompleted = completedIds.includes(id);
    setCompletedIds((previous) =>
      isCompleted ? previous.filter((item) => item !== id) : [...previous, id]
    );
    setLessonCompleted(studentId, `hindi:${id}`, !isCompleted);
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#ea580c', '#f59e0b', '#10b981', '#3b82f6'],
        });
      } catch {
        // Ignore
      }
    }
  };

  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-6 select-none pb-28">
      {/* Top Header Banner */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-5 rounded-3xl border-2 border-orange-200/90 shadow-lg">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={() => {
                sound.playPop();
                onBackToHome();
              }}
              className="p-2.5 rounded-2xl bg-orange-50 text-orange-900 hover:bg-orange-100 border border-orange-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="text-xs font-black hidden sm:inline">Home</span>
            </button>
          )}

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-600 to-red-600 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
            🕉️
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Hindi & Cultural Wisdom Academy
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 text-[11px] font-black uppercase tracking-wider">
                हिन्दी ज्ञान
              </span>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-orange-700 font-hindi mt-0.5">
              स्वर एवं व्यंजन वर्णमाला, पंचतंत्र की प्रेरक कहानियां और नैतिक संस्कार
            </p>
          </div>
        </div>

        {/* Progress badge */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 px-4 py-2 rounded-2xl shadow-sm">
          <Award className="w-5 h-5 text-orange-600 shrink-0" />
          <div>
            <span className="text-[10px] font-black uppercase text-orange-800 block tracking-wider">
              Hindi Mastery
            </span>
            <span className="text-xs font-black text-orange-950">
              {completedIds.length} / {HINDI_LESSONS.length} Learned
            </span>
          </div>
        </div>
      </header>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {HINDI_TRACKS.map((track) => (
          <button
            key={track.id}
            onClick={() => {
              sound.playPop();
              setSelectedCategory(track.id);
              const firstInTrack = HINDI_LESSONS.find((l) => l.category === track.id);
              if (firstInTrack) setActiveLesson(firstInTrack);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shadow-sm ${
              selectedCategory === track.id
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-200 scale-102 ring-2 ring-orange-400/40'
                : 'bg-white hover:bg-orange-50/70 text-slate-700 border border-slate-200'
            }`}
          >
            <span>{track.icon}</span>
            <span>{track.title}</span>
          </button>
        ))}
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Lesson Cards */}
        <div className="lg:col-span-5 space-y-3 max-h-[640px] overflow-y-auto pr-1">
          {filteredLessons.map((item) => {
            const isSelected = activeLesson.id === item.id;
            const isCompleted = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  setActiveLesson(item);
                }}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-500 shadow-lg scale-101 ring-2 ring-orange-300/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-orange-300 hover:shadow-md'
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
                      <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
                      <p className="text-sm font-bold text-orange-800 font-hindi mt-0.5">
                        {item.hindiTitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLearned(item.id);
                    }}
                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                        : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-orange-600'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                <p className="text-[11px] font-bold text-slate-600 mt-2 line-clamp-2">
                  {item.englishMeaning}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Study Viewer */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border-2 border-orange-200/90 shadow-xl overflow-hidden p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md text-white bg-gradient-to-br ${activeLesson.color}`}
                >
                  {activeLesson.icon}
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-orange-700 tracking-wider">
                    Hindi & Sanskar
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    {activeLesson.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => toggleLearned(activeLesson.id)}
                className={`px-4 py-2.5 rounded-2xl border font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  completedIds.includes(activeLesson.id)
                    ? 'bg-orange-600 text-white border-orange-700 shadow-md'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>{completedIds.includes(activeLesson.id) ? 'Mastered ⭐' : 'Mark as Learned'}</span>
              </button>
            </div>

            {/* Sacred / Authentic Hindi Text Box */}
            <div className="bg-gradient-to-b from-orange-50/80 via-amber-50/40 to-white p-6 rounded-3xl border-2 border-orange-300/80 shadow-inner">
              <p className="text-xl md:text-2xl font-bold text-orange-950 font-hindi leading-loose whitespace-pre-line">
                {activeLesson.hindiText}
              </p>
            </div>

            {/* Transliteration */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-1">
                Pronunciation:
              </span>
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                {activeLesson.transliteration}
              </p>
            </div>

            {/* English Guidance */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                English Meaning:
              </span>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                {activeLesson.englishMeaning}
              </p>
            </div>

            {/* Moral Tip */}
            <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black text-orange-900 uppercase block mb-0.5">
                  Moral Lesson / नैतिक शिक्षा
                </span>
                <p className="text-xs font-bold text-slate-700 leading-relaxed">
                  {activeLesson.moralTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
