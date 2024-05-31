import React, { FC } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Box, useNavigate, Text } from "zmp-ui";
import foodCateSkeleton from "../../static/food-categories-skeleton.png";
import { foodCategoriesListState, foodCategoryState, selectedCategoryIdState } from "states/category.state";
import { FoodCategory } from "types/category";

export const FoodCategories: FC = () => {
  const foodCategoriesLoadable = useRecoilValueLoadable(
    foodCategoriesListState
  );
  const navigate = useNavigate();
  const setFoodCategory = useSetRecoilState(foodCategoryState);

  const gotoCategory = (foodCategory: FoodCategory) => {
    setFoodCategory(foodCategory);
    navigate("/stores-picker-by-food");
  };

  switch (foodCategoriesLoadable.state) {
    case "loading":
      return (
        <Box className="bg-white grid grid-cols-4 gap-4 p-4">
          {[...Array(4)].map((_, index) => (
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
      const categories: FoodCategory[] = foodCategoriesLoadable.contents;
      return (
        <Box className="bg-white grid grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <div
              key={category.code}
              onClick={() => gotoCategory(category)}
              className="flex flex-col space-y-2 items-center"
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
