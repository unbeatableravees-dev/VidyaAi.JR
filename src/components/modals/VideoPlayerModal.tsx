import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
import { UniversalVideoPlayer } from '../common/UniversalVideoPlayer';

export interface VideoData {
  id: string;
  title: string;
  category: string;
  duration: string;
  youtubeId?: string;
  channel?: string;
  views?: string;
  thumbnailEmoji?: string;
  thumbnailUrl?: string;
  bgGradient?: string;
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

  const [likes, setLikes] = useState(342);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'comments'>('overview');
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: 'Ananya S.', avatar: '👧', time: '10m ago', text: 'I loved this video! Toto is so cute! 🐘❤️' },
    { id: 2, name: 'Kabir R.', avatar: '🧒', time: '1h ago', text: 'Now I understand how to add numbers quickly!' },
    { id: 3, name: 'Meera K.', avatar: '👧', time: '3h ago', text: 'I got 5 stars on the quiz after watching this! ⭐⭐⭐⭐⭐' },
  ]);

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

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playPop();
          onClose();
        }
      }}
      className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/40 my-auto flex flex-col max-h-[94vh]">
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-blue-600 text-white text-[11px] sm:text-xs font-black rounded-full shadow-sm shrink-0">
              {video.category}
            </span>
            <h2 className="text-xs sm:text-sm md:text-base font-black truncate">
              {video.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Frame with UniversalVideoPlayer */}
        <div className="w-full bg-slate-950 overflow-hidden shadow-2xl">
          <UniversalVideoPlayer
            src={video.youtubeId}
            title={video.title}
          />
        </div>

        {/* Content Details & Tabs Section */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5 bg-slate-50/50">
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
          <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-200 overflow-x-auto pb-1 whitespace-nowrap [scrollbar-width:none]">
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
    </div>,
    document.body
  );
};
