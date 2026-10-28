import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Share2,
  Bookmark,
  Sparkles,
  Send,
  MessageCircle,
} from 'lucide-react';
import { sound } from '../../utils/audio';

export interface VideoData {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnailEmoji: string;
  bgGradient: string;
  description: string;
  notes: string[];
  objectives: string[];
}

interface VideoPlayerModalProps {
  video: VideoData | null;
  onClose: () => void;
  onTakeQuiz?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onTakeQuiz,
}) => {
  if (!video) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);
  const [likes, setLikes] = useState(342);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'comments'>('overview');
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: 'Ananya S.', avatar: '👧', time: '10m ago', text: 'I loved this video! Toto is so cute! 🐘❤️' },
    { id: 2, name: 'Kabir R.', avatar: '🧒', time: '1h ago', text: 'Now I understand how to add numbers quickly!' },
    { id: 3, name: 'Meera K.', avatar: '👧', time: '3h ago', text: 'I got 5 stars on the quiz after watching this! ⭐⭐⭐⭐⭐' },
  ]);

  // Simulated video playback timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleLike = () => {
    sound.playPop();
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      sound.playSuccess();
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    sound.playPop();
    setComments([
      {
        id: Date.now(),
        name: 'You',
        avatar: '⭐',
        time: 'Just now',
        text: commentInput.trim(),
      },
      ...comments,
    ]);
    setCommentInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/40 my-auto flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-black rounded-full shadow-sm">
              {video.category}
            </span>
            <h2 className="text-sm md:text-base font-black truncate max-w-md">
              {video.title}
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame (16:9) */}
        <div className="relative aspect-video bg-slate-950 flex flex-col justify-between overflow-hidden group select-none">
          {/* Animated Animated Screen Background Scene */}
          <div className={`absolute inset-0 bg-gradient-to-br ${video.bgGradient} flex items-center justify-center`}>
            {/* Soft drifting clouds & stars */}
            <div className="absolute top-8 left-12 text-3xl animate-float opacity-70">☁️</div>
            <div className="absolute top-12 right-20 text-2xl animate-float-slow opacity-60">✨</div>
            <div className="absolute bottom-12 left-24 text-2xl animate-bounce-gentle opacity-60">⭐</div>

            {/* Giant Central Animated Emoji / Character */}
            <div className="flex flex-col items-center justify-center space-y-3 z-10">
              <span className={`text-8xl drop-shadow-2xl ${isPlaying ? 'animate-bounce-gentle' : ''}`}>
                {video.thumbnailEmoji}
              </span>
              <div className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white font-black text-xs border border-white/20">
                {isPlaying ? '▶ Playing in HD 1080p' : '⏸ Paused'}
              </div>
            </div>
          </div>

          {/* Top Video Overlay Tags */}
          <div className="relative z-20 p-4 flex items-center justify-between">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
              VidyaAI Jr Player
            </span>
            <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full shadow-md">
              {video.duration}
            </span>
          </div>

          {/* Center Play/Pause Click Overlay */}
          <div
            onClick={() => {
              sound.playPop();
              setIsPlaying(!isPlaying);
            }}
            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-20 h-20 rounded-full bg-black/70 backdrop-blur-md border-2 border-white text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                <Play className="w-10 h-10 fill-white translate-x-1" />
              </div>
            )}
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="relative z-20 px-4 py-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2">
            {/* Scrub Progress Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.round(pos * 100));
              }}
              className="w-full bg-white/30 hover:bg-white/40 h-2 rounded-full overflow-hidden cursor-pointer transition-all"
            >
              <div
                style={{ width: `${progress}%` }}
                className="bg-red-500 h-full rounded-full relative transition-all duration-300"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md"></div>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-white text-xs font-bold">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    sound.playPop();
                    setIsPlaying(!isPlaying);
                  }}
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="text-xs font-mono text-slate-300">
                  {Math.floor((progress / 100) * 8)}:{String(Math.floor(((progress / 100) * 480) % 60)).padStart(2, '0')} / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-black">
                  1080p 60fps
                </span>
                <button className="hover:text-blue-400 cursor-pointer">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Details & Tabs Section */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50/50">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {video.title}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {video.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black border transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{likes}</span>
              </button>

              {onTakeQuiz && (
                <button
                  onClick={() => {
                    sound.playPop();
                    onTakeQuiz();
                  }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md glossy-pill flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Take Quiz Now</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-4 border-b border-slate-200">
            {[
              { id: 'overview', label: '📖 Lesson Summary' },
              { id: 'notes', label: '🎯 Learning Goals' },
              { id: 'comments', label: `💬 Comments (${comments.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(tab.id as 'overview' | 'notes' | 'comments');
                }}
                className={`pb-2.5 text-xs font-black transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Key Lesson Points
              </h4>
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                {video.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                What You Will Master
              </h4>
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                {video.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-base">🎯</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Leave a friendly comment or question..."
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-2.5">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl p-3.5 border border-slate-100 flex items-start gap-3 shadow-sm">
                    <span className="text-2xl">{c.avatar}</span>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800">{c.name}</span>
                        <span className="text-[10px] font-bold text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
