import React, { useState } from 'react';
import { X, UserPlus, Users, Check, Trash2, ShieldCheck, Sparkles, Star, Flame } from 'lucide-react';
import { sound } from '../../utils/audio';
import { StudentProfile, ReligionType, LanguagePair, RELIGION_CONFIGS } from '../../types/student';
import { getStudentProgress } from '../../utils/studentProgress';
import { getStudentStreakData } from '../../utils/streakManager';

interface SiblingSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: StudentProfile | null;
  savedProfiles: StudentProfile[];
  onSelectProfile: (profile: StudentProfile) => void;
  onAddProfile: (profile: StudentProfile) => void;
  onDeleteProfile: (profileId: string) => void;
}

const AVATARS = [
  { id: 'boy-aarav', name: 'Aarav', emoji: '👦', desc: 'Curious Explorer' },
  { id: 'girl-ananya', name: 'Ananya', emoji: '👧', desc: 'Creative Artist' },
  { id: 'boy-kabir', name: 'Kabir', emoji: '🧑‍🚀', desc: 'Space Adventurer' },
  { id: 'girl-meera', name: 'Meera', emoji: '🐼', desc: 'Nature Lover' },
  { id: 'boy-sheru', name: 'Sheru', emoji: '🦁', desc: 'Brave Champion' },
  { id: 'girl-zehra', name: 'Zehra', emoji: '🎨', desc: 'Smart Scholar' },
  { id: 'boy-gurpreet', name: 'Gurpreet', emoji: '👳', desc: 'Kind Helper' },
  { id: 'girl-fatima', name: 'Fatima', emoji: '🧕', desc: 'Bright Mind' },
];

const ALL_CLASSES = [
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

export const SiblingSwitcherModal: React.FC<SiblingSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  savedProfiles,
  onSelectProfile,
  onAddProfile,
  onDeleteProfile,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('Class 1');
  const [newAge, setNewAge] = useState(6);
  const [newReligion, setNewReligion] = useState<ReligionType>('muslim');
  const [newAvatar, setNewAvatar] = useState('boy-aarav');

  // Parent PIN state for deleting sibling
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const handleCreateSibling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    sound.playPop();
    const config = RELIGION_CONFIGS[newReligion];
    const newStudent: StudentProfile = {
      id: `student_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: newName.trim(),
      avatar: newAvatar,
      age: newAge,
      gradeClass: newGrade,
      religion: newReligion,
      languages: config.defaultLanguages,
      favoriteGame: 'Space & Stars',
      createdAt: new Date().toISOString(),
    };

    onAddProfile(newStudent);
    setIsAddingNew(false);
    setNewName('');
    sound.playFanfare();
  };

  const confirmDelete = () => {
    if (pinInput === '1234') {
      if (deleteCandidateId) {
        onDeleteProfile(deleteCandidateId);
        sound.playPop();
      }
      setDeleteCandidateId(null);
      setPinInput('');
      setPinError(false);
    } else {
      setPinError(true);
      sound.playBuzz();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-blue-400 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              👨‍👩‍👧‍👦
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">Family & Sibling Switcher</h2>
              <p className="text-xs sm:text-sm font-bold text-blue-100">
                Switch profiles or add siblings to keep learning scores separate!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Delete Confirmation Gate */}
        {deleteCandidateId && (
          <div className="p-4 bg-rose-50 border-b-2 border-rose-300 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-rose-800">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
              <span className="text-xs font-black">
                Parent PIN (1234) required to delete student profile:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="1234"
                className="w-20 px-3 py-1.5 rounded-xl border border-rose-300 text-center font-black text-sm"
              />
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteCandidateId(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-black text-xs hover:bg-slate-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
            {pinError && <p className="text-xs font-bold text-rose-600">Incorrect PIN! Default is 1234</p>}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50">
          {!isAddingNew ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Registered Children ({savedProfiles.length})
                </h3>

                <button
                  onClick={() => {
                    sound.playPop();
                    setIsAddingNew(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" /> + Add Sibling
                </button>
              </div>

              {/* Profiles List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {savedProfiles.map((p) => {
                  const isActive = activeProfile?.id === p.id;
                  const progress = getStudentProgress(p.id);
                  const streak = getStudentStreakData(p.id);
                  const avatarObj = AVATARS.find((a) => a.id === p.avatar) || AVATARS[0];

                  return (
                    <div
                      key={p.id}
                      className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500 shadow-md ring-2 ring-blue-400'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-3xl shadow-md border-2 border-white">
                            {avatarObj.emoji}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-base font-black text-slate-900">{p.name}</h4>
                              {isActive && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-black text-blue-700">{p.gradeClass}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-bold text-amber-600 flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400" /> {progress.starsEarned} ⭐
                              </span>
                              <span className="text-[11px] font-bold text-orange-600 flex items-center gap-0.5">
                                <Flame className="w-3 h-3 fill-orange-500" /> {streak.currentStreak}d
                              </span>
                            </div>
                          </div>
                        </div>

                        {savedProfiles.length > 1 && !isActive && (
                          <button
                            onClick={() => {
                              sound.playPop();
                              setDeleteCandidateId(p.id);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete Child Profile"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="mt-4">
                        {isActive ? (
                          <div className="w-full py-2 rounded-xl bg-blue-100 text-blue-800 font-black text-xs text-center flex items-center justify-center gap-1.5">
                            <Check className="w-4 h-4 text-blue-600" /> Currently Learning
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              sound.playPop();
                              onSelectProfile(p);
                              onClose();
                            }}
                            className="w-full py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-black text-xs text-center transition cursor-pointer"
                          >
                            Switch to {p.name} ➔
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Add Sibling Form */
            <form onSubmit={handleCreateSibling} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-blue-600" /> Add a Sibling / New Student
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs font-black text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  ← Back to profiles
                </button>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Child&apos;s Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kabir, Ananya, Sheru"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Grade Class & Age */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    Class / Grade
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
                  >
                    {ALL_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min={3}
                    max={17}
                    value={newAge}
                    onChange={(e) => setNewAge(parseInt(e.target.value) || 6)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
                  />
                </div>
              </div>

              {/* Religion / Cultural Learning Track */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Learning Track & Cultural Academy
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['muslim', 'hindu', 'sikh', 'other'] as ReligionType[]).map((rel) => {
                    const cfg = RELIGION_CONFIGS[rel];
                    const isSelected = newReligion === rel;
                    return (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => setNewReligion(rel)}
                        className={`p-2.5 rounded-xl border-2 text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 shadow-sm'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <span className="text-xl">{cfg.icon}</span>
                        <span className="text-[11px] font-black text-slate-800">{cfg.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Choose Avatar
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setNewAvatar(av.id)}
                      className={`p-2 rounded-2xl border-2 text-center flex flex-col items-center gap-1 transition cursor-pointer ${
                        newAvatar === av.id
                          ? 'bg-blue-100 border-blue-600 shadow-sm scale-105'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="text-2xl">{av.emoji}</span>
                      <span className="text-[9px] font-black text-slate-700 truncate w-full">
                        {av.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" /> Create & Start Learning
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
