import { Coupon } from 'src/types';

export const initialCoupons: Readonly<Coupon[]> = Object.freeze([
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
]);

export const initCoupon: Readonly<Coupon> = Object.freeze({
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
});
