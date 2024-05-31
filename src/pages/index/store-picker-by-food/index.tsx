import React from "react";
import { FC } from "react";
import { Header, Page } from "zmp-ui";
import { StorePickerbyFoodResult } from "./result";
import { useRecoilState, useRecoilValue } from "recoil";
import { foodCategoryState } from "states/category.state";
import { FoodCategory } from "types/category";

export const StoresPickerByFood: FC = () => {
  const currentFoodCategoryState = useRecoilValue(foodCategoryState);
  const pickedCategoryName = currentFoodCategoryState.name || "";
  return (
    <Page className="flex flex-col">
      <Header title={pickedCategoryName} />
      <StorePickerbyFoodResult />
    </Page>
  );
};
