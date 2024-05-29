import { ListItem } from "components/list-item";

import React, { FC, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { addressState } from "states/address.state";
import { cartState } from "states/cart.state";
import { selectedStoreState } from "states/store.state";
import { OrderType } from "types/order";
import { Box, Button, Input } from "zmp-ui";
import { AddressPopup } from "./delivery";

export const LocationPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const selectedStore = useRecoilValueLoadable(selectedStoreState);
  const [cart, setCart] = useRecoilState(cartState);
  const [address, setAddress] = useRecoilState(addressState);
  const locations =
    selectedStore.contents.locationNearby != null
      ? selectedStore.contents.locationNearby
        .split("_")
        .map((item: string) => item.trim())
      : [];
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAddress(e.target.value);
  // };
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
        title={cart?.deliveryAddress ?? "Chọn địa chỉ giao hàng"}
        subtitle={"Địa chỉ nhận hàng"}
      />
      {selectedStore.state === "hasValue" &&
        createPortal(
          // <Sheet
          //   title="Địa chỉ giao hàng có thể giao"
          //   visible={visible}
          //   onClose={() => setVisible(false)}
          //   autoHeight
          //   swipeToClose
          // >
          //   <Box className="w-full flex justify-center items-center p-3 pb-10">
          //     <Input
          //       className="w-9/12 block rounded-l-[3rem] rounded-r-none"
          //       placeholder="Nhập địa chỉ giao hàng..."
          //       value={address}
          //       onChange={handleInputChange}
          //     ></Input>
          //     <Button
          //       className="w-3/12 block rounded-l-none rounded-r-[3rem]"
          //       type="neutral"
          //       onClick={handleAddressSubmit}
          //     >
          //       Nhập
          //     </Button>
          //   </Box>
          // </Sheet>

          visible && (
            <AddressPopup
              title={"Địa chỉ"}
              onConfirm={handleAddressSubmit}
              address={address}
              setAddress={setAddress}
            />
          ),
          document.body
        )}
    </>
  );
};
