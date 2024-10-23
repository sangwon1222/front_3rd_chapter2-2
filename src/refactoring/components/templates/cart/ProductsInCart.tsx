import { ItemInCart } from '@refactor/components/molecules/cart/ItemInCart';
import { CartItem } from 'src/types';

type PropsType = {
  cart: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
};

export const ProductsInCart: React.FC<PropsType> = ({
  cart,
  updateQuantity,
  removeFromCart,
}) => {
  return (
    <>
      {cart.map((cartItem) => {
        return (
          <div
            key={cartItem.product.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <ItemInCart
              item={cartItem}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
        );
      })}
    </>
  );
};
