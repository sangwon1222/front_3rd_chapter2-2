import { useState } from 'react';
import { Grade } from 'src/types';
import { findIndexById } from './utils/findIndexById';

export const useGrade = (initialGrade?: Grade[]) => {
  const [gradeList, _setGradeList] = useState<Grade[]>(() =>
    initialGrade ? initialGrade : []
  );
  const [gradeId, setGradeId] = useState<number>(0);

  const updateGrade = (memberId: number) => {
    const gradeIndex = findIndexById(gradeList, memberId);
    if (gradeIndex === -1) return;
    setGradeId(gradeIndex);
  };

  return { grade: gradeList[gradeId], gradeList, updateGrade };
};
