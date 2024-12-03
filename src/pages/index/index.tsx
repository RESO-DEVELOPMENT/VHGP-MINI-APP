import React, { FC } from "react";
import { Box, Header, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Recommend } from "./store-recommend";
import { Divider } from "components/divider";
import { FoodCategories } from "./food-categories";
import Promotions from "./promotions";
import { ProductsRecommend } from "./recommend";
import cart from "../../static/icons/order2.png";

const HomePage: FC = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Header
        title="Hôm nay bạn muốn ăn gì ?"
        backIcon={<img className="text-primary" src={cart} />}
        onBackClick={() => {}}
      />
      <Box className="flex-1 overflow-auto">
        {/* <Inquiry /> */}
        {/* <FoodCategories /> */}
        {/* <Divider /> */}
        {/* <Promotions /> */}
        {/* <Divider /> */}
        {/* <ProductsRecommend /> */}
        <Divider />
        <Recommend />
        <Divider />
      </Box>
    </Page>
  );
};
export default HomePage;
