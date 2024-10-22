import { Discount, Product } from '../../types.ts';
import { useState } from 'react';

export const useNewProductForm = (initialProducts: Omit<Product, 'id'>) => {
  const [newProductForm, setProduct] =
    useState<Omit<Product, 'id'>>(initialProducts);

  const updateNewProductForm = (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number | Discount[]
  ) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const resetNewProductForm = () => setProduct(initialProducts);

  return {
    newProductForm,
    updateNewProductForm,
    resetNewProductForm,
  };
};
