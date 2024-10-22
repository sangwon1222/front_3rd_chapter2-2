import { CartItem, Coupon, Discount, Product } from './types';

interface AdminContextType {
  isAdmin: Boolean;
  toggleAdmin: () => void;
}

interface CouponContextType {
  couponList: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  removeCoupon: (id: string) => void;
  getCoupon: (id: string) => Coupon;
}

interface ItemContextType {
  itemList: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (
    id: string,
    key: keyof Omit<Product, 'id'>,
    value: string | number | Discount[]
  ) => void;
  removeItemById: (id: string) => void;
  getItemById: (id: string) => Product;
}
