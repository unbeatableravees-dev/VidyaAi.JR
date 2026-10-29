import React from 'react';

const FLOATING_PARTICLES = [
  { id: 1, char: '⭐', left: '6%', delay: '0s', duration: 'animate-drift-slow', size: 'text-2xl', opacity: 'opacity-50' },
  { id: 2, char: '🫧', left: '16%', delay: '4s', duration: 'animate-drift-medium', size: 'text-3xl', opacity: 'opacity-60' },
  { id: 3, char: '✨', left: '26%', delay: '8s', duration: 'animate-drift-fast', size: 'text-xl', opacity: 'opacity-70' },
  { id: 4, char: '☁️', left: '38%', delay: '2s', duration: 'animate-drift-slow', size: 'text-3xl', opacity: 'opacity-40' },
  { id: 5, char: '🌟', left: '52%', delay: '6s', duration: 'animate-drift-medium', size: 'text-2xl', opacity: 'opacity-60' },
  { id: 6, char: '🎈', left: '64%', delay: '11s', duration: 'animate-drift-slow', size: 'text-2xl', opacity: 'opacity-50' },
  { id: 7, char: '🫧', left: '74%', delay: '1s', duration: 'animate-drift-fast', size: 'text-3xl', opacity: 'opacity-55' },
  { id: 8, char: '✨', left: '85%', delay: '7s', duration: 'animate-drift-medium', size: 'text-xl', opacity: 'opacity-70' },
  { id: 9, char: '⭐', left: '94%', delay: '3s', duration: 'animate-drift-slow', size: 'text-2xl', opacity: 'opacity-50' },
  { id: 10, char: '🚀', left: '44%', delay: '14s', duration: 'animate-drift-slow', size: 'text-xl', opacity: 'opacity-45' },
  { id: 11, char: '🎵', left: '20%', delay: '12s', duration: 'animate-drift-medium', size: 'text-xl', opacity: 'opacity-40' },
  { id: 12, char: '🫧', left: '80%', delay: '9s', duration: 'animate-drift-fast', size: 'text-2xl', opacity: 'opacity-50' },
];

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#ede9fe] to-[#fce7f3]">
      {/* Dreamy Aurora Orbs */}
      <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-sky-300/40 rounded-full blur-[100px] animate-aurora" />
      <div className="absolute top-1/4 -right-32 w-[32rem] h-[32rem] bg-purple-300/35 rounded-full blur-[90px] animate-aurora-reverse" />
      <div className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] bg-amber-200/40 rounded-full blur-[80px] animate-aurora" />
      <div className="absolute -bottom-32 right-1/3 w-[36rem] h-[36rem] bg-pink-200/40 rounded-full blur-[100px] animate-aurora-reverse" />
      <div className="absolute top-2/3 -left-20 w-[24rem] h-[24rem] bg-teal-200/35 rounded-full blur-[80px] animate-aurora" />

      {/* Floating Whimsical Kid Particles */}
      {FLOATING_PARTICLES.map((p) => (
        <span
          key={p.id}
          style={{
            left: p.left,
            animationDelay: p.delay,
          }}
          className={`absolute bottom-[-50px] ${p.size} ${p.opacity} ${p.duration} filter drop-shadow-sm`}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
