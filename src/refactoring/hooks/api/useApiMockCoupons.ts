import { Coupon } from '../../../types.ts';
import { useEffect, useState } from 'react';
import { debounce } from '../utils/util.ts';
import {
  addCouponApi,
  fetchCoupons,
  removeCouponApi,
} from '@refactor/service/api/coupon.ts';

export const useApiMockCoupon = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => []);

  useEffect(() => {
    fetchCoupons().then(setCoupons);
  }, []);

  const addCoupon = debounce((newCoupon: Coupon) => {
    addCouponApi(newCoupon).then(setCoupons);
  }, 100);

  const removeCoupon = debounce((newCoupon: Coupon) => {
    removeCouponApi(newCoupon).then(setCoupons);
  }, 100);

  return { coupons, addCoupon, removeCoupon };
};
