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
  Volume2,
  Star,
  Check,
} from 'lucide-react';
import { HumanBodyGameScreen } from './HumanBodyGameScreen';
import { IslamicTeachingsView } from './IslamicTeachingsView';
import { sound } from '../../utils/audio';
import { femaleVoice } from '../../utils/speech';
import {
  recordSpaceDiscovery,
  recordAnimalDiscovery,
  recordPlantDiscovery,
  getStudentProgress,
} from '../../utils/studentProgress';
import { CertificateModal } from '../common/CertificateModal';

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
  // Certificate Modal state
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [progress, setProgress] = useState(() => getStudentProgress(studentId));

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

  const handleDiscoverSpace = (planetId: string) => {
    sound.playFanfare();
    try {
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.6 } });
    } catch {}
    recordSpaceDiscovery(studentId, planetId);
    setProgress(getStudentProgress(studentId));
  };

  const handleDiscoverAnimal = (animalId: string) => {
    sound.playFanfare();
    try {
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.6 } });
    } catch {}
    recordAnimalDiscovery(studentId, animalId);
    setProgress(getStudentProgress(studentId));
  };

  const handleDiscoverPlant = (plantId: string) => {
    sound.playFanfare();
    try {
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.6 } });
    } catch {}
    recordPlantDiscovery(studentId, plantId);
    setProgress(getStudentProgress(studentId));
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
        id: 'sun',
        name: 'The Sun (الشمس)',
        urduName: 'سورج (کائنات کا روشن چراغ)',
        tagline: 'A giant glowing star of hydrogen & helium!',
        facts: [
          'Over 1.3 million Earths could fit inside the Sun!',
          'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.',
          'Its core temperature reaches a scorching 15 million °C!',
        ],
        icon: '☀️',
        quranRef: 'وَجَعَلْنَا سِرَاجًا وَهَّاجًا - "And We made [therein] a burning lamp."',
        color: 'from-amber-500 to-orange-600',
        distance: '0 km (Center of Solar System)',
        temp: '5,500°C surface',
      },
      {
        id: 'mercury',
        name: 'Mercury (عطارد)',
        urduName: 'سیارہ عطارد (سورج کا تیز ترین پڑوسی)',
        tagline: 'The closest planet to the Sun and fastest runner!',
        facts: [
          'Zips around the Sun in just 88 Earth days!',
          'Has virtually no atmosphere, so skies are always pitch black.',
          'Experiences scorching days (430°C) and freezing nights (-180°C).',
        ],
        icon: '🪨',
        quranRef: 'فَلَا أُقْسِمُ بِالْخُنَّسِ - "So I swear by the retreating stars."',
        color: 'from-stone-500 to-slate-700',
        distance: '58 million km',
        temp: '-180°C to 430°C',
      },
      {
        id: 'venus',
        name: 'Venus (الزهرة)',
        urduName: 'سیارہ زہرہ (سب سے زیادہ چمکدار)',
        tagline: 'The hottest planet wrapped in thick golden clouds!',
        facts: [
          'Hottest planet in our solar system at 465°C due to thick greenhouse atmosphere.',
          'Spins backwards compared to Earth and most other planets!',
          'Shines as the brightest natural object in night sky after the Moon.',
        ],
        icon: '🌋',
        quranRef: 'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ - "By the sky containing great stars."',
        color: 'from-yellow-600 to-amber-700',
        distance: '108 million km',
        temp: '465°C constant',
      },
      {
        id: 'earth',
        name: 'The Earth (الأرض)',
        urduName: 'زمین (ہمارا خوبصورت نیلا گھر)',
        tagline: 'Our magnificent blue planet with liquid oceans and oxygen!',
        facts: [
          '71% of Earth is covered in water and vast life-filled oceans!',
          'Protected by a magnetic shield and life-giving oxygen atmosphere.',
          'Orbits the Sun at an incredible speed of 107,000 km/h!',
        ],
        icon: '🌍',
        quranRef: 'الَّذِي جَعَلَ لَكُمُ الْأَرْضَ مَهْدًا - "He who made for you the earth a bed [spread out]."',
        color: 'from-blue-500 to-teal-600',
        distance: '150 million km',
        temp: '15°C average',
      },
      {
        id: 'moon',
        name: 'The Moon (القمر)',
        urduName: 'چاند (زمین کا روشن پڑوسی)',
        tagline: 'Our faithful celestial neighbor controlling ocean tides!',
        facts: [
          'Reflects sunlight back to Earth and guides lunar calendar months.',
          'Its gravitational pull causes high and low ocean tides on Earth.',
          'Footprints left by astronauts will remain untouched for millions of years.',
        ],
        icon: '🌙',
        quranRef: 'وَالْقَمَرَ نُورًا - "And made the moon a reflected light."',
        color: 'from-indigo-600 to-slate-800',
        distance: '384,400 km',
        temp: '-130°C to 120°C',
      },
      {
        id: 'mars',
        name: 'Mars (المريخ)',
        urduName: 'مریخ (سرخ سیارہ)',
        tagline: 'The Dusty Red Planet with giant volcanoes and rovers!',
        facts: [
          'Gets its striking red color from iron oxide (rust) on its rocky surface.',
          'Home to Olympus Mons, the largest volcano in the entire Solar System!',
          'Has two tiny potato-shaped moons named Phobos and Deimos.',
        ],
        icon: '🔴',
        quranRef: 'وَزَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ - "And We adorned the nearest heaven with lamps."',
        color: 'from-rose-600 to-red-800',
        distance: '228 million km',
        temp: '-60°C average',
      },
      {
        id: 'jupiter',
        name: 'Jupiter (المشتري)',
        urduName: 'مشتری (سیاروں کا دیو قامت بادشاہ)',
        tagline: 'The giant King of Planets with the Great Red Spot storm!',
        facts: [
          'Largest planet in the solar system—over 1,300 Earths could fit inside!',
          'Its famous Great Red Spot is a giant spinning storm bigger than Earth.',
          'Has 95 confirmed moons, including giant Ganymede with a subsurface ocean.',
        ],
        icon: '🪐',
        quranRef: 'إِنَّا زَيَّنَّا السَّمَاءَ الدُّنْيَا بِزِينَةٍ الْكَوَاكِبِ - "Indeed, We have adorned the nearest heaven with an adornment of planets."',
        color: 'from-amber-700 to-orange-800',
        distance: '778 million km',
        temp: '-110°C cloud tops',
      },
      {
        id: 'saturn',
        name: 'Saturn (زحل)',
        urduName: 'زحل (شاندار حلقوں والا سیارہ)',
        tagline: 'The Jewel of the Solar System with majestic icy rings!',
        facts: [
          'Spectacular ring system made of billions of shimmering ice and rock chunks.',
          'Saturn is so light and gas-rich that it could float in a giant cosmic bathtub!',
          'Its giant moon Titan has thick clouds and rivers of liquid methane.',
        ],
        icon: '🪐',
        quranRef: 'وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ - "And the heaven We constructed with strength."',
        color: 'from-yellow-600 to-amber-700',
        distance: '1.4 billion km',
        temp: '-140°C',
      },
      {
        id: 'uranus',
        name: 'Uranus (أورانوس)',
        urduName: 'اورینس (نیلا برفانی سیارہ)',
        tagline: 'The mysterious Ice Giant that rotates on its side!',
        facts: [
          'Rotates completely on its side like a bowling ball rolling through space!',
          'Methane in its upper atmosphere gives it a lovely cyan-blue color.',
          'Coldest planetary atmosphere in the Solar System down to -224°C.',
        ],
        icon: '❄️',
        quranRef: 'وَجَعَلْنَا فِي السَّمَاءِ بُرُوجًا - "And We have placed within the sky constellations."',
        color: 'from-cyan-500 to-blue-600',
        distance: '2.9 billion km',
        temp: '-224°C',
      },
      {
        id: 'neptune',
        name: 'Neptune (نبتون)',
        urduName: 'نیپچون (سب سے دور اور تیز ہواؤں والا)',
        tagline: 'The deep blue windy world with supersonic storms!',
        facts: [
          'Farthest major planet from the Sun; takes 165 Earth years for one orbit!',
          'Experiences the wildest winds in the Solar System, blowing at 2,000 km/h!',
          'Has a giant moon named Triton that shoots icy geysers into space.',
        ],
        icon: '🌊',
        quranRef: 'سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ - "Whatever is in the heavens and earth exalts Allah."',
        color: 'from-blue-700 to-indigo-900',
        distance: '4.5 billion km',
        temp: '-214°C',
      },
    ];

    const currentPlanet = spaceData[selectedPlanet] || spaceData[0];
    const isDiscovered = progress.discoveredSpaceIds?.includes(currentPlanet.id);

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
                Solar System & Space Galaxy
              </h1>
              <p className="text-xs md:text-sm font-extrabold text-indigo-700 font-urdu">
                نظام شمسی اور کائنات کے حیرت انگیز راز
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{progress.discoveredSpaceIds?.length || 0} / 10 Discovered</span>
            </span>
          </div>
        </header>

        {/* 10 Planet Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 p-1">
          {spaceData.map((item, idx) => {
            const disc = progress.discoveredSpaceIds?.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedPlanet(idx);
                }}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  selectedPlanet === idx
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-600 shadow-md scale-105 ring-2 ring-indigo-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-black text-slate-900">{item.name.split(' ')[0]}</h3>
                    {disc && <span className="text-[10px] text-amber-500">⭐</span>}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">{item.distance}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Planet Showcase Card */}
        <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-xl overflow-hidden">
          <div className={`p-6 md:p-8 bg-gradient-to-r ${currentPlanet.color} text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
            <div>
              <span className="text-5xl block mb-2">{currentPlanet.icon}</span>
              <h2 className="text-2xl md:text-3xl font-black">{currentPlanet.name}</h2>
              <p className="text-base font-bold text-white/90 font-urdu mt-0.5">
                {currentPlanet.urduName}
              </p>
              <p className="text-xs md:text-sm text-white/90 font-bold mt-1">
                {currentPlanet.tagline}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playPop();
                  femaleVoice.speak({
                    text: `${currentPlanet.name}. ${currentPlanet.tagline}. Facts: ${currentPlanet.facts.join('. ')}`,
                    lang: 'en',
                  });
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen Facts 🔊</span>
              </button>

              <button
                onClick={() => handleDiscoverSpace(currentPlanet.id)}
                disabled={isDiscovered}
                className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  isDiscovered
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-105'
                }`}
              >
                {isDiscovered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Discovered! (+10 ⭐)</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 fill-slate-950" />
                    <span>Discover Body (+10 ⭐)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Distance</span>
                <span className="text-xs font-black text-slate-800">{currentPlanet.distance}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Temperature</span>
                <span className="text-xs font-black text-slate-800">{currentPlanet.temp}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Exploration</span>
                <span className="text-xs font-black text-blue-600">Active Orbiters</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Status</span>
                <span className="text-xs font-black text-emerald-600">{isDiscovered ? 'Mastered ⭐' : 'Unexplored'}</span>
              </div>
            </div>

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

  // Animals of Quran & Nature View
  if (activeView === 'animals') {
    const animalData = [
      {
        id: 'bee',
        name: 'The Honeybee (النحل)',
        urduName: 'شہد کی مکھی',
        soundKey: 'bird',
        miracle: 'Architect of sweet medicinal honey!',
        facts: [
          'Bees communicate with a special "waggle dance" to show where flowers are!',
          'Builds perfect hexagons with maximum strength and minimal wax.',
          'Quran chapter 16 is named Surah An-Nahl after the bee!',
        ],
        icon: '🐝',
        color: 'from-amber-500 to-yellow-600',
        habitat: 'Gardens & Meadows',
      },
      {
        id: 'ant',
        name: 'The Ant (النمل)',
        urduName: 'چیونٹی',
        soundKey: 'frog',
        miracle: 'The tiny team worker with superhero strength!',
        facts: [
          'Can carry up to 50 times their own body weight!',
          'Surah An-Naml recounts Prophet Sulaiman (A.S.) hearing an ant talk!',
          'Live in organized underground colonies with air conditioning tunnels!',
        ],
        icon: '🐜',
        color: 'from-red-600 to-amber-700',
        habitat: 'Underground Colonies',
      },
      {
        id: 'camel',
        name: 'The Camel (الإبل)',
        urduName: 'اونٹ (صحرا کا جہاز)',
        soundKey: 'elephant',
        miracle: 'Master of desert survival!',
        facts: [
          'Stores fat in its hump to produce water and energy during long desert journeys.',
          'Has 3 eyelids and two rows of long eyelashes to shield against sandstorms.',
          'Surah Al-Ghashiyah asks us to reflect upon how the camel was created!',
        ],
        icon: '🐪',
        color: 'from-amber-600 to-orange-700',
        habitat: 'Sandy Deserts',
      },
      {
        id: 'whale',
        name: 'The Blue Whale (الحوت)',
        urduName: 'وہیل مچھلی (سمندر کا بادشاہ)',
        soundKey: 'dolphin',
        miracle: 'The gentle giant of the deep blue seas!',
        facts: [
          'Blue whales are the largest creatures to ever live on planet Earth!',
          'Prophet Yunus (A.S.) was saved inside the belly of a great whale.',
          'Can communicate across thousands of miles using melodic whale songs.',
        ],
        icon: '🐋',
        color: 'from-blue-600 to-cyan-700',
        habitat: 'Deep Oceans',
      },
      {
        id: 'lion',
        name: 'The Lion (الأسد)',
        urduName: 'شیر (جنگل کا باوقار بادشاہ)',
        soundKey: 'lion',
        miracle: 'Courageous leader and symbol of majesty!',
        facts: [
          'A lion\'s mighty roar can be heard from up to 8 kilometers (5 miles) away!',
          'Lions live in family groups called prides led by fearless lionesses.',
          'Can sprint at speeds up to 80 km/h in short bursts.',
        ],
        icon: '🦁',
        color: 'from-amber-600 to-yellow-700',
        habitat: 'Savannas & Grasslands',
      },
      {
        id: 'elephant',
        name: 'The Elephant (الفيل)',
        urduName: 'ہاتھی (شاندار اور ذہین جانور)',
        soundKey: 'elephant',
        miracle: 'Wisdom, empathy, and remarkable memory!',
        facts: [
          'The elephant\'s trunk has over 40,000 muscles and can pick up a tiny peanut!',
          'Surah Al-Fil (Chapter 105) commemorates the historical Year of the Elephant.',
          'Elephants have legendary long-term memory and mourn lost companions.',
        ],
        icon: '🐘',
        color: 'from-slate-600 to-indigo-700',
        habitat: 'Jungles & Forests',
      },
      {
        id: 'owl',
        name: 'The Owl (البومة)',
        urduName: 'الو (رات کا چوکنا شکاری)',
        soundKey: 'bird',
        miracle: 'Silent flight and super-sharp night vision!',
        facts: [
          'Special feather edges muffle air turbulence for completely silent flight.',
          'Can rotate their heads up to 270 degrees without moving their bodies!',
          'Eyes cannot move in sockets, but night vision is 100 times better than humans.',
        ],
        icon: '🦉',
        color: 'from-purple-600 to-indigo-800',
        habitat: 'Woodlands & Forests',
      },
      {
        id: 'frog',
        name: 'The Tree Frog (الضفدع)',
        urduName: 'مینڈک (پانی اور خشکی کا جادوگر)',
        soundKey: 'frog',
        miracle: 'Amphibian acrobat breathing through skin!',
        facts: [
          'Tree frogs have sticky suction pads on their toes to climb slippery leaves.',
          'Can jump over 20 times their body length in a single bound!',
          'Can absorb clean oxygen directly through their moist skin.',
        ],
        icon: '🐸',
        color: 'from-emerald-600 to-green-700',
        habitat: 'Rainforest Ponds',
      },
      {
        id: 'monkey',
        name: 'The Monkey (القرد)',
        urduName: 'بندر (چست اور ذہین کھلاڑی)',
        soundKey: 'monkey',
        miracle: 'Agile problem solver with curious mind!',
        facts: [
          'Uses tools like stones and twigs to crack open nuts and reach honey.',
          'Has opposable thumbs to grasp branches and peel fruits effortlessly.',
          'Highly social and communicates with expressive facial gestures.',
        ],
        icon: '🐒',
        color: 'from-orange-600 to-amber-700',
        habitat: 'Tropical Rainforests',
      },
      {
        id: 'dolphin',
        name: 'The Dolphin (الدلفين)',
        urduName: 'ڈولفن (سمندر کا سب سے پیارا دوست)',
        soundKey: 'dolphin',
        miracle: 'Genius echolocation and playful companionship!',
        facts: [
          'Uses biological sonar (echolocation) clicks to "see" underwater objects.',
          'Never fully sleeps—keeps one half of its brain awake to surface and breathe!',
          'Known to rescue human swimmers and protect them from predators.',
        ],
        icon: '🐬',
        color: 'from-cyan-500 to-blue-600',
        habitat: 'Warm Ocean Waters',
      },
    ];

    const currentAnimal = animalData[selectedAnimal] || animalData[0];
    const isAnimalDiscovered = progress.discoveredAnimalIds?.includes(currentAnimal.id);

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
                Animal World & Interactive Soundboard
              </h1>
              <p className="text-xs md:text-sm font-extrabold text-emerald-700 font-urdu">
                جانوروں کی دنیا، آوازیں اور قدرتی کمالات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{progress.discoveredAnimalIds?.length || 0} / 10 Discovered</span>
            </span>
          </div>
        </header>

        {/* 10 Animal Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 p-1">
          {animalData.map((item, idx) => {
            const disc = progress.discoveredAnimalIds?.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedAnimal(idx);
                }}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  selectedAnimal === idx
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-600 shadow-md scale-105 ring-2 ring-emerald-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-black text-slate-900">{item.name.split(' ')[1] || item.name}</h3>
                    {disc && <span className="text-[10px] text-amber-500">⭐</span>}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">{item.habitat.split(' ')[0]}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Animal Showcase Card */}
        <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-xl overflow-hidden">
          <div className={`p-6 md:p-8 bg-gradient-to-r ${currentAnimal.color} text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
            <div>
              <span className="text-5xl block mb-2">{currentAnimal.icon}</span>
              <h2 className="text-2xl md:text-3xl font-black">{currentAnimal.name}</h2>
              <p className="text-base font-bold text-white/90 font-urdu mt-0.5">
                {currentAnimal.urduName}
              </p>
              <p className="text-xs md:text-sm text-white/90 font-bold mt-1">
                {currentAnimal.miracle}
              </p>
            </div>

            {/* Animal Sounds & Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => sound.playAnimalSound(currentAnimal.soundKey)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                <span>Play Sound 🔊</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  femaleVoice.speak({
                    text: `${currentAnimal.name}. ${currentAnimal.miracle}. Facts: ${currentAnimal.facts.join('. ')}`,
                    lang: 'en',
                  });
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen Facts</span>
              </button>

              <button
                onClick={() => handleDiscoverAnimal(currentAnimal.id)}
                disabled={isAnimalDiscovered}
                className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  isAnimalDiscovered
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-105'
                }`}
              >
                {isAnimalDiscovered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Discovered! (+10 ⭐)</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 fill-slate-950" />
                    <span>Discover Animal (+10 ⭐)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Natural Habitat</span>
                <span className="text-xs font-black text-slate-800">{currentAnimal.habitat}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Animal Call</span>
                <span className="text-xs font-black text-blue-600">Audio Synthesized 🔊</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Discovery Badge</span>
                <span className="text-xs font-black text-emerald-600">{isAnimalDiscovered ? 'Mastered ⭐' : 'Click to Discover'}</span>
              </div>
            </div>

            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Biological Marvels & Animal Facts:
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

  // Plants & Botany View
  if (activeView === 'plants') {
    const plantData = [
      {
        id: 'roots',
        name: 'The Plant Roots (الجذور)',
        urduName: 'جڑیں (پودے کی مضبوط بنیاد)',
        facts: [
          'Anchor the plant firmly into the soil and absorb water and dissolved minerals.',
          'Root hairs increase surface area to drink nourishment from underground soil.',
          'Some roots like carrots and radishes store healthy food for winter.',
        ],
        icon: '🪵',
        color: 'from-amber-700 to-stone-800',
        function: 'Water & Mineral Absorption',
      },
      {
        id: 'stem',
        name: 'The Stem & Trunk (الساق)',
        urduName: 'تنا (خوراک اور پانی کی شاہراہ)',
        facts: [
          'Acts as an elevator with tiny tubes (xylem and phloem) pumping water up and sugars down.',
          'Holds up branches and green leaves high so they can catch warm sunlight.',
          'Tree trunks grow annual rings that reveal the tree\'s exact age!',
        ],
        icon: '🎋',
        color: 'from-emerald-700 to-green-800',
        function: 'Highway of Nutrients',
      },
      {
        id: 'leaves',
        name: 'The Green Leaves (الأوراق)',
        urduName: 'پتے (پودے کا قدرتی باورچی خانہ)',
        facts: [
          'Contain green chlorophyll to perform photosynthesis using sunlight and air!',
          'Breathe in carbon dioxide and exhale fresh life-giving oxygen for humans and animals.',
          'Tiny pores called stomata open and close to control plant water loss.',
        ],
        icon: '🍃',
        color: 'from-green-600 to-teal-700',
        function: 'Food Factory / Photosynthesis',
      },
      {
        id: 'flower',
        name: 'The Blooming Flower (الزهرة)',
        urduName: 'پھول (رنگ و خوشبو کا مسکن)',
        facts: [
          'Bright colorful petals and sweet nectar attract bees and butterflies for pollination.',
          'Contains reproductive parts (stamen and pistil) that turn into fruits and seeds.',
          'Different flowers bloom at dawn, noon, or night to welcome specific pollinators.',
        ],
        icon: '🌸',
        color: 'from-pink-500 to-rose-600',
        function: 'Pollination & Beauty',
      },
      {
        id: 'seeds',
        name: 'Seeds & Fruits (البذور والثمار)',
        urduName: 'بیج اور پھل (نئی زندگی کی شروعات)',
        facts: [
          'Every tiny seed carries a dormant baby plant and packed baby food inside!',
          'Fruits protect seeds and tempt animals to eat them and disperse seeds far away.',
          'When watered and warmed by sunshine, seeds burst with new life in germination.',
        ],
        icon: '🌰',
        color: 'from-yellow-600 to-amber-700',
        function: 'Life Cycle Continuation',
      },
      {
        id: 'olive',
        name: 'The Olive (الزيتون)',
        urduName: 'زیتون (مبارک درخت کا پھل)',
        facts: [
          'Olive oil is full of healthy fats and polyphenols that protect the heart.',
          'Olive trees can live for more than 2,000 years in Mediterranean climates!',
          'Mentioned in Surah An-Nur as coming from a blessed tree (شَجَرَةٍ مُّبَارَكَةٍ).',
        ],
        icon: '🫒',
        color: 'from-lime-600 to-emerald-700',
        function: 'Blessed Oil & Stamina',
      },
      {
        id: 'date',
        name: 'The Date Palm (النخيل)',
        urduName: 'کھجور (توانائی اور صحت کا خزانہ)',
        facts: [
          'Full of natural sugars, fiber, potassium, and magnesium for instant physical stamina.',
          'Prophet Muhammad ﷺ loved dates and broke fast with fresh ripe dates.',
          'Date palms thrive in dry desert sands with deep anchoring roots reaching water tables.',
        ],
        icon: '🌴',
        color: 'from-amber-600 to-yellow-700',
        function: 'Desert Superfood',
      },
      {
        id: 'fig',
        name: 'The Fig (التين)',
        urduName: 'انجیر (قدرتی مٹھاس اور ہاضمہ)',
        facts: [
          'Allah swears by the fig and olive in Surah At-Tin (وَالتِّينِ وَالزَّيْتُونِ).',
          'Rich in dietary fiber and calcium for digestive strength and strong bones.',
          'One of the oldest cultivated crops in human civilization.',
        ],
        icon: '🌱',
        color: 'from-purple-600 to-teal-700',
        function: 'Digestive & Bone Health',
      },
      {
        id: 'pomegranate',
        name: 'The Pomegranate (الرمان)',
        urduName: 'انار (جنت کے باغات کا پھل)',
        facts: [
          'Each pomegranate contains hundreds of juicy ruby seeds called arils.',
          'Packed with antioxidants that boost immunity and nourish blood circulation.',
          'Mentioned in Surah Ar-Rahman as a sacred fruit of Paradise!',
        ],
        icon: '🍇',
        color: 'from-rose-600 to-red-700',
        function: 'Heart & Blood Vitality',
      },
    ];

    const currentPlant = plantData[selectedPlant] || plantData[0];
    const isPlantDiscovered = progress.discoveredPlantIds?.includes(currentPlant.id);

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
                Plants Anatomy & Nature Wonders
              </h1>
              <p className="text-xs md:text-sm font-extrabold text-lime-700 font-urdu">
                پودوں کے اعضاء، نباتاتی نظام اور ان کے عجائبات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-lime-100 text-lime-800 text-xs font-black flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{progress.discoveredPlantIds?.length || 0} / 9 Discovered</span>
            </span>
          </div>
        </header>

        {/* Plant Part Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 p-1">
          {plantData.map((item, idx) => {
            const disc = progress.discoveredPlantIds?.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedPlant(idx);
                }}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  selectedPlant === idx
                    ? 'bg-gradient-to-r from-lime-50 to-emerald-50 border-lime-600 shadow-md scale-105 ring-2 ring-lime-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-black text-slate-900">{item.name.split(' ')[1] || item.name}</h3>
                    {disc && <span className="text-[10px] text-amber-500">⭐</span>}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">{item.function.split(' ')[0]}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Plant Showcase Card */}
        <div className="bg-white rounded-3xl border-2 border-lime-200 shadow-xl overflow-hidden">
          <div className={`p-6 md:p-8 bg-gradient-to-r ${currentPlant.color} text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
            <div>
              <span className="text-5xl block mb-2">{currentPlant.icon}</span>
              <h2 className="text-2xl md:text-3xl font-black">{currentPlant.name}</h2>
              <p className="text-base font-bold text-white/90 font-urdu mt-0.5">
                {currentPlant.urduName}
              </p>
              <p className="text-xs md:text-sm text-white/90 font-bold mt-1">
                Function: {currentPlant.function}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playPop();
                  femaleVoice.speak({
                    text: `${currentPlant.name}. Function: ${currentPlant.function}. Facts: ${currentPlant.facts.join('. ')}`,
                    lang: 'en',
                  });
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen Secrets 🔊</span>
              </button>

              <button
                onClick={() => handleDiscoverPlant(currentPlant.id)}
                disabled={isPlantDiscovered}
                className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                  isPlantDiscovered
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:scale-105'
                }`}
              >
                {isPlantDiscovered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Discovered! (+10 ⭐)</span>
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 fill-slate-950" />
                    <span>Discover Part (+10 ⭐)</span>
                  </>
                )}
              </button>
            </div>
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

        {/* Global Hub Badge & Certificate Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playFanfare();
              setIsCertOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-slate-950" />
            <span>Explorer Certificate 🎓</span>
          </button>

          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 px-4 py-2 rounded-2xl shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black text-amber-950">4 Discovery Labs</span>
          </div>
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

      {/* Explorer Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        studentName="Junior Explorer"
        achievementTitle="Master of Solar System, Animals & Botany"
        starsEarned={progress.starsEarned || 150}
      />
    </div>
  );
};
