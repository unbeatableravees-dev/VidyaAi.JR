import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, Trophy, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { ISLAMIC_EXAMS } from '../../data/islamicExamQuestions';
import { sound } from '../../utils/audio';

interface IslamicExamModalProps {
  examId: string;
  userGrade: string;
  onClose: () => void;
  onComplete: (result: { correct: number; total: number }) => void;
}

type ExamAnswer = string | null;
type ResultFilter = 'all' | 'correct' | 'incorrect';

export const IslamicExamModal: React.FC<IslamicExamModalProps> = ({
  examId,
  userGrade,
  onClose,
  onComplete,
}) => {
  const exam = ISLAMIC_EXAMS[examId];
  const gradeNumber = Number(userGrade.match(/\d+/)?.[0] ?? 0);
  const isGrade3Plus = gradeNumber >= 3;
  const [answers, setAnswers] = useState<ExamAnswer[]>(() => exam.questions.map(() => null));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [resultFilter, setResultFilter] = useState<ResultFilter>('all');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const correctAnswers = exam.questions.reduce(
    (total, question, index) => total + Number(answers[index] === question.answer),
    0,
  );
  const incorrectAnswers = exam.questions.length - correctAnswers;
  const questionText = (question: (typeof exam.questions)[number]) => (
    isGrade3Plus && question.questionForGrade3Plus
      ? question.questionForGrade3Plus
      : question.question
  );

  const completeExam = () => {
    sound.playSuccess();
    setIsComplete(true);
    onComplete({ correct: correctAnswers, total: exam.questions.length });
  };

  const handleNextQuestion = () => {
    sound.playPop();
    if (questionIndex === exam.questions.length - 1) {
      completeExam();
      return;
    }
    setQuestionIndex((index) => index + 1);
  };

  const restartExam = () => {
    sound.playPop();
    setAnswers(exam.questions.map(() => null));
    setQuestionIndex(0);
    setResultFilter('all');
    setIsComplete(false);
  };

  const filteredQuestions = exam.questions
    .map((question, index) => ({ question, answer: answers[index], index }))
    .filter(({ question, answer }) => {
      if (resultFilter === 'correct') return answer === question.answer;
      if (resultFilter === 'incorrect') return answer !== question.answer;
      return true;
    });

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="islamic-exam-title"
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[2rem] bg-gradient-to-br from-emerald-50 via-white to-amber-50 shadow-2xl border-4 border-white"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/95 backdrop-blur-sm border-b border-emerald-100 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-700">
              {exam.subjectLabel || 'Islamic & Urdu Exam'} · {userGrade}
            </p>
            <h2 id="islamic-exam-title" className="truncate text-lg sm:text-xl font-black text-slate-900">
              {exam.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close exam"
            className="shrink-0 rounded-full bg-slate-100 p-2.5 text-slate-600 hover:bg-rose-100 hover:text-rose-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          {!isComplete ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-800">
                  Question {questionIndex + 1} of {exam.questions.length} · {isGrade3Plus ? 'Challenge' : 'Foundation'}
                </span>
                {exam.titleUrdu && (
                  <span className="text-sm font-bold text-slate-500" dir="rtl">
                    {exam.titleUrdu}
                  </span>
                )}
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${((questionIndex + 1) / exam.questions.length) * 100}%` }}
                />
              </div>

              <div className="rounded-3xl border-2 border-emerald-100 bg-white p-5 sm:p-7 shadow-sm">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-emerald-700">
                  <BookOpen className="h-5 w-5" />
                  Choose the best answer
                </div>
                <h3
                  className={`text-xl sm:text-2xl font-black leading-relaxed text-slate-900 ${
                    exam.direction === 'rtl' ? 'text-right' : 'text-left'
                  }`}
                  dir={exam.direction || 'rtl'}
                >
                  {questionText(exam.questions[questionIndex])}
                </h3>
                <div
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                  dir={exam.direction || 'rtl'}
                >
                  {exam.questions[questionIndex].options.map((option, index) => {
                    const selected = answers[questionIndex] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          sound.playPop();
                          setAnswers((previous) => previous.map((answer, answerIndex) => (
                            answerIndex === questionIndex ? option : answer
                          )));
                        }}
                        className={`min-h-16 rounded-2xl border-2 px-4 py-3 ${
                          exam.direction === 'ltr' ? 'text-left' : 'text-right'
                        } text-base font-bold transition-all ${
                          selected
                            ? 'border-emerald-500 bg-emerald-100 text-emerald-950 shadow-md'
                            : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black text-emerald-800 shadow-sm">
                          {index + 1}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={!answers[questionIndex]}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-black text-white shadow-lg transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {questionIndex === exam.questions.length - 1 ? 'Finish Exam' : 'Next Question'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center text-white shadow-lg">
                <Trophy className="mx-auto mb-2 h-10 w-10 text-amber-200" />
                <p className="text-sm font-black uppercase tracking-widest text-emerald-100">Exam complete</p>
                <h3 className="mt-1 text-3xl font-black">
                  {correctAnswers} / {exam.questions.length}
                </h3>
                <p className="mt-1 font-bold">
                  {Math.round((correctAnswers / exam.questions.length) * 100)}% Score
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center">
                  <Check className="mx-auto h-6 w-6 text-emerald-700" />
                  <p className="mt-1 text-2xl font-black text-emerald-800">{correctAnswers}</p>
                  <p className="text-xs font-black text-emerald-800">Correct · درست</p>
                </div>
                <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-center">
                  <X className="mx-auto h-6 w-6 text-rose-700" />
                  <p className="mt-1 text-2xl font-black text-rose-800">{incorrectAnswers}</p>
                  <p className="text-xs font-black text-rose-800">Incorrect · غلط</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-lg font-black text-slate-900">Answer Scoreboard</h4>
                  <div className="flex gap-2">
                    {([
                      ['all', 'All'],
                      ['correct', 'Correct'],
                      ['incorrect', 'Incorrect'],
                    ] as const).map(([filter, label]) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setResultFilter(filter)}
                        className={`rounded-full px-3 py-1.5 text-xs font-black transition-colors ${
                          resultFilter === filter
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredQuestions.map(({ question, answer, index }) => {
                    const isCorrect = answer === question.answer;
                    return (
                      <article
                        key={`${index}-${question.sourceLessonId}`}
                        className={`rounded-2xl border-2 p-4 ${
                          isCorrect ? 'border-emerald-200 bg-emerald-50/70' : 'border-rose-200 bg-rose-50/70'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}>
                            {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-right font-black leading-relaxed text-slate-900" dir="rtl">
                              {index + 1}. {questionText(question)}
                            </p>
                            <p className="mt-2 text-sm font-bold text-slate-700" dir="rtl">
                              Your answer: <span className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>{answer}</span>
                            </p>
                            {!isCorrect && (
                              <p className="mt-1 text-sm font-bold text-emerald-800" dir="rtl">
                                Correct answer: {question.answer}
                              </p>
                            )}
                            <p className="mt-2 text-sm leading-relaxed text-slate-600" dir="rtl">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                  {filteredQuestions.length === 0 && (
                    <p className="rounded-2xl bg-slate-100 p-6 text-center font-bold text-slate-600">
                      No answers in this group.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={restartExam}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-black text-slate-700 hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl bg-slate-900 px-6 py-3 font-black text-white hover:bg-slate-800"
                >
                  Back to Games
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body,
  );
};
