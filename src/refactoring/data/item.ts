import { Discount, Product } from 'src/types';

export const initialItems: [string, Product][] = [
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
];

export const initItem: Product = {
  id: '',
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};

export const initDiscount: Discount = {
  quantity: 0,
  rate: 0,
};

export const initialProducts: Product[] = [
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
];
