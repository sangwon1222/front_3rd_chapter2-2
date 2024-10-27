import { Product } from 'src/types';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  return response.json();
};

export const updateProductApi = async (
  product: Product
): Promise<Product[]> => {
  const response = await fetch('/api/update-product', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const addProductApi = async (product: Product): Promise<Product[]> => {
  const response = await fetch('/api/add-product', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};
