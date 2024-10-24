import { useEffect, useState } from 'react';
import { Product } from '../../../types.ts';

export const useApiMockProduct = () => {
  const [products, setProducts] = useState<Product[]>(() => []);
  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const updateProduct = (product: Product) => {
    fetch('/api/update-product', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  const addProduct = (product: Product) => {
    fetch('/api/add-product', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
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
