import React, { useState, FC } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { Box, Icon, Text, Modal, Input } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { LocationPicker } from "./location-picker";
import { cartState } from "states/cart.state";
import { selectedStoreByIdState } from "states/store.state";

export const AddressPopup: FC<{
  title: string;
  onConfirm: (address: string) => void;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}> = ({ title, onConfirm, address, setAddress }) => {
  const handleClose = () => {
    onConfirm(address);
  };
  return (
    <Modal
      visible={true}
      title={title}
      onClose={handleClose}
      actions={[
        {
          text: "Xác nhận",
          onClick: () => onConfirm(address),
          highLight: true,
        },
      ]}
    >
      <Input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={`Nhập ${title}`}
        className="w-full border rounded"
      />
    </Modal>
  );
};

export const Delivery: FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const storeLoadable = useRecoilValueLoadable(selectedStoreByIdState);
  const [showPopup, setShowPopup] = useState(false);
  const [notes, setNotes] = useState(cart.notes || "");

  const handleNotesChange = (notes: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      notes: notes,
    }));
    setShowPopup(false);
  };

  return (
    <>
      <Box className="space-y-2 px-4">
        <Text.Header>Thông tin đơn hàng</Text.Header>
        <ListRenderer
          noDivider
          items={[
            {
              left: <Icon icon="zi-home" className="my-auto" />,
              right: (
                <React.Suspense fallback={<div>Loading...</div>}>
                  {storeLoadable.state === "hasValue" ? (
                    <Box>
                      <Text size="small" className="text-primary">
                        {storeLoadable.contents?.name || "Cửa hàng"}
                      </Text>
                      <Text size="xSmall" className="text-gray">
                        {"Cửa hàng"}
                      </Text>
                    </Box>
                  ) : (
                    <div>Loading...</div>
                  )}
                </React.Suspense>
              ),
            },
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <LocationPicker />
                </React.Suspense>
              ),
            },
            {
              left: <Icon icon="zi-note" className="my-auto" />,
              right: (
                <Box onClick={() => setShowPopup(true)}>
                  <Text size="small" className="text-primary overflow-y-auto">
                    {cart.notes || "Nhập ghi chú đơn hàng.."}
                  </Text>
                  <Text size="xSmall" className="text-gray">
                    {"Ghi chú"}
                  </Text>
                </Box>
              ),
            },
          ]}
          limit={4}
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
      </Box>
      {showPopup && (
        <AddressPopup
          title={"Ghi chú"}
          onConfirm={handleNotesChange}
          address={notes}
          setAddress={setNotes}
        />
      )}
    </>
  );
};

export default Delivery;
