import React, { useState } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize2,
  CheckCircle,
  Lock,
  Clock,
  GraduationCap,
  BarChart2,
  Check,
  Star,
  Trophy,
  BookOpen,
  Award,
  Crown,
} from 'lucide-react';
import { LESSON_STEPS } from '../../data/learningData';
import { AppleSvg } from '../illustrations/Illustrations';
import { sound } from '../../utils/audio';

interface VideoLessonScreenProps {
  onBack: () => void;
  onContinueToQuiz: () => void;
}

export const VideoLessonScreen: React.FC<VideoLessonScreenProps> = ({
  onBack,
  onContinueToQuiz,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'notes'>('overview');
  const [selectedActivityAnswer, setSelectedActivityAnswer] = useState<number | null>(5);
  const [activityFeedback, setActivityFeedback] = useState<boolean>(true);

  const handleSelectAnswer = (ans: number) => {
    setSelectedActivityAnswer(ans);
    sound.playPop();
    if (ans === 5) {
      sound.playSuccess();
      setActivityFeedback(true);
    } else {
      setActivityFeedback(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24 space-y-6">
      {/* Top Back Navigation */}
      <button
        onClick={() => {
          sound.playPop();
          onBack();
        }}
        className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Learning</span>
      </button>

      {/* Main Grid: 2/3 Content, 1/3 Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Player */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border-2 border-white shadow-xl flex flex-col justify-between group">
            {/* Top Video Badges */}
            <div className="relative z-20 p-4 flex items-center justify-between">
              <span className="px-3.5 py-1 bg-purple-600/90 backdrop-blur-md text-white text-xs font-black rounded-full shadow">
                Mathematics
              </span>
              <span className="px-3.5 py-1 bg-amber-400 text-slate-900 text-xs font-black rounded-full shadow flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-slate-900" /> Video 1 of 5
              </span>
            </div>

            {/* Video Content Scene (3D Blackboard with Aarav pointing at 2+3=5) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e1b4b]">
              {/* Classroom blackboard */}
              <div className="w-[82%] h-[74%] rounded-2xl bg-[#064e3b] border-8 border-[#78350f] shadow-2xl relative flex items-center justify-around px-8 overflow-hidden">
                {/* Chalkboard equations */}
                <div className="flex flex-col items-center justify-center space-y-3 z-10 select-none">
                  <div className="text-4xl lg:text-5xl font-black text-white font-['Fredoka',sans-serif] tracking-wider drop-shadow">
                    2 + 3 = 5
                  </div>
                  {/* Apples row */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <AppleSvg size={42} />
                      <AppleSvg size={42} />
                    </div>
                    <span className="text-3xl font-black text-amber-300">+</span>
                    <div className="flex gap-1.5">
                      <AppleSvg size={42} />
                      <AppleSvg size={42} />
                      <AppleSvg size={42} />
                    </div>
                    <span className="text-3xl font-black text-amber-300">=</span>
                    <span className="text-3xl font-black text-white">5</span>
                  </div>
                </div>

                {/* 3D Boy Aarav pointing at board */}
                <div className="relative z-10 w-44 h-48 flex items-end">
                  <svg viewBox="0 0 160 180" className="w-full h-full drop-shadow-xl">
                    {/* Head */}
                    <circle cx="80" cy="55" r="32" fill="#fed7aa" />
                    {/* Hair */}
                    <path
                      d="M 50 50 C 45 22 65 14 85 14 C 108 14 112 28 110 46 C 102 32 94 25 82 25 C 66 25 58 35 50 50 Z"
                      fill="#451a03"
                    />
                    {/* Face */}
                    <circle cx="70" cy="55" r="4" fill="#1e293b" />
                    <circle cx="92" cy="55" r="4" fill="#1e293b" />
                    <circle cx="72" cy="53" r="1.5" fill="#ffffff" />
                    <circle cx="94" cy="53" r="1.5" fill="#ffffff" />
                    <ellipse cx="62" cy="63" rx="5" ry="3" fill="#f87171" opacity="0.6" />
                    <ellipse cx="100" cy="63" rx="5" ry="3" fill="#f87171" opacity="0.6" />
                    <path d="M 74 65 Q 81 74 88 65 Z" fill="#be123c" />
                    {/* Blue Hoodie */}
                    <path d="M 52 90 Q 80 84 110 90 L 118 160 Q 80 166 42 160 Z" fill="#2563eb" />
                    {/* Arm pointing to blackboard */}
                    <path d="M 105 100 Q 140 75 155 60" fill="none" stroke="#2563eb" strokeWidth="16" strokeLinecap="round" />
                    <circle cx="155" cy="58" r="8" fill="#fed7aa" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button
                onClick={() => {
                  sound.playPop();
                  setIsPlaying(!isPlaying);
                }}
                className="w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border-2 border-white/80 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 pointer-events-auto cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Bottom Video Controls Bar */}
            <div className="relative z-20 px-4 py-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
              {/* Scrub Bar */}
              <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div className="bg-red-500 h-full w-[32%] rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                </div>
              </div>

              {/* Control Buttons & Time */}
              <div className="flex items-center justify-between text-white text-xs font-bold">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      sound.playPop();
                      setIsPlaying(!isPlaying);
                    }}
                    className="hover:text-blue-400 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button className="hover:text-blue-400">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-semibold tracking-wide">2:34 / 8:12</span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-1.5 py-0.5 border border-white/50 rounded text-[10px] hover:bg-white/20">
                    CC
                  </button>
                  <button className="hover:text-blue-400">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="hover:text-blue-400">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Addition – Let's Add 2 and 3
              </h1>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                In this video, you will learn how to add two numbers using fun examples and colorful objects.
              </p>

              {/* Badges */}
              <div className="flex items-center gap-2.5 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                  <GraduationCap className="w-3.5 h-3.5" /> Grade 1
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 8 min
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                  <BarChart2 className="w-3.5 h-3.5" /> Beginner
                </span>
              </div>
            </div>

            {/* Continue Learning CTA */}
            <button
              onClick={() => {
                sound.playPop();
                onContinueToQuiz();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#facc15] hover:bg-[#eab308] active:scale-95 text-slate-900 font-black rounded-full shadow-md text-sm shrink-0 cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>Continue Learning</span>
            </button>
          </div>

          {/* Tabs: Overview, Learning Objectives, Notes */}
          <div className="border-b border-slate-200">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'overview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Check className="w-4 h-4" /> Overview
              </button>
              <button
                onClick={() => setActiveTab('objectives')}
                className={`pb-3 text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'objectives'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                🎯 Learning Objectives
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'notes'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                📋 Notes
              </button>
            </div>
          </div>

          {/* Try This Activity Interactive Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-800">Try This Activity</h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Question Visual Card (6 cols) */}
              <div className="md:col-span-6 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100 flex items-center gap-3">
                {/* Girl with pencil */}
                <div className="w-20 h-20 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="40" r="26" fill="#fed7aa" />
                    <path d="M 28 35 C 26 18 36 12 50 12 C 65 12 72 20 72 36 C 66 26 58 20 48 20 C 38 20 32 26 28 35 Z" fill="#292524" />
                    <path d="M 28 26 Q 50 18 72 26" fill="none" stroke="#ec4899" strokeWidth="4" />
                    <circle cx="42" cy="42" r="3" fill="#1e293b" />
                    <circle cx="58" cy="42" r="3" fill="#1e293b" />
                    <ellipse cx="36" cy="48" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
                    <ellipse cx="64" cy="48" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
                    <path d="M 45 49 Q 50 54 55 49" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 28 72 Q 50 64 72 72 L 76 100 L 24 100 Z" fill="#facc15" />
                    {/* Pencil */}
                    <g transform="translate(68, 45) rotate(35)">
                      <rect x="0" y="0" width="8" height="35" fill="#f97316" rx="2" />
                      <polygon points="0,0 8,0 4,-8" fill="#fed7aa" />
                      <polygon points="3,-5 5,-5 4,-8" fill="#1e293b" />
                    </g>
                  </svg>
                </div>

                {/* Speech Bubble with math */}
                <div className="flex-1 space-y-2">
                  <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm border border-slate-100 text-xs font-black text-slate-700">
                    How many apples are there in total?
                  </div>
                  {/* Visual apples formula */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <AppleSvg size={24} />
                    <AppleSvg size={24} />
                    <span className="font-extrabold text-sm text-slate-700">+</span>
                    <AppleSvg size={24} />
                    <AppleSvg size={24} />
                    <AppleSvg size={24} />
                    <span className="font-extrabold text-sm text-slate-700">=</span>
                    <span className="w-7 h-7 rounded-lg border-2 border-dashed border-blue-400 bg-white flex items-center justify-center text-xs font-black text-blue-600">
                      ?
                    </span>
                  </div>
                </div>
              </div>

              {/* Options & Feedback (6 cols) */}
              <div className="md:col-span-6 flex items-center gap-4">
                {/* Options list */}
                <div className="space-y-2 flex-1">
                  {[
                    { key: 'A', val: 5 },
                    { key: 'B', val: 4 },
                    { key: 'C', val: 6 },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectAnswer(opt.val)}
                      className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                        selectedActivityAnswer === opt.val
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          selectedActivityAnswer === opt.val
                            ? 'bg-white text-blue-600'
                            : 'bg-white text-slate-500 border border-slate-200'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span>{opt.val}</span>
                    </button>
                  ))}
                </div>

                {/* Great Job Feedback Box */}
                {activityFeedback && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center space-y-2 shrink-0 w-36">
                    <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white shadow-sm animate-bounce">
                      <Star className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-emerald-800">Great Job!</p>
                      <p className="text-[10px] font-semibold text-emerald-600">You are doing amazing!</p>
                    </div>
                    <button
                      onClick={() => {
                        sound.playPop();
                        onContinueToQuiz();
                      }}
                      className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-lg shadow-sm cursor-pointer"
                    >
                      Next Lesson →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Playlist & Progress (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Lesson Steps Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Lesson Steps</h3>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[20%] rounded-full"></div>
                </div>
                <span className="text-xs font-extrabold text-slate-500">1 / 5</span>
              </div>
            </div>

            {/* Steps list */}
            <div className="space-y-3">
              {LESSON_STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    step.isActive
                      ? 'bg-blue-50/70 border-blue-200 ring-2 ring-blue-100'
                      : 'bg-white border-slate-100 opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Thumbnail preview */}
                    <div className="w-12 h-10 rounded-xl bg-slate-800 shrink-0 overflow-hidden relative flex items-center justify-center text-white text-xs font-black">
                      {step.id === 1 ? '🍎 2+3' : step.id === 2 ? '5-2' : step.id === 3 ? '▲ ■' : step.id === 4 ? '1 2 3' : 'cat'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                            step.isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {step.id}
                        </span>
                        <p className="text-xs font-bold text-slate-800 truncate">{step.title}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 pl-5">{step.duration}</span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {step.isCompleted ? (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Play className="w-3 h-3 fill-blue-600" />
                        </div>
                      </div>
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Progress Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900">Your Progress</h3>

            {/* Progress Gauge */}
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
                    strokeDasharray="20, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute font-black text-xs text-slate-800">20%</div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">1 of 5 lessons completed</p>
                <p className="text-[11px] font-semibold text-slate-400">Keep up the great work!</p>
              </div>
            </div>

            {/* Row of milestone badge icons */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shadow-sm">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 shadow-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shadow-sm">
                <Award className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shadow-sm">
                <Crown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
