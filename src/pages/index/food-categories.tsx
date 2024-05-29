import React, { FC } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Category } from "types/store-menu";
import { Box, useNavigate, Text } from "zmp-ui";

import foodCateSkeleton from "../../static/food-categories-skeleton.png";
import { foodCategoriesListState, selectedCategoryIdState } from "states/category.state";

export const Categories: FC = () => {
  const foodCategoriesLoadable = useRecoilValueLoadable(
    foodCategoriesListState
  );
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    navigate("/stores-picker-by-food", {
      state: { foodCategoryName: categoryName },
    });
  };

  switch (foodCategoriesLoadable.state) {
    case "loading":
      return (
        <Box className="bg-white grid grid-cols-4 gap-4 p-4">
          {/* Skeleton loading state */}
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-2 items-center">
              <img className="w-12 h-12" src={foodCateSkeleton} alt="Loading" />
              <Text size="xxSmall" className="text-gray">
                Loading...
              </Text>
            </div>
          ))}
        </Box>
      );
    case "hasError":
      return (
        <Box className="bg-white p-4">
          <Text size="xxSmall" className="text-gray">
            Failed to load categories.
          </Text>
        </Box>
      );
    case "hasValue":
      const categories: Category[] = foodCategoriesLoadable.contents;
      return (
        <Box className="bg-white grid grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <div
              key={category.code}
              onClick={() => gotoCategory(category.id, category.name)}
              className="flex flex-col space-y-2 items-center cursor-pointer"
            >
              <img
                className="w-12 h-12"
                src={category.picUrl || foodCateSkeleton}
                alt={category.name}
              />
              <Text size="xxSmall" className="text-gray">
                {category.name}
              </Text>
            </div>
          ))}
        </Box>
      );
    default:
      return null;
  }
};
