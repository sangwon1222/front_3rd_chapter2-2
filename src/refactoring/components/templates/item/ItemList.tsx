import { AdminItemCard } from '@templates/item/AdminItemCard';
import { Product } from 'src/types';

type PropsType = {
  products: Product[];
  onProductUpdate: (item: Product) => void;
};

export const ItemList: React.FC<PropsType> = ({
  products,
  onProductUpdate,
}) => {
  return (
    <>
      {products.map((item: Product, index: number) => (
        <div
          key={item.id}
          data-testid={`product-${index + 1}`}
          className="bg-white p-4 rounded shadow flex flex-col gap-4"
        >
          {/* 아코디언 상품 */}
          <AdminItemCard item={item} onProductUpdate={onProductUpdate} />
        </div>
      ))}
    </>
  );
};
