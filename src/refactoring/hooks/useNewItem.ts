import { initItem } from '@refactor/data/item';
import { Product } from 'src/types';

export const useNewItem = () => {
  let data: Omit<Product, 'id'>;
  data = initItem;

  const updateNewItem = (
    key: keyof Omit<Product, 'id'>,
    value: string | number | { quantity: number; rate: number }[]
  ) => {
    data = { ...data, [key]: value };
  };

  const setNewItem = (newData: Omit<Product, 'id'>) => {
    data = { ...newData };
  };

  const resetNewItem = () => (data = initItem);

  return { newProduct: data, setNewItem, updateNewItem, resetNewItem };
};
