import { Discount } from 'src/types';
import {
  convertPercentage,
  getMaxDiscount,
} from '@refactor/hooks/utils/discountUtil';

type PropsType = {
  stock: number;
  discounts: Discount[];
};

export const StockNDiscount: React.FC<PropsType> = ({ stock, discounts }) => {
  const hasDiscounts = discounts.length > 0;
  return (
    <>
      <div className="text-sm text-gray-500 mb-2">
        <span
          className={`font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}
        >
          재고: {stock}개
        </span>

        {/* 최대 할인 */}
        {hasDiscounts && (
          <span className="ml-2 font-medium text-blue-600">
            최대 {convertPercentage(getMaxDiscount(discounts))}% 할인
          </span>
        )}
      </div>

      {/* 할인 리스트 */}
      {hasDiscounts && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {discounts.map(({ quantity, rate }, index) => (
            <li key={`${index}th-${quantity}-${rate}-discount`}>
              {`${quantity}개 이상: ${convertPercentage(rate)}`}% 할인
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
