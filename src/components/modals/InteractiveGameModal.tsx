import React, { useState, useEffect } from 'react';
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
  | 'trace'
  | 'general';

interface InteractiveGameModalProps {
  gameId: string;
  gameTitle: string;
  onClose: () => void;
}

export const InteractiveGameModal: React.FC<InteractiveGameModalProps> = ({
  gameId,
  gameTitle,
  onClose,
}) => {
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Normalize game type
  const type: GameType =
    gameId === 'p-pop' || gameTitle.toLowerCase().includes('pop')
      ? 'p-pop'
      : gameId === 'p-colour' || gameTitle.toLowerCase().includes('colour') || gameTitle.toLowerCase().includes('paint')
      ? 'p-colour'
      : gameId === 'p-shapes' || gameTitle.toLowerCase().includes('shape') || gameTitle.toLowerCase().includes('tracing')
      ? 'p-shapes'
      : gameId === 'p-pattern' || gameTitle.toLowerCase().includes('pattern')
      ? 'p-pattern'
      : gameId === 'p-alphabets' || gameTitle.toLowerCase().includes('alpha') || gameTitle.toLowerCase().includes('letter')
      ? 'p-alphabets'
      : 'p-numbers';

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
    setGameWon(true);
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
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/60 my-auto flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-sm">
              🎮
            </span>
            <div>
              <h3 className="text-base font-black tracking-tight">{gameTitle}</h3>
              <p className="text-[11px] font-bold text-blue-100">Interactive Learning Mini-Game</p>
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
    </div>
  );
};
