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
    const updatedForm = addProductFormValue(productForm, key, value);
    setProduct(updatedForm);
  };

  const addDiscount = (newDiscount: Discount) => {
    const updatedDiscount = addProductFormDiscount(productForm, newDiscount);
    setProduct(updatedDiscount);
  };

  const removeDiscount = (index: number) => {
    const removedDiscount = removeProductFormDiscount(productForm, index);
    setProduct(removedDiscount);
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
