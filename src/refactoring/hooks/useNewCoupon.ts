import { initCoupon } from '@refactor/data/coupon';
import { Coupon } from 'src/types';

const useNewCoupon = () => {
  let data: Coupon;
  data = initCoupon;

  const getNewCoupon = () => data;

  const setNewCoupon = (key: keyof Coupon, value: string | number) => {
    data = { ...data, [key]: value };
  };

  const resetNewCoupon = () => (data = initCoupon);

  return { getNewCoupon, setNewCoupon, resetNewCoupon };
};

export default useNewCoupon();
