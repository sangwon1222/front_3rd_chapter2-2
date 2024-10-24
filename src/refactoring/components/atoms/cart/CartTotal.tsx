import { convertPercentage } from '@refactor/hooks/utils/discountUtil';
import { Grade } from 'src/types';

type PropsType = {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
  grade?: Grade | null;
};

export const CartTotal: React.FC<PropsType> = ({
  totalBeforeDiscount,
  totalAfterDiscount,
  totalDiscount,
  grade = null,
}) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
      <div className="space-y-1" data-testid="order-summary">
        <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
        <p className="text-green-600">
          할인 금액: {totalDiscount.toLocaleString()}원
          {grade && totalBeforeDiscount > 0
            ? ` [${grade.kor}회원]: ${convertPercentage(grade.discount)}% 등급 추가 할인 `
            : null}
        </p>
        <p className="text-xl font-bold">
          최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};
