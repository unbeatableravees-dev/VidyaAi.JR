import React from 'react';
import { ArrowRight, ChevronRight, Lock, Play, Sparkles } from 'lucide-react';
import { ALL_CATEGORIES, PRACTICE_ACTIVITIES, FEATURED_VIDEOS } from '../../data/learningData';
import { HeroBannerIllustration, CategoryIcon, PracticeIcon } from '../illustrations/Illustrations';
import { sound } from '../../utils/audio';

interface HomeScreenProps {
  userName: string;
  onStartLearning: () => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAllCategories: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  onStartLearning,
  onSelectCategory,
  onViewAllCategories,
}) => {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-28 select-none">
      {/* Hero Banner with Glossy Glassmorphism & Animations */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#93c5fd] via-[#7dd3fc] to-[#67e8f9] shadow-xl border-2 border-white/80 min-h-[230px] flex items-center justify-between px-8 md:px-12 py-7 shimmer-effect">
        {/* Soft background light/cloud effect */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/30 rounded-full blur-2xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-10 left-20 w-48 h-48 bg-yellow-200/30 rounded-full blur-xl pointer-events-none animate-float" />

        {/* Left Text & CTA */}
        <div className="relative z-10 max-w-md space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/40 backdrop-blur-md rounded-full text-xs font-black text-slate-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Welcome Back, {userName}!</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-[#0f2e5a] tracking-tight leading-tight drop-shadow-sm">
            Let's Make<br />
            <span className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
              Learning Fun!
            </span>
          </h1>

          <p className="text-slate-700 text-sm font-bold leading-relaxed">
            Explore 13 magical subjects, play quizzes, and discover new things every day.
          </p>

          <button
            onClick={() => {
              sound.playPop();
              sound.playSuccess();
              onStartLearning();
            }}
            className="mt-2 inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] hover:from-[#fde047] hover:to-[#facc15] active:scale-95 text-slate-950 font-black rounded-full shadow-lg shadow-amber-500/25 transition-all text-sm cursor-pointer glossy-pill hover:scale-105"
          >
            <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>Start Learning</span>
          </button>
        </div>

        {/* Right 3D Banner Art with animated floating */}
        <div className="relative z-10 hidden md:block animate-float">
          <HeroBannerIllustration />
        </div>
      </div>

      {/* Popular Categories Section - ALL 13 CATEGORIES with glossy card look */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Popular Categories</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black">
              All 13 Included
            </span>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onViewAllCategories();
            }}
            className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-all hover:scale-105"
          >
            View All (13) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Cards Grid - Shows ALL 13 Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ALL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                sound.playPop();
                onSelectCategory(cat.id);
              }}
              style={{ backgroundColor: cat.bgColor }}
              className="rounded-3xl p-4 flex flex-col justify-between h-40 border-2 border-white/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group select-none relative overflow-hidden glossy-bubble"
            >
              {/* Subtle top reflection sheen */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-3xl" />

              {/* Centered 3D Icon with pulse/bounce on hover */}
              <div className="flex-1 flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
                <CategoryIcon type={cat.iconType} size={58} />
              </div>

              {/* Bottom Label & Arrow Button */}
              <div className="flex items-center justify-between pt-1 z-10">
                <span
                  style={{ color: cat.textColor }}
                  className="font-black text-xs tracking-tight truncate pr-1"
                >
                  {cat.name}
                </span>
                <span
                  style={{ backgroundColor: cat.arrowBg }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-115 group-hover:rotate-45 transition-all shadow-md"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Let's Practice Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Let's Practice</h2>
            <p className="text-xs font-extrabold text-slate-500">Pick an activity to play</p>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onStartLearning();
            }}
            className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-all"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Practice Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {PRACTICE_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              onClick={() => {
                sound.playPop();
                onStartLearning();
              }}
              style={{ backgroundColor: activity.bgColor }}
              className="rounded-3xl p-4 flex flex-col justify-between h-36 border-2 border-white/60 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group select-none text-white relative overflow-hidden glossy-bubble"
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-3xl" />
              <div className="flex-1 flex items-center justify-center group-hover:scale-115 transition-transform duration-200">
                <PracticeIcon type={activity.iconType} size={62} />
              </div>
              <div className="flex items-center justify-between pt-1 z-10">
                <span className="font-black text-xs tracking-tight truncate drop-shadow">
                  {activity.title}
                </span>
                <span className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white shrink-0 group-hover:scale-115 transition-transform">
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Videos Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Featured Videos</h2>
          <button
            onClick={() => {
              sound.playPop();
              onStartLearning();
            }}
            className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-all"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FEATURED_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                sound.playPop();
                onStartLearning();
              }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] bg-slate-800 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-sky-900 to-amber-950 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {video.thumbnail === 'elephant' && <span className="text-4xl animate-bounce-gentle">🐘</span>}
                  {video.thumbnail === 'train' && <span className="text-4xl animate-wiggle">🚂</span>}
                  {video.thumbnail === 'krishna' && <span className="text-4xl">🦚</span>}
                  {video.thumbnail === 'peacock' && <span className="text-4xl">🦜</span>}
                  {video.thumbnail === 'detective' && <span className="text-4xl">🔍</span>}
                </div>

                {/* Lock icon top-left */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-amber-300">
                  <Lock className="w-3.5 h-3.5" />
                </div>

                {/* Duration badge bottom-right */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[11px] font-black text-white">
                  {video.duration}
                </div>
              </div>

              {/* Title */}
              <div className="p-3">
                <p className="text-xs font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
