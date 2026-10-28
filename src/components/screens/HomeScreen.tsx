import React from 'react';
import { ArrowRight, ChevronRight, Lock, Play } from 'lucide-react';
import { ALL_CATEGORIES, PRACTICE_ACTIVITIES, FEATURED_VIDEOS } from '../../data/learningData';
import { HeroBannerIllustration, CategoryIcon, PracticeIcon } from '../illustrations/Illustrations';
import { sound } from '../../utils/audio';

interface HomeScreenProps {
  onStartLearning: () => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAllCategories: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartLearning,
  onSelectCategory,
  onViewAllCategories,
}) => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#93c5fd] via-[#7dd3fc] to-[#67e8f9] shadow-lg border border-white/60 min-h-[220px] flex items-center justify-between px-10 py-6">
        {/* Soft background light/cloud effect */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none" />

        {/* Left Text & CTA */}
        <div className="relative z-10 max-w-md space-y-3">
          <p className="text-slate-700 font-extrabold text-sm tracking-wide">Welcome Back,</p>
          <h1 className="text-3xl lg:text-4xl font-black text-[#0f2e5a] tracking-tight leading-tight">
            Let's Make<br />Learning Fun!
          </h1>
          <p className="text-slate-600 text-sm font-semibold leading-relaxed">
            Explore, learn and discover new things every day.
          </p>
          <button
            onClick={() => {
              sound.playPop();
              onStartLearning();
            }}
            className="mt-2 inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#facc15] hover:bg-[#eab308] active:scale-95 text-slate-900 font-black rounded-full shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-900 text-slate-900" />
            <span>Start Learning</span>
          </button>
        </div>

        {/* Right 3D Banner Art */}
        <div className="relative z-10 hidden md:block">
          <HeroBannerIllustration />
        </div>
      </div>

      {/* Popular Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Popular Categories</h2>
          <button
            onClick={() => {
              sound.playPop();
              onViewAllCategories();
            }}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
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
              className="rounded-2xl p-4 flex flex-col justify-between h-36 border border-white/70 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group select-none relative overflow-hidden"
            >
              {/* Centered 3D Icon */}
              <div className="flex-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <CategoryIcon type={cat.iconType} size={54} />
              </div>

              {/* Bottom Label & Arrow Button */}
              <div className="flex items-center justify-between pt-1">
                <span
                  style={{ color: cat.textColor }}
                  className="font-extrabold text-xs tracking-tight truncate pr-1"
                >
                  {cat.name}
                </span>
                <span
                  style={{ backgroundColor: cat.arrowBg }}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform shadow-sm"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
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
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Let's Practice</h2>
            <p className="text-xs font-semibold text-slate-500">Pick an activity to play</p>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onStartLearning();
            }}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
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
              className="rounded-2xl p-4 flex flex-col justify-between h-36 border border-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group select-none text-white"
            >
              <div className="flex-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <PracticeIcon type={activity.iconType} size={60} />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-extrabold text-xs tracking-tight truncate drop-shadow-sm">
                  {activity.title}
                </span>
                <span className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Videos Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Featured Videos</h2>
          <button
            onClick={() => {
              sound.playPop();
              onStartLearning();
            }}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
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
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] bg-slate-800 overflow-hidden">
                {/* 3D Scene Simulation */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-sky-900 to-amber-900 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  {video.thumbnail === 'elephant' && (
                    <div className="text-center">
                      <span className="text-4xl">🐘</span>
                    </div>
                  )}
                  {video.thumbnail === 'train' && (
                    <div className="text-center">
                      <span className="text-4xl">🚂</span>
                    </div>
                  )}
                  {video.thumbnail === 'krishna' && (
                    <div className="text-center">
                      <span className="text-4xl">🦚</span>
                    </div>
                  )}
                  {video.thumbnail === 'peacock' && (
                    <div className="text-center">
                      <span className="text-4xl">🦜</span>
                    </div>
                  )}
                  {video.thumbnail === 'detective' && (
                    <div className="text-center">
                      <span className="text-4xl">🔍</span>
                    </div>
                  )}
                </div>

                {/* Lock icon top-left */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-amber-300">
                  <Lock className="w-3.5 h-3.5" />
                </div>

                {/* Duration badge bottom-right */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-black text-white">
                  {video.duration}
                </div>
              </div>

              {/* Title */}
              <div className="p-2.5">
                <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
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
