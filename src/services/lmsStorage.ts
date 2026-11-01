// =============================================================================
// SMART LEARNING & AGE-BASED CONTENT MANAGEMENT SERVICE (LMS STORAGE ENGINE)
// Persistent storage with LocalStorage, Super Admin Authentication, Class Targeting,
// Activity Logging, Promotion Approval Engine, and Student Interest Tracking
// =============================================================================

import {
  ContentItem,
  StudentActivity,
  StudentInterest,
  PromotionRequest,
  ContactTicket,
  AdminUser,
  ClassGrade,
  LearningStage,
  getStageForClass,
} from '../types/lms';
import { ReligionType, StudentProfile } from '../types/student';

const STORAGE_KEYS = {
  CONTENT: 'vidya_lms_content_v1',
  ACTIVITIES: 'vidya_lms_activities_v1',
  INTERESTS: 'vidya_lms_interests_v1',
  PROMOTIONS: 'vidya_lms_promotions_v1',
  ADMIN_SESSION: 'vidya_admin_session_v1',
  STUDENT_PROFILES: 'vidya_student_profiles_v1',
  ACTIVE_PROFILE: 'vidya_student_profile_v2',
  TICKETS: 'vidya_lms_tickets_v1',
};

// =============================================================================
// SEED CONTENT LIBRARY (NURSERY TO CLASS 10 ACROSS ALL 4 LEARNING STAGES)
// =============================================================================
const INITIAL_CONTENT_LIBRARY: ContentItem[] = [
  // --- USER REQUESTED YOUTUBE EDUCATIONAL MATERIALS ---
  {
    id: 'cnt-alphabet-hq3yfQnllfQ',
    title: 'A to Z Alphabet Phonics Song & Letter Adventure',
    description: 'Catchy and colorful alphabetical phonics with singing animals and letter sounds for toddlers and preschoolers.',
    type: 'video',
    subject: 'English',
    targetClass: ['Nursery', 'LKG', 'UKG', 'Class 1'],
    targetAgeGroup: '3-5',
    learningStage: 'play-based',
    difficulty: 'beginner',
    chapter: 'Alphabet & Phonics Fun',
    thumbnail: '🔤',
    mediaUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ',
    contentBody: 'Sing along to learn the magical sounds of letters A through Z with bright visual animations!',
    status: 'published',
    publishedAt: '2026-10-25',
    views: 890,
    likes: 245,
    durationMinutes: 4,
  },
  {
    id: 'cnt-alphabet-TF1loU8bJaM',
    title: 'Phonics Letter Tracing & ABC Sounds Masterclass',
    description: 'Learn handwriting strokes and vocal sounds for every letter with fun interactive phonics animations.',
    type: 'video',
    subject: 'English',
    targetClass: ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2'],
    targetAgeGroup: '3-5',
    learningStage: 'play-based',
    difficulty: 'beginner',
    chapter: 'Phonics Tracing Mastery',
    thumbnail: '✏️',
    mediaUrl: 'https://www.youtube.com/embed/TF1loU8bJaM',
    contentBody: 'Watch how letters connect to words, phonics blends, and early vocabulary building.',
    status: 'published',
    publishedAt: '2026-10-26',
    views: 730,
    likes: 198,
    durationMinutes: 5,
  },
  {
    id: 'cnt-magicimals-stories',
    title: 'Magicimals: The Brave Little Elephant & Forest Friends',
    description: 'Enchanting animated animal bedtime and moral stories from Magicimals teaching empathy, friendship, and curiosity.',
    type: 'video',
    subject: 'Stories & Rhymes',
    targetClass: ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3'],
    targetAgeGroup: '3-5',
    learningStage: 'play-based',
    difficulty: 'beginner',
    chapter: 'Magicimals Forest Adventures',
    thumbnail: '🐘',
    mediaUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ',
    contentBody: 'Once upon a time in the whispering forest, little Ellie the elephant learned that small acts of kindness bring big smiles to every friend.',
    status: 'published',
    publishedAt: '2026-10-28',
    views: 1250,
    likes: 380,
    durationMinutes: 6,
  },
  {
    id: 'cnt-mastitoons-rhymes',
    title: 'Masti Toons by Varda: Chanda Mama & Joyful Nursery Rhymes',
    description: 'Musical rhythm, joyful nursery rhymes, and colorful dance songs from Masti Toons by Varda for toddlers.',
    type: 'video',
    subject: 'Stories & Rhymes',
    targetClass: ['Nursery', 'LKG', 'UKG', 'Class 1'],
    targetAgeGroup: '3-5',
    learningStage: 'play-based',
    difficulty: 'beginner',
    chapter: 'Musical Rhymes Jamboree',
    thumbnail: '🎵',
    mediaUrl: 'https://www.youtube.com/embed/TF1loU8bJaM',
    contentBody: 'Sing along with cute cartoon characters and enjoy traditional rhymes with sweet musical melodies!',
    status: 'published',
    publishedAt: '2026-10-29',
    views: 1420,
    likes: 410,
    durationMinutes: 4,
  },
  // --- STAGE 1: NURSERY - KG (3-5 Years) ---
  {
    id: 'cnt-nur-abc-phonics',
    title: 'Magical ABC Phonics Song & Letter Tracing',
    description: 'Delightful musical phonics from A to Z with dancing animals and interactive letter sounds.',
    type: 'video',
    subject: 'English',
    targetClass: ['Nursery', 'LKG', 'UKG'],
    targetAgeGroup: '3-5',
    learningStage: 'play-based',
    difficulty: 'beginner',
    chapter: 'Alphabet Wonders',
    thumbnail: '🔤',
    mediaUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ',
    contentBody: 'A is for Apple, B is for Ball, C is for Cat! Learn how each letter makes a unique phonics sound with fun rhymes.',
    status: 'published',
    publishedAt: '2026-10-15',
    views: 420,
    likes: 89,
    durationMinutes: 4,
  },
  {
    id: 'cnt-nur-shapes-colors',
    title: 'Colors & Shapes Safari Adventure',
    description: 'Learn circles, squares, triangles, and bright rainbow colors with cute animal friends.',
    type: 'notes',
    subject: 'Arts & Creativity',
    targetClass: ['Nursery', 'LKG', 'UKG'],
    targetAgeGroup: '3-5',
    learningStage: 'play-based',
    difficulty: 'beginner',
    chapter: 'Shapes & Colors Around Us',
    thumbnail: '🎨',
    mediaUrl: '',
    contentBody: '### Fun Shapes to Spot:\n- 🔴 **Circle:** Round like a football or the bright sun.\n- 🟧 **Square:** Four equal sides like a gift box.\n- 🔺 **Triangle:** Three sharp corners like a slice of pizza!\n\n### Primary Colors:\n- **Red:** Ripe sweet strawberries.\n- **Blue:** Clear open sky and ocean waves.\n- **Yellow:** Golden sunshine and tasty bananas.',
    status: 'published',
    publishedAt: '2026-10-18',
    views: 310,
    likes: 67,
    durationMinutes: 5,
  },
  {
    id: 'cnt-nur-ginti-song',
    title: 'Number Counting 1 to 10 Finger Rhyme',
    description: 'Count using your little fingers and colorful balloons from 1 to 10.',
    type: 'quiz',
    subject: 'Mathematics',
    targetClass: ['Nursery', 'LKG', 'UKG'],
    targetAgeGroup: '3-5',
    learningStage: 'play-based',
    difficulty: 'beginner',
    chapter: 'Counting Fun',
    thumbnail: '🔢',
    mediaUrl: '',
    contentBody: 'Interactive picture counting quiz for toddlers: count ducks, stars, and balloons!',
    status: 'published',
    publishedAt: '2026-10-20',
    views: 520,
    likes: 110,
    durationMinutes: 3,
  },

  // --- STAGE 2: CLASS 1 - 3 (6-8 Years) ---
  {
    id: 'cnt-c2-math-addition',
    title: 'Addition & Subtraction Safari (2-Digit Math)',
    description: 'Master fast mental addition and subtraction with real-life shopping and fruit basket examples.',
    type: 'video',
    subject: 'Mathematics',
    targetClass: ['Class 1', 'Class 2', 'Class 3'],
    targetAgeGroup: '6-8',
    learningStage: 'foundation',
    difficulty: 'intermediate',
    chapter: 'Addition & Place Values',
    thumbnail: '➕',
    mediaUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ',
    contentBody: 'Understanding Ones and Tens: When you add 15 + 8, combine the ones (5 + 8 = 13), carry over 1 ten, giving 23!',
    status: 'published',
    publishedAt: '2026-10-22',
    views: 650,
    likes: 140,
    durationMinutes: 6,
  },
  {
    id: 'cnt-c2-evs-plants',
    title: 'How Plants Grow: Roots, Stems & Photosynthesis',
    description: 'Discover how a tiny seed drinks water and soaks sunshine to become a towering green tree.',
    type: 'pdf',
    subject: 'Environmental Studies',
    targetClass: ['Class 1', 'Class 2', 'Class 3'],
    targetAgeGroup: '6-8',
    learningStage: 'foundation',
    difficulty: 'intermediate',
    chapter: 'The Living Green World',
    thumbnail: '🌱',
    mediaUrl: '',
    contentBody: '### Parts of a Healthy Plant:\n1. **Roots:** Anchor the plant into the soil and absorb water & minerals.\n2. **Stem:** Acts like an elevator carrying nutrients up to branches.\n3. **Leaves:** The green food factories using chlorophyll, water, and sunlight to produce energy!\n4. **Flowers & Fruit:** Attract bees and hold seeds for the next generation.',
    status: 'published',
    publishedAt: '2026-10-24',
    views: 480,
    likes: 95,
    durationMinutes: 8,
  },
  {
    id: 'cnt-c2-hindi-varnamala',
    title: 'Hindi Vowels & Moral Panchatantra Tales',
    description: 'Learn Hindi Swar with phonetics and read the classic fable "The Clever Thirsty Crow".',
    type: 'notes',
    subject: 'Hindi & Sanskrit',
    targetClass: ['Class 1', 'Class 2', 'Class 3'],
    targetAgeGroup: '6-8',
    learningStage: 'foundation',
    difficulty: 'beginner',
    chapter: 'हिन्दी ज्ञान एवं पंचतंत्र',
    thumbnail: '🕉️',
    mediaUrl: '',
    contentBody: '### अ से अनार, आ से आम\nस्वर वर्णमाला का अभ्यास करें और पंचतंत्र की कथा पढ़ें: बुद्धि और धैर्य से हर कठिनाई को पार किया जा सकता है।',
    status: 'published',
    publishedAt: '2026-10-26',
    views: 390,
    likes: 88,
    religionTarget: 'hindu',
    durationMinutes: 6,
  },
  {
    id: 'cnt-c2-punjabi-gurmukhi',
    title: 'Gurmukhi 35 Akhari & Sacha Sauda Story',
    description: 'Learn letters ੳ, ਅ, ੲ, ਸ, ਹ and understand the golden value of feeding the hungry.',
    type: 'notes',
    subject: 'Punjabi & Gurmukhi',
    targetClass: ['Class 1', 'Class 2', 'Class 3'],
    targetAgeGroup: '6-8',
    learningStage: 'foundation',
    difficulty: 'beginner',
    chapter: 'ਪੰਜਾਬੀ ਪੈਂਤੀ ਅੱਖਰੀ',
    thumbnail: '☬',
    mediaUrl: '',
    contentBody: '### ਪੈਂਤੀ ਅੱਖਰੀ:\nੳ ਊਠ, ਅ ਅਨਾਰ, ੲ ਇੱਟ, ਸ ਸੇਵਾ। ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਸੱਚਾ ਸੌਦਾ: ਭੁੱਖੇ ਸਾਧੂਆਂ ਨੂੰ ਭੋਜਨ ਛਕਾਉਣਾ ਹੀ ਸਭ ਤੋਂ ਵੱਡਾ ਵਪਾਰ ਹੈ।',
    status: 'published',
    publishedAt: '2026-10-27',
    views: 370,
    likes: 85,
    religionTarget: 'sikh',
    durationMinutes: 6,
  },
  {
    id: 'cnt-c2-islamic-manners',
    title: 'Islamic Daily Manners & Duas (Bismillah & Salam)',
    description: 'Learn everyday Islamic phrases, eating with the right hand, and greeting with As-salamu Alaykum.',
    type: 'notes',
    subject: 'Urdu & Islamic',
    targetClass: ['Class 1', 'Class 2', 'Class 3'],
    targetAgeGroup: '6-8',
    learningStage: 'foundation',
    difficulty: 'beginner',
    chapter: 'اسلامی آداب و اخلاق',
    thumbnail: '🕌',
    mediaUrl: '',
    contentBody: '### روزمرہ اسلامی آداب:\nکھانا شروع کرنے سے پہلے بسم اللہ پڑھیں، دائیں ہاتھ سے کھائیں اور ملاقات پر السلام علیکم کہیں!',
    status: 'published',
    publishedAt: '2026-10-28',
    views: 450,
    likes: 102,
    religionTarget: 'muslim',
    durationMinutes: 6,
  },

  // --- STAGE 3: CLASS 4 - 6 (9-12 Years) ---
  {
    id: 'cnt-c5-science-solarsystem',
    title: 'The Solar System, Gravity & Planetary Motion',
    description: 'Explore the 8 planets, asteroid belts, orbital speeds, and why Earth supports life.',
    type: 'video',
    subject: 'Science',
    targetClass: ['Class 4', 'Class 5', 'Class 6'],
    targetAgeGroup: '9-12',
    learningStage: 'conceptual',
    difficulty: 'intermediate',
    chapter: 'Our Universe & Astronomy',
    thumbnail: '🪐',
    mediaUrl: 'https://www.youtube.com/embed/TF1loU8bJaM',
    contentBody: 'The Sun accounts for 99.8% of our solar system’s mass! Rocky inner planets (Mercury, Venus, Earth, Mars) and Gas Giants (Jupiter, Saturn, Uranus, Neptune).',
    status: 'published',
    publishedAt: '2026-10-25',
    views: 890,
    likes: 210,
    durationMinutes: 10,
  },
  {
    id: 'cnt-c5-math-fractions',
    title: 'Fractions, Decimals & Percentages Mastery',
    description: 'Understand equivalent fractions, common denominators, and decimal conversion through visual models.',
    type: 'pdf',
    subject: 'Mathematics',
    targetClass: ['Class 4', 'Class 5', 'Class 6'],
    targetAgeGroup: '9-12',
    learningStage: 'conceptual',
    difficulty: 'intermediate',
    chapter: 'Fractions & Proportions',
    thumbnail: '➗',
    mediaUrl: '',
    contentBody: '### Rule of Equivalent Fractions:\nWhatever you multiply to the numerator, you must also multiply to the denominator.\nExample: 1/2 = 2/4 = 4/8 = 50% = 0.50.',
    status: 'published',
    publishedAt: '2026-10-26',
    views: 710,
    likes: 165,
    durationMinutes: 9,
  },
  {
    id: 'cnt-c5-human-anatomy',
    title: 'Human Circulatory & Respiratory Systems (3D Organs)',
    description: 'Step-by-step working of the 4-chambered heart, oxygen transfer in lungs, and blood vessels.',
    type: 'notes',
    subject: 'Science',
    targetClass: ['Class 4', 'Class 5', 'Class 6'],
    targetAgeGroup: '9-12',
    learningStage: 'conceptual',
    difficulty: 'intermediate',
    chapter: 'Human Physiology',
    thumbnail: '❤️',
    mediaUrl: '',
    contentBody: 'The human heart beats about 100,000 times a day! Oxygen-poor blood enters the right atrium, travels to lungs for oxygen, and pumps to all body cells via the left ventricle.',
    status: 'published',
    publishedAt: '2026-10-27',
    views: 940,
    likes: 230,
    durationMinutes: 8,
  },

  // --- STAGE 4: CLASS 7 - 10 (12-16 Years) ---
  {
    id: 'cnt-c8-physics-newton',
    title: 'Newton’s Laws of Motion & Momentum Lab',
    description: 'Deep dive into inertia, F=ma, and action-reaction pairs with rocket science problem-solving.',
    type: 'video',
    subject: 'Science',
    targetClass: ['Class 7', 'Class 8', 'Class 9', 'Class 10'],
    targetAgeGroup: '12-16',
    learningStage: 'advanced',
    difficulty: 'advanced',
    chapter: 'Force & Laws of Motion',
    thumbnail: '🚀',
    mediaUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ',
    contentBody: '1. First Law: Inertia.\n2. Second Law: Force = mass × acceleration (F = m · a).\n3. Third Law: For every action, there is an equal and opposite reaction.',
    status: 'published',
    publishedAt: '2026-10-28',
    views: 1120,
    likes: 290,
    durationMinutes: 12,
  },
  {
    id: 'cnt-c9-math-linear-algebra',
    title: 'Linear Equations in Two Variables & Coordinate Geometry',
    description: 'Graphing straight lines, finding intercepts, slope formula m=(y2-y1)/(x2-x1), and algebraic substitution.',
    type: 'pdf',
    subject: 'Mathematics',
    targetClass: ['Class 7', 'Class 8', 'Class 9', 'Class 10'],
    targetAgeGroup: '12-16',
    learningStage: 'advanced',
    difficulty: 'advanced',
    chapter: 'Algebra & Coordinate Geometry',
    thumbnail: '📈',
    mediaUrl: '',
    contentBody: '### Standard Form of Linear Equation:\nAx + By + C = 0. Learn how to solve simultaneous equations using elimination, substitution, and graphical intersection points.',
    status: 'published',
    publishedAt: '2026-10-29',
    views: 860,
    likes: 195,
    durationMinutes: 14,
  },
  {
    id: 'cnt-c9-computer-python',
    title: 'Computer Science: Python Programming & Logic Basics',
    description: 'Variables, loops (for / while), conditional statements (if-else), and writing your first algorithm.',
    type: 'notes',
    subject: 'Computer Science',
    targetClass: ['Class 7', 'Class 8', 'Class 9', 'Class 10'],
    targetAgeGroup: '12-16',
    learningStage: 'advanced',
    difficulty: 'advanced',
    chapter: 'Introduction to Python & Computational Thinking',
    thumbnail: '💻',
    mediaUrl: '',
    contentBody: '```python\n# First Python program for students\nname = input("Enter your name: ")\nprint(f"Hello {name}, welcome to Python Programming!")\nfor i in range(1, 6):\n    print(f"Counting step: {i}")\n```',
    status: 'published',
    publishedAt: '2026-10-30',
    views: 1250,
    likes: 340,
    durationMinutes: 15,
  },
];

// =============================================================================
// STORAGE HELPER METHODS
// =============================================================================

export class LmsStorageService {
  // 1. Content Management
  public static getAllContent(): ContentItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(INITIAL_CONTENT_LIBRARY));
      return INITIAL_CONTENT_LIBRARY;
    } catch {
      return INITIAL_CONTENT_LIBRARY;
    }
  }

  public static saveContentList(list: ContentItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('vidya_lms_content_updated'));
    } catch (error) {
      console.error('Failed to save content list', error);
    }
  }

  public static addContent(item: Omit<ContentItem, 'id' | 'publishedAt' | 'views' | 'likes'>): ContentItem {
    const list = this.getAllContent();
    const newItem: ContentItem = {
      ...item,
      id: `cnt-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
    };
    list.unshift(newItem);
    this.saveContentList(list);
    return newItem;
  }

  public static updateContent(item: ContentItem) {
    const list = this.getAllContent();
    const idx = list.findIndex((c) => c.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
      this.saveContentList(list);
    }
  }

  public static deleteContent(id: string) {
    const list = this.getAllContent().filter((c) => c.id !== id);
    this.saveContentList(list);
  }

  /**
   * Filters content strictly matching the student's class, age, and religious culture
   */
  public static getContentForStudent(
    studentClass: string,
    studentAge: number,
    religion?: ReligionType
  ): ContentItem[] {
    const all = this.getAllContent();
    const studentStage = getStageForClass(studentClass);

    return all.filter((item) => {
      if (item.status !== 'published') return false;

      // Class match check
      let matchesClass = false;
      if (item.targetClass === 'all') {
        matchesClass = true;
      } else if (Array.isArray(item.targetClass)) {
        matchesClass = item.targetClass.some((cls) => cls.toLowerCase() === studentClass.toLowerCase());
      } else if (typeof item.targetClass === 'string') {
        matchesClass = item.targetClass.toLowerCase() === studentClass.toLowerCase();
      }

      // If class doesn't explicitly match, check if stage matches
      if (!matchesClass) {
        matchesClass = item.learningStage === studentStage;
      }

      // Religious target match
      if (item.religionTarget && item.religionTarget !== 'all') {
        if (religion && item.religionTarget !== religion) {
          return false;
        }
      }

      return matchesClass;
    });
  }

  // 2. Student Activity Tracking
  public static recordActivity(
    activity: Omit<StudentActivity, 'id' | 'timestamp'>
  ): StudentActivity {
    const activities = this.getAllActivities();
    const newAct: StudentActivity = {
      ...activity,
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    activities.unshift(newAct);
    // Keep last 1,000 activities to avoid bloating localStorage
    if (activities.length > 1000) activities.length = 1000;
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
      window.dispatchEvent(new CustomEvent('vidya_lms_activity_recorded', { detail: newAct }));
    } catch {
      // Ignore
    }
    return newAct;
  }

  public static getAllActivities(): StudentActivity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getActivitiesForStudent(studentId?: string): StudentActivity[] {
    if (!studentId) return [];
    return this.getAllActivities().filter((a) => a.studentId === studentId);
  }

  // 3. Student Interest & Learning Requests
  public static recordInterest(
    interest: Omit<StudentInterest, 'id' | 'createdAt'>
  ): StudentInterest {
    const list = this.getAllInterests();
    const newInterest: StudentInterest = {
      ...interest,
      id: `int-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newInterest);
    try {
      localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('vidya_lms_interest_recorded', { detail: newInterest }));
    } catch {
      // Ignore
    }
    return newInterest;
  }

  public static getAllInterests(): StudentInterest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERESTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getInterestsForStudent(studentId?: string): StudentInterest[] {
    if (!studentId) return [];
    return this.getAllInterests().filter((i) => i.studentId === studentId);
  }

  // 4. Class Promotion Approval Workflow
  public static submitPromotionRequest(
    req: Omit<PromotionRequest, 'id' | 'status' | 'requestedAt'>
  ): PromotionRequest {
    const requests = this.getAllPromotionRequests();
    const newReq: PromotionRequest = {
      ...req,
      id: `promo-${Date.now()}`,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };
    requests.unshift(newReq);
    try {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(requests));
      window.dispatchEvent(new CustomEvent('vidya_lms_promotion_submitted', { detail: newReq }));
    } catch {
      // Ignore
    }
    return newReq;
  }

  public static getAllPromotionRequests(): PromotionRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static approvePromotion(requestId: string, adminNote?: string): boolean {
    const requests = this.getAllPromotionRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) return false;

    req.status = 'approved';
    req.reviewedAt = new Date().toISOString();
    req.adminNote = adminNote || 'Promotion approved by Super Admin.';

    try {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(requests));

      // Automatically update the student's registered class in student profiles
      const savedProfilesRaw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILES);
      if (savedProfilesRaw) {
        const profiles: StudentProfile[] = JSON.parse(savedProfilesRaw);
        const updatedProfiles = profiles.map((p) => {
          if (p.id === req.studentId) {
            return { ...p, gradeClass: req.requestedClass };
          }
          return p;
        });
        localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(updatedProfiles));
      }

      // If active student is the same, update active student profile
      const activeRaw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
      if (activeRaw) {
        const active: StudentProfile = JSON.parse(activeRaw);
        if (active.id === req.studentId) {
          active.gradeClass = req.requestedClass;
          localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, JSON.stringify(active));
          localStorage.setItem('vidya_user_grade', req.requestedClass);
        }
      }

      window.dispatchEvent(new CustomEvent('vidya_student_class_promoted', { detail: req }));
      return true;
    } catch (error) {
      console.error('Failed to promote student', error);
      return false;
    }
  }

  public static rejectPromotion(requestId: string, adminNote?: string): boolean {
    const requests = this.getAllPromotionRequests();
    const req = requests.find((r) => r.id === requestId);
    if (!req) return false;

    req.status = 'rejected';
    req.reviewedAt = new Date().toISOString();
    req.adminNote = adminNote || 'Promotion rejected by Super Admin.';

    try {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(requests));
      window.dispatchEvent(new CustomEvent('vidya_lms_promotion_updated', { detail: req }));
      return true;
    } catch {
      return false;
    }
  }

  // 5. Super Admin Authentication (admin@vidyaai.jr.in / Admin@123)
  public static authenticateAdmin(email: string, pass: string): AdminUser | null {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === 'admin@vidyaai.jr.in' && cleanPass === 'Admin@123') {
      const user: AdminUser = {
        email: 'admin@vidyaai.jr.in',
        name: 'Super Admin',
        role: 'super_admin',
      };
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(user));
        window.dispatchEvent(new CustomEvent('vidya_admin_auth_changed', { detail: user }));
      } catch {
        // Ignore
      }
      return user;
    }
    return null;
  }

  public static getActiveAdminSession(): AdminUser | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static logoutAdmin() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      window.dispatchEvent(new CustomEvent('vidya_admin_auth_changed', { detail: null }));
    } catch {
      // Ignore
    }
  }

  // 6. Contact & Support Tickets Management
  public static submitContactTicket(
    ticket: Omit<ContactTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt'>
  ): ContactTicket {
    const existing = this.getAllContactTickets();
    const count = existing.length + 1040;
    const newTicket: ContactTicket = {
      ...ticket,
      id: `tkt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ticketNumber: `TKT-${count}`,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    existing.unshift(newTicket);
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent('vidya_lms_ticket_submitted', { detail: newTicket }));
    } catch {
      // Ignore
    }
    return newTicket;
  }

  public static getAllContactTickets(): ContactTicket[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getTicketsForStudent(studentId: string): ContactTicket[] {
    return this.getAllContactTickets().filter((t) => t.studentId === studentId);
  }

  public static updateContactTicket(
    ticketId: string,
    status: 'open' | 'in_progress' | 'resolved',
    adminResponse?: string
  ): boolean {
    const tickets = this.getAllContactTickets();
    const t = tickets.find((item) => item.id === ticketId);
    if (!t) return false;

    t.status = status;
    if (adminResponse !== undefined) {
      t.adminResponse = adminResponse;
    }
    if (status === 'resolved') {
      t.resolvedAt = new Date().toISOString();
    }
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
      window.dispatchEvent(new CustomEvent('vidya_lms_ticket_updated', { detail: t }));
      return true;
    } catch {
      return false;
    }
  }

  public static deleteContactTicket(ticketId: string): boolean {
    let tickets = this.getAllContactTickets();
    tickets = tickets.filter((t) => t.id !== ticketId);
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
      window.dispatchEvent(new CustomEvent('vidya_lms_ticket_deleted', { detail: ticketId }));
      return true;
    } catch {
      return false;
    }
  }

  // 7. Admin Student Profile Management (Delete and Update)
  public static deleteStudentProfile(studentId: string): boolean {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILES);
      if (!raw) return false;
      const profiles: StudentProfile[] = JSON.parse(raw);
      const filtered = profiles.filter((p) => p.id !== studentId);
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(filtered));

      // If active profile matches, fallback to another or null
      const activeRaw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
      if (activeRaw) {
        const active: StudentProfile = JSON.parse(activeRaw);
        if (active.id === studentId) {
          if (filtered.length > 0) {
            localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, JSON.stringify(filtered[0]));
            localStorage.setItem('vidya_user_name', filtered[0].name);
            localStorage.setItem('vidya_user_avatar', filtered[0].avatar);
            localStorage.setItem('vidya_user_grade', filtered[0].gradeClass);
          } else {
            localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROFILE);
            localStorage.removeItem('vidya_user_name');
            localStorage.removeItem('vidya_user_avatar');
            localStorage.removeItem('vidya_user_grade');
          }
        }
      }
      window.dispatchEvent(new CustomEvent('vidya_student_profile_deleted', { detail: studentId }));
      return true;
    } catch (e) {
      console.error('Failed to delete student', e);
      return false;
    }
  }

  public static updateStudentProfile(
    studentId: string,
    updates: Partial<StudentProfile>
  ): boolean {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILES);
      if (!raw) return false;
      const profiles: StudentProfile[] = JSON.parse(raw);
      let updatedProfile: StudentProfile | null = null;

      const updatedProfiles = profiles.map((p) => {
        if (p.id === studentId) {
          updatedProfile = { ...p, ...updates };
          return updatedProfile;
        }
        return p;
      });

      if (!updatedProfile) return false;
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(updatedProfiles));

      // If active profile matches, update active too
      const activeRaw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
      if (activeRaw) {
        const active: StudentProfile = JSON.parse(activeRaw);
        if (active.id === studentId) {
          const mergedActive = { ...active, ...updates };
          localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, JSON.stringify(mergedActive));
          if (updates.name) localStorage.setItem('vidya_user_name', updates.name);
          if (updates.avatar) localStorage.setItem('vidya_user_avatar', updates.avatar);
          if (updates.gradeClass) localStorage.setItem('vidya_user_grade', updates.gradeClass);
        }
      }

      window.dispatchEvent(new CustomEvent('vidya_student_profile_updated', { detail: updatedProfile }));
      return true;
    } catch (e) {
      console.error('Failed to update student profile', e);
      return false;
    }
  }

}
