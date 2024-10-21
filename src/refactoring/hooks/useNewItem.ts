import { initItem } from '@refactor/data/item';

const useNewItem = () => {
  let data: ItemType;
  data = initItem;

  const getNewItem = () => data;

  const setNewItem = (
    key: keyof Omit<ItemType, 'id'>,
    value: string | number | { quantity: number; rate: number }[]
  ) => {
    data = { ...data, [key]: value };
  };

  const resetNewItem = () => (data = initItem);

  return { getNewItem, setNewItem, resetNewItem };
};

export default useNewItem();
