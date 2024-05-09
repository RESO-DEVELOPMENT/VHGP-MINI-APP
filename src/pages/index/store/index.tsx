import React, { FC, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Box, Header, Page } from "zmp-ui";
import { ProductList } from "../product-list";
import { Recommend } from "../recommend";
import { StoreBanner } from "./store-banner";

const StorePage: FC = () => {
  //lấy storeId từ useNavigate
  const location = useLocation();
  const { state } = location;

  return (
    <Page className="flex flex-col">
      <Header title={state.store.name} />
      <StoreBanner />
      <Recommend />
      <ProductList />
    </Page>
  );
};

export default StorePage;
