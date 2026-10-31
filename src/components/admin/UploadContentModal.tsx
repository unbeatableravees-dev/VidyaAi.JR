import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, CheckCircle, Sparkles, BookOpen, Layers, Eye } from 'lucide-react';
import {
  ALL_CLASSES,
  ClassGrade,
  ContentType,
  DifficultyLevel,
  LearningStage,
  AgeGroup,
  ContentItem,
  getStageForClass,
  SubjectCategory,
} from '../../types/lms';
import { LmsStorageService } from '../../services/lmsStorage';
import { sound } from '../../utils/audio';

interface UploadContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialContent?: ContentItem | null;
}

const SUBJECTS: SubjectCategory[] = [
  'Mathematics',
  'Science',
  'English',
  'Social Studies',
  'Environmental Studies',
  'Computer Science',
  'Hindi & Sanskrit',
  'Punjabi & Gurmukhi',
  'Urdu & Islamic',
  'Arts & Creativity',
  'Moral & Sanskar',
];

export const UploadContentModal: React.FC<UploadContentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialContent,
}) => {
  const [title, setTitle] = useState(initialContent?.title || '');
  const [description, setDescription] = useState(initialContent?.description || '');
  const [type, setType] = useState<ContentType>(initialContent?.type || 'video');
  const [subject, setSubject] = useState<string>(initialContent?.subject || 'Mathematics');
  const [targetClass, setTargetClass] = useState<ClassGrade>(
    (initialContent?.targetClass as ClassGrade) || 'Class 6'
  );
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    initialContent?.difficulty || 'intermediate'
  );
  const [chapter, setChapter] = useState(initialContent?.chapter || 'Chapter 1: Foundations');
  const [thumbnail, setThumbnail] = useState(initialContent?.thumbnail || '📚');
  const [mediaUrl, setMediaUrl] = useState(initialContent?.mediaUrl || '');
  const [contentBody, setContentBody] = useState(initialContent?.contentBody || '');
  const [status, setStatus] = useState<'draft' | 'published'>(initialContent?.status || 'published');

  if (!isOpen) return null;

  // Derive age group and learning stage automatically from target class
  const classObj = ALL_CLASSES.find((c) => c.id === targetClass) || ALL_CLASSES[0];
  const learningStage = getStageForClass(targetClass);

  let targetAgeGroup: AgeGroup = '9-12';
  if (learningStage === 'play-based') targetAgeGroup = '3-5';
  else if (learningStage === 'foundation') targetAgeGroup = '6-8';
  else if (learningStage === 'conceptual') targetAgeGroup = '9-12';
  else targetAgeGroup = '12-16';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sound.playSuccess();

    if (initialContent) {
      LmsStorageService.updateContent({
        ...initialContent,
        title: title.trim(),
        description: description.trim(),
        type,
        subject,
        targetClass,
        targetAgeGroup,
        learningStage,
        difficulty,
        chapter: chapter.trim(),
        thumbnail: thumbnail.trim() || '📚',
        mediaUrl: mediaUrl.trim(),
        contentBody: contentBody.trim(),
        status,
      });
    } else {
      LmsStorageService.addContent({
        title: title.trim(),
        description: description.trim(),
        type,
        subject,
        targetClass,
        targetAgeGroup,
        learningStage,
        difficulty,
        chapter: chapter.trim(),
        thumbnail: thumbnail.trim() || '📚',
        mediaUrl: mediaUrl.trim(),
        contentBody: contentBody.trim(),
        status,
      });
    }

    onSuccess();
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white my-auto max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                {initialContent ? 'Edit Educational Material' : 'Upload Educational Content'}
              </h2>
              <p className="text-xs font-bold text-slate-500">
                Targeted by Class, Learning Level & Age Group
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* 1. Title */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
              Content Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fractions & Decimal Models, Newton's Laws of Motion..."
              required
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* 2. Type & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                Content Type *
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['video', 'pdf', 'notes', 'quiz'] as ContentType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-2 px-1 text-center text-xs font-black rounded-xl capitalize transition-all cursor-pointer ${
                      type === t
                        ? 'bg-blue-600 text-white shadow-md scale-102'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <StyledSelect
                label="Subject *"
                value={subject}
                onChange={(val) => setSubject(val)}
                options={SUBJECTS.map((s) => ({ value: s, label: s }))}
              />
            </div>
          </div>

          {/* 3. Target Class (Most Important Feature) */}
          <div className="p-4 rounded-3xl bg-blue-50/70 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase text-blue-900 tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Select Target Class (Nursery to Class 10) *</span>
              </label>
              <span className="text-[10px] font-bold text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-blue-200">
                {classObj.ageRange} • {learningStage.toUpperCase()}
              </span>
            </div>

            <StyledSelect
              value={targetClass}
              onChange={(val) => setTargetClass(val as ClassGrade)}
              options={ALL_CLASSES.map((cls) => ({ value: cls.id, label: `${cls.icon} ${cls.label} (${cls.ageRange})` }))}
            />

            {/* LIVE CONTENT VISIBILITY PREVIEW */}
            <div className="mt-3 p-3 bg-white rounded-2xl border border-blue-200 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <p className="font-black text-blue-950">
                  Target: <span className="underline">{targetClass}</span> · Subject: {subject} · Age: {classObj.ageRange} · Level: {difficulty}
                </p>
                <p className="font-semibold text-slate-500 mt-0.5">
                  🛡️ Automatic Distribution: Only eligible students registered in <strong>{targetClass}</strong> will receive this material.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Difficulty, Chapter & Thumbnail */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <StyledSelect
                label="Difficulty"
                value={difficulty}
                onChange={(val) => setDifficulty(val as DifficultyLevel)}
                options={[
                  { value: 'beginner', label: '🌱 Beginner' },
                  { value: 'intermediate', label: '🌿 Intermediate' },
                  { value: 'advanced', label: '🌳 Advanced' },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                Related Chapter
              </label>
              <input
                type="text"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Unit 3: Plants"
                className="w-full px-3 py-2 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                Thumbnail Emoji
              </label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="e.g. 🪐, ➕, 🧪"
                className="w-full px-3 py-2 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 text-center"
              />
            </div>
          </div>

          {/* 5. Media URL & Notes Body */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
              {type === 'video' ? 'Video URL (YouTube Embed / MP4)' : 'Document Link / Media Source'}
            </label>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder={type === 'video' ? 'https://www.youtube.com/embed/...' : 'https://... or simulated cloud link'}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
              Description & Learning Notes (Markdown / Text)
            </label>
            <textarea
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              rows={4}
              placeholder="Write lesson notes, bullet points, study guides, or chapter summary here..."
              className="w-full p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* 6. Publishing Status */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <label className="text-xs font-black uppercase text-slate-700">Status:</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer ${
                    status === 'published' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  ✓ Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer ${
                    status === 'draft' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl border-2 border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {initialContent ? 'Save Changes' : 'Upload & Distribute Content'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
