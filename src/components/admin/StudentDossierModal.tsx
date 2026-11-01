import React from 'react';
import { createPortal } from 'react-dom';
import { X, User, BookOpen, Video, Trophy, Heart, Bookmark, HelpCircle, CheckCircle, Clock } from 'lucide-react';
import { StudentProfile, RELIGION_CONFIGS } from '../../types/student';
import { LmsStorageService } from '../../services/lmsStorage';

interface StudentDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
}

export const StudentDossierModal: React.FC<StudentDossierModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!isOpen || !student) return null;

  const activities = LmsStorageService.getActivitiesForStudent(student.id);
  const interests = LmsStorageService.getInterestsForStudent(student.id);
  const relConfig = RELIGION_CONFIGS[student.religion] || RELIGION_CONFIGS.other;

  const watchedVideos = activities.filter((a) => a.contentType === 'video');
  const openedDocs = activities.filter((a) => a.contentType === 'pdf' || a.contentType === 'notes');
  const quizzes = activities.filter((a) => a.contentType === 'quiz');

  return createPortal(
    <div
      className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-7 md:p-8 shadow-2xl border-4 border-white my-auto max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header with Student Bio */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shrink-0 text-white">
              👦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">{student.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  Active Student
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                {student.gradeClass} · Age {student.age} · {relConfig.label} ({relConfig.languageBadge})
              </p>
              <p className="text-[11px] font-medium text-slate-400">
                Registered on: {new Date(student.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Learning Activity Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200">
            <span className="text-xl font-black text-blue-900">{watchedVideos.length}</span>
            <span className="block text-[10px] font-bold uppercase text-blue-700 mt-0.5">Videos Watched</span>
          </div>
          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200">
            <span className="text-xl font-black text-purple-900">{openedDocs.length}</span>
            <span className="block text-[10px] font-bold uppercase text-purple-700 mt-0.5">Materials Read</span>
          </div>
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-xl font-black text-amber-900">{quizzes.length}</span>
            <span className="block text-[10px] font-bold uppercase text-amber-700 mt-0.5">Quizzes Attempted</span>
          </div>
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
            <span className="text-xl font-black text-rose-900">{interests.length}</span>
            <span className="block text-[10px] font-bold uppercase text-rose-700 mt-0.5">Interest Requests</span>
          </div>
        </div>

        {/* Section 1: Student Expressed Interests & Requests */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
              Topics Student Wants To Learn More About ({interests.length})
            </h3>
          </div>

          {interests.length === 0 ? (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-semibold text-center">
              Student has not marked any specific topic requests yet. As they click "Interested in this topic" on their dashboard, their interests will appear here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {interests.map((int) => (
                <div key={int.id} className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-start gap-2.5">
                  <span className="text-base">
                    {int.type === 'interested' ? '⭐' : int.type === 'saved_for_later' ? '🔖' : int.type === 'want_to_learn_more' ? '💡' : '📝'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-slate-900 truncate">{int.topicName}</p>
                    <p className="text-[10px] font-bold text-rose-700 uppercase">
                      {int.type.replace(/_/g, ' ')} · {int.subject}
                    </p>
                    {int.note && <p className="text-[11px] text-slate-600 mt-0.5 italic">"{int.note}"</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Detailed Learning Activity Log */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
              Recent Learning Activity Timeline ({activities.length})
            </h3>
          </div>

          {activities.length === 0 ? (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-semibold text-center">
              No content sessions recorded yet for this student.
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-white flex items-center justify-center text-sm shadow-sm shrink-0">
                      {act.contentType === 'video' ? '🎥' : act.contentType === 'pdf' ? '📄' : act.contentType === 'notes' ? '📝' : '🧪'}
                    </span>
                    <div className="min-w-0">
                      <p className="font-black text-slate-900 truncate">{act.contentTitle}</p>
                      <p className="text-[10px] text-slate-500 font-bold">
                        {act.subject} · Action: <span className="capitalize">{act.action.replace('_', ' ')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {act.score ? (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-black">
                        Score: {act.score.correct}/{act.score.total} ({act.score.percentage}%)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
