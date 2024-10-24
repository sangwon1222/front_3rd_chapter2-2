import { useAdminContext } from '@refactor/provider/admin/useAdminContext';
import { useApiMockProduct } from './hooks/api/useApiMockProducts';
import { useApiMockCoupon } from './hooks/api/useApiMockCoupons';
import { AdminPage } from '@refactor/components/AdminPage';
import { CartPage } from '@refactor/components/CartPage';
import { useCallback, useMemo } from 'react';
import { Coupon, Product } from 'src/types';
import { Nav } from '@templates/Nav';
import { useApiGrade } from './hooks/api/useApiGrade';

const ApiMockApp = () => {
  const { isAdmin } = useAdminContext();
  const { products, updateProduct, addProduct } = useApiMockProduct();
  const { coupons, addCoupon } = useApiMockCoupon();

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

  const { grade, gradeList, updateGrade } = useApiGrade();

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
          <CartPage
            products={memoProducts}
            coupons={memoCoupons}
            grade={grade}
            gradeList={gradeList}
            updateGrade={updateGrade}
          />
        )}
      </main>
    </div>
  );
};

export default ApiMockApp;
