import React, { useState, useEffect } from 'react';
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

          {currentTab === 'settings' && <SettingsScreen />}
        </main>
      </div>

      {/* Floating Screen Switcher Pill for instant 1-click preview of all requested views */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md border border-white/25 shadow-2xl px-2.5 py-1.5 rounded-full flex flex-wrap items-center justify-center gap-1 transition-all text-xs font-black text-white select-none">
        <button
          onClick={() => {
            sound.playPop();
            setShowWelcome(true);
          }}
          className="px-2.5 py-1 rounded-full text-amber-300 hover:text-amber-200 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1"
          title="Enter Name / Onboarding Screen"
        >
          <span>👤 Name Page</span>
        </button>

        <span className="text-slate-600">|</span>

        <button
          onClick={() => {
            sound.playPop();
            setCurrentTab('home');
          }}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Image 1: Home Screen"
        >
          1. Home
        </button>

        <button
          onClick={() => {
            sound.playPop();
            handleSelectCategory('numbers');
          }}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            currentTab === 'category-detail'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Category Detail Page"
        >
          2. Category Page
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setCurrentTab('learning');
          }}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            currentTab === 'learning'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Image 3: Video Lesson"
        >
          3. Video Lesson
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setCurrentTab('quiz');
          }}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            currentTab === 'quiz'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Image 4: Quiz Time"
        >
          4. Quiz Time
        </button>

        <button
          onClick={() => {
            sound.playPop();
            setCurrentTab('quiz-results');
          }}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            currentTab === 'quiz-results'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Image 2: Quiz Complete"
        >
          5. Quiz Complete
        </button>
      </div>
    </div>
  );
}

export default App;
