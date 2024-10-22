import { ItemInCart } from '@molecules/cart/ItemInCart';
import { CartItem } from 'src/types';

type PropsType = {
  cart: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
};

export const ItemListInCart: React.FC<PropsType> = ({
  cart,
  updateQuantity,
  removeFromCart,
}) => {
  return (
    <>
      {cart.map((itemInCart) => {
        return (
          <div
            key={itemInCart.product.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <ItemInCart
              item={itemInCart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
        );
      })}
    </>
  );
};
