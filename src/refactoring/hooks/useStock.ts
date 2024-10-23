import { useState } from 'react';
import { getRemainingStock } from './utils/cartUtils';
import { CartItem, Product } from 'src/types';

export const useStock = (initialData: number) => {
  const [stock, setStock] = useState(initialData);

  const updateStock = (cart: CartItem[], product: Product) => {
    const stock = getRemainingStock(cart, product);
    setStock(stock);
  };

  return { stock, updateStock };
};
