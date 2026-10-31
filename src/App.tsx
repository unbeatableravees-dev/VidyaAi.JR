import React, { useState } from 'react';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeScreen } from './components/screens/HomeScreen';
import { VideoLessonScreen } from './components/screens/VideoLessonScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { QuizResultsScreen } from './components/screens/QuizResultsScreen';
import { CategoriesScreen } from './components/screens/CategoriesScreen';
import { CategoryDetailScreen } from './components/screens/CategoryDetailScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { PracticeScreen } from './components/screens/PracticeScreen';
import { HumanBodyGameScreen } from './components/screens/HumanBodyGameScreen';
import { ExplorerScreen } from './components/screens/ExplorerScreen';
import { IslamicTeachingsView } from './components/screens/IslamicTeachingsView';
import { PunjabiLearningView } from './components/screens/PunjabiLearningView';
import { HindiLearningView } from './components/screens/HindiLearningView';
import { VideoPlayerModal, VideoData } from './components/modals/VideoPlayerModal';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { sound } from './utils/audio';
import { StudentProfile } from './types/student';
import { clearStudentProgress, recordQuizCompletion } from './utils/studentProgress';

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
  // Stored Student Profile (Multi-Faith, Multilingual, Age, Class, Game)
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('vidya_student_profile_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Reset all users: if vidya_student_profile_v2 does not exist, ALWAYS show WelcomeScreen
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

  // Active modal video (if any clicked)
  const [activeVideoModal, setActiveVideoModal] = useState<VideoData | null>(null);

  const activeDisplayName = studentProfile?.name || 'Aarav';
  const activeAvatar = studentProfile?.avatar || 'boy-aarav';
  const activeGrade = studentProfile?.gradeClass || 'Class 2';

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

  // Launch simulated video modal
  const handleOpenVideo = (video: VideoData) => {
    sound.playPop();
    setActiveVideoModal(video);
  };

  // If user has not completed the new profile onboarding yet, show Welcome/Setup page!
  if (showWelcome) {
    return (
      <WelcomeScreen
        onProfileSubmit={handleProfileSubmit}
        initialProfile={showProfilePicker ? null : studentProfile}
        savedProfiles={studentProfiles}
        showProfilePicker={showProfilePicker}
        onChooseProfile={handleChooseProfile}
      />
    );
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden text-slate-800 font-['Nunito',sans-serif] selection:bg-blue-200">
      {/* Magical Disney/Pixar Animated Sky Theme with drifting particles */}
      <AnimatedBackground />

      {/* Deep Blue Left Sidebar with JR Logo & Multilingual Tabs */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onSwitchProfile={handleSwitchProfile}
        studentProfile={studentProfile}
      />

      {/* Main Content Area - Locked to 100vh with non-scrolling Navbar */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative z-10 w-full">
        {/* Fixed Non-Scrolling Top Header */}
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

        {/* Dynamic Screen Rendering - Only this section scrolls! */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {currentTab === 'home' && (
            <HomeScreen
              userName={activeDisplayName}
              onStartLearning={handleStartLearning}
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
        </main>
      </div>

      {/* Interactive Video Player Modal */}
      {activeVideoModal && (
        <VideoPlayerModal
          video={activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
          onTakeQuiz={() => {
            setActiveVideoModal(null);
            setCurrentTab('quiz');
          }}
        />
      )}
    </div>
  );
}

export default App;
