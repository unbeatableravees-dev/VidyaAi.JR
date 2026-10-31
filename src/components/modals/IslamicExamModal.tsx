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
  const exam = ISLAMIC_EXAMS[examId] || ISLAMIC_EXAMS['islamic-manners-exam'];
  const gradeNumber = Number(userGrade.match(/\d+/)?.[0] ?? 0);
  const isGrade3Plus = gradeNumber >= 3;
  const [answers, setAnswers] = useState<ExamAnswer[]>(() => exam.questions.map(() => null));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [resultFilter, setResultFilter] = useState<ResultFilter>('all');

  const isHindi =
    examId.includes('hindi') ||
    exam.subjectLabel?.toLowerCase().includes('hindu') ||
    exam.title.toLowerCase().includes('hindu') ||
    exam.faith === 'hindu';

  const isSikh =
    examId.includes('sikh') ||
    examId.includes('punjabi') ||
    exam.subjectLabel?.toLowerCase().includes('sikh') ||
    exam.title.toLowerCase().includes('punjabi') ||
    exam.faith === 'sikh';

  const isIslamic =
    examId.includes('islamic') ||
    Boolean(exam.titleUrdu) ||
    exam.faith === 'muslim';

  const theme = isHindi
    ? {
        gradient: 'from-orange-500 via-amber-500 to-red-600',
        bgBackdrop: 'from-orange-50 via-white to-amber-50',
        headerBorder: 'border-orange-200',
        headerSubject: 'text-orange-700',
        pillBg: 'bg-orange-100 text-orange-950',
        progressBg: 'bg-orange-100',
        progressBar: 'from-orange-500 to-amber-500',
        cardBorder: 'border-orange-200',
        instructionColor: 'text-orange-800',
        selectedOption: 'border-orange-500 bg-orange-100 text-orange-950 shadow-md',
        hoverOption: 'hover:border-orange-300 hover:bg-orange-50',
        indexBadge: 'text-orange-800',
        nextBtn: 'bg-orange-600 hover:bg-orange-700',
        instruction: 'Choose the best answer · सही उत्तर चुनें',
        progressSecondary: `· प्रश्न ${questionIndex + 1} / ${exam.questions.length}`,
        nextLabel: 'Next Question · अगला प्रश्न',
        finishLabel: 'Finish Exam · परीक्षा पूर्ण करें',
        completeBanner: 'from-orange-600 to-amber-600',
        completeText: 'Exam Complete · परीक्षा सम्पन्न',
        correctBox: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        correctLabel: 'Correct · सही',
        incorrectBox: 'border-rose-200 bg-rose-50 text-rose-800',
        incorrectLabel: 'Incorrect · गलत',
        scoreboardTitle: 'Answer Scoreboard · परीक्षा परिणाम',
        filterAll: 'All · सभी',
        filterCorrect: 'Correct · सही',
        filterIncorrect: 'Incorrect · गलत',
      }
    : isSikh
    ? {
        gradient: 'from-amber-500 via-orange-500 to-yellow-600',
        bgBackdrop: 'from-amber-50 via-white to-orange-50',
        headerBorder: 'border-amber-200',
        headerSubject: 'text-amber-700',
        pillBg: 'bg-amber-100 text-amber-950',
        progressBg: 'bg-amber-100',
        progressBar: 'from-amber-500 to-yellow-500',
        cardBorder: 'border-amber-200',
        instructionColor: 'text-amber-800',
        selectedOption: 'border-amber-500 bg-amber-100 text-amber-950 shadow-md',
        hoverOption: 'hover:border-amber-300 hover:bg-amber-50',
        indexBadge: 'text-amber-800',
        nextBtn: 'bg-amber-600 hover:bg-amber-700',
        instruction: 'Choose the best answer · ਸਹੀ ਜਵਾਬ ਚੁਣੋ',
        progressSecondary: `· ਪ੍ਰਸ਼ਨ ${questionIndex + 1} / ${exam.questions.length}`,
        nextLabel: 'Next Question · ਅਗਲਾ ਪ੍ਰਸ਼ਨ',
        finishLabel: 'Finish Exam · ਪ੍ਰੀਖਿਆ ਮੁਕੰਮਲ',
        completeBanner: 'from-amber-600 to-yellow-600',
        completeText: 'Exam Complete · ਪ੍ਰੀਖਿਆ ਮੁਕੰਮਲ',
        correctBox: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        correctLabel: 'Correct · ਸਹੀ',
        incorrectBox: 'border-rose-200 bg-rose-50 text-rose-800',
        incorrectLabel: 'Incorrect · ਗਲਤ',
        scoreboardTitle: 'Answer Scoreboard · ਨਤੀਜਾ',
        filterAll: 'All · ਸਾਰੇ',
        filterCorrect: 'Correct · ਸਹੀ',
        filterIncorrect: 'Incorrect · ਗਲਤ',
      }
    : isIslamic
    ? {
        gradient: 'from-emerald-600 to-teal-600',
        bgBackdrop: 'from-emerald-50 via-white to-amber-50',
        headerBorder: 'border-emerald-100',
        headerSubject: 'text-emerald-700',
        pillBg: 'bg-emerald-100 text-emerald-800',
        progressBg: 'bg-emerald-100',
        progressBar: 'from-emerald-500 to-teal-500',
        cardBorder: 'border-emerald-100',
        instructionColor: 'text-emerald-700',
        selectedOption: 'border-emerald-500 bg-emerald-100 text-emerald-950 shadow-md',
        hoverOption: 'hover:border-emerald-300 hover:bg-emerald-50',
        indexBadge: 'text-emerald-800',
        nextBtn: 'bg-emerald-600 hover:bg-emerald-700',
        instruction: 'Choose the best answer · بہترین جواب منتخب کریں',
        progressSecondary: `· سوال ${questionIndex + 1} از ${exam.questions.length} · ${isGrade3Plus ? 'چیلنج' : 'بنیادی'}`,
        nextLabel: 'Next Question · اگلا سوال',
        finishLabel: 'Finish Exam · امتحان مکمل کریں',
        completeBanner: 'from-emerald-600 to-teal-600',
        completeText: 'Exam complete · امتحان مکمل',
        correctBox: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        correctLabel: 'Correct · درست',
        incorrectBox: 'border-rose-200 bg-rose-50 text-rose-800',
        incorrectLabel: 'Incorrect · غلط',
        scoreboardTitle: 'Answer Scoreboard · جوابات کا نتیجہ',
        filterAll: 'All · سب',
        filterCorrect: 'Correct · درست',
        filterIncorrect: 'Incorrect · غلط',
      }
    : {
        gradient: 'from-blue-600 to-indigo-600',
        bgBackdrop: 'from-blue-50 via-white to-indigo-50',
        headerBorder: 'border-blue-100',
        headerSubject: 'text-blue-700',
        pillBg: 'bg-blue-100 text-blue-900',
        progressBg: 'bg-blue-100',
        progressBar: 'from-blue-500 to-indigo-500',
        cardBorder: 'border-blue-100',
        instructionColor: 'text-blue-700',
        selectedOption: 'border-blue-500 bg-blue-100 text-blue-950 shadow-md',
        hoverOption: 'hover:border-blue-300 hover:bg-blue-50',
        indexBadge: 'text-blue-800',
        nextBtn: 'bg-blue-600 hover:bg-blue-700',
        instruction: 'Choose the best answer',
        progressSecondary: '',
        nextLabel: 'Next Question',
        finishLabel: 'Finish Quiz',
        completeBanner: 'from-blue-600 to-indigo-600',
        completeText: 'Quiz Complete',
        correctBox: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        correctLabel: 'Correct',
        incorrectBox: 'border-rose-200 bg-rose-50 text-rose-800',
        incorrectLabel: 'Incorrect',
        scoreboardTitle: 'Answer Scoreboard',
        filterAll: 'All',
        filterCorrect: 'Correct',
        filterIncorrect: 'Incorrect',
      };

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
  const questionText = (question: (typeof exam.questions)[number]) =>
    isGrade3Plus && question.questionForGrade3Plus
      ? question.questionForGrade3Plus
      : question.question;

  const englishQuestionText = (question: (typeof exam.questions)[number]) =>
    isGrade3Plus && question.english?.questionForGrade3Plus
      ? question.english.questionForGrade3Plus
      : question.english?.question;

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
        aria-labelledby="faith-exam-title"
        className={`relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[2rem] bg-gradient-to-br ${theme.bgBackdrop} shadow-2xl border-4 border-white`}
      >
        <div className={`sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/95 backdrop-blur-sm border-b ${theme.headerBorder} px-5 py-4 sm:px-7`}>
          <div className="min-w-0">
            <p className={`text-xs font-black uppercase tracking-widest ${theme.headerSubject}`}>
              {exam.subjectLabel || 'Interactive Quiz'} · {userGrade}
            </p>
            <h2 id="faith-exam-title" className="truncate text-lg sm:text-xl font-black text-slate-900">
              {exam.title}{' '}
              {exam.titleUrdu && <span className="font-bold font-urdu" dir="rtl">· {exam.titleUrdu}</span>}
              {exam.titleHindi && <span className="font-bold font-hindi">· {exam.titleHindi}</span>}
              {exam.titlePunjabi && <span className="font-bold font-punjabi">· {exam.titlePunjabi}</span>}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close exam"
            className="shrink-0 rounded-full bg-slate-100 p-2.5 text-slate-600 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          {!isComplete ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className={`rounded-full ${theme.pillBg} px-3 py-1.5 text-xs font-black`}>
                  Question {questionIndex + 1} of {exam.questions.length} · {isGrade3Plus ? 'Challenge' : 'Foundation'}{' '}
                  <span className="mr-1">{theme.progressSecondary}</span>
                </span>
              </div>

              <div className={`h-2 overflow-hidden rounded-full ${theme.progressBg}`}>
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.progressBar} transition-all duration-500`}
                  style={{ width: `${((questionIndex + 1) / exam.questions.length) * 100}%` }}
                />
              </div>

              <div className={`rounded-3xl border-2 ${theme.cardBorder} bg-white p-5 sm:p-7 shadow-sm`}>
                <div className={`mb-4 flex items-center gap-2 text-sm font-bold ${theme.instructionColor}`}>
                  <BookOpen className="h-5 w-5" />
                  <span>{theme.instruction}</span>
                </div>
                <div className="space-y-3">
                  {englishQuestionText(exam.questions[questionIndex]) && (
                    <h3 className="text-left text-xl sm:text-2xl font-black leading-relaxed text-slate-900" dir="ltr">
                      {englishQuestionText(exam.questions[questionIndex])}
                    </h3>
                  )}
                  <h3
                    className={`text-xl sm:text-2xl font-black leading-relaxed text-slate-900 ${
                      exam.direction === 'rtl' ? 'text-right font-urdu' : isHindi ? 'font-hindi' : isSikh ? 'font-punjabi' : ''
                    }`}
                    dir={exam.direction || 'ltr'}
                  >
                    {questionText(exam.questions[questionIndex])}
                  </h3>
                </div>
                <div
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                  dir={exam.direction || 'ltr'}
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
                          setAnswers((previous) =>
                            previous.map((answer, answerIndex) =>
                              answerIndex === questionIndex ? option : answer
                            )
                          );
                        }}
                        className={`min-h-16 rounded-2xl border-2 px-4 py-3 text-base font-bold transition-all cursor-pointer ${
                          selected
                            ? theme.selectedOption
                            : `border-slate-200 bg-slate-50 text-slate-800 ${theme.hoverOption}`
                        }`}
                      >
                        <span className="flex items-start gap-3">
                          <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black shadow-sm ${theme.indexBadge}`}>
                            {index + 1}
                          </span>
                          <span className="min-w-0 flex-1 space-y-1">
                            {exam.questions[questionIndex].english?.options[index] && (
                              <span className="block text-left" dir="ltr">
                                {exam.questions[questionIndex].english?.options[index]}
                              </span>
                            )}
                            <span
                              className={`block ${exam.direction === 'rtl' ? 'text-right' : 'text-left'}`}
                              dir={exam.direction || 'ltr'}
                            >
                              {option}
                            </span>
                          </span>
                        </span>
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
                  className={`inline-flex items-center gap-2 rounded-2xl ${theme.nextBtn} px-6 py-3 font-black text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer`}
                >
                  {questionIndex === exam.questions.length - 1 ? theme.finishLabel : theme.nextLabel}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`rounded-3xl bg-gradient-to-r ${theme.completeBanner} p-6 text-center text-white shadow-lg`}>
                <Trophy className="mx-auto mb-2 h-10 w-10 text-amber-200" />
                <p className="text-sm font-black uppercase tracking-widest text-white/90">{theme.completeText}</p>
                <h3 className="mt-1 text-3xl font-black">
                  {correctAnswers} / {exam.questions.length}
                </h3>
                <p className="mt-1 font-bold">
                  {Math.round((correctAnswers / exam.questions.length) * 100)}% Score
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className={`rounded-2xl border-2 p-4 text-center ${theme.correctBox}`}>
                  <Check className="mx-auto h-6 w-6" />
                  <p className="mt-1 text-2xl font-black">{correctAnswers}</p>
                  <p className="text-xs font-black">{theme.correctLabel}</p>
                </div>
                <div className={`rounded-2xl border-2 p-4 text-center ${theme.incorrectBox}`}>
                  <X className="mx-auto h-6 w-6" />
                  <p className="mt-1 text-2xl font-black">{incorrectAnswers}</p>
                  <p className="text-xs font-black">{theme.incorrectLabel}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-lg font-black text-slate-900">{theme.scoreboardTitle}</h4>
                  <div className="flex gap-2">
                    {([
                      ['all', theme.filterAll],
                      ['correct', theme.filterCorrect],
                      ['incorrect', theme.filterIncorrect],
                    ] as const).map(([filter, label]) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setResultFilter(filter)}
                        className={`rounded-full px-3 py-1.5 text-xs font-black transition-colors cursor-pointer ${
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
                        key={question.question}
                        className={`rounded-2xl border-2 p-4 sm:p-5 ${
                          isCorrect
                            ? 'border-emerald-200 bg-emerald-50/60'
                            : 'border-rose-200 bg-rose-50/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1 space-y-1">
                            <span className="text-xs font-black uppercase text-slate-400">
                              Question {index + 1}
                            </span>
                            {englishQuestionText(question) && (
                              <p className="text-left font-extrabold text-slate-900" dir="ltr">
                                {englishQuestionText(question)}
                              </p>
                            )}
                            <p
                              className={`text-base font-black text-slate-900 ${
                                exam.direction === 'rtl' ? 'text-right' : 'text-left'
                              }`}
                              dir={exam.direction || 'ltr'}
                            >
                              {questionText(question)}
                            </p>
                          </div>
                          <span
                            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <Check className="h-3.5 w-3.5" /> {theme.correctLabel}
                              </>
                            ) : (
                              <>
                                <X className="h-3.5 w-3.5" /> {theme.incorrectLabel}
                              </>
                            )}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1.5 rounded-xl bg-white/80 p-3 text-sm">
                          <p className="text-slate-700">
                            <strong className="text-slate-900">Your answer:</strong>{' '}
                            {answer ?? 'No answer selected'}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-800">
                              <strong className="text-emerald-950">Correct answer:</strong>{' '}
                              {question.answer}
                            </p>
                          )}
                          <p className="text-slate-600 text-xs mt-1">
                            <strong>Note:</strong> {question.explanation}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={restartExam}
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-5 py-2.5 font-black text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" /> Retake
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl bg-slate-900 px-6 py-2.5 font-black text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
};
