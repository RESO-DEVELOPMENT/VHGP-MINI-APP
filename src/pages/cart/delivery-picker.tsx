import { ActionSheet } from "components/fullscreen-sheet";
import React, { FC, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { deliveryMode } from "states/order.state";
import { Box, Icon, Text } from "zmp-ui";
import { showDeliveryMode } from "utils/product";
import { cartState } from "states/cart.state";
import { DeliveryMode } from "types/order";

export const DeliveryPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const deliveryModeList = useRecoilValueLoadable(deliveryMode);
  const [cart, setCart] = useRecoilState(cartState);

  const handleOrderTypeClick = useCallback(
    (type) => {
      setCart((prevCart) => ({
        ...prevCart,
        deliveryMode: type,
      }));
      setVisible(false);
    },
    [setCart]
  );

  const renderActions = useMemo(() => {
    if (deliveryModeList.state !== "hasValue") return [];

    const deliveryModes = [
      DeliveryMode.STANDART_DELIVERY,
      DeliveryMode.EXPRESS_DELIVERY,
      DeliveryMode.PRE_DELIVERY,
    ];
    const actions = deliveryModes.flatMap((type) =>
      deliveryModeList.contents
        .filter((e) => e.type === type)
        .map((e) => ({
          text: e.name,
          highLight: e.type === cart?.deliveryMode,
          onClick: () => handleOrderTypeClick(e.type),
        }))
    );

    actions.push({ text: "Đóng", close: true, danger: true } as any);
    return actions;
  }, [deliveryModeList, cart?.deliveryMode, handleOrderTypeClick]);

  return (
    <>
      <Box
        flex
        className="space-x-2"
        onClick={() => {
          setVisible(true);
        }}
      >
        <Text size="xLarge" className="font-medium text-sm text-primary">
          {showDeliveryMode(cart.deliveryMode || "defaultMode")}
        </Text>
        <Icon className="bottom-0.5" icon="zi-chevron-up" />
      </Box>
      {deliveryModeList.state === "hasValue" &&
        createPortal(
          <ActionSheet
            title="Các phương thức giao hàng"
            visible={visible}
            onClose={() => setVisible(false)}
            actions={renderActions}
          ></ActionSheet>,
          document.body
        )}
    </>
  );
};
