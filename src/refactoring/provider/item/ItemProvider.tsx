import { PropsWithChildren, useMemo, useState } from 'react';
import { initialItems, initItem } from '@refactor/data/item';
import { ItemContext } from './Context';
import { Discount, Product } from 'src/types';

type ItemMapType = Map<string, Product>;

const ItemProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<ItemMapType>(new Map(initialItems));

  const addItem = (item: Product) => {
    setItems((prev) => {
      const newItems = new Map(prev);
      newItems.set(item.id, item);
      return newItems;
    });
  };

  const updateItem = (
    id: string,
    key: keyof Omit<Product, 'id'>,
    value: string | number | Discount[]
  ) => {
    if (!items.has(id)) throw new Error(`Item with ID ${id} does not exist.`);

    setItems((prev) => {
      const existingItem = items.get(id)!;
      const updatedItem = { ...existingItem, [key]: value };

      const newItem = new Map(prev);
      newItem.set(id, updatedItem);
      return newItem;
    });
  };

  const removeItemById = (id: string) => {
    setItems((prev) => {
      const newItems = new Map(prev);
      newItems.delete(id);
      return newItems;
    });
  };

  const getItemById = (id: string) => {
    if (items.has(id)) return items.get(id)!;
    return initItem;
  };

  const itemList = useMemo(() => Array.from(items.values()), [items]);
  return (
    <ItemContext.Provider
      value={{ itemList, addItem, updateItem, removeItemById, getItemById }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
