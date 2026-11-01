import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Upload,
  CheckCircle,
  Sparkles,
  BookOpen,
  Layers,
  Eye,
  FileVideo,
  FileText,
  Paperclip,
  Check,
  AlertCircle,
  HardDrive,
  Link2,
} from 'lucide-react';
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
import { LmsMediaStorage } from '../../services/lmsMediaStorage';
import { sound } from '../../utils/audio';
import { StyledSelect } from '../common/StyledSelect';

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
  'Stories & Rhymes',
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

  // Local File Upload state
  const [sourceMode, setSourceMode] = useState<'local' | 'link'>(
    initialContent?.isLocalFile ? 'local' : 'link'
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Derive age group and learning stage automatically from target class
  const classObj = ALL_CLASSES.find((c) => c.id === targetClass) || ALL_CLASSES[0];
  const learningStage = getStageForClass(targetClass);

  let targetAgeGroup: AgeGroup = '9-12';
  if (learningStage === 'play-based') targetAgeGroup = '3-5';
  else if (learningStage === 'foundation') targetAgeGroup = '6-8';
  else if (learningStage === 'conceptual') targetAgeGroup = '9-12';
  else targetAgeGroup = '12-16';

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    sound.playPop();

    // Auto-detect type
    const mime = file.type.toLowerCase();
    if (mime.startsWith('video/')) {
      setType('video');
      if (!thumbnail || thumbnail === '📚') setThumbnail('🎬');
    } else if (mime.includes('pdf')) {
      setType('pdf');
      if (!thumbnail || thumbnail === '📚') setThumbnail('📄');
    } else if (mime.startsWith('image/')) {
      if (!thumbnail || thumbnail === '📚') setThumbnail('🖼️');
    }

    if (!title) {
      // Auto-populate title from clean file name
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sound.playSuccess();
    setIsUploading(true);

    let isLocal = initialContent?.isLocalFile || false;
    let localFileId = initialContent?.localFileId;
    let fileName = initialContent?.fileName;
    let fileSize = initialContent?.fileSize;
    let mimeType = initialContent?.mimeType;
    let finalMediaUrl = mediaUrl.trim();

    if (sourceMode === 'local') {
      isLocal = true;
      if (selectedFile) {
        setUploadProgress('Storing local file in IndexedDB...');
        try {
          localFileId = await LmsMediaStorage.saveLocalFile(selectedFile);
          fileName = selectedFile.name;
          fileSize = LmsMediaStorage.formatFileSize(selectedFile.size);
          mimeType = selectedFile.type;
          finalMediaUrl = selectedFile.name;
        } catch (err) {
          console.error('Error saving local file:', err);
        }
      }
    } else {
      isLocal = false;
    }

    const payload: ContentItem = {
      id: initialContent?.id || `cnt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title: title.trim(),
      description: description.trim(),
      type,
      subject,
      targetClass,
      targetAgeGroup,
      learningStage,
      difficulty,
      chapter: chapter.trim() || 'General Curriculum',
      thumbnail: thumbnail.trim() || '📚',
      mediaUrl: finalMediaUrl,
      contentBody: contentBody.trim(),
      isLocalFile: isLocal,
      localFileId,
      fileName,
      fileSize,
      mimeType,
      status,
      publishedAt: initialContent?.publishedAt || new Date().toISOString().split('T')[0],
      views: initialContent?.views || 0,
      likes: initialContent?.likes || 0,
      durationMinutes: initialContent?.durationMinutes || (type === 'video' ? 6 : 10),
    };

    if (initialContent) {
      LmsStorageService.updateContent(payload);
    } else {
      LmsStorageService.addContent(payload);
    }

    setIsUploading(false);
    onSuccess();
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 select-none overflow-y-auto animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isUploading) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-7 md:p-8 shadow-2xl border-4 border-white my-auto max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                {initialContent ? 'Edit Educational Material' : 'Upload Educational Content'}
              </h2>
              <p className="text-[11px] sm:text-xs font-bold text-slate-500">
                Super Admin Content Management • Local Files & Interactive Streams
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* 1. Media Source Selection: Local File vs Online Link */}
          <div className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3">
            <label className="block text-xs font-black uppercase text-slate-700 tracking-wider">
              Educational Media Source *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSourceMode('local');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  sourceMode === 'local'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <HardDrive className="w-4 h-4" />
                <span>Upload Local File</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSourceMode('link');
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  sourceMode === 'link'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>Video / Web Link</span>
              </button>
            </div>

            {sourceMode === 'local' ? (
              <div className="space-y-3 pt-1">
                {/* Drag and Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                      : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="video/*,application/pdf,.pdf,.doc,.docx,.txt,image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 shadow-xs">
                    <FileVideo className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-black text-slate-800">
                    Click to browse or drag & drop your local file here
                  </p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1">
                    Supports Video (.mp4, .webm), PDF documents, Notes, Images (Up to 250MB)
                  </p>
                </div>

                {/* Selected File Card */}
                {(selectedFile || initialContent?.isLocalFile) && (
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-emerald-950 truncate">
                          {selectedFile?.name || initialContent?.fileName || 'Local file attached'}
                        </p>
                        <p className="text-[10px] font-bold text-emerald-700">
                          {selectedFile
                            ? LmsMediaStorage.formatFileSize(selectedFile.size)
                            : initialContent?.fileSize || 'Stored locally'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-xs font-black text-rose-600 hover:text-rose-700 px-2 py-1 bg-white rounded-lg border border-rose-200 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="pt-1">
                <label className="block text-[11px] font-black uppercase text-slate-600 tracking-wider mb-1">
                  Video Stream URL or ID *
                </label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="Paste video stream link or ID (e.g. hq3yfQnllfQ)"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* 2. Title */}
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

          {/* 3. Type & Subject */}
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

          {/* 4. Target Class (Most Important Feature) */}
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
              options={ALL_CLASSES.map((cls) => ({
                value: cls.id,
                label: `${cls.icon} ${cls.label} (${cls.ageRange})`,
              }))}
            />

            {/* LIVE CONTENT VISIBILITY PREVIEW */}
            <div className="mt-3 p-3 bg-white rounded-2xl border border-blue-200 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <p className="font-black text-blue-950">
                  Target: <span className="underline">{targetClass}</span> · Subject: {subject} · Age:{' '}
                  {classObj.ageRange} · Level: {difficulty}
                </p>
                <p className="font-semibold text-slate-500 mt-0.5">
                  🛡️ Automatic Distribution: Only eligible students registered in <strong>{targetClass}</strong> will receive this material.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Difficulty, Chapter & Thumbnail */}
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

          {/* 6. Description & Notes Body */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
              Description & Learning Notes (Markdown / Text)
            </label>
            <textarea
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              rows={3}
              placeholder="Write lesson notes, bullet points, study guides, or chapter summary here..."
              className="w-full p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* 7. Publishing Status & Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
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

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer text-center disabled:opacity-50"
              >
                {isUploading
                  ? (uploadProgress || 'Uploading...')
                  : initialContent
                  ? 'Save Changes'
                  : 'Upload & Distribute Content'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
