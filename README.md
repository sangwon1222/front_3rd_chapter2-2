## 기능

#### Context Api

1. admin 권한: 토글 장바구니 | 관리자

#### Data

1. 제품 items
   1. id :                      string                  "제품 고유번호"
   2. name:                     string                  "상품명"
   3. price:                    number                  "가격"
   4. stock:                    number                  "재고"
   5. discounts: {[key: 'quantity'|'rate']: number}[]   "최소 수량 , 할인율"

2. 쿠폰 coupons
   1. name:                     string                "쿠폰 이름"
   2. code:                     string                "할인 코드"
   3. discountType:      'percent' | 'amount'         "할인 타입 ( 할인율 / 금액 )"
   4. discountValue:            number                "할인 양"


#### Page

1. 관리자

   - 상품 카드
     - 상품 관리
     - 새 상품 추가 버튼
     - 상품 정보 리스트
         - 상품 카드 (아코디언)[items]
            - 제목: {name} - {price}원 (재고: {stock})
            - 상품명: {name} label 과 input[type='text']
            - 가격: {price} input[type='number']
            - 재고: {stock} input[type='number']
            - 할인 정보: '할인 정보' 리스트
            - {discounts.quantity}개 이상 구매 시 {rate}% 할인
              .
              .
              .
   - 쿠폰 [coupons]

     - 쿠폰 추가 Form
         - 제목: 쿠폰 관리
         - 쿠폰이름:{name} input[type='text']
         - 쿠폰코드: input[type='text']
         - 할인율: combobox , 할인양 input[type='text']
         - 쿠폰 추가 버튼

     - 현재 쿠폰 목록
         - {name} ({discountType}):{discountValue}{단위} 할인
            .
            .
            .

2. 카트
   - 상품 목록
       - 상품 카드 [items]
           - 상품명: {string} name , 가격: {number} price
           - 재고: 재고 {stock}개 최대 {discounts배열 중 rate 최대값}% 할인
           - discounts 배열 리스트
           - 장바구니 추가 버튼
   - 장바구니 내역
       - 쿠폰 적용 [coupons]
           - 콤보 박스 [쿠폰 리스트]
           - 라벨: 적용된 쿠폰 {name} {discountType} {discountValue}{원 / %} 할인
     - 주문 요약
           - 상품 금액 : sum price
           - 할인 금액 : sum coupon discount amount
           - 최종 결제 금액: 상품 금액 - 할인 금액

## FLOW

App
  Contetx Api { isAdmin: Boolean, toggleAdmin }

Navigation
  페이지에 따라 버튼 글 변화 [ 관리자 페이지로 / 장바구니 페이지로 ]

Page
  AdminPage
    ItemList
      Button
      ItemLabel
        DiscountLabel
        Button
    CouponManage
      Input
      DiscountInput
      Button
      CurrentCouponList
        CouponLabel

  CartPage
    ItemList
      Item
        TextLabel
        DiscountLabel
        Button

    CartHistory
      ApplyCoupon
        ComboBox

      OrderSummary
        



