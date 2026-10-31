import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Star, Heart, Check } from 'lucide-react';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';
import { StudentProfile, ReligionType, LanguagePair, RELIGION_CONFIGS } from '../../types/student';
import { getStudentContentGrade } from '../../utils/studentLevel';

interface WelcomeScreenProps {
  onProfileSubmit: (profile: StudentProfile) => void;
  initialProfile?: StudentProfile | null;
  savedProfiles?: StudentProfile[];
  showProfilePicker?: boolean;
  onChooseProfile?: (profile: StudentProfile) => void;
}

const AVATARS = [
  { id: 'boy-aarav', name: 'Aarav', emoji: '👦', label: 'Young Scholar', bg: 'from-blue-400 to-indigo-500' },
  { id: 'girl-ananya', name: 'Ananya', emoji: '👧', label: 'Star Learner', bg: 'from-pink-400 to-rose-500' },
  { id: 'boy-kabir', name: 'Kabir', emoji: '🧑‍🚀', label: 'Space Cadet', bg: 'from-amber-400 to-orange-500' },
  { id: 'girl-meera', name: 'Meera', emoji: '🐼', label: 'Nature Lover', bg: 'from-emerald-400 to-teal-500' },
  { id: 'boy-sheru', name: 'Sheru', emoji: '🦁', label: 'Brave Leader', bg: 'from-yellow-400 to-amber-600' },
  { id: 'girl-zehra', name: 'Zehra', emoji: '🎨', label: 'Creative Artist', bg: 'from-purple-400 to-violet-600' },
  { id: 'boy-gurpreet', name: 'Gurpreet', emoji: '👳', label: 'Noble Hero', bg: 'from-orange-400 to-red-500' },
  { id: 'girl-fatima', name: 'Fatima', emoji: '🧕', label: 'Bright Mind', bg: 'from-teal-400 to-emerald-600' },
];

const CLASSES = [
  { id: 'Nursery / KG', label: 'Nursery / KG', age: 'Ages 3-5', icon: '🐣' },
  { id: 'Class 1', label: 'Class 1', age: 'Ages 5-6', icon: '🎒' },
  { id: 'Class 2', label: 'Class 2', age: 'Ages 6-7', icon: '🎒' },
  { id: 'Class 3', label: 'Class 3', age: 'Ages 7-8', icon: '⭐' },
  { id: 'Class 4', label: 'Class 4', age: 'Ages 8-9', icon: '⭐' },
  { id: 'Class 5', label: 'Class 5', age: 'Ages 9-10', icon: '🚀' },
  { id: 'Class 6-8', label: 'Class 6 - 8', age: 'Ages 11-14', icon: '🎓' },
];

const FAVORITE_GAMES = [
  { id: 'body', label: 'Real Human Body 3D', icon: '🧬', desc: 'Anatomy, organs, pulsing heart & X-ray slider' },
  { id: 'cosmos', label: 'Cosmic Space & Stars', icon: '🚀', desc: 'Planets, burning Sun & galaxy facts' },
  { id: 'math', label: 'Math Puzzles & Logic', icon: '🧮', desc: 'Shapes, numbers & mental agility' },
  { id: 'words', label: 'Word Quests & Spelling', icon: '📚', desc: 'Vocabulary, phonics & storytelling' },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onProfileSubmit,
  initialProfile,
  savedProfiles = [],
  showProfilePicker = false,
  onChooseProfile,
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(initialProfile?.avatar || AVATARS[0].id);
  const [selectedAge, setSelectedAge] = useState<number>(initialProfile?.age || 7);
  const [selectedClass, setSelectedClass] = useState(initialProfile?.gradeClass || 'Class 2');
  const [selectedReligion, setSelectedReligion] = useState<ReligionType>(initialProfile?.religion || 'muslim');
  const [selectedGame, setSelectedGame] = useState(initialProfile?.favoriteGame || 'body');
  const [error, setError] = useState(false);
  const [creatingNewStudent, setCreatingNewStudent] = useState(false);

  const religionConfig = RELIGION_CONFIGS[selectedReligion];
  const contentGrade = getStudentContentGrade(selectedClass, selectedAge);

  if (showProfilePicker && savedProfiles.length > 0 && !creatingNewStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c2e6b] via-[#14479e] to-[#0284c7] flex items-center justify-center p-4 sm:p-8">
        <section className="w-full max-w-3xl rounded-[2rem] bg-white p-6 sm:p-10 shadow-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <span className="text-2xl font-black text-slate-900 font-['Nunito',sans-serif]">Vidya<span className="text-blue-600">AI</span></span>
              <span className="px-2 py-0.5 bg-yellow-400 text-slate-950 font-black text-xs rounded-full shadow-xs">JR</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">Kids Learning Galaxy</p>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-black text-slate-900">Who is learning today? ⭐</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Each student has their own lessons, games, stars, and progress.
            </p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {savedProfiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => onChooseProfile?.(profile)}
                className="flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-400 hover:bg-blue-50"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl shadow">
                  {AVATARS.find((avatar) => avatar.id === profile.avatar)?.emoji || '👦'}
                </span>
                <span>
                  <span className="block text-lg font-black text-slate-900">{profile.name}</span>
                  <span className="block text-xs font-bold text-slate-500">
                  {profile.gradeClass} · {RELIGION_CONFIGS[profile.religion]?.label || 'Universal / All'}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCreatingNewStudent(true)}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-3 font-black text-white shadow-lg transition hover:bg-blue-700"
          >
            + Add a new student
          </button>
        </section>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError(true);
      return;
    }

    const languageMode: LanguagePair = religionConfig.defaultLanguages;

    const profile: StudentProfile = {
      id: initialProfile?.id || `student-${Date.now()}`,
      name: cleanName,
      avatar: selectedAvatar,
      age: selectedAge,
      gradeClass: selectedClass,
      religion: selectedReligion,
      languages: languageMode,
      favoriteGame: selectedGame,
      createdAt: initialProfile?.createdAt || new Date().toISOString(),
      stars: initialProfile?.stars ?? 0,
      badges: initialProfile?.badges ?? 0,
    };

    sound.playSuccess();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
      });
    } catch {
      // Fallback
    }

    setTimeout(() => {
      onProfileSubmit(profile);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2e6b] via-[#14479e] to-[#0284c7] flex items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-y-auto select-none py-12">
      {/* Animated Floating Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.45)] border-2 border-white/90 animate-in zoom-in-95 duration-300 my-auto">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-7">
          <div className="relative">
            <div className="w-28 h-32 sm:w-36 sm:h-40 flex items-center justify-center animate-bounce-gentle">
              <img
                src={APP_IMAGES.hero3D}
                alt="VidyaAI 3D Mascot"
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </div>
            {/* Glowing JR Badge */}
            <span className="absolute bottom-1 -right-2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-xs shadow-md border-2 border-white">
              Jr
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-['Nunito',sans-serif]">
              Vidya<span className="text-blue-600">AI</span>
            </h1>
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-sm">
              JR
            </span>
          </div>

          <p className="text-xs sm:text-sm font-extrabold text-slate-600 max-w-md">
            Welcome to the magical world of personalized learning! Set up your student profile to begin. 🌟
          </p>
        </div>

        {/* Setup Form */}
        {showProfilePicker && savedProfiles.length > 0 && (
          <button
            type="button"
            onClick={() => setCreatingNewStudent(false)}
            className="w-full rounded-xl bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 hover:bg-blue-100"
          >
            ← Choose a saved student instead
          </button>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Student Name */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              1. What is your Name?
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
                placeholder="Enter your name (e.g. Aarav, Ali, Gurpreet, Ananya)..."
                maxLength={30}
                className={`w-full px-5 py-3.5 text-sm sm:text-base font-black rounded-2xl bg-slate-50 border-2 transition-all placeholder:text-slate-400 text-slate-800 focus:bg-white focus:outline-hidden ${
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

          {/* Step 2: Fun Character / Avatar */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
              2. Choose your Fun Mascot / Character
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedAvatar(av.id);
                  }}
                  className={`group relative p-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selectedAvatar === av.id
                      ? 'border-blue-500 bg-blue-50 shadow-md scale-105 ring-2 ring-blue-300'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:scale-102'
                  }`}
                  title={`${av.name} (${av.label})`}
                >
                  <span className={`w-11 h-11 rounded-full bg-gradient-to-br ${av.bg} flex items-center justify-center text-2xl filter drop-shadow-xs transition-transform group-hover:scale-110`}>
                    {av.emoji}
                  </span>
                  <span className="text-[10px] font-black text-slate-700 mt-1 truncate max-w-full">
                    {av.name}
                  </span>
                  {selectedAvatar === av.id && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Class / Grade & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                3. Select your Class / Grade
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {CLASSES.map((cl) => (
                  <button
                    type="button"
                    key={cl.id}
                    onClick={() => {
                      sound.playPop();
                      setSelectedClass(cl.id);
                    }}
                    className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-left flex items-center gap-2 ${
                      selectedClass === cl.id
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm scale-102'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-lg">{cl.icon}</span>
                    <div>
                      <span className="text-xs font-black block leading-tight">{cl.label}</span>
                      <span className={`text-[10px] font-bold block ${selectedClass === cl.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {cl.age}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Student Age: <span className="text-blue-600 font-black">{selectedAge} Years</span>
                </label>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((age) => (
                  <button
                    type="button"
                    key={age}
                    onClick={() => {
                      sound.playPop();
                      setSelectedAge(age);
                    }}
                    className={`py-2 px-1 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${
                      selectedAge === age
                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {age} yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">🎯</span>
              <div>
                <p className="text-sm font-black text-indigo-950">
                  Learning level: {contentGrade}{contentGrade === 'Grade 3' ? '+' : ''}
                  {' · '}
                  {contentGrade === 'Grade 1' ? 'Foundation' : contentGrade === 'Grade 2' ? 'Growing' : 'Challenge'}
                </p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-indigo-800">
                  This is selected automatically from {selectedClass} and age {selectedAge}. Games and quizzes use this level after the student profile is created.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Community & Faith Selection (Crucial for Tailored Islamic vs Punjabi vs Hindi View) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                4. Select Community & Language Pairing
              </label>
              <span className="text-[10px] font-black text-emerald-700 uppercase">
                Tailors Learning Modules & Language
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(['muslim', 'sikh', 'hindu', 'other'] as ReligionType[]).map((rel) => {
                const conf = RELIGION_CONFIGS[rel];
                const isSelected = selectedReligion === rel;

                return (
                  <button
                    type="button"
                    key={rel}
                    onClick={() => {
                      sound.playPop();
                      setSelectedReligion(rel);
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left relative flex items-start gap-3 ${
                      isSelected
                        ? `bg-gradient-to-r ${conf.bgGradient} border-blue-500 shadow-md ring-2 ring-blue-300 scale-102`
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{conf.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-slate-900">{conf.label}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-black text-blue-700 block mt-0.5">
                        {conf.languageBadge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 block leading-tight mt-0.5">
                        {conf.culturalFocus}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Favorite Game */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              5. Pick your Favorite Starting Game
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FAVORITE_GAMES.map((game) => (
                <button
                  type="button"
                  key={game.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedGame(game.id);
                  }}
                  className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                    selectedGame === game.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm scale-102 ring-2 ring-emerald-300'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xl mb-1">{game.icon}</span>
                  <span className="text-xs font-black leading-tight">{game.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Language Preview Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black text-blue-800 uppercase block tracking-wider">
                Assigned Languages & Greeting
              </span>
              <p className="text-xs font-black text-slate-900 mt-0.5">
                {religionConfig.greeting} • {religionConfig.greetingTransliteration} ({religionConfig.languageBadge})
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white text-blue-800 font-black text-xs shadow-xs border border-blue-200">
              Active Mode
            </span>
          </div>

          {/* Big Glossy CTA Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 active:scale-98 text-slate-950 font-black text-base shadow-xl shadow-amber-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all glossy-pill shimmer-effect"
          >
            <span>Save & Enter VidyaAI Jr!</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-1">
          <span>Personalized educational fun made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </div>
      </div>
    </div>
  );
};
