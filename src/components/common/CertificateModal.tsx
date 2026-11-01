import React, { useRef } from 'react';
import { X, Download, Printer, Award, Sparkles, Star } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentGrade?: string;
  achievementTitle: string;
  starsEarned?: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentGrade = 'Class 2',
  achievementTitle,
  starsEarned = 100,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  const handleDownload = () => {
    sound.playSuccess();
    // Create an offscreen canvas and draw certificate
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, '#f8fafc');
    bgGrad.addColorStop(0.5, '#eff6ff');
    bgGrad.addColorStop(1, '#fef3c7');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // Golden Outer Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 16;
    ctx.strokeRect(30, 30, 1140, 740);

    // Inner Border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.strokeRect(46, 46, 1108, 708);

    // Academy Header
    ctx.fillStyle = '#1e3a8a';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⭐ VIDYAAI JR. LEARNING GALAXY ⭐', 600, 110);

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 600, 180);

    ctx.fillStyle = '#64748b';
    ctx.font = 'italic 22px sans-serif';
    ctx.fillText('This certificate is proudly awarded to', 600, 240);

    // Student Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 54px sans-serif';
    ctx.fillText(studentName || 'Young Genius', 600, 320);

    // Underline for name
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(350, 340);
    ctx.lineTo(850, 340);
    ctx.stroke();

    // Achievement text
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`For outstanding excellence and joyful curiosity in`, 600, 400);

    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(achievementTitle, 600, 450);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`Grade: ${studentGrade}  •  Stars Earned: ⭐ ${starsEarned}`, 600, 510);

    // Date
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`Date: ${today}`, 350, 640);

    // Signature
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 22px cursive';
    ctx.fillText('Dr. Vidya Council', 850, 630);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Academic Director, VidyaAI Jr.', 850, 660);

    // Download trigger
    const link = document.createElement('a');
    link.download = `VidyaAI_Certificate_${studentName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-[220] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-amber-400 overflow-hidden relative">
        {/* Top Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas View */}
        <div
          ref={certificateRef}
          className="p-8 sm:p-12 text-center bg-gradient-to-br from-amber-50/40 via-sky-50/30 to-amber-50/50 border-8 border-double border-amber-400 relative m-4 rounded-2xl"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-500 text-xl">⭐</div>
          <div className="absolute top-2 right-2 text-amber-500 text-xl">⭐</div>
          <div className="absolute bottom-2 left-2 text-amber-500 text-xl">⭐</div>
          <div className="absolute bottom-2 right-2 text-amber-500 text-xl">⭐</div>

          <p className="text-xs sm:text-sm font-black text-blue-900 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" /> VidyaAI Jr. Learning Galaxy
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight mt-2 font-serif">
            CERTIFICATE OF ACHIEVEMENT
          </h2>

          <p className="text-xs sm:text-sm font-bold text-slate-500 mt-4 italic">
            This certificate is proudly awarded to:
          </p>

          <div className="my-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif drop-shadow-xs">
              {studentName || 'Young Genius'}
            </h1>
            <div className="w-48 h-1 bg-amber-400 mx-auto mt-2 rounded-full" />
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto">
            For outstanding dedication, curiosity, and high academic performance in:
          </p>

          <div className="my-2 inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm sm:text-base font-black shadow-xs">
            {achievementTitle}
          </div>

          <div className="text-xs font-bold text-slate-500 flex items-center justify-center gap-4 mt-2">
            <span>Grade: <strong>{studentGrade}</strong></span>
            <span>•</span>
            <span className="text-amber-600 font-extrabold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {starsEarned} Stars Earned
            </span>
          </div>

          {/* Signatures & Seal */}
          <div className="flex items-end justify-between pt-8 mt-6 border-t border-amber-200">
            <div className="text-left">
              <p className="text-xs font-bold text-slate-500">Date Issued:</p>
              <p className="text-xs font-black text-slate-800">{todayStr}</p>
            </div>

            {/* Golden Ribbon Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white shadow-lg flex flex-col items-center justify-center text-slate-900 shrink-0">
              <Award className="w-7 h-7 text-amber-900" />
              <span className="text-[8px] font-black uppercase tracking-tighter">OFFICIAL</span>
            </div>

            <div className="text-right">
              <p className="text-xs font-serif font-black text-slate-800 italic">Dr. Vidya Council</p>
              <p className="text-[10px] font-bold text-slate-400">VidyaAI Jr. Director</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-black flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Certificate 🖨️</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res Certificate (PNG) 📥</span>
          </button>
        </div>
      </div>
    </div>
  );
};
