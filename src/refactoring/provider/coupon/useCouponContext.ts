import { useContext } from 'react';
import { CouponContext } from './Context';

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context)
    throw new Error('useCoupon must be used within a CouponProvider');
  return context;
};
