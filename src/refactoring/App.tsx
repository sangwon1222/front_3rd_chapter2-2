import { useAdminContext } from '@provider/admin/useAdminContext';
import { AdminPage } from '@refactor/components/AdminPage';
import { initialProducts } from './data/item';
import { useCallback } from 'react';
import { initCoupons } from './data/coupon';
import { CartPage } from '@refactor/components/CartPage';
import Nav from '@templates/Nav';
import { Coupon, Product } from 'src/types';
import { useCoupons, useProducts } from './hooks';
import { useNewItem } from './hooks/useNewItem';

const App = () => {
  const { isAdmin } = useAdminContext();
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initCoupons);

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
            products={products}
            coupons={coupons}
            onProductUpdate={handleProductUpdate}
            onProductAdd={handleProductAdd}
            onCouponAdd={handleCouponAdd}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
