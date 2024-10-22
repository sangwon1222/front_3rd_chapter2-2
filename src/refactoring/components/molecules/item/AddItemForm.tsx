import { InputWithLabel } from '@atoms/InputWithLabel';
import { Product } from 'src/types';

type PropsType = {
  handleAddNewItem: (params: Omit<Product, 'id' | 'discounts'>) => void;
  newProductForm: Omit<Product, 'id' | 'discounts'>;
  updateNewProductForm: (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number
  ) => void;
};

export const AddItemForm: React.FC<PropsType> = ({
  handleAddNewItem,
  newProductForm,
  updateNewProductForm,
}) => {
  const handleFormData = (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number
  ) => {
    updateNewProductForm(key, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <InputWithLabel
        label="상품명"
        id="itemName"
        inputValue={newProductForm.name}
        onChange={(v) => handleFormData('name', v)}
        inputStyle="w-full p-2 border rounded"
      />

      <InputWithLabel
        label="가격"
        id="productPrice"
        type="number"
        inputValue={newProductForm.price}
        onChange={(v) => handleFormData('price', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />

      <InputWithLabel
        label="재고"
        id="productStock"
        type="number"
        inputValue={newProductForm.stock}
        onChange={(v) => handleFormData('stock', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />
      <button
        onClick={() => handleAddNewItem(newProductForm)}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};