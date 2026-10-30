import { ReligionType, RELIGION_CONFIGS } from '../types/student';
import { NavTab } from '../components/layout/Sidebar';

export interface LocalizedNavLabel {
  primary: string;
  secondary: string;
  badge?: string;
}

export function getNavLabels(religion: ReligionType = 'muslim'): Record<string, LocalizedNavLabel> {
  switch (religion) {
    case 'muslim':
      return {
        home: { primary: 'Home', secondary: 'گھر' },
        categories: { primary: 'Categories (14)', secondary: 'اقسام' },
        islamic: { primary: 'Islamic Teachings', secondary: 'اسلامی تعلیمات', badge: '🕌' },
        explorer: { primary: '3D Explorer', secondary: 'تھری ڈی کھوج' },
        practice: { primary: 'Practice Games', secondary: 'مشق کھیلیں' },
        learning: { primary: 'My Learning', secondary: 'میری پڑھائی' },
        progress: { primary: 'Progress', secondary: 'کارکردگی' },
        settings: { primary: 'Settings', secondary: 'ترتیبات' },
      };

    case 'sikh':
      return {
        home: { primary: 'Home', secondary: 'ਮੁੱਖ ਪੰਨਾ' },
        categories: { primary: 'Categories (14)', secondary: 'ਸ਼੍ਰੇਣੀਆਂ' },
        punjabi: { primary: 'Punjabi & Gurmukhi', secondary: 'ਪੰਜਾਬੀ ਸਿੱਖਿਆ', badge: '☬' },
        explorer: { primary: '3D Explorer', secondary: '3D ਖੋਜ' },
        practice: { primary: 'Practice Games', secondary: 'ਅਭਿਆਸ ਗੇਮਾਂ' },
        learning: { primary: 'My Learning', secondary: 'ਮੇਰੀ ਪੜ੍ਹਾਈ' },
        progress: { primary: 'Progress', secondary: 'ਪ੍ਰਗਤੀ' },
        settings: { primary: 'Settings', secondary: 'ਸੈਟਿੰਗਾਂ' },
      };

    case 'hindu':
      return {
        home: { primary: 'Home', secondary: 'मुख्य पृष्ठ' },
        categories: { primary: 'Categories (14)', secondary: 'श्रेणियाँ' },
        hindi: { primary: 'Hindi & Culture', secondary: 'हिन्दी ज्ञान', badge: '🕉️' },
        explorer: { primary: '3D Explorer', secondary: '3D खोज' },
        practice: { primary: 'Practice Games', secondary: 'अभ्यास खेल' },
        learning: { primary: 'My Learning', secondary: 'मेरी पढ़ाई' },
        progress: { primary: 'Progress', secondary: 'प्रगति' },
        settings: { primary: 'Settings', secondary: 'सेटिंग्स' },
      };

    default:
      return {
        home: { primary: 'Home', secondary: 'Overview' },
        categories: { primary: 'Categories (14)', secondary: 'Subjects' },
        explorer: { primary: '3D Explorer', secondary: 'Discovery' },
        practice: { primary: 'Practice Games', secondary: 'Arcade' },
        learning: { primary: 'My Learning', secondary: 'Lessons' },
        progress: { primary: 'Progress', secondary: 'Stats' },
        settings: { primary: 'Settings', secondary: 'Profile' },
      };
  }
}

export function getGreeting(religion: ReligionType = 'muslim', name: string = 'Explorer'): {
  text: string;
  subtext: string;
  badge: string;
} {
  const config = RELIGION_CONFIGS[religion] || RELIGION_CONFIGS.other;
  return {
    text: `${config.greeting}, ${name}!`,
    subtext: `${config.greetingTransliteration} • Welcome to VidyaAI Jr`,
    badge: config.languageBadge,
  };
}

export function getPraise(religion: ReligionType = 'muslim'): string {
  const config = RELIGION_CONFIGS[religion] || RELIGION_CONFIGS.other;
  return config.praiseWord;
}
