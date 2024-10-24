import { useEffect, useState } from 'react';
import { Grade } from 'src/types';

export const useApiGrade = () => {
  const [gradeList, setGradeList] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number>(-1);

  useEffect(() => {
    fetch('/api/grades')
      .then((response) => response.json())
      .then((data: Grade[]) => setGradeList(data));

    fetch('/api/get-member-grade')
      .then((response) => response.json())
      .then(({ id }: { id: number }) => setGradeId(id));
  }, []);

  const updateGrade = (memberId: number) => {
    const gradeIndex = gradeList.findIndex(({ id }) => id === memberId);
    if (gradeIndex === -1) return;

    fetch('/api/update-member-grade', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: gradeIndex }),
    })
      .then((response) => response.json())
      .then(({ id }: { id: number }) => setGradeId(id));

    setGradeId(gradeIndex);
  };

  return { grade: gradeList[gradeId], gradeList, updateGrade };
};
