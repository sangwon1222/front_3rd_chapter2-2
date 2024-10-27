import { useEffect, useState } from 'react';
import { Product } from '../../../types.ts';
import { initialProducts } from '@refactor/data/item.ts';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@refactor/service/localStorage/storageService.ts';
import { LOCAL_STORAGE_PRODUCTS_KEY } from '@refactor/constants/storage.ts';

export const useStorageProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => []);

  // 스토리지 값 설정
  useEffect(() => {
    const storageProducts = getLocalStorageItem(
      LOCAL_STORAGE_PRODUCTS_KEY,
      initialProducts
    );
    setProducts(() => [...storageProducts]);
  }, []);

  const updateProduct = (product: Product) => {
    const newData = products.map((p) => (p.id === product.id ? product : p));
    setProducts(newData);
    setLocalStorageItem(LOCAL_STORAGE_PRODUCTS_KEY, newData);
  };

  const addProduct = (product: Product) => {
    const newData = [...products, product];
    setProducts(newData);
    setLocalStorageItem(LOCAL_STORAGE_PRODUCTS_KEY, newData);
  };

  const removeProduct = (id: string) => {
    const newData = products.filter((p) => p.id !== id);
    setProducts(newData);
    setLocalStorageItem(LOCAL_STORAGE_PRODUCTS_KEY, newData);
  };

  return {
    products,
    updateProduct,
    removeProduct,
    addProduct,
  };
};
