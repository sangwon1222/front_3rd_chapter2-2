import { initialCoupons } from '@refactor/data/coupon';
import { useEffect, useState } from 'react';
import { Coupon } from 'src/types';

export const useStorageCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  // 스토리지 값 설정
  useEffect(() => {
    const storageCoupons = localStorage.getItem('coupons');
    try {
      if (storageCoupons) {
        setCoupons(JSON.parse(storageCoupons));
      } else {
        localStorage.setItem('coupons', JSON.stringify(initialCoupons));
        setCoupons([...initialCoupons]);
      }
    } catch (e) {
      throw new Error('Error accessing localStorage' + e);
    }
  }, []);

  const addCoupon = (newCoupon: Coupon) => {
    const newData = [...coupons, newCoupon];
    setCoupons(newData);
    localStorage.setItem('coupons', JSON.stringify(newData));
  };

  return { coupons, addCoupon };
};
