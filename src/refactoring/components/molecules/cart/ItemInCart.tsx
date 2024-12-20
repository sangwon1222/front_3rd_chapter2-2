import { getMaxApplicableDiscount } from '@refactor/hooks/utils/cartUtils';
import { convertPercentage } from '@refactor/hooks/utils/discountUtil';
import { useEffect, useState } from 'react';
import { CartItem } from 'src/types';

type PropsType = {
  item: CartItem;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
};

export const ItemInCart: React.FC<PropsType> = ({
  item,
  updateQuantity,
  removeFromCart,
}) => {
  const { product, quantity } = item;
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  useEffect(
    () => setAppliedDiscount(() => getMaxApplicableDiscount(item)),
    [quantity]
  );

  return (
    <>
      <div>
        <span className="font-semibold">{product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {product.price}원 x {quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              {convertPercentage(appliedDiscount)}% 할인
            </span>
          )}
        </span>
      </div>
      <div>
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          disabled={quantity <= 0}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
          disabled={product.stock === quantity}
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </>
  );
};
