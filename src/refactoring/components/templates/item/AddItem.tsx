// import { useItemContext } from '@provider/item/useItemContext';
import AddItemForm from '@molecules/admin/AddItemForm';
import useNewItem from '@hooks/useNewItem';
import { useState } from 'react';

// type PropsType = { products: ItemType; onProductAdd: (item: ItemType) => void };
type PropsType = { onProductAdd: (item: ItemType) => void };

const AddItem: React.FC<PropsType> = ({ onProductAdd }) => {
  const [isEditing, setEditMode] = useState<boolean>(false);
  const { getNewItem, resetNewItem } = useNewItem;
  // const { addItem } = useItemContext();

  const handleAddNewItem = () => {
    const data = getNewItem();
    // addItem(data);
    onProductAdd(data);

    resetNewItem();
    setEditMode(false);
  };

  const setEditItemMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={() => setEditItemMode()}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {isEditing ? '취소' : '새 상품 추가'}
      </button>

      {isEditing && (
        <div className="p-4 mb-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          <AddItemForm handleAddNewItem={handleAddNewItem} />
        </div>
      )}
    </>
  );
};

export default AddItem;
