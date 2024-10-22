import { Coupon } from 'src/types';

type PropsType = { coupon: Coupon };

export const ApplyCouponLabel: React.FC<PropsType> = ({ coupon }) => {
  const { name, discountType, discountValue } = coupon;
  return (
    <p className="text-green-600">
      적용된 쿠폰: {name}(
      {discountType === 'amount' ? `${discountValue}원 ` : `${discountValue}% `}
      할인)
    </p>
  );
};
