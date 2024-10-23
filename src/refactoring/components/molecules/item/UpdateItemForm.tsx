import { InputWithLabel } from '@atoms/InputWithLabel';
import { Product } from 'src/types';

type PropsType = {
  productForm: Omit<Product, 'id' | 'discount'>;
  updateFormData: (
    key: keyof Omit<Product, 'id' | 'discounts'>,
    value: string | number
  ) => void;
};

export const UpdateItemForm: React.FC<PropsType> = ({
  productForm,
  updateFormData,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <InputWithLabel
        label="상품명"
        id="itemName"
        inputValue={productForm.name}
        onChange={(v) => updateFormData('name', v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />

      <InputWithLabel
        label="가격"
        id="productPrice"
        type="number"
        inputValue={productForm.price}
        onChange={(v) => updateFormData('price', parseInt(v))}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />

      <InputWithLabel
        label="재고"
        id="productStock"
        type="number"
        inputValue={productForm.stock}
        onChange={(v) => updateFormData('stock', parseInt(v))}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />
    </div>
  );
};
