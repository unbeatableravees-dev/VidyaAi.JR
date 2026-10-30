import React from 'react';

// Common Apple SVG with 3D gloss and green leaf
export const AppleSvg: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-md transition-transform hover:scale-110 ${className}`}
  >
    <defs>
      <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="50%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#9f1239" />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    {/* Stem */}
    <path d="M 50 25 Q 52 10 60 8" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    {/* Leaf */}
    <path d="M 52 18 Q 70 8 72 20 Q 60 26 52 18 Z" fill="url(#leafGrad)" />
    {/* Apple Body */}
    <path
      d="M 50 30 C 35 18 15 28 15 52 C 15 76 36 90 50 88 C 64 90 85 76 85 52 C 85 28 65 18 50 30 Z"
      fill="url(#appleGrad)"
    />
    {/* Gloss shine */}
    <ellipse cx="32" cy="42" rx="7" ry="14" transform="rotate(-25 32 42)" fill="#ffffff" opacity="0.45" />
    <circle cx="38" cy="33" r="3" fill="#ffffff" opacity="0.6" />
  </svg>
);

// Sidebar Bottom Illustration: Boy & Girl on Cloud with Book
export const SidebarKidsIllustration: React.FC = () => (
  <div className="flex flex-col items-center select-none">
    <div className="relative w-44 h-36 flex items-center justify-center">
      <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </linearGradient>
          <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>

        {/* Fluffy Cloud Base */}
        <g opacity="0.95">
          <ellipse cx="60" cy="120" rx="35" ry="20" fill="url(#cloudGrad)" />
          <ellipse cx="100" cy="115" rx="55" ry="25" fill="url(#cloudGrad)" />
          <ellipse cx="145" cy="122" rx="35" ry="20" fill="url(#cloudGrad)" />
          <ellipse cx="100" cy="130" rx="75" ry="18" fill="#c7d2fe" opacity="0.4" />
        </g>

        {/* Little Twinkling Stars */}
        <g fill="#fde047">
          <polygon points="25,65 27,70 32,71 28,75 29,80 25,77 21,80 22,75 18,71 23,70" />
          <polygon points="175,70 177,74 182,75 178,79 179,84 175,81 171,84 172,79 168,75 173,74" />
          <polygon points="35,110 36,113 40,114 37,117 38,121 35,119 32,121 33,117 30,114 34,113" />
        </g>

        {/* Big Book Base (Stacked) */}
        <g transform="translate(45, 90)">
          {/* Bottom Book (Purple) */}
          <rect x="15" y="16" width="80" height="12" rx="3" fill="#7c3aed" />
          <rect x="18" y="18" width="74" height="8" rx="2" fill="#faf5ff" />
          {/* Top Open Book */}
          <path d="M 20 14 Q 55 20 55 5 Q 55 20 90 14 L 95 6 Q 55 12 55 -3 Q 55 12 15 6 Z" fill="#3b82f6" />
          <path d="M 22 12 Q 55 18 55 4 Q 55 18 88 12 L 92 6 Q 55 10 55 -2 Q 55 10 18 6 Z" fill="#ffffff" />
          {/* Pages lines */}
          <line x1="28" y1="9" x2="48" y2="7" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="29" y1="12" x2="47" y2="10" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="62" y1="7" x2="82" y2="9" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="63" y1="10" x2="81" y2="12" stroke="#cbd5e1" strokeWidth="1" />
        </g>

        {/* Boy Character (Left) */}
        <g transform="translate(42, 28)">
          {/* Head & Hair */}
          <ellipse cx="28" cy="28" rx="16" ry="17" fill="#fbcfe8" opacity="0.3" />
          <circle cx="28" cy="28" r="16" fill="#fed7aa" />
          {/* Brown Hair */}
          <path d="M 14 26 C 12 14 20 8 32 8 C 42 8 46 16 43 25 C 40 18 35 15 28 15 C 20 15 16 20 14 26 Z" fill="#451a03" />
          <path d="M 14 24 Q 10 18 16 12 Q 26 8 36 12" fill="#78350f" />
          {/* Face */}
          <circle cx="23" cy="28" r="2.5" fill="#1e293b" />
          <circle cx="33" cy="28" r="2.5" fill="#1e293b" />
          <ellipse cx="19" cy="32" rx="2.5" ry="1.5" fill="#f87171" opacity="0.5" />
          <ellipse cx="37" cy="32" rx="2.5" ry="1.5" fill="#f87171" opacity="0.5" />
          <path d="M 25 33 Q 28 37 31 33" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
          {/* Blue Hoodie */}
          <path d="M 16 44 Q 28 40 40 44 L 42 62 Q 28 65 14 62 Z" fill="#2563eb" />
          {/* Arms holding book */}
          <path d="M 16 48 Q 28 58 35 52" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Girl Character (Right) */}
        <g transform="translate(98, 30)">
          {/* Head & Hair */}
          <circle cx="28" cy="28" r="16" fill="#fde68a" opacity="0.2" />
          <circle cx="28" cy="28" r="15" fill="#fed7aa" />
          {/* Dark Hair with Pigtails & Pink Bow */}
          <path d="M 13 26 C 12 12 22 8 34 8 C 44 8 45 18 43 26 C 38 16 32 15 26 15 C 18 15 15 20 13 26 Z" fill="#292524" />
          {/* Pink Headband */}
          <path d="M 14 20 Q 28 14 42 20" fill="none" stroke="#ec4899" strokeWidth="3" />
          <circle cx="38" cy="18" r="3" fill="#ec4899" />
          {/* Face */}
          <circle cx="23" cy="28" r="2.5" fill="#1e293b" />
          <circle cx="33" cy="28" r="2.5" fill="#1e293b" />
          <ellipse cx="19" cy="32" rx="2.5" ry="1.5" fill="#f43f5e" opacity="0.5" />
          <ellipse cx="37" cy="32" rx="2.5" ry="1.5" fill="#f43f5e" opacity="0.5" />
          <path d="M 25 33 Q 28 37 31 33" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
          {/* Coral Top */}
          <path d="M 16 44 Q 28 40 40 44 L 42 62 Q 28 65 14 62 Z" fill="#f43f5e" />
          {/* Arms */}
          <path d="M 40 48 Q 30 58 24 52" fill="none" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
    <div className="mt-1 text-center">
      <div className="font-extrabold text-white text-lg tracking-wide leading-tight drop-shadow">
        Learn
      </div>
      <div className="font-extrabold text-blue-100 text-sm tracking-wide leading-tight">
        Explore
      </div>
      <div className="font-extrabold text-yellow-300 text-sm tracking-wider flex items-center justify-center gap-1">
        Grow <span className="text-yellow-400 text-base">💛</span>
      </div>
    </div>
  </div>
);

// Hero Banner 3D Illustration (Boy with book, Rocket, Globe, ABC blocks, Bulb)
export const HeroBannerIllustration: React.FC = () => (
  <div className="relative w-full h-full min-h-[170px] flex items-center justify-end pr-2 overflow-hidden select-none pointer-events-none">
    <svg viewBox="0 0 520 220" className="w-[480px] h-[210px] object-contain overflow-visible">
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Floating Soft Background Clouds */}
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="140" cy="180" rx="60" ry="25" />
        <ellipse cx="200" cy="175" rx="50" ry="22" />
        <ellipse cx="380" cy="185" rx="70" ry="25" />
        <ellipse cx="450" cy="180" rx="55" ry="20" />
      </g>

      {/* Rocket Blasting Off (Upper Left) */}
      <g transform="translate(60, 25) rotate(-35)">
        {/* Exhaust flame */}
        <polygon points="12,50 18,75 22,50" fill="#f97316" />
        <polygon points="14,50 18,65 20,50" fill="#fde047" />
        {/* Rocket wings */}
        <polygon points="6,45 0,55 12,48" fill="#ef4444" />
        <polygon points="28,45 34,55 22,48" fill="#ef4444" />
        {/* Body */}
        <ellipse cx="17" cy="28" rx="10" ry="22" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <path d="M 7 18 Q 17 0 27 18 Z" fill="#ef4444" />
        {/* Window */}
        <circle cx="17" cy="25" r="4.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      </g>

      {/* Floating 3D Alphabet Blocks */}
      {/* 'B' block (green) */}
      <g transform="translate(130, 45) rotate(12)">
        <rect x="0" y="0" width="28" height="28" rx="6" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
        <text x="7" y="21" fontFamily="Nunito, sans-serif" fontWeight="900" fontSize="20" fill="#ffffff">
          B
        </text>
      </g>
      {/* 'B' block (magenta/purple) */}
      <g transform="translate(100, 95) rotate(-14)">
        <rect x="0" y="0" width="26" height="26" rx="6" fill="#ec4899" stroke="#db2777" strokeWidth="1.5" />
        <text x="6" y="20" fontFamily="Nunito, sans-serif" fontWeight="900" fontSize="18" fill="#ffffff">
          B
        </text>
      </g>

      {/* Glowing Lightbulb */}
      <g transform="translate(390, 20)">
        <circle cx="16" cy="16" r="22" fill="url(#sunGlow)" />
        {/* Bulb shape */}
        <path d="M 9 20 C 5 15 5 8 11 4 C 18 -1 25 3 25 10 C 25 15 22 18 20 22 L 13 22 Z" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
        <rect x="13" y="22" width="7" height="4" fill="#94a3b8" rx="1" />
        <path d="M 15 26 L 18 26" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Globe */}
      <g transform="translate(380, 85)">
        <circle cx="26" cy="26" r="24" fill="url(#globeGrad)" />
        {/* Continents */}
        <path d="M 12 20 Q 20 12 30 18 Q 36 28 26 36 Q 16 34 12 20 Z" fill="#4ade80" />
        <path d="M 32 30 Q 42 28 44 38 Q 36 44 32 38 Z" fill="#4ade80" />
        {/* Stand */}
        <path d="M 26 2 A 25 25 0 0 1 26 50" fill="none" stroke="#cbd5e1" strokeWidth="3" />
        <path d="M 26 50 L 26 58 M 16 58 L 36 58" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Stack of Colorful Books */}
      <g transform="translate(375, 135)">
        {/* Blue book */}
        <rect x="5" y="24" width="70" height="12" rx="3" fill="#3b82f6" />
        <rect x="8" y="26" width="64" height="8" rx="1" fill="#eff6ff" />
        {/* Red book */}
        <rect x="10" y="12" width="62" height="12" rx="3" fill="#ef4444" />
        <rect x="13" y="14" width="56" height="8" rx="1" fill="#fef2f2" />
        {/* Yellow book */}
        <rect x="15" y="0" width="54" height="12" rx="3" fill="#eab308" />
        <rect x="18" y="2" width="48" height="8" rx="1" fill="#fefce8" />
      </g>

      {/* Main Hero Boy (Aarav) sitting and reading */}
      <g transform="translate(230, 20)">
        {/* Boy Head & Hair */}
        <circle cx="70" cy="50" r="30" fill="#fed7aa" />
        {/* 3D Brown Hair with volume */}
        <path
          d="M 42 46 C 38 22 55 12 76 12 C 96 12 102 24 98 42 C 92 30 84 25 72 25 C 58 25 50 34 42 46 Z"
          fill="#451a03"
        />
        <path d="M 50 32 C 65 18 85 24 92 35" fill="none" stroke="#78350f" strokeWidth="3" />
        {/* Cheerful 3D Face */}
        <circle cx="60" cy="50" r="4.5" fill="#1e293b" />
        <circle cx="80" cy="50" r="4.5" fill="#1e293b" />
        <circle cx="62" cy="48" r="1.5" fill="#ffffff" />
        <circle cx="82" cy="48" r="1.5" fill="#ffffff" />
        {/* Blushing cheeks */}
        <ellipse cx="53" cy="58" rx="5" ry="3" fill="#f87171" opacity="0.6" />
        <ellipse cx="87" cy="58" rx="5" ry="3" fill="#f87171" opacity="0.6" />
        {/* Wide happy smile */}
        <path d="M 64 59 Q 70 68 76 59 Z" fill="#be123c" />
        {/* Teeth */}
        <path d="M 66 59 Q 70 63 74 59 Z" fill="#ffffff" />

        {/* Yellow Hoodie with hood */}
        <path d="M 46 80 Q 70 72 94 80 L 102 125 Q 70 132 38 125 Z" fill="#eab308" />
        {/* Blue jeans */}
        <path d="M 40 125 L 40 148 L 65 148 L 68 130 L 72 130 L 75 148 L 100 148 L 100 125 Z" fill="#1d4ed8" />

        {/* Open Blue Book held in hands */}
        <g transform="translate(30, 95)">
          <path d="M 8 26 Q 40 34 40 12 Q 40 34 72 26 L 76 12 Q 40 20 40 -2 Q 40 20 4 12 Z" fill="#2563eb" />
          <path d="M 10 24 Q 40 32 40 10 Q 40 32 70 24 L 73 12 Q 40 18 40 0 Q 40 18 7 12 Z" fill="#ffffff" />
          {/* Hands holding book */}
          <circle cx="12" cy="18" r="6" fill="#fed7aa" />
          <circle cx="68" cy="18" r="6" fill="#fed7aa" />
        </g>
      </g>

      {/* Floating Twinkling Golden Stars */}
      <g fill="#facc15">
        <polygon points="90,135 93,142 100,143 95,149 97,156 90,152 83,156 85,149 80,143 87,142" />
        <polygon points="170,110 172,115 178,116 173,120 175,126 170,123 165,126 167,120 162,116 168,115" />
        <polygon points="490,90 492,94 497,95 493,99 494,104 490,101 486,104 487,99 483,95 488,94" />
      </g>
    </svg>
  </div>
);

// Quiz Completion Celebration Hero Banner (Confetti + Celebrating Aarav + Giant Star)
export const QuizCelebrationIllustration: React.FC = () => (
  <div className="relative w-full h-full min-h-[160px] flex items-center justify-end pr-4 overflow-hidden select-none pointer-events-none">
    <svg viewBox="0 0 540 200" className="w-[500px] h-[190px] object-contain overflow-visible">
      <defs>
        <radialGradient id="starGlow" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#eab308" />
        </radialGradient>
      </defs>

      {/* Confetti ribbons & specks */}
      <g opacity="0.9">
        <rect x="40" y="30" width="8" height="18" rx="2" fill="#ec4899" transform="rotate(25 40 30)" />
        <rect x="90" y="70" width="7" height="15" rx="2" fill="#3b82f6" transform="rotate(-35 90 70)" />
        <rect x="140" y="20" width="8" height="20" rx="2" fill="#10b981" transform="rotate(45 140 20)" />
        <rect x="200" y="60" width="7" height="16" rx="2" fill="#f59e0b" transform="rotate(-20 200 60)" />
        <rect x="300" y="25" width="8" height="18" rx="2" fill="#8b5cf6" transform="rotate(30 300 25)" />
        <rect x="470" y="40" width="7" height="15" rx="2" fill="#06b6d4" transform="rotate(-40 470 40)" />
        <circle cx="65" cy="50" r="3.5" fill="#f43f5e" />
        <circle cx="160" cy="45" r="4" fill="#3b82f6" />
        <circle cx="220" cy="30" r="3" fill="#eab308" />
        <circle cx="490" cy="80" r="4.5" fill="#ec4899" />
      </g>

      {/* Celebrating Aarav (Middle) */}
      <g transform="translate(180, 10)">
        {/* Head */}
        <circle cx="70" cy="48" r="28" fill="#fed7aa" />
        {/* Brown Hair with movement */}
        <path
          d="M 44 44 C 40 20 58 10 76 10 C 96 10 100 22 98 40 C 92 28 84 22 74 22 C 60 22 52 30 44 44 Z"
          fill="#451a03"
        />
        {/* Eyes closed with joyful curved arches */}
        <path d="M 58 48 Q 63 43 68 48" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
        <path d="M 76 48 Q 81 43 86 48" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
        {/* Blushing cheeks */}
        <ellipse cx="54" cy="54" rx="5" ry="3" fill="#f87171" opacity="0.6" />
        <ellipse cx="90" cy="54" rx="5" ry="3" fill="#f87171" opacity="0.6" />
        {/* Huge open laughing mouth */}
        <path d="M 64 56 Q 72 70 80 56 Z" fill="#be123c" />
        <path d="M 66 56 Q 72 61 78 56 Z" fill="#ffffff" />

        {/* Arms raised in celebration */}
        {/* Left arm up */}
        <path d="M 48 85 Q 25 60 30 35" fill="none" stroke="#2563eb" strokeWidth="14" strokeLinecap="round" />
        <circle cx="30" cy="32" r="8" fill="#fed7aa" />
        {/* Right arm up */}
        <path d="M 96 85 Q 118 60 114 35" fill="none" stroke="#2563eb" strokeWidth="14" strokeLinecap="round" />
        <circle cx="114" cy="32" r="8" fill="#fed7aa" />

        {/* Blue Hoodie */}
        <path d="M 46 76 Q 72 70 98 76 L 104 125 Q 72 130 40 125 Z" fill="#2563eb" />
        {/* Star badge on hoodie */}
        <polygon points="72,88 74,93 79,94 75,98 76,103 72,100 68,103 69,98 65,94 70,93" fill="#facc15" />
      </g>

      {/* Giant Smiling 3D Star on Right */}
      <g transform="translate(340, 25)">
        {/* Star Body */}
        <path
          d="M 60 5 L 75 42 L 115 46 L 85 73 L 94 112 L 60 91 L 26 112 L 35 73 L 5 46 L 45 42 Z"
          fill="url(#starGlow)"
          stroke="#ca8a04"
          strokeWidth="3"
          strokeLinejoin="round"
          className="drop-shadow-lg"
        />
        {/* Big cute cartoon eyes */}
        <ellipse cx="48" cy="58" rx="5" ry="7" fill="#1e293b" />
        <ellipse cx="72" cy="58" rx="5" ry="7" fill="#1e293b" />
        <circle cx="50" cy="55" r="2" fill="#ffffff" />
        <circle cx="74" cy="55" r="2" fill="#ffffff" />
        {/* Pink cheeks */}
        <ellipse cx="40" cy="67" rx="6" ry="4" fill="#f87171" opacity="0.6" />
        <ellipse cx="80" cy="67" rx="6" ry="4" fill="#f87171" opacity="0.6" />
        {/* Cute happy open smile */}
        <path d="M 52 68 Q 60 78 68 68 Z" fill="#be123c" />
        <path d="M 54 68 Q 60 72 66 68 Z" fill="#ffffff" />

        {/* Speech Bubble "Great Job!" */}
        <g transform="translate(85, -5)">
          <rect x="0" y="0" width="70" height="38" rx="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" className="drop-shadow-md" />
          <path d="M 12 36 L 0 45 L 20 36 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <text x="12" y="24" fontFamily="Nunito, sans-serif" fontWeight="900" fontSize="13" fill="#1e293b">
            Great Job!
          </text>
        </g>
      </g>
    </svg>
  </div>
);

// Category Icons (3D Stylized SVGs for all 13 categories)
export const CategoryIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 56 }) => {
  switch (type) {
    case 'numbers':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D 1 2 3 */}
          <text x="8" y="70" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="48" fill="#eab308" stroke="#ca8a04" strokeWidth="2">
            1
          </text>
          <text x="36" y="65" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="54" fill="#f97316" stroke="#c2410c" strokeWidth="2">
            2
          </text>
          <text x="66" y="72" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="50" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2">
            3
          </text>
        </svg>
      );
    case 'alphabets':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D a b c */}
          <text x="5" y="68" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="46" fill="#ef4444" stroke="#b91c1c" strokeWidth="2">
            a
          </text>
          <text x="36" y="62" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="52" fill="#eab308" stroke="#ca8a04" strokeWidth="2">
            b
          </text>
          <text x="68" y="68" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="48" fill="#22c55e" stroke="#15803d" strokeWidth="2">
            c
          </text>
        </svg>
      );
    case 'story-time':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Open glowing 3D book */}
          <path d="M 12 70 Q 50 82 50 48 Q 50 82 88 70 L 92 32 Q 50 44 50 14 Q 50 44 8 32 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <path d="M 16 66 Q 50 78 50 45 Q 50 78 84 66 L 88 32 Q 50 40 50 16 Q 50 40 12 32 Z" fill="#ffffff" />
          <line x1="24" y1="42" x2="44" y2="46" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="52" x2="42" y2="56" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="46" x2="76" y2="42" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
          <line x1="58" y1="56" x2="76" y2="52" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
          <polygon points="50,6 52,11 58,12 54,16 55,22 50,19 45,22 46,16 42,12 48,11" fill="#facc15" />
        </svg>
      );
    case 'rhymes':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D vibrant musical notes */}
          <g fill="#ec4899" stroke="#be185d" strokeWidth="1.5">
            <ellipse cx="28" cy="72" rx="14" ry="10" transform="rotate(-25 28 72)" />
            <ellipse cx="74" cy="62" rx="14" ry="10" transform="rotate(-25 74 62)" />
            <rect x="36" y="24" width="8" height="48" rx="2" />
            <rect x="82" y="14" width="8" height="48" rx="2" />
            <polygon points="36,24 90,14 90,26 36,36" />
          </g>
          <circle cx="34" cy="68" r="4" fill="#fbcfe8" />
          <circle cx="80" cy="58" r="4" fill="#fbcfe8" />
        </svg>
      );
    case 'science':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D science test tube / flask */}
          <path
            d="M 42 15 L 58 15 L 58 35 L 78 72 C 84 82 76 92 64 92 L 36 92 C 24 92 16 82 22 72 L 42 35 Z"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Liquid */}
          <path d="M 28 62 L 72 62 L 76 72 C 81 80 74 88 64 88 L 36 88 C 26 88 19 80 24 72 Z" fill="#06b6d4" />
          <circle cx="45" cy="74" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="58" cy="68" r="3" fill="#ffffff" opacity="0.7" />
          <circle cx="52" cy="80" r="2.5" fill="#ffffff" opacity="0.6" />
          {/* Rim */}
          <rect x="38" y="10" width="24" height="6" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        </svg>
      );
    case 'knowledge':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D glowing lightbulb */}
          <circle cx="50" cy="40" r="34" fill="#fef08a" opacity="0.4" />
          <path
            d="M 28 42 C 22 26 32 12 50 12 C 68 12 78 26 72 42 C 68 52 62 58 58 66 L 42 66 C 38 58 32 52 28 42 Z"
            fill="#facc15"
            stroke="#eab308"
            strokeWidth="3"
          />
          <ellipse cx="40" cy="30" rx="6" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-25 40 30)" />
          <rect x="42" y="66" width="16" height="8" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
          <rect x="44" y="74" width="12" height="6" rx="2" fill="#64748b" />
          <path d="M 46 80 L 54 80" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'history':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D castle fort */}
          <path d="M 18 45 L 32 45 L 32 55 L 42 55 L 42 45 L 58 45 L 58 55 L 68 55 L 68 45 L 82 45 L 82 85 L 18 85 Z" fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
          {/* Middle arched door */}
          <path d="M 40 85 L 40 65 Q 50 56 60 65 L 60 85 Z" fill="#78350f" />
          {/* Roof flags */}
          <path d="M 25 45 L 25 28 L 38 34 L 25 40" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
          <path d="M 75 45 L 75 28 L 88 34 L 75 40" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
        </svg>
      );
    case 'manners':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D friendly handshake */}
          <path d="M 10 50 L 32 35 C 38 31 46 34 50 40 L 58 52 C 60 55 58 60 54 62 L 40 70 L 10 70 Z" fill="#fb7185" stroke="#e11d48" strokeWidth="2" />
          <path d="M 90 50 L 68 35 C 62 31 54 34 50 40 L 42 52 C 40 55 42 60 46 62 L 60 70 L 90 70 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          {/* Clasped fingers */}
          <ellipse cx="50" cy="52" rx="10" ry="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        </svg>
      );
    case 'english':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D notebook slate with 'abc' */}
          <rect x="18" y="16" width="64" height="68" rx="10" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          <rect x="25" y="24" width="50" height="52" rx="6" fill="#fef9c3" />
          <text x="30" y="58" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="28" fill="#4d7c0f">
            abc
          </text>
        </svg>
      );
    case 'mathematics':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D math symbols + - × ÷ */}
          <text x="14" y="44" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="38" fill="#ef4444">
            +
          </text>
          <text x="60" y="44" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="42" fill="#3b82f6">
            −
          </text>
          <text x="14" y="86" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="38" fill="#eab308">
            ×
          </text>
          <text x="60" y="86" fontFamily="Fredoka, Nunito, sans-serif" fontWeight="900" fontSize="38" fill="#8b5cf6">
            ÷
          </text>
        </svg>
      );
    case 'urdu':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D Urdu letters 'ا' 'ب' 'ج' */}
          <text x="12" y="72" fontFamily="sans-serif" fontWeight="900" fontSize="52" fill="#10b981" stroke="#047857" strokeWidth="1.5">
            ا
          </text>
          <text x="36" y="72" fontFamily="sans-serif" fontWeight="900" fontSize="48" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5">
            ب
          </text>
          <text x="64" y="72" fontFamily="sans-serif" fontWeight="900" fontSize="46" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5">
            ج
          </text>
        </svg>
      );
    case 'hindi':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D Hindi letters 'क' 'ग' */}
          <text x="8" y="70" fontFamily="sans-serif" fontWeight="900" fontSize="48" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1.5">
            क
          </text>
          <text x="52" y="70" fontFamily="sans-serif" fontWeight="900" fontSize="48" fill="#ec4899" stroke="#db2777" strokeWidth="1.5">
            ग
          </text>
        </svg>
      );
    case 'children-stories':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D child reading blue book */}
          <circle cx="50" cy="32" r="16" fill="#fed7aa" />
          <path d="M 36 30 C 35 15 45 10 58 10 C 66 10 68 18 64 30 C 60 22 55 18 48 18 C 42 18 38 22 36 30 Z" fill="#78350f" />
          <circle cx="45" cy="32" r="2" fill="#1e293b" />
          <circle cx="55" cy="32" r="2" fill="#1e293b" />
          {/* Blue Book */}
          <path d="M 22 72 Q 50 80 50 54 Q 50 80 78 72 L 82 46 Q 50 54 50 34 Q 50 54 18 46 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          <path d="M 25 70 Q 50 78 50 52 Q 50 78 75 70 L 78 46 Q 50 52 50 36 Q 50 52 22 46 Z" fill="#ffffff" />
        </svg>
      );
    case 'art-craft':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D painter palette & brush */}
          <path
            d="M 20 60 C 10 40 30 18 55 18 C 80 18 90 35 85 58 C 80 76 65 85 50 82 C 44 80 40 72 35 74 C 30 76 26 84 20 80 C 14 76 15 68 20 60 Z"
            fill="#fed7aa"
            stroke="#ea580c"
            strokeWidth="2.5"
          />
          {/* Paint blobs */}
          <circle cx="36" cy="32" r="6" fill="#ef4444" />
          <circle cx="55" cy="28" r="6" fill="#3b82f6" />
          <circle cx="72" cy="38" r="6" fill="#22c55e" />
          <circle cx="74" cy="58" r="6" fill="#facc15" />
          {/* Paintbrush */}
          <g transform="translate(40, 25) rotate(45)">
            <rect x="0" y="0" width="8" height="45" rx="3" fill="#78350f" />
            <rect x="0" y="40" width="8" height="12" fill="#cbd5e1" />
            <path d="M 0 52 C 0 60 8 60 8 52 Z" fill="#ef4444" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

// Practice Activity Icons
export const PracticeIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 64 }) => {
  switch (type) {
    case 'p-alphabets':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D A B C blocks */}
          <rect x="10" y="35" width="35" height="35" rx="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
          <text x="18" y="62" fontFamily="Nunito" fontWeight="900" fontSize="26" fill="#ffffff">
            A
          </text>
          <rect x="52" y="15" width="35" height="35" rx="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x="60" y="42" fontFamily="Nunito" fontWeight="900" fontSize="26" fill="#ffffff">
            B
          </text>
          <rect x="36" y="52" width="35" height="35" rx="8" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          <text x="44" y="79" fontFamily="Nunito" fontWeight="900" fontSize="26" fill="#ffffff">
            C
          </text>
        </svg>
      );
    case 'p-numbers':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D 1 2 3 blocks */}
          <rect x="30" y="10" width="32" height="32" rx="7" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <text x="40" y="34" fontFamily="Nunito" fontWeight="900" fontSize="24" fill="#ffffff">
            1
          </text>
          <rect x="14" y="45" width="32" height="32" rx="7" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />
          <text x="23" y="69" fontFamily="Nunito" fontWeight="900" fontSize="24" fill="#ffffff">
            2
          </text>
          <rect x="52" y="45" width="32" height="32" rx="7" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2" />
          <text x="61" y="69" fontFamily="Nunito" fontWeight="900" fontSize="24" fill="#ffffff">
            3
          </text>
        </svg>
      );
    case 'p-shapes':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* 3D geometric shapes: cylinder, cube, cone */}
          {/* Cylinder */}
          <ellipse cx="26" cy="35" rx="14" ry="7" fill="#60a5fa" />
          <rect x="12" y="35" width="28" height="30" fill="#3b82f6" />
          <ellipse cx="26" cy="65" rx="14" ry="7" fill="#1d4ed8" />
          {/* Cube */}
          <rect x="42" y="40" width="26" height="26" rx="4" fill="#f87171" stroke="#dc2626" strokeWidth="2" />
          {/* Cone */}
          <polygon points="80,32 94,70 66,70" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
        </svg>
      );
    case 'p-pattern':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Kids playing with blocks */}
          <circle cx="35" cy="35" r="14" fill="#fed7aa" />
          <path d="M 24 32 C 24 20 30 16 42 16 C 50 16 52 22 48 32 Z" fill="#78350f" />
          <circle cx="68" cy="38" r="13" fill="#fed7aa" />
          <path d="M 58 35 C 58 22 65 18 76 18 C 82 18 84 24 80 35 Z" fill="#1e293b" />
          <rect x="38" y="55" width="18" height="18" rx="4" fill="#ef4444" />
          <rect x="58" y="55" width="18" height="18" rx="4" fill="#eab308" />
        </svg>
      );
    case 'p-colour':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Colour shapes & crayons */}
          <rect x="18" y="35" width="25" height="25" rx="5" fill="#f43f5e" />
          <polygon points="56,30 72,60 40,60" fill="#3b82f6" />
          <rect x="62" y="42" width="22" height="22" rx="11" fill="#facc15" />
          <path d="M 30 75 L 75 75" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case 'p-pop':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Match & Pop bubbles */}
          <circle cx="35" cy="40" r="18" fill="#facc15" stroke="#eab308" strokeWidth="2" />
          <circle cx="30" cy="34" r="5" fill="#ffffff" opacity="0.6" />
          <circle cx="65" cy="35" r="16" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
          <circle cx="60" cy="30" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="50" cy="68" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <circle cx="45" cy="63" r="4" fill="#ffffff" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
};

// Hexagonal Badges (Quick Learner, Math Star, Problem Solver, etc.)
export const HexBadge: React.FC<{ type: string; isLocked?: boolean; size?: number }> = ({ type, isLocked = false, size = 68 }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center transition-transform hover:scale-105" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Hexagon shape */}
          <polygon
            points="50,5 90,26 90,74 50,95 10,74 10,26"
            fill={
              isLocked
                ? '#cbd5e1'
                : type === 'rocket'
                ? '#3b82f6'
                : type === 'math-star'
                ? '#f97316'
                : type === 'lightbulb'
                ? '#22c55e'
                : type === 'book'
                ? '#a855f7'
                : type === 'crown'
                ? '#ec4899'
                : '#64748b'
            }
            stroke={isLocked ? '#94a3b8' : '#ffffff'}
            strokeWidth="3"
          />
          {/* Inner ring */}
          <polygon
            points="50,12 83,29 83,71 50,88 17,71 17,29"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </svg>

        {/* Icon inside badge */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {isLocked ? (
            <svg className="w-7 h-7 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm3 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          ) : type === 'rocket' ? (
            <svg className="w-8 h-8 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
          ) : type === 'math-star' ? (
            <div className="font-extrabold text-xl tracking-tighter drop-shadow text-white select-none">
              + +<br className="leading-3" />− −
            </div>
          ) : type === 'lightbulb' ? (
            <svg className="w-8 h-8 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zm-2 18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1h-4v1z" />
            </svg>
          ) : type === 'book' ? (
            <svg className="w-8 h-8 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          ) : type === 'crown' ? (
            <svg className="w-8 h-8 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          ) : null}
        </div>
      </div>
    </div>
  );
};
