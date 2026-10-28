export interface Category {
  id: string;
  name: string;
  hindiName?: string;
  iconType: string;
  bgColor: string;
  textColor: string;
  arrowBg: string;
  count?: string;
}

export interface PracticeActivity {
  id: string;
  title: string;
  iconType: string;
  bgColor: string;
  badgeColor: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  isLocked: boolean;
  thumbnail: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  isLocked?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  visualType: 'apples' | 'stars' | 'shapes' | 'numbers';
  numA: number;
  numB: number;
  options: { key: string; value: string | number }[];
  correctAnswer: string;
  explanation: string;
}

export interface LessonStep {
  id: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  isActive: boolean;
  isLocked: boolean;
  thumbnail: string;
}
