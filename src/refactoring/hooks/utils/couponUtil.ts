import { Coupon } from 'src/types';

// 쿠폰 리스트 콤보박스 options
export const formatCouponOptions = (coupons: Coupon[]) => {
  const couponOptions = coupons.map((coupon, index) => {
    const { name, discountType, discountValue } = coupon;
    const formattedDiscount = formatCouponLabel(discountType, discountValue);

    return {
      label: `${name} - ${formattedDiscount}`,
      value: index,
    };
  });

  return [{ label: '쿠폰 선택', value: -1 }, ...couponOptions];
};

// 쿠폰 라벨
export const formatCouponLabel = (
  discountType: 'amount' | 'percentage',
  discountValue: number
) => {
  const isAmount = discountType === 'amount';
  return isAmount
    ? `${discountValue}원` // 금액 할인
    : `${discountValue}%`; // 비율 할인
};

// 쿠폰 적용한 값 return
export const getApplyCouponPrice = (total: number, coupon: Coupon) => {
  const { discountType, discountValue } = coupon;

  const calcDiscount = discountStrategies[discountType];
  const applyCouponPrice = calcDiscount(total, discountValue);
  return applyCouponPrice;
};

const discountStrategies: Record<
  string,
  (price: number, value: number) => number
> = {
  amount: (price, amount) => Math.max(0, price - amount),
  percentage: (price, rate) => price * (1 - rate / 100),
  // 새로운 할인 유형 추가
};
