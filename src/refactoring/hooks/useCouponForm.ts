import { useState } from 'react';
import { Coupon } from 'src/types';

export const useCouponForm = (initialForm: Coupon) => {
  const [couponForm, setCouponForm] = useState<Coupon>({
    ...initialForm,
  });

  const updateCouponForm = (key: keyof Coupon, value: string | number) => {
    setCouponForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetCouponForm = () => setCouponForm({ ...initialForm });

  return { couponForm, updateCouponForm, resetCouponForm };
};
