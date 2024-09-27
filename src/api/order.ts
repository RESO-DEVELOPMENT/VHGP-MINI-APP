import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { Cart } from "types/cart";
import { OrderDetails, OrderPreview, orderStatusCart } from "types/order";
import { Transaction } from "types/transaction";
import axios from "axios";

const getListOrder = (params?: any) =>
  requestWebAdmin.get<BaseReponse<OrderPreview>>(
    `users/orders/by-phone-and-brand`,
    {
      params,
    }
  );
const getOrderDetails = (orderId: string, params?: any) =>
  requestWebAdmin.get<OrderDetails>(`users/orders/${orderId}`, {
    params,
  });

const cancleOreder = (orderId: string, order: orderStatusCart) =>
  requestWebAdmin.patch<OrderDetails>(`users/orders/${orderId}`, order);

const getListTransactions = (id: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<Transaction>>(`users/${id}/transactions`, {
    params,
  });
const createNewOrder = (cart: Cart) =>
  requestWebAdmin.post("/users/order", cart);

const prepareOrder = (cart: Cart) =>
  requestWebAdmin.post<Cart>("/orders/prepare", cart);

// const setOrderStatusToCanceled = (
//   orderStatusCart: orderStatusCart,
//   storeId: string,
//   orderId: string,
//   token: string
// ) => {
// const requestWebAdmin = axios.create({
//   baseURL: `https://admin-test.reso.vn/api/v1/`,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
// requestWebAdmin
//   .patch<orderStatusCart>(
//     `/stores/${storeId}/orders/${orderId}`,
//     orderStatusCart
//   )
//   .then((response) => {
//     console.log("Order status updated successfully", response.data);
//   })
//   .catch((error) => {
//     console.error("Error updating order status", error);
//   });
// };

const orderApi = {
  getListOrder,
  getOrderDetails,
  getListTransactions,
  createNewOrder,
  prepareOrder,
  cancleOreder,
  // setOrderStatusToCanceled,
};

export default orderApi;
