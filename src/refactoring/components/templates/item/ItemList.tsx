import AdminItemCard from '@refactor/components/molecules/admin/AdminItemCard';

type PropsType = {
  products: ItemType[];
  onProductUpdate: (item: ItemType) => void;
};

const ItemList: React.FC<PropsType> = ({ products, onProductUpdate }) => {
  return (
    <>
      {products.map((item: ItemType, index: number) => (
        <div
          key={item.id}
          data-testid={`product-${index + 1}`}
          className="bg-white p-4 rounded shadow flex flex-col gap-4"
        >
          <AdminItemCard item={item} onProductUpdate={onProductUpdate} />
        </div>
      ))}
    </>
  );
};

export default ItemList;
