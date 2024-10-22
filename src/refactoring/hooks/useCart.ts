// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from './utils/cartUtils';
import { initCoupon } from '@refactor/data/coupon';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (newProduct: Product) => {
    const findInCart = cart.find(({ product: { id } }) => id === newProduct.id);

    if (findInCart) {
      setCart((prevCart) => {
        const cartMap = new Map();

        prevCart.forEach(({ product, quantity }) => {
          const hasProduct = newProduct.id === product.id;
          const changeQty = hasProduct ? quantity + 1 : quantity;

          cartMap.set(product.id, { product, quantity: changeQty });
        });

        return Array.from(cartMap.values());
      });
    } else {
      // 장바구니에 없는 경우
      setCart((prevCart) => [
        ...prevCart,
        { product: newProduct, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const cartMap = new Map();
      prevCart.forEach((item) => {
        if (item.product.id !== productId) cartMap.set(item.product.id, item);
      });
      return Array.from(cartMap.values());
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const updateCart = updateCartItemQuantity(cart, productId, newQuantity);
    setCart(updateCart);
  };

  const applyCoupon = (coupon: Coupon | null) => {
    if (coupon) setSelectedCoupon(coupon);
    else setSelectedCoupon({ ...initCoupon });
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
