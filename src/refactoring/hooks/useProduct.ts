import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts?: Product[]) => {
  const [products, setProducts] = useState<Product[]>(() =>
    initialProducts ? initialProducts : []
  );

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
