import InputWithLabel from '@atoms/InputWithLabel';
import useNewItem from '@hooks/useNewItem';

type PropsType = {
  handleAddNewItem: () => void;
};
const AddItemForm: React.FC<PropsType> = ({ handleAddNewItem }) => {
  const { getNewItem, setNewItem } = useNewItem;
  const { name, price, stock } = getNewItem();

  return (
    <div className="flex flex-col gap-2">
      <InputWithLabel
        label="상품명"
        id="itemName"
        inputValue={name}
        onChange={(v) => setNewItem('name', v)}
        inputStyle="w-full p-2 border rounded"
      />

      <InputWithLabel
        label="가격"
        id="productPrice"
        type="number"
        inputValue={price}
        onChange={(v) => setNewItem('price', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />

      <InputWithLabel
        label="재고"
        id="productStock"
        type="number"
        inputValue={stock}
        onChange={(v) => setNewItem('stock', +v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block text-sm font-medium text-gray-700"
      />
      <button
        onClick={handleAddNewItem}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};

export default AddItemForm;
