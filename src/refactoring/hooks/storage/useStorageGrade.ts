import { initialGrades } from '@refactor/data/grade';
import { useEffect, useState } from 'react';
import { Grade } from 'src/types';

export const useStorageGrade = () => {
  const [gradeList, setGradeList] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number>(-1);

  // 스토리지 값 설정
  useEffect(() => {
    const storageGradeList = localStorage.getItem('grades');
    if (storageGradeList) {
      setGradeList(JSON.parse(storageGradeList));
    } else {
      localStorage.setItem('grades', JSON.stringify(initialGrades));
      setGradeList([...initialGrades]);
    }

    const storageMemberGrade = localStorage.getItem('memberGrade');
    if (storageMemberGrade) {
      setGradeId(JSON.parse(storageMemberGrade));
    } else {
      localStorage.setItem('memberGrade', JSON.stringify(0));
      setGradeId(0);
    }
  }, []);

  const updateGrade = (memberId: number) => {
    const gradeIndex = gradeList.findIndex(({ id }) => id === memberId);
    if (gradeIndex === -1) return;

    localStorage.setItem('memberGrade', JSON.stringify(gradeIndex));
    setGradeId(gradeIndex);
  };

  return { grade: gradeList[gradeId], gradeList, updateGrade };
};
