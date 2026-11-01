import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  LifeBuoy,
  Send,
  AlertTriangle,
  GraduationCap,
  HelpCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Sparkles,
  Info,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { StyledSelect, SelectOption } from '../common/StyledSelect';
import { LmsStorageService } from '../../services/lmsStorage';
import { ContactTicket, TicketIssueCategory, TicketIssueArea } from '../../types/lms';
import { StudentProfile } from '../../types/student';
import { sound } from '../../utils/audio';

interface ContactViewProps {
  studentProfile?: StudentProfile | null;
  onBackToHome?: () => void;
}

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'class_promotion', label: '🚀 Class Promotion (Request higher class)' },
  { value: 'content_violation', label: '⚠️ Content Violation (Report inappropriate content)' },
  { value: 'misleading_info', label: '🔍 Misleading Info (Factually wrong content/lesson)' },
  { value: 'bug_glitch', label: '🐛 Technical Bug / App Glitch' },
  { value: 'audio_video_issue', label: '🔊 Video / Audio Playback Problem' },
  { value: 'quiz_mistake', label: '❓ Quiz Question or Answer Mistake' },
  { value: 'request_topic', label: '💡 Request New Learning Material / Chapter' },
  { value: 'account_profile', label: '👤 Account & Profile Assistance' },
  { value: 'other', label: '📝 Other General Feedback' },
];

const ISSUE_AREA_OPTIONS: SelectOption[] = [
  { value: 'General Platform', label: 'General Platform & UI' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Science', label: 'Science & Experiments' },
  { value: 'English & Phonics', label: 'English & Alphabet Phonics' },
  { value: 'Hindi & Sanskrit', label: 'Hindi & Cultural Wisdom' },
  { value: 'Punjabi & Gurmukhi', label: 'Punjabi & Gurmukhi' },
  { value: 'Urdu & Islamic', label: 'Urdu & Islamic Teachings' },
  { value: '3D Explorers', label: '3D Explorers (Human Body / Cosmos)' },
  { value: 'Quizzes & Tests', label: 'Quizzes & Practice Tests' },
  { value: 'Badges & Progress', label: 'Stars, Badges & Progress' },
];

const SEVERITY_OPTIONS: SelectOption[] = [
  { value: 'low', label: '🟢 Low (Suggestion or general question)' },
  { value: 'medium', label: '🟡 Medium (Needs teacher review)' },
  { value: 'high', label: '🔴 High (Urgent / Blocks learning)' },
];

export const ContactView: React.FC<ContactViewProps> = ({ studentProfile }) => {
  const studentId = studentProfile?.id || 'guest-student';
  const studentName = studentProfile?.name || 'Explorer';
  const studentClass = studentProfile?.gradeClass || 'Class 2';

  // Form states
  const [category, setCategory] = useState<TicketIssueCategory>('class_promotion');
  const [issueArea, setIssueArea] = useState<TicketIssueArea>('General Platform');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmailPhone, setContactEmailPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<ContactTicket | null>(null);

  // Tickets history
  const [myTickets, setMyTickets] = useState<ContactTicket[]>(() =>
    LmsStorageService.getTicketsForStudent(studentId)
  );

  useEffect(() => {
    const handleTicketUpdate = () => {
      setMyTickets(LmsStorageService.getTicketsForStudent(studentId));
    };
    window.addEventListener('vidya_lms_ticket_submitted', handleTicketUpdate);
    window.addEventListener('vidya_lms_ticket_updated', handleTicketUpdate);
    return () => {
      window.removeEventListener('vidya_lms_ticket_submitted', handleTicketUpdate);
      window.removeEventListener('vidya_lms_ticket_updated', handleTicketUpdate);
    };
  }, [studentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    sound.playSuccess();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Fallback
    }

    const catObj = CATEGORY_OPTIONS.find((c) => c.value === category);
    const newTicket = LmsStorageService.submitContactTicket({
      studentId,
      studentName,
      studentClass,
      category,
      categoryLabel: catObj ? catObj.label.replace(/^[^a-zA-Z0-9]+/, '').trim() : category,
      issueArea,
      severity,
      title: title.trim(),
      description: description.trim(),
      contactEmailPhone: contactEmailPhone.trim() || undefined,
    });

    setSubmittedTicket(newTicket);
    setIsSubmitting(false);
    setTitle('');
    setDescription('');
    setContactEmailPhone('');
    setMyTickets(LmsStorageService.getTicketsForStudent(studentId));
  };

  return (
    <div className="min-h-full pb-24 px-3 sm:px-6 md:px-8 py-6 select-none max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-wider border border-white/30 text-white shadow-xs">
              Student & Parent Support Desk
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm font-['Nunito',sans-serif]">
            Contact & Support Center 💬
          </h1>

          <p className="mt-2 text-xs sm:text-sm font-semibold text-white/90 leading-relaxed">
            Submit a request directly to our academic team. Report content violations, request class promotion, point out misleading info, or request new topics!
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs font-bold text-blue-100">
            <span>Student: <strong>{studentName}</strong></span>
            <span>•</span>
            <span>Current Grade: <strong>{studentClass}</strong></span>
          </div>
        </div>

        <div className="absolute -bottom-6 -right-6 w-44 h-44 opacity-20 pointer-events-none text-9xl flex items-center justify-center select-none">
          📬
        </div>
      </div>

      {/* Submission Confirmation Banner */}
      {submittedTicket && (
        <div className="rounded-3xl bg-emerald-50 border-2 border-emerald-300 p-5 sm:p-6 flex items-start gap-4 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 text-2xl shadow-md">
            ✓
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-xs">
                Ticket Created: #{submittedTicket.ticketNumber}
              </span>
              <span className="text-xs font-bold text-emerald-800">
                {new Date(submittedTicket.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <h3 className="text-base font-black text-emerald-950 mt-1">
              Your request has been routed to the Super Admin!
            </h3>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5 leading-relaxed">
              We have logged your ticket <strong>"{submittedTicket.title}"</strong> under <strong>{submittedTicket.categoryLabel}</strong>. Super Admin will review and provide a resolution in your dossier.
            </p>
            <button
              onClick={() => setSubmittedTicket(null)}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}

      {/* Main Request Form */}
      <section className="bg-white rounded-[2.5rem] p-6 sm:p-10 border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Submit New Issue / Feedback Request
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Select your issue area, category, and details below.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Category */}
            <StyledSelect
              label="1. Issue Category"
              badge="Required"
              value={category}
              onChange={(val) => setCategory(val as TicketIssueCategory)}
              options={CATEGORY_OPTIONS}
            />

            {/* 2. Issue Area */}
            <StyledSelect
              label="2. Issue Area / Subject"
              value={issueArea}
              onChange={(val) => setIssueArea(val as TicketIssueArea)}
              options={ISSUE_AREA_OPTIONS}
            />

            {/* 3. Priority / Severity */}
            <StyledSelect
              label="3. Urgency / Severity"
              value={severity}
              onChange={(val) => setSeverity(val as 'low' | 'medium' | 'high')}
              options={SEVERITY_OPTIONS}
            />
          </div>

          {/* Subject / Title */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              4. Request Title / Brief Summary
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Promote me to Class 3, Misleading animal fact in Toto video, Sound glitch..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              5. Detailed Description & Explanation
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what happened or why you need this request. If it is a content violation or misleading info, please mention the lesson name..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* Contact (Optional) */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              6. Parent Email or Phone Number (Optional)
            </label>
            <input
              type="text"
              value={contactEmailPhone}
              onChange={(e) => setContactEmailPhone(e.target.value)}
              placeholder="e.g. parent@example.com or +91 98765 43210"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>Submit Official Request to Admin</span>
          </button>
        </form>
      </section>

      {/* Submitted Tickets Tracker */}
      {myTickets.length > 0 && (
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-black text-slate-900">
                My Submitted Tickets & Resolution Tracker ({myTickets.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Real-time Admin Updates
            </span>
          </div>

          <div className="space-y-3">
            {myTickets.map((t) => (
              <div
                key={t.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 transition-all"
              >
                <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      #{t.ticketNumber}
                    </span>
                    <span className="font-black text-sm text-slate-900">
                      {t.title}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      t.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : t.status === 'in_progress'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}
                  >
                    {t.status === 'resolved' ? '✓ Resolved' : t.status === 'in_progress' ? '⏳ Under Review' : '🔵 Open'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 flex-wrap">
                  <span>Category: <strong>{t.categoryLabel}</strong></span>
                  <span>•</span>
                  <span>Area: <strong>{t.issueArea}</strong></span>
                  <span>•</span>
                  <span>Submitted: <strong>{new Date(t.createdAt).toLocaleDateString()}</strong></span>
                </div>

                <p className="text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                  "{t.description}"
                </p>

                {/* Admin Official Reply */}
                {t.adminResponse && (
                  <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 font-semibold space-y-1">
                    <span className="font-black text-[11px] text-indigo-700 uppercase tracking-wider block">
                      🛡️ Super Admin Resolution:
                    </span>
                    <p className="leading-relaxed">{t.adminResponse}</p>
                    {t.resolvedAt && (
                      <span className="text-[10px] text-indigo-600 block pt-1 font-bold">
                        Resolved on {new Date(t.resolvedAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
