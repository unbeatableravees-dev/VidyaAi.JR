import { recordQuestProgress } from './streakManager';

export interface StudentProgress {
  completedLessonIds: string[];
  discoveredOrganIds: string[];
  discoveredSpaceIds: string[];
  discoveredAnimalIds: string[];
  discoveredPlantIds: string[];
  quizAttempts: number;
  examAttempts: number;
  activityCompletions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  starsEarned: number;
}

const STORAGE_PREFIX = 'vidya_student_progress_v1:';

const createEmptyProgress = (): StudentProgress => ({
  completedLessonIds: [],
  discoveredOrganIds: [],
  discoveredSpaceIds: [],
  discoveredAnimalIds: [],
  discoveredPlantIds: [],
  quizAttempts: 0,
  examAttempts: 0,
  activityCompletions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  starsEarned: 0,
});

const getStorageKey = (studentId: string | null | undefined) =>
  studentId ? `${STORAGE_PREFIX}${studentId}` : null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

export const getStudentProgress = (studentId: string | null | undefined): StudentProgress => {
  const key = getStorageKey(studentId);
  if (!key) return createEmptyProgress();

  const saved = localStorage.getItem(key);
  if (!saved) return createEmptyProgress();

  try {
    const progress: unknown = JSON.parse(saved);
    if (
      typeof progress !== 'object' ||
      progress === null ||
      !('completedLessonIds' in progress) ||
      !('discoveredOrganIds' in progress) ||
      !('quizAttempts' in progress) ||
      !('examAttempts' in progress) ||
      !('activityCompletions' in progress) ||
      !('correctAnswers' in progress) ||
      !('incorrectAnswers' in progress) ||
      !('starsEarned' in progress)
    ) {
      throw new Error('Stored student progress has an invalid shape.');
    }

    const record = progress as Record<keyof StudentProgress, unknown>;
    if (
      !isStringArray(record.completedLessonIds) ||
      !isStringArray(record.discoveredOrganIds) ||
      !isCount(record.quizAttempts) ||
      !isCount(record.examAttempts) ||
      !isCount(record.activityCompletions) ||
      !isCount(record.correctAnswers) ||
      !isCount(record.incorrectAnswers) ||
      !isCount(record.starsEarned)
    ) {
      throw new Error('Stored student progress contains invalid values.');
    }

    return {
      completedLessonIds: record.completedLessonIds,
      discoveredOrganIds: record.discoveredOrganIds,
      discoveredSpaceIds: isStringArray(record.discoveredSpaceIds) ? record.discoveredSpaceIds : [],
      discoveredAnimalIds: isStringArray(record.discoveredAnimalIds) ? record.discoveredAnimalIds : [],
      discoveredPlantIds: isStringArray(record.discoveredPlantIds) ? record.discoveredPlantIds : [],
      quizAttempts: record.quizAttempts,
      examAttempts: record.examAttempts,
      activityCompletions: record.activityCompletions,
      correctAnswers: record.correctAnswers,
      incorrectAnswers: record.incorrectAnswers,
      starsEarned: record.starsEarned,
    };
  } catch (error) {
    console.error(`Unable to read progress for student "${studentId}".`, error);
    return createEmptyProgress();
  }
};

const updateStudentProgress = (
  studentId: string | null | undefined,
  update: (progress: StudentProgress) => StudentProgress,
) => {
  const key = getStorageKey(studentId);
  if (!key) return;

  const nextProgress = update(getStudentProgress(studentId));
  localStorage.setItem(key, JSON.stringify(nextProgress));
  window.dispatchEvent(new CustomEvent('studentprogresschange', { detail: studentId }));
};

export const clearStudentProgress = (studentId: string | null | undefined) => {
  const key = getStorageKey(studentId);
  if (!key) return;
  localStorage.removeItem(key);
  window.dispatchEvent(new CustomEvent('studentprogresschange', { detail: studentId }));
};

export const setLessonCompleted = (
  studentId: string | null | undefined,
  lessonId: string,
  completed: boolean,
) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    completedLessonIds: completed
      ? [...new Set([...progress.completedLessonIds, lessonId])]
      : progress.completedLessonIds.filter((id) => id !== lessonId),
  }));
  if (completed) {
    recordQuestProgress(studentId, 'lesson', 1);
  }
};

export const recordQuizCompletion = (
  studentId: string | null | undefined,
  correctAnswers: number,
  totalQuestions: number,
) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    quizAttempts: progress.quizAttempts + 1,
    correctAnswers: progress.correctAnswers + correctAnswers,
    incorrectAnswers: progress.incorrectAnswers + totalQuestions - correctAnswers,
    starsEarned: progress.starsEarned + correctAnswers * 10,
  }));
  recordQuestProgress(studentId, 'quiz', 1);
};

export const recordExamCompletion = (
  studentId: string | null | undefined,
  correctAnswers: number,
  totalQuestions: number,
) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    examAttempts: progress.examAttempts + 1,
    correctAnswers: progress.correctAnswers + correctAnswers,
    incorrectAnswers: progress.incorrectAnswers + totalQuestions - correctAnswers,
    starsEarned: progress.starsEarned + correctAnswers,
  }));
  recordQuestProgress(studentId, 'quiz', 1);
};

export const recordActivityCompletion = (studentId: string | null | undefined) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    activityCompletions: progress.activityCompletions + 1,
    starsEarned: progress.starsEarned + 10,
  }));
  recordQuestProgress(studentId, 'practice', 1);
};

export const recordOrganDiscovery = (
  studentId: string | null | undefined,
  organId: string,
) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    discoveredOrganIds: [...new Set([...progress.discoveredOrganIds, organId])],
    starsEarned: progress.starsEarned + 10,
  }));
  recordQuestProgress(studentId, 'explorer', 1);
};

export const recordSpaceDiscovery = (
  studentId: string | null | undefined,
  spaceId: string,
) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    discoveredSpaceIds: [...new Set([...(progress.discoveredSpaceIds || []), spaceId])],
    starsEarned: progress.starsEarned + 10,
  }));
  recordQuestProgress(studentId, 'explorer', 1);
};

export const recordAnimalDiscovery = (
  studentId: string | null | undefined,
  animalId: string,
) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    discoveredAnimalIds: [...new Set([...(progress.discoveredAnimalIds || []), animalId])],
    starsEarned: progress.starsEarned + 10,
  }));
  recordQuestProgress(studentId, 'explorer', 1);
};

export const recordPlantDiscovery = (
  studentId: string | null | undefined,
  plantId: string,
) => {
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    discoveredPlantIds: [...new Set([...(progress.discoveredPlantIds || []), plantId])],
    starsEarned: progress.starsEarned + 10,
  }));
  recordQuestProgress(studentId, 'explorer', 1);
};

export const addBonusStars = (
  studentId: string | null | undefined,
  stars: number,
) => {
  if (!studentId || stars <= 0) return;
  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    starsEarned: progress.starsEarned + stars,
  }));
};

export const spendStars = (
  studentId: string | null | undefined,
  stars: number,
): boolean => {
  if (!studentId || stars <= 0) return false;
  const current = getStudentProgress(studentId);
  if (current.starsEarned < stars) return false;

  updateStudentProgress(studentId, (progress) => ({
    ...progress,
    starsEarned: Math.max(0, progress.starsEarned - stars),
  }));
  return true;
};
