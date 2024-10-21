import { CartItem, Coupon } from '../../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;

  return product.price * quantity * (1 - getMaxApplicableDiscount(item));
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calcDiscountAndPrice(cart);

  if (selectedCoupon) {
    const { discountType, discountValue } = selectedCoupon;

    const applyCoupon = discountStrategies[discountType];
    const applyCouponPrice = applyCoupon(totalAfterDiscount, discountValue);

    return {
      totalBeforeDiscount,
      totalAfterDiscount: applyCouponPrice,
      totalDiscount: totalBeforeDiscount - applyCouponPrice,
    };
  }

  return { totalBeforeDiscount, totalAfterDiscount, totalDiscount };
};

const calcDiscountAndPrice = (cart: CartItem[]) => {
  // 초기 누적값 설정
  const initialTotals = {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  };
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    cart.reduce((acc, cur) => {
      const { product, quantity } = cur;

      // 해당 상품에 적용할 최대 할인율 계산
      const maxDiscountRate = product.discounts.reduce(
        (max, { quantity: discountQty, rate }) =>
          discountQty <= quantity ? Math.max(max, rate) : max,
        0
      );

      //해당 상품의 총액
      const total = product.price * quantity;
      //해당 상품의 할인된 총액
      const discountedTotal = total * (1 - maxDiscountRate);

      acc.totalBeforeDiscount += total;
      acc.totalAfterDiscount += discountedTotal;
      acc.totalDiscount += total - discountedTotal;

      return acc;
    }, initialTotals);

  return { totalBeforeDiscount, totalAfterDiscount, totalDiscount };
};

const discountStrategies: Record<
  string,
  (price: number, value: number) => number
> = {
  amount: (price, value) => Math.max(0, price - value),
  percentage: (price, value) => price * (1 - value / 100),
  // 새로운 할인 유형 추가
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  const cartMap = new Map();

  cart.forEach(({ product, quantity }) => {
    const hasProduct = productId === product.id;
    const changeQty = hasProduct ? newQuantity : quantity;

    if (product.stock - changeQty < 0) {
      cartMap.set(product.id, { product, quantity: product.stock });
    } else if (changeQty > 0 && product.stock - newQuantity > 0)
      cartMap.set(product.id, { product, quantity: changeQty });
  });

  return Array.from(cartMap.values());
};

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (cart: CartItem[], product: ItemType) => {
  const cartItem = cart?.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
