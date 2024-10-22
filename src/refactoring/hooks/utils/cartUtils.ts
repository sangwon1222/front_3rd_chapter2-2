import { CartItem, Coupon, Product } from '../../../types';

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

//getMaxApplicableDiscount 메모이제이션
export const memoizedGetMaxApplicableDiscount = (() => {
  const cache = new Map();
  return (item: CartItem) => {
    const key = `${item.product.id}-${item.quantity}`;
    if (cache.has(key)) return cache.get(key);

    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    cache.set(key, appliedDiscount);
    return appliedDiscount;
  };
})();

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calcDiscountAndPrice(cart);

  if (selectedCoupon) {
    const applyCouponPrice = applyCoupon(totalAfterDiscount, selectedCoupon);

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

export const applyCoupon = (total: number, coupon: Coupon) => {
  const { discountType, discountValue } = coupon;

  const calcDiscount = discountStrategies[discountType];
  const applyCouponPrice = calcDiscount(total, discountValue);
  return applyCouponPrice;
};

const discountStrategies: Record<
  string,
  (price: number, value: number) => number
> = {
  amount: (price, amount) => Math.max(0, price - amount),
  percentage: (price, rate) => price * (1 - rate / 100),
  // 새로운 할인 유형 추가
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  const cache = new Map();

  cart.forEach(({ product, quantity }) => {
    const hasProduct = productId === product.id;
    const changeQty = hasProduct ? newQuantity : quantity;

    if (product.stock - changeQty <= 0) {
      // 재고가 없을 경우, 최대값으로 지정
      cache.set(product.id, { product, quantity: product.stock });
    } else if (changeQty > 0) {
      // 재고가 있을 경우, changeQty으로 업데이트
      cache.set(product.id, { product, quantity: changeQty });
    }
  });

  return Array.from(cache.values());
};

export const removeCartItem = (
  cart: CartItem[],
  productId: string
): CartItem[] => {
  const cache = new Map();

  cart.forEach(({ product }) => {
    const hasProduct = productId === product.id;

    // id와 다를 경우만 set
    if (!hasProduct) {
      cache.set(product.id, { product, quantity: product.stock });
    }
  });

  return Array.from(cache.values());
};

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart?.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
