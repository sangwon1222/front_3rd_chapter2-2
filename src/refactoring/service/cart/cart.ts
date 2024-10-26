import { CartItem, Product } from 'src/types';

export const findProductInCartByIndex = (
  cartItems: CartItem[],
  productId: string
) => cartItems.findIndex(({ product: { id } }) => id === productId);

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
  product: Product
): CartItem[] => [...cart, { product, quantity: 1 }];
