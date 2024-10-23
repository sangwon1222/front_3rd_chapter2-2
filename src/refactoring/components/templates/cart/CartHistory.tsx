import { formatCouponOptions } from '@refactor/hooks/utils/couponUtil';
import { ApplyCouponLabel } from '@atoms/coupon/ApplyCouponLabel';
import { ProductsInCart } from '@templates/cart/ProductsInCart';
import { CartTotal } from '@atoms/cart/CartTotal';
import { CartItem, Coupon } from 'src/types';
import { ComboBox } from '@atoms/ComboBox';

type PropsType = {
  coupons: Coupon[];
  cart: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  applyCoupon: (coupon: Coupon | null) => void;
  selectedCoupon: Coupon | null;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
};

export const CartHistory: React.FC<PropsType> = ({
  coupons,
  cart,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  selectedCoupon,
  calculateTotal,
}) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const couponOptions = formatCouponOptions(coupons);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {/* 장바구니에 있는 제품 리스트 */}
        <ProductsInCart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      </div>

      {/* 쿠폰 콤보박스 및 라벨 */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
        <ComboBox
          onChange={(v) => applyCoupon(coupons[parseInt(v)])}
          style="w-full p-2 border rounded mb-2"
          options={couponOptions}
          initialValue={-1}
        />
        {selectedCoupon && <ApplyCouponLabel coupon={selectedCoupon} />}
      </div>

      {/* 주문 요약 */}
      <CartTotal
        totalBeforeDiscount={totalBeforeDiscount}
        totalAfterDiscount={totalAfterDiscount}
        totalDiscount={totalDiscount}
      />
    </div>
  );
};
