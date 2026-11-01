import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Lock, Play, Sparkles } from 'lucide-react';
import { ALL_CATEGORIES, PRACTICE_ACTIVITIES } from '../../data/learningData';
import { HeroBannerIllustration, CategoryIcon, PracticeIcon } from '../illustrations/Illustrations';
import type { VideoData } from '../modals/VideoPlayerModal';

const VideoPlayerModal = React.lazy(() =>
  import('../modals/VideoPlayerModal').then((m) => ({ default: m.VideoPlayerModal }))
);
const InteractiveGameModal = React.lazy(() =>
  import('../modals/InteractiveGameModal').then((m) => ({ default: m.InteractiveGameModal }))
);
import { sound } from '../../utils/audio';
import { StudentProfile } from '../../types/student';
import { APP_IMAGES } from '../../assets/images';
import { REAL_YOUTUBE_VIDEOS, RealVideoItem } from '../../data/youtubeVideos';

interface HomeScreenProps {
  userName: string;
  onStartLearning: () => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAllCategories: () => void;
  onOpenCurriculum?: () => void;
  onOpenPractice?: () => void;
  onOpenBodyExplorer?: () => void;
  onOpenIslamic?: () => void;
  onOpenPunjabi?: () => void;
  onOpenHindi?: () => void;
  studentProfile?: StudentProfile | null;
}

const FEATURED_VIDEO_DETAILS: Record<string, VideoData> = {
  v1: {
    id: 'v1',
    title: 'Magicimals: The Brave Little Elephant & Forest Friends',
    category: 'Stories & Moral Values',
    duration: '6:12',
    thumbnailEmoji: '🐘',
    bgGradient: 'from-pink-900 via-purple-900 to-indigo-950',
    description: 'Enchanting animated animal moral story from Magicimals teaching empathy, friendship, and curiosity.',
    notes: [
      'Channel: Magicimals Official Stories.',
      'Small acts of kindness make every friend feel safe.',
      'Every animal in the forest has a special talent.',
    ],
    objectives: [
      'Learn moral empathy through animal adventures',
      'Inspire imagination and nature appreciation',
      'Encourage kindness towards friends and classmates',
    ],
  },
  v2: {
    id: 'v2',
    title: 'A to Z Alphabet Phonics Song & Letter Adventure',
    category: 'Alphabets & Phonics',
    duration: '4:15',
    thumbnailEmoji: '🔤',
    bgGradient: 'from-amber-900 via-orange-950 to-slate-900',
    description: 'Catchy and colorful alphabetical phonics with singing animals and letter sounds from A to Z.',
    notes: [
      'Source: https://youtu.be/hq3yfQnllfQ',
      'Letter A makes the /æ/ sound for Apple.',
      'Singing the alphabet daily builds reading readiness.',
    ],
    objectives: [
      'Recognize all 26 uppercase and lowercase letters',
      'Connect letters with phonics sounds',
      'Build early vocabulary for young learners',
    ],
  },
  v3: {
    id: 'v3',
    title: 'Masti Toons: Chanda Mama Door Ke & Sweet Toddler Rhymes',
    category: 'Rhymes & Music',
    duration: '4:45',
    thumbnailEmoji: '🎵',
    bgGradient: 'from-emerald-950 via-teal-900 to-blue-950',
    description: 'Musical rhythm, joyful nursery rhymes, and colorful dance songs from Masti Toons by Varda.',
    notes: [
      'Channel: Masti Toons by Varda.',
      'Traditional rhymes with sweet catchy melodies.',
      'Clap along to the beat to build rhythm and joy.',
    ],
    objectives: [
      'Develop auditory rhythm and speech clarity',
      'Celebrate joy and playful toddler songs',
      'Preserve beloved cultural childhood rhymes',
    ],
  },
  v4: {
    id: 'v4',
    title: 'Phonics Letter Tracing & ABC Sounds Masterclass',
    category: 'Alphabets & Writing',
    duration: '5:20',
    thumbnailEmoji: '✏️',
    bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
    description: 'Learn handwriting strokes and vocal sounds for every letter with fun interactive phonics.',
    notes: [
      'Source: https://youtu.be/TF1loU8bJaM',
      'Trace letters from top to bottom with neat strokes.',
      'Blend letter sounds to read simple 3-letter words.',
    ],
    objectives: [
      'Master proper letter stroke direction',
      'Form words using phonemic awareness',
      'Enhance spelling and reading fluency',
    ],
  },
  v5: {
    id: 'v5',
    title: 'Magicimals: The Curious Little Fox & The Starry Night',
    category: 'Stories & Moral Values',
    duration: '5:30',
    thumbnailEmoji: '🦊',
    bgGradient: 'from-purple-950 via-indigo-950 to-slate-950',
    description: 'Follow the adventurous young fox from Magicimals as she discovers the magic of sharing.',
    notes: [
      'Channel: Magicimals Official Stories.',
      'Curiosity leads to wondrous learning adventures.',
      'Sharing toys makes playtime ten times happier.',
    ],
    objectives: [
      'Foster curiosity about nature and stars',
      'Reinforce sharing and cooperation',
      'Build family listening and bedtime story habits',
    ],
  },
  v6: {
    id: 'v6',
    title: 'Masti Toons: Bandar Mama Pahan Pajama & Animal Song',
    category: 'Rhymes & Music',
    duration: '4:10',
    thumbnailEmoji: '🐒',
    bgGradient: 'from-indigo-950 via-purple-900 to-rose-950',
    description: 'Laugh and dance with Bandar Mama from Masti Toons by Varda in his colorful party outfit!',
    notes: [
      'Channel: Masti Toons by Varda.',
      'Rhyming patterns: Pajama, Mama, Daawat!',
      'Dance moves build motor coordination and balance.',
    ],
    objectives: [
      'Identify rhyming sound patterns',
      'Practice motor coordination through dance motions',
      'Spread happiness and smiles among toddlers',
    ],
  },
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  onStartLearning,
  onSelectCategory,
  onViewAllCategories,
  onOpenCurriculum,
  onOpenPractice,
  onOpenBodyExplorer,
  onOpenIslamic,
  onOpenPunjabi,
  onOpenHindi,
  studentProfile,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [activeGame, setActiveGame] = useState<{ id: string; title: string } | null>(null);

  const handleOpenFeaturedVideo = (videoId: string) => {
    sound.playPop();
    const vid = REAL_YOUTUBE_VIDEOS.find((v) => v.id === videoId || v.youtubeId === videoId) || REAL_YOUTUBE_VIDEOS[0];
    setSelectedVideo({
      id: vid.id,
      youtubeId: vid.youtubeId,
      title: vid.title,
      category: vid.category,
      duration: vid.duration,
      channel: vid.channel,
      views: vid.views,
      thumbnailUrl: vid.thumbnail,
      description: vid.description,
      notes: vid.notes,
      objectives: vid.objectives,
    });
  };

  const handleOpenPracticeGame = (actId: string, actTitle: string) => {
    sound.playPop();
    setActiveGame({ id: actId, title: actTitle });
  };

  return (
    <div className="p-3 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-28 select-none">
      {/* Hero Banner with Glossy Glassmorphism & Media Art */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#93c5fd]/95 via-[#7dd3fc]/85 to-[#67e8f9]/95 shadow-xl border-2 border-white/80 min-h-[300px] md:min-h-[340px] flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 md:px-12 py-8 shimmer-effect gap-6">
        {/* Wide Panorama Banner Art in the background with subtle blend */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
          <img
            src={APP_IMAGES.bannerPanorama}
            alt="Learning Adventure"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Soft background light/cloud effect */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/30 rounded-full blur-2xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-10 left-20 w-48 h-48 bg-yellow-200/30 rounded-full blur-xl pointer-events-none animate-float" />

        {/* Left Text & CTA */}
        <div className="relative z-10 max-w-lg space-y-3.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/50 backdrop-blur-md rounded-full text-xs font-black text-slate-800 shadow-sm border border-white/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>VidyaAI Jr • Welcome Back, {userName}!</span>
            <span className="px-1.5 py-0.2 rounded-md bg-yellow-400 text-slate-950 text-[10px] font-black shadow-xs">JR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2e5a] tracking-tight leading-tight drop-shadow-sm font-['Nunito',sans-serif]">
            Let's Make<br />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
              Learning Fun!
            </span>
          </h1>

          <p className="text-slate-700 text-sm md:text-base font-bold leading-relaxed">
            Explore 13 magical subjects, play dynamic random quizzes, and watch HD educational episodes!
          </p>

          <button
            onClick={() => {
              sound.playPop();
              sound.playSuccess();
              onStartLearning();
            }}
            className="mt-2 inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] hover:from-[#fde047] hover:to-[#facc15] active:scale-95 text-slate-950 font-black rounded-full shadow-lg shadow-amber-500/25 transition-all text-sm cursor-pointer glossy-pill hover:scale-105"
          >
            <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>Start Learning Hub</span>
          </button>
        </div>

        {/* Right 3D Learning Illustration - Large & Fully Transparent without white box */}
        <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[24rem] flex items-center justify-center animate-float shrink-0 self-center">
          <img
            src={APP_IMAGES.hero3D}
            alt="VidyaAI 3D Character"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Smart Age & Class Personalized LMS Banner */}
      <div
        onClick={() => {
          sound.playPop();
          if (onOpenCurriculum) onOpenCurriculum();
          else onStartLearning();
        }}
        className="rounded-[2.2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-5 sm:p-6 shadow-xl border-2 border-white/60 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all select-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-sm border border-white/30 shrink-0">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                {studentProfile?.gradeClass || 'Class 2'} Smart LMS
              </span>
              <span className="text-xs font-bold text-blue-100">
                Personalized Age-Based Curriculum
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Open {studentProfile?.gradeClass || 'Class'} Materials, Videos & Quizzes
            </h3>
            <p className="text-xs text-blue-100 font-semibold mt-0.5">
              Personalized materials, interest tracking, teacher notes & class promotion requests.
            </p>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs hover:bg-yellow-300 transition-colors shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer">
          <span>Explore Curriculum</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Popular Categories Section - ALL 13 CATEGORIES with glossy card look */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Popular Categories</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black">
              All 13 Included
            </span>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onViewAllCategories();
            }}
            className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-all hover:scale-105"
          >
            View All (13) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Cards Grid - Shows ALL 13 Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ALL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                sound.playPop();
                onSelectCategory(cat.id);
              }}
              style={{ backgroundColor: cat.bgColor }}
              className="rounded-3xl p-4 flex flex-col justify-between h-40 border-2 border-white/80 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group select-none relative overflow-hidden glossy-bubble"
            >
              {/* Subtle top reflection sheen */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-3xl" />

              {/* Centered 3D Icon with pulse/bounce on hover */}
              <div className="flex-1 flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
                <CategoryIcon type={cat.iconType} size={58} />
              </div>

              {/* Bottom Label & Arrow Button */}
              <div className="flex items-center justify-between pt-1 z-10">
                <span
                  style={{ color: cat.textColor }}
                  className="font-black text-xs tracking-tight truncate pr-1"
                >
                  {cat.name}
                </span>
                <span
                  style={{ backgroundColor: cat.arrowBg }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-115 group-hover:rotate-45 transition-all shadow-md"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Visual Learning Spotlight Cards (using generated 3D illustrations) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Math 3D World Card */}
        <div
          onClick={() => {
            sound.playPop();
            onSelectCategory('mathematics');
          }}
          className="rounded-[2.5rem] bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white p-6 shadow-xl border border-white/50 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
        >
          <div className="space-y-2 z-10 max-w-[60%]">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
              3D Math World
            </span>
            <h3 className="text-xl font-black leading-tight drop-shadow">
              Explore 3D Numbers & Equations!
            </h3>
            <p className="text-xs text-blue-100 font-bold">
              Solve visual puzzles, addition safari, and earn golden stars!
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
              Play Math Adventure →
            </span>
          </div>

          <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/media/vidya-math-3d.jpg"
              alt="3D Math Adventure"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Science 3D Discovery Card */}
        <div
          onClick={() => {
            sound.playPop();
            onSelectCategory('science');
          }}
          className="rounded-[2.5rem] bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white p-6 shadow-xl border border-white/50 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
        >
          <div className="space-y-2 z-10 max-w-[60%]">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
              3D Junior Science Lab
            </span>
            <h3 className="text-xl font-black leading-tight drop-shadow">
              Discover Space, Solar System & Nature!
            </h3>
            <p className="text-xs text-teal-100 font-bold">
              Explore glowing planets, animal habitats & 5 senses!
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-300 pt-1 group-hover:translate-x-1 transition-transform">
              Enter Science Lab →
            </span>
          </div>

          <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/media/vidya-science-3d.jpg"
              alt="3D Science Discovery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Special Modules Spotlight */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Religious & Cultural Spotlight - Strictly conditional to student religion */}
        {studentProfile?.religion === 'muslim' || !studentProfile ? (
          <div
            onClick={() => {
              sound.playPop();
              if (onOpenIslamic) onOpenIslamic();
            }}
            className="rounded-[2.5rem] bg-gradient-to-r from-emerald-600 via-teal-700 to-green-700 text-white p-6 shadow-xl border-2 border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
          >
            <div className="space-y-2 z-10 max-w-[70%]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                  ⭐ ISLAMIC
                </span>
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
                  Academy
                </span>
              </div>
              <h3 className="text-xl font-black leading-tight drop-shadow">
                Islamic Teachings 🕌
              </h3>
              <p className="text-xs text-emerald-100 font-bold leading-relaxed font-urdu">
                سیرتِ رسولِ پاک ﷺ، واقعہ کربلا، نماز و وضو، قرآن و حدیث اور ۲۳ انبیاء کرام!
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
                Explore Teachings →
              </span>
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
              🕌
            </div>
          </div>
        ) : studentProfile.religion === 'sikh' ? (
          <div
            onClick={() => {
              sound.playPop();
              if (onOpenPunjabi) onOpenPunjabi();
            }}
            className="rounded-[2.5rem] bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-white p-6 shadow-xl border-2 border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
          >
            <div className="space-y-2 z-10 max-w-[70%]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow-300 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                  ⭐ PUNJABI
                </span>
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
                  Gurmukhi
                </span>
              </div>
              <h3 className="text-xl font-black leading-tight drop-shadow">
                Punjabi Academy ☬
              </h3>
              <p className="text-xs text-amber-100 font-bold leading-relaxed font-punjabi">
                ੩੫ ਅੱਖਰੀ, ਰੋਜ਼ਾਨਾ ਸ਼ਬਦ, ਦਸ ਪਾਤਸ਼ਾਹੀਆਂ, ਸਿੱਖ ਕਦਰਾਂ-ਕੀਮਤਾਂ, ਸਾਖੀਆਂ ਤੇ ਮੂਲ ਮੰਤਰ!
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-200 pt-1 group-hover:translate-x-1 transition-transform">
                Explore Punjabi →
              </span>
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
              ☬
            </div>
          </div>
        ) : studentProfile.religion === 'hindu' ? (
          <div
            onClick={() => {
              sound.playPop();
              if (onOpenHindi) onOpenHindi();
            }}
            className="rounded-[2.5rem] bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white p-6 shadow-xl border-2 border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
          >
            <div className="space-y-2 z-10 max-w-[70%]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow-300 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                  ⭐ HINDI
                </span>
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
                  Culture
                </span>
              </div>
              <h3 className="text-xl font-black leading-tight drop-shadow">
                Hindi & Culture 🕉️
              </h3>
              <p className="text-xs text-orange-100 font-bold leading-relaxed font-hindi">
                वर्णमाला, पंचतंत्र कथाएं, सनातन संस्कार, रामायण, सरल श्लोक एवं बाल योग!
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-200 pt-1 group-hover:translate-x-1 transition-transform">
                Explore Hindi →
              </span>
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
              🕉️
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              sound.playPop();
              if (onOpenBodyExplorer) onOpenBodyExplorer();
            }}
            className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white p-6 shadow-xl border-2 border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
          >
            <div className="space-y-2 z-10 max-w-[70%]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow-300 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                  ⭐ GLOBAL
                </span>
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
                  Science
                </span>
              </div>
              <h3 className="text-xl font-black leading-tight drop-shadow">
                World Discovery 🌍
              </h3>
              <p className="text-xs text-blue-100 font-bold leading-relaxed">
                Cosmic Space, Nature & Universal Human Values!
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-200 pt-1 group-hover:translate-x-1 transition-transform">
                Explore Science →
              </span>
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
              🌍
            </div>
          </div>
        )}

        {/* Explorer Hub Spotlight */}
        <div
          onClick={() => {
            sound.playPop();
            if (onOpenBodyExplorer) {
              onOpenBodyExplorer();
            } else if (onOpenPractice) {
              onOpenPractice();
            }
          }}
          className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white p-6 shadow-xl border-2 border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
        >
          <div className="space-y-2 z-10 max-w-[70%]">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-yellow-400 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                ⭐ 3D LAB
              </span>
              <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
                Real Body
              </span>
            </div>
            <h3 className="text-xl font-black leading-tight drop-shadow">
              Explorer Hub 🧭
            </h3>
            <p className="text-xs text-blue-100 font-bold leading-relaxed">
              Real 3D Human Body Anatomy with Drag & Drop Scanner & Cosmos!
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
              Open Explorer →
            </span>
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-4xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
            🧭
          </div>
        </div>

        {/* Fruit & Veggie Memory Match Spotlight */}
        <div
          onClick={() => handleOpenPracticeGame('p-memory-match', 'Fruit & Veggie Memory Match 🥕🍎')}
          className="rounded-[2.5rem] bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white p-6 shadow-xl border-2 border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all relative overflow-hidden group select-none"
        >
          <div className="space-y-2 z-10 max-w-[65%]">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-400 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                ⭐ MEMORY MATCH
              </span>
              <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
                Shuffled Cards
              </span>
            </div>
            <h3 className="text-xl font-black leading-tight drop-shadow">
              Fruit & Veggie Memory Match 🥕
            </h3>
            <p className="text-xs text-violet-100 font-bold leading-relaxed">
              Match juicy carrots, apples, & broccoli in shuffled cards to unlock healthy superpower quotes!
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300 pt-1 group-hover:translate-x-1 transition-transform">
              Play Memory Match Now →
            </span>
          </div>

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-5xl shadow-xl shrink-0 group-hover:scale-110 transition-transform">
            🥕
          </div>
        </div>
      </section>

      {/* Let's Practice Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Let's Practice</h2>
            <p className="text-xs font-extrabold text-slate-500">Pick an activity to play</p>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              if (onOpenPractice) {
                onOpenPractice();
              } else {
                onStartLearning();
              }
            }}
            className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-all hover:scale-105"
          >
            View All Games <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Practice Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {PRACTICE_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              onClick={() => handleOpenPracticeGame(activity.id, activity.title)}
              style={{ backgroundColor: activity.bgColor }}
              className="rounded-3xl p-4 flex flex-col justify-between h-36 border-2 border-white/60 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group select-none text-white relative overflow-hidden glossy-bubble"
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-3xl" />
              <div className="flex-1 flex items-center justify-center group-hover:scale-115 transition-transform duration-200">
                <PracticeIcon type={activity.iconType} size={62} />
              </div>
              <div className="flex items-center justify-between pt-1 z-10">
                <span className="font-black text-xs tracking-tight truncate drop-shadow">
                  {activity.title}
                </span>
                <span className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white shrink-0 group-hover:scale-115 transition-transform">
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Videos Section (Clicking opens Simulated Interactive Video Modal!) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Featured Videos</h2>
          <button
            onClick={() => {
              sound.playPop();
              onStartLearning();
            }}
            className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-all"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Real YouTube Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {REAL_YOUTUBE_VIDEOS.slice(0, 5).map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpenFeaturedVideo(video.id)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between"
            >
              {/* Real YouTube Thumbnail Container */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Duration badge bottom-right */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[11px] font-black text-white">
                  {video.duration}
                </div>

                {/* Channel badge top-left */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white truncate max-w-[70%]">
                  {video.channel}
                </div>

                {/* Play button hover overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Title & Stats */}
              <div className="p-3 space-y-1">
                <p className="text-xs font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {video.title}
                </p>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span>{video.category}</span>
                  <span>{video.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulated Interactive Video Player Modal */}
      {selectedVideo && (
        <React.Suspense fallback={null}>
        <VideoPlayerModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onTakeQuiz={() => {
            setSelectedVideo(null);
            onStartLearning();
          }}
        />
        </React.Suspense>
      )}

      {/* Playable Interactive Mini Game Modal */}
      {activeGame && (
        <React.Suspense fallback={null}>
        <InteractiveGameModal
          gameId={activeGame.id}
          gameTitle={activeGame.title}
          onClose={() => setActiveGame(null)}
        />
        </React.Suspense>
      )}
    </div>
  );
};
