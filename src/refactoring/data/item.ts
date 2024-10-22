import { Discount, Product } from 'src/types';

export const initialItems: Readonly<[string, Product][]> = Object.freeze([
  [
    'p1',
    {
      id: 'p1',
      name: '상품1',
      price: 10000,
      stock: 20,
      discounts: [
        { quantity: 10, rate: 0.1 },
        { quantity: 20, rate: 0.2 },
      ],
    },
  ],
  [
    'p2',
    {
      id: 'p2',
      name: '상품2',
      price: 20000,
      stock: 20,
      discounts: [{ quantity: 10, rate: 0.15 }],
    },
  ],
  [
    'p3',
    {
      id: 'p3',
      name: '상품3',
      price: 30000,
      stock: 20,
      discounts: [{ quantity: 10, rate: 0.2 }],
    },
  ],
]);

export const initItem: Readonly<Product> = Object.freeze({
  id: '',
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
});

export const initDiscount: Readonly<Discount> = Object.freeze({
  quantity: 0,
  rate: 0,
});

export const initialProducts: Readonly<Product[]> = Object.freeze([
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
]);
