import React, { useState } from 'react';
import { X, Volume2, Sparkles, Check, RefreshCw, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';
import { femaleVoice } from '../../utils/speech';
import { addBonusStars } from '../../utils/studentProgress';
import { recordQuestProgress } from '../../utils/streakManager';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null | undefined;
}

interface Flashcard {
  id: string;
  category: 'primary' | 'middle' | 'secondary';
  topic: string;
  frontTitle: string;
  frontSubtitle: string;
  frontEmoji: string;
  backTitle: string;
  backExplanation: string;
  backFact: string;
}

const FLASHCARD_DECKS: Flashcard[] = [
  // Primary
  {
    id: 'p1',
    category: 'primary',
    topic: 'Opposites',
    frontTitle: 'What is the opposite of HOT? 🔥',
    frontSubtitle: 'Think of ice cream and snow!',
    frontEmoji: '🔥',
    backTitle: 'COLD ❄️',
    backExplanation: 'Ice, snow, and chilled juices are cold! Fire and the sun are hot.',
    backFact: 'Antarctica is the coldest place on Earth!',
  },
  {
    id: 'p2',
    category: 'primary',
    topic: 'Shapes',
    frontTitle: 'Which shape has 3 sides and 3 corners?',
    frontSubtitle: 'Think of a slice of yummy pizza!',
    frontEmoji: '🍕',
    backTitle: 'TRIANGLE 📐',
    backExplanation: 'A triangle always has 3 straight sides and 3 sharp vertices.',
    backFact: 'The great pyramids of Egypt have triangular faces!',
  },
  {
    id: 'p3',
    category: 'primary',
    topic: 'Colors',
    frontTitle: 'What color do you get if you mix RED and BLUE?',
    frontSubtitle: 'Magic color mixing!',
    frontEmoji: '🎨',
    backTitle: 'PURPLE 🍇',
    backExplanation: 'Mixing red and blue paint creates a royal purple color!',
    backFact: 'Eggplants and grapes are naturally purple.',
  },
  {
    id: 'p4',
    category: 'primary',
    topic: 'Animals',
    frontTitle: 'Which is the tallest animal in the whole world? 🦒',
    frontSubtitle: 'Has a very long neck to reach treetop leaves!',
    frontEmoji: '🦒',
    backTitle: 'GIRAFFE 🦒',
    backExplanation: 'A giraffe can be up to 19 feet tall! Their long necks help them eat acacia leaves.',
    backFact: 'A giraffe sleeps only 30 minutes to 2 hours a day!',
  },

  // Middle School
  {
    id: 'm1',
    category: 'middle',
    topic: 'State Capitals',
    frontTitle: 'What is the capital of Maharashtra, India?',
    frontSubtitle: 'The City of Dreams by the Arabian Sea.',
    frontEmoji: '🏙️',
    backTitle: 'MUMBAI 🌊',
    backExplanation: 'Mumbai is the financial capital of India and the capital of Maharashtra.',
    backFact: 'Home to the famous Gateway of India built in 1924.',
  },
  {
    id: 'm2',
    category: 'middle',
    topic: 'Science',
    frontTitle: 'Which green pigment allows plants to make food via photosynthesis?',
    frontSubtitle: 'Absorbs sunlight in the leaves.',
    frontEmoji: '🌿',
    backTitle: 'CHLOROPHYLL 🍃',
    backExplanation: 'Chlorophyll catches red and blue wavelengths from sunlight and reflects green.',
    backFact: 'Plants produce oxygen as a byproduct which all humans breathe!',
  },
  {
    id: 'm3',
    category: 'middle',
    topic: 'Solar System',
    frontTitle: 'Which planet is called the "Red Planet"? 🪐',
    frontSubtitle: 'Covered in rusty iron-oxide dust.',
    frontEmoji: '🔴',
    backTitle: 'MARS 🚀',
    backExplanation: 'Mars looks reddish-orange because of rust (iron oxide) in its rocks and soil.',
    backFact: 'Mars is home to Olympus Mons, the tallest volcano in the solar system!',
  },
  {
    id: 'm4',
    category: 'middle',
    topic: 'Inventions',
    frontTitle: 'Who invented the electric light bulb in 1879?',
    frontSubtitle: 'Famous for trying thousands of filaments.',
    frontEmoji: '💡',
    backTitle: 'THOMAS EDISON 🔌',
    backExplanation: 'Thomas Alva Edison patented the first practical incandescent light bulb.',
    backFact: 'Edison held over 1,000 patents in his lifetime!',
  },

  // Secondary
  {
    id: 's1',
    category: 'secondary',
    topic: 'Chemistry',
    frontTitle: 'What is the chemical symbol for Gold?',
    frontSubtitle: 'From the Latin word "Aurum".',
    frontEmoji: '🪙',
    backTitle: 'Au (Atomic No. 79) ✨',
    backExplanation: 'Gold does not react with air, water, or oxygen and never rusts or tarnishes.',
    backFact: 'Nearly all gold found on Earth came from ancient meteorite bombardments!',
  },
  {
    id: 's2',
    category: 'secondary',
    topic: 'Physics',
    frontTitle: "What is Newton's Second Law of Motion formula?",
    frontSubtitle: 'Relating force, mass, and acceleration.',
    frontEmoji: '⚡',
    backTitle: 'F = m × a ⚖️',
    backExplanation: 'Force equals mass times acceleration. Measured in Newtons (N).',
    backFact: 'A 1 Newton force is roughly equal to holding a medium apple against Earth gravity.',
  },
  {
    id: 's3',
    category: 'secondary',
    topic: 'Mathematics',
    frontTitle: 'What is the fundamental Pythagorean Theorem?',
    frontSubtitle: 'In a right-angled triangle with sides a, b and hypotenuse c.',
    frontEmoji: '📐',
    backTitle: 'a² + b² = c² 🔺',
    backExplanation: 'The square of the hypotenuse is equal to the sum of the squares of the other two sides.',
    backFact: 'Ancient Indian mathematicians described this in the Sulba Sutras hundreds of years earlier!',
  },
  {
    id: 's4',
    category: 'secondary',
    topic: 'History',
    frontTitle: 'In which year did India adopt its official Constitution?',
    frontSubtitle: 'Celebrated every year on Republic Day.',
    frontEmoji: '📜',
    backTitle: '26th JANUARY 1950 🇮🇳',
    backExplanation: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee.',
    backFact: 'The Indian Constitution is the longest handwritten constitution of any sovereign country!',
  },
];

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
  studentId,
}) => {
  const [activeDeck, setActiveDeck] = useState<'primary' | 'middle' | 'secondary'>('primary');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const cards = FLASHCARD_DECKS.filter((c) => c.category === activeDeck);
  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    sound.playPop();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    sound.playPop();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    sound.playPop();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleMastered = () => {
    sound.playDing();
    if (!masteredIds.includes(currentCard.id)) {
      const next = [...masteredIds, currentCard.id];
      setMasteredIds(next);
      addBonusStars(studentId, 10);
      recordQuestProgress(studentId, 'practice', 1);
    }
    handleNext();
  };

  const handleSpeak = () => {
    sound.playPop();
    if (!isFlipped) {
      femaleVoice.speak(currentCard.frontTitle, 'en-US');
    } else {
      femaleVoice.speak(`${currentCard.backTitle}. ${currentCard.backExplanation}`, 'en-US');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-purple-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🎴
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">Flip & Learn Flashcards</h2>
              <p className="text-xs sm:text-sm font-bold text-purple-100">
                Interactive memory cards with instant speech & knowledge facts!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              femaleVoice.stop();
              onClose();
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-3">
          <button
            onClick={() => {
              sound.playPop();
              setActiveDeck('primary');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2.5 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              activeDeck === 'primary'
                ? 'bg-white border-purple-400 text-purple-800 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🐣 Nursery & Primary
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveDeck('middle');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2.5 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              activeDeck === 'middle'
                ? 'bg-white border-purple-400 text-purple-800 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🚀 Middle (Class 3-6)
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveDeck('secondary');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2.5 rounded-t-2xl font-black text-xs sm:text-sm border-t-2 border-x-2 transition cursor-pointer ${
              activeDeck === 'secondary'
                ? 'bg-white border-purple-400 text-purple-800 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🔬 Secondary (Class 7-10)
          </button>
        </div>

        {/* Card Arena */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col items-center justify-between bg-slate-50/50">
          {/* Card Indicator */}
          <div className="w-full flex items-center justify-between text-xs font-black text-slate-500 mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              {currentCard.topic}
            </span>
            <span>
              Card {currentIndex + 1} of {cards.length}
            </span>
            <button
              onClick={handleSpeak}
              className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-purple-600" /> Listen
            </button>
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={handleFlip}
            className="w-full max-w-lg min-h-[260px] sm:min-h-[290px] rounded-3xl bg-white border-4 border-purple-300 shadow-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition-all transform hover:scale-[1.01] relative group"
          >
            <span className="absolute top-4 right-4 text-xs font-black text-purple-500 flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> Tap to Flip
            </span>

            {!isFlipped ? (
              /* Front */
              <div className="space-y-4 animate-fadeIn">
                <span className="text-5xl sm:text-6xl drop-shadow-md">{currentCard.frontEmoji}</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {currentCard.frontTitle}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  {currentCard.frontSubtitle}
                </p>
              </div>
            ) : (
              /* Back */
              <div className="space-y-3 animate-fadeIn">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                  Answer
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-700">
                  {currentCard.backTitle}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                  {currentCard.backExplanation}
                </p>
                <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 mt-2">
                  💡 <span className="font-black">Fun Fact:</span> {currentCard.backFact}
                </div>
              </div>
            )}
          </div>

          {/* Navigation & Mastery Controls */}
          <div className="w-full max-w-lg mt-6 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-black cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleMastered}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> I Mastered This! (+10 ⭐)
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-black cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
