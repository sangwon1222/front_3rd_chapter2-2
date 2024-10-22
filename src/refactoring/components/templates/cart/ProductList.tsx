import { UserItemCard } from '@molecules/item/UserItemCard';
import { CartItem, Product } from 'src/types';

type PropsType = {
  products: Product[];
  cart: CartItem[];
  addToCart: (newProduct: Product) => void;
};

export const ProductList: React.FC<PropsType> = ({
  products,
  cart,
  addToCart,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((item) => {
          const { id } = item;
          return (
            <div
              key={id}
              data-testid={`product-${id}`}
              className="bg-white p-3 rounded shadow"
            >
              <UserItemCard item={item} cart={cart} addToCart={addToCart} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
