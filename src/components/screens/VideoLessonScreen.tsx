import React, { useState } from 'react';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  GraduationCap,
  Star,
  Trophy,
  BookOpen,
  Award,
  Crown,
  Sparkles,
  Tv,
} from 'lucide-react';
import { LESSON_PLAYLIST_VIDEOS } from '../../data/youtubeVideos';
import { AppleSvg } from '../illustrations/Illustrations';
import { sound } from '../../utils/audio';
import { UniversalVideoPlayer } from '../common/UniversalVideoPlayer';

interface VideoLessonScreenProps {
  onBack: () => void;
  onContinueToQuiz: () => void;
}

export const VideoLessonScreen: React.FC<VideoLessonScreenProps> = ({
  onBack,
  onContinueToQuiz,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'notes'>('overview');
  const [selectedActivityAnswer, setSelectedActivityAnswer] = useState<number | null>(5);
  const [activityFeedback, setActivityFeedback] = useState<boolean>(true);
  const [mode, setMode] = useState<'video' | 'interactive'>('video');

  const currentVideo = LESSON_PLAYLIST_VIDEOS[activeStepIndex] || LESSON_PLAYLIST_VIDEOS[0];

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
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto pb-24 space-y-6">
      {/* Top Navigation & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playPop();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Hub</span>
        </button>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
          <button
            onClick={() => {
              sound.playPop();
              setMode('video');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              mode === 'video'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>HD Video Lesson</span>
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setMode('interactive');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              mode === 'interactive'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Concept Playground</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 8 cols Video/Player, 4 cols Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* HD Video Lesson Player or Interactive Playground */}
          {mode === 'video' ? (
            <UniversalVideoPlayer
              src={currentVideo.youtubeId}
              title={currentVideo.title}
              className="rounded-3xl border-2 border-white"
            />
          ) : (
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border-2 border-white shadow-2xl flex flex-col justify-between p-6">
              <div className="relative z-20 flex items-center justify-between">
                <span className="px-3.5 py-1 bg-purple-600 text-white text-xs font-black rounded-full shadow">
                  Interactive Blackboard
                </span>
                <span className="px-3.5 py-1 bg-amber-400 text-slate-900 text-xs font-black rounded-full shadow flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-slate-900" /> Hands-on Demo
                </span>
              </div>

              {/* Classroom blackboard */}
              <div className="my-auto w-full h-[70%] rounded-2xl bg-[#064e3b] border-8 border-[#78350f] shadow-2xl relative flex items-center justify-around px-8 overflow-hidden">
                <div className="flex flex-col items-center justify-center space-y-4 z-10 select-none">
                  <div className="text-4xl lg:text-5xl font-black text-white font-['Fredoka',sans-serif] tracking-wider drop-shadow">
                    2 + 3 = 5
                  </div>
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
              </div>

              <div className="text-center text-xs font-black text-slate-300">
                Tap HD Video Lesson above anytime to watch the full animated episode!
              </div>
            </div>
          )}

          {/* Video Title, Tags & Badges */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-black rounded-full">
                  {currentVideo.category}
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full">
                  {currentVideo.channel}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {currentVideo.duration}
                </span>
              </div>

              <div className="text-xs font-extrabold text-slate-500">
                {currentVideo.views}
              </div>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                {currentVideo.title}
              </h1>
              {currentVideo.hindiTitle && (
                <p className="text-sm font-bold text-slate-500 mt-1">
                  {currentVideo.hindiTitle}
                </p>
              )}
              <p className="text-xs md:text-sm font-semibold text-slate-600 mt-2">
                {currentVideo.description}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 pt-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'objectives', label: 'Learning Goals' },
                { id: 'notes', label: 'Key Notes' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playPop();
                    setActiveTab(tab.id as 'overview' | 'objectives' | 'notes');
                  }}
                  className={`px-4 py-2 text-xs font-black border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Concept Highlights</h4>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {currentVideo.description}
                    </p>
                  </div>
                </div>

                {/* Interactive Practice Question */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" /> Quick Concept Practice
                    </span>
                    <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      +10 XP
                    </span>
                  </div>

                  <p className="text-sm font-extrabold text-slate-800">
                    If you have 2 red apples and mom gives you 3 green apples, how many apples do you have?
                  </p>

                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {[3, 4, 5, 6].map((ans) => (
                      <button
                        key={ans}
                        onClick={() => handleSelectAnswer(ans)}
                        className={`py-2 rounded-xl text-sm font-black transition-all cursor-pointer ${
                          selectedActivityAnswer === ans
                            ? ans === 5
                              ? 'bg-emerald-500 text-white shadow-md scale-105'
                              : 'bg-rose-500 text-white'
                            : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {ans}
                      </button>
                    ))}
                  </div>

                  {activityFeedback && (
                    <div className="p-3 bg-emerald-100/80 rounded-xl text-xs font-black text-emerald-800 flex items-center justify-between">
                      <span>🎉 Brilliant! 2 + 3 = 5 apples. You earned 10 Stars!</span>
                      <button
                        onClick={() => {
                          sound.playPop();
                          onContinueToQuiz();
                        }}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer text-[11px]"
                      >
                        Start Quiz →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'objectives' && (
              <div className="space-y-2.5 pt-2">
                {currentVideo.objectives.map((obj, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-2.5 pt-2">
                {currentVideo.notes.map((note, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Playlist & Progress (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real YouTube Lesson Steps Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Lesson Episodes</h3>
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {activeStepIndex + 1} / {LESSON_PLAYLIST_VIDEOS.length}
              </span>
            </div>

            {/* Steps list */}
            <div className="space-y-2.5">
              {LESSON_PLAYLIST_VIDEOS.map((vid, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={vid.id}
                    onClick={() => {
                      sound.playPop();
                      setActiveStepIndex(idx);
                    }}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 border-blue-300 shadow-md ring-2 ring-blue-100'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    {/* YouTube Real Thumbnail */}
                    <div className="w-16 h-12 rounded-xl bg-slate-900 shrink-0 overflow-hidden relative shadow-sm">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                          <Play className="w-4 h-4 fill-white text-white" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-black truncate ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                        {idx + 1}. {vid.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-slate-400">{vid.channel}</span>
                        <span className="text-[10px] font-black text-slate-500">• {vid.duration}</span>
                      </div>
                    </div>

                    {isActive ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiz CTA Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider">
                Earn 50 Stars ⭐
              </span>
              <h4 className="text-lg font-black tracking-tight">Ready for the Quiz?</h4>
              <p className="text-xs text-indigo-200">
                Test your knowledge on these video concepts with 10 random questions!
              </p>
              <button
                onClick={() => {
                  sound.playPop();
                  onContinueToQuiz();
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Start Dynamic Quiz 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
