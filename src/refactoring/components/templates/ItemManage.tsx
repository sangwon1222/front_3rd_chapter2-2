import ItemList from '@templates/item/ItemList';
import AddItem from '@templates/item/AddItem';

type PropsType = {
  products: ItemType[];
  onProductAdd: (item: ItemType) => void;
  onProductUpdate: (item: ItemType) => void;
};

const ItemManage: React.FC<PropsType> = ({
  products,
  onProductAdd,
  onProductUpdate,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <AddItem onProductAdd={onProductAdd} />
      <div className="space-y-2">
        <ItemList products={products} onProductUpdate={onProductUpdate} />
      </div>
    </div>
  );
};

export default ItemManage;
