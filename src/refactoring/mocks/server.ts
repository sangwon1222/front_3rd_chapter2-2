import { initialCoupons } from '@refactor/data/coupon';
import { initialProducts } from '@refactor/data/item';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Coupon, Product } from 'src/types';
import { afterAll, afterEach, beforeAll } from 'vitest';

let products: Product[] = [...initialProducts];
let coupons: Coupon[] = [...initialCoupons];

export const server = setupServer(
  // 모든 제품 정보 가져오기
  http.get('/api/products', () =>
    HttpResponse.json([...products], { status: 200 })
  ),

  // id로 제품 정보 가져오기
  http.get('/api/products:id', ({ params }) => {
    const { id } = params;
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex) {
      return HttpResponse.json({ ...products[productIndex] }, { status: 200 });
    } else {
      return HttpResponse.json(
        { error: '[products:id] Bad Request' },
        { status: 404 }
      );
    }
  }),

  // 제품 수정
  http.post('/api/update-product', async ({ request }) => {
    try {
      const newProduct = (await request.json()) as Product;
      const hasProduct = products.find((p) => p.id === newProduct.id);
      if (hasProduct) {
        products = products.map((p) =>
          p.id === newProduct.id ? newProduct : p
        );
      } else {
        products = [...products, newProduct];
      }
      return HttpResponse.json(products, { status: 200 });
    } catch (e) {
      return HttpResponse.json(
        {
          error: e + '  /  ' + '[update-product] Bad Request',
        },
        { status: 400 }
      );
    }
  }),

  // 제품 추가
  http.post('/api/add-product', async ({ request }) => {
    try {
      const requestData = (await request.json()) as Product;
      const newProduct = requestData;
      products = [...products, newProduct];
      return HttpResponse.json(products, { status: 200 });
    } catch (e) {
      return HttpResponse.json(
        { error: '[add-product] Bad Request' },
        { status: 400 }
      );
    }
  }),

  // 모든 쿠폰 정보 가져오기
  http.get('/api/coupons', () =>
    HttpResponse.json([...coupons], { status: 200 })
  ),

  // 쿠폰 수정
  http.post('/api/add-coupon', async ({ request }) => {
    try {
      const newCoupon = (await request.json()) as Coupon;
      coupons = [...coupons, newCoupon];
      return HttpResponse.json(coupons, { status: 200 });
    } catch (e) {
      return HttpResponse.json(
        { error: '[add-coupon] Bad Request' },
        { status: 400 }
      );
    }
  }),

  // 쿠폰 삭제
  http.delete('/api/remove-coupon', async ({ request }) => {
    try {
      const requestCoupon = (await request.json()) as Coupon;
      const updatedCoupon = coupons.filter(
        (coupon: Coupon) => coupon.name !== requestCoupon.name
      );
      coupons = updatedCoupon;
      return HttpResponse.json(coupons, { status: 200 });
    } catch (e) {
      return HttpResponse.json(
        { error: '[remove-coupon] Bad Request' },
        { status: 400 }
      );
    }
  })
);

// 테스트 전에 서버 시작
beforeAll(() => server.listen());

// 각 테스트 후 핸들러 초기화
afterEach(() => {
  products = [...initialProducts];
  coupons = [...initialCoupons];
  server.resetHandlers();
});

// 테스트가 끝난 후 서버 종료
afterAll(() => server.close());
