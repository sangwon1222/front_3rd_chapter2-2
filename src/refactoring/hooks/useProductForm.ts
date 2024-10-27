import {
  addProductFormDiscount,
  addProductFormValue,
  removeProductFormDiscount,
} from '@refactor/service/products/form.ts';
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
    setProduct((prev) => addProductFormValue(prev, key, value));
  };

  const addDiscount = (newDiscount: Discount) => {
    setProduct((prev) => addProductFormDiscount(prev, newDiscount));
  };

  const removeDiscount = (index: number) => {
    setProduct((prev) => removeProductFormDiscount(prev, index));
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
