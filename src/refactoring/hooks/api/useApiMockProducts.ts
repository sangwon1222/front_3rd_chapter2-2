import { useEffect, useState } from 'react';
import { Product } from '../../../types.ts';
import {
  addProductApi,
  fetchProducts,
  updateProductApi,
} from '@refactor/service/api/products.ts';

export const useApiMockProduct = () => {
  const [products, setProducts] = useState<Product[]>(() => []);
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const updateProduct = (product: Product) => {
    updateProductApi(product).then(setProducts);
  };

  const addProduct = (product: Product) => {
    addProductApi(product).then(setProducts);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    products,
    updateProduct,
    removeProduct,
    addProduct,
  };
};
