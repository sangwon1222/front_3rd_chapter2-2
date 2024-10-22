import { InputWithLabel } from '@atoms/InputWithLabel';

type PropsType = {
  formData: { name: string; price: number; stock: number };
  updateFormData: (key: string, value: string | number) => void;
};

export const UpdateItemForm: React.FC<PropsType> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <InputWithLabel
        label="상품명"
        id="itemName"
        inputValue={formData.name}
        onChange={(v) => updateFormData('name', v)}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />

      <InputWithLabel
        label="가격"
        id="productPrice"
        type="number"
        inputValue={formData.price}
        onChange={(v) => updateFormData('price', parseInt(v))}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />

      <InputWithLabel
        label="재고"
        id="productStock"
        type="number"
        inputValue={formData.stock}
        onChange={(v) => updateFormData('stock', parseInt(v))}
        inputStyle="w-full p-2 border rounded"
        labelStyle="block mb-1"
      />
    </div>
  );
};
