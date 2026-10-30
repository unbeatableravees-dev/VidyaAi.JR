import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, Sparkles, Volume2 } from 'lucide-react';
import { ALL_CATEGORIES } from '../../data/learningData';
import { CategoryIcon } from '../illustrations/Illustrations';
import { sound } from '../../utils/audio';

interface CategoriesScreenProps {
  onSelectCategory: (categoryId: string) => void;
  onStartLearning: () => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onSelectCategory,
  onStartLearning,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'stem' | 'language' | 'creativity'>('all');

  const filteredCategories = ALL_CATEGORIES.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedFilter === 'stem') {
      return ['numbers', 'mathematics', 'science', 'knowledge'].includes(cat.id);
    }
    if (selectedFilter === 'language') {
      return ['alphabets', 'english', 'urdu', 'hindi', 'story-time', 'children-stories', 'rhymes'].includes(cat.id);
    }
    if (selectedFilter === 'creativity') {
      return ['art-craft', 'manners', 'history'].includes(cat.id);
    }
    return true;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl border border-white/30 flex flex-col md:flex-row items-center justify-between gap-6 shimmer-effect">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>Complete Syllabus • 14 Subjects</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
            Explore All 14 Categories
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm font-semibold">
            Click on any subject to explore its full lessons, video episodes, interactive quizzes, and practice games!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Subjects (13)' },
            { id: 'stem', label: 'Math & Science' },
            { id: 'language', label: 'Languages' },
            { id: 'creativity', label: 'Arts & Tales' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => {
                sound.playPop();
                setSelectedFilter(pill.id as 'all' | 'stem' | 'language' | 'creativity');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedFilter === pill.id
                  ? 'bg-white text-blue-900 shadow-md scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within categories (e.g., Hindi, Math, Science)..."
            className="w-full pl-11 pr-4 py-2.5 text-xs font-bold bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <span className="text-xs font-black text-slate-500">
          Showing {filteredCategories.length} of {ALL_CATEGORIES.length} Categories
        </span>
      </div>

      {/* Grid of ALL 13 Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              sound.playPop();
              onSelectCategory(cat.id);
            }}
            style={{ backgroundColor: cat.bgColor }}
            className="rounded-[2rem] p-5 border-2 border-white/90 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-52 select-none relative overflow-hidden glossy-bubble"
          >
            {/* Top Sheen */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[2rem]" />

            {/* Top Icon & Arrow */}
            <div className="flex items-start justify-between z-10">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-120 transition-transform duration-300">
                <CategoryIcon type={cat.iconType} size={68} />
              </div>
              <span
                style={{ backgroundColor: cat.arrowBg }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-115 group-hover:rotate-45 shadow-md transition-all"
              >
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </span>
            </div>

            {/* Bottom Info */}
            <div className="space-y-1.5 z-10">
              <div className="flex items-center justify-between">
                <h3
                  style={{ color: cat.textColor }}
                  className="font-black text-lg tracking-tight truncate"
                >
                  {cat.name}
                </h3>
                {cat.hindiName && (
                  <span className="text-xs font-extrabold text-slate-600 bg-white/60 px-2 py-0.5 rounded-md">
                    {cat.hindiName}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {cat.count || '20+ activities'}
                </p>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-white/80 px-2 py-0.5 rounded-full shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
