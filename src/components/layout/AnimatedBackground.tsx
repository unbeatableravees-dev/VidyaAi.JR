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
    let isVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initBubbles();
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

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
      // Keep count lightweight and calm for ultra performance
      const count = Math.min(36, Math.floor((width * height) / 36000) + 16);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 1.2,
          baseAlpha: Math.random() * 0.4 + 0.35,
          alpha: 0.5,
          twinkleSpeed: Math.random() * 0.03 + 0.012,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          isFourPoint: Math.random() > 0.6,
        });
      }
    };

    const initBubbles = () => {
      bubbles = [];
      // Lightweight bubble count
      const count = Math.min(8, Math.floor(width / 180) + 3);
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 16 + 10,
          speedY: Math.random() * 0.5 + 0.25,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleAmp: Math.random() * 18 + 8,
          wobbleOffset: Math.random() * Math.PI * 2,
          hue: Math.random() * 360,
        });
      }
    };

    initStars();
    initBubbles();

    let nextShootingStarTime = Date.now() + 2500;
    let time = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) return;

      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      time += delta * 1.5;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Stars (Clean, zero shadowBlur for 60fps)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha = s.baseAlpha + Math.sin(time * 2 + s.twinklePhase) * 0.3;
        if (s.alpha < 0.15) s.alpha = 0.15;
        if (s.alpha > 0.9) s.alpha = 0.9;

        ctx.save();
        ctx.globalAlpha = s.alpha;

        if (s.isFourPoint && s.size > 2.0) {
          ctx.translate(s.x, s.y);
          ctx.rotate(time * 0.15 + s.twinklePhase);
          const r = s.size * 2.2;

          // Cross sparkle
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-r, 0);
          ctx.lineTo(r, 0);
          ctx.moveTo(0, -r);
          ctx.lineTo(0, r);
          ctx.stroke();

          // Bright center
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } else {
          // Circular star with soft halo
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.alpha * 0.35;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = s.alpha;
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. Shooting Stars (Lightweight comet streak)
      const currentTime = Date.now();
      if (currentTime > nextShootingStarTime) {
        shootingStars.push({
          x: Math.random() * (width * 0.7) + 50,
          y: Math.random() * (height * 0.35),
          len: Math.random() * 110 + 70,
          speed: Math.random() * 6 + 7,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 0.9,
          thickness: 1.8,
          color: Math.random() > 0.5 ? '#facc15' : '#38bdf8',
        });
        nextShootingStarTime = currentTime + Math.random() * 4500 + 3500;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const cs = shootingStars[i];
        cs.x += Math.cos(cs.angle) * cs.speed;
        cs.y += Math.sin(cs.angle) * cs.speed;
        cs.alpha -= 0.015;

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

        ctx.beginPath();
        ctx.arc(cs.x, cs.y, cs.thickness * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // 3. Floating Soap Bubbles (Silky soft pastel circles)
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speedY;
        const wobble = Math.sin(time * 1.8 + b.wobbleOffset) * b.wobbleAmp;
        const curX = b.x + wobble;

        if (b.y + b.radius < -20) {
          b.y = height + b.radius + 10;
          b.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(curX, b.y);

        // Soft iridescent bubble shell
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue}, 80%, 75%, 0.12)`;
        ctx.fill();

        ctx.strokeStyle = `hsla(${b.hue}, 85%, 70%, 0.35)`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Highlight sheen
        ctx.beginPath();
        ctx.arc(-b.radius * 0.35, -b.radius * 0.35, b.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#fed7aa]/40">
      {/* Zero-Lag Aurora Glows using CSS radial gradients directly (NO blur filter penalties) */}
      <div
        className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(56, 189, 248, 0) 70%)',
        }}
      />
      <div
        className="absolute top-1/4 -right-28 w-[32rem] h-[32rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.25) 0%, rgba(129, 140, 248, 0) 70%)',
        }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] rounded-full pointer-events-none opacity-55"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.28) 0%, rgba(251, 191, 36, 0) 70%)',
        }}
      />
      <div
        className="absolute -bottom-32 right-1/4 w-[36rem] h-[36rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.24) 0%, rgba(244, 114, 182, 0) 70%)',
        }}
      />
      <div
        className="absolute top-2/3 -left-20 w-[26rem] h-[26rem] rounded-full pointer-events-none opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.22) 0%, rgba(52, 211, 153, 0) 70%)',
        }}
      />

      {/* Floating Cartoon Clouds */}
      <div className="absolute top-16 animate-cloud-slow opacity-60">
        <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
          <path
            d="M 30 75 C 10 75 0 60 5 45 C 8 32 25 25 38 30 C 45 12 70 5 95 12 C 115 5 140 10 150 25 C 168 18 190 28 195 45 C 215 50 220 75 190 75 Z"
            fill="white"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      <div className="absolute top-44 animate-cloud-fast opacity-40">
        <svg width="170" height="70" viewBox="0 0 170 70" fill="none">
          <path
            d="M 25 58 C 8 58 0 45 4 34 C 6 24 20 18 30 22 C 35 8 55 3 75 8 C 90 3 110 7 118 18 C 132 13 148 20 152 34 C 168 38 172 58 148 58 Z"
            fill="white"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      {/* Cute Hot Air Balloon gently sailing horizontally */}
      <div className="absolute top-28 animate-balloon opacity-75">
        <div className="relative w-14 h-18 filter drop-shadow-md">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-sky-400 shadow-inner flex items-center justify-center border border-white/60">
            <span className="text-lg">⭐</span>
          </div>
          <div className="w-7 h-2 mx-auto border-x border-slate-500/60" />
          <div className="w-4 h-3 mx-auto rounded-sm bg-amber-800 shadow-sm border border-amber-900" />
        </div>
      </div>

      {/* Fullscreen HTML5 Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
