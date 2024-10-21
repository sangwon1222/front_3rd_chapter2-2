import { initCoupon, initialCoupons } from '@refactor/data/coupon';
import { PropsWithChildren, useMemo, useState } from 'react';
import { CouponContext } from './Context';

const CouponProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [coupons, setCoupons] = useState<CouponMapType>(
    new Map(initialCoupons)
  );

  const addCoupon = (coupon: CouponType) => {
    setCoupons((prev) => {
      const newCoupons = new Map(prev);
      newCoupons.set(coupon.code, coupon);
      return newCoupons;
    });
  };

  const removeCoupon = (id: string) => {
    setCoupons((prev) => {
      const newCoupons = new Map(prev);
      newCoupons.delete(id);
      return newCoupons;
    });
  };

  const getCoupon = (id: string) => {
    if (coupons.has(id)) return coupons.get(id)!;
    return initCoupon;
  };

  const couponList = useMemo(() => Array.from(coupons.values()), [coupons]);

  return (
    <CouponContext.Provider
      value={{ couponList, addCoupon, removeCoupon, getCoupon }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export default CouponProvider;
