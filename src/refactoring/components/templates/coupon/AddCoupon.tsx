// import { useCouponContext } from '@provider/coupon/useCouponContext';
import { initCoupon } from '@refactor/data/coupon';
import CustomInput from '@atoms/CustomInput';
import ComboBox from '@atoms/ComboBox';
import { useState } from 'react';

type PropsType = { onCouponAdd: (coupon: CouponType) => void };

const AddCoupon: React.FC<PropsType> = ({ onCouponAdd }) => {
  // const { addCoupon } = useCouponContext();
  const [newCouponForm, setNewCouponForm] = useState<CouponType>(initCoupon);

  const handleForm = (key: keyof CouponType, v: string | number) => {
    setNewCouponForm((prev) => ({ ...prev, [key]: v }));
  };

  // 쿠폰 추가
  const handleAddCoupon = () => {
    // addCoupon(newCouponForm);
    onCouponAdd(newCouponForm);

    setNewCouponForm(initCoupon);
  };
  return (
    <div className="space-y-2 mb-4">
      <CustomInput
        placeholder="쿠폰 이름"
        inputValue={newCouponForm.name}
        onChange={(v) => handleForm('name', v)}
        inputStyle="w-full p-2 border rounded"
        required
      />
      <CustomInput
        placeholder="쿠폰 코드"
        inputValue={newCouponForm.code}
        onChange={(v) => handleForm('code', v)}
        inputStyle="w-full p-2 border rounded"
        required
      />

      <div className="flex gap-2">
        <ComboBox
          initialValue={newCouponForm.discountType}
          onChange={(v) =>
            handleForm('discountType', v as 'amount' | 'percentage')
          }
          style="w-full p-2 border rounded"
          options={[
            { label: '금액(원)', value: 'amount' },
            { label: '할인율(%)', value: 'percentage' },
          ]}
        />
        <CustomInput
          type="number"
          placeholder="할인 값"
          inputValue={newCouponForm.discountValue}
          onChange={(v) => handleForm('discountValue', parseInt(v))}
          inputStyle="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleAddCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};

export default AddCoupon;
