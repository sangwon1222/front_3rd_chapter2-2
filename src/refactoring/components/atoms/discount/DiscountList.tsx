import { EditDiscount } from './EditDiscount';
import { Discount } from 'src/types';

type PropsType = {
  isEdit: boolean;
  discounts: Discount[];
  addDiscount: (newDiscount: Discount) => void;
  removeDiscount: (index: number) => void;
};

export const DiscountList: React.FC<PropsType> = ({
  isEdit = false,
  discounts,
  addDiscount,
  removeDiscount,
}) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>

      {discounts.map(({ quantity, rate }, index: number) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {quantity}개 이상 구매 시 {rate * 100}% 할인
          </span>

          {isEdit && (
            <button
              onClick={() => removeDiscount(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          )}
        </div>
      ))}

      {/* 할인 편집 */}
      {isEdit && <EditDiscount addDiscount={addDiscount} />}
    </div>
  );
};
