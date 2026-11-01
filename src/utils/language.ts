import { ReligionType } from '../types/student';

export interface LocalizedNavLabel {
  primary: string;
  secondary: string;
  badge?: string;
}

export function getNavLabels(religion: ReligionType = 'muslim'): Record<string, LocalizedNavLabel> {
  switch (religion) {
    case 'muslim':
      return {
        home: { primary: 'Home', secondary: 'Main Hub' },
        categories: { primary: 'Categories (14)', secondary: 'Subjects' },
        islamic: { primary: 'Islamic Teachings', secondary: 'Values & Duas', badge: '🕌' },
        explorer: { primary: '3D Explorer', secondary: '3D Discovery' },
        practice: { primary: 'Practice Games', secondary: 'Fun Arcade' },
        learning: { primary: 'My Learning', secondary: 'Class Lessons' },
        progress: { primary: 'Progress', secondary: 'My Report' },
        settings: { primary: 'Settings', secondary: 'Preferences' },
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

export function getGreeting(religion: ReligionType, userName: string): { text: string } {
  switch (religion) {
    case 'muslim':
      return { text: `Assalam-o-Alaikum, ${userName}! 🌟` };
    case 'sikh':
      return { text: `Sat Sri Akal, ${userName}! 🌟` };
    case 'hindu':
      return { text: `Namaste, ${userName}! 🌟` };
    default:
      return { text: `Welcome, ${userName}! 🌟` };
  }
}
