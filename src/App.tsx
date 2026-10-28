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
import { VideoPlayerModal, VideoData } from './components/modals/VideoPlayerModal';
import { sound } from './utils/audio';

export function App() {
  // Stored name or null on first launch
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('vidya_user_name') || '';
  });
  const [userAvatar, setUserAvatar] = useState<string>(() => {
    return localStorage.getItem('vidya_user_avatar') || 'boy-aarav';
  });
  const [userGrade, setUserGrade] = useState<string>(() => {
    return localStorage.getItem('vidya_user_grade') || 'Grade 1';
  });

  // If no name is set yet, show WelcomeScreen
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    return !localStorage.getItem('vidya_user_name');
  });

  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('numbers');
  const [searchQuery, setSearchQuery] = useState('');

  // Active modal video (if any clicked)
  const [activeVideoModal, setActiveVideoModal] = useState<VideoData | null>(null);

  const handleNameSubmit = (name: string, avatar: string, grade: string) => {
    setUserName(name);
    setUserAvatar(avatar);
    setUserGrade(grade);
    localStorage.setItem('vidya_user_name', name);
    localStorage.setItem('vidya_user_avatar', avatar);
    localStorage.setItem('vidya_user_grade', grade);
    setShowWelcome(false);
    setCurrentTab('home');
  };

  const handleUpdateProfile = (name: string, avatar: string, grade: string) => {
    setUserName(name);
    setUserAvatar(avatar);
    setUserGrade(grade);
    localStorage.setItem('vidya_user_name', name);
    localStorage.setItem('vidya_user_avatar', avatar);
    localStorage.setItem('vidya_user_grade', grade);
  };

  const handleSwitchProfile = () => {
    sound.playPop();
    setShowWelcome(true);
  };

  const handleStartLearning = () => {
    setCurrentTab('learning');
  };

  const handleContinueToQuiz = () => {
    setCurrentTab('quiz');
  };

  const handleCompleteQuiz = () => {
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

  // If user has not entered a name yet (or clicked Switch Profile), show Welcome/Name Entry page!
  if (showWelcome) {
    return (
      <WelcomeScreen
        onNameSubmit={handleNameSubmit}
        initialName={userName || ''}
      />
    );
  }

  const activeDisplayName = userName || 'Aarav';

  return (
    <div className="flex min-h-screen bg-[#f0f4f9] text-slate-800 font-['Nunito',sans-serif] selection:bg-blue-200">
      {/* Deep Blue Left Sidebar with JR Logo */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onSwitchProfile={handleSwitchProfile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header with Dynamic Name and Profile menu */}
        <Header
          userName={activeDisplayName}
          userAvatar={userAvatar}
          userGrade={userGrade}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onProfileClick={() => setCurrentTab('progress')}
          onSettingsClick={() => setCurrentTab('settings')}
          onSwitchProfile={handleSwitchProfile}
        />

        {/* Dynamic Screen Rendering */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeScreen
              userName={activeDisplayName}
              onStartLearning={handleStartLearning}
              onSelectCategory={handleSelectCategory}
              onViewAllCategories={handleViewAllCategories}
              onOpenPractice={() => setCurrentTab('practice')}
            />
          )}

          {currentTab === 'practice' && <PracticeScreen />}

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
              onBackToLesson={handleBackToLearning}
              onCompleteQuiz={handleCompleteQuiz}
            />
          )}

          {currentTab === 'quiz-results' && (
            <QuizResultsScreen
              userName={activeDisplayName}
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

          {currentTab === 'progress' && <ProgressScreen />}

          {currentTab === 'settings' && (
            <SettingsScreen
              userName={activeDisplayName}
              userAvatar={userAvatar}
              userGrade={userGrade}
              onUpdateProfile={handleUpdateProfile}
              onResetProgress={() => {
                localStorage.removeItem('vidya_user_name');
                setUserName('');
                setShowWelcome(true);
              }}
            />
          )}
        </main>
      </div>

      {/* Interactive Video Player Modal for fake screens */}
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
