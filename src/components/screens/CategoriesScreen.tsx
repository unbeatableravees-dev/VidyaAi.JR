import React, { useState } from 'react';
import { Search, ChevronRight, BookOpen, Sparkles, Filter } from 'lucide-react';
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
      return ['alphabets', 'english', 'hindi', 'story-time', 'children-stories', 'rhymes'].includes(cat.id);
    }
    if (selectedFilter === 'creativity') {
      return ['art-craft', 'manners', 'history'].includes(cat.id);
    }
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>All 13 Learning Categories</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            Explore All Subjects & Topics
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm font-semibold">
            Every subject tailored for young minds — complete with interactive games, animated videos, and quizzes.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Subjects (13)' },
            { id: 'stem', label: 'Math & Science' },
            { id: 'language', label: 'Languages & Stories' },
            { id: 'creativity', label: 'Arts & Manners' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => {
                sound.playPop();
                setSelectedFilter(pill.id as 'all' | 'stem' | 'language' | 'creativity');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedFilter === pill.id
                  ? 'bg-white text-blue-800 shadow-md scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
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

        <span className="text-xs font-extrabold text-slate-500">
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
            className="rounded-3xl p-5 border border-white/80 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 cursor-pointer group flex flex-col justify-between h-48 select-none relative overflow-hidden"
          >
            {/* Top Icon & Badge */}
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-115 transition-transform duration-200">
                <CategoryIcon type={cat.iconType} size={64} />
              </div>
              <span
                style={{ backgroundColor: cat.arrowBg }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-110 shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            {/* Bottom Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3
                  style={{ color: cat.textColor }}
                  className="font-black text-base tracking-tight"
                >
                  {cat.name}
                </h3>
                {cat.hindiName && (
                  <span className="text-xs font-extrabold text-slate-500">{cat.hindiName}</span>
                )}
              </div>
              <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> {cat.count || '20+ activities'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
