import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Star, Heart, Check, ShieldCheck, AlertTriangle } from 'lucide-react';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';
import { StudentProfile, ReligionType, LanguagePair, RELIGION_CONFIGS } from '../../types/student';
import { getStudentContentGrade } from '../../utils/studentLevel';
import { ALL_CLASSES, getExpectedAgeForClass, getStageForClass, STAGE_CONFIGS } from '../../types/lms';

interface WelcomeScreenProps {
  onProfileSubmit: (profile: StudentProfile) => void;
  initialProfile?: StudentProfile | null;
  savedProfiles?: StudentProfile[];
  showProfilePicker?: boolean;
  onChooseProfile?: (profile: StudentProfile) => void;
  onOpenAdmin?: () => void;
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

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onProfileSubmit,
  initialProfile,
  savedProfiles = [],
  showProfilePicker = false,
  onChooseProfile,
  onOpenAdmin,
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(initialProfile?.avatar || AVATARS[0].id);
  const [selectedAge, setSelectedAge] = useState<number>(initialProfile?.age || 7);
  const [selectedClass, setSelectedClass] = useState(initialProfile?.gradeClass || 'Class 2');
  const [selectedReligion, setSelectedReligion] = useState<ReligionType>(initialProfile?.religion || 'muslim');
  const [error, setError] = useState(false);
  const [creatingNewStudent, setCreatingNewStudent] = useState(false);

  const religionConfig = RELIGION_CONFIGS[selectedReligion];

  // Age & Class stage checks
  const expectedAge = getExpectedAgeForClass(selectedClass);
  const isMismatch = selectedAge < expectedAge.min || selectedAge > expectedAge.max;
  const currentStage = getStageForClass(selectedClass);
  const stageInfo = STAGE_CONFIGS[currentStage];

  if (showProfilePicker && savedProfiles.length > 0 && !creatingNewStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c2e6b] via-[#14479e] to-[#0284c7] flex flex-col items-center justify-center p-4 sm:p-8 relative">
        {/* Top Bar with Admin Login */}
        <div className="w-full max-w-3xl flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white font-['Nunito',sans-serif]">
              Vidya<span className="text-yellow-400">AI</span> Jr
            </span>
          </div>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-black hover:bg-white/25 border border-white/30 transition-all cursor-pointer shadow-sm hover:scale-102"
            >
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>Admin Login 🔐</span>
            </button>
          )}
        </div>

        <section className="w-full max-w-3xl rounded-[2.5rem] bg-white p-6 sm:p-10 shadow-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <span className="text-2xl font-black text-slate-900 font-['Nunito',sans-serif]">Vidya<span className="text-blue-600">AI</span></span>
              <span className="px-2 py-0.5 bg-yellow-400 text-slate-950 font-black text-xs rounded-full shadow-xs">JR</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">Kids Learning Galaxy</p>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-black text-slate-900">Who is learning today? ⭐</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Each student has their own personalized curriculum, stars, and progress dossier.
            </p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {savedProfiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => onChooseProfile?.(profile)}
                className="flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl shadow">
                  {AVATARS.find((avatar) => avatar.id === profile.avatar)?.emoji || '👦'}
                </span>
                <span>
                  <span className="block text-lg font-black text-slate-900">{profile.name}</span>
                  <span className="block text-xs font-bold text-slate-500">
                    {profile.gradeClass} ({profile.age} yrs) · {RELIGION_CONFIGS[profile.religion]?.label || 'Universal'}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCreatingNewStudent(true)}
            className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-3 font-black text-white shadow-lg transition hover:bg-blue-700 cursor-pointer"
          >
            + Register a new student
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
      favoriteGame: 'body',
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
    <div className="min-h-screen bg-gradient-to-br from-[#0c2e6b] via-[#14479e] to-[#0284c7] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-y-auto select-none py-10">
      {/* Animated Floating Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar Section with Admin Login Button */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-4 z-20 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-white font-['Nunito',sans-serif]">
            Vidya<span className="text-yellow-400">AI</span> Jr
          </span>
          <span className="px-2 py-0.5 bg-yellow-400 text-slate-950 font-black text-[10px] rounded-full">
            KIDS PORTAL
          </span>
        </div>

        {onOpenAdmin && (
          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-black hover:bg-white/25 border border-white/30 transition-all cursor-pointer shadow-sm hover:scale-102"
          >
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>Admin Login 🔐</span>
          </button>
        )}
      </div>

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
            className="w-full mb-4 rounded-xl bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 hover:bg-blue-100 cursor-pointer"
          >
            ← Choose an existing saved student instead
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
                  title={`${av.name}`}
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

          {/* Step 3: Class / Grade (Nursery to Class 10) & Age */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  3. Select your Class / Grade (Nursery to Class 10)
                </label>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {stageInfo.badge}
                </span>
              </div>

              {/* Class Grid: 13 levels */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-52 overflow-y-auto p-1 border border-slate-100 rounded-2xl bg-slate-50/50">
                {ALL_CLASSES.map((cl) => {
                  const isSelected = selectedClass === cl.id;
                  return (
                    <button
                      type="button"
                      key={cl.id}
                      onClick={() => {
                        sound.playPop();
                        setSelectedClass(cl.id);
                      }}
                      className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer text-left flex items-center gap-2 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm scale-102'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xl shrink-0">{cl.icon}</span>
                      <div className="min-w-0">
                        <span className="text-xs font-black block leading-tight truncate">{cl.label}</span>
                        <span className={`text-[10px] font-bold block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          {cl.ageRange}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Age Selector (3 to 16 Years) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Student Age: <span className="text-blue-600 font-black">{selectedAge} Years</span>
                </label>
                <span className="text-[10px] font-bold text-slate-400">
                  Expected for {selectedClass}: {expectedAge.label}
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 pt-1">
                {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((age) => (
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
                    {age}y
                  </button>
                ))}
              </div>
            </div>

            {/* Age Mismatch Advisory Flag */}
            {isMismatch && (
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs font-semibold text-amber-900 leading-relaxed">
                  <strong>Notice:</strong> Your age ({selectedAge} yrs) differs from the standard {selectedClass} age range ({expectedAge.label}). Our curriculum adapts to your chosen level, and admin will be notified to ensure optimal learning support.
                </div>
              </div>
            )}

            {/* Stage Info Card */}
            <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/80 p-3.5 flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">🎯</span>
              <div>
                <p className="text-xs sm:text-sm font-black text-indigo-950">
                  {stageInfo.title} ({stageInfo.subtitle})
                </p>
                <p className="mt-0.5 text-xs font-semibold text-indigo-800 leading-relaxed">
                  {stageInfo.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Community & Faith Selection */}
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
                return (
                  <button
                    type="button"
                    key={rel}
                    onClick={() => {
                      sound.playPop();
                      setSelectedReligion(rel);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                      selectedReligion === rel
                        ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{conf.icon}</span>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-slate-900 block truncate">
                        {conf.label}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 block truncate">
                        {conf.languageBadge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-101 flex items-center justify-center gap-2"
          >
            <span>Launch My Personalized Learning Galaxy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
