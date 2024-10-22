import { AdminItemDetail } from '@molecules/item/AdminItemDetail';
import { Product } from 'src/types';
import { useState } from 'react';

type PropsType = {
  item: Product;
  onProductUpdate: (item: Product) => void;
};

export const AdminItemCard: React.FC<PropsType> = ({
  item,
  onProductUpdate,
}) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

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
        <AdminItemDetail item={item} onProductUpdate={onProductUpdate} />
      )}
    </>
  );
};
