import React from 'react';
import { Award, Flame, Star, Trophy, BookOpen, Clock, Calendar, CheckCircle } from 'lucide-react';
import { EARNED_BADGES } from '../../data/learningData';
import { HexBadge } from '../illustrations/Illustrations';
import { APP_IMAGES } from '../../assets/images';

export const ProgressScreen: React.FC = () => {
  const userName = localStorage.getItem('vidya_user_name') || 'Aarav';
  const userGrade = localStorage.getItem('vidya_user_grade') || 'Grade 1';

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      {/* Achievements Hero Banner with animation3.png (as requested) */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl border-2 border-white/80 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shimmer-effect">
        {/* Wide Panorama Banner Art (animation3.png) */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
          <img
            src={APP_IMAGES.bannerPanorama}
            alt="Achievements Panorama"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black shadow-sm">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Student Achievements & Report Card</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
            {userName}'s Achievements 🌟
          </h1>

          <p className="text-blue-100 text-sm md:text-base font-semibold leading-relaxed">
            {userGrade} • Active Streak: 7 Days 🔥 • Master of Addition, Shapes & Science
          </p>
        </div>

        {/* Stats Pill in Banner */}
        <div className="relative z-10 flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 md:p-5 rounded-3xl border border-white/30 shadow-lg shrink-0">
          <div className="text-center px-2">
            <span className="text-2xl md:text-3xl font-black text-amber-300">140</span>
            <p className="text-[10px] font-bold text-blue-100 uppercase mt-0.5">Stars Earned</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center px-2">
            <span className="text-2xl md:text-3xl font-black text-emerald-300">24</span>
            <p className="text-[10px] font-bold text-blue-100 uppercase mt-0.5">Lessons Done</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center px-2">
            <span className="text-2xl md:text-3xl font-black text-pink-300">5</span>
            <p className="text-[10px] font-bold text-blue-100 uppercase mt-0.5">Badges Won</p>
          </div>
        </div>
      </div>

      {/* Panorama Achievements Visual Showcase Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-md">
        <div className="relative aspect-[3/1] max-h-56 w-full overflow-hidden">
          <img
            src="/media/animation3.png"
            alt="Achievements Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
            <div className="text-white space-y-1">
              <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full shadow-sm uppercase">
                Milestone Reached
              </span>
              <h3 className="text-xl font-black drop-shadow">Golden Explorer Level 5 Unlocked!</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Collection & 3D Trophy Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-slate-800">Badge Showcase</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">5 of 6 Unlocked</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            {EARNED_BADGES.slice(0, 5).map((b) => (
              <div key={b.id} className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <HexBadge type={b.icon} isLocked={b.isLocked} size={64} />
                <p className="text-xs font-black text-slate-800 mt-2">{b.name}</p>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                  {b.isLocked ? 'Locked' : 'Unlocked!'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Generated Gold Trophy Card (vidya-trophy-3d.jpg) */}
        <div className="md:col-span-4 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-6 text-slate-950 flex flex-col items-center justify-between text-center shadow-lg relative overflow-hidden group">
          <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-white/60 mb-2 group-hover:scale-105 transition-transform">
            <img
              src={APP_IMAGES.trophy3D}
              alt="3D Gold Achievement Trophy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="px-3 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black uppercase">
              Grand Champion
            </span>
            <h4 className="text-base font-black mt-1">Quiz Master Cup</h4>
            <p className="text-[11px] font-bold text-slate-800 mt-0.5">
              Awarded for solving 10 consecutive adaptive challenges!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
