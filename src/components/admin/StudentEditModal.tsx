import React, { useState, useEffect } from 'react';
import { X, UserCheck, Star, Award, Sparkles, Check } from 'lucide-react';
import { StyledSelect, SelectOption } from '../common/StyledSelect';
import { LmsStorageService } from '../../services/lmsStorage';
import { ALL_CLASSES, ClassGrade } from '../../types/lms';
import { StudentProfile, ReligionType } from '../../types/student';
import { sound } from '../../utils/audio';

interface StudentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  onSaved: () => void;
}

const CLASS_OPTIONS: SelectOption[] = ALL_CLASSES.map((c) => ({
  value: c.id,
  label: `${c.icon} ${c.label} (${c.ageRange})`,
}));

const AGE_OPTIONS: SelectOption[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((age) => ({
  value: String(age),
  label: `${age} Years Old`,
}));

const RELIGION_OPTIONS: SelectOption[] = [
  { value: 'muslim', label: '🕌 Islamic Teachings & Values' },
  { value: 'sikh', label: '☬ Punjabi & Gurmukhi Academy' },
  { value: 'hindu', label: '🕉️ Hindi & Cultural Wisdom' },
  { value: 'other', label: '🌍 Universal / Multi-faith Curriculum' },
];

export const StudentEditModal: React.FC<StudentEditModalProps> = ({
  isOpen,
  onClose,
  student,
  onSaved,
}) => {
  const [name, setName] = useState('');
  const [gradeClass, setGradeClass] = useState<string>('Class 2');
  const [age, setAge] = useState<string>('7');
  const [religion, setReligion] = useState<ReligionType>('muslim');
  const [stars, setStars] = useState<number>(0);
  const [badges, setBadges] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setName(student.name);
      setGradeClass(student.gradeClass || 'Class 2');
      setAge(String(student.age || 7));
      setReligion(student.religion || 'muslim');
      setStars(student.stars || 0);
      setBadges(student.badges || 0);
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    sound.playSuccess();

    LmsStorageService.updateStudentProfile(student.id, {
      name: name.trim(),
      gradeClass: gradeClass,
      age: parseInt(age, 10),
      religion: religion,
      stars: Number(stars),
      badges: Number(badges),
    });

    setIsSubmitting(false);
    onSaved();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[170] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white/80 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Update Student Details
              </h3>
              <p className="text-[11px] font-bold text-blue-600">
                Super Admin Student Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StyledSelect
              label="Class / Grade Level"
              value={gradeClass}
              onChange={(val) => setGradeClass(val)}
              options={CLASS_OPTIONS}
            />

            <StyledSelect
              label="Student Age"
              value={age}
              onChange={(val) => setAge(val)}
              options={AGE_OPTIONS}
            />
          </div>

          <StyledSelect
            label="Faith / Community Learning Track"
            value={religion}
            onChange={(val) => setReligion(val as ReligionType)}
            options={RELIGION_OPTIONS}
          />

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1 text-amber-600">
                <Star className="w-3.5 h-3.5 fill-current" /> Stars Count
              </label>
              <input
                type="number"
                min={0}
                max={9999}
                value={stars}
                onChange={(e) => setStars(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-black text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1 text-blue-600">
                <Award className="w-3.5 h-3.5" /> Badges Count
              </label>
              <input
                type="number"
                min={0}
                max={999}
                value={badges}
                onChange={(e) => setBadges(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-black text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save Student Updates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
