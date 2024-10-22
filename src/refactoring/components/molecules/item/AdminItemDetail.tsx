import { DiscountList } from '@atoms/discount/DiscountList';
import { UpdateItemForm } from './UpdateItemForm';
import { useEffect, useState } from 'react';
import { Product } from 'src/types';

type PropsType = { item: Product; onProductUpdate: (item: Product) => void };

export const AdminItemDetail: React.FC<PropsType> = ({
  item,
  onProductUpdate,
}) => {
  const [isEdit, setEditMode] = useState<boolean>(false);
  const [form, setFormData] = useState<{
    name: string;
    price: number;
    stock: number;
  }>({ name: '', price: 0, stock: 0 });

  useEffect(() => {
    const { name, price, stock } = item;
    setFormData({ name, price, stock });
  }, [item]);

  //   form 입력 시 업데이트
  const updateFormData = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  //   수정완료
  const completeModify = () => {
    setEditMode(false);
    const { name, price, stock } = form;
    onProductUpdate({ ...item, name, price, stock });
  };

  return (
    <>
      {isEdit && (
        <UpdateItemForm formData={form} updateFormData={updateFormData} />
      )}

      <DiscountList
        product={item}
        isEdit={isEdit}
        onProductUpdate={onProductUpdate}
      />

      {isEdit ? (
        <button
          onClick={completeModify}
          className="text-white px-2 py-1 rounded bg-green-500 hover:bg-green-600 mt-2"
        >
          수정 완료
        </button>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          data-testid="modify-button"
          className="text-white px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 mt-2"
        >
          수정
        </button>
      )}
    </>
  );
};
