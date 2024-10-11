import React, { FC, Suspense } from "react";
import { useRecoilValueLoadable } from "recoil";
import { Box, Header, Page, useNavigate, Text, Icon } from "zmp-ui";
import { Categories } from "../categories-list";
import { StoreDetail } from "./detail";
import { Collections } from "./collections";
import { Divider } from "components/divider";
import { menuByStore } from "states/menu.state";
import { ContentFallback } from "components/content-fallback";
import { CartIcon } from "components/cart-icon/cart-icon";
import FloatingActionButton from "components/cart-icon/FloatingActionButton";
import { useRecoilValue } from "recoil";
import { storeState } from "states/store.state";

const StorePage: FC = () => {
  const navigate = useNavigate();

  const menu = useRecoilValueLoadable(menuByStore);
  const currentStoreState = useRecoilValue(storeState);
  const handleFabClick = () => {
    navigate("/cart");
  };
  if (menu.state == "loading" || menu.state == "hasError") {
    return <ContentFallback />;
  }
  if (menu.state == "hasValue" && menu.contents !== null) {
    return (
      <Page className="flex flex-col bg-white">
        <Box>
          <Header
            showBackIcon={true}
            title={currentStoreState.name}
            style={{ paddingBottom: "0px" }}
          />
          <div className="bg-white font-light text-base pl-10 whitespace-nowrap overflow-hidden text-ellipsis px-4">
            <Icon icon="zi-location" style={{ color: "#fc8019" }} />
            {currentStoreState.address}
          </div>
          {/* <StoreDetail /> */}
          {/* <Divider /> */}
          <Suspense>
            {/* <Collections collections={menu.contents.collections} /> */}
            {/* <Divider /> */}
            <Categories categories={menu.contents.categories} />
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
