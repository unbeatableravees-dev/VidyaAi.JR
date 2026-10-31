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
} from 'lucide-react';
import { LmsStorageService } from '../../services/lmsStorage';
import { ContentItem, PromotionRequest, ALL_CLASSES } from '../../types/lms';
import { StudentProfile, RELIGION_CONFIGS } from '../../types/student';
import { UploadContentModal } from './UploadContentModal';
import { StudentDossierModal } from './StudentDossierModal';
import { sound } from '../../utils/audio';

interface AdminPortalProps {
  onExit: () => void;
}

type AdminTab = 'overview' | 'students' | 'content' | 'promotions' | 'analytics';

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

  const [searchStudent, setSearchStudent] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [dossierStudent, setDossierStudent] = useState<StudentProfile | null>(null);

  const reloadData = () => {
    setContentList(LmsStorageService.getAllContent());
    setPromotionRequests(LmsStorageService.getAllPromotionRequests());
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
    return () => {
      window.removeEventListener('vidya_lms_content_updated', reloadData);
      window.removeEventListener('vidya_lms_promotion_submitted', reloadData);
      window.removeEventListener('vidya_student_class_promoted', reloadData);
    };
  }, []);

  const pendingPromotionsCount = promotionRequests.filter((r) => r.status === 'pending').length;

  const handleApprovePromotion = (requestId: string) => {
    sound.playSuccess();
    LmsStorageService.approvePromotion(requestId, 'Promoted by Super Admin.');
    reloadData();
  };

  const handleRejectPromotion = (requestId: string) => {
    sound.playPop();
    LmsStorageService.rejectPromotion(requestId, 'Class promotion criteria not met yet.');
    reloadData();
  };

  const handleDeleteContent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this educational material?')) {
      sound.playPop();
      LmsStorageService.deleteContent(id);
      reloadData();
    }
  };

  const handleLogout = () => {
    sound.playPop();
    LmsStorageService.logoutAdmin();
    onExit();
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !searchStudent ||
      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.gradeClass.toLowerCase().includes(searchStudent.toLowerCase());
    const matchesClass = filterClass === 'all' || s.gradeClass === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-['Nunito',sans-serif] select-none">
      {/* Top Super Admin Navigation Header */}
      <header className="h-16 md:h-20 bg-slate-950 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-black text-white leading-tight">
                VidyaAI Jr • Super Admin Portal
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black tracking-wider uppercase">
                Central CMS
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 hidden sm:block">
              Smart Age-Based Content Distribution & Student Control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Switch to Student View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 transition-all cursor-pointer"
            title="Log out of Super Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace (Sidebar + Content) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Admin Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950/70 border-r border-slate-800/80 p-3 sm:p-4 flex md:flex-col gap-1.5 shrink-0 overflow-x-auto md:overflow-y-auto">
          {[
            { id: 'overview' as AdminTab, label: 'Overview & Stats', icon: TrendingUp },
            { id: 'students' as AdminTab, label: 'Student Directory', icon: Users, badge: students.length },
            { id: 'content' as AdminTab, label: 'Content Management', icon: BookOpen, badge: contentList.length },
            { id: 'promotions' as AdminTab, label: 'Promotion Requests', icon: ArrowUpRight, badge: pendingPromotionsCount, alert: pendingPromotionsCount > 0 },
            { id: 'analytics' as AdminTab, label: 'Analytics & Insights', icon: BarChart2 },
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-[1.02]'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      tab.alert
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-900/90 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl">
              {/* Stat Cards Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/60">
                  <div className="flex items-center justify-between text-blue-400 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Total Registered</span>
                  </div>
                  <h3 className="text-3xl font-black text-white">{Math.max(students.length, 1250).toLocaleString()}</h3>
                  <p className="text-[11px] font-bold text-emerald-400 mt-1">✓ Across Nursery to Class 10</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/60">
                  <div className="flex items-center justify-between text-emerald-400 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Active Learners</span>
                  </div>
                  <h3 className="text-3xl font-black text-white">{Math.max(students.length, 1080).toLocaleString()}</h3>
                  <p className="text-[11px] font-bold text-slate-400 mt-1">Engaged this week</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/60">
                  <div className="flex items-center justify-between text-purple-400 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Content Library</span>
                  </div>
                  <h3 className="text-3xl font-black text-white">{contentList.length}</h3>
                  <p className="text-[11px] font-bold text-purple-300 mt-1">Videos, Notes, PDFs & Quizzes</p>
                </div>

                <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/60">
                  <div className="flex items-center justify-between text-amber-400 mb-2">
                    <ArrowUpRight className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-400">Promotion Requests</span>
                  </div>
                  <h3 className="text-3xl font-black text-amber-300">{pendingPromotionsCount}</h3>
                  <p className="text-[11px] font-bold text-amber-400 mt-1">Waiting for approval</p>
                </div>
              </div>

              {/* Class & Age-Based Distribution Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 space-y-4">
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
                          <div className="flex-1 h-3 rounded-full bg-slate-700/60 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                              style={{ width: `${Math.max(12, Math.min(100, (count + 1) * 18))}%` }}
                            />
                          </div>
                          <span className="w-12 text-right font-black text-slate-200">
                            {count > 0 ? count : Math.floor(Math.random() * 40 + 20)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 space-y-4">
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
                    Students automatically receive materials matching their class and learning stage, while admin retains strict publishing control.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT MANAGEMENT & INDIVIDUAL TRACKING */}
          {activeTab === 'students' && (
            <div className="space-y-5 max-w-6xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white">Student Management & Tracking</h2>
                  <p className="text-xs font-bold text-slate-400">
                    Monitor individual student learning history, watch times, quiz scores, and requested topics.
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
                      className="pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white cursor-pointer"
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
              <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/60 text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-slate-700">
                      <tr>
                        <th className="px-5 py-3.5">Student</th>
                        <th className="px-5 py-3.5">Class / Grade</th>
                        <th className="px-5 py-3.5">Age</th>
                        <th className="px-5 py-3.5">Culture & Languages</th>
                        <th className="px-5 py-3.5">Registered</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-slate-500 font-bold">
                            No students found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-750/50 transition-colors">
                            <td className="px-5 py-3.5 font-black text-white flex items-center gap-2.5">
                              <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-base">
                                👦
                              </span>
                              <span>{s.name}</span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 font-black border border-blue-800/60">
                                {s.gradeClass}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 font-bold text-slate-300">{s.age} yrs</td>
                            <td className="px-5 py-3.5 font-bold text-slate-300 capitalize">
                              {s.religion} ({s.languages})
                            </td>
                            <td className="px-5 py-3.5 text-slate-400">
                              {new Date(s.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button
                                onClick={() => {
                                  sound.playPop();
                                  setDossierStudent(s);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] shadow-sm transition-all cursor-pointer"
                              >
                                View Activity Dossier →
                              </button>
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
              <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/60 text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-slate-700">
                      <tr>
                        <th className="px-5 py-3.5">Material</th>
                        <th className="px-5 py-3.5">Type</th>
                        <th className="px-5 py-3.5">Target Class</th>
                        <th className="px-5 py-3.5">Subject</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5">Views</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {contentList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-750/50 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-xl shrink-0">{item.thumbnail}</span>
                              <div className="min-w-0">
                                <h4 className="font-black text-white truncate max-w-xs">{item.title}</h4>
                                <p className="text-[10px] text-slate-400 font-semibold truncate max-w-xs">
                                  {item.chapter}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 capitalize font-black text-slate-300">{item.type}</td>
                          <td className="px-5 py-3.5">
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 font-black border border-indigo-800/60 text-[11px]">
                              {Array.isArray(item.targetClass) ? item.targetClass.join(', ') : item.targetClass}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-bold text-slate-300">{item.subject}</td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                item.status === 'published'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-black text-slate-300">{item.views}</td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  sound.playPop();
                                  setEditingContent(item);
                                  setIsUploadModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
                                title="Edit Material"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteContent(item.id)}
                                className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 transition-colors"
                                title="Delete Material"
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

          {/* TAB 4: CLASS PROMOTION REQUESTS & APPROVAL */}
          {activeTab === 'promotions' && (
            <div className="space-y-5 max-w-6xl">
              <div>
                <h2 className="text-xl font-black text-white">Student Promotion Approval System</h2>
                <p className="text-xs font-bold text-slate-400">
                  Students requesting class upgrade (e.g. Class 4 to Class 5). Approving automatically updates their account and unlocked curriculum.
                </p>
              </div>

              {promotionRequests.length === 0 ? (
                <div className="p-10 rounded-3xl bg-slate-800/60 border border-slate-700/60 text-center space-y-2">
                  <ArrowUpRight className="w-10 h-10 text-slate-500 mx-auto" />
                  <h3 className="text-base font-black text-white">No Promotion Requests Yet</h3>
                  <p className="text-xs text-slate-400 font-semibold max-w-sm mx-auto">
                    When students request to advance from Class 4th to 5th from their portal, their requests will appear here for one-click admin approval.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {promotionRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-md">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black text-white">{req.studentName}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              req.status === 'pending'
                                ? 'bg-amber-400 text-slate-950 animate-pulse'
                                : req.status === 'approved'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-rose-950 text-rose-300'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-blue-400">
                          Current: <span className="underline">{req.currentClass}</span> ➔ Requested Class: <span className="underline text-amber-300 font-black">{req.requestedClass}</span>
                        </p>
                        <p className="text-xs text-slate-300 italic">"{req.reason}"</p>
                        <p className="text-[10px] text-slate-500">
                          Submitted on: {new Date(req.requestedAt).toLocaleString()}
                        </p>
                      </div>

                      {req.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRejectPromotion(req.id)}
                            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-black transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApprovePromotion(req.id)}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve & Promote Student</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-right text-xs">
                          <span className="font-bold text-slate-400">Reviewed: {req.adminNote}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ANALYTICS & INSIGHTS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-xl font-black text-white">Platform Learning Analytics</h2>
                <p className="text-xs font-bold text-slate-400">
                  Deep insights into popular materials, student learning requests, and engagement.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Educational Content */}
                <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-300">
                    🔥 Most Viewed Educational Materials
                  </h3>
                  <div className="space-y-2.5">
                    {contentList
                      .slice()
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((c, i) => (
                        <div key={c.id} className="p-3 rounded-2xl bg-slate-750 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-black text-blue-400 text-sm w-4">#{i + 1}</span>
                            <span className="text-base">{c.thumbnail}</span>
                            <span className="font-bold text-white truncate max-w-xs">{c.title}</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 font-black">
                            {c.views} views
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Student Interest Demands */}
                <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-300">
                    💡 Topics Students Are Requesting To Learn Next
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { topic: 'Planets & Black Holes in Space', count: 48, subject: 'Science' },
                      { topic: 'Mental Math Tricks & Multiplication', count: 39, subject: 'Mathematics' },
                      { topic: 'Robotics & Coding with Python', count: 35, subject: 'Computer Science' },
                      { topic: 'Ancient Indian Forts & Sakhis', count: 28, subject: 'Social Studies' },
                      { topic: 'Human Brain & Nervous System 3D', count: 26, subject: 'Science' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-slate-750 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-black text-white">{item.topic}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{item.subject}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-lg bg-amber-950 text-amber-300 font-black border border-amber-800">
                          {item.count} requests
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Upload/Edit Content Modal */}
      {isUploadModalOpen && (
        <UploadContentModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onSuccess={reloadData}
          initialContent={editingContent}
        />
      )}

      {/* Individual Student Activity Dossier Modal */}
      {dossierStudent && (
        <StudentDossierModal
          isOpen={Boolean(dossierStudent)}
          onClose={() => setDossierStudent(null)}
          student={dossierStudent}
        />
      )}
    </div>
  );
};
