import { ActionSheet } from "components/fullscreen-sheet";
import { ListItem } from "components/list-item";
import React, { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { cartState } from "states/cart.state";
import { requestLocationTriesState } from "states/order.state";
import { nearbyStoresState, selectedStoreIdState, selectedStoreNameState, selectedStoreState } from "states/store.state";
import { memberState } from "states/user.state";
import { OrderType, PaymentType } from "types/order";
import { Store } from "types/store";
import { displayDistance } from "utils/location";
import { setStorage } from "zmp-sdk";
import { useNavigate, useSnackbar } from "zmp-ui";
export const StorePicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const nearbyStores = useRecoilValueLoadable(nearbyStoresState);
  // const setSelectedStoreIndex = useSetRecoilState(selectedStoreIndexState);
  const selectedStore = useRecoilValueLoadable(selectedStoreState);
  const setCart = useSetRecoilState(cartState);
  const setSelectedStoreIdState = useSetRecoilState(selectedStoreIdState);
  const setSelectedStoreNameState = useSetRecoilState(selectedStoreNameState);
  const navigate = useNavigate();

  const goNearbyStoreClick = (store: Store) => {
    setSelectedStoreIdState(store.id);
    setSelectedStoreNameState(store.name);
    navigate("/store");
    setVisible(false);
  };

  const member = useRecoilValue(memberState);
  const snackbar = useSnackbar();
  useEffect(
    () => {
      setCart((prevCart) => {
        let res = { ...prevCart };
        res = {
          ...prevCart,
          storeId: selectedStore?.contents.id,
          customerId: member?.membershipId ?? undefined,
        };
        return res;
      });
      // setCart(cart);
    },
    //eslint-disable-next-line
    [selectedStore]
  );
  return (
    <>
      <ListItem
        onClick={() => {
          setVisible(true);
          snackbar.openSnackbar({
            duration: 3000,
            position: "top",
            type: "warning",

            text: "Khi đổi cửa hàng, các sản phẩm từ cửa hàng cũ sẽ bị xoá",
          });
        }}
        title={selectedStore.contents?.name ?? ""}
        subtitle={selectedStore.contents?.address ?? ""}
      />
      {nearbyStores.state === "hasValue" &&
        createPortal(
          <ActionSheet
            title="Các cửa hàng trong khu vực"
            visible={visible}
            onClose={() => setVisible(false)}
            actions={[
              nearbyStores.contents.map(
                (store: Store & { distance?: number }, i) => ({
                  text: store.distance
                    ? `${store.name} - ${displayDistance(store.distance)}`
                    : store.name,
                  highLight: store.id === selectedStore?.contents.id,
                  // onClick: () => {
                  //   setSelectedStoreIndex(i);
                  //   setStorage({
                  //     data: {
                  //       storeIndex: i,
                  //     },
                  //     success: (data) => {
                  //       // xử lý khi gọi api thành công
                  //       console.log("set ok", data);
                  //     },
                  //     fail: (error) => {
                  //       // xử lý khi gọi api thất bại
                  //       console.log("set error", error);
                  //     },
                  //   });
                  //   setCart((prevCart) => {
                  //     let res = { ...prevCart };
                  //     res = {
                  //       ...prevCart,
                  //       productList: [],
                  //       orderType: OrderType.EATIN,
                  //       paymentType: PaymentType.POINTIFY,
                  //       totalAmount: 0,
                  //       shippingFee: 0,
                  //       bonusPoint: 0,
                  //       discountAmount: 0,
                  //       finalAmount: 0,
                  //       promotionList: [],
                  //       totalQuantity: 0,
                  //     };

                  //     return res;
                  //   });
                  //   setVisible(false);
                  // },
                  onClick: () => {
                    goNearbyStoreClick(store);
                  },
                })
              ),
              [{ text: "Đóng", close: true, danger: true }],
            ]}
          ></ActionSheet>,
          document.body
        )}
    </>
  );
};

export const RequestStorePickerLocation: FC = () => {
  const retry = useSetRecoilState(requestLocationTriesState);
  return (
    <ListItem
      onClick={() => retry((r) => r + 1)}
      title="Chọn cửa hàng"
      subtitle="Yêu cầu truy cập vị trí"
    />
  );
};
