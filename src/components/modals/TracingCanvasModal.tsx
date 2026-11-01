import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, RotateCcw, Sparkles, Volume2, CheckCircle2, Star, Palette } from 'lucide-react';
import { sound } from '../../utils/audio';
import { femaleVoice } from '../../utils/speech';

interface TracingCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWin?: () => void;
  initialMode?: 'alphabets' | 'numbers' | 'hindi' | 'urdu';
}

const TRACE_SETS = {
  alphabets: [
    { char: 'A', name: 'Letter A', word: 'Apple 🍎', lang: 'en' as const },
    { char: 'B', name: 'Letter B', word: 'Ball ⚽', lang: 'en' as const },
    { char: 'C', name: 'Letter C', word: 'Cat 🐱', lang: 'en' as const },
    { char: 'D', name: 'Letter D', word: 'Dog 🐶', lang: 'en' as const },
    { char: 'E', name: 'Letter E', word: 'Elephant 🐘', lang: 'en' as const },
    { char: 'M', name: 'Letter M', word: 'Mango 🥭', lang: 'en' as const },
    { char: 'S', name: 'Letter S', word: 'Sun ☀️', lang: 'en' as const },
    { char: 'Z', name: 'Letter Z', word: 'Zebra 🦓', lang: 'en' as const },
  ],
  numbers: [
    { char: '1', name: 'Number 1', word: 'One Star ⭐', lang: 'en' as const },
    { char: '2', name: 'Number 2', word: 'Two Shoes 👟👟', lang: 'en' as const },
    { char: '3', name: 'Number 3', word: 'Three Little Pigs 🐷', lang: 'en' as const },
    { char: '4', name: 'Number 4', word: 'Four Wheels 🚗', lang: 'en' as const },
    { char: '5', name: 'Number 5', word: 'Five Fingers ✋', lang: 'en' as const },
    { char: '7', name: 'Number 7', word: 'Seven Rainbow Colors 🌈', lang: 'en' as const },
    { char: '10', name: 'Number 10', word: 'Ten Stars 🌟', lang: 'en' as const },
  ],
  hindi: [
    { char: 'अ', name: 'अक्षर अ', word: 'अनार (Pomegranate) 🍎', lang: 'hi' as const },
    { char: 'आ', name: 'अक्षर आ', word: 'आम (Mango) 🥭', lang: 'hi' as const },
    { char: 'इ', name: 'अक्षर इ', word: 'इमली (Tamarind) 🟤', lang: 'hi' as const },
    { char: 'क', name: 'अक्षर क', word: 'कमल (Lotus) 🪷', lang: 'hi' as const },
    { char: 'म', name: 'अक्षर म', word: 'मछली (Fish) 🐟', lang: 'hi' as const },
  ],
  urdu: [
    { char: 'ا', name: 'حرف الف', word: 'انار (Pomegranate) 🍎', lang: 'ur' as const },
    { char: 'ب', name: 'حرف بے', word: 'بلی (Cat) 🐱', lang: 'ur' as const },
    { char: 'پ', name: 'حرف پے', word: 'پتنگ (Kite) 🪁', lang: 'ur' as const },
    { char: 'ت', name: 'حرف تے', word: 'تتلی (Butterfly) 🦋', lang: 'ur' as const },
    { char: 'ج', name: 'حرف جیم', word: 'جہاز (Aeroplane) ✈️', lang: 'ur' as const },
  ],
};

const BRUSH_COLORS = [
  { name: 'Sky Blue', hex: '#0284c7' },
  { name: 'Crayon Red', hex: '#e11d48' },
  { name: 'Sunny Gold', hex: '#f59e0b' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Sparkle Violet', hex: '#8b5cf6' },
];

export const TracingCanvasModal: React.FC<TracingCanvasModalProps> = ({
  isOpen,
  onClose,
  onWin,
  initialMode = 'alphabets',
}) => {
  const [activeTab, setActiveTab] = useState<'alphabets' | 'numbers' | 'hindi' | 'urdu'>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [brushColor, setBrushColor] = useState('#0284c7');
  const [brushSize, setBrushSize] = useState(16);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentList = TRACE_SETS[activeTab];
  const currentItem = currentList[currentIndex] || currentList[0];

  // Clear canvas whenever character changes
  useEffect(() => {
    if (!isOpen) return;
    clearCanvas();
    speakPrompt(currentItem.name);
  }, [activeTab, currentIndex, isOpen]);

  if (!isOpen) return null;

  const speakPrompt = (text: string) => {
    femaleVoice.speak({
      text: `Let's trace ${text}! Follow the dotted lines!`,
      lang: currentItem.lang,
    });
  };

  const clearCanvas = () => {
    sound.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setHasDrawn(true);
    sound.playBrush();
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleCelebrate = () => {
    sound.playFanfare();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
      });
    } catch {
      // Ignore
    }

    femaleVoice.speak({
      text: `Wonderful handwriting! You mastered ${currentItem.name}! ⭐`,
      lang: currentItem.lang,
    });

    if (onWin) onWin();
  };

  return (
    <div className="fixed inset-0 z-[230] bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in select-none">
      <div className="bg-white rounded-[2.5rem] max-w-2xl w-full shadow-2xl border-4 border-blue-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow">
              ✍️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">Magical Tracing Canvas</h3>
              <p className="text-[11px] font-bold text-blue-100">Trace letters & numbers with chunky crayons!</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'alphabets', label: 'ABC Letters' },
            { id: 'numbers', label: '123 Numbers' },
            { id: 'hindi', label: 'हिन्दी वर्णमाला' },
            { id: 'urdu', label: 'اردو حروف' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as any);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Character Carousel Bar */}
        <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          {currentList.map((item, idx) => (
            <button
              key={item.char}
              onClick={() => {
                sound.playPop();
                setCurrentIndex(idx);
              }}
              className={`w-10 h-10 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                currentIndex === idx
                  ? 'bg-amber-400 text-slate-950 scale-110 shadow-md ring-2 ring-amber-500'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {item.char}
            </button>
          ))}
        </div>

        {/* Main Canvas Drawing Area */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
          {/* Target Watermark Letter Guide */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
            <span className="text-[170px] sm:text-[230px] font-black text-slate-200/70 font-sans tracking-widest leading-none drop-shadow-xs">
              {currentItem.char}
            </span>
            <p className="text-sm font-black text-slate-400 mt-2">{currentItem.word}</p>
          </div>

          {/* Interactive Canvas */}
          <canvas
            ref={canvasRef}
            width={550}
            height={380}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full max-w-[550px] h-[280px] sm:h-[340px] bg-white/70 backdrop-blur-2xs rounded-3xl border-4 border-dashed border-blue-300 shadow-xl cursor-crosshair relative z-10 touch-none"
          />

          <div className="flex items-center gap-2 mt-3 z-10">
            <button
              onClick={() => speakPrompt(currentItem.name)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-black rounded-full transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Pronounce & Guide</span>
            </button>

            <button
              onClick={clearCanvas}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-black rounded-full transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Erase All</span>
            </button>
          </div>
        </div>

        {/* Bottom Palette & Action Controls */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Crayon Colors */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-400 hidden sm:inline">Crayons:</span>
            {BRUSH_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  sound.playPop();
                  setBrushColor(c.hex);
                }}
                className={`w-7 h-7 rounded-full transition-transform cursor-pointer shadow-sm ${
                  brushColor === c.hex ? 'scale-125 ring-2 ring-blue-500' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Celebrate / Finished Button */}
          <button
            onClick={handleCelebrate}
            disabled={!hasDrawn}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer ${
              hasDrawn
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>I Finished It! (+10 ⭐)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
