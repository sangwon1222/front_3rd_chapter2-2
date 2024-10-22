import { CartItem, Coupon, Product } from '../../types';
import { initCoupon } from '@refactor/data/coupon';
import {
  updateCartItemQuantity,
  calculateCartTotal,
  removeCartItem,
} from '@refactor/hooks/utils/cartUtils';
import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (newProduct: Product) => {
    const findInCart = cart.find(({ product: { id } }) => id === newProduct.id);

    if (findInCart) {
      setCart((prev) =>
        updateCartItemQuantity(prev, newProduct.id, findInCart.quantity + 1)
      );
    } else {
      setCart((prev) => [...prev, { product: newProduct, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => removeCartItem(prev, productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
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
