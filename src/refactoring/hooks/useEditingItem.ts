import { Product } from 'src/types';

const initData: Product = {
  id: '',
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};

const useEditingItem = () => {
  let data: Product;
  data = initData;
  const getEditingItem = () => data;
  const setEditingItem = (
    key: keyof Omit<Product, 'id'>,
    value: string | number | { quantity: number; rate: number }[]
  ) => {
    data = { ...data, [key]: value };
  };
  const resetEditingItem = () => (data = initData);

  return { getEditingItem, setEditingItem, resetEditingItem };
};

export default useEditingItem();
