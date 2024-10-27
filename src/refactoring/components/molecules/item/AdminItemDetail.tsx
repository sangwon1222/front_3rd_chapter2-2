import { useProductForm } from '@refactor/hooks/useProductForm';
import { DiscountList } from '@molecules/discount/DiscountList';
import { UpdateItemForm } from './UpdateItemForm';
import { useEffect, useState } from 'react';
import { Product } from 'src/types';

type PropsType = { item: Product; onProductUpdate: (item: Product) => void };

export const AdminItemDetail: React.FC<PropsType> = ({
  item,
  onProductUpdate,
}) => {
  const [isEdit, setEditMode] = useState<boolean>(false);
  const { name, price, stock, discounts } = item;
  const {
    productForm,
    setProductForm,
    updateProductForm,
    resetProductForm,
    addDiscount,
    removeDiscount,
  } = useProductForm({
    name,
    price,
    stock,
    discounts,
  });

  useEffect(() => {
    const { name, price, stock, discounts } = item;
    setProductForm({ name, price, stock, discounts });
  }, [item]);

  //   수정완료
  const completeModify = () => {
    setEditMode(false);
    const { name, price, stock, discounts } = productForm;
    onProductUpdate({ ...item, name, price, stock, discounts });
    resetProductForm();
  };

  return (
    <>
      {isEdit && (
        <UpdateItemForm
          productForm={productForm}
          updateFormData={updateProductForm}
        />
      )}

      <DiscountList
        discounts={productForm.discounts}
        removeDiscount={removeDiscount}
        addDiscount={addDiscount}
        isEdit={isEdit}
      />

      {isEdit && (
        <button
          onClick={completeModify}
          className="text-white px-2 py-1 rounded bg-green-500 hover:bg-green-600 mt-2"
        >
          수정 완료
        </button>
      )}

      {!isEdit && (
        <button
          onClick={() => setEditMode(true)}
          data-testid="modify-button"
          className="text-white px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 mt-2"
        >
          수정
        </button>
      )}
    </>
  );
};
