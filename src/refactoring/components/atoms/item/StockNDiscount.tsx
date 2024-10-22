import { getRemainingStock } from '@refactor/hooks/utils/cartUtils';
import { CartItem, Product } from 'src/types';
import { useEffect, useState } from 'react';
import {
  convertPercentage,
  getMaxDiscount,
} from '@refactor/hooks/utils/discountUtil';

type PropsType = {
  item: Product;
  cart: CartItem[];
};

export const StockNDiscount: React.FC<PropsType> = ({ cart, item }) => {
  const [remainingStock, setRemainingStock] = useState(0);
  const { discounts } = item;

  useEffect(() => setRemainingStock(getRemainingStock(cart, item)), [cart]);

  return (
    <>
      <div className="text-sm text-gray-500 mb-2">
        <span
          className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}
        >
          재고: {remainingStock}개
        </span>

        {/* 최대 할인 */}
        {discounts.length > 0 && (
          <span className="ml-2 font-medium text-blue-600">
            최대 {convertPercentage(getMaxDiscount(discounts))}% 할인
          </span>
        )}
      </div>

      {/* 할인 정보 리스트 */}
      {discounts.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {discounts.map(({ quantity, rate }, index) => (
            <li key={index}>
              {`${quantity}개 이상: ${convertPercentage(rate)}`}% 할인
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
