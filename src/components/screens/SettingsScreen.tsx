import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, User, Bell, Shield, Book } from 'lucide-react';
import { sound } from '../../utils/audio';

export const SettingsScreen: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState('Grade 1');

  return (
    <div className="p-8 max-w-4xl mx-auto pb-24 space-y-6">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight">App Settings</h1>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        {/* Child Profile */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-black shadow-md">
              A
            </div>
            <div>
              <p className="font-black text-sm text-slate-800">Aarav Sharma</p>
              <p className="text-xs font-semibold text-slate-500">Student Profile • Active</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-extrabold text-xs rounded-full">
            Active
          </span>
        </div>

        {/* Grade Selector */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700">Learning Grade / Level</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3'].map((grade) => (
              <button
                key={grade}
                onClick={() => {
                  sound.playPop();
                  setSelectedGrade(grade);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Effects Toggle */}
        <div className="flex items-center justify-between py-2 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs font-black text-slate-800">Sound Effects & TTS Narration</p>
              <p className="text-[11px] font-semibold text-slate-400">Play chimes and voice read-aloud for questions</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sound.playPop();
            }}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                soundEnabled ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
