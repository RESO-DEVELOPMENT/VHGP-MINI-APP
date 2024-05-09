import React, { FC, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { selectedStoreByIdState, storeMenuByIdState } from "state";
import { Button, Header, Icon, Page, Switch } from "zmp-ui";
import { ProductList } from "../product-list";
import { Recommend } from "../recommend";
import { StoreBanner } from "./store-banner";

const StorePage: FC = () => {
  //lấy storeId từ useNavigate
  const location = useLocation();
  const { state } = location;

  //lấy store infor từ selectedStoreByIdState
  const currentStore = useRecoilValueLoadable(selectedStoreByIdState);
  // console.log(currentStore);
  //lấy store menu data từ storeMenuByIdState
  const currentStoreMenus = useRecoilValueLoadable(storeMenuByIdState);
  // console.log(currentStoreMenus);
  // console.log("rerender");

  const storeName = currentStore.contents.name;
  // console.log(storeName);
  return (
    <Page className="flex flex-col ">
      <Header title={storeName} className="z-10" />
      <Button
        className="z-20 absolute right-4 top-8 text-VHGP"
        variant="secondary"
        size="medium"
        icon={<Icon icon="zi-info-circle" />}
      >
        Button
      </Button>
      <StoreBanner />
      <Recommend />
      <ProductList />
    </Page>
  );
};

export default StorePage;
