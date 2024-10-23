import { StockNDiscount } from '@atoms/item/StockNDiscount';
import { CartItem, Product } from 'src/types';
import { useEffect } from 'react';
import { useStock } from '@refactor/hooks/useStock';

type PropsType = {
  item: Product;
  cart: CartItem[];
  addToCart: (newProduct: Product) => void;
};

export const CartItemCard: React.FC<PropsType> = ({
  item,
  cart,
  addToCart,
}) => {
  const { name, price } = item;
  const { stock, updateStock } = useStock(0);

  useEffect(() => updateStock(cart, item), [cart]);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-600">{price.toLocaleString()}원</span>
      </div>

      {/* 재고 & 할인 정보 */}
      <StockNDiscount stock={stock} discounts={item.discounts} />

      {stock > 0 ? (
        <button
          onClick={() => addToCart(item)}
          className="w-full px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          장바구니에 추가
        </button>
      ) : (
        <button
          className="w-full px-3 py-1 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
          disabled
        >
          품절
        </button>
      )}
    </>
  );
};
