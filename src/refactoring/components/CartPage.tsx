import { ProductList } from '@templates/cart/ProductList';
import { CartHistory } from '@templates/cart/CartHistory';
import { useCart } from '@refactor/hooks/useCart';
import { Coupon, Grade, Product } from 'src/types';

type PropsType = {
  products: Product[];
  coupons: Coupon[];
  grade?: Grade | null;
  gradeList?: Grade[] | null;
  updateGrade?: ((id: number) => void) | null;
};

export const CartPage: React.FC<PropsType> = ({
  products,
  coupons,
  grade = null,
  gradeList = null,
  updateGrade = null,
}) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    calculateTotalWithGrade,
    selectedCoupon,
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품목록 */}
        <ProductList products={products} cart={cart} addToCart={addToCart} />

        {/* 장바구니 내역 */}
        <CartHistory
          cart={cart}
          coupons={coupons}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          applyCoupon={applyCoupon}
          selectedCoupon={selectedCoupon}
          calculateTotal={calculateTotal}
          calculateTotalWithGrade={calculateTotalWithGrade}
          grade={grade}
          gradeList={gradeList}
          updateGrade={updateGrade}
        />
      </div>
    </div>
  );
};
