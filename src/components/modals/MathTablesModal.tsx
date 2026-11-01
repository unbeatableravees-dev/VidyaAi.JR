import React, { useState, useEffect } from 'react';
import { X, Volume2, Trophy, Clock, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';
import { femaleVoice } from '../../utils/speech';
import { addBonusStars } from '../../utils/studentProgress';
import { recordQuestProgress } from '../../utils/streakManager';

interface MathTablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null | undefined;
}

export const MathTablesModal: React.FC<MathTablesModalProps> = ({
  isOpen,
  onClose,
  studentId,
}) => {
  const [selectedTable, setSelectedTable] = useState(7);
  const [mode, setMode] = useState<'study' | 'speed-quiz'>('study');

  // Quiz state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<
    { n1: number; n2: number; correct: number; options: number[] }[]
  >([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (!isOpen) return;
    if (mode === 'speed-quiz') {
      startQuiz();
    }
  }, [isOpen, selectedTable, mode]);

  // Timer for speed quiz
  useEffect(() => {
    if (mode !== 'speed-quiz' || quizFinished || selectedAnswer !== null) return;
    if (timeLeft <= 0) {
      handleAnswer(-1); // Time out
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, quizFinished, selectedAnswer, timeLeft]);

  if (!isOpen) return null;

  const startQuiz = () => {
    const questions = [];
    for (let i = 1; i <= 10; i++) {
      const n2 = Math.floor(Math.random() * 10) + 1;
      const correct = selectedTable * n2;
      const wrong1 = selectedTable * (n2 === 10 ? 9 : n2 + 1);
      const wrong2 = Math.max(1, correct - selectedTable);
      const wrong3 = correct + Math.floor(Math.random() * 5) + 1;
      const options = [correct, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
      questions.push({ n1: selectedTable, n2, correct, options });
    }
    setQuizQuestions(questions);
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setTimeLeft(10);
  };

  const handleAnswer = (val: number) => {
    setSelectedAnswer(val);
    const curr = quizQuestions[quizQuestionIndex];
    if (curr && val === curr.correct) {
      sound.playDing();
      setQuizScore((prev) => prev + 1);
    } else {
      sound.playBuzz();
    }

    setTimeout(() => {
      if (quizQuestionIndex + 1 < quizQuestions.length) {
        setQuizQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(10);
      } else {
        setQuizFinished(true);
        sound.playFanfare();
        // Award stars
        addBonusStars(studentId, 20);
        recordQuestProgress(studentId, 'practice', 1);
      }
    }, 900);
  };

  const handleSpeakTable = () => {
    sound.playPop();
    const rows = Array.from({ length: 10 }, (_, i) => i + 1)
      .map((i) => `${selectedTable} times ${i} is ${selectedTable * i}`)
      .join(', ');
    femaleVoice.speak(`Table of ${selectedTable}. ${rows}. Fantastic job!`, 'en-US');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🧮
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">Math Tables Arena (2 to 20)</h2>
              <p className="text-xs sm:text-sm font-bold text-emerald-100">
                Master multiplication tables with voice reading & speed challenge!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              femaleVoice.stop();
              onClose();
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Table Selector Bar (2 to 20) */}
        <div className="p-3 bg-emerald-50 border-b border-emerald-200 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          <span className="text-xs font-black uppercase text-emerald-900 mr-1 whitespace-nowrap">
            Select Table:
          </span>
          {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
            <button
              key={num}
              onClick={() => {
                sound.playPop();
                femaleVoice.stop();
                setSelectedTable(num);
                if (mode === 'speed-quiz') {
                  setTimeout(startQuiz, 50);
                }
              }}
              className={`w-9 h-9 rounded-xl font-black text-xs shrink-0 transition cursor-pointer ${
                selectedTable === num
                  ? 'bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-400'
                  : 'bg-white text-slate-700 hover:bg-emerald-100 border border-slate-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Mode Toggle Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-3 pt-3">
          <button
            onClick={() => {
              sound.playPop();
              setMode('study');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              mode === 'study'
                ? 'bg-white border-emerald-400 text-emerald-800 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📖 Table Chart of {selectedTable}
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setMode('speed-quiz');
              startQuiz();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              mode === 'speed-quiz'
                ? 'bg-white border-emerald-400 text-emerald-800 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ⚡ Speed Quiz Challenge
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50">
          {mode === 'study' ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-slate-800">
                  Multiplication Table of {selectedTable}
                </h3>
                <button
                  onClick={handleSpeakTable}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 animate-pulse" /> Read Aloud Table
                </button>
              </div>

              {/* 10 Table Rows in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier) => {
                  const product = selectedTable * multiplier;
                  return (
                    <div
                      key={multiplier}
                      onClick={() => {
                        sound.playPop();
                        femaleVoice.speak(`${selectedTable} times ${multiplier} is ${product}`, 'en-US');
                      }}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 shadow-sm transition flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                          {multiplier}
                        </span>
                        <span className="text-base font-black text-slate-700">
                          {selectedTable} × {multiplier}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-emerald-700">= {product}</span>
                        <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Speed Quiz Arena */
            <div>
              {!quizFinished ? (
                quizQuestions.length > 0 && (
                  <div className="max-w-md mx-auto text-center space-y-5">
                    {/* Progress Bar & Timer */}
                    <div className="flex items-center justify-between text-xs font-black text-slate-600">
                      <span>
                        Question {quizQuestionIndex + 1} of {quizQuestions.length}
                      </span>
                      <span className="flex items-center gap-1 text-rose-600 font-extrabold">
                        <Clock className="w-4 h-4 animate-spin" /> {timeLeft}s Left
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{
                          width: `${((quizQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Question Card */}
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 shadow-lg">
                      <p className="text-xs font-black uppercase text-emerald-700 tracking-wider mb-2">
                        Speed Challenge
                      </p>
                      <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {quizQuestions[quizQuestionIndex].n1} × {quizQuestions[quizQuestionIndex].n2} = ?
                      </h3>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {quizQuestions[quizQuestionIndex].options.map((opt, i) => {
                        const isChosen = selectedAnswer === opt;
                        const isCorrect = opt === quizQuestions[quizQuestionIndex].correct;
                        return (
                          <button
                            key={i}
                            disabled={selectedAnswer !== null}
                            onClick={() => handleAnswer(opt)}
                            className={`py-4 rounded-2xl font-black text-xl transition cursor-pointer shadow-md ${
                              selectedAnswer !== null
                                ? isCorrect
                                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-300'
                                  : isChosen
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-slate-200 text-slate-400'
                                : 'bg-white hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-400 text-slate-800'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )
              ) : (
                /* Finished State */
                <div className="text-center py-8 space-y-4 max-w-sm mx-auto animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-inner">
                    🏆
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Multiplication Champion!</h3>
                  <p className="text-sm font-bold text-slate-600">
                    You scored <span className="text-emerald-700 font-black">{quizScore} / 10</span> on
                    the Table of {selectedTable}!
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 text-amber-800 font-black text-sm border border-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Reward Earned: +20 ⭐
                  </div>

                  <div className="pt-4 flex gap-3 justify-center">
                    <button
                      onClick={startQuiz}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    <button
                      onClick={() => setMode('study')}
                      className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs cursor-pointer"
                    >
                      Back to Table Chart
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
