import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { CartPage } from '../../refactoring/components/CartPage';
import { AdminPage } from '../../refactoring/components/AdminPage';
import { Coupon, Product } from '../../types';
import {
  formatCouponLabel,
  formatCouponOptions,
  getApplyCouponPrice,
} from '@refactor/hooks/utils/couponUtil';
import { convertPercentage } from '@refactor/hooks/utils/discountUtil';
import { useProductForm } from '@refactor/hooks/useProductForm';
import { useDiscountForm } from '@refactor/hooks/useDiscountFrom';
import { useCouponForm } from '@refactor/hooks/useCouponForm';
import { useStock } from '@refactor/hooks/useStock';
import { useApiMockProduct } from '@refactor/hooks/api/useApiMockProducts';
import { useApiMockCoupon } from '@refactor/hooks/api/useApiMockCoupons';
import { initialProducts } from '@refactor/data/item';
import { useApiGrade } from '@refactor/hooks/api/useApiGrade';
import { useStorageProducts } from '@refactor/hooks/storage/useStorageProducts';
import { useStorageCoupons } from '@refactor/hooks/storage/useStorageCoupons';
import { useStorageGrade } from '@refactor/hooks/storage/useStorageGrade';
import { debounce } from '@refactor/hooks/utils/util';

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }],
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];
const mockCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleCouponAdd = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return (
    <AdminPage
      products={products}
      coupons={coupons}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

/**API ADMIN PAGE */
const TestApiMockAdminPage = () => {
  const { products, updateProduct, addProduct } = useApiMockProduct();
  const { coupons, addCoupon } = useApiMockCoupon();

  const handleProductUpdate = (updatedProduct: Product) =>
    updateProduct(updatedProduct);

  const handleProductAdd = (newProduct: Product) => addProduct(newProduct);

  const handleCouponAdd = (newCoupon: Coupon) => addCoupon(newCoupon);

  return (
    <AdminPage
      products={products}
      coupons={coupons}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

/**API CART PAGE */
const TestApiMockCartPage = () => {
  const { products } = useApiMockProduct();
  const { coupons } = useApiMockCoupon();

  const { grade, gradeList, updateGrade } = useApiGrade();

  return (
    <CartPage
      products={products}
      coupons={coupons}
      grade={grade}
      gradeList={gradeList}
      updateGrade={updateGrade}
    />
  );
};

/**LOCAL STORAGE ADMIN PAGE */
const TestLocalStorageAdminPage = () => {
  const { products, updateProduct, addProduct } = useStorageProducts();
  const { coupons, addCoupon } = useStorageCoupons();

  const handleProductUpdate = (updatedProduct: Product) =>
    updateProduct(updatedProduct);

  const handleProductAdd = (newProduct: Product) => addProduct(newProduct);

  const handleCouponAdd = (newCoupon: Coupon) => addCoupon(newCoupon);

  return (
    <AdminPage
      products={products}
      coupons={coupons}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

/**LOCAL STORAGE CART PAGE */
const TestStorageCartPage = () => {
  const { products } = useStorageProducts();
  const { coupons } = useStorageCoupons();

  const { grade, gradeList, updateGrade } = useStorageGrade();

  return (
    <CartPage
      products={products}
      coupons={coupons}
      grade={grade}
      gradeList={gradeList}
      updateGrade={updateGrade}
    />
  );
};

describe('advanced > ', () => {
  describe('시나리오 테스트 > ', () => {
    test('장바구니 페이지 테스트 > ', async () => {
      render(<CartPage products={mockProducts} coupons={mockCoupons} />);
      const product1 = screen.getByTestId('product-p1');
      const product2 = screen.getByTestId('product-p2');
      const product3 = screen.getByTestId('product-p3');
      const addToCartButtonsAtProduct1 =
        within(product1).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct2 =
        within(product2).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct3 =
        within(product3).getByText('장바구니에 추가');

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent('상품1');
      expect(product1).toHaveTextContent('10,000원');
      expect(product1).toHaveTextContent('재고: 20개');
      expect(product2).toHaveTextContent('상품2');
      expect(product2).toHaveTextContent('20,000원');
      expect(product2).toHaveTextContent('재고: 20개');
      expect(product3).toHaveTextContent('상품3');
      expect(product3).toHaveTextContent('30,000원');
      expect(product3).toHaveTextContent('재고: 20개');

      // 2. 할인 정보 표시
      expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText('상품 금액: 10,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 0원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 10,000원')).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent('재고: 0개');
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent('재고: 0개');

      // 7. 할인율 계산
      expect(screen.getByText('상품 금액: 200,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 20,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 180,000원')).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText('+');
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 110,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 590,000원')).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole('combobox');
      fireEvent.change(couponSelect, { target: { value: '1' } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 169,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 531,000원')).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: '0' } }); // 5000원 할인 쿠폰
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 115,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 585,000원')).toBeInTheDocument();
    });

    test('관리자 페이지 테스트 > ', async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId('product-1');

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText('새 상품 추가'));

      fireEvent.change(screen.getByLabelText('상품명'), {
        target: { value: '상품4' },
      });
      fireEvent.change(screen.getByLabelText('가격'), {
        target: { value: '15000' },
      });
      fireEvent.change(screen.getByLabelText('재고'), {
        target: { value: '30' },
      });

      fireEvent.click(screen.getByText('추가'));

      const $product4 = screen.getByTestId('product-4');

      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15000원');
      expect($product4).toHaveTextContent('재고: 30');

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), {
          target: { value: '25' },
        });
        fireEvent.change(within($product1).getByDisplayValue('10000'), {
          target: { value: '12000' },
        });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), {
          target: { value: '수정된 상품1' },
        });
      });

      fireEvent.click(within($product1).getByText('수정 완료'));

      expect($product1).toHaveTextContent('수정된 상품1');
      expect($product1).toHaveTextContent('12000원');
      expect($product1).toHaveTextContent('재고: 25');

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), {
          target: { value: '5' },
        });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
          target: { value: '5' },
        });
      });
      fireEvent.click(screen.getByText('할인 추가'));

      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), {
        target: { value: '새 쿠폰' },
      });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), {
        target: { value: 'NEW10' },
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'percentage' },
      });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), {
        target: { value: '10' },
      });

      fireEvent.click(screen.getByText('쿠폰 추가'));

      const $newCoupon = screen.getByTestId('coupon-3');

      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    });
  });

  describe('[api-mock] ', () => {
    test('관리자 페이지 테스트 >', async () => {
      render(<TestApiMockAdminPage />);
      await waitFor(() =>
        expect(screen.getByTestId('product-1')).toBeInTheDocument()
      );
      const $product1 = screen.getByTestId('product-1');
      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText('새 상품 추가'));
      fireEvent.change(screen.getByLabelText('상품명'), {
        target: { value: '상품4' },
      });
      fireEvent.change(screen.getByLabelText('가격'), {
        target: { value: '15000' },
      });
      fireEvent.change(screen.getByLabelText('재고'), {
        target: { value: '30' },
      });
      fireEvent.click(screen.getByText('추가'));

      await waitFor(() =>
        expect(screen.getByTestId('product-4')).toBeInTheDocument()
      );
      const $product4 = screen.getByTestId('product-4');
      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15000원');
      expect($product4).toHaveTextContent('재고: 30');
      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));
      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), {
          target: { value: '25' },
        });
        fireEvent.change(within($product1).getByDisplayValue('10000'), {
          target: { value: '12000' },
        });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), {
          target: { value: '수정된 상품1' },
        });
      });

      fireEvent.click(within($product1).getByText('수정 완료'));

      await waitFor(() => expect($product1).toHaveTextContent('수정된 상품1'));
      expect($product1).toHaveTextContent('12000원');
      expect($product1).toHaveTextContent('재고: 25');
      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));
      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), {
          target: { value: '5' },
        });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
          target: { value: '5' },
        });
      });
      fireEvent.click(screen.getByText('할인 추가'));
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);

      // 삭제 확인
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('20개 이상 구매 시 20% 할인')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);

      // 삭제 확인
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('20개 이상 구매 시 20% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);

      // 삭제 확인
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('20개 이상 구매 시 20% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), {
        target: { value: '새 쿠폰' },
      });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), {
        target: { value: 'NEW10' },
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'percentage' },
      });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), {
        target: { value: '10' },
      });
      fireEvent.click(screen.getByText('쿠폰 추가'));

      await waitFor(() =>
        expect(screen.getByTestId('coupon-3')).toBeInTheDocument()
      );
      const $newCoupon = screen.getByTestId('coupon-3');
      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    });

    test('장바구니 페이지 테스트 > 등급 할인', async () => {
      render(<TestApiMockCartPage />);
      await waitFor(() =>
        expect(screen.getByTestId('product-p1')).toBeInTheDocument()
      );
      const product1 = screen.getByTestId('product-p1');
      await waitFor(() =>
        expect(
          within(product1).getByText('장바구니에 추가')
        ).toBeInTheDocument()
      );
      const addToCartButtonsAtProduct1 =
        within(product1).getByText('장바구니에 추가');

      for (let i = 0; i < 10; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }
      const orderSummery = screen.getByTestId('order-summary');
      expect(orderSummery).toHaveTextContent('[일반회원]: 3% 등급 추가 할인');
      expect(orderSummery).toHaveTextContent('최종 결제 금액: 87,300원');
    });
  });

  describe('[localStorage] ', () => {
    beforeEach(() => localStorage.clear());

    test('관리자 페이지 테스트 >', () => {
      render(<TestLocalStorageAdminPage />);

      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      const $product1 = screen.getByTestId('product-1');
      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText('새 상품 추가'));
      fireEvent.change(screen.getByLabelText('상품명'), {
        target: { value: '상품4' },
      });
      fireEvent.change(screen.getByLabelText('가격'), {
        target: { value: '15000' },
      });
      fireEvent.change(screen.getByLabelText('재고'), {
        target: { value: '30' },
      });
      fireEvent.click(screen.getByText('추가'));

      expect(screen.getByTestId('product-4')).toBeInTheDocument();
      const $product4 = screen.getByTestId('product-4');
      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15000원');
      expect($product4).toHaveTextContent('재고: 30');
      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));
      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), {
          target: { value: '25' },
        });
        fireEvent.change(within($product1).getByDisplayValue('10000'), {
          target: { value: '12000' },
        });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), {
          target: { value: '수정된 상품1' },
        });
      });

      fireEvent.click(within($product1).getByText('수정 완료'));

      expect($product1).toHaveTextContent('수정된 상품1');
      expect($product1).toHaveTextContent('12000원');
      expect($product1).toHaveTextContent('재고: 25');
      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));
      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), {
          target: { value: '5' },
        });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
          target: { value: '5' },
        });
      });
      fireEvent.click(screen.getByText('할인 추가'));
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);

      // 삭제 확인
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('20개 이상 구매 시 20% 할인')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);

      // 삭제 확인
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('20개 이상 구매 시 20% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);

      // 삭제 확인
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('20개 이상 구매 시 20% 할인')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인')
      ).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), {
        target: { value: '새 쿠폰' },
      });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), {
        target: { value: 'NEW10' },
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'percentage' },
      });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), {
        target: { value: '10' },
      });
      fireEvent.click(screen.getByText('쿠폰 추가'));

      expect(screen.getByTestId('coupon-3')).toBeInTheDocument();
      const $newCoupon = screen.getByTestId('coupon-3');
      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    });

    test('장바구니 페이지 테스트 > 등급 할인', () => {
      render(<TestStorageCartPage />);
      expect(screen.getByTestId('product-p1')).toBeInTheDocument();
      const product1 = screen.getByTestId('product-p1');
      const addToCartButtonsAtProduct1 =
        within(product1).getByText('장바구니에 추가');

      for (let i = 0; i < 10; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }
      const orderSummery = screen.getByTestId('order-summary');
      expect(orderSummery).toHaveTextContent('[일반회원]: 3% 등급 추가 할인');
      expect(orderSummery).toHaveTextContent('최종 결제 금액: 87,300원');
    });
  });

  describe('[utils] 함수 테스트', () => {
    test('formatCouponOptions - 콤보박스 생성', () => {
      // 5000원 할인 쿠폰일 경우
      const options = formatCouponOptions([
        {
          name: 'CODE1',
          code: 'CODE1',
          discountType: 'amount',
          discountValue: 1000,
        },
        {
          name: 'CODE2',
          code: 'CODE2',
          discountType: 'percentage',
          discountValue: 10,
        },
      ]);
      expect(options).toStrictEqual([
        { label: '쿠폰 선택', value: -1 },
        { label: 'CODE1 - 1000원', value: 0 },
        { label: 'CODE2 - 10%', value: 1 },
      ]);
    });

    test('formatCouponLabel - 할인 종류에 따라 금액 또는 비율을 올바르게 형식화한다', () => {
      expect(formatCouponLabel('amount', 5000)).toBe('5000원');
      expect(formatCouponLabel('percentage', 10)).toBe('10%');
    });

    test('getApplyCouponPrice - 할인 종류에 따라 할인된 금액을 반환한다.', () => {
      // 10000 - 5000 = 5000
      expect(
        getApplyCouponPrice(10000, {
          name: 'COUPON1',
          code: 'COUPON1',
          discountType: 'amount',
          discountValue: 5000,
        })
      ).toBe(5000);

      // 10000 * ( 1 - 0.1 ) = 9000
      expect(
        getApplyCouponPrice(10000, {
          name: 'COUPON2',
          code: 'COUPON2',
          discountType: 'percentage',
          discountValue: 10,
        })
      ).toBe(9000);
    });

    test('convertPercentage - 소수점을 퍼센티지로 변환해준다.', () => {
      expect(convertPercentage(0.2)).toBe('20');
      expect(convertPercentage(0.75)).toBe('75');
    });

    test('debounce', async () => {
      let testNum = 0;
      const testFc = debounce(() => (testNum += 1), 100);
      for (let i = 0; i < 100; i++) {
        testFc();
      }
      // 100ms 기다리기
      await new Promise((r) => setTimeout(r, 100));
      expect(testNum).toBe(1);
    });
  });

  describe('[hooks]', () => {
    const initialNewProductForm = {
      name: '',
      price: 0,
      stock: 0,
      discounts: [],
    };
    test('useApiMockCoupon: 쿠폰 mock api', async () => {
      const { result } = renderHook(() => useApiMockCoupon());

      // coupons 상태가 비어있는지 확인
      expect(result.current.coupons).toEqual([]);

      // 비동기적으로 데이터가 로드될 때까지 대기
      await waitFor(() => {
        expect(result.current.coupons).not.toEqual([]);
      });

      // 초기화 값 확인
      expect(result.current.coupons).toEqual([
        {
          name: '5000원 할인 쿠폰',
          code: 'AMOUNT5000',
          discountType: 'amount',
          discountValue: 5000,
        },
        {
          name: '10% 할인 쿠폰',
          code: 'PERCENT10',
          discountType: 'percentage',
          discountValue: 10,
        },
      ]);

      // 쿠폰 추가
      act(() =>
        result.current.addCoupon({
          name: '새 쿠폰',
          code: 'NEW10',
          discountType: 'percentage',
          discountValue: 10,
        })
      );

      // 비동기
      await waitFor(() =>
        expect(result.current.coupons).not.toEqual([
          {
            name: '5000원 할인 쿠폰',
            code: 'AMOUNT5000',
            discountType: 'amount',
            discountValue: 5000,
          },
          {
            name: '10% 할인 쿠폰',
            code: 'PERCENT10',
            discountType: 'percentage',
            discountValue: 10,
          },
        ])
      );

      // 추가된 쿠폰 확인
      expect(result.current.coupons).toEqual([
        {
          name: '5000원 할인 쿠폰',
          code: 'AMOUNT5000',
          discountType: 'amount',
          discountValue: 5000,
        },
        {
          name: '10% 할인 쿠폰',
          code: 'PERCENT10',
          discountType: 'percentage',
          discountValue: 10,
        },
        {
          name: '새 쿠폰',
          code: 'NEW10',
          discountType: 'percentage',
          discountValue: 10,
        },
      ]);

      // 쿠폰 제거
      act(() =>
        result.current.removeCoupon({
          name: '새 쿠폰',
          code: 'NEW10',
          discountType: 'percentage',
          discountValue: 10,
        })
      );

      // 비동기
      await waitFor(() =>
        expect(result.current.coupons).not.toEqual([
          {
            name: '5000원 할인 쿠폰',
            code: 'AMOUNT5000',
            discountType: 'amount',
            discountValue: 5000,
          },
          {
            name: '10% 할인 쿠폰',
            code: 'PERCENT10',
            discountType: 'percentage',
            discountValue: 10,
          },
          {
            name: '새 쿠폰',
            code: 'NEW10',
            discountType: 'percentage',
            discountValue: 10,
          },
        ])
      );

      // 제거된 쿠폰 확인
      expect(result.current.coupons).toEqual([
        {
          name: '5000원 할인 쿠폰',
          code: 'AMOUNT5000',
          discountType: 'amount',
          discountValue: 5000,
        },
        {
          name: '10% 할인 쿠폰',
          code: 'PERCENT10',
          discountType: 'percentage',
          discountValue: 10,
        },
      ]);
    });

    test('useApiMockProduct: 제품 mock api', async () => {
      const { result } = renderHook(() => useApiMockProduct());

      // products 상태가 비어있는지 확인
      expect(result.current.products).toEqual([]);

      // 비동기적으로 데이터가 로드될 때까지 대기
      await waitFor(() => {
        expect(result.current.products).not.toEqual([]);
      });

      // 초기화 값 확인
      expect(result.current.products).toEqual(initialProducts);

      // 제품 추가
      result.current.addProduct({
        id: 'p4',
        name: '상품4',
        price: 40000,
        stock: 40,
        discounts: [{ quantity: 20, rate: 0.15 }],
      });

      // 비동기
      await waitFor(() =>
        expect(result.current.products).not.toEqual(initialProducts)
      );

      // 추가된 제품 확인
      expect(result.current.products).toEqual([
        ...initialProducts,
        {
          id: 'p4',
          name: '상품4',
          price: 40000,
          stock: 40,
          discounts: [{ quantity: 20, rate: 0.15 }],
        },
      ]);

      // 제품 제거
      act(() => result.current.removeProduct('p4'));

      // 비동기
      await waitFor(() =>
        expect(result.current.products).not.toEqual([
          ...initialProducts,
          {
            id: 'p4',
            name: '상품4',
            price: 40000,
            stock: 40,
            discounts: [{ quantity: 20, rate: 0.15 }],
          },
        ])
      );

      // 제거된 제품 확인
      expect(result.current.products).toEqual(initialProducts);
    });

    test('useProductForm: 제품추가 form', () => {
      const { result } = renderHook(() =>
        useProductForm({ ...initialNewProductForm })
      );
      expect(result.current.productForm.name).toBe('');
      expect(result.current.productForm.price).toBe(0);
      expect(result.current.productForm.stock).toBe(0);

      // name 업데이트 확인
      act(() => result.current.updateProductForm('name', '제품1'));
      expect(result.current.productForm.name).toBe('제품1');

      // price 업데이트 확인
      act(() => result.current.updateProductForm('price', 10000));
      expect(result.current.productForm.price).toBe(10000);

      // stock 업데이트 확인
      act(() => result.current.updateProductForm('stock', 20));
      expect(result.current.productForm.stock).toBe(20);

      // discounts add 확인
      act(() => result.current.addDiscount({ quantity: 10, rate: 20 }));
      act(() => result.current.addDiscount({ quantity: 20, rate: 40 }));
      expect(result.current.productForm.discounts).toEqual([
        { quantity: 10, rate: 20 },
        { quantity: 20, rate: 40 },
      ]);

      // discounts remove 확인
      act(() => result.current.removeDiscount(1));
      expect(result.current.productForm.discounts).toEqual([
        { quantity: 10, rate: 20 },
      ]);

      // 값 초기화 확인
      act(() => result.current.resetProductForm());
      expect(result.current.productForm.name).toBe('');
      expect(result.current.productForm.price).toBe(0);
      expect(result.current.productForm.stock).toBe(0);
      expect(result.current.productForm.discounts).toEqual([]);

      // 값 세팅 확인
      act(() =>
        result.current.setProductForm({
          name: '제품2',
          price: 20000,
          stock: 104,
          discounts: [{ quantity: 50, rate: 0.4 }],
        })
      );
      expect(result.current.productForm.name).toBe('제품2');
      expect(result.current.productForm.price).toBe(20000);
      expect(result.current.productForm.stock).toBe(104);
      expect(result.current.productForm.discounts).toEqual([
        { quantity: 50, rate: 0.4 },
      ]);
    });

    test('useDiscountForm: 할인 추가 form', () => {
      const { result } = renderHook(() =>
        useDiscountForm({ quantity: 0, rate: 0 })
      );

      // 초기값 확인
      expect(result.current.discountForm).toEqual({ quantity: 0, rate: 0 });

      // quantity 업데이트 확인
      act(() => result.current.updateDiscountForm('quantity', 60));
      expect(result.current.discountForm.quantity).toBe(60);

      // rate 업데이트 확인
      act(() => result.current.updateDiscountForm('rate', 0.5));
      expect(result.current.discountForm.rate).toBe(0.5);

      // reset 확인
      act(() => result.current.resetDiscountForm());
      expect(result.current.discountForm).toEqual({ quantity: 0, rate: 0 });
    });

    test('useCouponForm: 할인 추가 form', () => {
      const { result } = renderHook(() =>
        useCouponForm({
          name: '',
          code: '',
          discountType: 'amount',
          discountValue: 0,
        })
      );

      // 초기값 확인
      expect(result.current.couponForm).toEqual({
        name: '',
        code: '',
        discountType: 'amount',
        discountValue: 0,
      });

      // name 업데이트 확인
      act(() => result.current.updateCouponForm('name', '쿠폰1'));
      expect(result.current.couponForm.name).toBe('쿠폰1');

      // code 업데이트 확인
      act(() => result.current.updateCouponForm('code', '쿠폰코드1'));
      expect(result.current.couponForm.code).toBe('쿠폰코드1');

      // discountType 업데이트 확인
      act(() => result.current.updateCouponForm('discountType', 'percentage'));
      expect(result.current.couponForm.discountType).toBe('percentage');

      // discountValue 업데이트 확인
      act(() => result.current.updateCouponForm('discountValue', 50));
      expect(result.current.couponForm.discountValue).toBe(50);

      // reset 확인
      act(() => result.current.resetCouponForm());
      expect(result.current.couponForm).toEqual({
        name: '',
        code: '',
        discountType: 'amount',
        discountValue: 0,
      });
    });

    test('useStock: 재고 최신화', () => {
      const { result } = renderHook(() => useStock(0));

      // 초기값 확인
      expect(result.current.stock).toEqual(0);

      // 재고 업데이트 확인
      const mockCartItems = [
        {
          product: {
            id: 'p1',
            name: '제품1',
            price: 10000,
            stock: 48,
            discounts: [],
          },
          quantity: 42,
        },
      ];
      const mockProduct = {
        id: 'p1',
        name: '제품1',
        price: 10000,
        stock: 48,
        discounts: [],
      };
      act(() => result.current.updateStock(mockCartItems, mockProduct));

      expect(result.current.stock).toEqual(6);
    });
  });
});
