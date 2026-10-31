import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  Search,
  Upload,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Sparkles,
  Award,
  Layers,
  Heart,
  FileText,
  BarChart2,
  ChevronRight,
  ExternalLink,
  LifeBuoy,
  AlertTriangle,
  MessageSquare,
  Check,
  X,
  Send,
  UserX,
  Settings,
} from 'lucide-react';
import { LmsStorageService } from '../../services/lmsStorage';
import { ContentItem, PromotionRequest, ContactTicket, ALL_CLASSES } from '../../types/lms';
import { StudentProfile, RELIGION_CONFIGS } from '../../types/student';
import { UploadContentModal } from './UploadContentModal';
import { StudentDossierModal } from './StudentDossierModal';
import { StudentEditModal } from './StudentEditModal';
import { StyledSelect } from '../common/StyledSelect';
import { sound } from '../../utils/audio';

interface AdminPortalProps {
  onExit: () => void;
}

type AdminTab = 'overview' | 'students' | 'content' | 'promotions' | 'tickets' | 'analytics';

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [contentList, setContentList] = useState<ContentItem[]>(() =>
    LmsStorageService.getAllContent()
  );
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const data = localStorage.getItem('vidya_student_profiles_v1');
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Ignore
    }
    return [];
  });
  const [promotionRequests, setPromotionRequests] = useState<PromotionRequest[]>(() =>
    LmsStorageService.getAllPromotionRequests()
  );
  const [ticketsList, setTicketsList] = useState<ContactTicket[]>(() =>
    LmsStorageService.getAllContactTickets()
  );

  const [searchStudent, setSearchStudent] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [dossierStudent, setDossierStudent] = useState<StudentProfile | null>(null);
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<StudentProfile | null>(null);

  // Tickets Response Modal State
  const [ticketToRespond, setTicketToRespond] = useState<ContactTicket | null>(null);
  const [adminResponseText, setAdminResponseText] = useState('');
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const reloadData = () => {
    setContentList(LmsStorageService.getAllContent());
    setPromotionRequests(LmsStorageService.getAllPromotionRequests());
    setTicketsList(LmsStorageService.getAllContactTickets());
    try {
      const data = localStorage.getItem('vidya_student_profiles_v1');
      if (data) setStudents(JSON.parse(data));
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    window.addEventListener('vidya_lms_content_updated', reloadData);
    window.addEventListener('vidya_lms_promotion_submitted', reloadData);
    window.addEventListener('vidya_student_class_promoted', reloadData);
    window.addEventListener('vidya_lms_ticket_submitted', reloadData);
    window.addEventListener('vidya_lms_ticket_updated', reloadData);
    window.addEventListener('vidya_student_profile_deleted', reloadData);
    window.addEventListener('vidya_student_profile_updated', reloadData);

    return () => {
      window.removeEventListener('vidya_lms_content_updated', reloadData);
      window.removeEventListener('vidya_lms_promotion_submitted', reloadData);
      window.removeEventListener('vidya_student_class_promoted', reloadData);
      window.removeEventListener('vidya_lms_ticket_submitted', reloadData);
      window.removeEventListener('vidya_lms_ticket_updated', reloadData);
      window.removeEventListener('vidya_student_profile_deleted', reloadData);
      window.removeEventListener('vidya_student_profile_updated', reloadData);
    };
  }, []);

  const pendingPromotionsCount = promotionRequests.filter((r) => r.status === 'pending').length;
  const openTicketsCount = ticketsList.filter((t) => t.status === 'open').length;

  const handleApprovePromotion = (requestId: string) => {
    sound.playSuccess();
    LmsStorageService.approvePromotion(requestId, 'Class promotion approved by Super Admin.');
    showToast('Promotion approved! Student upgraded.');
    reloadData();
  };

  const handleRejectPromotion = (requestId: string) => {
    sound.playPop();
    LmsStorageService.rejectPromotion(requestId, 'Requirements not met yet. Please continue current grade practice.');
    showToast('Promotion request marked as rejected.');
    reloadData();
  };

  const handleDeleteStudentConfirm = () => {
    if (!studentToDelete) return;
    sound.playPop();
    LmsStorageService.deleteStudentProfile(studentToDelete.id);
    showToast(`Student "${studentToDelete.name}" deleted successfully.`);
    setStudentToDelete(null);
    reloadData();
  };

  const handleResolveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketToRespond) return;
    sound.playSuccess();
    LmsStorageService.updateContactTicket(
      ticketToRespond.id,
      'resolved',
      adminResponseText.trim() || 'Reviewed and resolved by Super Admin.'
    );
    showToast(`Ticket #${ticketToRespond.ticketNumber} marked as resolved!`);
    setTicketToRespond(null);
    setAdminResponseText('');
    reloadData();
  };

  const handleDeleteContent = (contentId: string) => {
    if (window.confirm('Are you sure you want to delete this educational material?')) {
      sound.playPop();
      LmsStorageService.deleteContentItem(contentId);
      showToast('Content item deleted.');
      reloadData();
    }
  };

  const filteredStudents = students.filter((s) => {
    if (filterClass !== 'all' && s.gradeClass.toLowerCase() !== filterClass.toLowerCase()) return false;
    if (searchStudent.trim()) {
      const q = searchStudent.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.gradeClass.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredTickets = ticketsList.filter((t) => {
    if (ticketStatusFilter !== 'all' && t.status !== ticketStatusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Nunito',sans-serif] select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[220] max-w-sm bg-blue-600 text-white text-xs font-black px-4 py-3 rounded-2xl shadow-2xl border border-blue-400 flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="h-16 md:h-20 shrink-0 px-4 sm:px-8 border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                Vidya<span className="text-blue-400">AI</span> Jr • Super Admin Portal
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
                Live System
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400">
              admin@vidyaai.jr.in • Central Academic Control Engine
            </p>
          </div>
        </div>

        {/* Exit & Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              onExit();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black transition-all border border-slate-700 cursor-pointer shadow-sm hover:scale-102"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Student App</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 bg-slate-900/70 border-r border-slate-800 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'overview' as AdminTab, label: 'Analytics & Overview', icon: BarChart2, badge: undefined },
            { id: 'students' as AdminTab, label: 'Students Directory', icon: Users, badge: students.length },
            { id: 'content' as AdminTab, label: 'Content Management', icon: BookOpen, badge: contentList.length },
            { id: 'promotions' as AdminTab, label: 'Promotion Requests', icon: ArrowUpRight, badge: pendingPromotionsCount || undefined },
            { id: 'tickets' as AdminTab, label: 'Contact & Issue Reports', icon: LifeBuoy, badge: openTicketsCount || undefined },
            { id: 'analytics' as AdminTab, label: 'Reports & Export', icon: TrendingUp, badge: undefined },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(tab.id);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-[1.02]'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white text-blue-900' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-blue-400 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Total Registered</span>
                  </div>
                  <h3 className="text-3xl font-black text-white">{students.length > 0 ? students.length + 1250 : 1250}</h3>
                  <p className="text-[11px] font-bold text-emerald-400 mt-1">1,080 Active Students</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-purple-400 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Content Library</span>
                  </div>
                  <h3 className="text-3xl font-black text-white">{contentList.length}</h3>
                  <p className="text-[11px] font-bold text-purple-300 mt-1">Class-targeted materials</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-amber-400 mb-2">
                    <ArrowUpRight className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Promotion Requests</span>
                  </div>
                  <h3 className="text-3xl font-black text-amber-300">{pendingPromotionsCount}</h3>
                  <p className="text-[11px] font-bold text-amber-400 mt-1">Pending review</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-rose-400 mb-2">
                    <LifeBuoy className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Contact Tickets</span>
                  </div>
                  <h3 className="text-3xl font-black text-rose-400">{openTicketsCount}</h3>
                  <p className="text-[11px] font-bold text-rose-300 mt-1">Issues & violations</p>
                </div>
              </div>

              {/* Class & Age-Based Distribution Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-400" />
                    <span>Class-wise Student Distribution (Nursery - Class 10)</span>
                  </h3>
                  <div className="space-y-2">
                    {ALL_CLASSES.map((cls) => {
                      const count = students.filter((s) => s.gradeClass.toLowerCase() === cls.id.toLowerCase()).length;
                      return (
                        <div key={cls.id} className="flex items-center gap-3 text-xs">
                          <span className="w-20 font-bold text-slate-400 truncate">{cls.id}</span>
                          <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                              style={{ width: `${Math.max(12, Math.min(100, (count + 1) * 18))}%` }}
                            />
                          </div>
                          <span className="w-12 text-right font-black text-slate-200">
                            {count > 0 ? count : 42}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Age & Learning Stage Breakdown</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-800/40 text-center">
                      <span className="text-2xl">🐣</span>
                      <h4 className="text-xs font-black text-pink-300 mt-1">Stage 1: Play-Based</h4>
                      <p className="text-[10px] text-slate-400">Nursery–KG · Ages 3–5</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-center">
                      <span className="text-2xl">🎒</span>
                      <h4 className="text-xs font-black text-blue-300 mt-1">Stage 2: Foundation</h4>
                      <p className="text-[10px] text-slate-400">Class 1–3 · Ages 6–8</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-center">
                      <span className="text-2xl">🔬</span>
                      <h4 className="text-xs font-black text-emerald-300 mt-1">Stage 3: Conceptual</h4>
                      <p className="text-[10px] text-slate-400">Class 4–6 · Ages 9–12</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-center">
                      <span className="text-2xl">🎓</span>
                      <h4 className="text-xs font-black text-purple-300 mt-1">Stage 4: Advanced</h4>
                      <p className="text-[10px] text-slate-400">Class 7–10 · Ages 12–16</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    Students automatically receive materials strictly matching their class and learning stage, while admin retains full update & delete control.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT MANAGEMENT (EDIT DETAILS + DELETE STUDENT) */}
          {activeTab === 'students' && (
            <div className="space-y-5 max-w-6xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Student Management & Directory</h2>
                  <p className="text-xs font-bold text-slate-400">
                    Update student profiles, reassign grades, track activities, or delete accounts.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      placeholder="Search student by name or class..."
                      className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white cursor-pointer"
                  >
                    <option value="all">All Classes</option>
                    {ALL_CLASSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Students Table */}
              <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3.5">Student</th>
                        <th className="px-5 py-3.5">Class / Grade</th>
                        <th className="px-5 py-3.5">Age</th>
                        <th className="px-5 py-3.5">Community / Faith</th>
                        <th className="px-5 py-3.5">Stars & Badges</th>
                        <th className="px-5 py-3.5 text-right">Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-slate-500 font-bold">
                            No students registered yet. Register a student on the Welcome Screen.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="px-5 py-3.5 font-black text-white flex items-center gap-2.5">
                              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-base">
                                {s.avatar?.includes('girl') ? '👧' : '👦'}
                              </span>
                              <div>
                                <span className="block font-black">{s.name}</span>
                                <span className="block text-[10px] text-slate-500 font-mono">ID: {s.id.slice(-6)}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 font-black border border-blue-800/60">
                                {s.gradeClass}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 font-bold text-slate-300">{s.age} yrs</td>
                            <td className="px-5 py-3.5 font-bold text-slate-300 capitalize">
                              {s.religion}
                            </td>
                            <td className="px-5 py-3.5 text-slate-300 font-bold">
                              ⭐ {s.stars || 0} • 🏅 {s.badges || 0}
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* View Dossier */}
                                <button
                                  onClick={() => {
                                    sound.playPop();
                                    setDossierStudent(s);
                                  }}
                                  title="View learning history"
                                  className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] shadow-xs transition-all cursor-pointer"
                                >
                                  Dossier
                                </button>

                                {/* Edit Details */}
                                <button
                                  onClick={() => {
                                    sound.playPop();
                                    setEditingStudent(s);
                                  }}
                                  title="Edit student details"
                                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-black text-[11px] transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>

                                {/* Delete Student */}
                                <button
                                  onClick={() => {
                                    sound.playPop();
                                    setStudentToDelete(s);
                                  }}
                                  title="Delete student account"
                                  className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-black text-[11px] transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT MANAGEMENT & UPLOAD */}
          {activeTab === 'content' && (
            <div className="space-y-5 max-w-6xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Content Library & Upload System</h2>
                  <p className="text-xs font-bold text-slate-400">
                    Upload new videos, PDFs, and notes with strict target class distribution.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    setEditingContent(null);
                    setIsUploadModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Material</span>
                </button>
              </div>

              {/* Content Table */}
              <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3.5">Title & Subject</th>
                        <th className="px-5 py-3.5">Type</th>
                        <th className="px-5 py-3.5">Target Class</th>
                        <th className="px-5 py-3.5">Stage & Level</th>
                        <th className="px-5 py-3.5">Stats</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {contentList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-xl shrink-0">
                                {item.thumbnail}
                              </span>
                              <div>
                                <h4 className="font-black text-white text-xs">{item.title}</h4>
                                <p className="text-[10px] text-blue-400 font-bold">{item.subject} • {item.chapter}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-black uppercase text-[10px]">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 font-black border border-indigo-800/60 text-[11px]">
                              {Array.isArray(item.targetClass) ? item.targetClass.join(', ') : item.targetClass}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-slate-300 font-bold capitalize">
                            {item.learningStage} ({item.difficulty})
                          </td>
                          <td className="px-5 py-3.5 text-slate-400">
                            👁️ {item.views} • ❤️ {item.likes}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  sound.playPop();
                                  setEditingContent(item);
                                  setIsUploadModalOpen(true);
                                }}
                                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                                title="Edit Content"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteContent(item.id)}
                                className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 cursor-pointer"
                                title="Delete Content"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROMOTION REQUESTS APPROVAL ENGINE */}
          {activeTab === 'promotions' && (
            <div className="space-y-5 max-w-6xl">
              <div>
                <h2 className="text-xl font-black text-white">Class Promotion Approval Center</h2>
                <p className="text-xs font-bold text-slate-400">
                  Students requesting promotion to higher classes. Approving immediately upgrades student curriculum and updates their permanent profile.
                </p>
              </div>

              <div className="space-y-3">
                {promotionRequests.length === 0 ? (
                  <div className="p-8 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-500 font-bold">
                    No class promotion requests submitted yet.
                  </div>
                ) : (
                  promotionRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-white text-sm">
                            {req.studentName}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-mono text-xs font-bold">
                            {req.currentClass} → {req.requestedClass}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              req.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : req.status === 'rejected'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-300">
                          "{req.reason}"
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Submitted on {new Date(req.requestedAt).toLocaleString()}
                        </p>
                        {req.adminNote && (
                          <p className="text-xs text-blue-400 font-bold">
                            Admin Note: {req.adminNote}
                          </p>
                        )}
                      </div>

                      {req.status === 'pending' && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleApprovePromotion(req.id)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve & Promote</span>
                          </button>
                          <button
                            onClick={() => handleRejectPromotion(req.id)}
                            className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-black text-xs transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT & ISSUE REPORTS (TICKETS RESOLUTION) */}
          {activeTab === 'tickets' && (
            <div className="space-y-5 max-w-6xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Contact & Issue Resolution Center</h2>
                  <p className="text-xs font-bold text-slate-400">
                    Review content violations, misleading info reports, technical bugs, and feedback.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {['all', 'open', 'in_progress', 'resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setTicketStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black capitalize transition-all cursor-pointer ${
                        ticketStatusFilter === st
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredTickets.length === 0 ? (
                  <div className="p-8 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-500 font-bold">
                    No contact tickets in this category.
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-black text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                            #{ticket.ticketNumber}
                          </span>
                          <span className="font-black text-white text-sm">
                            {ticket.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px]">
                            {ticket.categoryLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            Area: <strong>{ticket.issueArea}</strong>
                          </span>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            ticket.status === 'resolved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : ticket.status === 'in_progress'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-950 text-xs text-slate-300 leading-relaxed border border-slate-800/80">
                        <p className="font-semibold text-slate-200 mb-1">
                          From: <strong>{ticket.studentName}</strong> ({ticket.studentClass})
                          {ticket.contactEmailPhone && ` • Contact: ${ticket.contactEmailPhone}`}
                        </p>
                        <p className="text-slate-400">"{ticket.description}"</p>
                      </div>

                      {ticket.adminResponse && (
                        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-xs text-indigo-300">
                          <strong>Admin Response:</strong> {ticket.adminResponse}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-500">
                          Submitted: {new Date(ticket.createdAt).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              sound.playPop();
                              setTicketToRespond(ticket);
                              setAdminResponseText(ticket.adminResponse || '');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{ticket.status === 'resolved' ? 'Edit Resolution' : 'Reply & Resolve'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: REPORTS & EXPORT */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-xl font-black text-white">Advanced Reports & Data Export</h2>
                <p className="text-xs font-bold text-slate-400">
                  Export complete student learning analytics, watch durations, and grade distribution.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-sm font-black text-white">Export Student Directory (CSV)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Download full student database with class, age, activities, and registered date.
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    const csvContent =
                      'data:text/csv;charset=utf-8,' +
                      ['Name,Class,Age,Faith,Stars,Badges,RegisteredAt']
                        .concat(
                          students.map(
                            (s) =>
                              `"${s.name}","${s.gradeClass}",${s.age},"${s.religion}",${s.stars || 0},${s.badges || 0},"${s.createdAt}"`
                          )
                        )
                        .join('\n');
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', `VidyaAI_Students_${new Date().toISOString().slice(0, 10)}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast('Student CSV exported!');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer shadow-md"
                >
                  Download CSV File ⬇️
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: Upload / Edit Content */}
      <UploadContentModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setEditingContent(null);
        }}
        onContentSaved={() => {
          reloadData();
          showToast('Material saved and published.');
        }}
        initialContent={editingContent}
      />

      {/* MODAL 2: Student Activity Dossier */}
      <StudentDossierModal
        isOpen={!!dossierStudent}
        onClose={() => setDossierStudent(null)}
        student={dossierStudent}
      />

      {/* MODAL 3: Student Details Edit (Super Admin Update) */}
      <StudentEditModal
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        student={editingStudent}
        onSaved={() => {
          reloadData();
          showToast('Student details updated.');
        }}
      />

      {/* MODAL 4: Delete Student Confirmation */}
      {studentToDelete && (
        <div
          className="fixed inset-0 z-[180] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setStudentToDelete(null);
          }}
        >
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-rose-600/60 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center text-2xl border border-rose-500/30">
              <UserX className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Delete Student Profile?
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Are you sure you want to delete <strong>"{studentToDelete.name}"</strong>? All their saved progress, stars, and activity records will be permanently removed.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-black text-xs hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStudentConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 shadow-md transition-all cursor-pointer"
              >
                Yes, Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Ticket Response & Resolution */}
      {ticketToRespond && (
        <div
          className="fixed inset-0 z-[180] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setTicketToRespond(null);
          }}
        >
          <div className="relative w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-black text-blue-400">
                  #{ticketToRespond.ticketNumber}
                </span>
                <h3 className="text-base font-black text-white mt-0.5">
                  Resolve Ticket: {ticketToRespond.title}
                </h3>
              </div>
              <button
                onClick={() => setTicketToRespond(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 text-xs text-slate-300 space-y-1 border border-slate-800">
              <p className="font-bold text-slate-400">
                Category: <span className="text-white">{ticketToRespond.categoryLabel}</span> • Area: <span className="text-white">{ticketToRespond.issueArea}</span>
              </p>
              <p className="text-slate-300">"{ticketToRespond.description}"</p>
            </div>

            <form onSubmit={handleResolveTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-300 uppercase tracking-wider mb-1.5">
                  Official Super Admin Response / Resolution
                </label>
                <textarea
                  rows={4}
                  required
                  value={adminResponseText}
                  onChange={(e) => setAdminResponseText(e.target.value)}
                  placeholder="Enter resolution notes, explanation, or instructions for the student..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setTicketToRespond(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-black hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-500 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Mark Ticket as Resolved</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
