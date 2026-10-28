import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  Check,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Star,
  Target,
  FileText,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/learningData';
import { AppleSvg } from '../illustrations/Illustrations';
import { sound } from '../../utils/audio';

interface QuizScreenProps {
  onBackToLesson: () => void;
  onCompleteQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  onBackToLesson,
  onCompleteQuiz,
}) => {
  // Start on Question 2 by default to match Image 4 ("Question 2 of 5", "What is 2 + 3?")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>('C');
  const [isAnswered, setIsAnswered] = useState<boolean>(true);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (key: string) => {
    setSelectedOption(key);
    setIsAnswered(true);
    sound.playPop();

    if (key === currentQ.correctAnswer) {
      sound.playSuccess();
    }
  };

  const handleNextQuestion = () => {
    sound.playPop();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onCompleteQuiz();
    }
  };

  const handlePrevQuestion = () => {
    sound.playPop();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const speakQuestion = () => {
    sound.speakText(currentQ.question);
  };

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24 space-y-6">
      {/* Top Back Navigation */}
      <button
        onClick={() => {
          sound.playPop();
          onBackToLesson();
        }}
        className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lesson</span>
      </button>

      {/* Main Grid: 8 cols left, 4 cols right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top Lesson Header Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-14 rounded-2xl bg-[#064e3b] border-2 border-[#78350f] overflow-hidden flex items-center justify-center text-white text-xs font-black shadow-inner">
                2+3=5
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 tracking-tight">
                  Addition – Let's Add 2 and 3
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold">
                    Math
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[11px] font-bold flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" /> Grade 1
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 8 min
                  </span>
                </div>
              </div>
            </div>

            {/* Great Learning Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-2xl shadow-sm">
              <span className="text-xl">⭐</span>
              <div className="text-left">
                <p className="text-xs font-black text-amber-900 leading-tight">Great</p>
                <p className="text-[10px] font-bold text-amber-700 leading-tight">Learning!</p>
              </div>
            </div>
          </div>

          {/* Quiz Container Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
            {/* Quiz Header & Step Indicators */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Quiz Time</h3>
                  <p className="text-xs font-semibold text-slate-500">
                    Choose the correct answer for each question.
                  </p>
                </div>
              </div>

              {/* Question X of 5 + Step Dots */}
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-xs font-black text-slate-700">
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {QUIZ_QUESTIONS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx <= currentQuestionIndex ? 'bg-emerald-500 scale-110' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Question Title & Audio Speaker */}
            <div className="flex items-center gap-3">
              <button
                onClick={speakQuestion}
                className="w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 active:scale-95 text-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                title="Listen to question"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">
                {currentQ.question}
              </h4>
            </div>

            {/* Visual Problem Card (Light Cyan Container) */}
            <div className="bg-[#ecfeff] border border-cyan-200/70 rounded-3xl p-6 flex items-center justify-center min-h-[140px] shadow-inner select-none">
              {currentQ.visualType === 'apples' && (
                <div className="flex items-center gap-6">
                  {/* First group of apples */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: currentQ.numA }).map((_, i) => (
                      <AppleSvg key={`a-${i}`} size={56} />
                    ))}
                  </div>

                  <span className="text-4xl font-black text-cyan-900 drop-shadow">+</span>

                  {/* Second group of apples */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: currentQ.numB }).map((_, i) => (
                      <AppleSvg key={`b-${i}`} size={56} />
                    ))}
                  </div>
                </div>
              )}

              {currentQ.visualType === 'stars' && (
                <div className="flex items-center gap-4 text-4xl">
                  {Array.from({ length: currentQ.numA + currentQ.numB }).map((_, i) => (
                    <span key={i} className="animate-pulse">
                      ⭐
                    </span>
                  ))}
                </div>
              )}

              {currentQ.visualType === 'shapes' && (
                <div className="flex items-center gap-5 text-4xl">
                  <span>🔺</span>
                  <span>🔺</span>
                  <span>🔺</span>
                  <span className="text-2xl font-black text-slate-700">+</span>
                  <span>🔺</span>
                  <span>🔺</span>
                  <span>🔺</span>
                </div>
              )}
            </div>

            {/* Options Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQ.options.map((option) => {
                const isSelected = selectedOption === option.key;
                const isCorrect = option.key === currentQ.correctAnswer;
                const showSuccess = isSelected && isCorrect;

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectOption(option.key)}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer shadow-sm ${
                      showSuccess
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 text-emerald-900'
                        : isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-900'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                          showSuccess
                            ? 'bg-emerald-500 text-white'
                            : isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {option.key}
                      </span>
                      <span className="text-lg font-black">{option.value}</span>
                    </div>

                    {showSuccess && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-200">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Correct Feedback Box */}
            {isAnswered && selectedOption === currentQ.correctAnswer && (
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-white shadow-sm">
                    <Star className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <h5 className="font-black text-emerald-900 text-sm">Correct!</h5>
                    <p className="text-xs font-bold text-emerald-700">{currentQ.explanation}</p>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-5 py-2.5 rounded-full font-extrabold text-xs flex items-center gap-2 transition-all ${
                  currentQuestionIndex === 0
                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <button
                onClick={onCompleteQuiz}
                className="px-6 py-2.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-extrabold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Progress & Objectives (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Your Progress Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900">Your Progress</h3>

            {/* Gauge */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3.8"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3.8"
                    strokeDasharray={`${progressPercentage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute font-black text-xs text-slate-800">{progressPercentage}%</div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">
                  {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length} questions completed
                </p>
              </div>
            </div>

            {/* Stars row: 2 yellow filled, 3 gray */}
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-5 h-5 ${
                    starIdx <= currentQuestionIndex + 1
                      ? 'fill-amber-400 text-amber-500'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Learning Objectives Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Learning Objectives</span>
            </div>
            <ul className="space-y-2.5 text-xs font-bold text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Add numbers up to 10</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Use real objects to count</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Solve simple addition problems</span>
              </li>
            </ul>
          </div>

          {/* Lesson Notes Card (Soft Purple) */}
          <div className="bg-[#faf5ff] border border-purple-200/70 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-purple-900 font-black text-sm">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Lesson Notes</span>
            </div>
            <ul className="space-y-2 text-xs font-bold text-purple-800 list-disc list-inside">
              <li>Addition means putting together two or more numbers.</li>
              <li>We use + (plus) sign for addition.</li>
              <li>Example: 2 + 3 = 5</li>
            </ul>
          </div>

          {/* Encouragement Banner */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 rounded-3xl p-4 border border-purple-200 flex items-center gap-3">
            <div className="w-14 h-14 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="45" r="28" fill="#fed7aa" />
                <path d="M 24 40 C 22 18 38 12 52 12 C 68 12 74 20 76 40 C 70 30 62 22 50 22 C 38 22 30 30 24 40 Z" fill="#292524" />
                <path d="M 24 30 Q 50 20 76 30" fill="none" stroke="#ec4899" strokeWidth="4" />
                <circle cx="42" cy="45" r="3" fill="#1e293b" />
                <circle cx="58" cy="45" r="3" fill="#1e293b" />
                <ellipse cx="36" cy="52" rx="4" ry="2" fill="#f43f5e" opacity="0.6" />
                <ellipse cx="64" cy="52" rx="4" ry="2" fill="#f43f5e" opacity="0.6" />
                <path d="M 46 54 Q 50 58 54 54" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <path d="M 24 78 Q 50 70 76 78 L 80 100 L 20 100 Z" fill="#ec4899" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-black text-slate-800 leading-snug">
                You are doing great!
              </p>
              <p className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
                Keep going! <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
