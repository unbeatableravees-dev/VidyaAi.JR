import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  GraduationCap,
  HelpCircle,
  Sparkles,
  Star,
  Volume2,
  Flame,
  RotateCcw,
  BookOpen,
  Award,
} from 'lucide-react';
import {
  AdaptiveQuizQuestion,
  generateRandomQuizSet,
  QUIZ_SUBJECTS,
  normalizeGrade,
} from '../../data/quizQuestions';
import { ALL_CLASSES } from '../../types/lms';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';
import { femaleVoice } from '../../utils/speech';

interface QuizScreenProps {
  userGrade: string;
  selectedCategoryId?: string;
  onBackToLesson: () => void;
  onCompleteQuiz: (result: { correct: number; total: number; subjectName?: string; grade?: string }) => void;
}

const TOTAL_QUESTIONS = 10;
const GRADES = ALL_CLASSES.map((c) => c.id);

export const QuizScreen: React.FC<QuizScreenProps> = ({
  userGrade,
  selectedCategoryId = 'all',
  onBackToLesson,
  onCompleteQuiz,
}) => {
  const [activeGrade, setActiveGrade] = useState<string>(userGrade || 'Grade 1');
  const [activeSubjectId, setActiveSubjectId] = useState<string>(selectedCategoryId || 'all');
  
  // 10 dynamically generated random questions
  const [questions, setQuestions] = useState<AdaptiveQuizQuestion[]>(() =>
    generateRandomQuizSet(userGrade || 'Grade 1', selectedCategoryId || 'all', TOTAL_QUESTIONS)
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);

  // Sync if external props change
  useEffect(() => {
    if (userGrade && userGrade !== activeGrade) {
      setActiveGrade(userGrade);
      loadNewQuiz(userGrade, activeSubjectId);
    }
  }, [userGrade]);

  const loadNewQuiz = (grade = activeGrade, subject = activeSubjectId) => {
    sound.playPop();
    const newQuestions = generateRandomQuizSet(grade, subject, TOTAL_QUESTIONS);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setStreak(0);
  };

  const handleSwitchSubject = (subId: string) => {
    setActiveSubjectId(subId);
    loadNewQuiz(activeGrade, subId);
  };

  const handleSwitchGrade = (grade: string) => {
    setActiveGrade(grade);
    loadNewQuiz(grade, activeSubjectId);
  };

  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (key: string) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(key);
    sound.playPop();

    const isCorrect = key === currentQuestion.correctAnswer;
    if (isCorrect) {
      sound.playSuccess();
      setStreak((prev) => prev + 1);
      setStarsEarned((prev) => prev + 10);
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Fallback
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuestion || selectedOption === null) return;
    sound.playPop();

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const nextCorrectCount = correctCount + Number(isCorrect);
    setCorrectCount(nextCorrectCount);

    if (currentQuestionIndex === TOTAL_QUESTIONS - 1) {
      const activeSubObj = QUIZ_SUBJECTS.find((s) => s.id === activeSubjectId);
      onCompleteQuiz({
        correct: nextCorrectCount,
        total: TOTAL_QUESTIONS,
        subjectName: activeSubObj?.name || 'All Subjects Mix',
        grade: activeGrade,
      });
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  const speakQuestion = () => {
    sound.playPop();
    if (currentQuestion) {
      const textToSpeak = `${currentQuestion.question}. Options: ${currentQuestion.options
        .map((o) => `${o.key}: ${o.value}`)
        .join('. ')}`;
      femaleVoice.speak({ text: textToSpeak, lang: 'en', rate: 0.9 });
    }
  };

  if (!currentQuestion) return null;

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100);
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  const activeSubjectObj = QUIZ_SUBJECTS.find((s) => s.id === activeSubjectId) || QUIZ_SUBJECTS[0];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      {/* Top Bar with Back Navigation & Live Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playPop();
            onBackToLesson();
          }}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 cursor-pointer bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-sm hover:scale-105 transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lesson</span>
        </button>

        {/* Live Star & Streak Badges */}
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md animate-pulse">
              <Flame className="w-4 h-4 fill-white" />
              <span>{streak} Streak Fire!</span>
            </div>
          )}

          <div className="px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md">
            <Star className="w-4 h-4 fill-slate-950" />
            <span>+{starsEarned} Stars</span>
          </div>

          <button
            onClick={() => loadNewQuiz(activeGrade, activeSubjectId)}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200 transition-all cursor-pointer hover:rotate-180"
            title="Generate 10 Fresh Random Questions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subject Carousel / Selector Pills (13 Categories + All) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Choose Subject / Category:</span>
          </p>
          <span className="text-[11px] font-bold text-slate-400">
            10,000+ Unique Random Questions per Subject
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {QUIZ_SUBJECTS.map((sub) => {
            const isSelected = activeSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => handleSwitchSubject(sub.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-300'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 backdrop-blur-sm'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Columns: Quiz Card */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Level & Subject Banner */}
          <div className="glossy-card rounded-[2.5rem] p-5 border border-white/80 shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-600 flex items-center justify-center text-3xl shadow-md animate-bounce-gentle text-white">
                {activeSubjectObj.icon}
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>{activeSubjectObj.name} Quiz</span>
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black">
                    {currentQuestion.topic}
                  </span>

                  {/* Grade Switcher Pill */}
                  <div className="flex items-center gap-1 bg-purple-100 px-2 py-0.5 rounded-full">
                    <GraduationCap className="w-3 h-3 text-purple-700" />
                    <select
                      value={activeGrade}
                      onChange={(e) => handleSwitchGrade(e.target.value)}
                      className="bg-transparent text-purple-800 text-[11px] font-black focus:outline-none cursor-pointer"
                    >
                      {GRADES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Question {currentQuestionIndex + 1}/{TOTAL_QUESTIONS}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Randomized Generator</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400">Har baar 10 new questions!</span>
            </div>
          </div>

          {/* Question Box Card */}
          <div className="glossy-card rounded-[2.5rem] p-6 md:p-8 border border-white/80 shadow-xl space-y-6">
            {/* Question Progress Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Quiz Question</h3>
                  <p className="text-xs font-bold text-slate-400">Pick the best matching answer below</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-black text-slate-700">
                  {currentQuestionIndex + 1} of {TOTAL_QUESTIONS} Completed
                </span>
                <div className="w-28 sm:w-44 h-2.5 rounded-full bg-slate-100 mt-1.5 overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Prompt with Speaker Audio Button */}
            <div className="flex items-start gap-3">
              <button
                onClick={speakQuestion}
                className="w-10 h-10 rounded-2xl bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center cursor-pointer shrink-0 shadow-sm transition-all hover:scale-105 active:scale-95"
                title="Listen to question read aloud"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Visual Prompt Card (Rich 3D Emojis / Math Prompt) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 via-blue-50/70 to-indigo-50 border-2 border-cyan-200 p-6 flex flex-col items-center justify-center gap-3 min-h-36 text-center shadow-inner">
              <span className="px-3 py-1 rounded-full bg-white/90 text-blue-700 text-[10px] font-black uppercase tracking-wider shadow-sm">
                {currentQuestion.subjectName} · {currentQuestion.topic}
              </span>

              <span className="text-3xl md:text-4xl font-black text-slate-800 tracking-wide drop-shadow-sm">
                {currentQuestion.visualPrompt}
              </span>
            </div>

            {/* 4 Interactive Option Buttons (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === option.key;
                const isAnswer = option.key === currentQuestion.correctAnswer;
                const showCorrect = selectedOption !== null && isAnswer;
                const showWrong = isSelected && !isAnswer;

                const letterColors = [
                  'bg-blue-500 text-white',
                  'bg-purple-500 text-white',
                  'bg-amber-500 text-white',
                  'bg-emerald-500 text-white',
                ];

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectOption(option.key)}
                    disabled={selectedOption !== null}
                    className={`p-4 md:p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 shadow-sm cursor-pointer disabled:cursor-default select-none ${
                      showCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 scale-102 ring-4 ring-emerald-200 shadow-lg'
                        : showWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                        : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-blue-300 text-slate-800 hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shadow-sm shrink-0 ${
                          showCorrect
                            ? 'bg-emerald-500 text-white'
                            : showWrong
                            ? 'bg-rose-500 text-white'
                            : letterColors[idx % letterColors.length]
                        }`}
                      >
                        {option.key}
                      </span>
                      <span className="text-sm md:text-base font-black truncate">{option.value}</span>
                    </span>

                    {showCorrect && <Check className="w-6 h-6 text-emerald-600 stroke-[3] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Instant Answer Explanation Banner & Next Question CTA */}
            {selectedOption !== null && (
              <div
                className={`${
                  isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
                } border-2 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200 shadow-md`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${
                      isCorrect ? 'bg-emerald-500' : 'bg-amber-400'
                    } flex items-center justify-center text-white shrink-0 shadow-md`}
                  >
                    {isCorrect ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : (
                      <Star className="w-6 h-6 fill-white text-white" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-base">
                      {isCorrect ? '🌟 Superb! Correct Answer!' : '💡 Let’s Learn Together!'}
                    </h5>
                    <p className="text-xs font-bold text-slate-700 mt-0.5 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer shrink-0 glossy-pill transition-all active:scale-95"
                >
                  <span>
                    {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'See Final Results 🏆' : 'Next Question'}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 4 Columns: 3D Mascot Character & Live Score Card */}
        <div className="lg:col-span-4 space-y-5">
          {/* 3D Mascot Illustration Card using new media image! */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white p-6 shadow-xl border border-white/40 flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="relative w-44 h-56 md:w-56 md:h-64 mb-2 flex items-center justify-center">
              <img
                src={APP_IMAGES.hero3D}
                alt="VidyaAI 3D Mascot"
                className="w-full h-full object-contain filter drop-shadow-2xl animate-float-slow"
              />
            </div>

            <div className="space-y-1 relative z-10">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider">
                VidyaAI Learning Buddy
              </span>
              <h4 className="text-base font-black tracking-tight drop-shadow">
                Keep Going, Superstar! 🚀
              </h4>
              <p className="text-xs text-blue-100 font-semibold max-w-xs">
                Each correct quiz answer earns you shiny stars & special badges!
              </p>
            </div>
          </div>

          {/* Live Score & Streak Card */}
          <div className="glossy-card rounded-[2.5rem] p-6 border border-white/80 shadow-xl space-y-4">
            <h4 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Your Quiz Score</span>
              <span className="text-blue-600 text-xs font-black">{activeGrade}</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/80 rounded-2xl p-3.5 border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Correct</p>
                <p className="text-2xl font-black text-emerald-600">
                  {correctCount} / {currentQuestionIndex + (selectedOption !== null ? 1 : 0)}
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-3.5 border border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Stars Won</p>
                <p className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                  ⭐ {starsEarned}
                </p>
              </div>
            </div>

            {/* Streak Indicator */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-xs font-black text-slate-800">Answer Streak</p>
                  <p className="text-[11px] font-bold text-purple-700">
                    {streak} in a row
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-purple-600">
                {streak >= 3 ? 'On Fire! 🚀' : 'Keep Going! 💪'}
              </span>
            </div>

            {/* Instant New 10 Quiz Button */}
            <button
              onClick={() => loadNewQuiz(activeGrade, activeSubjectId)}
              className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-black text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all hover:scale-102"
            >
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>Generate 10 New Questions</span>
            </button>
          </div>

          {/* Quick Level Switch Card */}
          <div className="glossy-card rounded-[2.5rem] p-6 border border-white/80 shadow-xl space-y-3">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Select Class / Level:</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => handleSwitchGrade(g)}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                    activeGrade === g
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <p className="text-[11px] font-bold text-slate-400 text-center pt-1">
              Questions adapt to the chosen grade's difficulty!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
