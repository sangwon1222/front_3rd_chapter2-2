import { useAdminContext } from '@refactor/provider/admin/useAdminContext';
import { AdminPage } from '@refactor/components/AdminPage';
import { CartPage } from '@refactor/components/CartPage';
import { useCallback, useMemo } from 'react';
import { Coupon, Product } from 'src/types';
import { Nav } from '@templates/Nav';
import { useStorageGrade } from './hooks/storage/useStorageGrade';
import { useStorageProducts } from './hooks/storage/useStorageProducts';
import { useStorageCoupons } from './hooks/storage/useStorageCoupons';

const StorageMockApp = () => {
  const { isAdmin } = useAdminContext();
  const { products, updateProduct, addProduct } = useStorageProducts();
  const { coupons, addCoupon } = useStorageCoupons();

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

  const { grade, gradeList, updateGrade } = useStorageGrade();

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

export default StorageMockApp;
