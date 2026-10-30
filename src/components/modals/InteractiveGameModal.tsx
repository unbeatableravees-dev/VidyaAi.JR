import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { X, Star, Trophy, RotateCcw, Check, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

export type GameType =
  | 'p-pop'
  | 'p-colour'
  | 'p-shapes'
  | 'p-pattern'
  | 'p-alphabets'
  | 'p-numbers'
  | 'balloon-pop'
  | 'math-quest'
  | 'memory-match'
  | 'fraction-factory'
  | 'trace'
  | 'general';

interface InteractiveGameModalProps {
  gameId: string;
  gameTitle: string;
  userGrade?: string;
  onClose: () => void;
  onWin?: () => void;
}

interface ChallengeQuestion {
  question: string;
  visual: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface MemoryCard {
  id: number;
  pair: string;
  name: string;
  urduName: string;
  emoji: string;
  quote: string;
  matched: boolean;
}

interface FruitVegItem {
  id: string;
  name: string;
  urduName: string;
  emoji: string;
  quote: string;
}

const FRUIT_VEG_ITEMS: FruitVegItem[] = [
  {
    id: 'carrot',
    name: 'Carrot',
    urduName: 'گاجر',
    emoji: '🥕',
    quote: '🥕 Crunchy Carrots! "Carrots are packed with Vitamin A for superhero eyesight and glowing skin!" (گاجر کھائیں اور بینائی تیز بنائیں!)',
  },
  {
    id: 'apple',
    name: 'Apple',
    urduName: 'سیب',
    emoji: '🍎',
    quote: '🍎 Sweet Apples! "An apple a day keeps the doctor away! Packed with vitamins and all-day energy!" (روزانہ ایک سیب کھائیں، ہمیشہ تندرست رہیں!)',
  },
  {
    id: 'banana',
    name: 'Banana',
    urduName: 'کیلا',
    emoji: '🍌',
    quote: '🍌 Power Bananas! "Rich in potassium to power up your muscles and make you run super fast!" (میٹھے کیلے کھائیں، فوری طاقت پائیں!)',
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    urduName: 'بروکلی',
    emoji: '🥦',
    quote: '🥦 Super Broccoli! "Tiny green trees packed with calcium and iron to make your bones rock-solid!" (بروکلی کھا کر ہڈیوں کو فولادی بنائیں!)',
  },
  {
    id: 'tomato',
    name: 'Tomato',
    urduName: 'ٹماٹر',
    emoji: '🍅',
    quote: '🍅 Juicy Tomatoes! "Full of lycopene and vitamin C to keep your heart smiling and cheeks glowing red!" (سرخ ٹماٹر کھائیں اور صحت مند مسکراہٹ پائیں!)',
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    urduName: 'سٹرابیری',
    emoji: '🍓',
    quote: '🍓 Ruby Strawberries! "Loaded with natural antioxidants to boost your immunity and keep your smile bright!" (لذیذ سٹرابیری کھائیں، تر و تازہ رہیں!)',
  },
  {
    id: 'mango',
    name: 'Mango',
    urduName: 'آم',
    emoji: '🥭',
    quote: '🥭 King Mango! "The delicious king of fruits! Gives your body Vitamin A and sweet happy energy!" (پھلوں کا بادشاہ آم، صحت اور مٹھاس کا خاص تحفہ!)',
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    urduName: 'تربوز',
    emoji: '🍉',
    quote: '🍉 Cool Watermelon! "92% pure hydration! Keeps you refreshed, hydrated, and smiling all day!" (ٹھنڈا میٹھا تربوز، پیاس اور گرمی کو دور بھگائے!)',
  },
];

const getChallengeQuestions = (grade: string, fractionsOnly = false): ChallengeQuestion[] => {
  if (fractionsOnly && grade === 'Grade 3') {
    return [
      { question: 'Which fraction is equivalent to 2/4?', visual: '2/4 = ?', options: ['1/2', '1/4', '2/3', '4/2'], answer: '1/2', explanation: 'Divide the numerator and denominator by 2: 2/4 = 1/2.' },
      { question: 'A pizza has 8 equal slices. What fraction is 3 slices?', visual: '3 slices out of 8', options: ['3/8', '8/3', '5/8', '3/5'], answer: '3/8', explanation: 'Three of the eight equal slices is 3/8.' },
      { question: 'Which fraction is greater?', visual: '3/4  or  1/4', options: ['3/4', '1/4', 'They are equal', 'Not enough information'], answer: '3/4', explanation: 'With the same denominator, 3 fourths is greater than 1 fourth.' },
      { question: 'A cake is split into 6 equal pieces. 2 are eaten. What fraction remains?', visual: '6 pieces − 2 pieces', options: ['4/6', '2/6', '2/4', '6/2'], answer: '4/6', explanation: 'Four of the six pieces remain, so 4/6 is left.' },
      { question: 'Which fraction means one whole?', visual: 'Choose one whole', options: ['4/4', '1/4', '3/4', '2/4'], answer: '4/4', explanation: 'Four fourths make one complete whole.' },
    ];
  }

  if (fractionsOnly) {
    return [
      { question: 'A shape is split into 2 equal parts. What is one part called?', visual: '1 of 2 equal parts', options: ['One half', 'One whole', 'One third', 'Two halves'], answer: 'One half', explanation: 'One of two equal parts is one half.' },
      { question: 'There are 4 equal slices. You eat 1. How many are left?', visual: '4 slices − 1 slice', options: ['3', '2', '4', '5'], answer: '3', explanation: '4 − 1 = 3 slices remain.' },
      { question: 'Which shows 2 equal groups?', visual: 'Share 6 counters equally', options: ['3 and 3', '2 and 2', '4 and 1', '6 and 1'], answer: '3 and 3', explanation: '3 and 3 make two equal groups of 3.' },
      { question: 'Which is more: one half or one whole?', visual: '1/2  or  1 whole', options: ['1 whole', '1/2', 'They are equal', 'Neither'], answer: '1 whole', explanation: 'One whole is made of two halves.' },
    ];
  }

  if (grade === 'Grade 3') {
    return [
      { question: 'A library has 248 storybooks and gets 176 more. How many now?', visual: '248 + 176 = ?', options: ['414', '424', '434', '324'], answer: '424', explanation: '248 + 176 = 424 books.' },
      { question: 'A farmer packs 7 eggs in each carton. How many eggs fill 8 cartons?', visual: '8 × 7 = ?', options: ['54', '56', '64', '15'], answer: '56', explanation: '8 groups of 7 eggs make 56 eggs.' },
      { question: 'Share 63 apples equally among 9 baskets. How many per basket?', visual: '63 ÷ 9 = ?', options: ['6', '7', '8', '9'], answer: '7', explanation: '9 × 7 = 63, so each basket gets 7 apples.' },
      { question: 'A 600 cm ribbon is cut. 287 cm is used. How much remains?', visual: '600 − 287 = ?', options: ['313 cm', '323 cm', '413 cm', '303 cm'], answer: '313 cm', explanation: '600 − 287 = 313 cm.' },
      { question: 'Find the next number: 5, 11, 23, 47, __', visual: 'Each number doubles, then adds 1', options: ['94', '95', '96', '87'], answer: '95', explanation: '47 × 2 + 1 = 95.' },
    ];
  }

  if (grade === 'Grade 2') {
    return [
      { question: 'A shop has 38 red balls and 27 blue balls. How many altogether?', visual: '38 + 27 = ?', options: ['55', '65', '66', '75'], answer: '65', explanation: '38 + 27 = 65 balls.' },
      { question: 'There are 5 plates with 4 cookies on each. How many cookies?', visual: '5 × 4 = ?', options: ['9', '20', '15', '25'], answer: '20', explanation: '5 groups of 4 make 20 cookies.' },
      { question: 'A book has 72 pages. You read 35. How many are left?', visual: '72 − 35 = ?', options: ['37', '47', '43', '27'], answer: '37', explanation: '72 − 35 = 37 pages.' },
      { question: 'What time is 30 minutes after 4:15?', visual: '4:15 + 30 minutes', options: ['4:45', '4:30', '5:15', '3:45'], answer: '4:45', explanation: '30 minutes after 4:15 is 4:45.' },
    ];
  }

  return [
    { question: 'You have 24 crayons and find 18 more. How many now?', visual: '24 + 18 = ?', options: ['32', '42', '52', '40'], answer: '42', explanation: '24 + 18 = 42 crayons.' },
    { question: 'There are 4 bags with 5 oranges each. How many oranges?', visual: '4 groups of 5', options: ['9', '20', '15', '25'], answer: '20', explanation: '4 groups of 5 make 20 oranges.' },
    { question: 'A bus has 50 passengers. 16 get off. How many remain?', visual: '50 − 16 = ?', options: ['34', '36', '44', '26'], answer: '34', explanation: '50 − 16 = 34 passengers.' },
    { question: 'What number comes next? 12, 15, 18, __', visual: 'Count forward by 3', options: ['20', '21', '22', '24'], answer: '21', explanation: 'The pattern adds 3 each time.' },
  ];
};

const makeMemoryCards = (grade: string): MemoryCard[] => {
  // Use 4 pairs (8 cards total) or 6 pairs for Grade 3
  const count = grade === 'Grade 3' ? 6 : 4;
  // Pick random fruits & vegetables from the pool
  const shuffledPool = [...FRUIT_VEG_ITEMS].sort(() => Math.random() - 0.5);
  const selectedItems = shuffledPool.slice(0, count);

  const cards: MemoryCard[] = [];
  selectedItems.forEach((item, index) => {
    cards.push({
      id: index * 2,
      pair: item.id,
      name: item.name,
      urduName: item.urduName,
      emoji: item.emoji,
      quote: item.quote,
      matched: false,
    });
    cards.push({
      id: index * 2 + 1,
      pair: item.id,
      name: item.name,
      urduName: item.urduName,
      emoji: item.emoji,
      quote: item.quote,
      matched: false,
    });
  });

  // Fisher-Yates Shuffle algorithm for true randomness
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

export const InteractiveGameModal: React.FC<InteractiveGameModalProps> = ({
  gameId,
  gameTitle,
  userGrade = 'Grade 1',
  onClose,
  onWin,
}) => {
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Normalize game type
  const type: GameType =
    gameId === 'p-math-quest'
      ? 'math-quest'
      : gameId === 'p-memory-match'
        ? 'memory-match'
        : gameId === 'p-fraction-factory'
          ? 'fraction-factory'
          : gameId === 'p-pop' || gameTitle.toLowerCase().includes('pop')
      ? 'p-pop'
      : gameId === 'p-colour' || gameId === 'p-color-canvas' || gameTitle.toLowerCase().includes('colour') || gameTitle.toLowerCase().includes('color') || gameTitle.toLowerCase().includes('paint')
      ? 'p-colour'
      : gameId === 'p-shapes' || gameTitle.toLowerCase().includes('shape') || gameTitle.toLowerCase().includes('tracing')
      ? 'p-shapes'
      : gameId === 'p-pattern' || gameTitle.toLowerCase().includes('pattern')
      ? 'p-pattern'
      : gameId === 'p-alphabets' || gameTitle.toLowerCase().includes('alpha') || gameTitle.toLowerCase().includes('letter')
      ? 'p-alphabets'
      : 'p-numbers';

  const challengeQuestions = getChallengeQuestions(userGrade, type === 'fraction-factory');
  const [challengeStep, setChallengeStep] = useState(0);
  const [challengeAnswer, setChallengeAnswer] = useState<string | null>(null);
  const [memoryCards, setMemoryCards] = useState(() => makeMemoryCards(userGrade));
  const [selectedMemoryIds, setSelectedMemoryIds] = useState<number[]>([]);
  const [matchedQuote, setMatchedQuote] = useState<{ emoji: string; name: string; urduName: string; quote: string } | null>(null);

  useEffect(() => {
    if (selectedMemoryIds.length !== 2) return;
    const timer = window.setTimeout(() => setSelectedMemoryIds([]), 700);
    return () => window.clearTimeout(timer);
  }, [selectedMemoryIds]);

  const handleChallengeAnswer = (answer: string) => {
    if (challengeAnswer !== null) return;
    sound.playPop();
    setChallengeAnswer(answer);
    if (answer === challengeQuestions[challengeStep].answer) {
      sound.playSuccess();
      setScore((previous) => previous + 1);
    }
  };

  const handleNextChallenge = () => {
    if (challengeStep + 1 === challengeQuestions.length) {
      triggerWin();
      return;
    }
    setChallengeStep((previous) => previous + 1);
    setChallengeAnswer(null);
  };

  const handleMemoryCardClick = (cardId: number) => {
    const card = memoryCards.find((item) => item.id === cardId);
    if (!card || card.matched || selectedMemoryIds.length === 2 || selectedMemoryIds.includes(cardId)) return;

    sound.playPop();
    const revealed = [...selectedMemoryIds, cardId];
    setSelectedMemoryIds(revealed);
    if (revealed.length !== 2) return;

    const first = memoryCards.find((item) => item.id === revealed[0]);
    if (first?.pair === card.pair) {
      setMemoryCards((previous) => previous.map((item) =>
        item.pair === card.pair ? { ...item, matched: true } : item,
      ));
      setScore((previous) => previous + 1);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6'],
        });
      } catch {
        // Ignore
      }

      // Show immediate motivational/educational quote for this fruit or vegetable
      setMatchedQuote({
        emoji: card.emoji,
        name: card.name,
        urduName: card.urduName,
        quote: card.quote,
      });

      if (memoryCards.filter((item) => item.matched).length + 2 === memoryCards.length) {
        setTimeout(() => {
          triggerWin();
        }, 1400);
      }
    }
  };

  // --- GAME 1: BUBBLE POP GAME STATE ---
  const [bubbles, setBubbles] = useState([
    { id: 1, val: 2, color: 'bg-rose-400', popped: false, x: 20 },
    { id: 2, val: 5, color: 'bg-blue-400', popped: false, x: 45 },
    { id: 3, val: 3, color: 'bg-amber-400', popped: false, x: 70 },
    { id: 4, val: 5, color: 'bg-emerald-400', popped: false, x: 30 },
    { id: 5, val: 1, color: 'bg-purple-400', popped: false, x: 60 },
    { id: 6, val: 5, color: 'bg-pink-400', popped: false, x: 80 },
  ]);
  const targetNum = 5;

  const handlePopBubble = (id: number, val: number) => {
    sound.playPop();
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    if (val === targetNum) {
      sound.playSuccess();
      const nextScore = score + 1;
      setScore(nextScore);
      if (nextScore >= 3) {
        triggerWin();
      }
    }
  };

  // --- GAME 2: COLOUR THE SHAPES STATE ---
  const [paletteColor, setPaletteColor] = useState('#ef4444');
  const [shapeColors, setShapeColors] = useState<Record<string, string>>({
    star: '#ffffff',
    circle: '#ffffff',
    triangle: '#ffffff',
    square: '#ffffff',
    heart: '#ffffff',
  });

  const handleColorShape = (shapeKey: string) => {
    sound.playPop();
    setShapeColors((prev) => ({ ...prev, [shapeKey]: paletteColor }));
    const updated = { ...shapeColors, [shapeKey]: paletteColor };
    const allFilled = Object.values(updated).every((c) => c !== '#ffffff');
    if (allFilled) {
      sound.playSuccess();
      triggerWin();
    }
  };

  // --- GAME 3: PATTERN PLAY STATE ---
  const [patternStep, setPatternStep] = useState(0);
  const patterns = [
    { seq: ['🍎', '🍌', '🍎', '🍌'], answer: '🍎', options: ['🍎', '🍌', '🍇', '🍊'] },
    { seq: ['⭐', '🌙', '⭐', '🌙'], answer: '⭐', options: ['☀️', '⭐', '🌙', '☁️'] },
    { seq: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴', options: ['🟢', '🟡', '🔴', '🔵'] },
  ];

  const handlePatternChoice = (choice: string) => {
    sound.playPop();
    if (choice === patterns[patternStep].answer) {
      sound.playSuccess();
      if (patternStep + 1 < patterns.length) {
        setPatternStep(patternStep + 1);
        setScore(score + 1);
      } else {
        triggerWin();
      }
    }
  };

  // --- GAME 4: ALPHABET ANIMAL MATCH STATE ---
  const [alphaStep, setAlphaStep] = useState(0);
  const alphaCards = [
    { letter: 'A', word: 'Apple', emoji: '🍎', prompt: 'Which word starts with letter A?' },
    { letter: 'B', word: 'Butterfly', emoji: '🦋', prompt: 'Which word starts with letter B?' },
    { letter: 'C', word: 'Cat', emoji: '🐱', prompt: 'Which word starts with letter C?' },
    { letter: 'D', word: 'Dolphin', emoji: '🐬', prompt: 'Which word starts with letter D?' },
  ];
  const alphaOptions = [
    ['🍎 Apple', '🐘 Elephant', '🦁 Lion'],
    ['🦋 Butterfly', '🍇 Grapes', '🐒 Monkey'],
    ['🐱 Cat', '🦆 Duck', '🐸 Frog'],
    ['🐬 Dolphin', '🦒 Giraffe', '🦓 Zebra'],
  ];

  const handleAlphaMatch = (selected: string) => {
    sound.playPop();
    const correct = alphaCards[alphaStep].word;
    if (selected.includes(correct)) {
      sound.playSuccess();
      if (alphaStep + 1 < alphaCards.length) {
        setAlphaStep(alphaStep + 1);
        setScore(score + 1);
      } else {
        triggerWin();
      }
    }
  };

  // --- GAME 5: NUMBERS COUNT & FEED STATE ---
  const [carrotsGiven, setCarrotsGiven] = useState(0);
  const targetCarrots = 4;

  const handleFeedCarrot = () => {
    if (carrotsGiven < targetCarrots) {
      sound.playPop();
      const next = carrotsGiven + 1;
      setCarrotsGiven(next);
      if (next === targetCarrots) {
        sound.playSuccess();
        triggerWin();
      }
    }
  };

  // --- GAME 6: SHAPE MATCH & TRACING STATE ---
  const [shapeStep, setShapeStep] = useState(0);
  const shapeTasks = [
    { target: 'Circle', prompt: 'Tap the 🟡 Smooth Circle!', targetId: 'circle' },
    { target: 'Star', prompt: 'Tap the ⭐ Shining Star!', targetId: 'star' },
    { target: 'Triangle', prompt: 'Tap the 🔺 3-Corner Triangle!', targetId: 'triangle' },
    { target: 'Square', prompt: 'Tap the 🟦 4-Equal-Sided Square!', targetId: 'square' },
  ];
  const shapeItems = [
    { id: 'square', label: 'Square', emoji: '🟦', color: 'bg-blue-100 border-blue-400 text-blue-700' },
    { id: 'circle', label: 'Circle', emoji: '🟡', color: 'bg-amber-100 border-amber-400 text-amber-700' },
    { id: 'triangle', label: 'Triangle', emoji: '🔺', color: 'bg-rose-100 border-rose-400 text-rose-700' },
    { id: 'star', label: 'Star', emoji: '⭐', color: 'bg-yellow-100 border-yellow-400 text-yellow-700' },
  ];

  const handleShapeClick = (clickedId: string) => {
    sound.playPop();
    if (clickedId === shapeTasks[shapeStep].targetId) {
      sound.playSuccess();
      if (shapeStep + 1 < shapeTasks.length) {
        setShapeStep(shapeStep + 1);
        setScore((prev) => prev + 1);
      } else {
        triggerWin();
      }
    }
  };

  const triggerWin = () => {
    if (gameWon) return;
    setGameWon(true);
    onWin?.();
    sound.playSuccess();
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  };

  const handleResetGame = () => {
    sound.playPop();
    setScore(0);
    setGameWon(false);
    setBubbles((prev) => prev.map((b) => ({ ...b, popped: false })));
    setShapeColors({
      star: '#ffffff',
      circle: '#ffffff',
      triangle: '#ffffff',
      square: '#ffffff',
      heart: '#ffffff',
    });
    setPatternStep(0);
    setAlphaStep(0);
    setCarrotsGiven(0);
    setShapeStep(0);
    setChallengeStep(0);
    setChallengeAnswer(null);
    setMatchedQuote(null);
    setMemoryCards(makeMemoryCards(userGrade));
    setSelectedMemoryIds([]);
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playPop();
          onClose();
        }
      }}
      className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in duration-200 select-none"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/60 my-auto flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-sm">
              🎮
            </span>
            <div>
              <h3 className="text-base font-black tracking-tight">{gameTitle}</h3>
              <p className="text-[11px] font-bold text-blue-100">{userGrade} Interactive Learning Game</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetGame}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="Restart Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Arena Body */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-sky-50 via-indigo-50/40 to-white flex flex-col items-center justify-center min-h-[380px]">
          {/* WIN BANNER */}
          {gameWon ? (
            <div className="text-center space-y-4 animate-in zoom-in-95 py-6">
              <span className="text-6xl animate-bounce">🏆</span>
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-slate-900">Awesome Job! You Won!</h4>
                <p className="text-xs font-bold text-emerald-600">
                  You earned +20 Stars & a Gold Player Badge! ⭐⭐⭐
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleResetGame}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-full shadow-md flex items-center gap-2 cursor-pointer glossy-pill"
                >
                  <RotateCcw className="w-4 h-4" /> Play Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-full cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {(type === 'math-quest' || type === 'fraction-factory') && (
                <div className="w-full max-w-xl space-y-5 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {type === 'fraction-factory' ? 'Fraction Factory' : 'Math Quest'} · Mission {challengeStep + 1} of {challengeQuestions.length}
                  </div>
                  <div className="rounded-3xl bg-white border border-indigo-100 shadow-inner p-5 space-y-3">
                    <p className="text-lg font-black text-slate-900">{challengeQuestions[challengeStep].question}</p>
                    <p className="text-2xl font-black text-indigo-700">{challengeQuestions[challengeStep].visual}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {challengeQuestions[challengeStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleChallengeAnswer(option)}
                        disabled={challengeAnswer !== null}
                        className={`min-h-14 px-3 rounded-2xl border-2 font-black text-sm transition-all ${
                          challengeAnswer === option
                            ? option === challengeQuestions[challengeStep].answer
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                              : 'bg-rose-100 border-rose-400 text-rose-800'
                            : challengeAnswer !== null && option === challengeQuestions[challengeStep].answer
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:-translate-y-0.5'
                        } disabled:cursor-default`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {challengeAnswer !== null && (
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-blue-50 border border-blue-100 p-3 text-left">
                      <span className="text-xs font-bold text-blue-900">
                        {challengeQuestions[challengeStep].explanation}
                      </span>
                      <button
                        onClick={handleNextChallenge}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black whitespace-nowrap"
                      >
                        {challengeStep + 1 === challengeQuestions.length ? 'Finish' : 'Next'}
                      </button>
                    </div>
                  )}
                  <p className="text-xs font-bold text-slate-500">Missions solved: {score}</p>
                </div>
              )}

              {type === 'memory-match' && (
                <div className="w-full max-w-lg space-y-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs shadow-xs">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span>Flip two cards to match fresh Fruits & Vegetables! 🥕🍎</span>
                  </div>

                  {/* ACTIVE MATCHED QUOTE BANNER (Shows instant fruit/veg quote when paired!) */}
                  {matchedQuote && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-400 shadow-lg animate-in zoom-in-95 duration-200 flex items-center gap-3 text-left">
                      <span className="text-4xl shrink-0 animate-bounce">{matchedQuote.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-amber-900 tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                          <span>Match Found! {matchedQuote.name} ({matchedQuote.urduName}) Quote:</span>
                        </div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug mt-1">
                          {matchedQuote.quote}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Shuffled Fruits & Veggies Memory Grid */}
                  <div className={`grid ${memoryCards.length > 8 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'} gap-3`}>
                    {memoryCards.map((card) => {
                      const revealed = card.matched || selectedMemoryIds.includes(card.id);
                      return (
                        <button
                          key={card.id}
                          onClick={() => handleMemoryCardClick(card.id)}
                          disabled={card.matched || selectedMemoryIds.length === 2}
                          className={`aspect-square rounded-2xl border-2 p-2 flex flex-col items-center justify-center font-black transition-all duration-300 cursor-pointer ${
                            revealed
                              ? card.matched
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 scale-95 ring-2 ring-emerald-300/40 shadow-sm'
                                : 'bg-amber-50 border-amber-400 text-amber-950 scale-102 shadow-md'
                              : 'bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 border-white/60 text-white shadow-md hover:scale-105 hover:shadow-lg'
                          }`}
                        >
                          {revealed ? (
                            <div className="flex flex-col items-center justify-center animate-in zoom-in-50 duration-150">
                              <span className="text-3xl sm:text-4xl drop-shadow-sm mb-1">{card.emoji}</span>
                              <span className="text-[11px] font-black leading-tight text-slate-900">{card.name}</span>
                              <span className="text-[10px] font-bold text-slate-600 font-urdu">{card.urduName}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-2xl opacity-80">🌱</span>
                              <span className="text-[10px] font-bold text-violet-200 mt-1">Tap me</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2 pt-1">
                    <span>Pairs found: {score} / {memoryCards.length / 2}</span>
                    <span className="text-emerald-600 font-black">
                      {score === memoryCards.length / 2 ? 'All Matched! Great job! 🎉' : 'Find matching pairs! ⭐'}
                    </span>
                  </div>
                </div>
              )}

              {/* --- GAME: BUBBLE POP --- */}
              {type === 'p-pop' && (
                <div className="w-full space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>Mission: Pop all bubbles containing the number {targetNum}!</span>
                  </div>

                  <div className="relative h-56 bg-sky-100/70 rounded-3xl border-2 border-dashed border-sky-300 p-4 flex items-center justify-around overflow-hidden">
                    {bubbles.map((b) => (
                      <button
                        key={b.id}
                        disabled={b.popped}
                        onClick={() => handlePopBubble(b.id, b.val)}
                        className={`w-16 h-16 rounded-full font-black text-2xl text-white flex items-center justify-center shadow-lg transition-all duration-300 transform ${
                          b.popped
                            ? 'scale-0 opacity-0 pointer-events-none'
                            : `${b.color} hover:scale-115 active:scale-95 animate-float cursor-pointer`
                        }`}
                      >
                        {b.val}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs font-bold text-slate-500">
                    Bubbles popped with {targetNum}: <span className="text-blue-600 font-black">{score} / 3</span>
                  </p>
                </div>
              )}

              {/* --- GAME: COLOUR THE SHAPES --- */}
              {type === 'p-colour' && (
                <div className="w-full space-y-5 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 font-black text-xs">
                    <span>Pick a color from below, then tap each shape to paint it!</span>
                  </div>

                  {/* Shapes to click */}
                  <div className="flex items-center justify-center gap-6 py-4 bg-white/80 rounded-3xl border border-slate-200 p-6 shadow-inner">
                    {/* Star */}
                    <svg
                      onClick={() => handleColorShape('star')}
                      className="w-16 h-16 cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                      viewBox="0 0 100 100"
                    >
                      <polygon
                        points="50,5 64,36 98,38 72,60 79,94 50,76 21,94 28,60 2,38 36,36"
                        fill={shapeColors.star}
                        stroke="#1e293b"
                        strokeWidth="3"
                      />
                    </svg>

                    {/* Circle */}
                    <svg
                      onClick={() => handleColorShape('circle')}
                      className="w-16 h-16 cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                      viewBox="0 0 100 100"
                    >
                      <circle cx="50" cy="50" r="44" fill={shapeColors.circle} stroke="#1e293b" strokeWidth="3" />
                    </svg>

                    {/* Triangle */}
                    <svg
                      onClick={() => handleColorShape('triangle')}
                      className="w-16 h-16 cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                      viewBox="0 0 100 100"
                    >
                      <polygon points="50,8 92,88 8,88" fill={shapeColors.triangle} stroke="#1e293b" strokeWidth="3" />
                    </svg>

                    {/* Square */}
                    <svg
                      onClick={() => handleColorShape('square')}
                      className="w-16 h-16 cursor-pointer hover:scale-110 transition-transform drop-shadow-md"
                      viewBox="0 0 100 100"
                    >
                      <rect x="10" y="10" width="80" height="80" rx="8" fill={shapeColors.square} stroke="#1e293b" strokeWidth="3" />
                    </svg>
                  </div>

                  {/* Color Palette */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <span className="text-xs font-black text-slate-600">Palette:</span>
                    {['#ef4444', '#3b82f6', '#22c55e', '#facc15', '#a855f7', '#ec4899'].map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          sound.playPop();
                          setPaletteColor(c);
                        }}
                        style={{ backgroundColor: c }}
                        className={`w-9 h-9 rounded-full shadow-md transition-all cursor-pointer ${
                          paletteColor === c ? 'ring-4 ring-slate-800 scale-110' : 'hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* --- GAME: PATTERN PLAY --- */}
              {type === 'p-pattern' && (
                <div className="w-full space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
                    <span>Round {patternStep + 1} of {patterns.length}: What comes next in the pattern?</span>
                  </div>

                  {/* Sequence Display */}
                  <div className="flex items-center justify-center gap-4 py-4 bg-white rounded-3xl border border-slate-200 shadow-inner">
                    {patterns[patternStep].seq.map((item, idx) => (
                      <span key={idx} className="text-5xl animate-bounce-gentle">
                        {item}
                      </span>
                    ))}
                    <span className="w-14 h-14 rounded-2xl border-4 border-dashed border-blue-400 bg-blue-50 flex items-center justify-center text-3xl font-black text-blue-600 animate-pulse">
                      ?
                    </span>
                  </div>

                  {/* Option Choices */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    {patterns[patternStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handlePatternChoice(opt)}
                        className="w-16 h-16 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-md text-3xl flex items-center justify-center transition-all hover:scale-115 active:scale-95 cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- GAME: ALPHABETS & PHONICS --- */}
              {type === 'p-alphabets' && (
                <div className="w-full space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 font-black text-xs">
                    <span>{alphaCards[alphaStep].prompt}</span>
                  </div>

                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-5xl flex items-center justify-center shadow-xl animate-bounce-gentle">
                    {alphaCards[alphaStep].letter}
                  </div>

                  <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                    {alphaOptions[alphaStep].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAlphaMatch(item)}
                        className="py-3 px-4 bg-white hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl font-black text-sm text-slate-800 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- GAME: SHAPE MATCH & TRACING --- */}
              {type === 'p-shapes' && (
                <div className="w-full space-y-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Level {shapeStep + 1} of {shapeTasks.length}: {shapeTasks[shapeStep].prompt}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto py-3">
                    {shapeItems.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleShapeClick(s.id)}
                        className={`p-5 rounded-3xl border-3 ${s.color} shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer glossy-bubble`}
                      >
                        <span className="text-5xl">{s.emoji}</span>
                        <span className="font-black text-xs">{s.label}</span>
                      </button>
                    ))}
                  </div>

                  <p className="text-xs font-bold text-slate-500">
                    Find and click the shape described in the prompt!
                  </p>
                </div>
              )}

              {/* --- GAME: NUMBERS COUNT & FEED --- */}
              {type === 'p-numbers' && (
                <div className="w-full space-y-5 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                    <span>Help feed 4 crunchy carrots 🥕 to Bunny!</span>
                  </div>

                  <div className="flex items-center justify-center gap-6 py-3">
                    <span className="text-7xl animate-bounce-gentle">🐰</span>
                    <div className="text-left">
                      <p className="text-xs font-black text-slate-700">Carrots Eaten:</p>
                      <div className="flex gap-1 text-2xl pt-1">
                        {Array.from({ length: targetCarrots }).map((_, i) => (
                          <span key={i} className={i < carrotsGiven ? 'opacity-100' : 'opacity-25'}>
                            🥕
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 mt-1">
                        {carrotsGiven} of {targetCarrots} carrots
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleFeedCarrot}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-black text-sm rounded-full shadow-lg shadow-orange-500/30 flex items-center gap-2 mx-auto cursor-pointer glossy-pill active:scale-95 transition-all"
                  >
                    <span>🥕 Feed 1 Carrot</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
