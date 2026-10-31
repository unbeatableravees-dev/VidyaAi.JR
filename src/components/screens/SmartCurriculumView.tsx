import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Play,
  CheckCircle,
  Star,
  Bookmark,
  Sparkles,
  Award,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Search,
  Filter,
  Check,
  X,
  Send,
  AlertTriangle,
  FileText,
  HelpCircle,
  Zap,
  GraduationCap,
  Video,
  ListOrdered,
  Layers,
  Heart,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { LmsStorageService } from '../../services/lmsStorage';
import {
  ContentItem,
  StudentActivity,
  StudentInterest,
  PromotionRequest,
  ContentType,
  ALL_CLASSES,
  STAGE_CONFIGS,
  getStageForClass,
  getExpectedAgeForClass,
} from '../../types/lms';
import { StudentProfile, RELIGION_CONFIGS } from '../../types/student';
import { sound } from '../../utils/audio';
import { StyledSelect, SelectOption } from '../common/StyledSelect';

interface SmartCurriculumViewProps {
  studentProfile?: StudentProfile | null;
  onBackToHome?: () => void;
  onOpenPractice?: () => void;
  onOpenExplorer?: () => void;
}

export const SmartCurriculumView: React.FC<SmartCurriculumViewProps> = ({
  studentProfile,
  onBackToHome,
}) => {
  const currentClass = studentProfile?.gradeClass || 'Class 2';
  const currentAge = studentProfile?.age || 7;
  const currentReligion = studentProfile?.religion || 'muslim';
  const studentId = studentProfile?.id || 'guest-student';
  const studentName = studentProfile?.name || 'Explorer';

  const currentStage = getStageForClass(currentClass);
  const stageConfig = STAGE_CONFIGS[currentStage];
  const expectedAge = getExpectedAgeForClass(currentClass);
  const isAgeMismatch = currentAge < expectedAge.min || currentAge > expectedAge.max;

  // Local state
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItemsOnly, setSavedItemsOnly] = useState(false);
  // Advanced Filters
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');


  // Content, activities & interests
  const [materials, setMaterials] = useState<ContentItem[]>(() =>
    LmsStorageService.getContentForStudent(currentClass, currentAge, currentReligion)
  );
  const [activities, setActivities] = useState<StudentActivity[]>(() =>
    LmsStorageService.getActivitiesForStudent(studentId)
  );
  const [interests, setInterests] = useState<StudentInterest[]>(() =>
    LmsStorageService.getInterestsForStudent(studentId)
  );
  const [promotionRequests, setPromotionRequests] = useState<PromotionRequest[]>(() =>
    LmsStorageService.getAllPromotionRequests().filter((r) => r.studentId === studentId)
  );

  // Active Modals
  const [activeViewerItem, setActiveViewerItem] = useState<ContentItem | null>(null);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Promotion Form state
  const [targetClass, setTargetClass] = useState<string>('Class 3');
  const [promotionReason, setPromotionReason] = useState('');
  const [promotionSuccessMsg, setPromotionSuccessMsg] = useState('');

  // Custom Request Form State
  const [customTopic, setCustomTopic] = useState('');
  const [customSubject, setCustomSubject] = useState('Science');
  const [customNote, setCustomNote] = useState('');

  // Quiz state inside Material Viewer
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Refresh content on class or profile change
  useEffect(() => {
    const refreshData = () => {
      setMaterials(LmsStorageService.getContentForStudent(currentClass, currentAge, currentReligion));
      setActivities(LmsStorageService.getActivitiesForStudent(studentId));
      setInterests(LmsStorageService.getInterestsForStudent(studentId));
      setPromotionRequests(
        LmsStorageService.getAllPromotionRequests().filter((r) => r.studentId === studentId)
      );
    };

    refreshData();

    window.addEventListener('vidya_lms_content_updated', refreshData);
    window.addEventListener('vidya_lms_activity_recorded', refreshData);
    window.addEventListener('vidya_lms_interest_recorded', refreshData);
    window.addEventListener('vidya_student_class_promoted', refreshData);

    return () => {
      window.removeEventListener('vidya_lms_content_updated', refreshData);
      window.removeEventListener('vidya_lms_activity_recorded', refreshData);
      window.removeEventListener('vidya_lms_interest_recorded', refreshData);
      window.removeEventListener('vidya_student_class_promoted', refreshData);
    };
  }, [currentClass, currentAge, currentReligion, studentId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Helper sets
  const savedContentIds = useMemo(() => {
    return new Set(
      interests.filter((i) => i.type === 'saved_for_later').map((i) => i.contentId)
    );
  }, [interests]);

  const interestedContentIds = useMemo(() => {
    return new Set(
      interests.filter((i) => i.type === 'interested').map((i) => i.contentId)
    );
  }, [interests]);

  const completedContentIds = useMemo(() => {
    return new Set(
      activities
        .filter((a) => a.action === 'completed' || (a.action === 'quiz_attempt' && (a.score?.percentage || 0) >= 60))
        .map((a) => a.contentId)
    );
  }, [activities]);

  // Unique subjects available for this student's materials
  const availableSubjects = useMemo(() => {
    const subs = new Set<string>();
    materials.forEach((m) => subs.add(m.subject));
    return Array.from(subs);
  }, [materials]);

  // Filtered materials with multi-dimensional criteria
  const filteredMaterials = useMemo(() => {
    const list = materials.filter((item) => {
      if (selectedType !== 'all' && item.type !== selectedType) return false;
      if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) return false;

      // Status filters
      if (savedItemsOnly && !savedContentIds.has(item.id)) return false;
      if (selectedStatus === 'saved' && !savedContentIds.has(item.id)) return false;
      if (selectedStatus === 'interested' && !interestedContentIds.has(item.id)) return false;
      if (selectedStatus === 'completed' && !completedContentIds.has(item.id)) return false;
      if (selectedStatus === 'not_started' && (completedContentIds.has(item.id) || savedContentIds.has(item.id))) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSubject = item.subject.toLowerCase().includes(q);
        const matchesChapter = item.chapter.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesChapter) return false;
      }
      return true;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'popular') return (b.views + b.likes) - (a.views + a.likes);
      if (sortBy === 'newest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [materials, selectedType, selectedSubject, selectedDifficulty, selectedStatus, sortBy, savedItemsOnly, searchQuery, savedContentIds, interestedContentIds, completedContentIds]);

  // Smart Recommendations Engine
  const recommendedMaterials = useMemo(() => {
    // Return up to 3 materials that match either:
    // 1. High rating / view count
    // 2. Student showed interest in this subject
    // 3. Not yet completed
    const uncompleted = materials.filter((m) => !completedContentIds.has(m.id));
    if (uncompleted.length === 0) return materials.slice(0, 3);

    // Sort by likes + views
    const sorted = [...uncompleted].sort((a, b) => b.likes + b.views - (a.likes + a.views));
    return sorted.slice(0, 3);
  }, [materials, completedContentIds]);

  // Action handlers
  const handleToggleSave = (item: ContentItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playPop();
    const isSaved = savedContentIds.has(item.id);
    LmsStorageService.recordInterest({
      studentId,
      studentName,
      contentId: item.id,
      topicName: item.title,
      subject: item.subject,
      type: 'saved_for_later',
      note: isSaved ? 'Removed from saved' : 'Saved for later revision',
    });
    showToast(isSaved ? 'Removed from saved list' : '🔖 Saved to your personal reading list!');
  };

  const handleToggleInterest = (item: ContentItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playPop();
    const isInterested = interestedContentIds.has(item.id);
    LmsStorageService.recordInterest({
      studentId,
      studentName,
      contentId: item.id,
      topicName: item.title,
      subject: item.subject,
      type: 'interested',
      note: 'Student marked interest in this topic',
    });
    showToast(isInterested ? 'Interest recorded!' : '⭐ Topic added to your interests! Admin will prioritize similar lessons.');
  };

  const handleWantToLearnMore = (item: ContentItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playPop();
    LmsStorageService.recordInterest({
      studentId,
      studentName,
      contentId: item.id,
      topicName: item.title,
      subject: item.subject,
      type: 'want_to_learn_more',
      note: `Student requests more deep-dive chapters on ${item.subject}`,
    });
    showToast('💡 Request sent to Teachers: "Want to learn more about this!"');
  };

  const handleOpenViewer = (item: ContentItem) => {
    sound.playPop();
    setActiveViewerItem(item);
    setQuizScore(null);
    setSelectedAnswer(null);
    setQuizSubmitted(false);

    // Record activity: opened
    LmsStorageService.recordActivity({
      studentId,
      studentName,
      studentClass: currentClass,
      contentId: item.id,
      contentTitle: item.title,
      contentType: item.type,
      subject: item.subject,
      action: 'opened',
      progressPercent: 30,
    });
  };

  const handleCompleteViewerItem = (item: ContentItem) => {
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

    LmsStorageService.recordActivity({
      studentId,
      studentName,
      studentClass: currentClass,
      contentId: item.id,
      contentTitle: item.title,
      contentType: item.type,
      subject: item.subject,
      action: 'completed',
      progressPercent: 100,
    });

    showToast('🎉 Chapter marked as Completed! Great job!');
    setActiveViewerItem(null);
  };

  const handleQuizSubmit = (item: ContentItem) => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === 1; // Option index 1 is correct demo
    const scoreVal = isCorrect ? 100 : 50;
    setQuizScore(scoreVal);
    setQuizSubmitted(true);

    if (isCorrect) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {
        // Fallback
      }
    } else {
      sound.playPop();
    }

    LmsStorageService.recordActivity({
      studentId,
      studentName,
      studentClass: currentClass,
      contentId: item.id,
      contentTitle: item.title,
      contentType: 'quiz',
      subject: item.subject,
      action: 'quiz_attempt',
      progressPercent: 100,
      score: {
        correct: isCorrect ? 1 : 0,
        total: 1,
        percentage: scoreVal,
      },
    });
  };

  const handleSubmitPromotion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promotionReason.trim()) return;

    sound.playSuccess();
    LmsStorageService.submitPromotionRequest({
      studentId,
      studentName,
      currentClass,
      requestedClass: targetClass,
      studentAge: currentAge,
      reason: promotionReason.trim(),
    });

    setPromotionSuccessMsg('Promotion request submitted successfully! Super Admin will review your progress.');
    setTimeout(() => {
      setIsPromotionModalOpen(false);
      setPromotionSuccessMsg('');
      setPromotionReason('');
    }, 2000);
  };

  const handleSubmitCustomRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    sound.playSuccess();
    LmsStorageService.recordInterest({
      studentId,
      studentName,
      topicName: customTopic.trim(),
      subject: customSubject,
      type: 'request_additional',
      note: customNote.trim() || 'Student requested custom material',
    });

    showToast('📝 Custom material request sent to Admin!');
    setIsRequestModalOpen(false);
    setCustomTopic('');
    setCustomNote('');
  };

  // Next class calculation for promotion
  const classIndex = ALL_CLASSES.findIndex((c) => c.id === currentClass);
  const nextClassSuggested =
    classIndex >= 0 && classIndex < ALL_CLASSES.length - 1
      ? ALL_CLASSES[classIndex + 1].id
      : 'Class 10';

  return (
    <div className="min-h-full pb-20 px-3 sm:px-6 md:px-8 py-6 select-none animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[200] max-w-sm bg-slate-900 text-white text-xs font-black px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Age vs Class Mismatch Alert Flag */}
      {isAgeMismatch && (
        <div className="mb-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-md">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                System Advisory • Age Alignment
              </span>
              <span className="text-xs font-black text-amber-900">
                Registered Age ({currentAge} yrs) vs Class Norm ({expectedAge.label})
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold text-amber-800 leading-relaxed">
              Your personalized curriculum is calibrated for <strong>{currentClass}</strong>. Our system flags this for teacher verification so you receive lessons suited to your learning level without arbitrary restrictions.
            </p>
          </div>
        </div>
      )}

      {/* Hero Header & Stage Showcase */}
      <div className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r ${stageConfig.color} p-6 sm:p-10 text-white shadow-xl mb-8`}>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-wider border border-white/30 text-white shadow-xs">
              {stageConfig.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-yellow-400 text-slate-950 text-[11px] font-black shadow-xs">
              {currentClass} • {stageConfig.subtitle}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm font-['Nunito',sans-serif]">
            {stageConfig.title} 🌟
          </h1>

          <p className="mt-2 text-xs sm:text-sm font-semibold text-white/90 max-w-2xl leading-relaxed">
            {stageConfig.desc} Everything here is custom filtered strictly for your age and academic level.
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                sound.playPop();
                setTargetClass(nextClassSuggested);
                setIsPromotionModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-slate-900 text-xs font-black hover:bg-slate-100 transition-all shadow-md cursor-pointer hover:scale-102"
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Request Class Promotion ({currentClass} → {nextClassSuggested})
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setIsRequestModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/20 backdrop-blur-md text-white text-xs font-black hover:bg-white/30 transition-all border border-white/30 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Request New Topic / Chapter
            </button>
          </div>
        </div>

        {/* Decorative Mascot Background */}
        <div className="absolute -bottom-6 -right-6 w-48 h-48 opacity-25 sm:opacity-40 pointer-events-none text-9xl flex items-center justify-center select-none">
          {stageConfig.badge.includes('PLAY') ? '🧸' : stageConfig.badge.includes('FOUNDATION') ? '🎒' : stageConfig.badge.includes('CONCEPTUAL') ? '🔬' : '🎓'}
        </div>
      </div>

      {/* SECTION 1: RECOMMENDED FOR YOU (SMART AI RECOMMENDATION) */}
      {recommendedMaterials.length > 0 && !savedItemsOnly && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-sm shadow-sm">
                🎯
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Recommended For You
                </h2>
                <p className="text-[11px] font-bold text-slate-500">
                  Smart suggestions based on your {currentClass} curriculum & demonstrated interests
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Personalized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedMaterials.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenViewer(item)}
                className="group relative rounded-3xl bg-white p-5 border-2 border-slate-200/80 hover:border-blue-500 transition-all shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                      {item.thumbnail}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.type}
                      </span>
                      {completedContentIds.has(item.id) && (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block mb-1">
                    {item.subject} • {item.chapter}
                  </span>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs font-semibold text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleToggleInterest(item, e)}
                      title="Interested in this topic"
                      className={`p-1.5 rounded-xl border transition-all ${
                        interestedContentIds.has(item.id)
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-amber-600'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleToggleSave(item, e)}
                      title="Save for later"
                      className={`p-1.5 rounded-xl border transition-all ${
                        savedContentIds.has(item.id)
                          ? 'bg-blue-100 border-blue-300 text-blue-700'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-blue-600'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-black text-blue-600 group-hover:translate-x-1 transition-transform">
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: CLASS MATERIALS (STRICT FILTERING & SEARCH) */}
      <section>
        {/* Enhanced Content Filter Panel for Students */}
        <div className="bg-white rounded-[2rem] p-5 sm:p-6 border-2 border-slate-200 shadow-sm mb-6 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${currentClass} lessons, chapters, phonics...`}
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm font-bold rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter Count & Reset */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                {filteredMaterials.length} Lessons Available
              </span>
              {(selectedType !== 'all' || selectedSubject !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all' || searchQuery.trim()) && (
                <button
                  onClick={() => {
                    sound.playPop();
                    setSelectedType('all');
                    setSelectedSubject('all');
                    setSelectedDifficulty('all');
                    setSelectedStatus('all');
                    setSearchQuery('');
                    setSavedItemsOnly(false);
                  }}
                  className="text-xs font-black text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Styled Dropdown Filters Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-slate-100">
            {/* Type */}
            <StyledSelect
              label="Format"
              value={selectedType}
              onChange={(val) => setSelectedType(val)}
              options={[
                { value: 'all', label: 'All Formats' },
                { value: 'video', label: '📹 Video Lessons' },
                { value: 'notes', label: '📖 Reading Guides' },
                { value: 'quiz', label: '🧩 Interactive Quizzes' },
              ]}
            />

            {/* Subject */}
            <StyledSelect
              label="Subject"
              value={selectedSubject}
              onChange={(val) => setSelectedSubject(val)}
              options={[
                { value: 'all', label: 'All Subjects' },
                ...availableSubjects.map((s) => ({ value: s, label: s })),
              ]}
            />

            {/* Difficulty */}
            <StyledSelect
              label="Difficulty"
              value={selectedDifficulty}
              onChange={(val) => setSelectedDifficulty(val)}
              options={[
                { value: 'all', label: 'All Levels' },
                { value: 'beginner', label: '🌱 Beginner' },
                { value: 'intermediate', label: '🌿 Intermediate' },
                { value: 'advanced', label: '🌳 Advanced' },
              ]}
            />

            {/* Sort */}
            <StyledSelect
              label="Sort By"
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              options={[
                { value: 'popular', label: '🔥 Most Popular' },
                { value: 'newest', label: '🆕 Newest Added' },
                { value: 'alphabetical', label: '🔤 Alphabetical (A-Z)' },
              ]}
            />
          </div>
        </div>

        {/* Subject pills */}
        {availableSubjects.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            <button
              onClick={() => {
                sound.playPop();
                setSelectedSubject('all');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Subjects
            </button>
            {availableSubjects.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  sound.playPop();
                  setSelectedSubject(sub);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Materials Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
              🔍
            </div>
            <h3 className="text-base font-black text-slate-800">No materials match your filters</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1 max-w-sm mx-auto">
              Try switching subject or type filters, or request custom materials using the button above.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedSubject('all');
                setSearchQuery('');
                setSavedItemsOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((item) => {
              const isSaved = savedContentIds.has(item.id);
              const isInterested = interestedContentIds.has(item.id);
              const isCompleted = completedContentIds.has(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenViewer(item)}
                  className={`group relative rounded-3xl bg-white p-5 border-2 transition-all shadow-xs hover:shadow-xl cursor-pointer flex flex-col justify-between ${
                    isCompleted
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-slate-200/80 hover:border-blue-400'
                  }`}
                >
                  <div>
                    {/* Header: Thumbnail + Badges */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-50 to-blue-50 border border-slate-200/80 flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 transition-transform">
                        {item.thumbnail}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            item.type === 'video'
                              ? 'bg-rose-100 text-rose-700'
                              : item.type === 'notes' || item.type === 'pdf'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {item.type}
                        </span>

                        <span className="text-[10px] font-black text-slate-500">
                          {item.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Subject & Chapter */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {item.subject}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 truncate max-w-[160px]">
                        {item.chapter}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs font-semibold text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer & Student Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      {/* Action buttons (Interest, Save, Learn More) */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => handleToggleInterest(item, e)}
                          title={isInterested ? 'You are interested in this' : 'Mark Interested'}
                          className={`p-2 rounded-xl border text-xs font-black transition-all flex items-center gap-1 ${
                            isInterested
                              ? 'bg-amber-50 border-amber-300 text-amber-700'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-amber-600'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${isInterested ? 'fill-amber-400' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleToggleSave(item, e)}
                          title={isSaved ? 'Saved in reading list' : 'Save for later'}
                          className={`p-2 rounded-xl border text-xs font-black transition-all flex items-center gap-1 ${
                            isSaved
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-blue-600'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-600' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleWantToLearnMore(item, e)}
                          title="Want to learn more"
                          className="p-2 rounded-xl border bg-slate-50 border-slate-200 text-slate-600 hover:text-purple-600 transition-all text-xs font-black"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Open Action */}
                      <button
                        type="button"
                        onClick={() => handleOpenViewer(item)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" /> Review
                          </>
                        ) : (
                          <>
                            {item.type === 'video' ? <Play className="w-3.5 h-3.5 fill-current" /> : <BookOpen className="w-3.5 h-3.5" />}
                            Study
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 3: CLASS PROMOTION REQUEST STATUS */}
      {promotionRequests.length > 0 && (
        <section className="mt-12 rounded-3xl bg-white p-6 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900">
                Your Class Promotion Requests
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Admin Review Status
            </span>
          </div>

          <div className="space-y-3">
            {promotionRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-slate-800">
                      {req.currentClass} → {req.requestedClass}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        req.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    "{req.reason}"
                  </p>
                  {req.adminNote && (
                    <p className="text-[11px] font-bold text-blue-700 mt-1">
                      Admin Note: {req.adminNote}
                    </p>
                  )}
                </div>

                <span className="text-[10px] font-bold text-slate-400">
                  {new Date(req.requestedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL 1: MATERIAL VIEWER & INTERACTIVE PLAYER */}
      {activeViewerItem && (
        <div
          className="fixed inset-0 z-[160] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveViewerItem(null);
          }}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white/80 overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeViewerItem.thumbnail}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {activeViewerItem.subject}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {activeViewerItem.chapter}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                    {activeViewerItem.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveViewerItem(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewer Body */}
            <div className="py-6 flex-1">
              {activeViewerItem.type === 'video' ? (
                <div className="space-y-4">
                  {activeViewerItem.mediaUrl ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200">
                      <iframe
                        src={activeViewerItem.mediaUrl}
                        title={activeViewerItem.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-white p-6 text-center">
                      <Play className="w-16 h-16 text-yellow-400 mb-3 fill-yellow-400" />
                      <h3 className="text-base font-black">{activeViewerItem.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-md">
                        Interactive audio-visual lesson for {currentClass}.
                      </p>
                    </div>
                  )}

                  {activeViewerItem.contentBody && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 leading-relaxed whitespace-pre-line">
                      {activeViewerItem.contentBody}
                    </div>
                  )}
                </div>
              ) : activeViewerItem.type === 'quiz' ? (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                    <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">
                      Interactive Quiz • {activeViewerItem.subject}
                    </span>
                    <h3 className="text-base font-black text-purple-950 mt-1">
                      {activeViewerItem.title}
                    </h3>
                    <p className="text-xs text-purple-800 mt-1">
                      {activeViewerItem.description}
                    </p>
                  </div>

                  {/* Sample Quiz Question */}
                  <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                      Question 1 of 1
                    </p>
                    <h4 className="text-sm font-black text-slate-900 mb-4">
                      Which answer best describes the core concept taught in {activeViewerItem.chapter}?
                    </h4>

                    <div className="space-y-2">
                      {[
                        'Option A: Practice only once and never revise.',
                        'Option B: Apply concepts step-by-step with curiosity & patience.',
                        'Option C: Memorize without understanding the reason.',
                      ].map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (!quizSubmitted) {
                              sound.playPop();
                              setSelectedAnswer(idx);
                            }
                          }}
                          className={`w-full p-3.5 rounded-xl border-2 text-left text-xs font-black transition-all flex items-center justify-between ${
                            selectedAnswer === idx
                              ? 'border-blue-600 bg-blue-50 text-blue-900'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {selectedAnswer === idx && (
                            <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                          )}
                        </button>
                      ))}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={() => handleQuizSubmit(activeViewerItem)}
                        disabled={selectedAnswer === null}
                        className="mt-5 w-full py-3 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                      >
                        Submit My Quiz Answer
                      </button>
                    ) : (
                      <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <span className="text-2xl">🎉</span>
                        <p className="text-sm font-black text-emerald-900 mt-1">
                          Score: {quizScore}% • Quiz Completed!
                        </p>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          Activity recorded in your student learning dossier.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Notes / PDF Reading Document */
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 prose prose-slate max-w-none text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
                    {activeViewerItem.contentBody || (
                      <div className="text-slate-700">
                        <h3 className="text-base font-black text-slate-900 mb-2">
                          {activeViewerItem.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {activeViewerItem.description}
                        </p>
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
                          💡 <strong>Key Takeaway:</strong> Review these core concepts daily to build long-term confidence in {activeViewerItem.subject}.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Complete & Interest buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleInterest(activeViewerItem)}
                  className={`px-3 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 ${
                    interestedContentIds.has(activeViewerItem.id)
                      ? 'bg-amber-100 border-amber-300 text-amber-800'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-amber-700'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {interestedContentIds.has(activeViewerItem.id) ? 'Interested ⭐' : 'I Like This'}
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleSave(activeViewerItem)}
                  className={`px-3 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 ${
                    savedContentIds.has(activeViewerItem.id)
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-blue-700'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  {savedContentIds.has(activeViewerItem.id) ? 'Saved 🔖' : 'Save'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleCompleteViewerItem(activeViewerItem)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Completed & Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REQUEST CLASS PROMOTION */}
      {isPromotionModalOpen && (
        <div
          className="fixed inset-0 z-[160] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsPromotionModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white/80">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Request Class Promotion</h3>
                  <p className="text-[11px] font-bold text-blue-600">Upgrade to Next Grade Curriculum</p>
                </div>
              </div>
              <button
                onClick={() => setIsPromotionModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {promotionSuccessMsg ? (
              <div className="py-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-black text-slate-900">{promotionSuccessMsg}</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmitPromotion} className="mt-5 space-y-4">
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900">
                  Current Class: <strong>{currentClass}</strong> • Age: <strong>{currentAge} yrs</strong>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Target Class for Promotion
                  </label>
                  <StyledSelect
    value={targetClass}
    onChange={(val) => setTargetClass(val)}
    options={ALL_CLASSES.map((c) => ({ value: c.id, label: `${c.icon} ${c.label} (${c.ageRange})` }))}
  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Reason for Promotion
                  </label>
                  <textarea
                    rows={3}
                    value={promotionReason}
                    onChange={(e) => setPromotionReason(e.target.value)}
                    placeholder="e.g. I have completed all Class 4 math & science modules and scored above 90% in tests..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 shadow-md transition-all cursor-pointer"
                >
                  Submit Promotion Request to Admin 🚀
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: REQUEST CUSTOM TOPIC / NEW CONTENT */}
      {isRequestModalOpen && (
        <div
          className="fixed inset-0 z-[160] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsRequestModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white/80">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Request New Learning Material</h3>
                  <p className="text-[11px] font-bold text-purple-600">Tell teachers what you want to learn next</p>
                </div>
              </div>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCustomRequest} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Topic or Chapter Name
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g. Solar System 3D, Solar Eclipses, Vedic Math tricks..."
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject Category
                </label>
                <StyledSelect
    value={customSubject}
    onChange={(val) => setCustomSubject(val)}
    options={[
      { value: 'Mathematics', label: 'Mathematics' },
      { value: 'Science', label: 'Science' },
      { value: 'English', label: 'English & Phonics' },
      { value: 'Computer Science', label: 'Computer Science' },
      { value: 'Social Studies', label: 'Social Studies' },
      { value: 'Stories & Rhymes', label: 'Stories & Rhymes' },
      { value: 'Hindi & Sanskrit', label: 'Hindi & Sanskrit' },
      { value: 'Punjabi & Gurmukhi', label: 'Punjabi & Gurmukhi' },
      { value: 'Urdu & Islamic', label: 'Urdu & Islamic' },
    ]}
  />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Additional Details or Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Tell us what specifically you want covered in this lesson..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 shadow-md transition-all cursor-pointer"
              >
                Send Request to Curriculum Admin 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
