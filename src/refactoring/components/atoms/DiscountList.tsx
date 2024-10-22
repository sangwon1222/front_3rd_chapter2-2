import EditDiscount from './EditDiscount';
import { Product } from 'src/types';

type PropsType = {
  product: Product;
  isEdit: boolean;
  onProductUpdate: (item: Product) => void;
};

const DiscountList: React.FC<PropsType> = ({
  product,
  onProductUpdate,
  isEdit = false,
}) => {
  // 상품 할인 정보 삭제
  const handleRemoveDiscount = (index: number) => {
    product.discounts.splice(index, 1);
    onProductUpdate(product);
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>

      {product.discounts.map(({ quantity, rate }, index: number) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {quantity}개 이상 구매 시 {rate * 100}% 할인
          </span>

          {isEdit && (
            <button
              onClick={() => handleRemoveDiscount(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          )}
        </div>
      ))}

      {/* 할인 편집 */}
      {isEdit && (
        <EditDiscount product={product} onProductUpdate={onProductUpdate} />
      )}
    </div>
  );
};

export default DiscountList;
