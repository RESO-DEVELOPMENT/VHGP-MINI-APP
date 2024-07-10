import React from "react";
import { FC } from "react";
import { Header, Page } from "zmp-ui";
import { StorePickedByFoodResult } from "./result";
import { useRecoilValue } from "recoil";
import { foodCategoryState } from "states/category.state";

export const StoresPickerByFood: FC = () => {
  const currentFoodCategoryState = useRecoilValue(foodCategoryState);
  const pickedCategoryName = currentFoodCategoryState.name || "";
  return (
    <Page className="flex flex-col">
      <Header title={pickedCategoryName} className="py-4" />
      <StorePickedByFoodResult />
    </Page>
  );
};
