import {
  fetchGrades,
  fetchMemberGrade,
  updateMemberGrade,
} from '@refactor/service/api/grade';
import { useEffect, useState } from 'react';
import { Grade } from 'src/types';
import { findIndexById } from '../utils/findIndexById';

export const useApiGrade = () => {
  const [gradeList, setGradeList] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number>(-1);

  useEffect(() => {
    fetchGrades().then(setGradeList);
    fetchMemberGrade().then(({ id }) => setGradeId(id));
  }, []);

  const updateGrade = async (memberId: number) => {
    const gradeIndex = findIndexById(gradeList, memberId);
    if (gradeIndex === -1) return;

    const { id } = await updateMemberGrade(gradeIndex);
    setGradeId(id);
  };

  return { grade: gradeList[gradeId], gradeList, updateGrade };
};
