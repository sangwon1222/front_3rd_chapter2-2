import { initCoupon } from '@refactor/data/coupon';
import { CustomInput } from '@atoms/CustomInput';
import { ComboBox } from '@atoms/ComboBox';
import { Coupon } from 'src/types';
import { useCouponForm } from '@refactor/hooks/useCouponForm';

type PropsType = { onCouponAdd: (coupon: Coupon) => void };

export const AddCoupon: React.FC<PropsType> = ({ onCouponAdd }) => {
  const { couponForm, updateCouponForm, resetCouponForm } = useCouponForm({
    ...initCoupon,
  });

  // 쿠폰 추가
  const handleAddCoupon = () => {
    onCouponAdd(couponForm);
    resetCouponForm();
  };

  return (
    <div className="space-y-2 mb-4">
      <CustomInput
        placeholder="쿠폰 이름"
        inputValue={couponForm.name}
        onChange={(v) => updateCouponForm('name', v)}
        inputStyle="w-full p-2 border rounded"
        required
      />
      <CustomInput
        placeholder="쿠폰 코드"
        inputValue={couponForm.code}
        onChange={(v) => updateCouponForm('code', v)}
        inputStyle="w-full p-2 border rounded"
        required
      />

      <div className="flex gap-2">
        <ComboBox
          initialValue={couponForm.discountType}
          onChange={(v) =>
            updateCouponForm('discountType', v as 'amount' | 'percentage')
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
          inputValue={couponForm.discountValue}
          onChange={(v) => updateCouponForm('discountValue', parseInt(v))}
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
