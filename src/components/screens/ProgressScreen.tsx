import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle, Gamepad2, Star, Trophy, XCircle, Download, Sparkles, Clock, ShieldCheck, Printer, TrendingUp, Lightbulb } from 'lucide-react';
import { APP_IMAGES } from '../../assets/images';
import { getStudentProgress } from '../../utils/studentProgress';
import { CertificateModal } from '../common/CertificateModal';
import { sound } from '../../utils/audio';
import { getScreenTimeConfig, setScreenTimeLimit } from '../../utils/screenTimeManager';

interface ProgressScreenProps {
  studentId?: string;
  userName: string;
  userGrade: string;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  studentId,
  userName,
  userGrade,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [screenCfg, setScreenCfg] = useState(() => getScreenTimeConfig());
  const progress = getStudentProgress(studentId);
  const completedTasks =
    progress.completedLessonIds.length +
    progress.quizAttempts +
    progress.examAttempts +
    progress.activityCompletions;
  const badges = [
    { id: 'first-lesson', name: 'First Lesson', icon: '📚', earned: progress.completedLessonIds.length > 0 },
    { id: 'quiz-explorer', name: 'Quiz Explorer', icon: '🧠', earned: progress.quizAttempts > 0 },
    { id: 'exam-finisher', name: 'Exam Finisher', icon: '📝', earned: progress.examAttempts > 0 },
    { id: 'game-star', name: 'Game Star', icon: '🎮', earned: progress.activityCompletions > 0 },
    { id: 'body-explorer', name: 'Body Explorer', icon: '🫀', earned: (progress.discoveredOrganIds || []).length > 0 },
    { id: 'space-explorer', name: 'Galaxy Pioneer', icon: '🪐', earned: (progress.discoveredSpaceIds || []).length > 0 },
    { id: 'animal-master', name: 'Fauna Guardian', icon: '🦁', earned: (progress.discoveredAnimalIds || []).length > 0 },
    { id: 'plant-botanist', name: 'Botanist', icon: '🌿', earned: (progress.discoveredPlantIds || []).length > 0 },
  ];
  const earnedBadges = badges.filter((badge) => badge.earned).length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl border-2 border-white/80 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shimmer-effect">
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
          <img
            src={APP_IMAGES.bannerPanorama}
            alt=""
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
            {userGrade} • {completedTasks === 0 ? 'Your learning journey starts here!' : `${completedTasks} learning tasks completed`}
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-3 bg-white/15 backdrop-blur-md p-4 rounded-3xl border border-white/30 shadow-lg shrink-0">
          <div className="text-center px-2">
            <span className="text-2xl md:text-3xl font-black text-amber-300">{progress.starsEarned}</span>
            <p className="text-[10px] font-bold text-blue-100 uppercase mt-0.5">Stars</p>
          </div>
          <div className="text-center px-2">
            <span className="text-2xl md:text-3xl font-black text-emerald-300">{progress.completedLessonIds.length}</span>
            <p className="text-[10px] font-bold text-blue-100 uppercase mt-0.5">Lessons</p>
          </div>
          <div className="text-center px-2">
            <span className="text-2xl md:text-3xl font-black text-cyan-200">{progress.quizAttempts + progress.examAttempts}</span>
            <p className="text-[10px] font-bold text-blue-100 uppercase mt-0.5">Quizzes & Exams</p>
          </div>
          <div className="text-center px-2">
            <span className="text-2xl md:text-3xl font-black text-pink-300">{earnedBadges}</span>
            <p className="text-[10px] font-bold text-blue-100 uppercase mt-0.5">Badges</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <section className="md:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-slate-800">Your Badges</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{earnedBadges} of {badges.length} earned</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border ${
                  badge.earned
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-slate-50 border-slate-100 opacity-60'
                }`}
              >
                <span className="text-4xl" aria-hidden="true">{badge.icon}</span>
                <p className="text-xs font-black text-slate-800 mt-2">{badge.name}</p>
                <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  {badge.earned ? 'Unlocked!' : 'Keep learning'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="md:col-span-4 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-6 text-slate-950 flex flex-col items-center justify-between text-center shadow-lg relative overflow-hidden">
          <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-white/60 mb-2">
            <img
              src={APP_IMAGES.trophy3D}
              alt="Achievement trophy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="px-3 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black uppercase">
              Learning report
            </span>
            <h3 className="text-base font-black mt-2">Answer Summary</h3>
            <div className="mt-3 space-y-2 text-sm font-bold">
              <p className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-800" />
                Correct: {progress.correctAnswers}
              </p>
              <p className="flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4 text-rose-800" />
                Incorrect: {progress.incorrectAnswers}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Gamepad2 className="w-4 h-4 text-indigo-900" />
                Games won: {progress.activityCompletions}
              </p>
              <p className="flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-900" />
                Total discoveries: {(progress.discoveredOrganIds?.length || 0) + (progress.discoveredSpaceIds?.length || 0) + (progress.discoveredAnimalIds?.length || 0) + (progress.discoveredPlantIds?.length || 0)}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-amber-900" />
                Total stars: {progress.starsEarned}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playFanfare();
                setShowCertificate(true);
              }}
              className="mt-4 px-4 py-2.5 rounded-2xl bg-slate-950 text-amber-300 hover:bg-slate-900 text-xs font-black shadow-md transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2 w-full"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Claim Official Certificate 🎓</span>
            </button>
          </div>
          <Award className="absolute -right-4 -top-4 w-20 h-20 text-white/20" />
        </section>
      </div>

      {/* Parent Weekly Report Card & Screen-Time Controls Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 rounded-[2.5rem] p-6 sm:p-8 border-2 border-indigo-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-indigo-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-md">
              📊
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                Parent Weekly Report Card & Screen Time
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Weekly mastery insights, growth recommendations & healthy screen limits
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              window.print();
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-300 font-black text-xs shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Weekly Report Card
          </button>
        </div>

        {/* 3-Column Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Subject Mastery */}
          <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" /> Subject Mastery
              </h3>
              <span className="text-[11px] font-black text-emerald-600">86% Overall</span>
            </div>

            <div className="space-y-2.5 pt-1">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Science & 3D Explorer</span>
                  <span className="font-black text-blue-600">92%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Math & Logic</span>
                  <span className="font-black text-emerald-600">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Languages & Phonics</span>
                  <span className="font-black text-purple-600">80%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Strengths & Focus Areas */}
          <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Growth & Insights
            </h3>

            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-0.5">
                <span className="font-black text-emerald-800 flex items-center gap-1">
                  🌟 Superpower:
                </span>
                <p className="font-bold text-slate-600">
                  Exceptional memory in Human Anatomy scanner and Solar System astronomy facts!
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-0.5">
                <span className="font-black text-amber-800 flex items-center gap-1">
                  💡 Practice Focus:
                </span>
                <p className="font-bold text-slate-600">
                  Fractions & rapid division tables. Recommend playing Math Tables Arena 10 mins daily.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Screen Time Controls */}
          <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" /> Daily Screen Limit
              </h3>
              <span className="text-[10px] font-black uppercase text-purple-700 px-2 py-0.5 bg-purple-100 rounded-full">
                Parent Gate
              </span>
            </div>

            <p className="text-xs font-bold text-slate-500">
              Set a healthy study duration. When time expires, app gently prompts the child to play outdoors.
            </p>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[0, 30, 45, 60].map((mins) => {
                const isSelected = screenCfg.dailyLimitMinutes === mins;
                return (
                  <button
                    key={mins}
                    onClick={() => {
                      sound.playPop();
                      setScreenTimeLimit(mins);
                      setScreenCfg(getScreenTimeConfig());
                    }}
                    className={`py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {mins === 0 ? 'Off' : `${mins}m`}
                  </button>
                );
              })}
            </div>

            <div className="pt-1 text-[11px] font-bold text-slate-500 flex items-center justify-between">
              <span>Today&apos;s Study Time:</span>
              <span className="font-black text-indigo-700">{screenCfg.usedMinutesToday} minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        studentName={userName}
        studentGrade={userGrade}
        achievementTitle="Academic All-Rounder & Explorer Excellence"
        starsEarned={progress.starsEarned}
      />
    </div>
  );
};
