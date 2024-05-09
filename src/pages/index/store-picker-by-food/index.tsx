import React, { Suspense } from "react";
import { FC } from "react";
import { useLocation } from "react-router";
import { Box, Header, Page, Text } from "zmp-ui";
import { StorePickerbyFoodResult } from "./result";

export const StoresPickerByFood: FC = () => {
  const { state } = useLocation();
  const foodPickedName = state.foodCategoryId;
  return (
    <Page className="flex flex-col">
      <Header title={foodPickedName} />
      <StorePickerbyFoodResult />
    </Page>
  );
};
