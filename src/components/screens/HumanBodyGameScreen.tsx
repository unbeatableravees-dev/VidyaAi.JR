import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Move,
  Compass,
  Lightbulb,
  Heart,
  ShieldCheck,
  Zap,
  Info,
  ChevronRight,
} from 'lucide-react';
import { BODY_REGIONS, BODY_ORGANS, BodyOrgan, BodyRegion } from '../../data/humanBodyData';
import { HumanBodyModel } from '../illustrations/HumanBodyModel';
import { OrganIllustration } from '../illustrations/OrganIllustration';
import { sound } from '../../utils/audio';
import { femaleVoice } from '../../utils/speech';
import { getStudentProgress, recordOrganDiscovery } from '../../utils/studentProgress';

interface HumanBodyGameScreenProps {
  studentId?: string;
  onBackToHome?: () => void;
  onOpenPractice?: () => void;
  onBackToExplorerHub?: () => void;
}

export const HumanBodyGameScreen: React.FC<HumanBodyGameScreenProps> = ({
  studentId,
  onBackToHome,
  onOpenPractice,
  onBackToExplorerHub,
}) => {
  // Navigation & Region state
  const [currentRegionId, setCurrentRegionId] = useState<string | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  // Drag and Drop & Active Organ state
  const [activeOrganId, setActiveOrganId] = useState<string | null>('heart'); // Default initial organ for immediate joy
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [draggedOrganId, setDraggedOrganId] = useState<string | null>(null);

  // Scanner feedback state
  const [scanPulse, setScanPulse] = useState<boolean>(false);

  const [discoveredOrgans, setDiscoveredOrgans] = useState<string[]>(
    () => getStudentProgress(studentId).discoveredOrganIds
  );

  // Quiz state for the active organ
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean | null>(null);

  // Text-To-Speech state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const activeRegion = currentRegionId
    ? BODY_REGIONS.find((r) => r.id === currentRegionId) || null
    : null;

  const activeOrgan: BodyOrgan | null = activeOrganId ? BODY_ORGANS[activeOrganId] || null : null;

  // Handle selecting an organ (via drag & drop or direct click)
  const handleInspectOrgan = (organId: string, fromDrag = false) => {
    const organ = BODY_ORGANS[organId];
    if (!organ) return;

    setActiveOrganId(organId);
    setQuizAnswer(null);
    setIsQuizCorrect(null);
    setScanPulse(true);
    setTimeout(() => setScanPulse(false), 800);

    // Audio & Confetti reward
    sound.playSuccess();
    try {
      confetti({
        particleCount: fromDrag ? 35 : 20,
        spread: 60,
        origin: { y: 0.4, x: 0.75 },
        colors: ['#38bdf8', '#3b82f6', '#ec4899', '#f59e0b', '#10b981'],
      });
    } catch {
      // Ignore if confetti fails
    }

    // Save to discovered list
    if (!discoveredOrgans.includes(organId)) {
      setDiscoveredOrgans((previous) => [...previous, organId]);
      recordOrganDiscovery(studentId, organId);
    }
  };

  // Drag and Drop Event Handlers
  const handleDragStart = (e: React.DragEvent, organId: string) => {
    e.dataTransfer.setData('text/plain', organId);
    e.dataTransfer.effectAllowed = 'copyMove';
    setDraggedOrganId(organId);
    sound.playPop();
  };

  const handleDragEnd = () => {
    setDraggedOrganId(null);
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const organId = e.dataTransfer.getData('text/plain');
    if (organId && BODY_ORGANS[organId]) {
      handleInspectOrgan(organId, true);
    }
  };

  // Switch to a region
  const handleSelectRegion = (regionId: string) => {
    sound.playPop();
    setCurrentRegionId(regionId);
  };

  // Back to full body view
  const handleBackToFullBody = () => {
    sound.playPop();
    setCurrentRegionId(null);
  };

  // Quiz submission
  const handleQuizChoice = (option: string) => {
    if (!activeOrgan) return;
    setQuizAnswer(option);
    if (option === activeOrgan.quiz.answer) {
      setIsQuizCorrect(true);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.7, x: 0.75 },
        });
      } catch {
        // Ignore
      }
    } else {
      setIsQuizCorrect(false);
      sound.playPop();
    }
  };

  // Text-To-Speech for Kids
  const handleSpeakDescription = () => {
    if (!activeOrgan || typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const textToRead = `${activeOrgan.name}. ${activeOrgan.urduName}. ${activeOrgan.shortDesc}. ${activeOrgan.fullDescription}`;
      setIsSpeaking(femaleVoice.speak({
        text: textToRead,
        lang: 'en',
        rate: 0.9,
        pitch: 1.12,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      }));
    }
  };

  useEffect(() => {
    return () => {
      femaleVoice.stop();
    };
  }, [activeOrganId]);

  const totalOrgansCount = Object.keys(BODY_ORGANS).length;
  const discoveredCount = discoveredOrgans.length;

  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 max-w-7xl mx-auto space-y-4 select-none">
      {/* Top Banner & Gamification Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-blue-200/80 shadow-lg">
        <div className="flex items-center gap-3">
          {(onBackToExplorerHub || onBackToHome) && (
            <button
              onClick={() => {
                sound.playPop();
                if (onBackToExplorerHub) onBackToExplorerHub();
                else if (onBackToHome) onBackToHome();
              }}
              className="p-2.5 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all hover:scale-105 cursor-pointer shadow-sm flex items-center gap-1.5"
              title={onBackToExplorerHub ? "Back to Explorer Hub" : "Back to Home"}
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              <span className="text-xs font-black hidden sm:inline">Explorer Hub</span>
            </button>
          )}

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
            🫀
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Human Body Anatomy Explorer
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-wider">
                3D Interactive Scanner
              </span>
            </div>
            <p className="text-xs md:text-sm font-extrabold text-slate-500">
              انسانی جسم کی مکمل سیر • Click body parts to explore inside & drag organs to scanner!
            </p>
          </div>
        </div>

        {/* Gamification Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-500 stroke-[2.5]" />
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                  Discovered Organs
                </span>
                <span className="text-xs font-black text-amber-950">
                  {discoveredCount} / {totalOrgansCount}
                </span>
              </div>
              <div className="w-28 bg-amber-200/80 rounded-full h-2 overflow-hidden mt-1">
                <div
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(discoveredCount / totalOrgansCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dual-Section Interactive Arena (Left: Body/Region, Right: Drop-Zone Scanner & Full Description) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ======================================================== */}
        {/* LEFT SECTION: BADA SA SECTION (Human Body & Region Hub)   */}
        {/* ======================================================== */}
        <section className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl border-2 border-blue-200/80 shadow-xl p-4 md:p-5 flex flex-col justify-between min-h-[660px] relative overflow-hidden">
          {/* Subtle decorative background watermarks */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

          {/* Left Section Header */}
          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              {currentRegionId ? (
                /* Inside a Region Header: Back button + Region Title */
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBackToFullBody}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[3]" />
                    <span>Back to Full Body (مکمل جسم)</span>
                  </button>

                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="text-sm md:text-base font-black text-slate-900">
                      Inside: {activeRegion?.name}
                    </span>
                    <span className="text-xs font-extrabold text-blue-600 font-urdu">
                      ({activeRegion?.urduName})
                    </span>
                  </div>
                </div>
              ) : (
                /* Full Body View Header */
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-black uppercase tracking-wider">
                      Step 1
                    </span>
                    <h2 className="text-base md:text-lg font-black text-slate-800">
                      Full Human Body Map (انسانی جسم کا ماڈل)
                    </h2>
                  </div>
                  <p className="text-xs font-bold text-slate-500">
                    Click on any body region (Head, Chest, Abdomen, Circulation, etc.) to reveal internal organs & vessels!
                  </p>
                </div>
              )}

              {/* View Indicator Tag */}
              <div className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-extrabold flex items-center gap-1.5 border border-slate-200">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentRegionId ? 'Zoomed Region Mode' : 'Interactive Body Mode'}</span>
              </div>
            </div>

            {/* Quick Region Selector Pills Bar (Kids can jump anytime) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-black text-slate-400 shrink-0 uppercase tracking-wider mr-1">
                Body Parts:
              </span>
              {BODY_REGIONS.map((region) => {
                const isCurrent = currentRegionId === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => handleSelectRegion(region.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                    }`}
                  >
                    <span>
                      {region.id === 'head' && '🧠'}
                      {region.id === 'chest' && '🫀'}
                      {region.id === 'abdomen' && '🥞'}
                      {region.id === 'skeleton' && '🦴'}
                      {region.id === 'limbs' && '💪'}
                    </span>
                    <span>{region.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Left Section Main Content Area */}
          <div className="flex-1 my-3 flex flex-col justify-center relative min-h-[480px]">
            {/* VIEW A: FULL BODY INTERACTIVE SILHOUETTE */}
            {!currentRegionId ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <HumanBodyModel
                  selectedRegionId={currentRegionId}
                  onSelectRegion={handleSelectRegion}
                  hoveredRegionId={hoveredRegionId}
                  onHoverRegion={setHoveredRegionId}
                />

                {/* Helpful prompt pill below full body */}
                <div className="mt-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 text-blue-900 text-xs font-black shadow-sm flex items-center gap-2 animate-bounce-gentle">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                  <span>
                    Bache kisi bhi body part pe click karein (jaise Head, Chest, Abdomen) to explore!
                  </span>
                </div>
              </div>
            ) : (
              /* VIEW B: ZOOMED-IN REGION & DRAGGABLE ORGANS GRID */
              <div className="space-y-4">
                {/* Region Description Banner */}
                <div
                  className={`p-4 rounded-2xl text-white shadow-md bg-gradient-to-r ${activeRegion?.bgGradient} flex items-center justify-between gap-3`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {activeRegion?.id === 'head' && '🧠'}
                        {activeRegion?.id === 'chest' && '🫀'}
                        {activeRegion?.id === 'abdomen' && '🥞'}
                        {activeRegion?.id === 'skeleton' && '🦴'}
                        {activeRegion?.id === 'limbs' && '💪'}
                      </span>
                      <h3 className="text-lg font-black">{activeRegion?.name}</h3>
                      <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-bold font-urdu">
                        {activeRegion?.urduName}
                      </span>
                    </div>
                    <p className="text-xs font-extrabold text-white/90">
                      {activeRegion?.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black">{activeRegion?.organIds.length}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-white/80">
                      Organs Inside
                    </span>
                  </div>
                </div>

                {/* Draggable Organ Cards Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                      <Move className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        Drag any organ to the right Scanner or Click to inspect:
                      </span>
                    </p>
                    <span className="text-[11px] font-bold text-slate-400">
                      {activeRegion?.organIds.length} Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeRegion?.organIds.map((organId) => {
                      const organ = BODY_ORGANS[organId];
                      if (!organ) return null;

                      const isSelected = activeOrganId === organ.id;
                      const isDiscovered = discoveredOrgans.includes(organ.id);
                      const isBeingDragged = draggedOrganId === organ.id;

                      return (
                        <div
                          key={organ.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, organ.id)}
                          onDragEnd={handleDragEnd}
                          onClick={() => handleInspectOrgan(organ.id)}
                          className={`group relative p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-grab active:cursor-grabbing select-none flex flex-col items-center justify-between text-center min-h-[145px] ${
                            isBeingDragged
                              ? 'opacity-40 scale-95 border-dashed border-blue-400'
                              : isSelected
                              ? 'bg-blue-50/90 border-blue-600 shadow-lg scale-102 ring-2 ring-blue-400/30'
                              : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-1'
                          }`}
                        >
                          {/* Discovered Checkmark Pill */}
                          {isDiscovered && (
                            <span className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            </span>
                          )}

                          {/* Organ Vector Illustration */}
                          <div className="my-1 transform group-hover:scale-110 transition-transform duration-300">
                            <OrganIllustration type={organ.svgType} size={56} />
                          </div>

                          {/* Organ Label */}
                          <div className="w-full">
                            <h4 className="text-xs font-black text-slate-800 group-hover:text-blue-700 truncate">
                              {organ.name}
                            </h4>
                            <p className="text-[10px] font-bold text-slate-500 font-urdu truncate">
                              {organ.urduName}
                            </p>
                          </div>

                          {/* Drag Me Grip Handle Pill */}
                          <div className="mt-1.5 w-full flex items-center justify-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white py-1 rounded-xl transition-colors">
                            <Move className="w-3 h-3" />
                            <span>Drag or Click</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left Status/Instruction Bar */}
          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-extrabold">
            <span className="flex items-center gap-1">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>
                {currentRegionId
                  ? 'Tip: Grab any organ card above and DROP it in the Scanner on the right!'
                  : 'Tip: Click any region circle to view organs inside!'}
              </span>
            </span>
            {currentRegionId && (
              <button
                onClick={handleBackToFullBody}
                className="text-blue-600 hover:text-blue-800 font-black flex items-center gap-0.5 cursor-pointer"
              >
                Full Body Map <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT SECTION: DRAG & DROP SCANNER & FULL ORGAN INFO    */}
        {/* ======================================================== */}
        <section className="lg:col-span-5 flex flex-col space-y-4">
          {/* 1. HOLOGRAPHIC DROP ZONE & EXAMINATION CHAMBER */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-3xl p-5 border-3 transition-all duration-300 select-none overflow-hidden ${
              isDragOver
                ? 'bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 border-emerald-500 shadow-2xl scale-102 ring-4 ring-emerald-300/40'
                : scanPulse
                ? 'bg-blue-50/80 border-blue-500 shadow-xl'
                : 'bg-white/95 backdrop-blur-md border-dashed border-blue-300/80 shadow-lg hover:border-blue-400'
            }`}
          >
            {/* Header of Scanner */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🔬 Organ Scanner Lab</span>
                  <span className="text-[10px] font-bold text-slate-400 lowercase">(drop zone)</span>
                </h3>
              </div>

              {activeOrgan && (
                <button
                  onClick={handleSpeakDescription}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                  title="Listen to organ facts"
                >
                  <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{isSpeaking ? 'Listening...' : 'Read Aloud'}</span>
                </button>
              )}
            </div>

            {/* Chamber Core Display */}
            <div className="flex flex-col items-center justify-center min-h-[175px] text-center relative py-2">
              {/* Laser Scan Line Animation when an organ is loaded/dropped */}
              {scanPulse && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-1/2 -translate-y-1/2 animate-pulse shadow-lg shadow-cyan-400/50 z-20" />
              )}

              {activeOrgan ? (
                <div className="flex flex-col items-center space-y-2 z-10 w-full">
                  {/* Floating 3D Holographic Organ Visual */}
                  <div className="relative p-3 rounded-3xl bg-gradient-to-b from-blue-50/80 to-indigo-50/40 border border-blue-200/60 shadow-inner">
                    <OrganIllustration type={activeOrgan.svgType} size={84} animate={true} />
                    {/* Glowing circular scanner base */}
                    <div className="absolute -bottom-1 inset-x-4 h-2 bg-blue-400/30 rounded-full blur-xs" />
                  </div>

                  {/* Organ Identification Title & Urdu */}
                  <div>
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        {activeOrgan.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 text-xs font-black font-urdu">
                        {activeOrgan.urduName}
                      </span>
                    </div>
                    <p className="text-xs font-extrabold text-blue-600 mt-0.5">
                      {activeOrgan.nickname}
                    </p>
                  </div>

                  {/* System Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black border ${activeOrgan.systemColor}`}
                  >
                    {activeOrgan.system}
                  </span>
                </div>
              ) : (
                /* Empty Drop Target State */
                <div className="py-6 flex flex-col items-center space-y-2 text-slate-400">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-300 flex items-center justify-center text-3xl">
                    🎯
                  </div>
                  <p className="text-sm font-black text-slate-700">
                    Drop any organ here to scan!
                  </p>
                  <p className="text-xs font-bold text-slate-400 max-w-xs font-urdu text-center">
                    بائیں جانب سے کسی بھی عضو کو کھینچ کر (drag) یہاں رکھیں اور اس کی مکمل معلومات حاصل کریں۔
                  </p>
                </div>
              )}
            </div>

            {/* Drag Hover Message Overlay */}
            {isDragOver && (
              <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-xs flex flex-col items-center justify-center text-white z-30 animate-in fade-in duration-150">
                <Sparkles className="w-10 h-10 animate-bounce mb-1" />
                <p className="text-lg font-black drop-shadow">✨ Release to Scan Organ!</p>
                <p className="text-xs font-extrabold text-emerald-100">
                  Analyzing anatomical structure...
                </p>
              </div>
            )}
          </div>

          {/* 2. FULL DETAILED STATIC ORGAN DESCRIPTION SECTION */}
          {activeOrgan ? (
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-blue-200/80 shadow-xl space-y-4 max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200">
              {/* Quick Specs / Super Stats Bar */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                    📍 Location
                  </span>
                  <span className="text-xs font-black text-slate-800 leading-snug">
                    {activeOrgan.location}
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                    ⚖️ Size / Weight
                  </span>
                  <span className="text-xs font-black text-slate-800 leading-snug">
                    {activeOrgan.weightSize}
                  </span>
                </div>
              </div>

              {/* Super Daily Fact Banner */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300/80 flex items-start gap-2.5 shadow-xs">
                <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                    Daily Superpower Stat
                  </span>
                  <p className="text-xs font-black text-amber-950 leading-snug">
                    {activeOrgan.dailyStat}
                  </p>
                </div>
              </div>

              {/* Primary Function: Detailed Explanation */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>What It Does (Primary Function / اہم کام)</span>
                </h4>
                <p className="text-xs font-extrabold text-slate-700 leading-relaxed bg-slate-50/80 p-3 rounded-2xl border border-slate-200/80">
                  {activeOrgan.fullDescription}
                </p>
              </div>

              {/* How It Works (Step-by-Step Breakdown) */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <span>How It Works (Step-by-Step Mechanism)</span>
                </h4>
                <div className="space-y-1.5">
                  {activeOrgan.howItWorks.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-blue-50/50 border border-blue-100 text-xs font-extrabold text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-lg bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mind-Blowing Fun Facts */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Mind-Blowing Fun Facts (حیرت انگیز معلومات)</span>
                </h4>
                <div className="space-y-1.5">
                  {activeOrgan.funFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-200/80 text-xs font-extrabold text-purple-950 flex items-start gap-2"
                    >
                      <span className="text-sm shrink-0">⭐</span>
                      <span className="leading-snug">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Healthy Habits for this Organ */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>How to Keep It Healthy (صحت مند عادات)</span>
                </h4>
                <div className="space-y-1.5">
                  {activeOrgan.healthyHabits.map((habit, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs font-extrabold text-emerald-950 flex items-start gap-2"
                    >
                      <span className="text-emerald-600 font-black">✓</span>
                      <span className="leading-snug">{habit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Mini Quiz Challenge */}
              <div className="pt-2 border-t border-slate-200">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-black uppercase tracking-wider">
                      Quick Challenge
                    </span>
                    <span className="text-xs font-black">100 Bonus Points</span>
                  </div>

                  <p className="text-xs font-black leading-snug">
                    {activeOrgan.quiz.question}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {activeOrgan.quiz.options.map((option, idx) => {
                      const isChosen = quizAnswer === option;
                      const isCorrect = option === activeOrgan.quiz.answer;

                      let btnStyle = 'bg-white/10 hover:bg-white/20 text-white border-white/20';
                      if (quizAnswer) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500 text-white border-emerald-300 font-black shadow-md';
                        } else if (isChosen) {
                          btnStyle = 'bg-rose-500 text-white border-rose-300 font-black';
                        } else {
                          btnStyle = 'bg-white/5 text-white/50 border-transparent';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizAnswer !== null}
                          onClick={() => handleQuizChoice(option)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {quizAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswer && (
                    <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-xs text-[11px] font-bold text-white border border-white/20 animate-in fade-in duration-200">
                      {isQuizCorrect ? (
                        <span className="flex items-center gap-1.5 text-emerald-200 font-black">
                          🎉 {activeOrgan.quiz.explanation}
                        </span>
                      ) : (
                        <span className="text-rose-100">
                          Almost! {activeOrgan.quiz.explanation}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 rounded-3xl p-6 border-2 border-dashed border-slate-200 text-center text-slate-400">
              <p className="text-xs font-extrabold">
                Select or drag an organ to read its complete description!
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
