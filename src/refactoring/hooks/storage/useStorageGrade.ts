import {
  LOCAL_STORAGE_GRADE_KEY,
  LOCAL_STORAGE_MEMBER_GRADE_KEY,
} from '@refactor/constants/grade';
import { initialGrades } from '@refactor/data/grade';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@refactor/service/localStorage/storageService';
import { useEffect, useState } from 'react';
import { Grade } from 'src/types';
import { findIndexById } from '../utils/findIndexById';

export const useStorageGrade = () => {
  const [gradeList, setGradeList] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number>(-1);

  // 스토리지 값 설정
  useEffect(() => {
    try {
      const storageGradeList = getLocalStorageItem(
        LOCAL_STORAGE_GRADE_KEY,
        initialGrades
      );
      setGradeList(storageGradeList);

      const storageMemberGrade = getLocalStorageItem(
        LOCAL_STORAGE_MEMBER_GRADE_KEY,
        0
      );
      setGradeId(storageMemberGrade);
    } catch (e) {
      throw new Error('Error accessing localStorage' + e);
    }
  }, []);

  const updateGrade = (memberId: number) => {
    const gradeIndex = findIndexById(gradeList, memberId);
    if (gradeIndex === -1) return;

    setLocalStorageItem(LOCAL_STORAGE_MEMBER_GRADE_KEY, gradeIndex);
    setGradeId(gradeIndex);
  };

  return { grade: gradeList[gradeId], gradeList, updateGrade };
};
