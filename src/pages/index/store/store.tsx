import React, { FC, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { categoriesState, selectedCategoryIdState } from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";
import { ProductList } from "../product-list";
import { Recommend } from "../recommend";

const StorePage: FC = () => {
  //lấy storeId từ useNavigate
  const location = useLocation();
  const { state } = location;

  return (
    <Page className="flex flex-col">
      <Header title={state.store.name} />'
      <Recommend />
      <ProductList />
    </Page>
  );
};

export default StorePage;
