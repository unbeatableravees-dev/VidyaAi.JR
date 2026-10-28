import React, { useState } from 'react';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  Volume2,
  Award,
  BookOpen,
  Star,
  Gamepad2,
} from 'lucide-react';
import { CATEGORY_DETAILS } from '../../data/categoryLessons';
import { ALL_CATEGORIES } from '../../data/learningData';
import { CategoryIcon } from '../illustrations/Illustrations';
import { InteractiveGameModal } from '../modals/InteractiveGameModal';
import { sound } from '../../utils/audio';

interface CategoryDetailScreenProps {
  categoryId: string;
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
}

export const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({
  categoryId,
  onBack,
  onStartLesson,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'beginner' | 'intermediate'>('all');
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const categoryMeta = ALL_CATEGORIES.find((c) => c.id === categoryId) || ALL_CATEGORIES[0];
  const detail = CATEGORY_DETAILS[categoryId] || CATEGORY_DETAILS['numbers'];

  const filteredLessons = detail.lessons.filter((l) => {
    if (selectedFilter === 'beginner') return l.difficulty === 'Beginner';
    if (selectedFilter === 'intermediate') return l.difficulty === 'Intermediate' || l.difficulty === 'Fun Activity';
    return true;
  });

  const handleSpeakCategory = () => {
    sound.playPop();
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sound.playPop();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 cursor-pointer bg-white/80 px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </button>

        {/* Listen to Title Button */}
        <button
          onClick={handleSpeakCategory}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-700 font-extrabold text-xs rounded-full border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer shadow-sm"
          title="Pronounce this category"
        >
          <Volume2 className="w-4 h-4 text-blue-600" />
          <span>Listen</span>
        </button>
      </div>

      {/* Hero Banner with Glossy Look */}
      <div
        className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r ${detail.gradient} p-8 md:p-10 text-white shadow-xl border border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 shimmer-effect`}
      >
        {/* Soft floating background particles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>Curriculum Standard • Grade 1</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm flex items-center justify-center md:justify-start gap-3">
            {detail.title}
          </h1>

          <p className="text-white/90 text-sm md:text-base font-semibold leading-relaxed">
            {detail.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-black/20 rounded-xl text-xs font-extrabold backdrop-blur-sm">
              📚 {detail.lessons.length} Interactive Lessons
            </span>
            <span className="px-3 py-1 bg-black/20 rounded-xl text-xs font-extrabold backdrop-blur-sm">
              🎮 {detail.practiceActivities.length} Fun Games
            </span>
            <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow-md">
              ⭐ Earn 50 Stars
            </span>
          </div>
        </div>

        {/* 3D Big Icon Badge with Animation */}
        <div className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-white/20 backdrop-blur-md p-4 flex items-center justify-center border-2 border-white/60 shadow-2xl animate-float">
          <CategoryIcon type={categoryMeta.iconType} size={110} />
        </div>
      </div>

      {/* Fun Fact Callout Box */}
      <div className="glossy-card rounded-2xl p-4 flex items-center gap-4 border border-amber-200/60 bg-amber-50/70">
        <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-white shrink-0 shadow-md animate-wiggle">
          <Sparkles className="w-5 h-5 fill-white" />
        </div>
        <p className="text-xs md:text-sm font-bold text-amber-900 leading-snug">
          {detail.funFact}
        </p>
      </div>

      {/* Lessons Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Chapters & Video Lessons
            </h2>
            <p className="text-xs font-bold text-slate-500">
              Click any lesson to begin learning with animated interactive visuals!
            </p>
          </div>

          {/* Level Filter Pills */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Lessons' },
              { id: 'beginner', label: 'Beginner' },
              { id: 'intermediate', label: 'Advanced' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedFilter(f.id as 'all' | 'beginner' | 'intermediate');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              onClick={() => {
                sound.playPop();
                onStartLesson(lesson.id);
              }}
              className="glossy-card rounded-3xl p-5 border border-white/80 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                {/* 3D Emoji Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200/60 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform shrink-0">
                  {lesson.thumbnailEmoji}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-black">
                      {lesson.difficulty}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" /> {lesson.duration}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {lesson.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-500 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>
              </div>

              {/* Bottom Play Action Bar */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  {lesson.isCompleted ? (
                    <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100" /> Completed (+10⭐)
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> Up Next!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all glossy-pill">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Lesson</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Games / Activities for this Category */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-purple-600" />
          <span>Interactive Practice Games</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {detail.practiceActivities.map((act, i) => (
            <div
              key={i}
              onClick={() => {
                sound.playPop();
                sound.playSuccess();
                setActiveGame(act.title);
              }}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl group-hover:scale-125 transition-transform">
                  {act.icon}
                </span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-purple-600">
                    {act.title}
                  </h4>
                  <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    {act.type}
                  </span>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-500 mb-3">
                {act.description}
              </p>

              <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-black rounded-xl shadow-md group-hover:opacity-95 transition-opacity">
                Play Now 🎮
              </button>
            </div>
          ))}
        </div>

        {/* Modal notification when clicking a game */}
        {activeGame && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
              <span className="text-5xl animate-bounce">🎉</span>
              <h3 className="text-lg font-black text-slate-900">
                Ready for {activeGame}!
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Get ready to score stars and unlock new badges in this activity!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveGame(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveGame(null);
                    onStartLesson('math-1');
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md"
                >
                  Launch Activity 🚀
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
