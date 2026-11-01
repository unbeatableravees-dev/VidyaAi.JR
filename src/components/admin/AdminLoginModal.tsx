import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock, ShieldCheck, Mail, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset fields whenever modal opens so it always asks for email & password
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setErrorMsg('');
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg('Please enter both Admin Email and Password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const user = LmsStorageService.authenticateAdmin(cleanEmail, cleanPass);
      setIsSubmitting(false);

      if (user) {
        sound.playSuccess();
        onLoginSuccess();
        onClose();
      } else {
        setErrorMsg('Invalid Super Admin credentials. Please check your email and password.');
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
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <p className="text-xs font-semibold text-slate-600">
            Please enter your Super Admin credentials to access the central student & curriculum dashboard.
          </p>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 animate-shake flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-700 tracking-wider mb-1">
              Admin Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email (e.g. admin@vidyaai.jr.in)"
                required
                autoFocus
                autoComplete="email"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-700 tracking-wider mb-1">
              Admin Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
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
              Fill Default Demo Credentials
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
