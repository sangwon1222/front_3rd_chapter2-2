import { AddItemForm } from '@molecules/item/AddItemForm';
import { Product } from 'src/types';
import { useState } from 'react';
import { useProductForm } from '@refactor/hooks/useProductForm';

type PropsType = { onProductAdd: (item: Product) => void };

export const AddItem: React.FC<PropsType> = ({ onProductAdd }) => {
  const [isEditing, setEditMode] = useState<boolean>(false);
  const { productForm, updateProductForm, resetProductForm } = useProductForm({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleAddNewItem = ({
    name,
    price,
    stock,
  }: Omit<Product, 'id' | 'discounts'>) => {
    onProductAdd({ id: name, name, price, stock, discounts: [] });
    setEditMode(false);
    resetProductForm();
  };

  return (
    <>
      <button
        onClick={() => setEditMode((prev) => !prev)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {isEditing ? '취소' : '새 상품 추가'}
      </button>

      {isEditing && (
        <div className="p-4 mb-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          <AddItemForm
            handleAddNewItem={handleAddNewItem}
            productForm={productForm}
            updateProductForm={updateProductForm}
          />
        </div>
      )}
    </>
  );
};
