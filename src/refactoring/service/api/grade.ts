import { Grade } from 'src/types';

export const fetchGrades = async (): Promise<Grade[]> => {
  const response = await fetch('/api/grades');
  return response.json();
};

export const fetchMemberGrade = async (): Promise<{ id: number }> => {
  const response = await fetch('/api/get-member-grade');
  return response.json();
};

export const updateMemberGrade = async (
  gradeIndex: number
): Promise<{ id: number }> => {
  const response = await fetch('/api/update-member-grade', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: gradeIndex }),
  });
  return response.json();
};
