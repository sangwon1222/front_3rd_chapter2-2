import { Discount, Product } from '../../types.ts';
import { useState } from 'react';

export const useProductForm = (initialProducts: Omit<Product, 'id'>) => {
  const [productForm, setProduct] = useState<Omit<Product, 'id'>>({
    ...initialProducts,
  });

  const setProductForm = (data: Omit<Product, 'id'>) => setProduct({ ...data });

  const updateProductForm = (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number | Discount[]
  ) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const addDiscount = (newDiscount: Discount) => {
    setProduct((prev) => {
      return { ...prev, discounts: [...prev.discounts, newDiscount] };
    });
  };

  const removeDiscount = (index: number) => {
    setProduct((prev) => {
      return {
        ...prev,
        discounts: prev.discounts.filter((_, i) => i !== index),
      };
    });
  };

  const resetProductForm = () => setProduct({ ...initialProducts });

  return {
    productForm,
    setProductForm,
    updateProductForm,
    addDiscount,
    removeDiscount,
    resetProductForm,
  };
};
