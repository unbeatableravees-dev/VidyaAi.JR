import React from 'react';

interface OrganIllustrationProps {
  type: string;
  size?: number;
  className?: string;
  animate?: boolean;
}

export const OrganIllustration: React.FC<OrganIllustrationProps> = ({
  type,
  size = 72,
  className = '',
  animate = false,
}) => {
  const animClass = animate ? 'animate-bounce-gentle' : '';

  switch (type) {
    case 'brain':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <defs>
            <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <path
            d="M 50 20 C 40 12, 22 18, 20 32 C 16 42, 18 52, 23 60 C 20 68, 24 78, 34 80 C 42 82, 47 75, 50 72 C 53 75, 58 82, 66 80 C 76 78, 80 68, 77 60 C 82 52, 84 42, 80 32 C 78 18, 60 12, 50 20 Z"
            fill="url(#brainGrad)"
            stroke="#9d174d"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 50 20 Q 48 45 50 72" stroke="#be185d" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 28 32 Q 38 30 42 38" stroke="#fbcfe8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 24 48 Q 36 44 45 50" stroke="#fbcfe8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 28 64 Q 38 60 44 64" stroke="#fbcfe8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 72 32 Q 62 30 58 38" stroke="#fbcfe8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 76 48 Q 64 44 55 50" stroke="#fbcfe8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 72 64 Q 62 60 56 64" stroke="#fbcfe8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="18" r="3" fill="#fef08a" />
          <path d="M 50 10 L 50 14" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'neuron':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <defs>
            <linearGradient id="neuronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          {/* Cell Body (Soma) */}
          <circle cx="35" cy="40" r="14" fill="url(#neuronGrad)" stroke="#312e81" strokeWidth="2.5" />
          <circle cx="35" cy="40" r="5" fill="#fef08a" />
          {/* Dendrites (Branches) */}
          <path d="M 24 32 L 10 24 M 14 28 L 8 36" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 30 26 L 24 12 M 28 18 L 36 10" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 44 30 L 54 18 M 50 22 L 60 26" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 23 46 L 12 52 M 16 50 L 10 60" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
          {/* Long Axon with Myelin Sheath */}
          <path d="M 48 44 Q 65 52 82 72" stroke="#4f46e5" strokeWidth="3" fill="none" />
          {/* Myelin beads */}
          <ellipse cx="56" cy="48" rx="5" ry="3" transform="rotate(25 56 48)" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <ellipse cx="68" cy="56" rx="5" ry="3" transform="rotate(35 68 56)" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <ellipse cx="78" cy="67" rx="5" ry="3" transform="rotate(45 78 67)" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Axon Terminal Branches */}
          <path d="M 82 72 L 94 72 M 82 72 L 90 82 M 82 72 L 86 64" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="94" cy="72" r="2" fill="#38bdf8" />
          <circle cx="90" cy="82" r="2" fill="#38bdf8" />
        </svg>
      );

    case 'skull':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <defs>
            <linearGradient id="skullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <path
            d="M 50 15 C 25 15, 20 38, 20 54 C 20 66, 28 72, 34 74 L 34 84 C 34 87, 40 89, 50 89 C 60 89, 66 87, 66 84 L 66 74 C 72 72, 80 66, 80 54 C 80 38, 75 15, 50 15 Z"
            fill="url(#skullGrad)"
            stroke="#475569"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse cx="36" cy="46" rx="9" ry="11" fill="#1e293b" />
          <ellipse cx="64" cy="46" rx="9" ry="11" fill="#1e293b" />
          <circle cx="34" cy="43" r="2.5" fill="#38bdf8" />
          <circle cx="62" cy="43" r="2.5" fill="#38bdf8" />
          <path d="M 50 56 L 46 66 L 54 66 Z" fill="#334155" />
          <path d="M 38 78 L 62 78" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <path d="M 44 75 L 44 81" stroke="#475569" strokeWidth="2.5" />
          <path d="M 50 75 L 50 81" stroke="#475569" strokeWidth="2.5" />
          <path d="M 56 75 L 56 81" stroke="#475569" strokeWidth="2.5" />
        </svg>
      );

    case 'eyes':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <defs>
            <linearGradient id="eyeIris" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <path d="M 12 50 Q 32 30 52 50 Q 32 70 12 50 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
          <circle cx="32" cy="50" r="12" fill="url(#eyeIris)" />
          <circle cx="32" cy="50" r="6" fill="#0f172a" />
          <circle cx="34" cy="47" r="2.5" fill="#ffffff" />
          <path d="M 48 50 Q 68 30 88 50 Q 68 70 48 50 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
          <circle cx="68" cy="50" r="12" fill="url(#eyeIris)" />
          <circle cx="68" cy="50" r="6" fill="#0f172a" />
          <circle cx="70" cy="47" r="2.5" fill="#ffffff" />
        </svg>
      );

    case 'retina':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Eyeball cross section */}
          <circle cx="48" cy="50" r="32" fill="#0f172a" stroke="#0284c7" strokeWidth="3" />
          {/* Golden Retina Layer */}
          <path d="M 30 24 C 70 20, 78 50, 78 50 C 78 50, 70 80, 30 76" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
          {/* Optic Nerve Cable exiting back */}
          <path d="M 78 50 L 96 50" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
          {/* Front Cornea & Lens */}
          <path d="M 20 36 C 14 44, 14 56, 20 64" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="26" cy="50" rx="4" ry="10" fill="#bae6fd" opacity="0.8" />
          <circle cx="60" cy="50" r="3" fill="#ef4444" />
        </svg>
      );

    case 'ears':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <defs>
            <linearGradient id="earGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path
            d="M 38 25 C 20 25 12 40 14 60 C 16 75 26 82 34 80 C 40 78 40 68 34 66 C 26 64 22 55 24 45 C 26 35 34 32 38 32 Z"
            fill="url(#earGrad)"
            stroke="#c2410c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M 62 25 C 80 25 88 40 86 60 C 84 75 74 82 66 80 C 60 78 60 68 66 66 C 74 64 78 55 76 45 C 74 35 66 32 62 32 Z"
            fill="url(#earGrad)"
            stroke="#c2410c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 45 42 Q 50 50 45 58" stroke="#ea580c" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 55 42 Q 50 50 55 58" stroke="#ea580c" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'ear-bones':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Hammer (Malleus) */}
          <path d="M 22 30 L 40 38 L 34 60" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Anvil (Incus) */}
          <path d="M 40 38 L 58 40 L 52 64" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Stirrup (Stapes) */}
          <path d="M 52 64 L 76 68 L 76 80 L 52 64" fill="#f87171" stroke="#dc2626" strokeWidth="2.5" />
          <circle cx="76" cy="74" r="5" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
          <text x="14" y="22" fill="#ca8a04" fontSize="10" fontWeight="bold">Hammer</text>
          <text x="46" y="24" fill="#2563eb" fontSize="10" fontWeight="bold">Anvil</text>
          <text x="60" y="92" fill="#dc2626" fontSize="10" fontWeight="bold">Stirrup</text>
        </svg>
      );

    case 'nose':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Nose bridge & nostrils */}
          <path d="M 48 18 Q 44 45 36 65 C 32 74, 42 82, 50 82 C 58 82, 68 74, 64 65 Q 56 45 52 18" fill="#fed7aa" stroke="#c2410c" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="43" cy="72" rx="4" ry="2.5" fill="#7c2d12" />
          <ellipse cx="57" cy="72" rx="4" ry="2.5" fill="#7c2d12" />
          {/* Aroma waves entering */}
          <path d="M 30 78 Q 24 86 28 92" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 70 78 Q 76 86 72 92" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'tongue':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path d="M 20 40 Q 50 30 80 40 Q 50 88 20 40 Z" fill="#881337" stroke="#4c0519" strokeWidth="3" />
          <path d="M 32 45 C 32 68, 36 86, 50 86 C 64 86, 68 68, 68 45 Z" fill="#fb7185" stroke="#be123c" strokeWidth="3" />
          <path d="M 50 48 L 50 78" stroke="#9f1239" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="42" cy="60" r="1.5" fill="#ffe4e6" />
          <circle cx="58" cy="60" r="1.5" fill="#ffe4e6" />
        </svg>
      );

    case 'teeth':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path
            d="M 28 28 C 28 20, 40 18, 50 20 C 60 18, 72 20, 72 28 C 76 44, 78 52, 70 78 C 66 84, 60 84, 58 76 C 54 62, 52 62, 48 76 C 46 84, 40 84, 36 78 C 28 52, 30 44, 28 28 Z"
            fill="#ffffff"
            stroke="#0284c7"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 38 28 Q 50 32 62 28" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <polygon points="72,20 75,14 78,20 84,23 78,26 75,32 72,26 66,23" fill="#facc15" />
        </svg>
      );

    case 'heart':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>
          <path d="M 30 14 L 30 32 L 39 32 L 39 14 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          <path d="M 44 26 C 44 10, 62 10, 64 26" fill="none" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
          <path
            d="M 50 36 C 36 24, 20 34, 22 52 C 24 70, 42 84, 52 92 C 62 84, 80 70, 82 52 C 84 34, 68 24, 54 36 Z"
            fill="url(#heartGrad)"
            stroke="#881337"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 46 42 Q 44 60 52 74" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'heart-valves':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Valve ring collar */}
          <circle cx="50" cy="50" r="34" fill="#ffe4e6" stroke="#e11d48" strokeWidth="4" />
          {/* 3 Cusp Leaflets meeting in center */}
          <path d="M 50 50 Q 30 30 50 18" stroke="#be123c" strokeWidth="3" fill="none" />
          <path d="M 50 50 Q 72 45 74 72" stroke="#be123c" strokeWidth="3" fill="none" />
          <path d="M 50 50 Q 35 70 26 70" stroke="#be123c" strokeWidth="3" fill="none" />
          <circle cx="50" cy="50" r="4" fill="#dc2626" />
          <path d="M 44 32 L 56 32 M 62 58 L 68 50 M 34 56 L 40 62" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );

    case 'lungs':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path d="M 47 12 L 53 12 L 53 38 L 47 38 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
          <path d="M 48 38 Q 38 45 32 52" stroke="#0369a1" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 52 38 Q 62 45 68 52" stroke="#0369a1" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path
            d="M 44 38 C 30 36, 16 48, 16 66 C 16 82, 30 88, 44 84 C 44 68, 44 50, 44 38 Z"
            fill="#38bdf8"
            stroke="#0369a1"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M 56 38 C 70 36, 84 48, 84 66 C 84 82, 70 88, 56 84 C 56 68, 56 50, 56 38 Z"
            fill="#38bdf8"
            stroke="#0369a1"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'alveoli':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Bronchiole stem */}
          <path d="M 50 14 L 50 40" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
          {/* Grape cluster of air sacs */}
          <circle cx="36" cy="46" r="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="56" cy="42" r="11" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="42" cy="62" r="12" fill="#38bdf8" stroke="#0369a1" strokeWidth="2.5" />
          <circle cx="64" cy="58" r="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="52" cy="74" r="11" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2.5" />
          {/* Red & Blue capillaries wrapping around */}
          <path d="M 28 46 Q 38 60 52 74" stroke="#ef4444" strokeWidth="2" fill="none" />
          <path d="M 64 42 Q 54 58 42 78" stroke="#2563eb" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'diaphragm':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Rib arches outline */}
          <path d="M 14 74 C 20 30, 80 30, 86 74" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
          {/* Dome muscle */}
          <path d="M 16 66 C 24 38, 76 38, 84 66 C 68 56, 32 56, 16 66 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="3" />
          {/* Central Tendon */}
          <ellipse cx="50" cy="48" rx="14" ry="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 50 54 L 50 78" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="50,82 46,74 54,74" fill="#3b82f6" />
        </svg>
      );

    case 'ribcage':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path d="M 46 22 L 54 22 L 53 70 L 47 70 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
          <ellipse cx="50" cy="18" rx="8" ry="5" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
          <path d="M 46 26 C 26 28, 20 40, 46 44" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 46 36 C 22 40, 18 54, 46 58" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 46 48 C 24 54, 20 68, 46 72" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 54 26 C 74 28, 80 40, 54 44" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 54 36 C 78 40, 82 54, 54 58" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 54 48 C 76 54, 80 68, 54 72" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'veins':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Branching blue veins */}
          <path d="M 50 14 Q 48 45 42 60 Q 36 75 22 88" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
          <path d="M 46 42 Q 62 55 76 74" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <path d="M 60 54 Q 58 72 62 86" fill="none" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 38 66 Q 44 76 46 88" fill="none" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />
          {/* Inner pocket valve indicator */}
          <ellipse cx="49" cy="28" rx="5" ry="3" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
        </svg>
      );

    case 'arteries':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* High pressure thick red Aorta arch */}
          <path d="M 40 84 L 40 46 C 40 22, 68 22, 68 46 L 68 84" fill="none" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
          {/* Top 3 arch vessels */}
          <path d="M 45 28 L 42 14" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          <path d="M 54 24 L 54 10" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          <path d="M 63 28 L 66 14" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          {/* Branching arterioles */}
          <path d="M 68 60 Q 82 72 88 84" stroke="#f87171" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="54" cy="50" r="3" fill="#ffffff" />
        </svg>
      );

    case 'capillaries':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Red arteriole on left, blue venule on right */}
          <path d="M 18 16 L 18 84" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
          <path d="M 82 16 L 82 84" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
          {/* Microscopic connecting capillary web */}
          <path d="M 18 28 Q 50 20 82 28" stroke="#a855f7" strokeWidth="2.5" fill="none" />
          <path d="M 18 42 Q 50 36 82 42" stroke="#a855f7" strokeWidth="2.5" fill="none" />
          <path d="M 18 58 Q 50 64 82 58" stroke="#a855f7" strokeWidth="2.5" fill="none" />
          <path d="M 18 72 Q 50 80 82 72" stroke="#a855f7" strokeWidth="2.5" fill="none" />
          {/* Cross links */}
          <line x1="38" y1="26" x2="42" y2="74" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="62" y1="26" x2="58" y2="74" stroke="#c084fc" strokeWidth="1.5" />
          {/* Single cell dots moving */}
          <circle cx="38" cy="42" r="3" fill="#ef4444" />
          <circle cx="62" cy="42" r="3" fill="#3b82f6" />
        </svg>
      );

    case 'blood-cells':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Red Blood Cell (Biconcave disc) */}
          <circle cx="40" cy="42" r="20" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
          <ellipse cx="40" cy="42" rx="10" ry="8" fill="#b91c1c" />
          {/* Second Red Cell */}
          <circle cx="66" cy="64" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
          <ellipse cx="66" cy="64" rx="8" ry="6" fill="#dc2626" />
          {/* White Blood Cell (Warrior with lobes) */}
          <circle cx="68" cy="30" r="14" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2.5" />
          <circle cx="65" cy="28" r="3.5" fill="#818cf8" />
          <circle cx="72" cy="32" r="3.5" fill="#818cf8" />
        </svg>
      );

    case 'platelets':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Activated spiky star platelet */}
          <path
            d="M 50 20 L 56 36 L 74 30 L 64 46 L 82 54 L 64 62 L 72 78 L 56 70 L 48 86 L 42 68 L 26 76 L 34 60 L 18 52 L 34 44 L 26 28 L 42 36 Z"
            fill="#facc15"
            stroke="#ca8a04"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="50" r="10" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="48" cy="48" r="3" fill="#eab308" />
        </svg>
      );

    case 'stomach':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path d="M 36 12 L 44 12 L 44 26 L 36 26 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="2" />
          <path
            d="M 42 24 C 64 24, 76 34, 76 56 C 76 76, 56 88, 38 88 C 24 88, 18 76, 22 66 C 26 56, 36 58, 44 58 C 54 58, 56 46, 42 40 Z"
            fill="#ea580c"
            stroke="#9a3412"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 42 66 Q 52 68 58 60" stroke="#fef08a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'liver':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path
            d="M 20 44 C 20 28, 48 24, 78 30 C 86 32, 88 42, 82 54 C 74 68, 52 76, 32 74 C 22 72, 18 60, 20 44 Z"
            fill="#9a3412"
            stroke="#451a03"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse cx="56" cy="74" rx="7" ry="11" transform="rotate(-25 56 74)" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
          <path d="M 52 28 Q 50 48 48 72" stroke="#451a03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'gallbladder':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Pear-shaped green gallbladder */}
          <path
            d="M 50 16 L 50 30 C 44 32, 34 42, 34 58 C 34 74, 42 86, 54 86 C 66 86, 74 74, 74 58 C 74 42, 64 32, 58 30 L 58 16 Z"
            fill="#22c55e"
            stroke="#15803d"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="54" cy="56" r="3" fill="#bbf7d0" />
          <path d="M 54 16 L 70 10" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'pancreas':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path
            d="M 22 52 C 22 40, 36 34, 48 38 C 66 42, 82 46, 86 52 C 86 58, 70 64, 48 64 C 36 64, 22 62, 22 52 Z"
            fill="#facc15"
            stroke="#ca8a04"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 26 52 Q 54 50 82 52" stroke="#a16207" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="82" cy="52" r="3" fill="#38bdf8" />
        </svg>
      );

    case 'kidneys':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path
            d="M 34 26 C 22 26, 16 38, 16 52 C 16 66, 22 78, 34 78 C 42 78, 40 68, 36 60 C 32 52, 32 46, 36 40 C 40 32, 42 26, 34 26 Z"
            fill="#9f1239"
            stroke="#4c0519"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 34 56 Q 38 68 38 88" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path
            d="M 66 30 C 78 30, 84 42, 84 56 C 84 70, 78 82, 66 82 C 58 82, 60 72, 64 64 C 68 56, 68 50, 64 44 C 60 36, 58 30, 66 30 Z"
            fill="#9f1239"
            stroke="#4c0519"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 66 60 Q 62 72 62 88" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'nephrons':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Glomerulus knot (red) */}
          <circle cx="36" cy="32" r="10" fill="#f87171" stroke="#dc2626" strokeWidth="2.5" />
          {/* Bowman's capsule cup */}
          <path d="M 24 24 C 20 42, 52 42, 48 24" fill="none" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" />
          {/* Twisting Tubule and Loop of Henle */}
          <path d="M 46 38 Q 62 38 62 52 Q 62 76 54 84 Q 46 84 46 62 Q 46 48 74 48 L 74 88" fill="none" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'bladder':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Two incoming ureters */}
          <path d="M 28 14 L 38 32" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <path d="M 72 14 L 62 32" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          {/* Expandable balloon sac */}
          <path
            d="M 50 30 C 26 30, 22 50, 24 66 C 26 80, 42 86, 50 86 C 58 86, 74 80, 76 66 C 78 50, 74 30, 50 30 Z"
            fill="#fde047"
            stroke="#ca8a04"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Urethra exit */}
          <path d="M 50 86 L 50 94" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'small-intestine':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <rect x="22" y="24" width="56" height="52" rx="26" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.5" />
          <path
            d="M 28 34 Q 50 28 72 34 Q 74 42 66 46 Q 34 46 32 54 Q 30 62 48 64 Q 68 64 70 70 Q 70 78 50 78 Q 30 78 28 70"
            fill="none"
            stroke="#f87171"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'villi':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Multiple finger-like villi projections */}
          <path
            d="M 16 80 L 16 42 C 16 34, 28 34, 28 42 L 28 70 L 36 70 L 36 34 C 36 26, 48 26, 48 34 L 48 70 L 56 70 L 56 30 C 56 22, 68 22, 68 30 L 68 70 L 76 70 L 76 42 C 76 34, 88 34, 88 42 L 88 80 Z"
            fill="#fed7aa"
            stroke="#ea580c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Central blood vessels in middle finger */}
          <path d="M 42 66 L 42 36" stroke="#ef4444" strokeWidth="2" />
          <path d="M 62 66 L 62 32" stroke="#3b82f6" strokeWidth="2" />
        </svg>
      );

    case 'large-intestine':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path
            d="M 24 76 L 24 34 C 24 24, 76 24, 76 34 L 76 74 L 66 74 L 66 38 C 66 32, 34 32, 34 38 L 34 76 Z"
            fill="#ea580c"
            stroke="#7c2d12"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M 24 76 Q 16 84 18 90" stroke="#c2410c" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'appendix':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Intestinal pouch & curved worm appendix */}
          <path d="M 30 18 L 30 60 C 30 72, 50 72, 50 60 L 50 18" fill="#fdba74" stroke="#c2410c" strokeWidth="3" />
          <path d="M 40 68 Q 42 86 64 82 Q 74 80 72 70" fill="none" stroke="#ea580c" strokeWidth="7" strokeLinecap="round" />
          <circle cx="70" cy="72" r="3" fill="#22c55e" />
        </svg>
      );

    case 'spleen':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Purple bean shaped spleen */}
          <path
            d="M 32 20 C 58 14, 78 28, 76 56 C 74 82, 54 88, 36 80 C 22 72, 20 34, 32 20 Z"
            fill="#7e22ce"
            stroke="#581c87"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Splenic vessels notch */}
          <path d="M 28 44 L 40 46" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          <path d="M 30 52 L 42 52" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'spine':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path d="M 50 10 L 50 90" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          {[16, 26, 36, 46, 56, 66, 76].map((y) => (
            <g key={y}>
              <rect x="36" y={y} width="28" height="6" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
              <circle cx="30" cy={y + 3} r="2.5" fill="#94a3b8" />
              <circle cx="70" cy={y + 3} r="2.5" fill="#94a3b8" />
            </g>
          ))}
          <polygon points="40,84 60,84 50,94" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
        </svg>
      );

    case 'spinal-cord':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Glowing central cord */}
          <rect x="42" y="10" width="16" height="80" rx="8" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          {/* Branching pairs of spinal nerves */}
          {[20, 32, 44, 56, 68, 80].map((y) => (
            <g key={y}>
              <path d={`M 42 ${y} Q 28 ${y + 6} 14 ${y}`} stroke="#6366f1" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d={`M 58 ${y} Q 72 ${y + 6} 86 ${y}`} stroke="#6366f1" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      );

    case 'pelvis':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path
            d="M 50 32 C 34 18, 16 26, 16 46 C 16 62, 28 72, 38 78 C 44 82, 50 82, 50 82 C 50 82, 56 82, 62 78 C 72 72, 84 62, 84 46 C 84 26, 66 18, 50 32 Z"
            fill="#cbd5e1"
            stroke="#475569"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse cx="50" cy="56" rx="14" ry="12" fill="#0f172a" opacity="0.1" stroke="#475569" strokeWidth="2.5" />
        </svg>
      );

    case 'femur':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <circle cx="34" cy="22" r="9" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
          <path
            d="M 38 28 L 56 30 C 62 30, 62 40, 56 46 L 54 74 C 54 82, 66 84, 62 90 C 58 94, 50 90, 50 86 C 50 90, 42 94, 38 90 C 34 84, 46 82, 46 74 L 44 46 C 40 40, 36 34, 38 28 Z"
            fill="#cbd5e1"
            stroke="#334155"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'joints-cartilage':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Upper bone & Lower bone */}
          <path d="M 36 12 L 36 32 C 36 40, 64 40, 64 32 L 64 12" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
          <path d="M 36 88 L 36 68 C 36 60, 64 60, 64 68 L 64 88" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
          {/* Blue Cartilage Pads */}
          <ellipse cx="50" cy="38" rx="15" ry="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <ellipse cx="50" cy="62" rx="15" ry="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          {/* Synovial fluid space */}
          <ellipse cx="50" cy="50" rx="18" ry="6" fill="#fef08a" opacity="0.6" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );

    case 'ligaments':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Crossing ligaments (like ACL / PCL) */}
          <line x1="28" y1="24" x2="72" y2="76" stroke="#059669" strokeWidth="7" strokeLinecap="round" />
          <line x1="72" y1="24" x2="28" y2="76" stroke="#10b981" strokeWidth="7" strokeLinecap="round" />
          <circle cx="50" cy="50" r="5" fill="#34d399" />
        </svg>
      );

    case 'biceps':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path
            d="M 18 72 L 32 46 C 40 32, 56 22, 68 28 C 78 34, 76 50, 64 62 L 78 78 C 84 84, 76 90, 70 86 L 50 68 L 32 80 C 26 84, 14 78, 18 72 Z"
            fill="#e11d48"
            stroke="#881337"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 44 38 Q 56 24 66 38" stroke="#ffe4e6" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'knee':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <path d="M 38 14 L 38 34 C 38 42, 62 42, 62 34 L 62 14 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
          <path d="M 36 64 C 36 56, 64 56, 64 64 L 64 88 L 36 88 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
          <ellipse cx="50" cy="48" rx="16" ry="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <circle cx="50" cy="46" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
          <path d="M 50 55 L 50 66" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'hand-fingers':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Hand with 5 fingers and opposable thumb */}
          <path
            d="M 40 86 L 40 68 L 22 56 C 18 52, 24 44, 30 48 L 40 54 L 40 28 C 40 22, 48 22, 48 28 L 48 50 L 52 24 C 52 18, 60 18, 60 24 L 60 50 L 64 28 C 64 22, 72 22, 72 28 L 72 52 L 76 38 C 76 32, 84 34, 84 40 L 82 66 C 80 80, 68 86, 56 86 Z"
            fill="#fed7aa"
            stroke="#ea580c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'foot-ankle':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Ankle, arched sole, heel, and toes */}
          <path
            d="M 38 16 L 38 46 C 36 54, 20 60, 20 72 C 20 84, 36 88, 54 86 C 76 84, 86 78, 88 68 C 88 58, 76 56, 70 60 L 54 44 L 54 16 Z"
            fill="#fed7aa"
            stroke="#c2410c"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Spring arch highlight */}
          <path d="M 32 78 Q 50 68 68 76" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'skin':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          <rect x="18" y="22" width="64" height="16" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.5" />
          <rect x="18" y="40" width="64" height="22" rx="4" fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
          <rect x="18" y="64" width="64" height="16" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
          <path d="M 38 52 Q 40 32 46 12" stroke="#451a03" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 64 52 Q 62 34 68 12" stroke="#451a03" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'nails':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Fingertip silhouette */}
          <path d="M 30 84 L 30 40 C 30 20, 70 20, 70 40 L 70 84 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="3" />
          {/* Shiny pink nail plate */}
          <path d="M 36 46 C 36 28, 64 28, 64 46 L 64 68 C 64 74, 36 74, 36 68 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="2.5" />
          {/* Lunula half-moon at base */}
          <ellipse cx="50" cy="68" rx="8" ry="4" fill="#ffffff" />
          <path d="M 42 36 Q 50 32 58 36" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'dna':
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={`${animClass} ${className} drop-shadow-md`}>
          {/* Double helix twisted strands */}
          <path d="M 28 14 Q 50 32 72 50 Q 50 68 28 86" stroke="#ec4899" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 72 14 Q 50 32 28 50 Q 50 68 72 86" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Chemical base rungs */}
          <line x1="32" y1="20" x2="68" y2="20" stroke="#facc15" strokeWidth="3" />
          <line x1="42" y1="36" x2="58" y2="36" stroke="#10b981" strokeWidth="3" />
          <line x1="42" y1="64" x2="58" y2="64" stroke="#facc15" strokeWidth="3" />
          <line x1="32" y1="80" x2="68" y2="80" stroke="#10b981" strokeWidth="3" />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: size, height: size }}
          className={`rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-lg ${animClass} ${className}`}
        >
          🔬
        </div>
      );
  }
};
