import React, { FC, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { selectedStoreNameState, storeMenuByIdState } from "state";
import { Box, Button, Header, Icon, Page, Switch } from "zmp-ui";
import { ProductList } from "../product-list";
import { Recommend } from "../recommend";
import { StoreBanner } from "./banner";
import { StoreDetail } from "./detail";
import { Collections } from "./collections";

const StorePage: FC = () => {
  const selectedStoreName = useRecoilValue(selectedStoreNameState);
  const navigate = useNavigate();

  // const handleDetailButtonClick = () => {
  //   console.log("đã nhấn");
  //   navigate("/store-detail");
  // };

  //lấy store menu data từ storeMenuByIdState
  // const currentStoreMenus = useRecoilValueLoadable(storeMenuByIdState);
  // console.log(currentStoreMenus);
  // console.log("rerender");
  return (
    <Page className="flex flex-col ">
      <Box>
        <Header title={selectedStoreName} className="z-10" />
        {/* <Button
          onClick={handleDetailButtonClick}
          className="z-20 absolute right-4 top-0 text-VHGP"
          variant="secondary"
          size="large"
          icon={<Icon icon="zi-info-circle" />}
        /> */}
        {/* <StoreBanner /> */}
        <StoreDetail />
        <Suspense>
          <Collections/>
          {/* <Recommend /> */}
          <ProductList />
        </Suspense>
      </Box>
    </Page>
  );
};

export default StorePage;
