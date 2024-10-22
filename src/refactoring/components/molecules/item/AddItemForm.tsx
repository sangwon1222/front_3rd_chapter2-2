import InputWithLabel from '@atoms/InputWithLabel';
import { Product } from 'src/types';
import { useState } from 'react';

type PropsType = {
  handleAddNewItem: (params: Omit<Product, 'id' | 'discounts'>) => void;
};

const AddItemForm: React.FC<PropsType> = ({ handleAddNewItem }) => {
  const [form, setFormData] = useState({ name: '', price: 0, stock: 0 });

  const handleFromData = (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-2">
      <InputWithLabel
        label="상품명"
        id="itemName"
        inputValue={form.name}
        onChange={(v) => handleFromData('name', v)}
        inputStyle="w-full p-2 border rounded"
      />

      <InputWithLabel
        label="가격"
        id="productPrice"
        type="number"
        inputValue={form.price}
        onChange={(v) => handleFromData('price', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />

      <InputWithLabel
        label="재고"
        id="productStock"
        type="number"
        inputValue={form.stock}
        onChange={(v) => handleFromData('stock', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />
      <button
        onClick={() => handleAddNewItem(form)}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};

export default AddItemForm;
