import { formatCouponOptions } from '@refactor/hooks/utils/couponUtil';
import { ApplyCouponLabel } from '@atoms/coupon/ApplyCouponLabel';
import { ItemListInCart } from '@templates/cart/ItemListInCart';
import { ProductList } from '@templates/cart/ProductList';
import { CartTotal } from '@atoms/cart/CartTotal';
import { useCart } from '@refactor/hooks/useCart';
import { Coupon, Product } from 'src/types';
import { ComboBox } from '@atoms/ComboBox';

type PropsType = {
  products: Product[];
  coupons: Coupon[];
};

export const CartPage: React.FC<PropsType> = ({ products, coupons }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const couponOptions = formatCouponOptions(coupons);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품목록 */}
        <ProductList products={products} cart={cart} addToCart={addToCart} />

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <div className="space-y-2">
            {/* 장바구니에 있는 제품 리스트 */}
            <ItemListInCart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>

            {/* 쿠폰 콤보박스 */}
            <ComboBox
              onChange={(v) => applyCoupon(coupons[parseInt(v)])}
              style="w-full p-2 border rounded mb-2"
              options={couponOptions}
              initialValue={-1}
            />

            {/* 쿠폰 할인 적용 라벨 */}
            {selectedCoupon && <ApplyCouponLabel coupon={selectedCoupon} />}
          </div>

          {/* 총액 / 할인 적용 금액 / 할인 금액 */}
          <CartTotal
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};
