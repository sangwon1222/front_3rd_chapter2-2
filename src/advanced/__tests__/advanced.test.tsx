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
    describe('장바구니 페이지', () => {
      beforeEach(() => {
        // Given: 장바구니 페이지가 렌더링되고 상품들이 존재할 때
        render(<CartPage products={mockProducts} coupons={mockCoupons} />);
      });

      test('상품 정보를 표시한다.', () => {
        // When: 상품들을 화면에서 조회할 때
        const product1 = screen.getByTestId('product-p1');
        const product2 = screen.getByTestId('product-p2');
        const product3 = screen.getByTestId('product-p3');

        // Then: 각 상품의 이름, 가격, 재고 정보를 확인할 수 있다.
        expect(product1).toHaveTextContent('상품1');
        expect(product1).toHaveTextContent('10,000원');
        expect(product1).toHaveTextContent('재고: 20개');
        expect(product2).toHaveTextContent('상품2');
        expect(product2).toHaveTextContent('20,000원');
        expect(product2).toHaveTextContent('재고: 20개');
        expect(product3).toHaveTextContent('상품3');
        expect(product3).toHaveTextContent('30,000원');
        expect(product3).toHaveTextContent('재고: 20개');
      });

      test('할인 정보를 표시한다.', () => {
        // Then: 할인 정보를 확인할 수 있다.
        expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();
      });

      test('상품1을 장바구니에 추가하고 결제 금액을 계산한다.', () => {
        // Given: 장바구니 페이지가 렌더링되고 상품이 있을 때
        const product1 = screen.getByTestId('product-p1');
        const addToCartButton = within(product1).getByText('장바구니에 추가');

        // When: 상품1을 장바구니에 추가할 때
        fireEvent.click(addToCartButton);

        // Then: 상품 금액과 할인 금액, 최종 결제 금액이 올바르게 표시된다.
        expect(screen.getByText('상품 금액: 10,000원')).toBeInTheDocument();
        expect(screen.getByText('할인 금액: 0원')).toBeInTheDocument();
        expect(
          screen.getByText('최종 결제 금액: 10,000원')
        ).toBeInTheDocument();
      });

      describe('상품1을 장바구니에 재고수량만큼 넣었을 때 품절 / 할인 금액 확인', () => {
        beforeEach(() => {
          // Given: 장바구니 페이지가 렌더링되고 상품1의 재고가 20개일 때
          const product1 = screen.getByTestId('product-p1');
          const addToCartButton = within(product1).getByText('장바구니에 추가');

          // When: 상품1을 재고 수량 만큼 모두 장바구니에 추가했을 때
          for (let i = 0; i < 20; i++) {
            fireEvent.click(addToCartButton);
          }
        });

        test('상품1을 품절 상태로 만든 후, 더 이상 추가되지 않도록 한다.', () => {
          const product1 = screen.getByTestId('product-p1');

          // Then: 버튼이 품절로 바뀌고 disabled 되어야 한다.
          const addToCartButton = screen.getByRole('button', { name: '품절' });
          expect(addToCartButton).toBeDisabled();

          // Then: 재고가 0개로 표시된다.
          expect(product1).toHaveTextContent('재고: 0개');
          // Then: 재고가 없으면 업데이트되지 않는다.
          fireEvent.click(addToCartButton);
          expect(product1).toHaveTextContent('재고: 0개');
        });

        test('상품1이 20개일 때 할인 금액을 정확히 계산한다.', () => {
          // Then: 10% 할인율이 적용된다.
          expect(screen.getByText('상품 금액: 200,000원')).toBeInTheDocument();
          expect(screen.getByText('할인 금액: 20,000원')).toBeInTheDocument();
          expect(
            screen.getByText('최종 결제 금액: 180,000원')
          ).toBeInTheDocument();
        });
      });

      describe('각 상품 10개씩 장바구니에 넣었을 때, 총 할인금액 / 쿠폰 할인금액 확인', () => {
        beforeEach(() => {
          // Given: 장바구니 페이지가 렌더링되고 각 상품의 재고가 10개 이상일 때
          const product1 = screen.getByTestId('product-p1');
          const addToCartButton1 =
            within(product1).getByText('장바구니에 추가');
          const product2 = screen.getByTestId('product-p2');
          const addToCartButton2 =
            within(product2).getByText('장바구니에 추가');
          const product3 = screen.getByTestId('product-p3');
          const addToCartButton3 =
            within(product3).getByText('장바구니에 추가');

          // When: 각 상품을 10개 장바구니에 추가할 때
          for (let i = 0; i < 10; i++) {
            fireEvent.click(addToCartButton1);
            fireEvent.click(addToCartButton2);
            fireEvent.click(addToCartButton3);
          }
        });

        test('각 상품 10개 이상일 때 할인 금액을 정확히 계산한다.', () => {
          // Given: 장바구니 페이지가 렌더링되고 각 상품의 재고가 10개 이상일 때
          // When: 각 상품을 10개 장바구니에 추가할 때

          // Then: 각 상품 가격의 10% 할인율이 적용된다.
          // p1 = 10000 * 10 * (1 - 0.1) = 90000
          // p2 = 20000 * 10 * (1 - 0.15) = 170000
          // p3 = 30000 * 10 * (1 - 0.2) = 240000
          expect(screen.getByText('상품 금액: 600,000원')).toBeInTheDocument();
          expect(screen.getByText('할인 금액: 100,000원')).toBeInTheDocument();
          expect(
            screen.getByText('최종 결제 금액: 500,000원')
          ).toBeInTheDocument();
        });

        test.each([
          [
            {
              couponValue: '0',
              expectedDiscount: '105,000원',
              expectedPrice: '495,000원',
            },
          ],
          [
            {
              couponValue: '1',
              expectedDiscount: '150,000원',
              expectedPrice: '450,000원',
            },
          ],
        ])(
          '쿠폰을 적용했을 때 할인 금액을 정확히 계산한다.',
          ({ couponValue, expectedDiscount, expectedPrice }) => {
            // Given: 장바구니 페이지가 렌더링되고 각 상품의 재고가 10개 이상일 때

            // When: 각 상품을 10개 장바구니에 추가할 때
            // When: 할인 쿠폰 선택했을 때
            const couponSelect = screen.getByRole('combobox');
            fireEvent.change(couponSelect, { target: { value: couponValue } });

            // Then: 할인 쿠폰의 할인율이 적용된다.
            expect(
              screen.getByText('상품 금액: 600,000원')
            ).toBeInTheDocument();
            expect(
              screen.getByText(`할인 금액: ${expectedDiscount}`)
            ).toBeInTheDocument();
            expect(
              screen.getByText(`최종 결제 금액: ${expectedPrice}`)
            ).toBeInTheDocument();
          }
        );
      });
    });

    describe('관리자 페이지 테스트', () => {
      beforeEach(() => render(<TestAdminPage />));

      const addProduct = (name: string, price: string, stock: string) => {
        // 새로운 상품 추가
        fireEvent.click(screen.getByText('새 상품 추가'));

        fireEvent.change(screen.getByLabelText('상품명'), {
          target: { value: name },
        });
        fireEvent.change(screen.getByLabelText('가격'), {
          target: { value: price },
        });
        fireEvent.change(screen.getByLabelText('재고'), {
          target: { value: stock },
        });

        fireEvent.click(screen.getByText('추가'));
      };

      test('새로운 상품 추가', () => {
        // GIVEN: 새로운 상품을 추가했을 때,
        addProduct('상품4', '15000', '30');

        // WHEN: 새로운 상품이 렌더링 되면
        const $product4 = screen.getByTestId('product-4');

        // THEN: 새로운 상품 정보를 확인할 수 있다.
        expect($product4).toHaveTextContent('상품4');
        expect($product4).toHaveTextContent('15000원');
        expect($product4).toHaveTextContent('재고: 30');
      });

      describe('상품 정보 수정', () => {
        const modifyProduct = (button: HTMLElement) => {
          // GIVEN: 상품1을 수정할 때,
          fireEvent.click(button);
          fireEvent.click(within(button).getByTestId('toggle-button'));
          fireEvent.click(within(button).getByTestId('modify-button'));
        };

        test.each([
          {
            index: 0,
            testId: 'product-1',
            name: '수정된 상품1',
            price: '15000',
            stock: '15',
          },
          {
            index: 1,
            testId: 'product-2',
            name: '수정된 상품2',
            price: '5000',
            stock: '5',
          },
          {
            index: 2,
            testId: 'product-3',
            name: '수정된 상품3',
            price: '8000',
            stock: '8',
          },
        ])(
          '상품 [ 이름, 가격, 재고 ] 수정',
          ({ index, testId, name, price, stock }) => {
            // GIVEN: 상품 정보를 수정할 때,
            const $productButton = screen.getByTestId(testId);
            modifyProduct($productButton);

            // WHEN: 상품의 정보를 수정했을 때
            act(() => {
              fireEvent.change(
                within($productButton).getByDisplayValue(
                  mockProducts[index].stock.toString()
                ),
                {
                  target: { value: stock },
                }
              );
              fireEvent.change(
                within($productButton).getByDisplayValue(
                  mockProducts[index].price.toString()
                ),
                {
                  target: { value: price },
                }
              );
              fireEvent.change(
                within($productButton).getByDisplayValue(
                  mockProducts[index].name
                ),
                {
                  target: { value: name },
                }
              );
            });
            fireEvent.click(within($productButton).getByText('수정 완료'));

            // THEN: 수정된 상품 정보를 확인할 수 있다.
            expect($productButton).toHaveTextContent(name);
            expect($productButton).toHaveTextContent(price + '원');
            expect($productButton).toHaveTextContent('재고: ' + stock);
          }
        );

        test('상품 할인 추가 및 삭제', () => {
          // GIVEN: 상품 정보를 수정할 때,
          const $productButton = screen.getByTestId('product-1');
          modifyProduct($productButton);

          // WHEN: 상품1의 할인 정보를 추가했을 때
          act(() =>
            fireEvent.change(screen.getByPlaceholderText('수량'), {
              target: { value: '120' },
            })
          );
          act(() =>
            fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
              target: { value: '80' },
            })
          );
          fireEvent.click(screen.getByText('할인 추가'));

          // THEN: 수정된 상품 정보를 확인할 수 있다.
          expect(
            screen.queryByText('120개 이상 구매 시 80% 할인')
          ).toBeInTheDocument();

          // WHEN 할인 삭제할 때
          fireEvent.click(screen.getAllByText('삭제')[0]);

          // THEN: 수정된 상품 정보를 확인할 수 있다.
          expect(
            screen.queryByText('10개 이상 구매 시 10% 할인')
          ).not.toBeInTheDocument();
          expect(
            screen.queryByText('120개 이상 구매 시 80% 할인')
          ).toBeInTheDocument();
        });
      });

      test('쿠폰 추가', () => {
        // GIVEN: 쿠폰을 추가할 때
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

        // WHEN 새로운 쿠폰 정보가 렌더링 되면
        const $newCoupon = screen.getByTestId('coupon-3');

        // THEN: 새 쿠폰 정보를 확인할 수 있다.
        expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
      });
    });
  });

  describe('[api-mock] ', () => {
    describe('관리자 페이지', () => {
      beforeEach(() => render(<TestApiMockAdminPage />));

      const modifyProduct = (button: HTMLElement) => {
        // GIVEN: 상품1을 수정할 때,
        fireEvent.click(button);
        fireEvent.click(within(button).getByTestId('toggle-button'));
        fireEvent.click(within(button).getByTestId('modify-button'));
      };

      test('새로운 상품 추가 >', async () => {
        // GIVEN: 렌더링 되면
        await waitFor(() =>
          expect(screen.getByTestId('product-1')).toBeInTheDocument()
        );
        // WHEN: 새 상품 추가할 때
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

        // THEN 새 상품 정보를 확인할 수 있다.
        await waitFor(() =>
          expect(screen.getByTestId('product-4')).toBeInTheDocument()
        );
        const $product4 = screen.getByTestId('product-4');
        expect($product4).toHaveTextContent('상품4');
        expect($product4).toHaveTextContent('15000원');
        expect($product4).toHaveTextContent('재고: 30');
      });

      test('상품 수정 >', async () => {
        // GIVEN: 렌더링 되면
        await waitFor(() =>
          expect(screen.getByTestId('product-1')).toBeInTheDocument()
        );
        const $product1 = screen.getByTestId('product-1');
        modifyProduct($product1);

        // WHEN 상품 선택 및 수정
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

        await waitFor(() =>
          expect($product1).toHaveTextContent('수정된 상품1')
        );
        expect($product1).toHaveTextContent('12000원');
        expect($product1).toHaveTextContent('재고: 25');
      });

      test('상품 할인 추가 >', async () => {
        // GIVEN: 렌더링 되면
        await waitFor(() =>
          expect(screen.getByTestId('product-1')).toBeInTheDocument()
        );
        const $product1 = screen.getByTestId('product-1');
        modifyProduct($product1);

        // WHEN: 상품 할인율 추가
        act(() =>
          fireEvent.change(screen.getByPlaceholderText('수량'), {
            target: { value: '5' },
          })
        );
        act(() =>
          fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
            target: { value: '5' },
          })
        );
        fireEvent.click(screen.getByText('할인 추가'));

        // THEN: 추가된 할인정보를 확인할 수 있다.
        expect(
          screen.queryByText('5개 이상 구매 시 5% 할인')
        ).toBeInTheDocument();

        // WHEN: 할인 삭제했을 때
        fireEvent.click(screen.getAllByText('삭제')[0]);
        fireEvent.click(screen.getAllByText('삭제')[0]);

        // THEN: 삭제된 할인정보는 제거된다.
        expect(
          screen.queryByText('10개 이상 구매 시 10% 할인')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('20개 이상 구매 시 20% 할인')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('5개 이상 구매 시 5% 할인')
        ).toBeInTheDocument();
      });

      test('쿠폰 추가 >', async () => {
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
    });

    describe('장바구니 페이지', () => {
      beforeEach(() => render(<TestApiMockCartPage />));

      test('상품 정보를 표시한다.', async () => {
        // Given 렌더링이 되면
        await waitFor(() =>
          expect(screen.getByTestId('product-p1')).toBeInTheDocument()
        );

        // When: 상품들을 화면에서 조회할 때
        const product1 = screen.getByTestId('product-p1');
        const product2 = screen.getByTestId('product-p2');
        const product3 = screen.getByTestId('product-p3');

        // Then: 각 상품의 이름, 가격, 재고 정보를 확인할 수 있다.
        expect(product1).toHaveTextContent('상품1');
        expect(product1).toHaveTextContent('10,000원');
        expect(product1).toHaveTextContent('재고: 20개');
        expect(product2).toHaveTextContent('상품2');
        expect(product2).toHaveTextContent('20,000원');
        expect(product2).toHaveTextContent('재고: 20개');
        expect(product3).toHaveTextContent('상품3');
        expect(product3).toHaveTextContent('30,000원');
        expect(product3).toHaveTextContent('재고: 20개');
      });

      test('할인 정보를 표시한다.', async () => {
        // Given 렌더링이 되면
        await waitFor(() =>
          expect(screen.getByTestId('product-p1')).toBeInTheDocument()
        );

        // Then: 할인 정보를 확인할 수 있다.
        expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();
      });

      test('등급 할인', async () => {
        // GIVEN: 렌더링이 되면
        await waitFor(() =>
          expect(screen.getByTestId('product-p1')).toBeInTheDocument()
        );
        const product1 = screen.getByTestId('product-p1');
        await waitFor(() =>
          expect(
            within(product1).getByText('장바구니에 추가')
          ).toBeInTheDocument()
        );
        const addToCartButton = within(product1).getByText('장바구니에 추가');

        // WHEN: 상품1을 장바구니에 10개 넣었을 때
        for (let i = 0; i < 10; i++) {
          fireEvent.click(addToCartButton);
        }

        // THEN: 등급 할인된 금액 정보를 확인할 수 있다.
        const orderSummery = screen.getByTestId('order-summary');
        expect(orderSummery).toHaveTextContent('[일반회원]: 3% 등급 추가 할인');
        expect(orderSummery).toHaveTextContent('최종 결제 금액: 87,300원');
      });
    });
  });

  describe('[localStorage] ', () => {
    beforeEach(() => localStorage.clear());

    describe('관리자 페이지', () => {
      beforeEach(() => render(<TestLocalStorageAdminPage />));

      const modifyProduct = (button: HTMLElement) => {
        // GIVEN: 상품1을 수정할 때,
        fireEvent.click(button);
        fireEvent.click(within(button).getByTestId('toggle-button'));
        fireEvent.click(within(button).getByTestId('modify-button'));
      };

      test('새로운 상품 추가', () => {
        // GIVEN: 렌더링이 됐을 때
        expect(screen.getByTestId('product-1')).toBeInTheDocument();

        // WHEN: 새로운 상품을 추가 했을 때
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

        // THEN: 새로운 상품 정보를 확인할 수 있다.
        const $product4 = screen.getByTestId('product-4');
        expect($product4).toHaveTextContent('상품4');
        expect($product4).toHaveTextContent('15000원');
        expect($product4).toHaveTextContent('재고: 30');
      });

      test('상품 수정', () => {
        // GIVEN: 렌더링이 됐을 때
        expect(screen.getByTestId('product-1')).toBeInTheDocument();
        const $product1 = screen.getByTestId('product-1');

        // WHEN: 상품정보를 수정 했을 때
        modifyProduct($product1);
        fireEvent.change(within($product1).getByDisplayValue('20'), {
          target: { value: '25' },
        });
        fireEvent.change(within($product1).getByDisplayValue('10000'), {
          target: { value: '12000' },
        });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), {
          target: { value: '수정된 상품1' },
        });
        fireEvent.click(within($product1).getByText('수정 완료'));

        // THEN: 수정된 상품 정보를 확인할 수 있다.
        expect($product1).toHaveTextContent('수정된 상품1');
        expect($product1).toHaveTextContent('12000원');
        expect($product1).toHaveTextContent('재고: 25');
      });

      test('상품 할인 추가 및 삭제', () => {
        // GIVEN: 렌더링이 됐을 때
        expect(screen.getByTestId('product-1')).toBeInTheDocument();
        const $product1 = screen.getByTestId('product-1');

        // WHEN: 상품 정보에 할인율을 추가 했을 때
        modifyProduct($product1);
        act(() =>
          fireEvent.change(screen.getByPlaceholderText('수량'), {
            target: { value: '5' },
          })
        );
        act(() =>
          fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
            target: { value: '5' },
          })
        );
        fireEvent.click(within($product1).getByText('할인 추가'));

        // THEN: 추가된 할인 정보를 확인할 수 있다.
        expect(
          screen.queryByText('5개 이상 구매 시 5% 할인')
        ).toBeInTheDocument();

        // WHEN: 할인 삭제했을 때
        fireEvent.click(screen.getAllByText('삭제')[0]);

        // THEN: 삭제된 할인 정보는 제거된다.
        expect(
          screen.queryByText('10개 이상 구매 시 10% 할인')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('5개 이상 구매 시 5% 할인')
        ).toBeInTheDocument();
      });

      test('쿠폰 추가', () => {
        // GIVEN: 렌더링이 됐을 때
        expect(screen.getByTestId('product-1')).toBeInTheDocument();

        // WHEN: 쿠폰을 추가 했을 때
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

        // THEN: 추가된 쿠폰 정보를 확인할 수 있다.
        expect(screen.getByTestId('coupon-3')).toBeInTheDocument();
        const $newCoupon = screen.getByTestId('coupon-3');
        expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
      });
    });

    describe('장바구니 페이지', () => {
      beforeEach(() => render(<TestStorageCartPage />));

      test('등급 할인', () => {
        // GIVEN: 렌더링이 되면
        expect(screen.getByTestId('product-p1')).toBeInTheDocument();

        // WHEN: 상품1을 10개 장바구니에 넣었을 때
        const $product1 = screen.getByTestId('product-p1');
        const addToCartBtn = within($product1).getByText('장바구니에 추가');

        for (let i = 0; i < 10; i++) {
          fireEvent.click(addToCartBtn);
        }

        // THEN: 등급 할인 적용된 정보를 확인할 수 있다.
        const orderSummery = screen.getByTestId('order-summary');
        expect(orderSummery).toHaveTextContent('[일반회원]: 3% 등급 추가 할인');
        expect(orderSummery).toHaveTextContent('최종 결제 금액: 87,300원');
      });
    });
  });

  describe('[utils] 함수 테스트', () => {
    const mockCouponOptions = [
      {
        coupons: [
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
        ],
        expectedOptions: [
          { label: '쿠폰 선택', value: -1 },
          { label: 'CODE1 - 1000원', value: 0 },
          { label: 'CODE2 - 10%', value: 1 },
        ],
      },
      {
        coupons: [
          {
            name: 'CODE3',
            code: 'CODE3',
            discountType: 'amount',
            discountValue: 500,
          },
        ],
        expectedOptions: [
          { label: '쿠폰 선택', value: -1 },
          { label: 'CODE3 - 500원', value: 0 },
        ],
      },
    ] as {
      coupons: Coupon[];
      expectedOptions: { label: string; value: number }[];
    }[];

    describe.each(mockCouponOptions)(
      'formatCouponOptions',
      ({ coupons, expectedOptions }) => {
        test(`쿠폰 옵션을 포함한 콤보박스를 올바르게 생성한다. - ${coupons.map(({ name }) => name).join(',')}`, () => {
          // THEN: 콤보박스 형식으로 배열을 반환한다.
          expect(formatCouponOptions(coupons)).toStrictEqual(expectedOptions);
        });
      }
    );

    test('formatCouponLabel - 할인 종류에 따라 금액 또는 비율을 올바르게 형식화한다', () => {
      expect(formatCouponLabel('amount', 5000)).toBe('5000원');
      expect(formatCouponLabel('percentage', 10)).toBe('10%');
    });

    const mockCouponData = [
      {
        name: 'COUPON1',
        code: 'COUPON1',
        discountType: 'amount',
        discountValue: 5000,
        originalPrice: 10000,
        expectPrice: 5000,
      },
      {
        name: 'COUPON2',
        code: 'COUPON2',
        discountType: 'percentage',
        discountValue: 10,
        originalPrice: 10000,
        expectPrice: 9000,
      },
    ] as (Coupon & { originalPrice: number; expectPrice: number })[];

    describe.each(mockCouponData)(
      'getApplyCouponPrice',
      ({
        name,
        code,
        discountType,
        discountValue,
        originalPrice,
        expectPrice,
      }) => {
        test(`${name}: ${originalPrice}원에서 ${discountValue}${discountType === 'amount' ? '원' : '%'} 할인 시 ${expectPrice}원을 반환한다`, () => {
          // THEN: 원래 가격에 할인이 적용된 가격을 반환한다.
          expect(
            getApplyCouponPrice(originalPrice, {
              name,
              code,
              discountType,
              discountValue,
            })
          ).toBe(expectPrice);
        });
      }
    );

    describe.each([
      { percentage: 0.2, expectValue: '20' },
      { percentage: 0.75, expectValue: '75' },
    ])(
      'convertPercentage - 소수점을 퍼센티지 문자열로 변환해준다.',
      ({ percentage, expectValue }) => {
        test(`${percentage} => ${expectValue} 반환`, () => {
          // THEN: 케이스에 맞는 퍼센티지 문자열을 반환한다.
          expect(convertPercentage(percentage)).toBe(expectValue);
        });
      }
    );

    test('debounce', async () => {
      // GIVEN: 0으로 초기화된 testNum 변수가 있을 때
      let testNum = 0;

      // WHEN: testNum +1 해주는 함수를 10번 호출했을 때
      const testFc = debounce(() => (testNum += 1), 100);
      for (let i = 0; i < 100; i++) {
        testFc();
      }
      // WHEN: debounce delay 시간(100ms)이 경과했을 때
      await new Promise((r) => setTimeout(r, 100));

      // THEN: 함수 호출이 한번만 된걸 확인할 수 있다.
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
    describe('useApiMockCoupon: 쿠폰 mock api', async () => {
      test('초기화 확인', async () => {
        // GIVEN: api 호출했을 때
        const { result } = renderHook(() => useApiMockCoupon());
        expect(result.current.coupons).toEqual([]);

        // WHEN: api 결과값이 왔을 때
        await waitFor(() => {
          expect(result.current.coupons).not.toEqual([]);
        });

        // THEN: api 결과값을 확인할 수 있다.
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

      test('쿠폰 추가', async () => {
        // GIVEN: api 결과값이 오고 렌더링 됐을 때
        const { result } = renderHook(() => useApiMockCoupon());
        expect(result.current.coupons).toEqual([]);
        await waitFor(() => {
          expect(result.current.coupons).not.toEqual([]);
        });

        // WHEN: 쿠폰을 추가 했을 때
        act(() =>
          result.current.addCoupon({
            name: '새 쿠폰',
            code: 'NEW10',
            discountType: 'percentage',
            discountValue: 10,
          })
        );

        // THEN: 새 쿠폰 정보를 확인할 수 있다.
        await waitFor(() =>
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
          ])
        );

        // WHEN: 쿠폰을 제거했을 때
        act(() =>
          result.current.removeCoupon({
            name: '새 쿠폰',
            code: 'NEW10',
            discountType: 'percentage',
            discountValue: 10,
          })
        );

        // THEN: 쿠폰 정보는 제거된다.
        await waitFor(() =>
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
          ])
        );
      });
    });

    describe('useApiMockProduct: 제품 mock api', async () => {
      test('초기화 확인', async () => {
        // GIVEN: 렌더링 됐을 때
        const { result } = renderHook(() => useApiMockProduct());
        // WHEN: api 결과값이 왔을 때
        await waitFor(() => {
          // THEN: api 값을 확인할 수 있다.
          expect(result.current.products).toEqual(initialProducts);
        });
      });

      test('제품 추가 및 삭제', async () => {
        const { result } = renderHook(() => useApiMockProduct());
        // GIVEN: 렌더링 됐을 때
        await waitFor(() => {
          expect(result.current.products).toEqual(initialProducts);
        });

        // WHEN: 제품을 추가 했을 때
        result.current.addProduct({
          id: 'p4',
          name: '상품4',
          price: 40000,
          stock: 40,
          discounts: [{ quantity: 20, rate: 0.15 }],
        });

        // THEN: 추가된 제품 정보를 확인할 수 있다.
        await waitFor(() => {
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
        });

        // WHEN: 제품을 삭제했을 때
        act(() => result.current.removeProduct('p4'));

        // THEN: 삭제된 제품은 확인할 수 없다.
        await waitFor(() =>
          expect(result.current.products).toEqual(initialProducts)
        );
      });
    });

    describe('useProductForm: 제품추가 form', () => {
      test('product form 이름, 가격, 재고 수정', async () => {
        // GIVEN: 초기값이 있는 useProductForm 호출 했을 때
        const { result } = renderHook(() =>
          useProductForm({ ...initialNewProductForm })
        );
        expect(result.current.productForm.name).toBe('');
        expect(result.current.productForm.price).toBe(0);
        expect(result.current.productForm.stock).toBe(0);

        // WHEN: form 값들을 업데이트 했을 때
        act(() => result.current.updateProductForm('name', '제품1'));
        act(() => result.current.updateProductForm('price', 10000));
        act(() => result.current.updateProductForm('stock', 20));

        // THEN: 업데이트된 form 값을 확인할 수 있다.
        expect(result.current.productForm.name).toBe('제품1');
        expect(result.current.productForm.price).toBe(10000);
        expect(result.current.productForm.stock).toBe(20);
      });

      test('product form 할인정보 수정', async () => {
        // GIVEN: hook 호출 했을 때
        const { result } = renderHook(() =>
          useProductForm({ ...initialNewProductForm })
        );
        expect(result.current.productForm.name).toBe('');
        expect(result.current.productForm.price).toBe(0);
        expect(result.current.productForm.stock).toBe(0);

        // WHEN: 할인정보 값을 추가 했을 때
        act(() => result.current.addDiscount({ quantity: 10, rate: 20 }));
        act(() => result.current.addDiscount({ quantity: 20, rate: 40 }));

        // THEN: 추가된 할인정보를 확인할 수 있다.
        expect(result.current.productForm.discounts).toEqual([
          { quantity: 10, rate: 20 },
          { quantity: 20, rate: 40 },
        ]);

        // WHEN: 할인정보를 삭제 했을 때
        act(() => result.current.removeDiscount(1));

        // THEN: 삭제된 할인정보는 확인할 수 없다.
        expect(result.current.productForm.discounts).toEqual([
          { quantity: 10, rate: 20 },
        ]);
      });

      test('form reset 확인', async () => {
        // GIVEN: 초기값이 있는 useProductForm 호출 했을 때
        const { result } = renderHook(() =>
          useProductForm({ ...initialNewProductForm })
        );
        // WHEN: form값을 reset 했을 때
        act(() => result.current.resetProductForm());

        // THEN: reset값을 확인 할 수 있다.
        expect(result.current.productForm.name).toBe('');
        expect(result.current.productForm.price).toBe(0);
        expect(result.current.productForm.stock).toBe(0);
        expect(result.current.productForm.discounts).toEqual([]);
      });

      test('form set 확인', async () => {
        // GIVEN: 초기값이 있는 useProductForm 호출 했을 때
        const { result } = renderHook(() =>
          useProductForm({ ...initialNewProductForm })
        );
        // WHEN: form값을 세팅 했을 때
        act(() =>
          result.current.setProductForm({
            name: '제품2',
            price: 20000,
            stock: 104,
            discounts: [{ quantity: 50, rate: 0.4 }],
          })
        );

        // THEN: 세팅된 값을 확인 할 수 있다.
        expect(result.current.productForm.name).toBe('제품2');
        expect(result.current.productForm.price).toBe(20000);
        expect(result.current.productForm.stock).toBe(104);
        expect(result.current.productForm.discounts).toEqual([
          { quantity: 50, rate: 0.4 },
        ]);
      });
    });

    test('useDiscountForm: 할인 추가 form', () => {
      // GIVEN: 초기값이 있는 useDiscountForm 호출했을 때
      const { result } = renderHook(() =>
        useDiscountForm({ quantity: 0, rate: 0 })
      );

      // WHEN: quantity, rate값을 수정했을 때
      act(() => result.current.updateDiscountForm('quantity', 60));
      act(() => result.current.updateDiscountForm('rate', 0.5));

      // THEN: 수정된 값을 확인할 수 있다.
      expect(result.current.discountForm.quantity).toBe(60);
      expect(result.current.discountForm.rate).toBe(0.5);

      // WHEN: 할인정보를 reset 했을 때
      act(() => result.current.resetDiscountForm());

      // THEN: reset된 값을 확인할 수 있다.
      expect(result.current.discountForm).toEqual({ quantity: 0, rate: 0 });
    });

    test('useCouponForm: 할인 추가 form', () => {
      // GIVEN: 초기값이 있는 useCouponForm을 호출했을 때
      const { result } = renderHook(() =>
        useCouponForm({
          name: '',
          code: '',
          discountType: 'amount',
          discountValue: 0,
        })
      );

      // WHEN: 각 값을 수정했을 때
      act(() => result.current.updateCouponForm('name', '쿠폰1'));
      act(() => result.current.updateCouponForm('code', '쿠폰코드1'));
      act(() => result.current.updateCouponForm('discountType', 'percentage'));
      act(() => result.current.updateCouponForm('discountValue', 50));

      // THEN: 수정된 값을 확인할 수 있다.
      expect(result.current.couponForm.name).toBe('쿠폰1');
      expect(result.current.couponForm.code).toBe('쿠폰코드1');
      expect(result.current.couponForm.discountType).toBe('percentage');
      expect(result.current.couponForm.discountValue).toBe(50);

      // WHEN: reset 했을 때
      act(() => result.current.resetCouponForm());

      // THEN: reset한 값을 확인할 수 있다.
      expect(result.current.couponForm).toEqual({
        name: '',
        code: '',
        discountType: 'amount',
        discountValue: 0,
      });
    });

    test('useStock: 재고 최신화', () => {
      // GIVEN: 초기 재고값을 0으로 시작하는 useStock 호출
      const { result } = renderHook(() => useStock(0));

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

      // WHEN: 상품 정보와 장바구니 아이템을 이용해 재고를 업데이트했을 때
      act(() => result.current.updateStock(mockCartItems, mockProduct));

      // THEN: 재고가 올바르게 최신화되어 6으로 업데이트 된다.
      expect(result.current.stock).toEqual(6);
    });
  });
});
