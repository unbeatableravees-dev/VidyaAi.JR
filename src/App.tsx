import React, { useState } from 'react';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeScreen } from './components/screens/HomeScreen';
import { VideoLessonScreen } from './components/screens/VideoLessonScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { QuizResultsScreen } from './components/screens/QuizResultsScreen';
import { CategoriesScreen } from './components/screens/CategoriesScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { sound } from './utils/audio';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSelectCategory = (_categoryId: string) => {
    setCurrentTab('learning');
  };

  return (
    <div className="flex min-h-screen bg-[#f0f4f9] text-slate-800 font-['Nunito',sans-serif]">
      {/* Deep Blue Left Sidebar */}
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onProfileClick={() => setCurrentTab('progress')}
        />

        {/* Dynamic Screen Rendering */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeScreen
              onStartLearning={handleStartLearning}
              onSelectCategory={handleSelectCategory}
              onViewAllCategories={handleViewAllCategories}
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

      {/* Floating Screen Switcher Pill for instant 1-click preview of all screenshot views */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md border border-white/20 shadow-2xl px-3 py-2 rounded-full flex items-center gap-1.5 transition-all text-xs font-black text-white select-none">
        <span className="text-slate-400 px-2 border-r border-slate-700 text-[11px] hidden sm:inline">
          Screens:
        </span>

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
          1. Home (All 13 Categories)
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
          2. Video Lesson
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
          3. Quiz Time
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
          4. Quiz Complete
        </button>
      </div>
    </div>
  );
}

export default App;
