import React, { FC, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { categoriesState, selectedCategoryIdState } from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";
import { ProductList } from "./index/product-list";
import { Recommend } from "./index/recommend";

const StorePage: FC = () => {
  //lấy storeId từ useNavigate
  const location = useLocation();
  const { state } = location;

  return (
    <Page className="flex flex-col">
      <Header title="Danh mục" />'
      <Recommend />
      <ProductList />
    </Page>
  );
};

export default StorePage;
