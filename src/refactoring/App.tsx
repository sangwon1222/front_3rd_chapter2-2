import { useAdminContext } from '@refactor/provider/admin/useAdminContext';
import { AdminPage } from '@refactor/components/AdminPage';
import { useCoupons, useProducts } from '@refactor/hooks';
import { CartPage } from '@refactor/components/CartPage';
import { initialProducts } from '@refactor/data/item';
import { initialCoupons } from '@refactor/data/coupon';
import { Coupon, Product } from 'src/types';
import { useCallback, useMemo } from 'react';
import { Nav } from '@templates/Nav';
import { useGrade } from './hooks/useGrade';
import { initialGrades } from './data/grade';

const App = () => {
  const { isAdmin } = useAdminContext();
  const { products, updateProduct, addProduct } = useProducts([
    ...initialProducts,
  ]);
  const { coupons, addCoupon } = useCoupons([...initialCoupons]);

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

  const { grade, gradeList, updateGrade } = useGrade([...initialGrades]);

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

export default App;
