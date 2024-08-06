import orderApi from "api/order";

import { atom, selector } from "recoil";
import { Cart } from "types/cart";
import { OrderType, PaymentType } from "types/order";
import { memberState } from "./member.state";

export const prepareCartState = selector<Cart>({
  key: "prepareCart",
  get: async ({ get }) => {
    const cart = get(cartState);
    const membership = await get(memberState);
    console.log("membership", membership);
    if (membership !== undefined && membership !== null) {
      let req = {
        ...cart,
        customerId: membership.membershipId,
        customerPhone: membership.phoneNumber,
        customerName: membership.fullname,
      };
      var res = await orderApi.prepareOrder(req);
      return res.data;
    } else {
      var res = await orderApi.prepareOrder(cart);
      return res.data;
    }
  },
});

// const { commonOrderType } = useProductContext();
export const cartState = atom<Cart>({
  key: "cart",
  default: {
    storeId: "",
    orderType: OrderType.DELIVERY,
    paymentType: PaymentType.CASH,
    productList: [],
    totalAmount: 0,
    shippingFee: 0,
    bonusPoint: 0,
    discountAmount: 0,
    finalAmount: 0,
    totalQuantity: 0,
    customerId: null,
    promotionList: [],
    promotionCode: null,
    brandCode: "VHGP",
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.productList.reduce(
      (total, item) => total + item.totalAmount,
      0
    );
  },
});
