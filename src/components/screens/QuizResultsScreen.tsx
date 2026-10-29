import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  FileText,
  Play,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { EARNED_BADGES, RECOMMENDED_LESSONS } from '../../data/learningData';
import { QuizCelebrationIllustration, HexBadge } from '../illustrations/Illustrations';
import { sound } from '../../utils/audio';

interface QuizResultsScreenProps {
  userName: string;
  userGrade: string;
  quizResult: { correct: number; total: number };
  onContinueLearning: () => void;
  onRetakeQuiz: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const QuizResultsScreen: React.FC<QuizResultsScreenProps> = ({
  userName,
  userGrade,
  quizResult,
  onContinueLearning,
  onRetakeQuiz,
  onSelectLesson,
}) => {
  const scorePercentage = Math.round((quizResult.correct / quizResult.total) * 100);
  const wrongAnswers = quizResult.total - quizResult.correct;
  // Trigger celebratory confetti on mount
  useEffect(() => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24 space-y-6">
      {/* Celebration Hero Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#bae6fd] via-[#7dd3fc] to-[#67e8f9] shadow-xl border-2 border-white/80 min-h-[220px] flex items-center justify-between px-10 py-6">
        <div className="relative z-10 max-w-lg space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-md rounded-full text-xs font-black text-slate-800 shadow-sm">
            <span>🏆 {quizResult.subjectName || 'All Subjects'} Quiz</span>
            <span>•</span>
            <span>{quizResult.grade || userGrade}</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black text-[#0f2e5a] tracking-tight leading-snug">
            Awesome, {userName}!<br />You completed the Quiz!
          </h1>
          <p className="text-slate-700 text-xs sm:text-sm font-semibold">
            You scored {quizResult.correct} out of {quizResult.total} questions! You earned +{quizResult.correct * 10} gold stars!
          </p>
        </div>

        {/* Celebrating 3D Mascot Character */}
        <div className="relative z-10 hidden md:block w-44 h-52 flex items-center justify-center animate-bounce-gentle">
          <img
            src="/media/png1.png"
            alt="Celebrating Hero"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Row 1: Your Score, Earned Badges, Objectives + Notes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Your Score Card (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
            <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <Trophy className="w-4 h-4" />
            </div>
            <span>Your Score</span>
          </div>

          <div className="flex items-center justify-around py-2">
            {/* Circular Score Gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3.6"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.6"
                  strokeDasharray={`${scorePercentage}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-900 leading-none">{scorePercentage}%</span>
                <span className="text-[11px] font-bold text-slate-500 mt-0.5">{quizResult.correct}/{quizResult.total}</span>
              </div>
            </div>

            {/* Stars & Details Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 mb-1 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Stars Earned
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.ceil(scorePercentage / 25)
                          ? 'fill-amber-400 text-amber-500'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between gap-4 font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answers
                  </span>
                  <span className="font-black text-slate-900">{quizResult.correct}</span>
                </div>
                <div className="flex items-center justify-between gap-4 font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-rose-500">
                    <XCircle className="w-4 h-4" /> Wrong Answers
                  </span>
                  <span className="font-black text-slate-900">{wrongAnswers}</span>
                </div>
                <div className="flex items-center justify-between gap-4 font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Clock className="w-4 h-4" /> Class Level
                  </span>
                  <span className="font-black text-slate-900">{userGrade}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-center">
              <p className="text-xs font-black text-slate-800">
                {scorePercentage >= 80 ? '🌟 Outstanding Performance!' : '💪 Great Practice Effort!'}
              </p>
              <p className="text-[11px] font-semibold text-slate-400">
                {quizResult.subjectName || 'All Subjects'} • {quizResult.grade || userGrade}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onRetakeQuiz();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all glossy-pill hover:scale-102"
            >
              <span>Take 10 New Questions (Random!)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Earned Badges Card (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <span className="text-xl">🎖️</span>
              <span>Earned Badges</span>
            </div>
            <button
              onClick={() => {
                sound.playPop();
              }}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
          </div>

          {/* Badges Grid (3x2) */}
          <div className="grid grid-cols-3 gap-y-4 gap-x-2 py-1 items-start text-center">
            {EARNED_BADGES.map((b) => (
              <div key={b.id} className="flex flex-col items-center">
                <HexBadge type={b.icon} isLocked={b.isLocked} size={58} />
                <p className="text-[10px] font-extrabold text-slate-700 mt-1 max-w-[80px] leading-tight">
                  {b.name}
                </p>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-semibold text-center text-slate-400 pt-1">
            Keep learning to unlock 3 more badges!
          </div>
        </div>

        {/* Right Stack: Learning Objectives + Lesson Notes (3 cols) */}
        <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
          {/* Learning Objectives */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Learning Objectives</span>
            </div>
            <ul className="space-y-1.5 text-[11px] font-bold text-slate-700">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Add numbers up to 10</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Use real objects to count</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Solve simple addition problems</span>
              </li>
            </ul>
          </div>

          {/* Lesson Notes */}
          <div className="bg-[#faf5ff] rounded-3xl p-4 border border-purple-200/80 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-black text-xs">
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Lesson Notes</span>
            </div>
            <ul className="space-y-1 text-[11px] font-bold text-purple-800 list-disc list-inside">
              <li>Addition means putting together two or more numbers.</li>
              <li>We use + (plus) sign for addition.</li>
              <li>Example: 2 + 3 = 5</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Middle Banner Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 flex items-center justify-center text-white shadow-sm shrink-0">
            <Star className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h4 className="text-sm font-black text-emerald-950">
              Well done! You've completed this lesson.
            </h4>
            <p className="text-xs font-semibold text-emerald-700">
              Your effort today builds a brighter tomorrow!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            onContinueLearning();
          }}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Continue Learning</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* What's Next Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              What's Next?
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Recommended lessons for you
            </span>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onContinueLearning();
            }}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Recommended Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RECOMMENDED_LESSONS.map((rec) => (
            <div
              key={rec.id}
              onClick={() => {
                sound.playPop();
                onSelectLesson(rec.id);
              }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Thumbnail with Blackboard/Shapes simulation */}
              <div className="relative aspect-[16/10] bg-slate-800 overflow-hidden flex items-center justify-center">
                {rec.thumbnail === 'addition' && (
                  <div className="w-full h-full bg-[#064e3b] border-4 border-[#78350f] flex items-center justify-around px-3">
                    <span className="text-white text-xs font-black">2+3=5</span>
                    <div className="flex gap-1">
                      <span className="text-xl">🍎</span>
                      <span className="text-xl">🍎</span>
                    </div>
                  </div>
                )}
                {rec.thumbnail === 'shapes' && (
                  <div className="w-full h-full bg-gradient-to-r from-cyan-900 to-blue-900 flex items-center justify-center gap-2 text-2xl">
                    <span>🔺</span>
                    <span>🟡</span>
                    <span>🟩</span>
                  </div>
                )}
                {rec.thumbnail === 'train' && (
                  <div className="w-full h-full bg-gradient-to-r from-amber-900 to-orange-900 flex items-center justify-center text-3xl">
                    <span>🚂</span>
                  </div>
                )}
                {rec.thumbnail === 'elephant' && (
                  <div className="w-full h-full bg-gradient-to-r from-pink-900 to-purple-900 flex items-center justify-center text-3xl">
                    <span>🐘</span>
                  </div>
                )}
              </div>

              {/* Card Meta & Play button */}
              <div className="p-4 space-y-2">
                <p className="text-xs font-extrabold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {rec.title}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: rec.tagBg, color: rec.tagColor }}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black"
                    >
                      {rec.tag}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {rec.duration}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
