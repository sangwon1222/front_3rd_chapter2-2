import { useCouponContext } from '@provider/coupon/useCouponContext';

type PropsType = { coupons: CouponType[] };

const CouponList: React.FC<PropsType> = ({ coupons }) => {
  // const { couponList } = useCouponContext();
  return (
    <>
      {coupons.map(({ name, code, discountType, discountValue }, index) => (
        <div
          key={index}
          data-testid={`coupon-${index + 1}`}
          className="bg-gray-100 p-2 rounded"
        >
          {`${name} (${code}):`}
          {discountType === 'amount'
            ? `${discountValue}원 `
            : `${discountValue}% `}
          할인
        </div>
      ))}
    </>
  );
};

export default CouponList;
