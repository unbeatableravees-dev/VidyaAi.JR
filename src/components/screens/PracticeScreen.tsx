import React, { useState } from 'react';
import { Gamepad2, Sparkles, Trophy, Star, Play } from 'lucide-react';
import { PRACTICE_ACTIVITIES } from '../../data/learningData';
import { PracticeIcon } from '../illustrations/Illustrations';
import { InteractiveGameModal } from '../modals/InteractiveGameModal';
import { IslamicExamModal } from '../modals/IslamicExamModal';
import { TracingCanvasModal } from '../modals/TracingCanvasModal';
import { MathTablesModal } from '../modals/MathTablesModal';
import { FlashcardsModal } from '../modals/FlashcardsModal';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';
import { ReligionType } from '../../types/student';
import { getStudentContentGrade } from '../../utils/studentLevel';
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
    id: 'p-tracing-canvas',
    title: 'Magical Tracing Canvas',
    iconType: 'p-colour',
    bgColor: '#0284c7',
    badgeColor: '#0369a1',
    category: 'creativity',
    desc: 'Trace English letters, numbers, Hindi, and Urdu with colorful crayons!',
    emoji: '✍️',
  },
  {
    id: 'p-math-tables',
    title: 'Math Tables Arena (2-20)',
    iconType: 'p-numbers',
    bgColor: '#059669',
    badgeColor: '#047857',
    category: 'math',
    desc: 'Learn multiplication tables 2 to 20 with voice reading and speed quiz!',
    emoji: '🧮',
  },
  {
    id: 'p-flashcards',
    title: 'Flip & Learn Flashcards',
    iconType: 'p-pattern',
    bgColor: '#7c3aed',
    badgeColor: '#6d28d9',
    category: 'general',
    desc: 'Flip interactive cards for Science, Math formulas, Elements & Capitals!',
    emoji: '🎴',
  },
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
    desc: 'Take a 10-question English and Urdu exam on Islamic manners and daily practice.',
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
    desc: 'Learn Islamic phrases with English and Urdu meanings in a 10-question exam.',
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
      title: 'Hindu Culture & Values Quiz',
      iconType: 'p-pattern',
      bgColor: '#ea580c',
      badgeColor: '#9a3412',
      category: 'hinduism',
      desc: 'Explore festivals, Ramayana stories, Sanskrit shlokas, and sanskar.',
      emoji: '🪔',
      exam: true,
      religion: 'hindu',
    },
    {
      id: 'hindi-varnamala-exam',
      title: 'Hindi Varnamala & Words Challenge',
      iconType: 'p-alphabets',
      bgColor: '#f97316',
      badgeColor: '#c2410c',
      category: 'hinduism',
      desc: 'Test your knowledge of Hindi vowels, consonants, counting, and words.',
      emoji: '🕉️',
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
      desc: 'Learn about seva, langar, 10 Gurus, sakhis, and Gurmukhi.',
      emoji: '☬',
      exam: true,
      religion: 'sikh',
    },
    {
      id: 'punjabi-gurmukhi-exam',
      title: 'Gurmukhi 35 Akhari & Words Challenge',
      iconType: 'p-alphabets',
      bgColor: '#eab308',
      badgeColor: '#ca8a04',
      category: 'sikhism',
      desc: 'Practice Gurmukhi letters ੳ to ੜ, daily counting, and words.',
      emoji: 'ੴ',
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
  const contentGrade = getStudentContentGrade(userGrade, userAge);

  const handleLaunchGame = (id: string, title: string) => {
    sound.playPop();
    setActiveGame({ id, title });
  };

  const explorerHubText =
    religion === 'hindu'
      ? {
          title: 'Explorer Hub 🧭 (ज्ञान एवं खोज का केंद्र)',
          desc: '3D Human Body Anatomy with Scanner, Hindi & Cultural Wisdom, Solar System, Plants, Animals & Wonders of Science!',
        }
      : religion === 'sikh'
      ? {
          title: 'Explorer Hub 🧭 (ਗਿਆਨ ਤੇ ਖੋਜ ਦਾ ਕੇਂਦਰ)',
          desc: '3D Human Body Anatomy with Scanner, Punjabi & Gurmukhi Academy, Solar System, Nature, Animals & Wonders of Science!',
        }
      : religion === 'muslim'
      ? {
          title: 'Explorer Hub 🧭 (علم و دریافت کا مرکز)',
          desc: '3D Human Body Anatomy with Scanner, Islamic Teachings in Arabic & Urdu, Solar System, Animals of the Quran, and Botany!',
        }
      : {
          title: 'Explorer Hub 🧭 (Discovery & Knowledge Hub)',
          desc: '3D Human Body Anatomy with Scanner, Solar System, Nature, Animals & Wonders of Science!',
        };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto pb-28 space-y-6 select-none">
      {/* Practice Header Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-purple-600/95 via-indigo-600/90 to-blue-600/95 text-white p-8 md:p-10 shadow-xl border border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 shimmer-effect">
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
            <span>{userGrade} · Age {userAge} · {contentGrade}{contentGrade === 'Grade 3' ? '+' : ''} Level Arcade</span>
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

        {/* Mascot */}
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
            {explorerHubText.title}
          </h2>

          <p className="text-sm text-blue-100 font-extrabold leading-relaxed">
            {explorerHubText.desc}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-2xl bg-white text-blue-800 font-black text-xs shadow-lg group-hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
              <Play className="w-4 h-4 fill-blue-800" />
              <span>Launch Explorer Hub →</span>
            </button>
            <span className="text-xs font-bold text-cyan-200">50+ Organs & Vessels • Science & Culture</span>
          </div>
        </div>

        <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-6xl shadow-2xl shrink-0 group-hover:scale-110 transition-transform">
          🧭
        </div>
      </div>

      {/* Subject filters */}
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
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Mini-Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleLaunchGame(game.id, game.title)}
            style={{ backgroundColor: game.bgColor }}
            className="rounded-[2rem] p-5 text-white flex flex-col justify-between h-56 shadow-lg border-2 border-white/80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group select-none relative overflow-hidden glossy-bubble"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-[2rem]" />

            <div className="flex items-start justify-between z-10">
              <span
                style={{ backgroundColor: game.badgeColor }}
                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
                {game.category}
              </span>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-sm font-black group-hover:rotate-12 transition-transform">
                {game.emoji || '⭐'}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center my-2 group-hover:scale-115 transition-transform duration-300">
              <PracticeIcon type={game.iconType} size={54} />
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
        activeGame.id === 'p-tracing-canvas' ? (
          <TracingCanvasModal
            isOpen={true}
            onClose={() => setActiveGame(null)}
            onWin={() => {
              recordActivityCompletion(studentId);
              setProgress(getStudentProgress(studentId));
            }}
          />
        ) : activeGame.id === 'p-math-tables' ? (
          <MathTablesModal
            isOpen={true}
            onClose={() => {
              setActiveGame(null);
              setProgress(getStudentProgress(studentId));
            }}
            studentId={studentId}
          />
        ) : activeGame.id === 'p-flashcards' ? (
          <FlashcardsModal
            isOpen={true}
            onClose={() => {
              setActiveGame(null);
              setProgress(getStudentProgress(studentId));
            }}
            studentId={studentId}
          />
        ) : games.find((game) => game.id === activeGame.id)?.exam ? (
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
