import orderApi from "api/order";
import { atom, selector, selectorFamily } from "recoil";
import { memberState } from "./member.state";
import { OrderDetails, PaymentType, orderStatusCart } from "types/order";
import { Payment } from "types/payment";
import { Order, OrderType, PaymentStatus } from "types/order";

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
        const listOrder = await orderApi.getListOrder(
          member.membershipId || "67c3bab8-91bb-4828-9f3a-d87c87957209",
          {
            page: 1,
            size: 100,
          }
        );
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

export const setOrder = selectorFamily<
  void,
  { orderStatusCart: string; storeId: string; orderId: string }
>({
  key: "orderStatus",
  get: () => () => {
    return;
  },
  set: (params) => async () => {
    const { orderStatusCart, storeId, orderId } = params;
    const parsedOrderStatusCart: orderStatusCart = JSON.parse(orderStatusCart);
    await orderApi.setOrderStatus(parsedOrderStatusCart, storeId, orderId);
  },
});

export const orderStatusState = atom<Order[]>({
  key: "orderStatus",
  default: [
    {
      type: OrderType.DELIVERY,
      name: "Giao hàng",
    },
    {
      type: OrderType.TAKE_AWAY,
      name: "Mang đi",
    },
    {
      type: OrderType.EATIN,
      name: "Dùng ngay",
    },
  ],
});

export const paymentTypeState = atom<Payment[]>({
  key: "paymentType",
  default: [
    {
      type: PaymentType.BANKING,
      name: "Ngân hàng",
    },
    {
      type: PaymentType.CASH,
      name: "Tiền mặt",
    },
  ],
});

export const selectLocationState = atom<string>({
  key: "selectLocationState",
  default: "",
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const addressState = atom({
  key: "address",
  default: "",
});

export const deleteOrderIdState = atom({
  key: "deleteOrderId",
  default: "",
});
