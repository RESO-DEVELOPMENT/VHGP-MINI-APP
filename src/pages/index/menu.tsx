import React, { FC } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Box, useNavigate, Text, Page, Header } from "zmp-ui";
import foodCateSkeleton from "../../static/skeletons/fast-food.png";
import {
  foodCategoriesListState,
  foodCategoryState,
} from "states/category.state";
import { FoodCategory } from "types/category";

const MenuPage: FC = () => {
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
        <Page className="relative flex-1 flex flex-col bg-white">
          <Header
            title="Hôm nay bạn muốn ăn gì ?"
            onBackClick={() => {}}
          />
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
        </Page>
      );
    case "hasError":
      return (
        <Page className="relative flex-1 flex flex-col bg-white">
          <Header
            title="Hôm nay bạn muốn ăn gì ?"
            onBackClick={() => {}}
          />
          <Box className="bg-white p-4">
            <Text size="xxSmall" className="text-gray">
              Failed to load categories.
            </Text>
          </Box>
        </Page>
      );
    case "hasValue":
      const categories: FoodCategory[] = foodCategoriesLoadable.contents;
      return (
        <Page className="relative flex-1 flex flex-col bg-zinc-200">
          <Header
            title="Ẩm Thực"
            onBackClick={() => navigate(-1)}
          />

          <hr className="mt-2" />

          <Box className="bg-white grid grid-cols-2 ">
            {categories.map((category, index) => (
              <div
                key={category.code}
                onClick={() => gotoCategory(category)}
                className={`flex flex-row justify-between items-center p-2 h-20 border border-zinc-300 ${
                  index % 2 === 0 ? 'border-l-0' : 'border-r-0'}`}
              >
                <Box>
                  <img
                    className="w-12 h-12"
                    src={category.picUrl || foodCateSkeleton}
                    alt={category.name}
                  />
                </Box>
                <Box>
                  <Text size="xxxSmall" className="text-gray text-center">
                    {category.name}
                  </Text>
                </Box>
              </div>
            ))}
          </Box>
        </Page>
      );
    default:
      return null;
  }
}

export default MenuPage;
