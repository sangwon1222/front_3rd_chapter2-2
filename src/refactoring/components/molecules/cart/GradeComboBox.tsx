import { ComboBox } from '@atoms/ComboBox';
import { Grade } from 'src/types';

type PropsType = {
  gradeList: Grade[];
  grade: Grade;
  updateGrade: (memberId: number) => void;
};

export const GradeComboBox: React.FC<PropsType> = ({
  grade,
  gradeList,
  updateGrade,
}) => {
  const optionList = gradeList.map(({ id, kor }) => ({
    label: kor,
    value: id,
  }));
  const handleChange = (value: string) => updateGrade(parseInt(value));

  return (
    <ComboBox
      id="grade-combo-box"
      data-testid="grade-combo-box"
      style="w-full p-4 rounded my-6"
      onChange={handleChange}
      initialValue={grade.id}
      options={optionList}
    />
  );
};
