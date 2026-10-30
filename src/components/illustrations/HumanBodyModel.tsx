import React, { useState } from 'react';
import { BODY_REGIONS, BodyRegion } from '../../data/humanBodyData';
import { Sparkles, ZoomIn, Eye, Layers, Activity, Sliders } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HumanBodyModelProps {
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
  hoveredRegionId?: string | null;
  onHoverRegion?: (regionId: string | null) => void;
}

type BodyViewMode = 'real' | 'translucent' | 'xray';

export const HumanBodyModel: React.FC<HumanBodyModelProps> = ({
  selectedRegionId,
  onSelectRegion,
  hoveredRegionId: externalHovered,
  onHoverRegion,
}) => {
  const [internalHovered, setInternalHovered] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<BodyViewMode>('translucent');
  const [skinOpacity, setSkinOpacity] = useState<number>(55); // 0 to 100 slider

  const activeHover = externalHovered ?? internalHovered;

  const handleMouseEnter = (id: string) => {
    setInternalHovered(id);
    if (onHoverRegion) onHoverRegion(id);
  };

  const handleMouseLeave = () => {
    setInternalHovered(null);
    if (onHoverRegion) onHoverRegion(null);
  };

  const handleRegionClick = (id: string) => {
    sound.playPop();
    onSelectRegion(id);
  };

  const handleModeChange = (mode: BodyViewMode) => {
    sound.playPop();
    setViewMode(mode);
    if (mode === 'real') setSkinOpacity(96);
    else if (mode === 'translucent') setSkinOpacity(55);
    else if (mode === 'xray') setSkinOpacity(12);
  };

  // Compute calculated opacity from slider
  const effectiveSkinOpacity = skinOpacity / 100;
  const showInternalOrgans = skinOpacity < 90;
  const showMusclesOnReal = skinOpacity > 40;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-2 select-none">
      {/* --- TOP CONTROL BAR: Real Body vs Translucent vs X-Ray Organs --- */}
      <div className="w-full max-w-md mb-2 z-20 flex flex-col items-center gap-2 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-blue-200/80 shadow-md">
        {/* Quick View Mode Pills */}
        <div className="grid grid-cols-3 gap-1.5 w-full">
          <button
            onClick={() => handleModeChange('real')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'real'
                ? 'bg-amber-600 text-white shadow-sm scale-102 ring-2 ring-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>👤</span>
            <span>Real Body</span>
          </button>

          <button
            onClick={() => handleModeChange('translucent')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'translucent'
                ? 'bg-blue-600 text-white shadow-sm scale-102 ring-2 ring-blue-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>✨</span>
            <span>3D Layered</span>
          </button>

          <button
            onClick={() => handleModeChange('xray')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'xray'
                ? 'bg-rose-600 text-white shadow-sm scale-102 ring-2 ring-rose-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>🩻</span>
            <span>Inside Organs</span>
          </button>
        </div>

        {/* Interactive Skin Opacity Slider */}
        <div className="w-full flex items-center justify-between gap-3 px-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-600 shrink-0">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Skin Transparency (جلد کی شفافیت):</span>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-[170px]">
            <input
              type="range"
              min="5"
              max="100"
              value={skinOpacity}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSkinOpacity(val);
                if (val > 80) setViewMode('real');
                else if (val < 25) setViewMode('xray');
                else setViewMode('translucent');
              }}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] font-black text-slate-700 w-8 text-right">
              {skinOpacity}%
            </span>
          </div>
        </div>
      </div>

      {/* --- REALISTIC 3D SVG ANATOMY MODEL --- */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[580px]">
        {/* Soft Background Radial Lighting Aura */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="w-96 h-[540px] bg-gradient-to-b from-amber-400/10 via-blue-500/10 to-indigo-500/15 rounded-full blur-3xl" />
        </div>

        <svg
          viewBox="0 0 520 740"
          className="w-full h-full max-h-[640px] drop-shadow-2xl"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* 1. REALISTIC NATURAL HUMAN SKIN GRADIENTS */}
            <radialGradient id="realSkinHead" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffeedd" />
              <stop offset="45%" stopColor="#f5cbb0" />
              <stop offset="85%" stopColor="#e3a783" />
              <stop offset="100%" stopColor="#c78660" />
            </radialGradient>

            <linearGradient id="realSkinBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffeedd" />
              <stop offset="25%" stopColor="#f6ceb4" />
              <stop offset="60%" stopColor="#eab18d" />
              <stop offset="85%" stopColor="#d8966f" />
              <stop offset="100%" stopColor="#bf7a53" />
            </linearGradient>

            <linearGradient id="realSkinLimbs" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d38f66" />
              <stop offset="40%" stopColor="#f6ceb4" />
              <stop offset="70%" stopColor="#ffeedd" />
              <stop offset="100%" stopColor="#c8835a" />
            </linearGradient>

            {/* Muscle Shading Linear Shadow */}
            <linearGradient id="muscleShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9c542b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9c542b" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="pecHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* 2. REALISTIC HAIR GRADIENT */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a301f" />
              <stop offset="60%" stopColor="#2c1a0e" />
              <stop offset="100%" stopColor="#1a0f07" />
            </linearGradient>

            {/* 3. ORGAN REALISTIC GRADIENTS */}
            {/* Heart Muscle Gradient */}
            <radialGradient id="heartRealGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="90%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>

            {/* Lungs Gradient (Realistic Lobed Pink/Coral) */}
            <radialGradient id="lungRealGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="55%" stopColor="#f87171" />
              <stop offset="90%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </radialGradient>

            {/* Liver Gradient (Anatomical Terracotta / Deep Reddish Brown) */}
            <linearGradient id="liverRealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#881337" />
              <stop offset="100%" stopColor="#4c0519" />
            </linearGradient>

            {/* Stomach Gradient */}
            <linearGradient id="stomachRealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="60%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Intestines Texture Gradient */}
            <linearGradient id="intestineRealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            {/* Colon (Large Intestine) Gradient */}
            <linearGradient id="colonRealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            {/* Real Bone Ivory Gradient (Ribs & Skeleton) */}
            <linearGradient id="boneRealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>

            {/* Pedestal Base Gradient */}
            <radialGradient id="realStageGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* --- STAGE BASE PEDESTAL --- */}
          <g id="pedestal" transform="translate(0, 642)">
            <ellipse cx="260" cy="50" rx="160" ry="28" fill="url(#realStageGrad)" />
            <ellipse cx="260" cy="50" rx="140" ry="22" fill="#0f172a" opacity="0.6" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
            <ellipse cx="260" cy="50" rx="100" ry="15" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          </g>

          {/* ========================================================================= */}
          {/* LAYER A: REALISTIC INTERNAL ANATOMICAL ORGANS, BONES & VESSELS (INSIDE)  */}
          {/* ========================================================================= */}
          {showInternalOrgans && (
            <g id="internal-anatomy" className="transition-opacity duration-300">
              {/* 1. SPINAL COLUMN (Vertebrae running down center) */}
              <g id="spine-vertebrae">
                <line x1="260" y1="135" x2="260" y2="430" stroke="#f59e0b" strokeWidth="4.5" opacity="0.8" />
                {[145, 168, 190, 212, 235, 258, 280, 302, 325, 348, 370, 392, 415].map((y) => (
                  <rect
                    key={y}
                    x="252"
                    y={y}
                    width="16"
                    height="5.5"
                    rx="2"
                    fill="url(#boneRealGrad)"
                    stroke="#b45309"
                    strokeWidth="1"
                  />
                ))}
              </g>

              {/* 2. REALISTIC BRAIN (Inside Head) */}
              <g id="real-brain" transform="translate(236, 56) scale(0.48)">
                {/* Cerebrum with cortical gyri folds */}
                <path
                  d="M 50 14 C 28 14, 14 30, 12 48 C 10 65, 18 80, 28 88 C 38 94, 45 92, 50 90 C 55 92, 62 94, 72 88 C 82 80, 90 65, 88 48 C 86 30, 72 14, 50 14 Z"
                  fill="#f472b6"
                  stroke="#be185d"
                  strokeWidth="3.5"
                />
                {/* Left & Right Hemispheres separation */}
                <path d="M 50 14 Q 48 50 50 90" stroke="#9d174d" strokeWidth="3" fill="none" />
                {/* Sulci gyri convolutions */}
                <path d="M 26 36 Q 38 32 46 44 Q 32 52 24 64" stroke="#db2777" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 74 36 Q 62 32 54 44 Q 68 52 76 64" stroke="#db2777" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Cerebellum at base */}
                <ellipse cx="50" cy="94" rx="22" ry="10" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
                {/* Brainstem */}
                <path d="M 45 98 L 45 116 L 55 116 L 55 98 Z" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
              </g>

              {/* 3. TRACHEA (Windpipe with Cartilage Rings) */}
              <g id="trachea-airway">
                <path d="M 256 136 L 256 182 L 264 182 L 264 136 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                {[140, 148, 156, 164, 172].map((ty) => (
                  <line key={ty} x1="254" y1={ty} x2="266" y2={ty} stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
                ))}
                {/* Butterfly Thyroid Gland */}
                <path d="M 252 148 C 244 142, 244 158, 252 156 C 260 154, 260 154, 268 156 C 276 158, 276 142, 268 148 C 262 152, 258 152, 252 148 Z" fill="#c084fc" stroke="#7e22ce" strokeWidth="1.5" />
              </g>

              {/* 4. REALISTIC BILATERAL LUNGS (With Breathing Motion) */}
              <g id="real-lungs" className="animate-pulse" style={{ animationDuration: '4s' }}>
                {/* Right Lung (3 lobes) */}
                <path
                  d="M 226 186 C 204 184, 186 210, 184 246 C 182 278, 196 295, 224 290 C 232 268, 230 216, 226 186 Z"
                  fill="url(#lungRealGrad)"
                  stroke="#991b1b"
                  strokeWidth="2.5"
                  className="filter drop-shadow"
                />
                {/* Right lung lobe fissure lines */}
                <path d="M 188 238 Q 210 244 226 238" stroke="#7f1d1d" strokeWidth="2" fill="none" />
                <path d="M 194 266 Q 214 270 224 262" stroke="#7f1d1d" strokeWidth="1.5" fill="none" />

                {/* Left Lung (2 lobes with cardiac notch for heart) */}
                <path
                  d="M 294 186 C 316 184, 334 210, 336 246 C 338 278, 324 295, 296 290 C 288 268, 282 230, 294 186 Z"
                  fill="url(#lungRealGrad)"
                  stroke="#991b1b"
                  strokeWidth="2.5"
                  className="filter drop-shadow"
                />
                <path d="M 332 244 Q 312 250 292 242" stroke="#7f1d1d" strokeWidth="2" fill="none" />
              </g>

              {/* 5. REALISTIC ANATOMICAL HEART (Beating with Lub-Dub Animation) */}
              <g id="real-heart" transform="translate(242, 214)">
                {/* Superior Vena Cava (Blue venous trunk) */}
                <path d="M 12 -8 L 12 12 L 20 12 L 20 -8 Z" fill="#2563eb" stroke="#1e40af" strokeWidth="1.5" />
                {/* Aortic Arch (Curved Red Arterial Trunk branching to brain) */}
                <path d="M 18 6 C 18 -14, 34 -14, 34 6" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
                {/* 3 Supra-aortic Branches to Head & Arms */}
                <line x1="22" y1="-8" x2="20" y2="-18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="26" y1="-10" x2="26" y2="-20" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="30" y1="-8" x2="32" y2="-18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                {/* Pulmonary Trunk (Cyan/Blue branching to lungs) */}
                <path d="M 24 4 L 32 0" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />

                {/* Main Ventricle Muscular Heart Body with Pulse */}
                <g className="animate-bounce-gentle">
                  <path
                    d="M 14 8 C 4 8, -2 20, 2 34 C 6 48, 20 62, 26 68 C 32 62, 46 48, 48 34 C 50 20, 42 8, 32 8 C 26 8, 20 16, 18 18 C 16 16, 18 8, 14 8 Z"
                    fill="url(#heartRealGrad)"
                    stroke="#500724"
                    strokeWidth="2.5"
                    className="filter drop-shadow-md"
                  />
                  {/* Coronary Arteries (Red & Blue surface vessels feeding heart muscle) */}
                  <path d="M 18 20 Q 24 38 32 54" stroke="#fca5a5" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 24 36 Q 16 46 12 50" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </g>
              </g>

              {/* 6. REALISTIC ANATOMICAL RIBCAGE BONES (Ivory Ribs wrapping around chest) */}
              <g id="real-ribcage" opacity="0.75">
                {/* Sternum (Breastbone) */}
                <path d="M 257 186 L 263 186 L 262 258 L 258 258 Z" fill="url(#boneRealGrad)" stroke="#78716c" strokeWidth="1.5" />
                {/* Symmetrical Left and Right Rib Arches */}
                {[
                  { y: 194, rx: 42, ry: 10 },
                  { y: 208, rx: 50, ry: 12 },
                  { y: 224, rx: 56, ry: 14 },
                  { y: 242, rx: 58, ry: 16 },
                  { y: 260, rx: 56, ry: 18 },
                  { y: 278, rx: 50, ry: 18 },
                  { y: 294, rx: 42, ry: 16 },
                ].map((rib, idx) => (
                  <g key={idx}>
                    {/* Right Rib Arch */}
                    <path
                      d={`M 257 ${rib.y} C 218 ${rib.y - 4}, 190 ${rib.y + rib.ry}, 184 ${rib.y + rib.ry + 8}`}
                      fill="none"
                      stroke="url(#boneRealGrad)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Left Rib Arch */}
                    <path
                      d={`M 263 ${rib.y} C 302 ${rib.y - 4}, 330 ${rib.y + rib.ry}, 336 ${rib.y + rib.ry + 8}`}
                      fill="none"
                      stroke="url(#boneRealGrad)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </g>
                ))}
              </g>

              {/* 7. REALISTIC LIVER (Right Upper Abdomen) */}
              <g id="real-liver">
                <path
                  d="M 218 296 C 218 292, 264 290, 276 304 C 280 326, 260 340, 224 336 C 214 334, 216 304, 218 296 Z"
                  fill="url(#liverRealGrad)"
                  stroke="#450a0a"
                  strokeWidth="2"
                  className="filter drop-shadow-sm"
                />
                {/* Falciform Ligament Line */}
                <path d="M 248 294 Q 246 316 242 332" stroke="#fca5a5" strokeWidth="1.5" fill="none" opacity="0.6" />
                {/* Gallbladder (Small Green Pear Sac beneath liver) */}
                <ellipse cx="236" cy="336" rx="6" ry="9" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
              </g>

              {/* 8. REALISTIC STOMACH (Left Upper Abdomen) */}
              <g id="real-stomach">
                <path
                  d="M 272 298 C 298 294, 312 308, 306 328 C 298 344, 276 348, 262 334 C 258 322, 264 304, 272 298 Z"
                  fill="url(#stomachRealGrad)"
                  stroke="#9a3412"
                  strokeWidth="2"
                  className="filter drop-shadow-sm"
                />
                {/* Spleen (Purple-red oval on far left flank) */}
                <ellipse cx="316" cy="318" rx="8" ry="14" fill="#9333ea" stroke="#581c87" strokeWidth="1.5" />
              </g>

              {/* 9. REALISTIC KIDNEYS (Bilateral Bean Shapes on Flanks) */}
              <g id="real-kidneys">
                {/* Right Kidney */}
                <path d="M 216 340 C 210 344, 210 364, 218 368 C 224 366, 224 346, 216 340 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="1.5" />
                {/* Left Kidney */}
                <path d="M 304 340 C 310 344, 310 364, 302 368 C 296 366, 296 346, 304 340 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="1.5" />
              </g>

              {/* 10. REALISTIC INTESTINES (Framing Colon + Coiled Small Intestines) */}
              <g id="real-intestines">
                {/* Small Intestines: Detailed Coiled Loops */}
                <g id="small-intestine-coils">
                  <path
                    d="M 238 356 Q 260 348 282 356 Q 260 366 238 372 Q 260 380 282 376 Q 260 392 238 388 Q 260 404 282 396"
                    stroke="url(#intestineRealGrad)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="filter drop-shadow-xs"
                  />
                  <path
                    d="M 238 356 Q 260 348 282 356 Q 260 366 238 372 Q 260 380 282 376 Q 260 392 238 388 Q 260 404 282 396"
                    stroke="#fed7aa"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.7"
                  />
                </g>

                {/* Large Intestine (Colon: Ascending, Transverse & Descending Frame with Haustra) */}
                <path
                  d="M 222 400 L 222 345 C 222 340, 298 340, 298 345 L 298 402"
                  fill="none"
                  stroke="url(#colonRealGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="filter drop-shadow-sm"
                />
                {/* Haustra Segmentation Rings on Colon */}
                {[350, 365, 380, 395].map((cy) => (
                  <g key={cy}>
                    <line x1="216" y1={cy} x2="228" y2={cy} stroke="#431407" strokeWidth="2" />
                    <line x1="292" y1={cy} x2="304" y2={cy} stroke="#431407" strokeWidth="2" />
                  </g>
                ))}
              </g>

              {/* 11. REALISTIC ARTERIAL & VENOUS HIGHWAY TREE (Red Arteries & Blue Veins) */}
              <g id="real-circulatory-highway">
                {/* Main Descending Aorta Trunk (Red) */}
                <path d="M 262 260 L 262 395" stroke="#ef4444" strokeWidth="4.5" fill="none" />
                {/* Aorta Bifurcation into Left & Right Iliac / Femoral Arteries */}
                <path d="M 262 395 Q 248 440 236 530 Q 230 580 226 630" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 262 395 Q 272 440 284 530 Q 290 580 294 630" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Subclavian & Brachial Arteries to Left & Right Arms */}
                <path d="M 258 190 Q 215 220 178 310 Q 158 370 144 425" stroke="#ef4444" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M 262 190 Q 305 220 342 310 Q 362 370 376 425" stroke="#ef4444" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                {/* Carotid Arteries up to Brain */}
                <path d="M 258 170 Q 252 120 248 80" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 262 170 Q 268 120 272 80" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round" />

                {/* Inferior Vena Cava (Blue Vein) */}
                <path d="M 256 260 L 256 390" stroke="#2563eb" strokeWidth="4.5" fill="none" />
                {/* Common Iliac & Femoral Veins (Blue) */}
                <path d="M 256 390 Q 242 435 230 525 Q 224 575 220 625" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 256 390 Q 278 435 290 525 Q 296 575 300 625" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Cephalic & Basilic Arm Veins */}
                <path d="M 254 185 Q 210 215 172 305 Q 152 365 138 420" stroke="#2563eb" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M 266 185 Q 310 215 348 305 Q 368 365 382 420" stroke="#2563eb" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                {/* Jugular Veins returning from Head */}
                <path d="M 252 165 Q 246 115 242 75" stroke="#2563eb" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 268 165 Q 274 115 278 75" stroke="#2563eb" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>

              {/* 12. PELVIS BONE (Cradle at base of abdomen) */}
              <path
                d="M 260 412 C 232 396, 214 410, 218 436 C 224 454, 244 458, 260 458 C 276 458, 296 454, 302 436 C 306 410, 288 396, 260 412 Z"
                fill="url(#boneRealGrad)"
                stroke="#64748b"
                strokeWidth="2.5"
                opacity="0.85"
              />
            </g>
          )}

          {/* ========================================================================= */}
          {/* LAYER B: REALISTIC NATURAL HUMAN BODY (Realistic Skin, Face & Musculature)*/}
          {/* ========================================================================= */}
          <g
            id="real-human-skin-figure"
            opacity={effectiveSkinOpacity}
            className="transition-opacity duration-300 pointer-events-none"
          >
            {/* 1. REALISTIC HUMAN BODY SILHOUETTE (Lifelike Proportions, Torso, Arms & Legs) */}
            <path
              d="
                M 260 48
                C 236 48, 222 66, 222 92
                C 222 114, 234 130, 246 138
                L 246 150
                C 214 154, 184 178, 172 215
                C 164 242, 158 290, 150 340
                C 144 380, 136 415, 130 435
                C 126 448, 142 454, 148 442
                C 156 422, 166 375, 172 335
                L 178 300
                C 186 340, 194 380, 198 420
                C 202 460, 208 495, 214 530
                L 210 642
                C 208 656, 228 660, 236 650
                L 246 540
                L 254 540
                L 260 450
                L 266 450
                L 274 540
                L 284 650
                C 292 660, 312 656, 310 642
                L 306 530
                C 312 495, 318 460, 322 420
                C 326 380, 334 340, 342 300
                L 348 335
                C 354 375, 364 422, 372 442
                C 378 454, 394 448, 390 435
                C 384 415, 376 380, 370 340
                C 362 290, 356 242, 348 215
                C 336 178, 306 154, 274 150
                L 274 138
                C 286 130, 298 114, 298 92
                C 298 66, 284 48, 260 48 Z
              "
              fill="url(#realSkinBody)"
              stroke="#b46f48"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="filter drop-shadow-xl"
            />

            {/* 2. REALISTIC HEAD & FACE */}
            <g id="real-face-features">
              {/* Natural Head Shading */}
              <ellipse cx="260" cy="94" rx="36" ry="44" fill="url(#realSkinHead)" stroke="#b46f48" strokeWidth="1.5" />

              {/* Realistic Hair Silhouette */}
              <path
                d="M 226 84 C 224 54, 250 42, 260 42 C 270 42, 296 54, 294 84 C 286 68, 276 60, 260 60 C 244 60, 234 68, 226 84 Z"
                fill="url(#hairGrad)"
              />

              {/* Brow Arches */}
              <path d="M 240 84 Q 248 81 254 84" stroke="#4a301f" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 266 84 Q 272 81 280 84" stroke="#4a301f" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Realistic Eyes with Iris & Specular Highlight */}
              <ellipse cx="247" cy="89" rx="5.5" ry="3.5" fill="#ffffff" stroke="#78350f" strokeWidth="1" />
              <circle cx="247" cy="89" r="2.2" fill="#522e1b" />
              <circle cx="248" cy="88" r="0.8" fill="#ffffff" />

              <ellipse cx="273" cy="89" rx="5.5" ry="3.5" fill="#ffffff" stroke="#78350f" strokeWidth="1" />
              <circle cx="273" cy="89" r="2.2" fill="#522e1b" />
              <circle cx="274" cy="88" r="0.8" fill="#ffffff" />

              {/* Realistic Nose Bridge & Nostril Contour */}
              <path d="M 260 86 L 259 100 Q 260 103 263 101" stroke="#b46f48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="257" cy="101" r="1.2" fill="#9c542b" opacity="0.6" />
              <circle cx="263" cy="101" r="1.2" fill="#9c542b" opacity="0.6" />

              {/* Natural Smiling Lips */}
              <path d="M 252 111 Q 260 114 268 111" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 254 114 Q 260 117 266 114" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />

              {/* Chin Cleft Accent */}
              <ellipse cx="260" cy="126" rx="4" ry="1.5" fill="#b46f48" opacity="0.4" />
            </g>

            {/* 3. REALISTIC SURFACE MUSCULATURE & ANATOMICAL LANDMARKS */}
            {showMusclesOnReal && (
              <g id="real-musculature" opacity="0.85">
                {/* Clavicles (Collarbones) with Suprasternal Notch */}
                <path d="M 246 156 Q 254 160 260 160 Q 266 160 274 156" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
                <path d="M 232 164 Q 248 160 258 162" stroke="#9c542b" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
                <path d="M 288 164 Q 272 160 262 162" stroke="#9c542b" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />

                {/* Pectoralis Major (Realistic Chest Muscles) */}
                {/* Right Pec */}
                <path
                  d="M 230 178 C 226 210, 252 216, 258 206 C 258 182, 238 174, 230 178 Z"
                  fill="url(#pecHighlight)"
                  stroke="#9c542b"
                  strokeWidth="1.8"
                  opacity="0.8"
                />
                <circle cx="236" cy="204" r="2" fill="#c2410c" opacity="0.7" />

                {/* Left Pec */}
                <path
                  d="M 290 178 C 294 210, 268 216, 262 206 C 262 182, 282 174, 290 178 Z"
                  fill="url(#pecHighlight)"
                  stroke="#9c542b"
                  strokeWidth="1.8"
                  opacity="0.8"
                />
                <circle cx="284" cy="204" r="2" fill="#c2410c" opacity="0.7" />

                {/* Sternum Midline Groove */}
                <line x1="260" y1="168" x2="260" y2="238" stroke="#9c542b" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6" />

                {/* Rectus Abdominis (Realistic 6-Pack Abs) */}
                {/* Upper Abs */}
                <rect x="246" y="222" width="12" height="15" rx="3" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.2" />
                <rect x="262" y="222" width="12" height="15" rx="3" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.2" />
                {/* Mid Abs */}
                <rect x="245" y="242" width="13" height="16" rx="3" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.2" />
                <rect x="262" y="242" width="13" height="16" rx="3" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.2" />
                {/* Lower Abs */}
                <rect x="246" y="263" width="12" height="16" rx="3" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.2" />
                <rect x="262" y="263" width="12" height="16" rx="3" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.2" />

                {/* Umbilicus (Navel / Belly Button) */}
                <ellipse cx="260" cy="292" rx="2.5" ry="3.5" fill="#78350f" opacity="0.8" />
                <ellipse cx="260" cy="291" rx="1.5" ry="1.5" fill="#fef3c7" opacity="0.7" />

                {/* Iliac Furrow / V-Line Pelvis Contours */}
                <path d="M 234 300 Q 248 316 256 322" stroke="#9c542b" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
                <path d="M 286 300 Q 272 316 264 322" stroke="#9c542b" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />

                {/* Deltoids & Bicep Definitions on Arms */}
                <path d="M 186 210 Q 180 240 176 270" stroke="#9c542b" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
                <path d="M 334 210 Q 340 240 344 270" stroke="#9c542b" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />

                {/* Quadriceps Contours & Patella (Kneecaps) on Legs */}
                {/* Right Thigh & Knee */}
                <path d="M 226 430 Q 222 470 224 505" stroke="#9c542b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                <circle cx="228" cy="525" r="9" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.5" />
                <ellipse cx="228" cy="525" rx="5" ry="6" fill="#fef0e6" opacity="0.7" />

                {/* Left Thigh & Knee */}
                <path d="M 294 430 Q 298 470 296 505" stroke="#9c542b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                <circle cx="292" cy="525" r="9" fill="#ffffff" opacity="0.25" stroke="#9c542b" strokeWidth="1.5" />
                <ellipse cx="292" cy="525" rx="5" ry="6" fill="#fef0e6" opacity="0.7" />

                {/* Shin Bone Highlights */}
                <line x1="228" y1="542" x2="224" y2="618" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <line x1="292" y1="542" x2="296" y2="618" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </g>
            )}
          </g>

          {/* ========================================================================= */}
          {/* LAYER C: INTERACTIVE RADAR BEACONS & CALLOUT HUD (Urdu & English)         */}
          {/* ========================================================================= */}
          {BODY_REGIONS.map((region) => {
            const isHovered = activeHover === region.id;
            const isSelected = selectedRegionId === region.id;
            const { cx, cy, r } = region.svgHotspot;
            const targetCx = cx + 60;
            const targetCy = cy;

            return (
              <g
                key={region.id}
                className="cursor-pointer transition-transform duration-200"
                onMouseEnter={() => handleMouseEnter(region.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRegionClick(region.id)}
              >
                {/* Outer Pulsing 3D Ring on Hover/Selected */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={targetCx}
                    cy={targetCy}
                    r={r + 14}
                    fill="none"
                    stroke={region.color}
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-spin-slow opacity-95"
                  />
                )}

                {/* Soft Glowing Beacon Aura */}
                <circle
                  cx={targetCx}
                  cy={targetCy}
                  r={r + 4}
                  fill={region.color}
                  opacity={isHovered || isSelected ? 0.4 : 0.12}
                  className="transition-all duration-300"
                />

                {/* Main Hotspot Pin */}
                <circle
                  cx={targetCx}
                  cy={targetCy}
                  r={isHovered ? 13 : 10}
                  fill="#ffffff"
                  stroke={region.color}
                  strokeWidth={isHovered || isSelected ? '4' : '3'}
                  className="transition-all duration-200 shadow-xl"
                />
                <circle cx={targetCx} cy={targetCy} r={isHovered ? 6 : 4.5} fill={region.color} />
              </g>
            );
          })}

          {/* HOLOGRAPHIC 3D CALLOUT HUD CARDS (Urdu & English) */}
          {BODY_REGIONS.map((region, index) => {
            const isHovered = activeHover === region.id;
            const isSelected = selectedRegionId === region.id;
            const { cy } = region.svgHotspot;
            const targetCx = region.svgHotspot.cx + 60;

            const isLeft = index % 2 === 0;
            const boxX = isLeft ? 8 : 342;
            const boxY = cy - 24;
            const lineStartX = isLeft ? targetCx - 18 : targetCx + 18;
            const lineEndX = isLeft ? boxX + 160 : boxX;

            return (
              <g
                key={`callout-${region.id}`}
                className="cursor-pointer group"
                onMouseEnter={() => handleMouseEnter(region.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRegionClick(region.id)}
              >
                {/* Connecting Line */}
                <path
                  d={`M ${lineStartX} ${cy} L ${isLeft ? lineStartX - 14 : lineStartX + 14} ${boxY + 22} L ${lineEndX} ${boxY + 22}`}
                  fill="none"
                  stroke={isHovered || isSelected ? region.color : '#94a3b8'}
                  strokeWidth={isHovered || isSelected ? '2.5' : '1.5'}
                  strokeDasharray={isHovered ? 'none' : '4 3'}
                  className="transition-all duration-200"
                />

                {/* Callout Box */}
                <foreignObject x={boxX} y={boxY} width="170" height="56">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-2xl border-2 transition-all duration-300 shadow-md ${
                      isHovered || isSelected
                        ? 'bg-white scale-105 shadow-xl -translate-y-0.5 ring-2 ring-blue-400/30'
                        : 'bg-white/90 hover:bg-white'
                    }`}
                    style={{
                      borderColor: isHovered || isSelected ? region.color : '#cbd5e1',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0 shadow-md transform group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: region.color }}
                    >
                      {region.id === 'head' && '🧠'}
                      {region.id === 'throat' && '🌬️'}
                      {region.id === 'chest' && '🫀'}
                      {region.id === 'circulation' && '🩸'}
                      {region.id === 'abdomen' && '🥞'}
                      {region.id === 'skeleton' && '🦴'}
                      {region.id === 'limbs' && '💪'}
                      {region.id === 'microscopic' && '🧬'}
                    </div>

                    <div className="min-w-0 flex-1 leading-tight text-left">
                      <p className="text-[11px] font-black text-slate-800 truncate">
                        {region.name}
                      </p>
                      <p className="text-[10px] font-bold text-blue-700 truncate font-urdu">
                        {region.urduName}
                      </p>
                      <p className="text-[9px] font-black text-emerald-600">
                        {region.organIds.length} Parts Inside
                      </p>
                    </div>

                    <ZoomIn
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isHovered ? 'scale-125 text-blue-600' : 'text-slate-400'
                      }`}
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
