import React, { FC, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { addressState } from "states/order.state";
import { cartState } from "states/cart.state";
import { selectedStoreState } from "states/store.state";
import {  Box, Button, Input, Sheet, useSnackbar } from "zmp-ui";
import AddressPicker from "components/address-picker";
import { ListItem } from "components/list-item";
import { createPortal } from "react-dom";
import { Divider } from "components/divider";

export const LocationPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const selectedStore = useRecoilValueLoadable(selectedStoreState);
  const [cart, setCart] = useRecoilState(cartState);
  const address = useRecoilValue(addressState);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAddress(e.target.value);
  // };
  const snackbar = useSnackbar();
  const handleAddressSubmit = () => {
      setCart((prevCart) => ({
        ...prevCart,
        deliveryAddress: address || undefined,
      }));
      setVisible(false);
  };

  return (
    <>
      <ListItem
        onClick={() => {
          setVisible(true);
        }}
        title={address || "Chọn địa chỉ giao hàng"}
        subtitle={"Địa chỉ nhận hàng"}
      />
      {selectedStore.state === "hasValue" &&
        createPortal(
          <Sheet
            title="Địa chỉ giao hàng"
            visible={visible}
            onClose={() => setVisible(false)}
            autoHeight
            swipeToClose = {false}
            maskClosable = {false}
            handler={false}
          >
            {/* <Box className="w-full flex justify-center items-center px-4 py-2">
              <Input
                className="rounded rounded-r-none"
                placeholder="Nhập địa chỉ giao hàng..."
                value={address}
                onChange={handleInputChange}
              />
              <Button
                className="rounded rounded-l-none"
                type="neutral"
                onClick={handleAddressSubmit}
              >
                Nhập
              </Button>
            </Box> */}
            <Box className="px-4 pb-4 text-center w-full">
              <AddressPicker  />
              <Divider/>
              <Button
                className=" w-full rounded"
                type="neutral"
                onClick={handleAddressSubmit}
              >
                Xác nhận
              </Button>
            </Box>
          </Sheet>,
          document.body
        )}


    </>
  );
};










