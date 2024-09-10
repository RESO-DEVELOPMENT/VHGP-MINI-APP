import { ActionSheet } from "components/fullscreen-sheet";
import React, { FC, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { orderStatusState } from "states/order.state";
import { Box, Icon, Text } from "zmp-ui";
import { showOrderType } from "utils/product";
import { cartState } from "states/cart.state";
import { OrderType } from "types/order";

export const OrderPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const orderList = useRecoilValueLoadable(orderStatusState);
  const [cart, setCart] = useRecoilState(cartState);

  const handleOrderTypeClick = useCallback(
    (type) => {
      setCart((prevCart) => ({
        ...prevCart,
        orderType: type,
      }));
      setVisible(false);
    },
    [setCart]
  );

  const renderActions = useMemo(() => {
    if (orderList.state !== "hasValue") return [];

    const orderTypes = [
      OrderType.EATIN,
      OrderType.DELIVERY,
      OrderType.TAKE_AWAY,
    ];
    const actions = orderTypes.flatMap((type) =>
      orderList.contents
        .filter((e) => e.type === type)
        .map((e) => ({
          text: e.name,
          highLight: e.type === cart?.orderType,
          onClick: () => handleOrderTypeClick(e.type),
        }))
    );

    actions.push({ text: "Đóng", close: true, danger: true } as any);
    return actions;
  }, [orderList, cart?.orderType, handleOrderTypeClick]);

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
          {showOrderType(cart.orderType)}
        </Text>
        <Icon className="bottom-0.5" icon="zi-chevron-up" />
      </Box>
      {orderList.state === "hasValue" &&
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
