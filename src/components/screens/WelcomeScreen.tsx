import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Star, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

interface WelcomeScreenProps {
  onNameSubmit: (name: string, avatar: string, grade: string) => void;
  initialName?: string;
}

const AVATARS = [
  { id: 'boy-aarav', name: 'Aarav', emoji: '👦', shirtColor: '#2563eb', label: 'Cool Aarav' },
  { id: 'girl-ananya', name: 'Ananya', emoji: '👧', shirtColor: '#ec4899', label: 'Sweet Ananya' },
  { id: 'boy-kabir', name: 'Kabir', emoji: '🧒', shirtColor: '#f59e0b', label: 'Explorer Kabir' },
  { id: 'girl-meera', name: 'Meera', emoji: '👧', shirtColor: '#10b981', label: 'Clever Meera' },
];

const GRADES = ['Nursery / KG', 'Grade 1', 'Grade 2', 'Grade 3'];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNameSubmit,
  initialName = '',
}) => {
  const [name, setName] = useState(initialName);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
  const [selectedGrade, setSelectedGrade] = useState('Grade 1');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError(true);
      return;
    }

    sound.playSuccess();
    sound.speakText(`Welcome to Vidya AI Junior, ${cleanName}! Let's make learning fun!`);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Fallback
    }

    setTimeout(() => {
      onNameSubmit(cleanName, selectedAvatar, selectedGrade);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#12439a] via-[#1d4ed8] to-[#0ea5e9] flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Floating Animated Background Blobs & Sparkles */}
      <div className="absolute top-10 left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-12 right-16 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl animate-pulse-glow pointer-events-none" />

      {/* Floating Stars in BG */}
      <span className="absolute top-16 left-1/4 text-3xl animate-float opacity-80">⭐</span>
      <span className="absolute bottom-24 left-1/5 text-2xl animate-wiggle opacity-70">✨</span>
      <span className="absolute top-24 right-1/5 text-4xl animate-bounce-gentle opacity-80">🚀</span>
      <span className="absolute bottom-16 right-1/4 text-3xl animate-float opacity-75">🎨</span>

      {/* Main Glossy Container */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border-2 border-white/80 animate-in zoom-in-95 duration-300">
        {/* Brand Logo Header with JR badge */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl p-3 flex items-center justify-center shadow-xl shadow-blue-500/30 animate-bounce-gentle">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                <path
                  d="M 50 8 L 62 36 L 94 38 L 70 59 L 77 90 L 50 74 L 23 90 L 30 59 L 6 38 L 38 36 Z"
                  fill="#FACC15"
                  stroke="#CA8A04"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <circle cx="42" cy="50" r="3.5" fill="#1E293B" />
                <circle cx="58" cy="50" r="3.5" fill="#1E293B" />
                <ellipse cx="36" cy="57" rx="4" ry="2.5" fill="#F87171" opacity="0.7" />
                <ellipse cx="64" cy="57" rx="4" ry="2.5" fill="#F87171" opacity="0.7" />
                <path d="M 44 58 Q 50 65 56 58" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                {/* Cap */}
                <g transform="translate(18, -4) rotate(-8 32 30)">
                  <polygon points="32,15 58,25 32,35 6,25" fill="#0f172a" />
                  <path d="M 18 28 Q 32 34 46 28 L 46 33 Q 32 38 18 33 Z" fill="#0f172a" />
                  <path d="M 32 25 Q 48 30 50 42" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                  <circle cx="50" cy="44" r="2.5" fill="#D97706" />
                </g>
              </svg>
            </div>
            {/* Glowing JR Badge */}
            <span className="absolute -bottom-1 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 font-black text-xs shadow-md border-2 border-white animate-pulse-glow">
              Jr
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Nunito',sans-serif]">
              Vidya<span className="text-blue-600">AI</span>
            </h1>
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-sm">
              JR
            </span>
          </div>

          <p className="text-sm font-extrabold text-slate-500">
            Welcome, Little Explorer! Let's get to know you 🌟
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Choice */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5 text-center">
              Choose Your Character
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedAvatar(av.id);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
                    selectedAvatar === av.id
                      ? 'border-blue-500 bg-blue-50/80 shadow-md scale-105 ring-2 ring-blue-300'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:scale-102'
                  }`}
                >
                  <span className="text-3xl filter drop-shadow">{av.emoji}</span>
                  <span className="text-[11px] font-black text-slate-700 truncate w-full text-center">
                    {av.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              What is your name?
            </label>
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="e.g. Aarav, Ananya, Kabir..."
                maxLength={24}
                className={`w-full px-5 py-3.5 text-base font-extrabold rounded-2xl bg-white border-2 transition-all placeholder:text-slate-400 text-slate-800 shadow-inner focus:outline-none ${
                  error
                    ? 'border-rose-400 focus:ring-4 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                ✨
              </span>
            </div>
            {error && (
              <p className="text-xs font-bold text-rose-500 mt-1.5 flex items-center gap-1">
                Please type your name to start!
              </p>
            )}
          </div>

          {/* Grade / Class Selector */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              Select Your Class / Grade
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRADES.map((gr) => (
                <button
                  type="button"
                  key={gr}
                  onClick={() => {
                    sound.playPop();
                    setSelectedGrade(gr);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                    selectedGrade === gr
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {gr}
                </button>
              ))}
            </div>
          </div>

          {/* Big Glossy Start Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 active:scale-98 text-slate-950 font-black text-base shadow-xl shadow-amber-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all glossy-pill shimmer-effect"
          >
            <span>Start My Learning Adventure!</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-5 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-1">
          <span>Fun learning made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for curious kids</span>
        </div>
      </div>
    </div>
  );
};
