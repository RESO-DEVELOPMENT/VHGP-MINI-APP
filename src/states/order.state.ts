import orderApi from "api/order";
import { atom, selector, selectorFamily } from "recoil";
import { memberState } from "./user.state";
import { OrderDetails } from "types/order";

export const requestOrderTransactionTriesState = atom({
  key: "requestOrderTransactionTries",
  default: 0,
});

export const listOrderState = selector({
  key: "listOrder",
  get: async ({ get }) => {
    const request = get(requestOrderTransactionTriesState);
    if (request) {
      const member = get(memberState);
      if (member !== null) {
        const listOrder = await orderApi.getListOrder(member?.id ?? "", {
          page: 1,
          size: 100,
        });
        return listOrder.data.items;
      }
    }
    return [];
  },
});

export const getOrderDetailstate = selectorFamily<OrderDetails, string>({
  key: "orderDetails",
  get: (orderId) => async () => {
    const order = await orderApi.getOrderDetails(orderId);
    return order.data;
  },
});
