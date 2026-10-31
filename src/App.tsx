import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeScreen } from './components/screens/HomeScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { sound } from './utils/audio';
import { StudentProfile } from './types/student';
import { clearStudentProgress, recordQuizCompletion } from './utils/studentProgress';
import type { VideoData } from './components/modals/VideoPlayerModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { LmsStorageService } from './services/lmsStorage';

// Code-split heavy views so the initial bundle stays lightweight & blazing fast
const IslamicTeachingsView = React.lazy(() =>
  import('./components/screens/IslamicTeachingsView').then((m) => ({ default: m.IslamicTeachingsView }))
);
const HindiLearningView = React.lazy(() =>
  import('./components/screens/HindiLearningView').then((m) => ({ default: m.HindiLearningView }))
);
const PunjabiLearningView = React.lazy(() =>
  import('./components/screens/PunjabiLearningView').then((m) => ({ default: m.PunjabiLearningView }))
);
const ExplorerScreen = React.lazy(() =>
  import('./components/screens/ExplorerScreen').then((m) => ({ default: m.ExplorerScreen }))
);
const PracticeScreen = React.lazy(() =>
  import('./components/screens/PracticeScreen').then((m) => ({ default: m.PracticeScreen }))
);
const SmartCurriculumView = React.lazy(() =>
  import('./components/screens/SmartCurriculumView').then((m) => ({ default: m.SmartCurriculumView }))
);
const ContactView = React.lazy(() =>
  import('./components/screens/ContactView').then((m) => ({ default: m.ContactView }))
);
const AdminPortal = React.lazy(() =>
  import('./components/admin/AdminPortal').then((m) => ({ default: m.AdminPortal }))
);
const VideoLessonScreen = React.lazy(() =>
  import('./components/screens/VideoLessonScreen').then((m) => ({ default: m.VideoLessonScreen }))
);
const QuizScreen = React.lazy(() =>
  import('./components/screens/QuizScreen').then((m) => ({ default: m.QuizScreen }))
);
const QuizResultsScreen = React.lazy(() =>
  import('./components/screens/QuizResultsScreen').then((m) => ({ default: m.QuizResultsScreen }))
);
const CategoriesScreen = React.lazy(() =>
  import('./components/screens/CategoriesScreen').then((m) => ({ default: m.CategoriesScreen }))
);
const CategoryDetailScreen = React.lazy(() =>
  import('./components/screens/CategoryDetailScreen').then((m) => ({ default: m.CategoryDetailScreen }))
);
const ProgressScreen = React.lazy(() =>
  import('./components/screens/ProgressScreen').then((m) => ({ default: m.ProgressScreen }))
);
const SettingsScreen = React.lazy(() =>
  import('./components/screens/SettingsScreen').then((m) => ({ default: m.SettingsScreen }))
);
const VideoPlayerModal = React.lazy(() =>
  import('./components/modals/VideoPlayerModal').then((m) => ({ default: m.VideoPlayerModal }))
);

const ScreenLoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-8 select-none">
    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-400 to-sky-400 flex items-center justify-center text-3xl shadow-xl animate-bounce">
      ⭐
    </div>
    <div className="text-center">
      <h3 className="text-base font-black text-slate-800">VidyaAI Jr Loading...</h3>
      <p className="text-xs font-bold text-blue-600 animate-pulse mt-1">Opening your magical learning galaxy</p>
    </div>
  </div>
);

const loadSavedProfiles = (): StudentProfile[] => {
  try {
    const savedProfiles = localStorage.getItem('vidya_student_profiles_v1');
    if (savedProfiles) {
      const profiles: unknown = JSON.parse(savedProfiles);
      if (Array.isArray(profiles)) {
        const validProfiles = profiles.filter(
          (profile): profile is StudentProfile =>
            typeof profile === 'object' &&
            profile !== null &&
            'id' in profile &&
            typeof profile.id === 'string' &&
            'name' in profile &&
            typeof profile.name === 'string',
        );
        const activeProfile = localStorage.getItem('vidya_student_profile_v2');
        if (activeProfile) {
          const parsedActiveProfile: unknown = JSON.parse(activeProfile);
          if (
            typeof parsedActiveProfile === 'object' &&
            parsedActiveProfile !== null &&
            'id' in parsedActiveProfile &&
            typeof parsedActiveProfile.id === 'string' &&
            !validProfiles.some((profile) => profile.id === parsedActiveProfile.id)
          ) {
            validProfiles.push(parsedActiveProfile as StudentProfile);
          }
        }
        return validProfiles;
      }
    }

    const activeProfile = localStorage.getItem('vidya_student_profile_v2');
    return activeProfile ? [JSON.parse(activeProfile) as StudentProfile] : [];
  } catch (error) {
    console.error('Unable to load saved student profiles.', error);
    return [];
  }
};

export function App() {
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>(loadSavedProfiles);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('vidya_student_profile_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    return !localStorage.getItem('vidya_student_profile_v2');
  });
  const [showProfilePicker, setShowProfilePicker] = useState(
    () => !localStorage.getItem('vidya_student_profile_v2') && studentProfiles.length > 0,
  );

  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('numbers');
  const [searchQuery, setSearchQuery] = useState('');
  const [quizResult, setQuizResult] = useState<{
    correct: number;
    total: number;
    subjectName?: string;
    grade?: string;
  }>({ correct: 0, total: 10, subjectName: 'All Subjects Mix', grade: 'Class 2' });

  const [activeVideoModal, setActiveVideoModal] = useState<VideoData | null>(null);

  // Super Admin Portal State (Only accessible from Welcome Screen or secret shortcut)
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const activeDisplayName = studentProfile?.name || 'Aarav';
  const activeAvatar = studentProfile?.avatar || 'boy-aarav';
  const activeGrade = studentProfile?.gradeClass || 'Class 2';

  // Listen for admin changes (promotions, updates, deletions)
  useEffect(() => {
    const handleProfileSync = () => {
      try {
        const saved = localStorage.getItem('vidya_student_profile_v2');
        if (saved) {
          setStudentProfile(JSON.parse(saved));
        } else {
          setStudentProfile(null);
          setShowWelcome(true);
        }
        setStudentProfiles(loadSavedProfiles());
      } catch {
        // Fallback
      }
    };

    window.addEventListener('vidya_student_class_promoted', handleProfileSync);
    window.addEventListener('vidya_student_profile_updated', handleProfileSync);
    window.addEventListener('vidya_student_profile_deleted', handleProfileSync);

    // Optional keyboard shortcut for admins: Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('vidya_student_class_promoted', handleProfileSync);
      window.removeEventListener('vidya_student_profile_updated', handleProfileSync);
      window.removeEventListener('vidya_student_profile_deleted', handleProfileSync);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenAdmin = () => {
    if (LmsStorageService.getActiveAdminSession()) {
      setIsAdminOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleProfileSubmit = (profile: StudentProfile) => {
    const updatedProfiles = [
      ...studentProfiles.filter((savedProfile) => savedProfile.id !== profile.id),
      profile,
    ];
    localStorage.setItem('vidya_student_profiles_v1', JSON.stringify(updatedProfiles));
    setStudentProfiles(updatedProfiles);
    setStudentProfile(profile);
    localStorage.setItem('vidya_student_profile_v2', JSON.stringify(profile));
    localStorage.setItem('vidya_user_name', profile.name);
    localStorage.setItem('vidya_user_avatar', profile.avatar);
    localStorage.setItem('vidya_user_grade', profile.gradeClass);
    setShowWelcome(false);
    setShowProfilePicker(false);
    setCurrentTab('home');
  };

  const handleChooseProfile = (profile: StudentProfile) => {
    setStudentProfile(profile);
    localStorage.setItem('vidya_student_profile_v2', JSON.stringify(profile));
    localStorage.setItem('vidya_user_name', profile.name);
    localStorage.setItem('vidya_user_avatar', profile.avatar);
    localStorage.setItem('vidya_user_grade', profile.gradeClass);
    setShowWelcome(false);
    setShowProfilePicker(false);
    setCurrentTab('home');
  };

  const handleUpdateProfile = (name: string, avatar: string, grade: string) => {
    if (studentProfile) {
      const updated: StudentProfile = {
        ...studentProfile,
        name,
        avatar,
        gradeClass: grade,
      };
      const updatedProfiles = studentProfiles.map((profile) =>
        profile.id === updated.id ? updated : profile
      );
      localStorage.setItem('vidya_student_profiles_v1', JSON.stringify(updatedProfiles));
      setStudentProfiles(updatedProfiles);
      setStudentProfile(updated);
      localStorage.setItem('vidya_student_profile_v2', JSON.stringify(updated));
    }
    localStorage.setItem('vidya_user_name', name);
    localStorage.setItem('vidya_user_avatar', avatar);
    localStorage.setItem('vidya_user_grade', grade);
  };

  const handleSwitchProfile = () => {
    sound.playPop();
    setShowProfilePicker(true);
    setShowWelcome(true);
  };

  const handleResetActiveProfile = () => {
    clearStudentProgress(studentProfile?.id);
    const remainingProfiles = studentProfiles.filter(
      (profile) => profile.id !== studentProfile?.id,
    );
    localStorage.setItem('vidya_student_profiles_v1', JSON.stringify(remainingProfiles));
    localStorage.removeItem('vidya_student_profile_v2');
    localStorage.removeItem('vidya_user_name');
    localStorage.removeItem('vidya_user_avatar');
    localStorage.removeItem('vidya_user_grade');
    setStudentProfiles(remainingProfiles);
    setStudentProfile(null);
    setShowWelcome(true);
    setShowProfilePicker(remainingProfiles.length > 0);
  };

  const handleStartLearning = () => {
    setCurrentTab('learning');
  };

  const handleContinueToQuiz = () => {
    setCurrentTab('quiz');
  };

  const handleCompleteQuiz = (result: { correct: number; total: number; subjectName?: string; grade?: string }) => {
    recordQuizCompletion(studentProfile?.id, result.correct, result.total);
    setQuizResult({
      correct: result.correct,
      total: result.total,
      subjectName: result.subjectName || 'All Subjects Mix',
      grade: result.grade || activeGrade,
    });
    setCurrentTab('quiz-results');
  };

  const handleBackToLearning = () => {
    setCurrentTab('learning');
  };

  const handleBackToHome = () => {
    setCurrentTab('home');
  };

  const handleViewAllCategories = () => {
    setCurrentTab('categories');
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentTab('category-detail');
  };

  // Full-screen Super Admin Portal
  if (isAdminOpen) {
    return (
      <Suspense fallback={<ScreenLoadingFallback />}>
        <AdminPortal onExit={() => setIsAdminOpen(false)} />
      </Suspense>
    );
  }

  // Welcome / Student Registration Screen (Contains the only Admin Login trigger)
  if (showWelcome) {
    return (
      <>
        <WelcomeScreen
          onProfileSubmit={handleProfileSubmit}
          initialProfile={showProfilePicker ? null : studentProfile}
          savedProfiles={studentProfiles}
          showProfilePicker={showProfilePicker}
          onChooseProfile={handleChooseProfile}
          onOpenAdmin={handleOpenAdmin}
        />
        <AdminLoginModal
          isOpen={isAdminLoginModalOpen}
          onClose={() => setIsAdminLoginModalOpen(false)}
          onLoginSuccess={() => {
            setIsAdminLoginModalOpen(false);
            setIsAdminOpen(true);
          }}
        />
      </>
    );
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden text-slate-800 font-['Nunito',sans-serif] selection:bg-blue-200">
      {/* Optimized Lightweight Aurora & Twinkle Backdrop */}
      <AnimatedBackground />

      {/* Royal Blue Left Sidebar with Jr Identity (Admin Portal removed from student view) */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onSwitchProfile={handleSwitchProfile}
        studentProfile={studentProfile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative z-10 w-full">
        {/* Fixed Non-Scrolling Top Header (Admin Portal removed from student view, profile dropdown fixed on top) */}
        <Header
          userName={activeDisplayName}
          userAvatar={activeAvatar}
          userGrade={activeGrade}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onProfileClick={() => setCurrentTab('progress')}
          onSettingsClick={() => setCurrentTab('settings')}
          onSwitchProfile={handleSwitchProfile}
          studentProfile={studentProfile}
        />

        {/* Dynamic Screen Area with Suspense for Instant Performance */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Suspense fallback={<ScreenLoadingFallback />}>
            {currentTab === 'home' && (
              <HomeScreen
                userName={activeDisplayName}
                onStartLearning={handleStartLearning}
                onOpenCurriculum={() => setCurrentTab('curriculum')}
                onSelectCategory={handleSelectCategory}
                onViewAllCategories={handleViewAllCategories}
                onOpenPractice={() => setCurrentTab('practice')}
                onOpenBodyExplorer={() => setCurrentTab('explorer')}
                onOpenIslamic={() => setCurrentTab('islamic')}
                onOpenPunjabi={() => setCurrentTab('punjabi')}
                onOpenHindi={() => setCurrentTab('hindi')}
                studentProfile={studentProfile}
              />
            )}

            {/* Smart Age & Class-Based Curriculum Management Screen with Advanced Student Filters */}
            {currentTab === 'curriculum' && (
              <SmartCurriculumView
                studentProfile={studentProfile}
                onBackToHome={handleBackToHome}
                onOpenPractice={() => setCurrentTab('practice')}
                onOpenExplorer={() => setCurrentTab('explorer')}
              />
            )}

            {/* Contact & Support Request Screen (Issue, Area, Violation, Class Promotion, Misleading info) */}
            {currentTab === 'contact' && (
              <ContactView
                studentProfile={studentProfile}
                onBackToHome={handleBackToHome}
              />
            )}

            {/* Islamic Teachings - ONLY visible to Muslim students */}
            {(currentTab === 'islamic' || currentTab === 'islamic-teachings') && (
              studentProfile?.religion === 'muslim' || !studentProfile ? (
                <IslamicTeachingsView
                  studentId={studentProfile?.id}
                  onBackToHome={handleBackToHome}
                />
              ) : (
                <HomeScreen
                  userName={activeDisplayName}
                  onStartLearning={handleStartLearning}
                  onOpenCurriculum={() => setCurrentTab('curriculum')}
                  onSelectCategory={handleSelectCategory}
                  onViewAllCategories={handleViewAllCategories}
                  onOpenPractice={() => setCurrentTab('practice')}
                  onOpenBodyExplorer={() => setCurrentTab('explorer')}
                  studentProfile={studentProfile}
                />
              )
            )}

            {/* Punjabi & Gurmukhi Academy - for Sikh students */}
            {currentTab === 'punjabi' && (
              <PunjabiLearningView
                studentId={studentProfile?.id}
                onBackToHome={handleBackToHome}
              />
            )}

            {/* Hindi & Cultural Wisdom Academy - for Hindu students */}
            {currentTab === 'hindi' && (
              <HindiLearningView
                studentId={studentProfile?.id}
                onBackToHome={handleBackToHome}
              />
            )}

            {(currentTab === 'explorer' || currentTab === 'body-explorer') && (
              <ExplorerScreen
                onBackToHome={handleBackToHome}
                onOpenPractice={() => setCurrentTab('practice')}
                initialModule={currentTab === 'body-explorer' ? 'body' : undefined}
                studentId={studentProfile?.id}
              />
            )}

            {currentTab === 'practice' && (
              <PracticeScreen
                studentId={studentProfile?.id}
                userGrade={activeGrade}
                userAge={studentProfile?.age || 7}
                religion={studentProfile?.religion || 'other'}
                onOpenBodyExplorer={() => setCurrentTab('explorer')}
              />
            )}

            {currentTab === 'category-detail' && (
              <CategoryDetailScreen
                categoryId={selectedCategoryId}
                onBack={() => setCurrentTab('categories')}
                onStartLesson={(_lessonId) => setCurrentTab('learning')}
              />
            )}

            {currentTab === 'learning' && (
              <VideoLessonScreen
                onBack={handleBackToHome}
                onContinueToQuiz={handleContinueToQuiz}
              />
            )}

            {currentTab === 'quiz' && (
              <QuizScreen
                userGrade={activeGrade}
                selectedCategoryId={selectedCategoryId}
                onBackToLesson={handleBackToLearning}
                onCompleteQuiz={handleCompleteQuiz}
              />
            )}

            {currentTab === 'quiz-results' && (
              <QuizResultsScreen
                userName={activeDisplayName}
                userGrade={activeGrade}
                quizResult={quizResult}
                onContinueLearning={handleStartLearning}
                onRetakeQuiz={() => setCurrentTab('quiz')}
                onSelectLesson={(_lessonId) => setCurrentTab('learning')}
              />
            )}

            {currentTab === 'categories' && (
              <CategoriesScreen
                onSelectCategory={handleSelectCategory}
                onStartLearning={handleStartLearning}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressScreen
                studentId={studentProfile?.id}
                userName={activeDisplayName}
                userGrade={activeGrade}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsScreen
                userName={activeDisplayName}
                userAvatar={activeAvatar}
                userGrade={activeGrade}
                onUpdateProfile={handleUpdateProfile}
                onResetProgress={() => {
                  handleResetActiveProfile();
                }}
              />
            )}
          </Suspense>
        </main>
      </div>

      {/* Interactive Video Player Modal with Suspense */}
      {activeVideoModal && (
        <Suspense fallback={null}>
          <VideoPlayerModal
            video={activeVideoModal}
            onClose={() => setActiveVideoModal(null)}
            onTakeQuiz={() => {
              setActiveVideoModal(null);
              setCurrentTab('quiz');
            }}
          />
        </Suspense>
      )}

      {/* Super Admin Login Modal (Triggered from Welcome Screen or Admin shortcut) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginModalOpen(false);
          setIsAdminOpen(true);
        }}
      />
    </div>
  );
}

export default App;
