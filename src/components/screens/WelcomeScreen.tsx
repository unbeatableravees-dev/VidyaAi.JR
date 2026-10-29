import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Star, Heart, Check } from 'lucide-react';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';

interface WelcomeScreenProps {
  onNameSubmit: (name: string, avatar: string, grade: string) => void;
  initialName?: string;
}

const AVATARS = [
  { id: 'boy-aarav', name: 'Aarav', emoji: '👦', bg: 'from-blue-400 to-indigo-500' },
  { id: 'girl-ananya', name: 'Ananya', emoji: '👧', bg: 'from-pink-400 to-rose-500' },
  { id: 'boy-kabir', name: 'Kabir', emoji: '🧑‍🚀', bg: 'from-amber-400 to-orange-500' },
  { id: 'girl-meera', name: 'Meera', emoji: '🐼', bg: 'from-emerald-400 to-teal-500' },
];

const GRADES = [
  { id: 'Kindergarten', label: 'Kindergarten', age: 'Ages 3-5', icon: '🐣' },
  { id: 'Grade 1', label: 'Grade 1', age: 'Ages 5-6', icon: '🎒' },
  { id: 'Grade 2', label: 'Grade 2', age: 'Ages 6-7', icon: '⭐' },
  { id: 'Grade 3', label: 'Grade 3', age: 'Ages 7-8', icon: '🚀' },
];

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
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2e6b] via-[#14479e] to-[#0284c7] flex items-center justify-center p-4 md:p-8 relative overflow-hidden select-none">
      {/* Animated Floating Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-amber-300/15 rounded-full blur-2xl animate-pulse-glow pointer-events-none" />

      {/* Floating 3D Emojis */}
      <span className="absolute top-12 left-1/6 text-4xl animate-float opacity-80">🚀</span>
      <span className="absolute top-28 right-1/6 text-3xl animate-wiggle opacity-80">⭐</span>
      <span className="absolute bottom-20 left-1/5 text-4xl animate-bounce-gentle opacity-75">🎨</span>
      <span className="absolute bottom-14 right-1/4 text-3xl animate-float-slow opacity-80">🎈</span>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.45)] border-2 border-white/85 animate-in zoom-in-95 duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2.5 mb-7">
          <div className="relative">
            <div className="w-36 h-40 md:w-44 md:h-48 flex items-center justify-center animate-bounce-gentle">
              <img
                src={APP_IMAGES.hero3D}
                alt="VidyaAI 3D Mascot"
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </div>
            {/* Glowing JR Badge */}
            <span className="absolute bottom-2 -right-2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-md border-2 border-white animate-pulse-glow">
              Jr
            </span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-['Nunito',sans-serif]">
              Vidya<span className="text-blue-600">AI</span>
            </h1>
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-sm">
              JR
            </span>
          </div>

          <p className="text-sm font-extrabold text-slate-600 max-w-sm">
            Welcome to the magical world of learning! What should we call you? 🌟
          </p>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Choices */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5 text-center">
              Pick Your Fun Character
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedAvatar(av.id);
                  }}
                  aria-label={`${av.name} character`}
                  aria-pressed={selectedAvatar === av.id}
                  className={`group relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center min-h-24 transition-all duration-300 cursor-pointer ${
                    selectedAvatar === av.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105 ring-4 ring-blue-200'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:-translate-y-1 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <span className={`w-14 h-14 rounded-full bg-gradient-to-br ${av.bg} flex items-center justify-center text-4xl filter drop-shadow-md transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 ${selectedAvatar === av.id ? 'animate-bounce-gentle' : ''}`}>
                    {av.emoji}
                  </span>
                  {selectedAvatar === av.id && (
                    <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center animate-in zoom-in-50">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name Input with Sparkle */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              Enter Your Name
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
                placeholder="Type your name here (e.g. Aarav, Sara)..."
                maxLength={24}
                className={`w-full px-5 py-4 text-base font-black rounded-2xl bg-white border-2 transition-all placeholder:text-slate-400 text-slate-800 shadow-inner focus:outline-none ${
                  error
                    ? 'border-rose-400 focus:ring-4 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                ⭐
              </span>
            </div>
            {error && (
              <p className="text-xs font-bold text-rose-500 mt-1.5 flex items-center gap-1">
                Please enter a name so we can personalize your learning!
              </p>
            )}
          </div>

          {/* Grade / Class Selector */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              Select Your Grade / Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {GRADES.map((gr) => (
                <button
                  type="button"
                  key={gr.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedGrade(gr.id);
                  }}
                  className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                    selectedGrade === gr.id
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md scale-102'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xl mb-0.5">{gr.icon}</span>
                  <span className="text-xs font-black">{gr.label}</span>
                  <span className={`text-[10px] font-bold ${selectedGrade === gr.id ? 'text-blue-100' : 'text-slate-400'}`}>
                    {gr.age}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Big Glossy CTA Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 active:scale-98 text-slate-950 font-black text-base shadow-xl shadow-amber-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all glossy-pill shimmer-effect"
          >
            <span>Let's Start Learning!</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-1">
          <span>Safe & friendly educational fun made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </div>
      </div>
    </div>
  );
};
