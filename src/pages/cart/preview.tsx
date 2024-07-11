import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import { Subscription } from "pages/profile";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {  PaymentType } from "types/order";
import { getConfig } from "utils/config";
import { Payment } from "zmp-sdk";
import { Box, Button, Icon, Text, useSnackbar } from "zmp-ui";
import { PaymentPicker } from "./payment-picker";
import { cartState, prepareCartState } from "states/cart.state";
import { memberState } from "states/member.state";
import { ContentFallback } from "components/content-fallback";
import { useProductContext } from "context/app-context";
import { addressState } from "states/order.state";
import { storeState } from "states/store.state";

export const CartPreview: FC = () => {
  const { commonOrderType } = useProductContext();
  const [cart,setCart] = useRecoilState(cartState);
  const cartPrepare = useRecoilValueLoadable(prepareCartState);
  const address = useRecoilValue(addressState);
  const member = useRecoilValueLoadable(memberState);
  const store = useRecoilValue(storeState);
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  useEffect(() =>{

  }, [])

  const onCheckout = async () => {
  //TODO: check address . Example: Vinhome,Origami, S202
      console.log("break")
      if(cart.deliveryAddress === undefined || cart.deliveryAddress!.length === 0 || address.split(",").some(a => a.includes("undefined") || a.includes("_______"))) {
        snackbar.openSnackbar({
                      duration: 3000,
                      position: "top",
                      type: "warning",
          
                      text: "Vui lòng xác nhận địa chỉ giao hàng",
                   });
                  }

    else if (cartPrepare.contents.paymentType == PaymentType.CASH) {
      const body = {
        ...cartPrepare.contents,
        // customerId: member.contents.membershipId,
        // customerName: member.contents.fullname,
        // customerPhone: member.contents.phoneNumber,
        address: store.name,
        deliveryAddress: address,
      };
      // console.log("body", body);

      Payment.createOrder({
        desc: `Thanh toán cho ${getConfig((config) => config.app.title)}`,
        item: [],
       
        amount: cartPrepare.contents.finalAmount,
        success: async (data) => {
          let { orderId } = data;
          const res = await orderApi.createNewOrder(body);
          if (res.status == 200) {
            snackbar.openSnackbar({
              duration: 2000,
              type: "success",
              text: "Đặt hàng thành công",
            });
            setCart((prevCart) => {
              let res = { ...prevCart };
              res = {
                ...prevCart,
                //TODO: hard set
                orderType: commonOrderType,
                productList: [],
                totalAmount: 0,
                shippingFee: 0,
                bonusPoint: 0,
                discountAmount: 0,
                finalAmount: 0,
                totalQuantity: 0,
                promotionList: [],
                promotionCode: null,
              };
              return res;
            });
            navigate("/order-detail", {
              state: { id: res.data },
            });
          } else {
            snackbar.openSnackbar({
              duration: 3000,
              type: "error",
              text: "Thất bại, " + res.data.Error,
            });
          }
        },
        fail: (err) => {
          snackbar.openSnackbar({
            duration: 3000,
            type: "error",
            text: "Thất bại, " + err.detail.Error,
          });
        },
      });
      // events.on(EventName.OpenApp, async (data) => {
      //   const params = data?.path;
      //   console.log("params payment", params);
      //   if (params.includes("/")) {
      //     try {
      //       const res = await orderApi.createNewOrder(body)
      //       if (res.status == 200) {
      //         console.log(res.data);
      //         snackbar.openSnackbar({
      //           type: "success",
      //           text: "Đặt hàng thành công",
      //         });
      //         setCart((prevCart) => {
      //           let res = { ...prevCart };
      //           res = {
      //             ...prevCart,
      //             orderType: OrderType.EATIN,
      //             paymentType: PaymentType.POINTIFY,
      //             productList: [],
      //             totalAmount: 0,
      //             shippingFee: 0,
      //             bonusPoint: 0,
      //             discountAmount: 0,
      //             finalAmount: 0,
      //             totalQuantity: 0,
      //             customerId: null,
      //             promotionList: [],
      //             promotionCode: null,
      //           };
      //           return res;
      //         });
      //         navigate("/order-detail", {
      //           state: { id: res.data }
      //         })
      //       } else if (res.status == 400) {
      //         console.log(" log eror", res);
      //         snackbar.openSnackbar({
      //           type: "error",
      //           text: "Đặt hàng thất bại, " + res.data.Error,
      //         });
      //       }

      //     } catch (error: any) {
      //       console.log(" log eror", error);
      //       snackbar.openSnackbar({
      //         type: "error",
      //         text: "Đặt hàng thất bại, " + error.Error,
      //       });
      //     }

      //   }
      // });
    } else {
      try {
        const body = {
          ...cartPrepare.contents,
          address: store.name,
          deliveryAddress: address,
        };

        const res = await orderApi.createNewOrder(body);

        if (res.status == 200) {
          snackbar.openSnackbar({
            type: "success",
            text: "Đặt hàng thành công",
          });
          setCart((prevCart) => {
            let res = { ...prevCart };
            res = {
              ...prevCart,
              orderType: commonOrderType,
              paymentType: PaymentType.POINTIFY,
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
            };
            return res;
          });
          navigate("/order-detail", {
            state: { id: res.data },
          });
        } else if (res.status == 400) {
          snackbar.openSnackbar({
            type: "error",
            text: "Đặt hàng thất bại, " + res.data.Error,
          });
        }
      } catch (error: any) {
        snackbar.openSnackbar({
          type: "error",
          text: "Đặt hàng thất bại, " + error.Error,
        });
      }
    }
  };

  // const onDevCheckout = async () => {
  //   try {
  //     const body = { ...cartPrepare.contents };
  //     const res = await orderApi.createNewOrder(body);
  //     if (res.status == 200) {
  //       // console.log(res.data);
  //       snackbar.openSnackbar({
  //         type: "success",
  //         text: "Đặt hàng thành công",
  //       });
  //       setCart((prevCart) => {
  //         let res = { ...prevCart };
  //         res = {
  //           ...prevCart,
  //           orderType: commonOrderType,
  //           paymentType: PaymentType.POINTIFY,
  //           productList: [],
  //           totalAmount: 0,
  //           shippingFee: 0,
  //           bonusPoint: 0,
  //           discountAmount: 0,
  //           finalAmount: 0,
  //           totalQuantity: 0,
  //           customerId: null,
  //           promotionList: [],
  //           promotionCode: null,
  //         };
  //         return res;
  //       });
  //       navigate("/order-detail", {
  //         state: { id: res.data },
  //       });
  //     } else if (res.status == 400) {
  //       console.log(" log eror", res);
  //       snackbar.openSnackbar({
  //         type: "error",
  //         text: "Đặt hàng thất bại, " + res.data.Error,
  //       });
  //     }
  //   } catch (error: any) {
  //     console.log(" log eror", error);
  //     snackbar.openSnackbar({
  //       type: "error",
  //       text: "Đặt hàng thất bại, " + error.Error,
  //     });
  //   }
  // };

  if (member.state == "loading" || member.state == "hasError") {
    return <ContentFallback />;
  }

  return (
    <Box
      flex
      flexDirection="column"
      className="sticky bottom-0 bg-background p-4 space-4"
    >
      {member.state === "hasValue" && member.contents !== null ? (
        <>
          <Box
            flex
            flexDirection="row"
            justifyContent="space-between"
            className=" flex-none mb-3 mx-4"
          >
            <Box
              flex
              className="space-x-2"
              onClick={() => navigate("/voucher")}
            >
              <Text size="xLarge" className="font-medium text-sm text-primary">
                {cartPrepare.state === "hasValue" &&
                cartPrepare.contents !== null &&
                cartPrepare.contents.promotionCode !== null
                  ? cartPrepare.contents.promotionCode
                  : "KHUYẾN MÃI"}
              </Text>
              <Icon className="bottom-0.5" icon="zi-chevron-up" />
            </Box>

            <Text.Title
              className="text-gray text-transform: uppercase;"
              size="small"
            >
              <PaymentPicker />
            </Text.Title>
          </Box>
          <Button
            type="highlight"
            disabled={
              cartPrepare.state === "hasValue" && cartPrepare.contents !== null
                ? cartPrepare.contents.productList.length > 0
                  ? false
                  : true
                : true
            }
            fullWidth
            onClick={onCheckout}
          >
            Đặt hàng
          </Button>
        </>
      ) : (
        <Subscription />
      )}
    </Box>
  );
};
