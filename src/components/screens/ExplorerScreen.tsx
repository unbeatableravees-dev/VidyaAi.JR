import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  Sparkles,
  ArrowRight,
  BookOpen,
  Heart,
  Globe,
  Sun,
  Moon,
  Flame,
  Award,
  ArrowLeft,
  Move,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { HumanBodyGameScreen } from './HumanBodyGameScreen';
import { IslamicTeachingsView } from './IslamicTeachingsView';
import { sound } from '../../utils/audio';

interface ExplorerScreenProps {
  studentId?: string;
  onBackToHome?: () => void;
  onOpenPractice?: () => void;
  initialModule?: 'body' | 'islamic' | 'space' | 'animals' | 'plants';
}

type ExplorerView = 'hub' | 'body' | 'islamic' | 'space' | 'animals' | 'plants';

export const ExplorerScreen: React.FC<ExplorerScreenProps> = ({
  studentId,
  onBackToHome,
  onOpenPractice,
  initialModule,
}) => {
  const [activeView, setActiveView] = useState<ExplorerView>(initialModule || 'hub');

  // Space module selected planet state
  const [selectedPlanet, setSelectedPlanet] = useState<number>(0);
  // Animals module selected animal
  const [selectedAnimal, setSelectedAnimal] = useState<number>(0);
  // Plants module selected plant
  const [selectedPlant, setSelectedPlant] = useState<number>(0);

  const handleLaunchModule = (view: ExplorerView) => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
      });
    } catch {
      // Ignore
    }
    setActiveView(view);
  };

  // If Body Explorer is active
  if (activeView === 'body') {
    return (
      <HumanBodyGameScreen
        studentId={studentId}
        onBackToExplorerHub={() => setActiveView('hub')}
        onBackToHome={onBackToHome}
        onOpenPractice={onOpenPractice}
      />
    );
  }

  // If Islamic Teachings is active
  if (activeView === 'islamic') {
    return (
      <IslamicTeachingsView
        studentId={studentId}
        onBackToExplorerHub={() => setActiveView('hub')}
        onBackToHome={onBackToHome}
      />
    );
  }

  // Space Explorer View
  if (activeView === 'space') {
    const spaceData = [
      {
        name: 'The Sun (الشمس)',
        urduName: 'سورج (کائنات کا روشن چراغ)',
        tagline: 'A giant glowing ball of hydrogen & helium!',
        facts: [
          'Over 1 million Earths could fit inside the Sun!',
          'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.',
          'Its core temperature reaches a scorching 15 million °C!',
        ],
        icon: '☀️',
        quranRef: 'وَجَعَلْنَا سِرَاجًا وَهَّاجًا - "And We made [therein] a burning lamp."',
        color: 'from-amber-500 to-orange-600',
      },
      {
        name: 'The Earth (الأرض)',
        urduName: 'زمین (ہمارا خوبصورت نیلا گھر)',
        tagline: 'The only known planet in the universe with living creatures and oceans!',
        facts: [
          '71% of Earth is covered in water!',
          'Protected by a magnetic field and an atmosphere full of breathable oxygen.',
          'Orbits the Sun at an incredible speed of 107,000 km/h!',
        ],
        icon: '🌍',
        quranRef: 'الَّذِي جَعَلَ لَكُمُ الْأَرْضَ مَهْدًا - "He who made for you the earth a bed [spread out]."',
        color: 'from-blue-500 to-teal-600',
      },
      {
        name: 'The Moon (القمر)',
        urduName: 'چاند (رات کی خوبصورت چاندنی)',
        tagline: 'Our faithful celestial neighbor controlling the ocean tides!',
        facts: [
          'The Moon does not make its own light; it reflects the bright sunlight.',
          'Its gravitational pull causes the high and low ocean tides on Earth.',
          'Footprints left by astronauts on the moon will stay there for millions of years!',
        ],
        icon: '🌙',
        quranRef: 'وَالْقَمَرَ نُورًا - "And made the moon a reflected light."',
        color: 'from-indigo-600 to-slate-800',
      },
      {
        name: 'Stars & Galaxies (النجوم)',
        urduName: 'ستارے اور کہکشائیں',
        tagline: 'Trillions of sparkling wonders lighting up the cosmic sky!',
        facts: [
          'There are more stars in the observable universe than grains of sand on all the beaches of Earth!',
          'Our solar system belongs to the majestic spiral Milky Way galaxy.',
          'Ancient sailors navigated vast seas at night using the North Star (Polaris).',
        ],
        icon: '✨',
        quranRef: 'وَبِالنَّجْمِ هُمْ يَهْتَدُونَ - "And by the stars they guide themselves."',
        color: 'from-purple-600 to-pink-700',
      },
    ];

    const currentPlanet = spaceData[selectedPlanet];

    return (
      <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-5 select-none">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-indigo-200/90 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                setActiveView('hub');
              }}
              className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="text-xs font-black hidden sm:inline">Explorer Hub</span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
              🪐
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Solar System & Cosmic Wonders
              </h1>
              <p className="text-xs md:text-sm font-extrabold text-indigo-700 font-urdu">
                نظام شمسی اور کائنات کے حیرت انگیز راز
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {spaceData.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => {
                sound.playPop();
                setSelectedPlanet(idx);
              }}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer text-left flex items-center gap-3 ${
                selectedPlanet === idx
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-600 shadow-md scale-102 ring-2 ring-indigo-400/40'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h3 className="text-xs font-black text-slate-900">{item.name}</h3>
                <p className="text-[11px] font-bold text-slate-500 font-urdu">{item.urduName}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Planet Showcase */}
        <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-xl overflow-hidden">
          <div className={`p-6 bg-gradient-to-r ${currentPlanet.color} text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-4xl block mb-2">{currentPlanet.icon}</span>
                <h2 className="text-2xl md:text-3xl font-black">{currentPlanet.name}</h2>
                <p className="text-base font-bold text-white/90 font-urdu mt-0.5">
                  {currentPlanet.urduName}
                </p>
                <p className="text-xs md:text-sm text-white/80 font-bold mt-1">
                  {currentPlanet.tagline}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
              <span className="text-[10px] font-black uppercase text-indigo-800 tracking-wider block mb-1">
                📖 Reflection from the Holy Quran (قرآنی رہنمائی)
              </span>
              <p className="text-sm font-bold text-indigo-950 font-arabic leading-relaxed">
                {currentPlanet.quranRef}
              </p>
            </div>

            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Mind-Blowing Space Facts:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentPlanet.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-700 flex items-start gap-2"
                >
                  <span className="text-indigo-600 font-black">✦</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Animals of Quran View
  if (activeView === 'animals') {
    const animalData = [
      {
        name: 'The Honeybee (النحل)',
        urduName: 'شہد کی مکھی',
        miracle: 'Architect of sweet medicinal honey!',
        facts: [
          'Bees communicate with a special "waggle dance" to show where flowers are!',
          'Builds perfect hexagons with maximum strength and minimal wax.',
          'Quran chapter 16 is named Surah An-Nahl after the bee!',
        ],
        icon: '🐝',
        color: 'from-amber-500 to-yellow-600',
      },
      {
        name: 'The Ant (النمل)',
        urduName: 'چیونٹی',
        miracle: 'The tiny team worker with superhero strength!',
        facts: [
          'Can carry up to 50 times their own body weight!',
          'Surah An-Naml (Chapter 27) recounts Prophet Sulaiman (A.S.) hearing an ant talk!',
          'Live in highly organized underground colonies with air conditioning tunnels!',
        ],
        icon: '🐜',
        color: 'from-red-600 to-amber-700',
      },
      {
        name: 'The Camel (الإبل)',
        urduName: 'اونٹ (صحرا کا جہاز)',
        miracle: 'Master of desert survival!',
        facts: [
          'Stores fat in its hump to produce water and energy during long desert journeys.',
          'Has 3 eyelids and two rows of long eyelashes to shield against desert sandstorms.',
          'Surah Al-Ghashiyah asks us to reflect upon how the camel was created!',
        ],
        icon: '🐪',
        color: 'from-amber-600 to-orange-700',
      },
      {
        name: 'The Whale (الحوت)',
        urduName: 'وہیل مچھلی',
        miracle: 'The gentle giant of the deep blue seas!',
        facts: [
          'Blue whales are the largest creatures to ever live on Earth!',
          'Prophet Yunus (A.S.) was saved inside the belly of a great whale.',
          'Can communicate across thousands of miles of ocean using beautiful whale songs.',
        ],
        icon: '🐋',
        color: 'from-blue-600 to-cyan-700',
      },
    ];

    const currentAnimal = animalData[selectedAnimal];

    return (
      <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-5 select-none">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-emerald-200/90 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                setActiveView('hub');
              }}
              className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="text-xs font-black hidden sm:inline">Explorer Hub</span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
              🦁
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Animals of the Quran & Nature
              </h1>
              <p className="text-xs md:text-sm font-extrabold text-emerald-700 font-urdu">
                قرآن کریم میں ذکر کیے گئے جانور اور ان کے عجائبات
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {animalData.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => {
                sound.playPop();
                setSelectedAnimal(idx);
              }}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer text-left flex items-center gap-3 ${
                selectedAnimal === idx
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-600 shadow-md scale-102 ring-2 ring-emerald-400/40'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300'
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h3 className="text-xs font-black text-slate-900">{item.name}</h3>
                <p className="text-[11px] font-bold text-slate-500 font-urdu">{item.urduName}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-xl overflow-hidden">
          <div className={`p-6 bg-gradient-to-r ${currentAnimal.color} text-white`}>
            <span className="text-4xl block mb-2">{currentAnimal.icon}</span>
            <h2 className="text-2xl md:text-3xl font-black">{currentAnimal.name}</h2>
            <p className="text-base font-bold text-white/90 font-urdu mt-0.5">
              {currentAnimal.urduName}
            </p>
            <p className="text-xs md:text-sm text-white/80 font-bold mt-1">
              {currentAnimal.miracle}
            </p>
          </div>

          <div className="p-6 space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Biological Marvels & Facts:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentAnimal.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs font-extrabold text-slate-700 flex items-start gap-2"
                >
                  <span className="text-emerald-600 font-black">🐾</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Plants of Quran View
  if (activeView === 'plants') {
    const plantData = [
      {
        name: 'The Olive (الزيتون)',
        urduName: 'زیتون (مبارک درخت کا پھل)',
        facts: [
          'Olive oil is full of healthy fats that protect the heart.',
          'Olive trees can live for more than 2,000 years!',
          'Mentioned in Surah An-Nur as coming from a blessed tree (شَجَرَةٍ مُّبَارَكَةٍ).',
        ],
        icon: '🫒',
        color: 'from-lime-600 to-emerald-700',
      },
      {
        name: 'The Date Palm (النخيل)',
        urduName: 'کھجور (توانائی اور صحت کا خزانہ)',
        facts: [
          'Full of natural sugars, fiber, potassium, and magnesium for instant stamina.',
          'Prophet Muhammad ﷺ loved dates and broke fast with fresh dates.',
          'Date trees thrive in arid desert sands with deep anchoring roots.',
        ],
        icon: '🌴',
        color: 'from-amber-600 to-yellow-700',
      },
      {
        name: 'The Pomegranate (الرمان)',
        urduName: 'انار (جنت کے باغات کا پھل)',
        facts: [
          'Each pomegranate contains hundreds of juicy ruby seeds called arils.',
          'Packed with antioxidants that strengthen memory and blood flow.',
          'Mentioned in Surah Ar-Rahman as a fruit of Paradise!',
        ],
        icon: '🍇',
        color: 'from-rose-600 to-red-700',
      },
      {
        name: 'The Fig (التين)',
        urduName: 'انجیر',
        facts: [
          'Allah swears by the fig and olive in Surah At-Tin (وَالتِّينِ وَالزَّيْتُونِ).',
          'Rich in dietary fiber and calcium for digestive strength and strong teeth.',
          'One of the oldest cultivated crops in human history.',
        ],
        icon: '🌱',
        color: 'from-purple-600 to-teal-700',
      },
    ];

    const currentPlant = plantData[selectedPlant];

    return (
      <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-5 select-none">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-lime-200/90 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                setActiveView('hub');
              }}
              className="p-2.5 rounded-2xl bg-lime-50 text-lime-800 hover:bg-lime-100 border border-lime-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="text-xs font-black hidden sm:inline">Explorer Hub</span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-600 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
              🌿
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Blessed Plants & Fruits of Nature
              </h1>
              <p className="text-xs md:text-sm font-extrabold text-lime-700 font-urdu">
                قرآنی پھل، نباتات اور ان کے طبی فوائد
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {plantData.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => {
                sound.playPop();
                setSelectedPlant(idx);
              }}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer text-left flex items-center gap-3 ${
                selectedPlant === idx
                  ? 'bg-gradient-to-r from-lime-50 to-emerald-50 border-lime-600 shadow-md scale-102 ring-2 ring-lime-400/40'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-lime-300'
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h3 className="text-xs font-black text-slate-900">{item.name}</h3>
                <p className="text-[11px] font-bold text-slate-500 font-urdu">{item.urduName}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl border-2 border-lime-200 shadow-xl overflow-hidden">
          <div className={`p-6 bg-gradient-to-r ${currentPlant.color} text-white`}>
            <span className="text-4xl block mb-2">{currentPlant.icon}</span>
            <h2 className="text-2xl md:text-3xl font-black">{currentPlant.name}</h2>
            <p className="text-base font-bold text-white/90 font-urdu mt-0.5">
              {currentPlant.urduName}
            </p>
          </div>

          <div className="p-6 space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Nutritional & Botanical Secrets:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentPlant.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-lime-50/50 border border-lime-100 text-xs font-extrabold text-slate-700 flex items-start gap-2"
                >
                  <span className="text-lime-600 font-black">🍃</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MASTER EXPLORER HUB (The default cards view) ---
  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Top Header Banner */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-5 rounded-3xl border-2 border-blue-200/90 shadow-lg">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={() => {
                sound.playPop();
                onBackToHome();
              }}
              className="p-2.5 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all hover:scale-105 cursor-pointer shadow-sm"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
            🧭
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Explorer Discovery Hub
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-wider">
                Discovery Cards
              </span>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-slate-500">
              علم و دریافت کا مرکز • 3D Real Human Body, Solar System, Animals & Botany!
            </p>
          </div>
        </div>

        {/* Global Hub Badge */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 px-4 py-2 rounded-2xl shadow-sm">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-black text-amber-950">4 Discovery Labs</span>
        </div>
      </header>

      {/* Hero 2 Primary Featured Interactive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: 3D REAL HUMAN BODY ANATOMY EXPLORER */}
        <div
          onClick={() => handleLaunchModule('body')}
          className="group relative bg-gradient-to-br from-blue-600 via-indigo-700 to-sky-700 rounded-3xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border-2 border-blue-300/60 overflow-hidden flex flex-col justify-between"
        >
          {/* 3D Visual Floating Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute -bottom-10 -right-6 text-9xl opacity-15 pointer-events-none select-none group-hover:rotate-6 transition-transform duration-500">
            🫀
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                Real Body & 3D Scanner
              </span>
              <span className="text-3xl animate-bounce">🫀</span>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">
                Real Human Body Anatomy 3D
              </h2>
              <p className="text-base font-bold text-cyan-200 font-urdu mt-1">
                حقیقی انسانی جسم • 3D جلد، اعضاء، شریانیں اور رگیں
              </p>
              <p className="text-xs md:text-sm font-extrabold text-blue-100 mt-2 leading-relaxed">
                Experience the lifelike human body model with natural skin shading, surface musculature, and interactive X-Ray slider. Explore 50 A-to-Z organs, pulsing heart, and drag-and-drop scanner!
              </p>
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <span className="block text-lg font-black">50+</span>
                <span className="text-[10px] font-bold text-blue-200 uppercase">Organs & Vessels</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <span className="block text-lg font-black">Real</span>
                <span className="text-[10px] font-bold text-blue-200 uppercase">Skin & Muscles</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <span className="block text-lg font-black">Drag</span>
                <span className="text-[10px] font-bold text-blue-200 uppercase">& Drop Scanner</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
            <span className="text-xs font-black text-blue-100 flex items-center gap-1">
              <Move className="w-3.5 h-3.5" />
              Realistic Body & Scanner
            </span>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-blue-700 group-hover:bg-cyan-300 font-black text-xs shadow-lg transition-all cursor-pointer">
              <span>Open 3D Body</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: SOLAR SYSTEM & COSMOS */}
        <div
          onClick={() => handleLaunchModule('space')}
          className="group relative bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border-2 border-indigo-400/60 overflow-hidden flex flex-col justify-between"
        >
          {/* Visual Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute -bottom-10 -right-6 text-9xl opacity-15 pointer-events-none select-none group-hover:rotate-6 transition-transform duration-500">
            🪐
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                Cosmic Astronomy
              </span>
              <span className="text-3xl animate-bounce">🪐</span>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">
                Solar System & Galaxies
              </h2>
              <p className="text-base font-bold text-indigo-200 font-urdu mt-1">
                نظام شمسی، سورج، زمین اور ستاروں کی دنیا
              </p>
              <p className="text-xs md:text-sm font-extrabold text-indigo-100 mt-2 leading-relaxed">
                Take a voyage through our solar system! Explore the burning Sun, our blue planet Earth, the lunar Moon, and trillions of sparkling stars across distant galaxies.
              </p>
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <span className="block text-lg font-black">8</span>
                <span className="text-[10px] font-bold text-indigo-200 uppercase">Planets</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <span className="block text-lg font-black">15M°</span>
                <span className="text-[10px] font-bold text-indigo-200 uppercase">Sun Heat</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <span className="block text-lg font-black">Milky Way</span>
                <span className="text-[10px] font-bold text-indigo-200 uppercase">Our Galaxy</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
            <span className="text-xs font-black text-indigo-100 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              Cosmic Facts & Science
            </span>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-indigo-900 group-hover:bg-amber-300 group-hover:text-amber-950 font-black text-xs shadow-lg transition-all cursor-pointer">
              <span>Explore Cosmos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Row of 2 Additional Discovery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 3: Animals of the World */}
        <div
          onClick={() => handleLaunchModule('animals')}
          className="group p-6 rounded-3xl bg-white hover:bg-slate-50 border-2 border-amber-200 hover:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl shadow-md mb-3 group-hover:scale-110 transition-transform">
              🦁
            </div>
            <h3 className="text-lg font-black text-slate-900">Animals & Wildlife of the Earth</h3>
            <p className="text-xs font-bold text-amber-700 font-urdu mt-0.5">
              حیوانات، جانور اور ان کے قدرتی عجائبات
            </p>
            <p className="text-xs font-extrabold text-slate-500 mt-2 leading-relaxed">
              Discover the Honeybee, Ant, Desert Camel, and Great Blue Whale with their biological superpowers and survival adaptations.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
            <span>Discover Animals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Blessed Plants & Botany */}
        <div
          onClick={() => handleLaunchModule('plants')}
          className="group p-6 rounded-3xl bg-white hover:bg-slate-50 border-2 border-lime-200 hover:border-lime-400 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-500 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-md mb-3 group-hover:scale-110 transition-transform">
              🌿
            </div>
            <h3 className="text-lg font-black text-slate-900">Plants, Botany & Natural Fruits</h3>
            <p className="text-xs font-bold text-lime-700 font-urdu mt-0.5">
              نباتات، درخت، پھل اور قدرتی غذائیت
            </p>
            <p className="text-xs font-extrabold text-slate-500 mt-2 leading-relaxed">
              Learn about Olives, Date Palms, Pomegranates, and Figs, their botanical benefits, and nutritional secrets for healthy living.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-lime-600">
            <span>Discover Botany</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
