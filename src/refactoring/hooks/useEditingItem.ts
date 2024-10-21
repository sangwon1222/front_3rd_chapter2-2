const initData: ItemType = {
  id: '',
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};

const useEditingItem = () => {
  let data: ItemType;
  data = initData;
  const getEditingItem = () => data;
  const setEditingItem = (
    key: keyof Omit<ItemType, 'id'>,
    value: string | number | { quantity: number; rate: number }[]
  ) => {
    data = { ...data, [key]: value };
  };
  const resetEditingItem = () => (data = initData);

  return { getEditingItem, setEditingItem, resetEditingItem };
};

export default useEditingItem();
