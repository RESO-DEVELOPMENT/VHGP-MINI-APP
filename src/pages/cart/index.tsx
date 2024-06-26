import React, { FC } from "react";
import { Divider } from "components/divider";
import { Box, Header, Page } from "zmp-ui";
import { CartItems } from "./cart-items";
import { CartPreview } from "./preview";
import { TermsAndPolicies } from "./term-and-policies";
import { Delivery } from "./delivery";
import { useVirtualKeyboardVisible } from "hooks";
import { PaymentInfo } from "./payment";
import { useRecoilStateLoadable } from "recoil";
import { cartState } from "states/cart.state";

const CartPage: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  // const [cart, setCart] = useRecoilStateLoadable(cartState);
  // console.log("current cart", cart.contents);
  return (
    <Page className="flex flex-col">
      <Header title="Giỏ hàng" showBackIcon={true} />
      {/* {cart.state === "hasValue" && cart.contents !== null ? (
        <>
          <CartItems />
          <PaymentInfo />

          <Delivery />
          <Divider size={12} />
          <TermsAndPolicies />
          <Divider size={32} className="flex-1" />
          {!keyboardVisible && <CartPreview />}
        </>
      ) : (
        <Box />
      )} */}
      <CartItems />
      <PaymentInfo />

      <Delivery />
      <Divider size={12} />
      <TermsAndPolicies />
      <Divider size={32} className="flex-1" />
      {!keyboardVisible && <CartPreview />}
    </Page>
  );
};

export default CartPage;
