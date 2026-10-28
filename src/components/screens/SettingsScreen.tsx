import React, { useState } from 'react';
import {
  User,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  Save,
  RotateCcw,
  Shield,
  Bell,
  Award,
  BookOpen,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface SettingsScreenProps {
  userName: string;
  userAvatar: string;
  userGrade: string;
  onUpdateProfile: (name: string, avatar: string, grade: string) => void;
  onResetProgress?: () => void;
}

const AVATAR_OPTIONS = [
  { id: 'boy-aarav', name: 'Aarav', emoji: '👦', desc: 'Curious Explorer' },
  { id: 'girl-ananya', name: 'Ananya', emoji: '👧', desc: 'Math Star' },
  { id: 'boy-kabir', name: 'Kabir', emoji: '🧒', desc: 'Story Lover' },
  { id: 'girl-meera', name: 'Meera', emoji: '👧', desc: 'Creative Artist' },
];

const GRADES = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3'];

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  userName,
  userAvatar,
  userGrade,
  onUpdateProfile,
  onResetProgress,
}) => {
  const [nameInput, setNameInput] = useState(userName);
  const [selectedAvatar, setSelectedAvatar] = useState(userAvatar || 'boy-aarav');
  const [selectedGrade, setSelectedGrade] = useState(userGrade || 'Grade 1');
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);
  const [autoplay, setAutoplay] = useState(true);
  const [dailyGoal, setDailyGoal] = useState('15 min');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim();
    if (!cleanName) return;

    sound.playSuccess();
    onUpdateProfile(cleanName, selectedAvatar, selectedGrade);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playPop();
  };

  const currentAvatarObj = AVATAR_OPTIONS.find((a) => a.id === selectedAvatar) || AVATAR_OPTIONS[0];

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto pb-28 space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Account & App Settings
          </h1>
          <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">
            Update your child's profile, name, avatar, learning preferences and sounds.
          </p>
        </div>

        {/* Live Active Badge */}
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Profile Active</span>
        </span>
      </div>

      {/* Success Notification Banner */}
      {showSavedToast && (
        <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 px-5 py-3.5 rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <p className="font-black text-sm">Changes Saved Successfully!</p>
              <p className="text-xs font-bold text-emerald-700">Name updated to "{nameInput}" across the whole app.</p>
            </div>
          </div>
          <button
            onClick={() => setShowSavedToast(false)}
            className="text-xs font-black text-emerald-700 hover:text-emerald-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Edit Card */}
      <form onSubmit={handleSave} className="glossy-card rounded-[2.5rem] p-6 md:p-8 space-y-6 border border-white/80 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Student Profile Information</h2>
            <p className="text-xs font-bold text-slate-400">Change your child's name, character, and level</p>
          </div>
        </div>

        {/* Name Input Field */}
        <div>
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            Child's Display Name
          </label>
          <div className="relative max-w-md">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter name (e.g. Aarav, Ananya, Kabir)..."
              maxLength={24}
              required
              className="w-full px-5 py-3.5 bg-white border-2 border-slate-200 rounded-2xl font-black text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-inner transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">
              ✏️
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 mt-1.5">
            This name will appear on banners, quiz results, report cards, and certificates!
          </p>
        </div>

        {/* Avatar Selection Grid */}
        <div>
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-3">
            Choose Character Avatar
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AVATAR_OPTIONS.map((av) => (
              <button
                type="button"
                key={av.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedAvatar(av.id);
                }}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer text-left ${
                  selectedAvatar === av.id
                    ? 'border-blue-500 bg-blue-50/90 shadow-md ring-2 ring-blue-200 scale-102'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-3xl">{av.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-900 truncate">{av.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 truncate">{av.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grade / Class Selection */}
        <div>
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
            Learning Grade / Class
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {GRADES.map((grade) => (
              <button
                type="button"
                key={grade}
                onClick={() => {
                  sound.playPop();
                  setSelectedGrade(grade);
                }}
                className={`py-2.5 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer text-center ${
                  selectedGrade === grade
                    ? 'bg-blue-600 text-white shadow-md scale-102'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Learning Goal */}
        <div>
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
            Daily Learning Goal
          </label>
          <div className="flex gap-2.5">
            {['10 min / day', '15 min / day', '20 min / day', '30 min / day'].map((goal) => (
              <button
                type="button"
                key={goal}
                onClick={() => {
                  sound.playPop();
                  setDailyGoal(goal);
                }}
                className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  dailyGoal === goal
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="pt-3 flex items-center justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-full shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer glossy-pill transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>

      {/* Audio & App Preferences Card */}
      <div className="glossy-card rounded-[2.5rem] p-6 md:p-8 space-y-5 border border-white/80 shadow-xl">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
          <span>⚙️</span>
          <span>Audio & Playback Controls</span>
        </h3>

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Button & Game Sound Effects</p>
              <p className="text-[11px] font-bold text-slate-400">Play playful pops and achievement chimes</p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleSound}
            className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer ${
              soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform shadow-md flex items-center justify-center text-[10px] ${
                soundEnabled ? 'right-0.5 text-blue-600 font-black' : 'left-0.5 text-slate-400'
              }`}
            >
              {soundEnabled ? '✓' : ''}
            </span>
          </button>
        </div>

        {/* Autoplay Next Lesson Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Auto-Suggest Next Lesson</p>
              <p className="text-[11px] font-bold text-slate-400">Automatically queue the next video episode</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setAutoplay(!autoplay);
            }}
            className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer ${
              autoplay ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform shadow-md flex items-center justify-center text-[10px] ${
                autoplay ? 'right-0.5 text-blue-600 font-black' : 'left-0.5 text-slate-400'
              }`}
            >
              {autoplay ? '✓' : ''}
            </span>
          </button>
        </div>

        {/* Reset Progress Button */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-slate-800">Reset Learning Data</p>
            <p className="text-[11px] font-bold text-slate-400">Clear stars and test quiz scores for this session</p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your score and stars?')) {
                sound.playPop();
                if (onResetProgress) onResetProgress();
              }
            }}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
