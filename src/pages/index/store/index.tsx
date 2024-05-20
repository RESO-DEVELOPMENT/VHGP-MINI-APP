import React, { FC, Suspense, useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { cartState, selectedStoreIdState, selectedStoreNameState } from "state";
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

const StorePage: FC = () => {
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate("/cart");
    // console.log("FAB Clicked");
    // Define the action for FAB click, e.g., navigate to a specific route
  };
  // const selectedStoreName = useRecoilValue(selectedStoreNameState);
 
  const [cart, setCart] = useRecoilState(cartState);

  const resetCart = useResetRecoilState(cartState);
  const currentPickedStore = useRecoilValue(selectedStoreIdState);

  useEffect(() => {
    if (cart.storeId !== currentPickedStore) {
      resetCart();
    }
  }, [cart.storeId, currentPickedStore]);
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
