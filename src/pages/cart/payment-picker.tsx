import { ActionSheet } from "components/fullscreen-sheet";

import React, { FC, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { cartState } from "states/cart.state";
import { paymentTypeState } from "states/order.state";
import { PaymentType } from "types/order";
import { showPaymentType } from "utils/product";
import { Box, Icon, Text } from "zmp-ui";

export const PaymentPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const paymentList = useRecoilValueLoadable(paymentTypeState);
  const [cart, setCart] = useRecoilState(cartState);

  const handlePaymentClick = useCallback(
    (type) => {
      setCart((prevCart) => ({
        ...prevCart,
        paymentType: type,
      }));
      setVisible(false);
    },
    [setCart]
  );

  const renderActions = useMemo(() => {
    if (paymentList.state !== "hasValue") return [];

    const actions = paymentList.contents.map((e) => ({
      text: e.name,
      highLight: e.type === cart?.paymentType,
      onClick: () => handlePaymentClick(e.type),
    }));

    actions.push({ text: "Đóng", close: true, danger: true } as any);

    return actions;
  }, [paymentList, cart?.paymentType, handlePaymentClick]);

  return (
    <>
      <Box flex className="space-x-2" onClick={() => setVisible(true)}>
        <Text size="xLarge" className="font-medium text-sm text-primary">
          {showPaymentType(cart.paymentType)}
        </Text>
        <Icon className="bottom-0.5" icon="zi-chevron-up" />
      </Box>
      {paymentList.state === "hasValue" &&
        createPortal(
          <ActionSheet
            title="Các phương thức thanh toán"
            visible={visible}
            onClose={() => setVisible(false)}
            actions={renderActions}
          ></ActionSheet>,
          document.body
        )}
    </>
  );
};
