import ItemList from '@templates/item/ItemList';
import AddItem from '@templates/item/AddItem';
import { Product } from 'src/types';

type PropsType = {
  products: Product[];
  onProductAdd: (item: Product) => void;
  onProductUpdate: (item: Product) => void;
};

const ItemManage: React.FC<PropsType> = ({
  products,
  onProductAdd,
  onProductUpdate,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      {/* 새 상품 추가 */}
      <AddItem onProductAdd={onProductAdd} />

      {/* 상품 아코디언 리스트 */}
      <div className="space-y-2">
        <ItemList products={products} onProductUpdate={onProductUpdate} />
      </div>
    </div>
  );
};

export default ItemManage;
