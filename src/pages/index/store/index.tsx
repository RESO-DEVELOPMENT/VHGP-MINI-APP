import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { selectedStoreNameState } from "state";
import { Box, Header, Page, useNavigate } from "zmp-ui";
import { ProductList } from "../product-list";
import { StoreDetail } from "./detail";
import { Collections } from "./collections";
import CartPage from "pages/cart";
import { ProductPicker } from "components/product/picker";
import { CartIcon } from "components/cart-icon";
import FloatingActionButton from "pages/FloatingActionButton";

const StorePage: FC = () => {
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
        <Suspense>
          <Collections />
          <ProductList />
        </Suspense>
        <FloatingActionButton onClick={handleFabClick} icon={<CartIcon />} />
      </Box>
    </Page>
  );
};

export default StorePage;
