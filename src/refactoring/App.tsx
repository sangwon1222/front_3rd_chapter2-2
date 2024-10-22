import { useAdminContext } from '@provider/useAdminContext';
import { AdminPage } from '@refactor/components/AdminPage';
import { useCoupons, useProducts } from '@refactor/hooks';
import { CartPage } from '@refactor/components/CartPage';
import { initialProducts } from '@refactor/data/item';
import { initCoupons } from '@refactor/data/coupon';
import { Coupon, Product } from 'src/types';
import { useCallback, useMemo } from 'react';
import { Nav } from '@templates/Nav';

const App = () => {
  const { isAdmin } = useAdminContext();
  const { products, updateProduct, addProduct } = useProducts([
    ...initialProducts,
  ]);
  const { coupons, addCoupon } = useCoupons([...initCoupons]);

  const memoProducts = useMemo(() => products, [products]);
  const memoCoupons = useMemo(() => coupons, [coupons]);

  const handleProductUpdate = useCallback(
    (updatedProduct: Product) => updateProduct(updatedProduct),
    [products]
  );

  const handleProductAdd = useCallback(
    (newProduct: Product) => addProduct(newProduct),
    [products]
  );

  const handleCouponAdd = useCallback(
    (newCoupon: Coupon) => addCoupon(newCoupon),
    [coupons]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={memoProducts}
            coupons={memoCoupons}
            onProductUpdate={handleProductUpdate}
            onProductAdd={handleProductAdd}
            onCouponAdd={handleCouponAdd}
          />
        ) : (
          <CartPage products={memoProducts} coupons={memoCoupons} />
        )}
      </main>
    </div>
  );
};

export default App;
