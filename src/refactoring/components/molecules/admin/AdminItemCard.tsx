import DiscountList from '@atoms/DiscountList';
import UpdateItemForm from './UpdateItemForm';
import { useState } from 'react';

type PropsType = {
  item: ItemType;
  onProductUpdate: (item: ItemType) => void;
};

const AdminItemCard: React.FC<PropsType> = ({ item, onProductUpdate }) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [isEdit, setEditMode] = useState<boolean>(false);

  const complete = () => setEditMode((prev) => !prev);
  return (
    <>
      <button
        data-testid="toggle-button"
        onClick={() => setOpenDetail((prev) => !prev)}
        className="w-full text-left font-semibold"
      >
        {item.name} - {item.price}원 (재고: {item.stock})
      </button>

      {openDetail && (
        <>
          {isEdit && (
            <UpdateItemForm product={item} onProductUpdate={onProductUpdate} />
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
