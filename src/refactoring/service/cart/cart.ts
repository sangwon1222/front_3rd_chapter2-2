import { CartItem, Product } from 'src/types';

export const findProductIndexInCart = (
  cartItems: CartItem[],
  product: Product
) => cartItems.findIndex(({ product: { id } }) => id === product.id);

export const increaseCartItemQty = (cart: CartItem[], productId: string) => {
  const cache = new Map();

  cart.forEach(({ product, quantity }) => {
    const hasProduct = productId === product.id;
    if (hasProduct) cache.set(product.id, { product, quantity: quantity + 1 });
  });

  return Array.from(cache.values());
};

export const updateCartNewItem = (
  cart: CartItem[],
  productId: string
): CartItem[] => {
  const cache = new Map();

  cart.forEach(({ product }) => {
    const hasProduct = productId === product.id;
    if (hasProduct) cache.set(product.id, { product, quantity: 1 });
  });

  return Array.from(cache.values());
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
