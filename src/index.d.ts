interface AdminContextType {
  isAdmin: Boolean;
  toggleAdmin: () => void;
}

interface CouponContextType {
  couponList: CouponType[];
  addCoupon: (coupon: CouponType) => void;
  removeCoupon: (id: string) => void;
  getCoupon: (id: string) => CouponType;
}

interface ItemContextType {
  itemList: ItemType[];
  addItem: (item: ItemType) => void;
  updateItem: (
    id: string,
    key: keyof Omit<ItemType, 'id'>,
    value: string | number | DiscountType[]
  ) => void;
  removeItemById: (id: string) => void;
  getItemById: (id: string) => ItemType;
}

type CouponMapType = Map<string, CouponType>;

type ItemMapType = Map<string, ItemType>;

type CouponType = {
  name: string;
  code: string;
  discountType: 'amount' | 'percentage';
  discountValue: number;
};

type ItemType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: DiscountType[];
};

type DiscountType = {
  quantity: number;
  rate: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};
