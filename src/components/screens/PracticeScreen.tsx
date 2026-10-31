import React, { useState } from 'react';
import { Gamepad2, Sparkles, Trophy, Star, Play } from 'lucide-react';
import { PRACTICE_ACTIVITIES } from '../../data/learningData';
import { PracticeIcon } from '../illustrations/Illustrations';
import { InteractiveGameModal } from '../modals/InteractiveGameModal';
import { IslamicExamModal } from '../modals/IslamicExamModal';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';
import { ReligionType } from '../../types/student';
import {
  getStudentProgress,
  recordActivityCompletion,
  recordExamCompletion,
} from '../../utils/studentProgress';

type GameCategory = 'math' | 'words' | 'creativity' | 'logic' | 'science' | 'islamic' | 'hinduism' | 'sikhism' | 'general';
type PracticeGame = (typeof PRACTICE_ACTIVITIES)[number] & {
  category: GameCategory;
  desc: string;
  emoji?: string;
  exam?: boolean;
  religion?: ReligionType;
};

const COMMON_GAMES: PracticeGame[] = [
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
    id: 'islamic-manners-exam',
    title: 'Islamic Manners Exam',
    iconType: 'p-pattern',
    bgColor: '#059669',
    badgeColor: '#047857',
    category: 'islamic',
    desc: 'Take a 10-question Urdu exam on Islamic manners and daily practice.',
    emoji: '🕌',
    exam: true,
    religion: 'muslim',
  },
  {
    id: 'islamic-urdu-words-exam',
    title: 'Islamic Urdu Words Exam',
    iconType: 'p-pattern',
    bgColor: '#7c3aed',
    badgeColor: '#6d28d9',
    category: 'islamic',
    desc: 'Test your understanding of Islamic phrases and their Urdu meanings.',
    emoji: '📿',
    exam: true,
    religion: 'muslim',
  },
  {
    id: 'p-memory-match',
    title: 'Fruit & Veggie Memory Match 🥕🍎',
    iconType: 'p-pattern',
    bgColor: '#7c3aed',
    badgeColor: '#6d28d9',
    category: 'logic',
    desc: 'Flip cards to match tasty fruits & veggies and discover super healthy quotes!',
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
  {
    id: 'science-explorer-quiz',
    title: 'Science Explorer Challenge',
    iconType: 'p-pattern',
    bgColor: '#0e7490',
    badgeColor: '#155e75',
    category: 'science',
    desc: 'Explore plants, space, forces, matter, and the human body.',
    emoji: '🔬',
    exam: true,
  },
];

const COMMUNITY_GAMES: Record<ReligionType, PracticeGame[]> = {
  muslim: [],
  hindu: [
    {
      id: 'hindu-values-quiz',
      title: 'Hindu Culture & Values',
      iconType: 'p-pattern',
      bgColor: '#ea580c',
      badgeColor: '#9a3412',
      category: 'hinduism',
      desc: 'Explore festivals, stories, Sanskrit, yoga, and values.',
      emoji: '🪔',
      exam: true,
      religion: 'hindu',
    },
  ],
  sikh: [
    {
      id: 'sikh-values-quiz',
      title: 'Sikhism & Seva Challenge',
      iconType: 'p-pattern',
      bgColor: '#d97706',
      badgeColor: '#92400e',
      category: 'sikhism',
      desc: 'Learn about seva, langar, Sikh history, and Gurmukhi.',
      emoji: '☬',
      exam: true,
      religion: 'sikh',
    },
  ],
  other: [
    {
      id: 'general-discovery-quiz',
      title: 'World Discovery Challenge',
      iconType: 'p-pattern',
      bgColor: '#2563eb',
      badgeColor: '#1e40af',
      category: 'general',
      desc: 'Discover geography, animals, space, and world knowledge.',
      emoji: '🌍',
      exam: true,
      religion: 'other',
    },
  ],
};

type ClassBand = 'nursery-kg' | 'class-1-3' | 'class-4-5' | 'class-6-8';
type AgeBand = 'age-4-6' | 'age-7-9' | 'age-10-12' | 'age-13-14';

const getClassBand = (grade: string): ClassBand => {
  const gradeNumber = Number(grade.match(/\d+/)?.[0] ?? 0);
  if (gradeNumber >= 6) return 'class-6-8';
  if (gradeNumber >= 4) return 'class-4-5';
  if (gradeNumber >= 1) return 'class-1-3';
  return 'nursery-kg';
};

const getAgeBand = (age: number): AgeBand => {
  if (age >= 13) return 'age-13-14';
  if (age >= 10) return 'age-10-12';
  if (age >= 7) return 'age-7-9';
  return 'age-4-6';
};

interface PracticeScreenProps {
  studentId?: string;
  userGrade: string;
  userAge: number;
  religion: ReligionType;
  onOpenBodyExplorer?: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  studentId,
  userGrade,
  userAge,
  religion,
  onOpenBodyExplorer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | GameCategory>('all');
  const [selectedClassBand, setSelectedClassBand] = useState<ClassBand>(() => getClassBand(userGrade));
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>(() => getAgeBand(userAge));
  const [filtersCustomized, setFiltersCustomized] = useState(false);
  const [activeGame, setActiveGame] = useState<{ id: string; title: string } | null>(null);
  const [progress, setProgress] = useState(() => getStudentProgress(studentId));
  const earnedBadges = [
    progress.completedLessonIds.length > 0,
    progress.quizAttempts > 0,
    progress.examAttempts > 0,
    progress.activityCompletions > 0,
    progress.discoveredOrganIds.length > 0,
  ].filter(Boolean).length;
  const games = [
    ...COMMON_GAMES.filter((game) => !game.religion || game.religion === religion),
    ...COMMUNITY_GAMES[religion],
  ];
  const visibleGames = games.filter((game) =>
    selectedFilter === 'all' || game.category === selectedFilter
  );
  const profileGrade = Number(userGrade.match(/\d+/)?.[0] ?? 0);
  const selectedGradeBand = selectedClassBand === 'class-6-8' || selectedClassBand === 'class-4-5'
    ? 'Grade 3'
    : selectedClassBand === 'class-1-3'
      ? selectedAgeBand === 'age-4-6' ? 'Grade 1' : 'Grade 2'
      : 'Grade 1';
  const contentGrade = filtersCustomized
    ? selectedAgeBand === 'age-10-12' ||
      selectedAgeBand === 'age-13-14' ||
      selectedClassBand === 'class-4-5' ||
      selectedClassBand === 'class-6-8'
      ? 'Grade 3'
      : selectedGradeBand
    : profileGrade >= 3 || userAge >= 10
      ? 'Grade 3'
      : profileGrade >= 2
        ? 'Grade 2'
        : 'Grade 1';

  const resetFiltersToProfile = () => {
    setSelectedClassBand(getClassBand(userGrade));
    setSelectedAgeBand(getAgeBand(userAge));
    setFiltersCustomized(false);
  };

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
            src={APP_IMAGES.bannerPanorama}
            alt="Arcade Panorama"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black shadow-sm">
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <span>{userGrade} · Age {userAge} · Interactive Game Arcade</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
            Let's Practice & Play! 🎮
          </h1>

          <p className="text-white/90 text-sm md:text-base font-semibold leading-relaxed">
            Games and knowledge challenges matched to your class and age, with science activities for everyone.
          </p>

          <div className="pt-1 flex items-center justify-center md:justify-start gap-4">
            <span className="px-3.5 py-1.5 bg-amber-400 text-slate-950 rounded-full text-xs font-black shadow-md flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-slate-950" /> {progress.starsEarned} Stars Collected
            </span>
            <span className="px-3.5 py-1.5 bg-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
              🏆 {earnedBadges} / 5 Badges Earned
            </span>
          </div>
        </div>

        {/* 3D Animated Illustration using media asset */}
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-white/15 backdrop-blur-md p-2 flex items-center justify-center border-2 border-white/50 shadow-2xl animate-bounce-gentle relative z-10">
          <img
            src={APP_IMAGES.explorerMascot}
            alt="Arcade Character"
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
        </div>
      </div>

      {/* Explorer Discovery Hub Spotlight */}
      <div
        onClick={() => {
          sound.playPop();
          if (onOpenBodyExplorer) {
            onOpenBodyExplorer();
          }
        }}
        className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white p-6 md:p-8 shadow-2xl border-2 border-white/60 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer hover:shadow-3xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
      >
        <div className="space-y-3 z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-yellow-400 text-slate-950 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm animate-pulse">
              ⭐ EXPLORER HUB
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider">
              Interactive Cards & 3D Lab
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black leading-tight drop-shadow">
            Explorer Hub 🧭 (علم و دریافت کا مرکز)
          </h2>

          <p className="text-sm text-blue-100 font-extrabold leading-relaxed">
            3D Human Body Anatomy with Drag & Drop Scanner, Islamic Teachings in Arabic & Urdu, Solar System, Animals of the Quran, and Botany!
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-2xl bg-white text-blue-800 font-black text-xs shadow-lg group-hover:scale-105 transition-all flex items-center gap-2">
              <Play className="w-4 h-4 fill-blue-800" />
              <span>Launch Explorer Hub →</span>
            </button>
            <span className="text-xs font-bold text-cyan-200">50+ Organs & Vessels • Duas • Cosmos</span>
          </div>
        </div>

        <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-6xl shadow-2xl shrink-0 group-hover:scale-110 transition-transform">
          🧭
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-white/80 p-4 border border-slate-200 shadow-sm">
          <label className="flex flex-col gap-1 text-xs font-black text-slate-600">
            Class level
            <select
              value={selectedClassBand}
              onChange={(event) => {
                setSelectedClassBand(event.target.value as ClassBand);
                setFiltersCustomized(true);
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
            >
              <option value="nursery-kg">Nursery / KG</option>
              <option value="class-1-3">Classes 1–3</option>
              <option value="class-4-5">Classes 4–5</option>
              <option value="class-6-8">Classes 6–8</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-black text-slate-600">
            Age group
            <select
              value={selectedAgeBand}
              onChange={(event) => {
                setSelectedAgeBand(event.target.value as AgeBand);
                setFiltersCustomized(true);
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
            >
              <option value="age-4-6">Ages 4–6</option>
              <option value="age-7-9">Ages 7–9</option>
              <option value="age-10-12">Ages 10–12</option>
              <option value="age-13-14">Ages 13–14</option>
            </select>
          </label>
          <p className="text-xs font-semibold text-slate-500">
            Defaults match the student profile. Changing either filter updates the challenge level.
          </p>
          {filtersCustomized && (
            <button
              type="button"
              onClick={resetFiltersToProfile}
              className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700 hover:bg-blue-100"
            >
              Reset to profile
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Mini-Games' },
            { id: 'math', label: 'Math & Numbers' },
            { id: 'words', label: 'Alphabets & Phonics' },
            { id: 'creativity', label: 'Colors & Shapes' },
            { id: 'logic', label: 'Logic & Memory' },
            { id: 'science', label: 'Science (Everyone)' },
            ...(religion === 'muslim' ? [{ id: 'islamic', label: 'Islamic & Urdu Exams' }] : []),
            ...(religion === 'hindu' ? [{ id: 'hinduism', label: 'Hinduism & Culture' }] : []),
            ...(religion === 'sikh' ? [{ id: 'sikhism', label: 'Sikhism & Seva' }] : []),
            ...(religion === 'other' ? [{ id: 'general', label: 'World Knowledge' }] : []),
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
          Showing {visibleGames.length} Interactive Activities
        </span>
      </div>
      </div>

      {/* Playable Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {visibleGames.map((game) => (
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
                {game.emoji ? (
                  <span className="text-5xl drop-shadow-md" aria-hidden="true">{game.emoji}</span>
                ) : (
                  <PracticeIcon type={game.iconType} size={70} />
                )}
              </div>
              <span className="px-3 py-1 bg-white/30 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider">
                {game.exam ? '10-Question Challenge' : 'Playable'}
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
                  ⭐ {game.exam ? 'Earn stars for correct answers' : 'Earn +10 Stars'}
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
        games.find((game) => game.id === activeGame.id)?.exam ? (
          <IslamicExamModal
            examId={activeGame.id}
            userGrade={contentGrade}
            onClose={() => setActiveGame(null)}
            onComplete={(result) => {
              recordExamCompletion(studentId, result.correct, result.total);
              setProgress(getStudentProgress(studentId));
            }}
          />
        ) : (
          <InteractiveGameModal
            gameId={activeGame.id}
            gameTitle={activeGame.title}
            userGrade={contentGrade}
            onClose={() => {
              setActiveGame(null);
            }}
            onWin={() => {
              recordActivityCompletion(studentId);
              setProgress(getStudentProgress(studentId));
            }}
          />
        )
      )}
    </div>
  );
};
