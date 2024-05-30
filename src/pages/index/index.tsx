import React, { FC } from "react";
import { Box, Page, Spinner } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Recommend } from "./store-recommend";
import { Divider } from "components/divider";
import { Categories } from "./food-categories";
import Promtions from "./promotions";


const HomePage: FC = () => {
  return (
      <Page className="relative flex-1 flex flex-col bg-white">
        <Welcome />
        <Box className="flex-1 overflow-auto">
          <Inquiry />
          <Categories />
          <Divider />
          <Promtions />
          <Divider />
          <Recommend />
          <Divider />
        </Box>
      </Page>
  );
};
export default HomePage;


