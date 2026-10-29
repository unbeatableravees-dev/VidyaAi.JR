import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Lock, Play, Sparkles } from 'lucide-react';
import { ALL_CATEGORIES, PRACTICE_ACTIVITIES } from '../../data/learningData';
import { HeroBannerIllustration, CategoryIcon, PracticeIcon } from '../illustrations/Illustrations';
import { VideoPlayerModal, VideoData } from '../modals/VideoPlayerModal';
import { InteractiveGameModal } from '../modals/InteractiveGameModal';
import { sound } from '../../utils/audio';
import { APP_IMAGES } from '../../assets/images';
import { REAL_YOUTUBE_VIDEOS, RealVideoItem } from '../../data/youtubeVideos';

interface HomeScreenProps {
  userName: string;
  onStartLearning: () => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAllCategories: () => void;
  onOpenPractice?: () => void;
}

const FEATURED_VIDEO_DETAILS: Record<string, VideoData> = {
  v1: {
    id: 'v1',
    title: "Toto Discovers The Elephant's Super Trunk",
    category: 'Animals & Nature',
    duration: '4:32',
    thumbnailEmoji: '🐘',
    bgGradient: 'from-pink-900 via-purple-900 to-indigo-950',
    description: 'Join Toto the baby elephant as he discovers 7 miraculous things his trunk can do!',
    notes: [
      'An elephant trunk has over 40,000 muscles!',
      'Elephants use trunks like a snorkel to swim underwater.',
      'Trunks can pick up a tiny peanut or lift a heavy log.',
    ],
    objectives: [
      'Learn animal adaptation and anatomy',
      'Understand how Asian & African elephants live',
      'Develop empathy and love for wildlife',
    ],
  },
  v2: {
    id: 'v2',
    title: 'Train Kisne Banaya? (The Invention of Trains)',
    category: 'Science & Invention',
    duration: '5:18',
    thumbnailEmoji: '🚂',
    bgGradient: 'from-amber-900 via-orange-950 to-slate-900',
    description: 'From coal-powered steam engines to modern high-speed bullet trains!',
    notes: [
      'George Stephenson built the first public inter-city railway.',
      'Steam engines burned coal to heat water into high-pressure steam.',
      'Modern Vande Bharat trains run on clean electricity.',
    ],
    objectives: [
      'Discover the history of steam and electric locomotives',
      'Understand how wheels grip steel tracks',
      'Explore famous rail journeys of India and the world',
    ],
  },
  v3: {
    id: 'v3',
    title: "Krishna's Mountain Adventure (Govardhan)",
    category: 'Mythology & Moral',
    duration: '6:21',
    thumbnailEmoji: '🦚',
    bgGradient: 'from-emerald-950 via-teal-900 to-blue-950',
    description: 'Little Krishna lifts Govardhan mountain on his pinky finger to shelter villagers from torrential rains.',
    notes: [
      'True strength comes from protecting those in need.',
      'Nature, cows, and mountains deserve our care and gratitude.',
      'Unity gives power to overcome any stormy weather.',
    ],
    objectives: [
      'Learn the value of humility and courage',
      'Appreciate traditional folk heritage',
      'Reflect on community teamwork and solidarity',
    ],
  },
  v4: {
    id: 'v4',
    title: 'Mor Ka Choti Chidiya (The Peacock & The Sparrow)',
    category: 'Moral Stories',
    duration: '4:45',
    thumbnailEmoji: '🦜',
    bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
    description: 'A proud peacock with iridescent feathers learns that every bird has their own unique gift.',
    notes: [
      'Never judge someone by their plain looks.',
      'The little sparrow could fly high above stormy clouds to guide others.',
      'Self-worth comes from goodness inside your heart.',
    ],
    objectives: [
      'Embrace individuality and diversity in friends',
      'Overcome vanity and bragging',
      'Build respectful, kind friendships in school',
    ],
  },
  v5: {
    id: 'v5',
    title: 'Little Detectives: Subtraction ka Raaz',
    category: 'Math Mystery',
    duration: '5:12',
    thumbnailEmoji: '🔍',
    bgGradient: 'from-purple-950 via-indigo-950 to-slate-950',
    description: 'Who stole the 3 cookies from the jar? Solve clues using subtraction equations!',
    notes: [
      'Starting count: 8 chocolate chip cookies.',
      'Leftover count: 5 cookies.',
      'Equation: 8 - 5 = 3 missing cookies found by the puppy!',
    ],
    objectives: [
      'Solve real-life subtraction word problems',
      'Use deductive detective reasoning',
      'Check answers using reverse addition',
    ],
  },
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  onStartLearning,
  onSelectCategory,
  onViewAllCategories,
  onOpenPractice,
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
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-28 select-none">
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
            <span>Welcome Back, {userName}!</span>
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
                  <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
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
        <VideoPlayerModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onTakeQuiz={() => {
            setSelectedVideo(null);
            onStartLearning();
          }}
        />
      )}

      {/* Playable Interactive Mini Game Modal */}
      {activeGame && (
        <InteractiveGameModal
          gameId={activeGame.id}
          gameTitle={activeGame.title}
          onClose={() => setActiveGame(null)}
        />
      )}
    </div>
  );
};
