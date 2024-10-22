import { initDiscount } from '@refactor/data/item';
import { CustomInput } from '@atoms/CustomInput';
import { useState } from 'react';
import { Discount, Product } from 'src/types';

type PropsType = {
  product: Product;
  onProductUpdate: (item: Product) => void;
};

export const EditDiscount: React.FC<PropsType> = ({
  product,
  onProductUpdate,
}) => {
  const [newDiscount, setNewDiscount] = useState<Discount>(initDiscount);

  // 상품 할인 정보 추가
  const handleAddDiscount = () => {
    const newProduct = { ...product };
    newProduct.discounts.push(newDiscount);
    onProductUpdate(newProduct);

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
