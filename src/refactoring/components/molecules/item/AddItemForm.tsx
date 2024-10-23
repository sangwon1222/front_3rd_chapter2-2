import { InputWithLabel } from '@atoms/InputWithLabel';
import { Product } from 'src/types';

type PropsType = {
  handleAddNewItem: (params: Omit<Product, 'id' | 'discounts'>) => void;
  productForm: Omit<Product, 'id' | 'discounts'>;
  updateProductForm: (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number
  ) => void;
};

export const AddItemForm: React.FC<PropsType> = ({
  handleAddNewItem,
  productForm,
  updateProductForm,
}) => {
  const handleFormData = (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number
  ) => {
    updateProductForm(key, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <InputWithLabel
        label="상품명"
        id="itemName"
        inputValue={productForm.name}
        onChange={(v) => handleFormData('name', v)}
        inputStyle="w-full p-2 border rounded"
      />

      <InputWithLabel
        label="가격"
        id="productPrice"
        type="number"
        inputValue={productForm.price}
        onChange={(v) => handleFormData('price', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />

      <InputWithLabel
        label="재고"
        id="productStock"
        type="number"
        inputValue={productForm.stock}
        onChange={(v) => handleFormData('stock', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />
      <button
        onClick={() => handleAddNewItem(productForm)}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
