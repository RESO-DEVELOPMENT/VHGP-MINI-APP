import React, { FC, Suspense } from "react";
import {
  useRecoilValue,
} from "recoil";
import { selectedStoreNameState } from "state";
import { Box, Header, Page } from "zmp-ui";
import { ProductList } from "../product-list";
import { StoreDetail } from "./detail";
import { Collections } from "./collections";

const StorePage: FC = () => {
  const selectedStoreName = useRecoilValue(selectedStoreNameState);
  return (
    <Page className="flex flex-col ">
      <Box>
        <Header title={selectedStoreName} className="z-10" />
        <StoreDetail />
        <Suspense>
          <Collections/>
          <ProductList />
        </Suspense>
      </Box>
    </Page>
  );
};

export default StorePage;
