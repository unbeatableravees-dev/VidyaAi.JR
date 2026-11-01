import React, { useState } from 'react';
import { Lock, ShieldCheck, Sun, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';
import { addScreenTimeBonus, unlockScreenTimeForToday } from '../../utils/screenTimeManager';

interface ScreenTimeLockModalProps {
  isOpen: boolean;
  studentName: string;
  limitMinutes: number;
}

export const ScreenTimeLockModal: React.FC<ScreenTimeLockModalProps> = ({
  isOpen,
  studentName,
  limitMinutes,
}) => {
  const [showParentGate, setShowParentGate] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleGrant15Mins = () => {
    if (pin === '1234') {
      sound.playSuccess();
      addScreenTimeBonus(15);
      setPin('');
      setError(false);
      setShowParentGate(false);
    } else {
      sound.playBuzz();
      setError(true);
    }
  };

  const handleUnlockAllDay = () => {
    if (pin === '1234') {
      sound.playSuccess();
      unlockScreenTimeForToday();
      setPin('');
      setError(false);
      setShowParentGate(false);
    } else {
      sound.playBuzz();
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg select-none animate-fadeIn">
      <div className="w-full max-w-lg bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-[2.5rem] p-7 sm:p-9 text-center shadow-2xl border-4 border-amber-300 space-y-5">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 mx-auto flex items-center justify-center text-5xl shadow-xl animate-bounce">
          🌳
        </div>

        <div className="space-y-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-amber-200 text-amber-900 uppercase tracking-widest">
            Daily Study Time Complete ☀️
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Super Work Today, {studentName}!
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed max-w-md mx-auto">
            You have reached your daily screen time of <span className="text-amber-800 font-black">{limitMinutes} minutes</span>! Time to rest your eyes, drink fresh water, and have fun playing outdoors!
          </p>
        </div>

        <div className="p-4 bg-white/80 rounded-2xl border border-amber-200 text-left space-y-1.5 shadow-sm">
          <p className="text-xs font-black text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" /> Healthy Study Tip:
          </p>
          <p className="text-xs font-bold text-slate-600">
            Look out a window at something far away for 20 seconds. It relaxes your eye muscles after great studying!
          </p>
        </div>

        {/* Parent Override Section */}
        {!showParentGate ? (
          <button
            onClick={() => {
              sound.playPop();
              setShowParentGate(true);
            }}
            className="text-xs font-black text-amber-800 hover:text-amber-950 underline decoration-amber-400 cursor-pointer pt-2"
          >
            Parents: Need to extend study time? Enter PIN
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-white border border-amber-300 text-left space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Enter Parent PIN (Default: 1234):
              </span>
              <button
                onClick={() => setShowParentGate(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="1234"
                className="w-24 px-3 py-2 rounded-xl border border-slate-300 font-black text-center text-sm"
              />
              <button
                onClick={handleGrant15Mins}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs cursor-pointer shadow-sm"
              >
                +15 More Mins
              </button>
              <button
                onClick={handleUnlockAllDay}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer shadow-sm"
              >
                Unlock Today
              </button>
            </div>

            {error && (
              <p className="text-xs font-bold text-rose-600">
                Incorrect PIN! Default parent PIN is 1234
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
