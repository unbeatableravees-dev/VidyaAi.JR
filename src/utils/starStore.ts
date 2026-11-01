import { getStudentProgress, spendStars } from './studentProgress';

export type StoreCategory = 'character' | 'accessory' | 'theme';

export interface StoreItem {
  id: string;
  name: string;
  category: StoreCategory;
  emoji: string;
  cost: number;
  tagline: string;
  gradient: string;
  badge?: string;
}

export const STORE_CHARACTERS: StoreItem[] = [
  {
    id: 'hero-spiderman',
    name: 'Spider Super Kid',
    category: 'character',
    emoji: '🦸‍♂️',
    cost: 100,
    tagline: 'Web-slinging courage & heroic agility',
    gradient: 'from-red-500 via-rose-600 to-blue-700',
    badge: 'Popular 🔥',
  },
  {
    id: 'hero-astronaut',
    name: 'Cosmic Astronaut',
    category: 'character',
    emoji: '🚀',
    cost: 120,
    tagline: 'Zero-gravity spacesuit & galaxy cruiser',
    gradient: 'from-blue-600 via-indigo-600 to-purple-800',
    badge: 'Sci-Fi 🪐',
  },
  {
    id: 'hero-ninja',
    name: 'Shadow Ninja',
    category: 'character',
    emoji: '🥷',
    cost: 140,
    tagline: 'Laser focus, lightning speed & ancient martial skills',
    gradient: 'from-slate-700 via-slate-800 to-black',
    badge: 'Legend ⚡',
  },
  {
    id: 'hero-fairy',
    name: 'Starlight Fairy Princess',
    category: 'character',
    emoji: '🧚‍♀️',
    cost: 110,
    tagline: 'Sparkling glitter wings & kindness spells',
    gradient: 'from-pink-400 via-purple-400 to-indigo-500',
    badge: 'Magical ✨',
  },
  {
    id: 'hero-dino',
    name: 'Rexy Dino King',
    category: 'character',
    emoji: '🦖',
    cost: 90,
    tagline: 'Mighty prehistoric guardian with a roaring heart',
    gradient: 'from-emerald-500 via-green-600 to-teal-800',
  },
  {
    id: 'hero-robot',
    name: 'Cyber Bot 3000',
    category: 'character',
    emoji: '🤖',
    cost: 130,
    tagline: 'Futuristic AI brain with neon scanning eyes',
    gradient: 'from-cyan-500 via-sky-600 to-blue-800',
    badge: 'Tech 🧠',
  },
  {
    id: 'hero-safari',
    name: 'Brave Simba Lion',
    category: 'character',
    emoji: '🦁',
    cost: 90,
    tagline: 'Courageous king of the wild African savanna',
    gradient: 'from-amber-500 via-orange-600 to-yellow-600',
  },
  {
    id: 'hero-detective',
    name: 'Super Sleuth Detective',
    category: 'character',
    emoji: '🕵️‍♂️',
    cost: 100,
    tagline: 'Magnifying glass & master of mysteries and riddles',
    gradient: 'from-amber-700 via-stone-700 to-stone-900',
  },
  {
    id: 'hero-unicorn',
    name: 'Rainbow Sparkle Unicorn',
    category: 'character',
    emoji: '🦄',
    cost: 150,
    tagline: 'Golden magic horn & rainbow galloping trail',
    gradient: 'from-fuchsia-400 via-pink-400 to-rose-400',
    badge: 'Royal 👑',
  },
  {
    id: 'hero-wizard',
    name: 'Mystic Arch-Mage',
    category: 'character',
    emoji: '🧙‍♂️',
    cost: 120,
    tagline: 'Ancient scrolls, star potions & glowing spells',
    gradient: 'from-violet-600 via-purple-700 to-indigo-900',
  },
];

export const STORE_ACCESSORIES: StoreItem[] = [
  {
    id: 'acc-crown',
    name: 'Royal Golden Crown',
    category: 'accessory',
    emoji: '👑',
    cost: 60,
    tagline: 'Fit for the ruler of all knowledge',
    gradient: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'acc-shades',
    name: 'Neon Laser Shades',
    category: 'accessory',
    emoji: '🕶️',
    cost: 40,
    tagline: 'Super cool ultraviolet look',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    id: 'acc-wand',
    name: 'Star Magic Wand',
    category: 'accessory',
    emoji: '🪄',
    cost: 50,
    tagline: 'Cast sparkling spells while studying',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    id: 'acc-trophy',
    name: 'Champion Trophy Cup',
    category: 'accessory',
    emoji: '🏆',
    cost: 70,
    tagline: 'Gleaming proof of your quiz victories',
    gradient: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'acc-cape',
    name: 'Crimson Hero Cape',
    category: 'accessory',
    emoji: '🦸',
    cost: 60,
    tagline: 'Flutters in the learning wind',
    gradient: 'from-rose-500 to-red-700',
  },
  {
    id: 'acc-dragon',
    name: 'Baby Dragon Pal',
    category: 'accessory',
    emoji: '🐲',
    cost: 90,
    tagline: 'Breathes harmless sparks and guards your books',
    gradient: 'from-emerald-400 to-teal-600',
  },
];

export const STORE_THEMES: StoreItem[] = [
  {
    id: 'theme-default',
    name: 'Vidya Royal Blue',
    category: 'theme',
    emoji: '💎',
    cost: 0,
    tagline: 'The classic polished royal blue experience',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'theme-cosmic',
    name: 'Cosmic Galaxy Realm',
    category: 'theme',
    emoji: '🌌',
    cost: 80,
    tagline: 'Deep starlight purples and neon cosmic nebula',
    gradient: 'from-purple-900 via-indigo-900 to-slate-950',
  },
  {
    id: 'theme-candy',
    name: 'Sweet Candy Kingdom',
    category: 'theme',
    emoji: '🍭',
    cost: 60,
    tagline: 'Cotton candy pastels, strawberry pink & lavender joy',
    gradient: 'from-pink-500 via-rose-400 to-purple-500',
  },
  {
    id: 'theme-jungle',
    name: 'Rainforest Safari',
    category: 'theme',
    emoji: '🌿',
    cost: 60,
    tagline: 'Deep emerald jungle foliage and golden leaves',
    gradient: 'from-emerald-700 via-green-600 to-teal-800',
  },
  {
    id: 'theme-sunshine',
    name: 'Golden Sunshine',
    category: 'theme',
    emoji: '☀️',
    cost: 50,
    tagline: 'Warm sunny glow, amber warmth and morning energy',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
  },
];

export const ALL_STORE_ITEMS: StoreItem[] = [
  ...STORE_CHARACTERS,
  ...STORE_ACCESSORIES,
  ...STORE_THEMES,
];

export interface StudentStoreData {
  unlockedItemIds: string[];
  equippedCharacterId: string | null;
  equippedAccessoryId: string | null;
  equippedThemeId: string;
}

const STORAGE_PREFIX = 'vidya_student_store_v1:';

export const getStudentStoreData = (studentId: string | null | undefined): StudentStoreData => {
  const defaultData: StudentStoreData = {
    unlockedItemIds: ['theme-default'],
    equippedCharacterId: null,
    equippedAccessoryId: null,
    equippedThemeId: 'theme-default',
  };

  if (!studentId) return defaultData;
  const key = `${STORAGE_PREFIX}${studentId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return defaultData;

  try {
    const parsed = JSON.parse(saved);
    return {
      unlockedItemIds: Array.isArray(parsed.unlockedItemIds) ? parsed.unlockedItemIds : ['theme-default'],
      equippedCharacterId: parsed.equippedCharacterId || null,
      equippedAccessoryId: parsed.equippedAccessoryId || null,
      equippedThemeId: parsed.equippedThemeId || 'theme-default',
    };
  } catch {
    return defaultData;
  }
};

export const buyStoreItem = (
  studentId: string | null | undefined,
  itemId: string
): { success: boolean; message: string } => {
  if (!studentId) return { success: false, message: 'No active student selected.' };
  const item = ALL_STORE_ITEMS.find((i) => i.id === itemId);
  if (!item) return { success: false, message: 'Item not found in Bazaar.' };

  const storeData = getStudentStoreData(studentId);
  if (storeData.unlockedItemIds.includes(itemId)) {
    return { success: false, message: 'Item already unlocked!' };
  }

  const progress = getStudentProgress(studentId);
  if (progress.starsEarned < item.cost) {
    return {
      success: false,
      message: `You need ${item.cost - progress.starsEarned} more ⭐ to unlock this!`,
    };
  }

  // Deduct stars
  const spent = spendStars(studentId, item.cost);
  if (!spent) return { success: false, message: 'Star deduction failed.' };

  // Save unlock
  const nextData: StudentStoreData = {
    ...storeData,
    unlockedItemIds: [...storeData.unlockedItemIds, itemId],
  };

  const key = `${STORAGE_PREFIX}${studentId}`;
  localStorage.setItem(key, JSON.stringify(nextData));
  window.dispatchEvent(new CustomEvent('studentstorechange', { detail: studentId }));

  return { success: true, message: `Unlocked ${item.name}! 🎉` };
};

export const equipStoreItem = (
  studentId: string | null | undefined,
  itemId: string | null,
  category: StoreCategory
) => {
  if (!studentId) return;
  const storeData = getStudentStoreData(studentId);
  const key = `${STORAGE_PREFIX}${studentId}`;

  const nextData: StudentStoreData = {
    ...storeData,
    equippedCharacterId: category === 'character' ? itemId : storeData.equippedCharacterId,
    equippedAccessoryId: category === 'accessory' ? itemId : storeData.equippedAccessoryId,
    equippedThemeId: category === 'theme' ? (itemId || 'theme-default') : storeData.equippedThemeId,
  };

  localStorage.setItem(key, JSON.stringify(nextData));

  // If theme changed, apply theme class to document
  if (category === 'theme' && itemId) {
    localStorage.setItem('vidya_app_theme', itemId);
    document.documentElement.setAttribute('data-theme', itemId);
  }

  window.dispatchEvent(new CustomEvent('studentstorechange', { detail: studentId }));
};
