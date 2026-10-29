import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  GraduationCap,
  HelpCircle,
  Sparkles,
  Star,
  Target,
  Volume2,
} from 'lucide-react';
import {
  AdaptiveQuizQuestion,
  getAdaptiveQuizQuestion,
  getInitialQuizDifficulty,
} from '../../data/quizQuestions';
import { sound } from '../../utils/audio';

interface QuizScreenProps {
  userGrade: string;
  onBackToLesson: () => void;
  onCompleteQuiz: (result: { correct: number; total: number }) => void;
}

const TOTAL_QUESTIONS = 10;

const difficultyLabel = (difficulty: number) => {
  if (difficulty === 3) return 'Challenge';
  return difficulty === 2 ? 'Class level' : 'Foundation';
};

export const QuizScreen: React.FC<QuizScreenProps> = ({
  userGrade,
  onBackToLesson,
  onCompleteQuiz,
}) => {
  const [questions, setQuestions] = useState<AdaptiveQuizQuestion[]>(() => {
    const first = getAdaptiveQuizQuestion(
      userGrade,
      getInitialQuizDifficulty(userGrade),
      new Set(),
    );
    return first ? [first] : [];
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [skillLevel, setSkillLevel] = useState<1 | 2 | 3>(() => getInitialQuizDifficulty(userGrade));
  const [correctStreak, setCorrectStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (key: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(key);
    sound.playPop();
    if (key === currentQuestion?.correctAnswer) sound.playSuccess();
  };

  const handleNextQuestion = () => {
    if (!currentQuestion || selectedOption === null) return;
    sound.playPop();

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const nextCorrectCount = correctCount + Number(isCorrect);
    setCorrectCount(nextCorrectCount);

    if (currentQuestionIndex === TOTAL_QUESTIONS - 1) {
      onCompleteQuiz({ correct: nextCorrectCount, total: TOTAL_QUESTIONS });
      return;
    }

    const nextStreak = isCorrect ? correctStreak + 1 : 0;
    const nextDifficulty: 1 | 2 | 3 = isCorrect
      ? nextStreak >= 2
        ? Math.min(3, skillLevel + 1) as 1 | 2 | 3
        : skillLevel
      : Math.max(1, skillLevel - 1) as 1 | 2 | 3;
    const nextQuestion = getAdaptiveQuizQuestion(
      userGrade,
      nextDifficulty,
      new Set(questions.map((question) => question.id)),
    );

    if (!nextQuestion) {
      onCompleteQuiz({ correct: nextCorrectCount, total: currentQuestionIndex + 1 });
      return;
    }

    setCorrectStreak(nextStreak);
    setSkillLevel(nextDifficulty);
    setQuestions((previous) => [...previous, nextQuestion]);
    setCurrentQuestionIndex((previous) => previous + 1);
    setSelectedOption(null);
  };

  const speakQuestion = () => {
    sound.playPop();
    if ('speechSynthesis' in window && currentQuestion) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentQuestion.question));
    }
  };

  if (!currentQuestion) return null;

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100);
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-24 space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-3xl shadow-md animate-bounce-gentle">
                🧠
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  {userGrade} Adaptive Challenge
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold">
                    {currentQuestion.topic}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[11px] font-bold flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" /> {userGrade}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 10 questions
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded-2xl">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-black text-amber-900">Your level, your pace</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Quiz Time</h3>
                  <p className="text-xs font-semibold text-slate-500">Each answer helps choose your next question.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-black text-slate-700">
                  Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
                </span>
                <div className="w-28 sm:w-40 h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button
                onClick={speakQuestion}
                className="w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center cursor-pointer shrink-0"
                title="Listen to question"
                aria-label="Listen to question"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <h4 className="text-lg md:text-xl font-black text-slate-900">{currentQuestion.question}</h4>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 min-h-32 text-center">
              <span className="px-3 py-1 rounded-full bg-white/80 text-blue-700 text-[10px] font-black uppercase tracking-wider">
                {currentQuestion.topic} · {difficultyLabel(currentQuestion.difficulty)}
              </span>
              <span className="text-2xl md:text-3xl font-black text-cyan-950">
                {currentQuestion.visualPrompt}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.key;
                const isAnswer = option.key === currentQuestion.correctAnswer;
                const showCorrect = selectedOption !== null && isAnswer;
                const showWrong = isSelected && !isAnswer;

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectOption(option.key)}
                    disabled={selectedOption !== null}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between text-left transition-all shadow-sm disabled:cursor-default ${
                      showCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : showWrong
                          ? 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center ${
                        showCorrect ? 'bg-emerald-500 text-white' : showWrong ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {option.key}
                      </span>
                      <span className="text-base font-black">{option.value}</span>
                    </span>
                    {showCorrect && <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className={`${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${isCorrect ? 'bg-emerald-500' : 'bg-amber-400'} flex items-center justify-center text-white`}>
                    {isCorrect ? <Check className="w-6 h-6 stroke-[3]" /> : <Star className="w-6 h-6 fill-white" />}
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-sm">{isCorrect ? 'Correct!' : 'Let’s learn from it!'}</h5>
                    <p className="text-xs font-bold text-slate-700">{currentQuestion.explanation}</p>
                  </div>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>{currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'See Results' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
              <span>Correct so far: {correctCount}</span>
              <span>Answer carefully — each choice is final.</span>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900">Your Progress</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3.8" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563eb" strokeWidth="3.8" strokeDasharray={`${progressPercentage}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute font-black text-xs text-slate-800">{progressPercentage}%</div>
              </div>
              <p className="text-xs font-bold text-slate-700">
                {currentQuestionIndex + (selectedOption !== null ? 1 : 0)} of {TOTAL_QUESTIONS} questions answered
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-5 h-5 ${star <= Math.ceil(correctCount / 2) ? 'fill-amber-400 text-amber-500' : 'fill-slate-200 text-slate-200'}`} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Adaptive Learning</span>
            </div>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              Start at your {userGrade} level. Correct answers unlock harder puzzles; a tricky question brings the next one back to a comfortable level.
            </p>
            <div className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700">
              Current level: {difficultyLabel(skillLevel)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
