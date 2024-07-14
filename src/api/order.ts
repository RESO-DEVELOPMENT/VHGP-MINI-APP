import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { Cart } from "types/cart";
import { OrderDetails, OrderPreview, orderStatusCart } from "types/order";
import { Transaction } from "types/transaction";
import { getAccessToken, getPhoneNumber, getUserInfo } from "zmp-sdk";

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

const setOrderStatus = (
  orderStatusCart: orderStatusCart,
  storeId: string,
  orderId: string
) => {
  console.log("alo", orderStatusCart);
  requestWebAdmin.patch<orderStatusCart>(
    `/stores/${storeId}/orders/${orderId}`,
    orderStatusCart
  );
};

// const setOrderStatus = (
//   orderStatusCart: orderStatusCart,
//   storeId: string,
//   orderId: string
// ) => {
//   getAccessToken({
//     success: (accessToken: string) => {
//       console.log("Access token:", accessToken);
//       requestWebAdmin
//         .patch<orderStatusCart>(
//           `/stores/${storeId}/orders/${orderId}`,
//           orderStatusCart
//         )
//         .then((response) => {
//           console.log("Order status updated successfully:", response.data);
//           // You can handle the response here
//         })
//         .catch((error) => {
//           console.error("Error updating order status:", error);
//           // Handle errors here
//         });
//     },
//     fail: (error: any) => {
//       console.error("Failed to get access token:", error);
//       // Handle failure to get access token
//     },
//   });
// };

const orderApi = {
  getListOrder,
  getOrderDetails,
  getListTransactions,
  createNewOrder,
  prepareOrder,
  setOrderStatus,
};

export default orderApi;
