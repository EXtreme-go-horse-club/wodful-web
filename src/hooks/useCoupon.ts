import { useContext } from 'react';
import CouponContext from '@/contexts/coupon';

const useCoupon = () => {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }

  return context;
};

export default useCoupon;

