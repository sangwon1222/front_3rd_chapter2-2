import UpdateItemForm from '@molecules/item/UpdateItemForm';
import DiscountList from '@atoms/DiscountList';
import { useEffect, useState } from 'react';
import { Product } from 'src/types';

type PropsType = {
  item: Product;
  onProductUpdate: (item: Product) => void;
};

const AdminItemCard: React.FC<PropsType> = ({ item, onProductUpdate }) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
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

  const updateFormData = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const complete = () => {
    if (isEdit) {
      completeModify();
    } else {
      setEditMode(true);
    }
  };

  const completeModify = () => {
    setEditMode(false);
    const { name, price, stock } = form;
    onProductUpdate({ ...item, name, price, stock });
  };

  return (
    <>
      <button
        data-testid="toggle-button"
        onClick={() => setOpenDetail((prev) => !prev)}
        className="w-full text-left font-semibold"
      >
        {item.name} - {item.price}원 (재고: {item.stock})
      </button>

      {/* 토글 상품 상세 정보 */}
      {openDetail && (
        <>
          {isEdit && (
            <UpdateItemForm formData={form} updateFormData={updateFormData} />
          )}

          <DiscountList
            product={item}
            isEdit={isEdit}
            onProductUpdate={onProductUpdate}
          />

          <button
            onClick={complete}
            data-testid={isEdit ? '' : 'modify-button'}
            className={`text-white px-2 py-1 rounded ${isEdit ? 'bg-green-500 hover:bg-green-600 mt-2' : 'bg-blue-500 hover:bg-blue-600 mt-2'}`}
          >
            {isEdit ? '수정 완료' : '수정'}
          </button>
        </>
      )}
    </>
  );
};

export default AdminItemCard;
