import React, { FC, Suspense, useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Header, Page, useNavigate } from "zmp-ui";
import { ProductList } from "../product-list";
import { StoreDetail } from "./detail";
import { Collections } from "./collections";
import CartPage from "pages/cart";
import { ProductPicker } from "components/product/product-picker";
import { CartIcon } from "components/cart-icon";
import FloatingActionButton from "pages/FloatingActionButton";
import { Divider } from "components/divider";
import cart from "pages/cart";
import { prepareCart } from "utils/product";
import { cartState } from "states/cart.state";
import { selectedStoreIdState } from "states/store.state";

const StorePage: FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const currentPickedStore = useRecoilValue(selectedStoreIdState);
  const ResetCart = () => {
    setCart((prevCart) => {
      let res = { ...prevCart };
      res = {
        ...prevCart,
        productList: [],
        totalQuantity: 0
      };
      return prepareCart(res);
    });
  };
  useEffect(() => {
    if (cart.storeId !== currentPickedStore) {
      ResetCart();
    }
  }, []);
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate("/cart");
    // console.log("FAB Clicked");
    // Define the action for FAB click, e.g., navigate to a specific route
  };
  // const selectedStoreName = useRecoilValue(selectedStoreNameState);
 
 
  return (
    <Page className="flex flex-col ">
      <Box>
        <Header className="z-10" />
        <StoreDetail />
        <Divider />
        <Suspense>
          <Collections />
          <ProductList />
        </Suspense>
        <Divider />
        <FloatingActionButton onClick={handleFabClick} icon={<CartIcon />} />
      </Box>
    </Page>
  );
};

export default StorePage;
