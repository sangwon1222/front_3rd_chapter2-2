import { initCoupon } from '@refactor/data/coupon';

const useNewCoupon = () => {
  let data: CouponType;
  data = initCoupon;

  const getNewCoupon = () => data;

  const setNewCoupon = (key: keyof CouponType, value: string | number) => {
    data = { ...data, [key]: value };
  };

  const resetNewCoupon = () => (data = initCoupon);

  return { getNewCoupon, setNewCoupon, resetNewCoupon };
};

export default useNewCoupon();
