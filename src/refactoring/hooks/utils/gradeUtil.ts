import { Grade } from 'src/types';

// 쿠폰 적용한 값 return
export const getApplyGradePrice = (total: number, grade: Grade) => {
  const { discount } = grade;
  return total * (1 - discount);
};
