import { useState } from 'react';
import { Discount } from 'src/types';

export const useDiscountForm = (initialForm: Discount) => {
  const [discountForm, setDiscountForm] = useState<Discount>({
    ...initialForm,
  });

  const updateDiscountForm = (key: keyof Discount, value: number) => {
    setDiscountForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetDiscountForm = () => setDiscountForm({ ...initialForm });

  return { discountForm, updateDiscountForm, resetDiscountForm };
};
