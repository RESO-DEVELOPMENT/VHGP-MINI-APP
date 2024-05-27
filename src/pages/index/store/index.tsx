import React, { FC, Suspense, useEffect } from "react";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useResetRecoilState } from "recoil";
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
import { prepareCart } from "utils/product";

const StorePage: FC = () => {
  const [cart, setCart] = useRecoilStateLoadable(cartState);
  const [currentPickedStore, setCurrentPickedStore] = useRecoilState(selectedStoreIdState);
  const ResetCart = () => {
    setCart((prevCart) => {
      let res = { ...prevCart };
      res = {
        ...prevCart,
        productList: [],
        totalQuantity: 0,
        storeId: currentPickedStore,
      };
      return prepareCart(res);
    });
  };
  useEffect(() => {
    if (cart.contents.storeId !== currentPickedStore) {
      // console.log("store id in carrt", cart.storeId);
      // console.log("picked store", currentPickedStore);
      // setCurrentPickedStore(cart.storeId ?? "");
     ResetCart();
    }
  }, [currentPickedStore]);
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate("/cart");
    // console.log("FAB Clicked");
    // Define the action for FAB click, e.g., navigate to a specific route
  };
  // const selectedStoreName = useRecoilValue(selectedStoreNameState);
 
//  console.log("current cart no click ",cart);
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
