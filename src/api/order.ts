import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { Cart } from "types/cart";
import { OrderDetails, OrderPreview, orderStatusCart } from "types/order";
import { Transaction } from "types/transaction";
import axios from "axios";

const getListOrder = (id: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<OrderPreview>>(`users/${id}/orders`, {
    params,
  });
const getOrderDetails = (orderId: string, params?: any) =>
  requestWebAdmin.get<OrderDetails>(`users/orders/${orderId}`, {
    params,
  });

const getListTransactions = (id: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<Transaction>>(`users/${id}/transactions`, {
    params,
  });
const createNewOrder = (cart: Cart) =>
  requestWebAdmin.post("/users/order", cart);

const prepareOrder = (cart: Cart) =>
  requestWebAdmin.post<Cart>("/orders/prepare", cart);

const setOrderStatusToCanceled = (
  orderStatusCart: orderStatusCart,
  storeId: string,
  orderId: string,
  token: string
) => {
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
};



const orderApi = {
  getListOrder,
  getOrderDetails,
  getListTransactions,
  createNewOrder,
  prepareOrder,
  setOrderStatusToCanceled,
};

export default orderApi;
