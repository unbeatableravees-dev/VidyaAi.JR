// =============================================================================
// SMART LEARNING & AGE-BASED CONTENT MANAGEMENT SYSTEM DATA TYPES
// =============================================================================

import { ReligionType } from './student';

export type ClassGrade =
  | 'Nursery'
  | 'LKG'
  | 'UKG'
  | 'Class 1'
  | 'Class 2'
  | 'Class 3'
  | 'Class 4'
  | 'Class 5'
  | 'Class 6'
  | 'Class 7'
  | 'Class 8'
  | 'Class 9'
  | 'Class 10';

export type AgeGroup = '3-5' | '6-8' | '9-12' | '12-16';

export type LearningStage =
  | 'play-based'   // Nursery - KG (3-5 Years)
  | 'foundation'   // Class 1 - 3 (6-8 Years)
  | 'conceptual'   // Class 4 - 6 (9-12 Years)
  | 'advanced';    // Class 7 - 10 (12-16 Years)

export type ContentType = 'video' | 'pdf' | 'notes' | 'quiz';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type SubjectCategory =
  | 'Mathematics'
  | 'Science'
  | 'English'
  | 'Social Studies'
  | 'Environmental Studies'
  | 'Computer Science'
  | 'Hindi & Sanskrit'
  | 'Punjabi & Gurmukhi'
  | 'Urdu & Islamic'
  | 'Arts & Creativity'
  | 'Moral & Sanskar'
  | 'Stories & Rhymes';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  subject: SubjectCategory | string;
  targetClass: ClassGrade | ClassGrade[] | 'all';
  targetAgeGroup: AgeGroup;
  learningStage: LearningStage;
  difficulty: DifficultyLevel;
  chapter: string;
  thumbnail: string;
  mediaUrl: string; // Video URL or document text / PDF simulation
  contentBody?: string; // Rich text / reading sheet notes
  status: 'draft' | 'published';
  publishedAt: string;
  views: number;
  likes: number;
  religionTarget?: ReligionType | 'all';
  durationMinutes?: number;
}

export interface StudentActivity {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  contentId: string;
  contentTitle: string;
  contentType: ContentType;
  subject: string;
  action: 'watched' | 'opened' | 'completed' | 'half_watched' | 'quiz_attempt';
  progressPercent: number; // 0 to 100
  score?: {
    correct: number;
    total: number;
    percentage: number;
  };
  timestamp: string;
}

export interface StudentInterest {
  id: string;
  studentId: string;
  studentName: string;
  contentId?: string;
  topicName: string;
  subject: string;
  type: 'interested' | 'saved_for_later' | 'want_to_learn_more' | 'request_additional';
  note?: string;
  createdAt: string;
}

export interface PromotionRequest {
  id: string;
  studentId: string;
  studentName: string;
  currentClass: string;
  requestedClass: string;
  studentAge: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  adminNote?: string;
}

export type TicketIssueCategory =
  | 'class_promotion'
  | 'content_violation'
  | 'misleading_info'
  | 'bug_glitch'
  | 'audio_video_issue'
  | 'quiz_mistake'
  | 'request_topic'
  | 'account_profile'
  | 'other';

export type TicketIssueArea =
  | 'General Platform'
  | 'Mathematics'
  | 'Science'
  | 'English & Phonics'
  | 'Hindi & Sanskrit'
  | 'Punjabi & Gurmukhi'
  | 'Urdu & Islamic'
  | '3D Explorers'
  | 'Quizzes & Tests'
  | 'Badges & Progress';

export interface ContactTicket {
  id: string;
  ticketNumber: string; // e.g. TKT-1042
  studentId: string;
  studentName: string;
  studentClass: string;
  category: TicketIssueCategory;
  categoryLabel: string;
  issueArea: TicketIssueArea | string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  contactEmailPhone?: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
  adminResponse?: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'super_admin';
}

export const ALL_CLASSES: { id: ClassGrade; label: string; ageRange: string; stage: LearningStage; icon: string }[] = [
  { id: 'Nursery', label: 'Nursery', ageRange: '3-4 Years', stage: 'play-based', icon: '🐣' },
  { id: 'LKG', label: 'LKG (Lower KG)', ageRange: '4-5 Years', stage: 'play-based', icon: '🎨' },
  { id: 'UKG', label: 'UKG (Upper KG)', ageRange: '5-6 Years', stage: 'play-based', icon: '🎈' },
  { id: 'Class 1', label: 'Class 1', ageRange: '6-7 Years', stage: 'foundation', icon: '🎒' },
  { id: 'Class 2', label: 'Class 2', ageRange: '7-8 Years', stage: 'foundation', icon: '✏️' },
  { id: 'Class 3', label: 'Class 3', ageRange: '8-9 Years', stage: 'foundation', icon: '⭐' },
  { id: 'Class 4', label: 'Class 4', ageRange: '9-10 Years', stage: 'conceptual', icon: '🔭' },
  { id: 'Class 5', label: 'Class 5', ageRange: '10-11 Years', stage: 'conceptual', icon: '🚀' },
  { id: 'Class 6', label: 'Class 6', ageRange: '11-12 Years', stage: 'conceptual', icon: '🔬' },
  { id: 'Class 7', label: 'Class 7', ageRange: '12-13 Years', stage: 'advanced', icon: '🧪' },
  { id: 'Class 8', label: 'Class 8', ageRange: '13-14 Years', stage: 'advanced', icon: '📐' },
  { id: 'Class 9', label: 'Class 9', ageRange: '14-15 Years', stage: 'advanced', icon: '🧬' },
  { id: 'Class 10', label: 'Class 10', ageRange: '15-16 Years', stage: 'advanced', icon: '🎓' },
];

export const STAGE_CONFIGS: Record<LearningStage, { title: string; subtitle: string; badge: string; color: string; desc: string }> = {
  'play-based': {
    title: 'Play-Based Early Learning',
    subtitle: 'Nursery – KG (Ages 3–5)',
    badge: 'STAGE 1 • PLAY & PHONICS',
    color: 'from-pink-500 via-rose-500 to-amber-500',
    desc: 'ABC, phonics, numbers, shapes, bright cartoon rhymes, and gentle picture storytelling.',
  },
  'foundation': {
    title: 'Foundation Skills & Discovery',
    subtitle: 'Classes 1–3 (Ages 6–8)',
    badge: 'STAGE 2 • FOUNDATION LEARNING',
    color: 'from-blue-500 via-indigo-600 to-cyan-500',
    desc: 'Arithmetic foundations, grammar, multilingual reading, nature studies, and interactive quizzes.',
  },
  'conceptual': {
    title: 'Conceptual & Problem Solving',
    subtitle: 'Classes 4–6 (Ages 9–12)',
    badge: 'STAGE 3 • CONCEPTUAL SCIENCE & MATH',
    color: 'from-emerald-600 via-teal-600 to-indigo-600',
    desc: 'Step-by-step problem solving, hands-on science experiments, social studies, and logical reasoning.',
  },
  'advanced': {
    title: 'Advanced & Analytical Mastery',
    subtitle: 'Classes 7–10 (Ages 12–16)',
    badge: 'STAGE 4 • ADVANCED CURRICULUM',
    color: 'from-purple-600 via-indigo-700 to-blue-800',
    desc: 'In-depth Physics, Chemistry, Biology, advanced algebra, computer science, and assessments.',
  },
};

export function getStageForClass(grade: string): LearningStage {
  const norm = grade.toLowerCase();
  if (norm.includes('nursery') || norm.includes('lkg') || norm.includes('ukg') || norm.includes('kg')) {
    return 'play-based';
  }
  if (norm.includes('class 1') || norm.includes('class 2') || norm.includes('class 3')) {
    return 'foundation';
  }
  if (norm.includes('class 4') || norm.includes('class 5') || norm.includes('class 6')) {
    return 'conceptual';
  }
  return 'advanced';
}

export function getExpectedAgeForClass(grade: string): { min: number; max: number; label: string } {
  const norm = grade.toLowerCase();
  if (norm.includes('nursery')) return { min: 3, max: 4, label: '3-4 yrs' };
  if (norm.includes('lkg')) return { min: 4, max: 5, label: '4-5 yrs' };
  if (norm.includes('ukg') || norm.includes('kg')) return { min: 5, max: 6, label: '5-6 yrs' };
  if (norm.includes('class 1')) return { min: 6, max: 7, label: '6-7 yrs' };
  if (norm.includes('class 2')) return { min: 7, max: 8, label: '7-8 yrs' };
  if (norm.includes('class 3')) return { min: 8, max: 9, label: '8-9 yrs' };
  if (norm.includes('class 4')) return { min: 9, max: 10, label: '9-10 yrs' };
  if (norm.includes('class 5')) return { min: 10, max: 11, label: '10-11 yrs' };
  if (norm.includes('class 6')) return { min: 11, max: 12, label: '11-12 yrs' };
  if (norm.includes('class 7')) return { min: 12, max: 13, label: '12-13 yrs' };
  if (norm.includes('class 8')) return { min: 13, max: 14, label: '13-14 yrs' };
  if (norm.includes('class 9')) return { min: 14, max: 15, label: '14-15 yrs' };
  if (norm.includes('class 10')) return { min: 15, max: 16, label: '15-16 yrs' };
  return { min: 6, max: 16, label: '6-16 yrs' };
}
