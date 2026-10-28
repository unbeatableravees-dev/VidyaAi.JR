import React from 'react';
import { Award, Flame, Star, Trophy, BookOpen, Clock, Calendar, CheckCircle } from 'lucide-react';
import { EARNED_BADGES } from '../../data/learningData';
import { HexBadge } from '../illustrations/Illustrations';

export const ProgressScreen: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto pb-24 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black backdrop-blur-sm">
            Student Report Card
          </span>
          <h1 className="text-3xl font-black mt-2">Aarav's Learning Journey</h1>
          <p className="text-blue-100 text-xs sm:text-sm font-semibold mt-1">
            Grade 1 • Active Streak: 7 Days 🔥 • Master of Addition & Shapes
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="text-center">
            <span className="text-2xl font-black text-amber-300">140</span>
            <p className="text-[10px] font-bold text-blue-100">Stars Earned</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <span className="text-2xl font-black text-emerald-300">24</span>
            <p className="text-[10px] font-bold text-blue-100">Lessons Done</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <span className="text-2xl font-black text-pink-300">5</span>
            <p className="text-[10px] font-bold text-blue-100">Badges Won</p>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-black text-slate-800">Badge Showcase</h2>
          </div>
          <span className="text-xs font-bold text-slate-500">5 of 6 Unlocked</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
          {EARNED_BADGES.map((b) => (
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
    </div>
  );
};
