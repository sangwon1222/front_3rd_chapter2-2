import { Coupon } from 'src/types';

export const initialCoupons: [string, Coupon][] = [
  [
    'AMOUNT5000',
    {
      name: '5000원 할인 쿠폰',
      code: 'AMOUNT5000',
      discountType: 'amount',
      discountValue: 5000,
    },
  ],
  [
    'PERCENT10',
    {
      name: '10% 할인 쿠폰',
      code: 'PERCENT10',
      discountType: 'percentage',
      discountValue: 10,
    },
  ],
];

export const initCoupon = {
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
} as Coupon;

export const initCoupons = [
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
] as Coupon[];