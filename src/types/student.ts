// =============================================================================
// STUDENT PROFILE & MULTI-FAITH MULTI-LINGUAL DATA MODEL
// =============================================================================

export type ReligionType = 'muslim' | 'sikh' | 'hindu' | 'other';

export type LanguagePair =
  | 'english-urdu'     // For Muslim students
  | 'english-punjabi'  // For Sikh students
  | 'english-hindi'    // For Hindu students
  | 'english-only';    // For General / Universal

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gradeClass: string;
  religion: ReligionType;
  languages: LanguagePair;
  favoriteGame: string;
  createdAt: string;
  stars?: number;
  badges?: number;
}

export const RELIGION_CONFIGS: Record<
  ReligionType,
  {
    id: ReligionType;
    label: string;
    subLabel: string;
    icon: string;
    color: string;
    borderColor: string;
    bgGradient: string;
    defaultLanguages: LanguagePair;
    languageBadge: string;
    culturalFocus: string;
    greeting: string;
    greetingTransliteration: string;
    praiseWord: string;
    scriptFont: string;
  }
> = {
  muslim: {
    id: 'muslim',
    label: 'Islam (مسلم)',
    subLabel: 'Urdu & English • Islamic Academy Unlocked',
    icon: '🌙',
    color: 'from-emerald-500 to-teal-700',
    borderColor: 'border-emerald-300',
    bgGradient: 'from-emerald-50 to-teal-50',
    defaultLanguages: 'english-urdu',
    languageBadge: 'English + Urdu (اردو)',
    culturalFocus: 'Islamic Teachings, Quran Surahs, Prophets & Duas',
    greeting: 'اَلسَّلَامُ عَلَيْكُمْ',
    greetingTransliteration: 'Assalamu Alaikum',
    praiseWord: 'ماشاءاللہ! بہت خوب',
    scriptFont: 'font-urdu',
  },
  sikh: {
    id: 'sikh',
    label: 'Sikhism (ਸਿੱਖ)',
    subLabel: 'Punjabi & English • Gurmukhi Learning Unlocked',
    icon: '☬',
    color: 'from-amber-500 to-orange-700',
    borderColor: 'border-amber-300',
    bgGradient: 'from-amber-50 to-orange-50',
    defaultLanguages: 'english-punjabi',
    languageBadge: 'English + Punjabi (ਪੰਜਾਬੀ)',
    culturalFocus: 'Gurmukhi Alphabet, Punjabi Virasat, Seva & Bravery',
    greeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
    greetingTransliteration: 'Sat Sri Akal',
    praiseWord: 'ਸ਼ਾਬਾਸ਼! ਬਹੁਤ ਵਧੀਆ',
    scriptFont: 'font-punjabi',
  },
  hindu: {
    id: 'hindu',
    label: 'Hinduism (हिन्दू)',
    subLabel: 'Hindi & English • Cultural Wisdom Unlocked',
    icon: '🕉️',
    color: 'from-orange-500 to-red-600',
    borderColor: 'border-orange-300',
    bgGradient: 'from-orange-50 to-rose-50',
    defaultLanguages: 'english-hindi',
    languageBadge: 'English + Hindi (हिन्दी)',
    culturalFocus: 'Hindi Varnamala, Panchatantra Moral Fables & Culture',
    greeting: 'नमस्ते',
    greetingTransliteration: 'Namaste',
    praiseWord: 'शाबाश! बहुत बढ़िया',
    scriptFont: 'font-hindi',
  },
  other: {
    id: 'other',
    label: 'Universal / All (ਸਰਬ ਸਾਂਝਾ)',
    subLabel: 'English & Global Discovery',
    icon: '🌟',
    color: 'from-blue-500 to-indigo-700',
    borderColor: 'border-blue-300',
    bgGradient: 'from-blue-50 to-indigo-50',
    defaultLanguages: 'english-only',
    languageBadge: 'English + Global Science',
    culturalFocus: 'Cosmic Space, Science 3D, Ethics & World Knowledge',
    greeting: 'Welcome',
    greetingTransliteration: 'Hello & Welcome',
    praiseWord: 'Awesome! Great Job',
    scriptFont: '',
  },
};
