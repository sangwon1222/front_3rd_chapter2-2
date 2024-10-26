import { LOCAL_STORAGE_GRADE_KEY } from '@refactor/constants/grade';
import { initialGrades } from '@refactor/data/grade';
import { useEffect, useState } from 'react';
import { Grade } from 'src/types';

export const useStorageGrade = () => {
  const [gradeList, setGradeList] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number>(-1);

  // 스토리지 값 설정
  useEffect(() => {
    try {
      const storageGradeList = localStorage.getItem(LOCAL_STORAGE_GRADE_KEY);
      if (storageGradeList) {
        setGradeList(JSON.parse(storageGradeList));
      } else {
        localStorage.setItem(
          LOCAL_STORAGE_GRADE_KEY,
          JSON.stringify(initialGrades)
        );
        setGradeList([...initialGrades]);
      }

      const storageMemberGrade = localStorage.getItem('memberGrade');
      if (storageMemberGrade) {
        setGradeId(JSON.parse(storageMemberGrade));
      } else {
        localStorage.setItem('memberGrade', JSON.stringify(0));
        setGradeId(0);
      }
    } catch (e) {
      throw new Error('Error accessing localStorage' + e);
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
