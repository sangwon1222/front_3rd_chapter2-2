import { Grade } from 'src/types';

export const initialGrades: Readonly<Grade[]> = Object.freeze([
  { id: 0, grade: 'normal', kor: '일반', discount: 0.03 },
  { id: 1, grade: 'silver', kor: '실버', discount: 0.05 },
  { id: 2, grade: 'gold', kor: '골드', discount: 0.07 },
  { id: 3, grade: 'VIP', kor: 'VIP', discount: 0.1 },
]);

export const initGrade: Readonly<Grade> = Object.freeze({
  id: 0,
  grade: 'normal',
  kor: '일반',
  discount: 0.03,
});
