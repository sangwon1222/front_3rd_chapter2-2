import ProductList from '@refactor/components/templates/cart/ProductList';
import { useCart } from '@refactor/hooks/useCart';
import CartList from '@templates/cart/CartList';
import CartTotal from '@molecules/CartTotal';
import ComboBox from '@atoms/ComboBox';
import { Coupon, Product } from 'src/types';

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

  const couponOptions = coupons.map((coupon, index) => {
    const { name, discountType, discountValue } = coupon;

    const isAmount = discountType === 'amount';

    // 할인 정보 형식화
    const formattedDiscount = isAmount
      ? `${discountValue}원` // 금액 할인
      : `${discountValue}%`; // 비율 할인

    return {
      label: `${name} - ${formattedDiscount}`, // 쿠폰 이름과 할인 정보 결합
      value: index, // 쿠폰 인덱스를 value로 사용
    };
  });

  const options = [
    { label: '쿠폰 선택', value: -1 }, // 기본 옵션
    ...couponOptions,
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} cart={cart} addToCart={addToCart} />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((item) => {
              return (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center bg-white p-3 rounded shadow"
                >
                  <CartList
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>

            <ComboBox
              onChange={(v) => applyCoupon(coupons[parseInt(v)])}
              style="w-full p-2 border rounded mb-2"
              options={options}
              initialValue={-1}
            />

            {selectedCoupon && (
              <p className="text-green-600">
                적용된 쿠폰: {selectedCoupon.name}(
                {selectedCoupon.discountType === 'amount'
                  ? `${selectedCoupon.discountValue}원 `
                  : `${selectedCoupon.discountValue}% `}
                할인)
              </p>
            )}
          </div>

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
