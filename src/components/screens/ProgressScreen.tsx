import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle, Gamepad2, Star, Trophy, XCircle, Download, Sparkles } from 'lucide-react';
import { APP_IMAGES } from '../../assets/images';
import { getStudentProgress } from '../../utils/studentProgress';
import { CertificateModal } from '../common/CertificateModal';
import { sound } from '../../utils/audio';

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
