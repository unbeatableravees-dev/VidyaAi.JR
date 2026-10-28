import React, { useState } from 'react';
import { Gamepad2, Sparkles, Trophy, Star, Play, Filter, CheckCircle2 } from 'lucide-react';
import { PRACTICE_ACTIVITIES } from '../../data/learningData';
import { PracticeIcon } from '../illustrations/Illustrations';
import { InteractiveGameModal } from '../modals/InteractiveGameModal';
import { sound } from '../../utils/audio';

const EXTENDED_GAMES = [
  ...PRACTICE_ACTIVITIES,
  {
    id: 'p-balloon-pop',
    title: 'Balloon Pop Math',
    iconType: 'p-pop',
    bgColor: '#f43f5e',
    badgeColor: '#be123c',
    category: 'Math',
    desc: 'Pop glowing number balloons before they float away!',
  },
  {
    id: 'p-animal-count',
    title: 'Feed The Bunny',
    iconType: 'p-numbers',
    bgColor: '#f59e0b',
    badgeColor: '#b45309',
    category: 'Math',
    desc: 'Count and feed the exact number of crunchy carrots.',
  },
  {
    id: 'p-color-canvas',
    title: 'Color The Shapes',
    iconType: 'p-colour',
    bgColor: '#8b5cf6',
    badgeColor: '#6d28d9',
    category: 'Creativity',
    desc: 'Pick bright paints and color stars, circles, and hearts!',
  },
  {
    id: 'p-pattern-logic',
    title: 'Fruit Pattern Logic',
    iconType: 'p-pattern',
    bgColor: '#10b981',
    badgeColor: '#047857',
    category: 'Logic',
    desc: 'Discover what fruit comes next in the puzzle sequence.',
  },
];

export const PracticeScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'math' | 'words' | 'creativity'>('all');
  const [activeGame, setActiveGame] = useState<{ id: string; title: string } | null>(null);
  const [starsWon, setStarsWon] = useState(45);

  const handleLaunchGame = (id: string, title: string) => {
    sound.playPop();
    setActiveGame({ id, title });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      {/* Practice Header Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-8 md:p-10 shadow-xl border border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 shimmer-effect">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black shadow-sm">
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <span>Interactive Game Arcade</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
            Let's Practice & Play! 🎮
          </h1>

          <p className="text-white/90 text-sm md:text-base font-semibold leading-relaxed">
            Hands-on interactive games to sharpen math, phonics, patterns, and colors while earning shiny gold stars!
          </p>

          <div className="pt-1 flex items-center justify-center md:justify-start gap-4">
            <span className="px-3.5 py-1.5 bg-amber-400 text-slate-950 rounded-full text-xs font-black shadow-md flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-slate-950" /> {starsWon} Stars Collected
            </span>
            <span className="px-3.5 py-1.5 bg-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
              🏆 6 Badges Available
            </span>
          </div>
        </div>

        {/* 3D Animated Trophy */}
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-white/15 backdrop-blur-md p-4 flex items-center justify-center border-2 border-white/50 shadow-2xl animate-bounce-gentle">
          <span className="text-7xl">🕹️</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Mini-Games' },
            { id: 'math', label: 'Math & Numbers' },
            { id: 'words', label: 'Alphabets & Phonics' },
            { id: 'creativity', label: 'Colors & Shapes' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sound.playPop();
                setSelectedFilter(f.id as 'all' | 'math' | 'words' | 'creativity');
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-black text-slate-500 hidden sm:inline">
          Showing 10 Interactive Activities
        </span>
      </div>

      {/* Playable Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {EXTENDED_GAMES.map((game) => (
          <div
            key={game.id}
            onClick={() => handleLaunchGame(game.id, game.title)}
            style={{ backgroundColor: game.bgColor }}
            className="rounded-[2rem] p-6 border-2 border-white/80 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-56 select-none relative overflow-hidden text-white glossy-bubble"
          >
            {/* Top Sheen */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-[2rem]" />

            <div className="flex items-start justify-between z-10">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-120 transition-transform duration-300">
                <PracticeIcon type={game.iconType} size={70} />
              </div>
              <span className="px-3 py-1 bg-white/30 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider">
                Playable
              </span>
            </div>

            <div className="space-y-1 z-10">
              <h3 className="text-lg font-black tracking-tight drop-shadow truncate">
                {game.title}
              </h3>
              <p className="text-xs font-bold text-white/90 line-clamp-1">
                {'desc' in game ? (game as { desc: string }).desc : 'Interactive practice activity'}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-yellow-300 flex items-center gap-1">
                  ⭐ Earn +10 Stars
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white text-slate-900 font-black text-xs shadow-md group-hover:scale-105 transition-transform flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-slate-900" /> Play Now
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal when launched */}
      {activeGame && (
        <InteractiveGameModal
          gameId={activeGame.id}
          gameTitle={activeGame.title}
          onClose={() => {
            setActiveGame(null);
            setStarsWon((prev) => prev + 10);
          }}
        />
      )}
    </div>
  );
};
