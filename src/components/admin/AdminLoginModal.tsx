import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock, ShieldCheck, Mail, KeyRound, Sparkles, ArrowRight } from 'lucide-react';
import { LmsStorageService } from '../../services/lmsStorage';
import { sound } from '../../utils/audio';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('admin@vidyaai.jr.in');
  const [password, setPassword] = useState('Admin@123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const user = LmsStorageService.authenticateAdmin(email, password);
      setIsSubmitting(false);

      if (user) {
        sound.playSuccess();
        onLoginSuccess();
        onClose();
      } else {
        setErrorMsg('Invalid Super Admin credentials. Please use admin@vidyaai.jr.in / Admin@123');
      }
    }, 350);
  };

  const handleFillDemo = () => {
    sound.playPop();
    setEmail('admin@vidyaai.jr.in');
    setPassword('Admin@123');
    setErrorMsg('');
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-4 border-white/80 overflow-hidden">
        {/* Top Decorative Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">Super Admin Portal</h2>
              <p className="text-[11px] font-bold text-blue-600">Central Management System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <p className="text-xs font-semibold text-slate-600">
            Sign in with your Super Admin account to manage students, approve promotions, and upload class-targeted content.
          </p>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 animate-shake">
              ⚠️ {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-700 tracking-wider mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vidyaai.jr.in"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-700 tracking-wider mb-1">
              Admin Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[11px] font-bold text-slate-400">Super Admin Access</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-black text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              Fill Default Credentials
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-xs shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>{isSubmitting ? 'Authenticating...' : 'Enter Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
