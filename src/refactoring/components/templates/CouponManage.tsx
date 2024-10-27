import { CouponList } from '@molecules/coupon/CouponList';
import { AddCoupon } from '@templates/admin/AddCoupon';
import { Coupon } from 'src/types';

type PropsType = {
  coupons: Coupon[];
  onCouponAdd: (coupon: Coupon) => void;
};

export const CouponManage: React.FC<PropsType> = ({ coupons, onCouponAdd }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <AddCoupon onCouponAdd={onCouponAdd} />
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <div className="space-y-2">
            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};
