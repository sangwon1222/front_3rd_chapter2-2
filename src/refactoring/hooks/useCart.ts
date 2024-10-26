import { CartItem, Coupon, Grade, Product } from '../../types';
import { initCoupon } from '@refactor/data/coupon';
import {
  calculateCartTotal,
  removeCartItem,
  calculateCartTotalWithGrade,
  updateCartItemQuantity,
} from '@refactor/hooks/utils/cartUtils';
import {
  findProductInCartByIndex,
  increaseCartItemQty,
  updateCartNewItem,
} from '@refactor/service/cart/cart';
import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (newProduct: Product) => {
    const findIndex = findProductInCartByIndex(cart, newProduct.id);
    const hasProductInCart = findIndex > -1;

    if (hasProductInCart) {
      setCart((prev) => increaseCartItemQty(prev, newProduct.id));
    } else {
      setCart((prev) => updateCartNewItem(prev, newProduct));
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

  const calculateTotalWithGrade = (grade: Grade) => {
    return calculateCartTotalWithGrade(cart, grade);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    calculateTotalWithGrade,
  };
};
