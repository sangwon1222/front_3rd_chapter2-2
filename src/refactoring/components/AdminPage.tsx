import CouponManage from '@templates/CouponManage';
import ItemManage from '@templates/ItemManage';
import { Coupon, Product } from 'src/types';

type PropsType = {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (item: Product) => void;
  onProductAdd: (item: Product) => void;
  onCouponAdd: (coupon: Coupon) => void;
};

export const AdminPage: React.FC<PropsType> = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 관리 */}
        <ItemManage
          products={products}
          onProductAdd={onProductAdd}
          onProductUpdate={onProductUpdate}
        />

        {/* 쿠폰 관리 */}
        <CouponManage coupons={coupons} onCouponAdd={onCouponAdd} />
      </div>
    </div>
  );
};
