import { Coupon } from '../../types.ts';
import { useEffect, useState } from 'react';
import { debounce } from './utils/util.ts';

export const useApiMockCoupon = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => []);

  useEffect(() => {
    fetch('/api/coupons')
      .then((response) => response.json())
      .then((data) => setCoupons(data));
  }, []);

  const addCoupon = debounce((newCoupon: Coupon) => {
    fetch('/api/add-coupon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCoupon),
    })
      .then((response) => response.json())
      .then((data) => {
        setCoupons(() => data);
      });
  }, 100);

  const removeCoupon = debounce((newCoupon: Coupon) => {
    fetch('/api/remove-coupon', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCoupon),
    })
      .then((response) => response.json())
      .then((data) => {
        setCoupons(() => data);
      });
  }, 100);

  return { coupons, addCoupon, removeCoupon };
};
