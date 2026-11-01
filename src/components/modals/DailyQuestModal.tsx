import React, { useState, useEffect } from 'react';
import { X, Flame, CheckCircle2, Star, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { addBonusStars } from '../../utils/studentProgress';
import {
  getStudentStreakData,
  claimQuestReward,
  DailyQuest,
  StudentStreakData,
} from '../../utils/streakManager';

interface DailyQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null | undefined;
  studentName: string;
}

export const DailyQuestModal: React.FC<DailyQuestModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
}) => {
  const [streakData, setStreakData] = useState<StudentStreakData>(() =>
    getStudentStreakData(studentId)
  );

  useEffect(() => {
    if (!isOpen) return;
    const reload = () => setStreakData(getStudentStreakData(studentId));
    reload();
    window.addEventListener('studentstreakchange', reload);
    return () => window.removeEventListener('studentstreakchange', reload);
  }, [isOpen, studentId]);

  if (!isOpen) return null;

  const handleClaim = (quest: DailyQuest) => {
    sound.playPop();
    const success = claimQuestReward(studentId, quest.id, (stars) => {
      addBonusStars(studentId, stars);
      sound.playFanfare();
    });
    if (success) {
      setStreakData(getStudentStreakData(studentId));
    }
  };

  const completedCount = streakData.todayQuests.filter((q) => q.completed).length;
  const totalCount = streakData.todayQuests.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-orange-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Flame Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 p-6 text-white relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30 animate-pulse">
                🔥
              </div>
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2">
                  {streakData.currentStreak} Day Streak!
                </h2>
                <p className="text-xs font-bold text-orange-100">
                  {studentName}&apos;s learning flame is blazing strong!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Streak Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-slate-950/20 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center">
            <div>
              <p className="text-[10px] font-black uppercase text-orange-200">Current Streak</p>
              <p className="text-lg font-black text-white">{streakData.currentStreak} Days</p>
            </div>
            <div className="border-x border-white/20">
              <p className="text-[10px] font-black uppercase text-orange-200">Record Streak</p>
              <p className="text-lg font-black text-yellow-300">{streakData.longestStreak} Days 🏆</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-orange-200">Streak Shields</p>
              <p className="text-lg font-black text-white">
                {streakData.streakFreezeAvailable} 🛡️
              </p>
            </div>
          </div>
        </div>

        {/* Quests Progress Overview */}
        <div className="p-4 px-6 bg-orange-50 border-b border-orange-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase text-orange-900 tracking-wide">
              Today&apos;s Quests: {completedCount} / {totalCount} Done
            </p>
            <div className="w-48 sm:w-64 h-2.5 bg-orange-200 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <span className="text-xs font-black px-3 py-1 bg-white rounded-full text-orange-700 shadow-sm border border-orange-200">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Quests List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 bg-slate-50/50 flex-1">
          {streakData.todayQuests.map((quest) => (
            <div
              key={quest.id}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                quest.claimed
                  ? 'bg-slate-100/70 border-slate-200 opacity-70'
                  : quest.completed
                  ? 'bg-emerald-50 border-emerald-400 shadow-md ring-2 ring-emerald-300'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner border border-slate-200">
                  {quest.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                    {quest.title}
                    {quest.completed && <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />}
                  </h4>
                  <p className="text-xs font-bold text-slate-500">{quest.description}</p>
                  <p className="text-[11px] font-black text-amber-600 mt-0.5">
                    Progress: {quest.currentCount} / {quest.targetCount}
                  </p>
                </div>
              </div>

              {/* Reward Action */}
              <div>
                {quest.claimed ? (
                  <span className="text-xs font-black text-slate-400 px-3 py-1.5 rounded-xl bg-slate-200 flex items-center gap-1">
                    Claimed ✓
                  </span>
                ) : quest.completed ? (
                  <button
                    onClick={() => handleClaim(quest)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-md transition transform hover:scale-105 cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Claim +{quest.starReward} ⭐
                  </button>
                ) : (
                  <span className="text-xs font-black text-amber-700 px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 flex items-center gap-1">
                    +{quest.starReward} ⭐
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer encouragement */}
        <div className="p-4 bg-white border-t border-slate-200 text-center">
          <p className="text-xs font-bold text-slate-500">
            Come back tomorrow to keep your streak burning! Study 15 minutes a day to grow your brain powers 🚀
          </p>
        </div>
      </div>
    </div>
  );
};
