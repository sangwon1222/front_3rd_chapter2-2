import { useState } from 'react';
import { Grade } from 'src/types';

export const useGrade = (initialGrade?: Grade[]) => {
  const [gradeList, _setGradeList] = useState<Grade[]>(() =>
    initialGrade ? initialGrade : []
  );
  const [gradeId, setGradeId] = useState<number>(0);

  const updateGrade = (memberId: number) => {
    const gradeIndex = gradeList.findIndex(({ id }) => id === memberId);
    if (gradeIndex === -1) return;
    setGradeId(gradeIndex);
  };

  return { grade: gradeList[gradeId], gradeList, updateGrade };
};