import AddItemForm from '@molecules/admin/AddItemForm';
import useNewItem from '@hooks/useNewItem';
import { useState } from 'react';
import { Product } from 'src/types';

type PropsType = { onProductAdd: (item: Product) => void };

const AddItem: React.FC<PropsType> = ({ onProductAdd }) => {
  const [isEditing, setEditMode] = useState<boolean>(false);
  const { getNewItem, resetNewItem } = useNewItem;

  const handleAddNewItem = () => {
    const data = getNewItem();
    onProductAdd({ id: data.name, ...data });

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
