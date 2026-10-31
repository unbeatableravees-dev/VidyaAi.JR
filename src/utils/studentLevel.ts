export type StudentContentGrade = 'Grade 1' | 'Grade 2' | 'Grade 3';

export const getStudentContentGrade = (
  gradeClass: string,
  age: number,
): StudentContentGrade => {
  const classNumber = Number(gradeClass.match(/\d+/)?.[0] ?? 0);
  const classLevel = classNumber >= 3 ? 3 : classNumber >= 2 ? 2 : 1;
  const ageLevel = age >= 10 ? 3 : age >= 7 ? 2 : 1;
  const level = Math.max(classLevel, ageLevel);

  if (level >= 3) return 'Grade 3';
  return level === 2 ? 'Grade 2' : 'Grade 1';
};
