import React, { useState } from 'react';
import { Gamepad2, Sparkles, Trophy, Star, Play } from 'lucide-react';
import { PRACTICE_ACTIVITIES } from '../../data/learningData';
import { PracticeIcon } from '../illustrations/Illustrations';
import { InteractiveGameModal } from '../modals/InteractiveGameModal';
import { sound } from '../../utils/audio';

type GameCategory = 'math' | 'words' | 'creativity' | 'logic';
type PracticeGame = (typeof PRACTICE_ACTIVITIES)[number] & {
  category: GameCategory;
  desc: string;
};

const EXTENDED_GAMES: PracticeGame[] = [
  ...PRACTICE_ACTIVITIES.map((activity) => ({
    ...activity,
    category: activity.id.includes('alpha') ? 'words' as const
      : activity.id.includes('shape') || activity.id.includes('colour') ? 'creativity' as const
        : activity.id.includes('pattern') ? 'logic' as const : 'math' as const,
    desc: activity.title === 'Alphabets' ? 'Match letters with their sounds and words.'
      : activity.title === 'Numbers' ? 'Count carefully and solve number puzzles.'
        : activity.title === 'Shape Tracing' ? 'Find shapes by their sides and properties.'
          : activity.title === 'Pattern Play' ? 'Spot the rule and complete each sequence.'
            : activity.title === 'Colour the Shapes' ? 'Choose colors and create a bright picture.'
              : 'Spot the target and pop only the right bubbles.',
  })),
  {
    id: 'p-balloon-pop',
    title: 'Balloon Pop Math',
    iconType: 'p-pop',
    bgColor: '#f43f5e',
    badgeColor: '#be123c',
    category: 'math',
    desc: 'Pop glowing number balloons before they float away!',
  },
  {
    id: 'p-animal-count',
    title: 'Feed The Bunny',
    iconType: 'p-numbers',
    bgColor: '#f59e0b',
    badgeColor: '#b45309',
    category: 'math',
    desc: 'Count and feed the exact number of crunchy carrots.',
  },
  {
    id: 'p-color-canvas',
    title: 'Color The Shapes',
    iconType: 'p-colour',
    bgColor: '#8b5cf6',
    badgeColor: '#6d28d9',
    category: 'creativity',
    desc: 'Pick bright paints and color stars, circles, and hearts!',
  },
  {
    id: 'p-pattern-logic',
    title: 'Fruit Pattern Logic',
    iconType: 'p-pattern',
    bgColor: '#10b981',
    badgeColor: '#047857',
    category: 'logic',
    desc: 'Discover what fruit comes next in the puzzle sequence.',
  },
  {
    id: 'p-math-quest',
    title: 'Math Quest',
    iconType: 'p-numbers',
    bgColor: '#2563eb',
    badgeColor: '#1d4ed8',
    category: 'math',
    desc: 'Solve multi-step number stories that match your grade.',
  },
  {
    id: 'p-memory-match',
    title: 'Brainy Memory Match',
    iconType: 'p-pattern',
    bgColor: '#7c3aed',
    badgeColor: '#6d28d9',
    category: 'logic',
    desc: 'Flip cards and match equations with their answers.',
  },
  {
    id: 'p-fraction-factory',
    title: 'Fraction Factory',
    iconType: 'p-shapes',
    bgColor: '#0f766e',
    badgeColor: '#115e59',
    category: 'math',
    desc: 'Build fractions and solve visual number challenges.',
  },
];

export const PracticeScreen: React.FC<{ userGrade: string }> = ({ userGrade }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | GameCategory>('all');
  const [activeGame, setActiveGame] = useState<{ id: string; title: string } | null>(null);
  const [starsWon, setStarsWon] = useState(45);

  const handleLaunchGame = (id: string, title: string) => {
    sound.playPop();
    setActiveGame({ id, title });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      {/* Practice Header Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-purple-600/95 via-indigo-600/90 to-blue-600/95 text-white p-8 md:p-10 shadow-xl border border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 shimmer-effect">
        {/* Wide Panorama Banner Art in the background with subtle blend */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <img
            src="/media/animation3.png"
            alt="Arcade Panorama"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black shadow-sm">
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <span>{userGrade} Interactive Game Arcade</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
            Let's Practice & Play! 🎮
          </h1>

          <p className="text-white/90 text-sm md:text-base font-semibold leading-relaxed">
            Grade-aware games for maths, memory, patterns, phonics, and creative problem-solving.
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

        {/* 3D Animated Illustration using media asset */}
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-white/15 backdrop-blur-md p-2 flex items-center justify-center border-2 border-white/50 shadow-2xl animate-bounce-gentle relative z-10">
          <img
            src="/media/png1.png"
            alt="Arcade Character"
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
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
            { id: 'logic', label: 'Logic & Memory' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sound.playPop();
                setSelectedFilter(f.id as 'all' | GameCategory);
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
          Showing {EXTENDED_GAMES.filter((game) => selectedFilter === 'all' || game.category === selectedFilter).length} Interactive Activities
        </span>
      </div>

      {/* Playable Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {EXTENDED_GAMES.filter((game) => selectedFilter === 'all' || game.category === selectedFilter).map((game) => (
          <div
            key={game.id}
            onClick={() => handleLaunchGame(game.id, game.title)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') handleLaunchGame(game.id, game.title);
            }}
            role="button"
            tabIndex={0}
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
                {game.desc}
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
          userGrade={userGrade}
          onClose={() => {
            setActiveGame(null);
          }}
          onWin={() => setStarsWon((previous) => previous + 10)}
        />
      )}
    </div>
  );
};
