import { useEffect, useState } from 'react';
import { Product } from '../../../types.ts';
import { initialProducts } from '@refactor/data/item.ts';

export const useStorageProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => []);

  // 스토리지 값 설정
  useEffect(() => {
    const storageProducts = localStorage.getItem('products');
    if (storageProducts) {
      const data = JSON.parse(storageProducts);
      setProducts(() => [...data]);
    } else {
      localStorage.setItem('products', JSON.stringify(initialProducts));
      setProducts(() => [...initialProducts]);
    }
  }, []);

  const updateProduct = (product: Product) => {
    const newData = products.map((p) => (p.id === product.id ? product : p));
    setProducts(newData);
    localStorage.setItem('products', JSON.stringify(newData));
  };

  const addProduct = (product: Product) => {
    const newData = [...products, product];
    setProducts(newData);
    localStorage.setItem('products', JSON.stringify(newData));
  };

  const removeProduct = (id: string) => {
    const newData = products.filter((p) => p.id !== id);
    setProducts(newData);
    localStorage.setItem('products', JSON.stringify(newData));
  };

  return {
    products,
    updateProduct,
    removeProduct,
    addProduct,
  };
};
