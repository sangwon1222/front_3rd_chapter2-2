import { ProductList } from '@templates/cart/ProductList';
import { CartHistory } from '@templates/cart/CartHistory';
import { useCart } from '@refactor/hooks/useCart';
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
        />
      </div>
    </div>
  );
};
