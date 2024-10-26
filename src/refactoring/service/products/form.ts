import { Discount, Product } from 'src/types';

export const addProductFormValue = (
  form: Omit<Product, 'id'>,
  key: keyof Omit<Product, 'id' | 'discounts'>,
  value: string | number | Discount[]
) => ({ ...form, [key]: value });

export const addProductFormDiscount = (
  form: Omit<Product, 'id'>,
  newDiscount: Discount
) => ({ ...form, discounts: { ...form.discounts, newDiscount } });

export const removeProductFormDiscount = (
  form: Omit<Product, 'id'>,
  removeIdx: number
) => ({ ...form, discounts: form.discounts.filter((_, i) => i !== removeIdx) });
