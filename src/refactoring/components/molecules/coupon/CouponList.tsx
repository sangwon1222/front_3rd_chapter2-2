import { formatCouponLabel } from '@refactor/hooks/utils/couponUtil';
import { Coupon } from 'src/types';

type PropsType = { coupons: Coupon[] };

export const CouponList: React.FC<PropsType> = ({ coupons }) => {
  return (
    <>
      {coupons.map(({ name, code, discountType, discountValue }, index) => (
        <div
          key={index}
          data-testid={`coupon-${index + 1}`}
          className="bg-gray-100 p-2 rounded"
        >
          {`${name} (${code}):${formatCouponLabel(discountType, discountValue)} `}
          할인
        </div>
      ))}
    </>
  );
};
