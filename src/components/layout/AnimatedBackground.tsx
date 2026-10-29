import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  isFourPoint: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
  thickness: number;
  color: string;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleOffset: number;
  hue: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initBubbles();
    };
    window.addEventListener('resize', handleResize);

    // Color palettes for stars
    const starColors = [
      '#facc15', // Gold
      '#38bdf8', // Cyan
      '#f472b6', // Rose pink
      '#c084fc', // Lilac
      '#ffffff', // Diamond
    ];

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let bubbles: Bubble[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 18000) + 35;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.8 + 1.2,
          baseAlpha: Math.random() * 0.5 + 0.35,
          alpha: 0.5,
          twinkleSpeed: Math.random() * 0.04 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          isFourPoint: Math.random() > 0.45,
        });
      }
    };

    const initBubbles = () => {
      bubbles = [];
      const count = Math.min(18, Math.floor(width / 90) + 6);
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 22 + 12,
          speedY: Math.random() * 0.7 + 0.35,
          wobbleSpeed: Math.random() * 0.03 + 0.015,
          wobbleAmp: Math.random() * 25 + 10,
          wobbleOffset: Math.random() * Math.PI * 2,
          hue: Math.random() * 360,
        });
      }
    };

    initStars();
    initBubbles();

    // Shooting star spawn timer
    let nextShootingStarTime = Date.now() + 1500;

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Stars
      stars.forEach((s) => {
        s.alpha = s.baseAlpha + Math.sin(time * 2 + s.twinklePhase) * 0.35;
        if (s.alpha < 0.1) s.alpha = 0.1;
        if (s.alpha > 0.95) s.alpha = 0.95;

        ctx.save();
        ctx.globalAlpha = s.alpha;

        if (s.isFourPoint && s.size > 2.2) {
          // Draw 4-point twinkling star
          ctx.translate(s.x, s.y);
          ctx.rotate(time * 0.2 + s.twinklePhase);

          const r = s.size * 2.5;
          ctx.fillStyle = s.color;

          // Glowing radial halo
          const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.5);
          halo.addColorStop(0, s.color);
          halo.addColorStop(1, 'transparent');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // 4-point cross
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.moveTo(-r, 0);
          ctx.lineTo(r, 0);
          ctx.moveTo(0, -r);
          ctx.lineTo(0, r);
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Center bright core
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } else {
          // Draw circular glowing star
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }
        ctx.restore();
      });

      // 2. Spawn & Draw Shooting Stars (Comets)
      const now = Date.now();
      if (now > nextShootingStarTime) {
        shootingStars.push({
          x: Math.random() * (width * 0.7) + 50,
          y: Math.random() * (height * 0.4),
          len: Math.random() * 140 + 90,
          speed: Math.random() * 7 + 9,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1.0,
          thickness: Math.random() * 1.5 + 2.0,
          color: Math.random() > 0.5 ? '#facc15' : '#38bdf8',
        });
        nextShootingStarTime = now + Math.random() * 3500 + 2000;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const cs = shootingStars[i];
        cs.x += Math.cos(cs.angle) * cs.speed;
        cs.y += Math.sin(cs.angle) * cs.speed;
        cs.alpha -= 0.016;

        if (cs.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = cs.alpha;
        const tailX = cs.x - Math.cos(cs.angle) * cs.len;
        const tailY = cs.y - Math.sin(cs.angle) * cs.len;

        const grad = ctx.createLinearGradient(tailX, tailY, cs.x, cs.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.7, cs.color);
        grad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = grad;
        ctx.lineWidth = cs.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(cs.x, cs.y);
        ctx.stroke();

        // Glowing Comet Head
        ctx.beginPath();
        ctx.arc(cs.x, cs.y, cs.thickness * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = cs.color;
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.restore();
      }

      // 3. Draw Floating Soap Bubbles with Refraction
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        const wobble = Math.sin(time * 2 + b.wobbleOffset) * b.wobbleAmp;
        const curX = b.x + wobble;

        // Reset bubble when floats off top
        if (b.y + b.radius < -20) {
          b.y = height + b.radius + 10;
          b.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(curX, b.y);

        // Bubble shell with iridescent gradient
        const rimGrad = ctx.createRadialGradient(
          -b.radius * 0.3,
          -b.radius * 0.3,
          b.radius * 0.2,
          0,
          0,
          b.radius
        );
        rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        rimGrad.addColorStop(0.7, `hsla(${b.hue}, 85%, 75%, 0.18)`);
        rimGrad.addColorStop(0.95, `hsla(${(b.hue + 80) % 360}, 90%, 65%, 0.45)`);
        rimGrad.addColorStop(1, 'rgba(255, 255, 255, 0.65)');

        ctx.fillStyle = rimGrad;
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Thin outer bubble ring
        ctx.strokeStyle = `hsla(${b.hue}, 90%, 75%, 0.4)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Highlight glint (top left)
        ctx.beginPath();
        ctx.arc(
          -b.radius * 0.4,
          -b.radius * 0.4,
          b.radius * 0.22,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();

        // Second subtle highlight (bottom right)
        ctx.beginPath();
        ctx.arc(
          b.radius * 0.35,
          b.radius * 0.35,
          b.radius * 0.1,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#fed7aa]/50">
      {/* Dynamic Glowing Aurora Backdrops */}
      <div className="absolute -top-36 -left-36 w-[36rem] h-[36rem] bg-sky-400/30 rounded-full blur-[110px] animate-aurora" />
      <div className="absolute top-1/4 -right-32 w-[34rem] h-[34rem] bg-indigo-400/25 rounded-full blur-[100px] animate-aurora-reverse" />
      <div className="absolute bottom-10 left-1/4 w-[30rem] h-[30rem] bg-amber-300/35 rounded-full blur-[90px] animate-aurora" />
      <div className="absolute -bottom-36 right-1/4 w-[38rem] h-[38rem] bg-pink-300/30 rounded-full blur-[120px] animate-aurora-reverse" />
      <div className="absolute top-2/3 -left-20 w-[26rem] h-[26rem] bg-emerald-300/25 rounded-full blur-[90px] animate-aurora" />

      {/* Subtle Pastel Rainbow Arc in Top-Right Corner */}
      <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full border-[18px] border-transparent opacity-40 animate-rainbow pointer-events-none [border-top-color:#f472b6] [border-left-color:#facc15] [border-right-color:#38bdf8] [border-bottom-color:#a855f7] blur-[1px]" />

      {/* Floating Whimsical Cartoon Clouds (Drifting smoothly across screen) */}
      <div className="absolute top-16 animate-cloud-slow opacity-60">
        <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
          <path
            d="M 30 75 C 10 75 0 60 5 45 C 8 32 25 25 38 30 C 45 12 70 5 95 12 C 115 5 140 10 150 25 C 168 18 190 28 195 45 C 215 50 220 75 190 75 Z"
            fill="white"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      <div className="absolute top-44 animate-cloud-fast opacity-45">
        <svg width="170" height="70" viewBox="0 0 170 70" fill="none">
          <path
            d="M 25 58 C 8 58 0 45 4 34 C 6 24 20 18 30 22 C 35 8 55 3 75 8 C 90 3 110 7 118 18 C 132 13 148 20 152 34 C 168 38 172 58 148 58 Z"
            fill="white"
            fillOpacity="0.9"
          />
        </svg>
      </div>

      <div className="absolute top-3/4 animate-cloud-slow opacity-40">
        <svg width="240" height="95" viewBox="0 0 240 95" fill="none">
          <path
            d="M 32 80 C 12 80 0 64 6 48 C 9 34 27 27 41 32 C 48 13 75 6 102 13 C 124 6 151 11 162 27 C 182 20 205 30 211 48 C 232 54 238 80 206 80 Z"
            fill="white"
            fillOpacity="0.8"
          />
        </svg>
      </div>

      {/* Cute Hot Air Balloon gently sailing horizontally across sky */}
      <div className="absolute top-28 animate-balloon opacity-75">
        <div className="relative w-16 h-20 filter drop-shadow-md">
          {/* Balloon Envelope */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-sky-400 shadow-inner flex items-center justify-center border border-white/60">
            <span className="text-xl">⭐</span>
          </div>
          {/* Strings */}
          <div className="w-8 h-2 mx-auto border-x border-slate-500/60" />
          {/* Basket */}
          <div className="w-5 h-4 mx-auto rounded-sm bg-amber-800 shadow-sm border border-amber-900" />
        </div>
      </div>

      {/* Fullscreen HTML5 Particle Canvas (Twinkles, Shooting Stars, Bubbles) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
