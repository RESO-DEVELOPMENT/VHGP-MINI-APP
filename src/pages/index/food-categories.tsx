import React, { FC } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Box, useNavigate, Text } from "zmp-ui";
import foodCateSkeleton from "../../static/skeletons/fast-food.png";
import {
  foodCategoriesListState,
  foodCategoryState,
} from "states/category.state";
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

  const gotoMenu = (url: string) => {
    navigate(url);
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
      const listMenu = [
        { name: "Siêu Rẻ", url: "/" },
        { name: "BST DEAL 8K", url: "/" },
        { name: "Giảm 50%", url: "/" },
        { name: "Menu", url: "/menu" },
      ];
      const filteredCategories = categories
        .filter((category) => category.displayOrder >= 1000)
        .slice(0, 4);
      return (
        <Box className="bg-white grid grid-cols-4 gap-4 p-3">
          {filteredCategories.map((category) => (
            <div
              key={category.code}
              onClick={() => gotoCategory(category)}
              className="flex flex-col justify-content-center items-center rounded-lg"
            >
              <Box>
                <img
                  className="w-12 h-12"
                  src={category.picUrl || foodCateSkeleton}
                  alt={category.name}
                />
              </Box>
              <Box>
                <Text size="xxxSmall" className="text-gray text-center mt-1">
                  {category.name}
                </Text>
              </Box>
            </div>
          ))}

          {listMenu.map((menu, index) => (
            <div
              key={index}
              onClick={() => gotoMenu(menu.url)}
              className="flex flex-col justify-content-center items-center rounded-lg "
            >
              <Box>
                <img
                  className="w-12 h-12"
                  src={foodCateSkeleton}
                  alt={menu.name}
                />
              </Box>
              <Box>
                <Text size="xxSmall" className="text-gray text-center mt-1">
                  {menu.name}
                </Text>
              </Box>
            </div>
          ))}
        </Box>
      );
    default:
      return null;
  }
};
