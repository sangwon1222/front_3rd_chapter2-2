import { useDiscountForm } from '@refactor/hooks/useDiscountFrom';
import { initDiscount } from '@refactor/data/item';
import { CustomInput } from '@atoms/CustomInput';
import { Discount } from 'src/types';

type PropsType = {
  addDiscount: (newDiscount: Discount) => void;
};

export const EditDiscount: React.FC<PropsType> = ({ addDiscount }) => {
  // 할인 입력 Form hook
  const { discountForm, updateDiscountForm, resetDiscountForm } =
    useDiscountForm({ ...initDiscount });

  // 상품 할인 정보 추가
  const handleAddDiscount = () => {
    addDiscount(discountForm);
    resetDiscountForm();
  };

  // 할인 개수 편집
  const handleQty = (v: string) => updateDiscountForm('quantity', parseInt(v));

  // 할인율 편집
  const handleRate = (v: string) => {
    updateDiscountForm('rate', parseInt(v) / 100);
  };

  return (
    <div className="flex space-x-2">
      <CustomInput
        type="number"
        placeholder="수량"
        inputValue={discountForm.quantity}
        onChange={handleQty}
        inputStyle="w-1/3 p-2 border rounded"
      />
      <CustomInput
        type="number"
        placeholder="할인율 (%)"
        inputValue={discountForm.rate * 100}
        onChange={handleRate}
        inputStyle="w-1/3 p-2 border rounded"
      />
      <button
        onClick={handleAddDiscount}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  );
};
