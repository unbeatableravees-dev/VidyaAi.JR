import { getStudentProgress } from './studentProgress';

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  icon: string;
  targetCount: number;
  currentCount: number;
  starReward: number;
  completed: boolean;
  claimed: boolean;
}

export interface StudentStreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalDaysActive: number;
  streakFreezeAvailable: number;
  todayQuests: DailyQuest[];
  allQuestsClaimedToday: boolean;
}

const STORAGE_PREFIX = 'vidya_student_streak_v1:';

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getYesterdayDateString = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateDailyQuests = (dateStr: string): DailyQuest[] => {
  return [
    {
      id: `quest_quiz_${dateStr}`,
      title: 'Quiz Master 🎯',
      description: 'Score points in any subject quiz',
      icon: '🎯',
      targetCount: 1,
      currentCount: 0,
      starReward: 20,
      completed: false,
      claimed: false,
    },
    {
      id: `quest_explorer_${dateStr}`,
      title: 'Cosmic & Nature Explorer 🪐',
      description: 'Explore any planet, animal, or organ in 3D Explorer',
      icon: '🪐',
      targetCount: 1,
      currentCount: 0,
      starReward: 15,
      completed: false,
      claimed: false,
    },
    {
      id: `quest_practice_${dateStr}`,
      title: 'Practice & Tracing Star ✍️',
      description: 'Complete a tracing activity or math tables round',
      icon: '✍️',
      targetCount: 1,
      currentCount: 0,
      starReward: 15,
      completed: false,
      claimed: false,
    },
    {
      id: `quest_lesson_${dateStr}`,
      title: 'Curious Scholar 📖',
      description: 'Watch or read any curriculum lesson',
      icon: '📖',
      targetCount: 1,
      currentCount: 0,
      starReward: 20,
      completed: false,
      claimed: false,
    },
  ];
};

export const getStudentStreakData = (studentId: string | null | undefined): StudentStreakData => {
  const defaultData: StudentStreakData = {
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: getTodayDateString(),
    totalDaysActive: 1,
    streakFreezeAvailable: 1,
    todayQuests: generateDailyQuests(getTodayDateString()),
    allQuestsClaimedToday: false,
  };

  if (!studentId) return defaultData;

  const key = `${STORAGE_PREFIX}${studentId}`;
  const saved = localStorage.getItem(key);
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  if (!saved) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    const data: StudentStreakData = JSON.parse(saved);
    // Check if new day
    if (data.lastActiveDate !== today) {
      let newStreak = data.currentStreak;
      let freezes = data.streakFreezeAvailable;

      if (data.lastActiveDate === yesterday) {
        // Continuous streak maintained!
        newStreak += 1;
      } else {
        // Day was missed
        if (freezes > 0) {
          // Used a freeze
          freezes -= 1;
        } else {
          newStreak = 1;
        }
      }

      const updated: StudentStreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(data.longestStreak || 1, newStreak),
        lastActiveDate: today,
        totalDaysActive: (data.totalDaysActive || 1) + 1,
        streakFreezeAvailable: freezes,
        todayQuests: generateDailyQuests(today),
        allQuestsClaimedToday: false,
      };
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    }

    // Ensure quests for today are present
    if (!data.todayQuests || data.todayQuests.length === 0 || !data.todayQuests[0].id.includes(today)) {
      data.todayQuests = generateDailyQuests(today);
      localStorage.setItem(key, JSON.stringify(data));
    }

    return data;
  } catch {
    return defaultData;
  }
};

export const recordQuestProgress = (
  studentId: string | null | undefined,
  type: 'quiz' | 'explorer' | 'practice' | 'lesson',
  amount = 1
) => {
  if (!studentId) return;
  const key = `${STORAGE_PREFIX}${studentId}`;
  const data = getStudentStreakData(studentId);

  let updated = false;
  const newQuests = data.todayQuests.map((q) => {
    if (q.id.includes(`_${type}_`)) {
      const newCount = Math.min(q.targetCount, q.currentCount + amount);
      const isCompleted = newCount >= q.targetCount;
      if (newCount !== q.currentCount || isCompleted !== q.completed) {
        updated = true;
        return {
          ...q,
          currentCount: newCount,
          completed: isCompleted,
        };
      }
    }
    return q;
  });

  if (updated) {
    const nextData: StudentStreakData = {
      ...data,
      todayQuests: newQuests,
    };
    localStorage.setItem(key, JSON.stringify(nextData));
    window.dispatchEvent(new CustomEvent('studentstreakchange', { detail: studentId }));
  }
};

export const claimQuestReward = (
  studentId: string | null | undefined,
  questId: string,
  onRewardStars: (stars: number) => void
): boolean => {
  if (!studentId) return false;
  const key = `${STORAGE_PREFIX}${studentId}`;
  const data = getStudentStreakData(studentId);

  let rewarded = false;
  let rewardAmount = 0;

  const newQuests = data.todayQuests.map((q) => {
    if (q.id === questId && q.completed && !q.claimed) {
      rewarded = true;
      rewardAmount = q.starReward;
      return { ...q, claimed: true };
    }
    return q;
  });

  if (rewarded) {
    const allClaimed = newQuests.every((q) => q.claimed);
    const nextData: StudentStreakData = {
      ...data,
      todayQuests: newQuests,
      allQuestsClaimedToday: allClaimed,
    };
    localStorage.setItem(key, JSON.stringify(nextData));
    onRewardStars(rewardAmount);
    window.dispatchEvent(new CustomEvent('studentstreakchange', { detail: studentId }));
    return true;
  }

  return false;
};
