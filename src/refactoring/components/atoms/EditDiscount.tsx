// import { useItemContext } from '@provider/item/useItemContext';
import { initDiscount } from '@refactor/data/item';
import CustomInput from '@atoms/CustomInput';
import { useState } from 'react';

type PropsType = {
  product: ItemType;
  onProductUpdate: (item: ItemType) => void;
};

const EditDiscount: React.FC<PropsType> = ({ product, onProductUpdate }) => {
  const [newDiscount, setNewDiscount] = useState<DiscountType>(initDiscount);

  // 상품 할인 정보 추가
  const handleAddDiscount = () => {
    product.discounts.push(newDiscount);
    onProductUpdate(product);
    setNewDiscount(initDiscount);
  };

  // 할인 개수 편집
  const handleQty = (v: string) => {
    setNewDiscount((prev) => ({ ...prev, quantity: parseInt(v) }));
  };

  // 할인율 편집
  const handleRate = (v: string) => {
    setNewDiscount((prev) => ({ ...prev, rate: parseInt(v) / 100 }));
  };

  return (
    <div className="flex space-x-2">
      <CustomInput
        type="number"
        placeholder="수량"
        inputValue={newDiscount.quantity}
        onChange={handleQty}
        inputStyle="w-1/3 p-2 border rounded"
      />
      <CustomInput
        type="number"
        placeholder="할인율 (%)"
        inputValue={newDiscount.rate * 100}
        onChange={handleRate}
        inputStyle="w-1/3 p-2 border rounded"
      />
      <button
        onClick={handleAddDiscount}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  );
};

export default EditDiscount;
