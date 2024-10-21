// import { useItemContext } from '@provider/item/useItemContext';
import InputWithLabel from '@atoms/InputWithLabel';
import { useState } from 'react';

// type PropsType = { id: string };

// const UpdateItemForm: React.FC<PropsType> = ({ id }) => {
// const { getItemById, updateItem } = useItemContext();
// const { name, price, stock } = getItemById(id);

type PropsType = {
  product: ItemType;
  onProductUpdate: (item: ItemType) => void;
};
const UpdateItemForm: React.FC<PropsType> = ({ product, onProductUpdate }) => {
  const [updateItem, setUpdateItem] = useState<ItemType>(product);

  const handleForm = (key: string, value: string | number) => {
    setUpdateItem((prev) => {
      onProductUpdate({ ...prev, [key]: value });
      return { ...prev, [key]: value };
    });
  };
  return (
    <div className="flex flex-col gap-4 mt-2">
      <InputWithLabel
        label="상품명"
        id="itemName"
        inputValue={updateItem.name}
        onChange={(v) => handleForm('name', v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />

      <InputWithLabel
        label="가격"
        id="productPrice"
        type="number"
        inputValue={updateItem.price}
        onChange={(v) => handleForm('price', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />

      <InputWithLabel
        label="재고"
        id="productStock"
        type="number"
        inputValue={updateItem.stock}
        onChange={(v) => handleForm('stock', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />
    </div>
  );
};

export default UpdateItemForm;
