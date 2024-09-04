import React, { FC, Suspense } from "react";
import { useRecoilValueLoadable } from "recoil";
import { Box, Header, Page, useNavigate, Text } from "zmp-ui";
import { ProductList } from "../product-list";
import { StoreDetail } from "./detail";
import { Collections } from "./collections";
import { Divider } from "components/divider";
import { menuByStore } from "states/menu.state";
import { ContentFallback } from "components/content-fallback";
import { CartIcon } from "components/cart-icon/cart-icon";
import FloatingActionButton from "components/cart-icon/FloatingActionButton";

const StorePage: FC = () => {
  const navigate = useNavigate();

  const menu = useRecoilValueLoadable(menuByStore);
  const handleFabClick = () => {
    navigate("/cart");
  };
  if (menu.state == "loading" || menu.state == "hasError") {
    return <ContentFallback />;
  }
  if (menu.state == "hasValue" && menu.contents !== null) {
    return (
      <Page className="flex flex-col ">
        <Box>
          <Header showBackIcon={true} />
          <StoreDetail />
          <Divider />
          <Suspense>
            <Collections collections={menu.contents.collections} />
            <Divider />
            <ProductList categories={menu.contents.categories} />
          </Suspense>
          <Divider />
          <FloatingActionButton onClick={handleFabClick} icon={<CartIcon />} />
        </Box>
      </Page>
    );
  }

  return <Page />;
};

export default StorePage;
