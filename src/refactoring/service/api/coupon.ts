import { Coupon } from 'src/types';

export const fetchCoupons = async (): Promise<Coupon[]> => {
  const response = await fetch('/api/coupons');
  return response.json();
};

export const addCouponApi = async (newCoupon: Coupon): Promise<Coupon[]> => {
  const response = await fetch('/api/add-coupon', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCoupon),
  });
  return response.json();
};

export const removeCouponApi = async (newCoupon: Coupon): Promise<Coupon[]> => {
  const response = await fetch('/api/remove-coupon', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCoupon),
  });
  return response.json();
};
