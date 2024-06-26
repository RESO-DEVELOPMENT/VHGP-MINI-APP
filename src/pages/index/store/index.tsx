import React, { FC, Suspense, useEffect } from "react";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Box, Header, Page, useNavigate } from "zmp-ui";
import { ProductList } from "../product-list";
import { StoreDetail } from "./detail";
import { Collections } from "./collections";
import { CartIcon } from "components/cart-icon";
import FloatingActionButton from "pages/FloatingActionButton";
import { Divider } from "components/divider";
import { prepareCart } from "utils/product";
import { cartState } from "states/cart.state";
import {  storeState } from "states/store.state";
import {  menuByStore } from "states/menu.state";
import { ContentFallback } from "components/content-fallback";

const StorePage: FC = () => {
  const [cart, setCart] = useRecoilStateLoadable(cartState);
  const currentPickedStore = useRecoilValue(storeState);
  const menu = useRecoilValueLoadable(menuByStore);
  console.log(menu)

  const ResetCart = () => {
    setCart((prevCart) => {
      let res = { ...prevCart };
      res = {
        ...prevCart,
        productList: [],
        totalQuantity: 0,
        storeId: currentPickedStore.id,
      };
      return prepareCart(res);
    });
  };
  useEffect(() => {
    if (cart.contents.storeId !== currentPickedStore) {
      ResetCart();
    }
  }, [currentPickedStore]);
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate("/cart");
  };
  if(menu.state == "loading" || menu.state == "hasError") {
    return <ContentFallback/>
  }
  if(menu.state == "hasValue" && menu.contents !== null) {
    return (
      <Page className="flex flex-col ">
        <Box>
          <Header className="z-10" />
          <StoreDetail />
          <Divider />
          <Suspense>
            <Collections collections={menu.contents.collections} />
            <ProductList categories={menu.contents.categories}/>
          </Suspense>
          <Divider />
          <FloatingActionButton onClick={handleFabClick} icon={<CartIcon />} />
        </Box>
      </Page>
    );
  }
 
  return <Page>

  </Page>


 
};

export default StorePage;
