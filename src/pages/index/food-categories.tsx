import React, { FC } from "react";
import {
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  foodCategoriesListState,
  foodCategoriesMockState,
  selectedCategoryIdState,
} from "state";
import { Category } from "types/store-menu";
import { Box, useNavigate, Text } from "zmp-ui";

import foodCateSkeleton from "../../static/food-categories-skeleton.png";

export const Categories: FC = () => {
  const foodCategoriesSkeleton = useRecoilValue(foodCategoriesMockState);
  // console.log(foodCategoriesSkeleton);

  const foodCategories = useRecoilValue(
    foodCategoriesListState
  );
  // console.log(foodCategories);

  //sắp xếp theo displayOrder
  const categories: Category[] = foodCategories;
  // console.log(categories);
  if ( categories != null && categories.length > 0) {
    const navigate = useNavigate();
    const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

    const gotoCategory = (categoryId: string, categoryName: string) => {
      setSelectedCategoryId(categoryId);
      navigate("/stores-picker-by-food", {
        state: { foodCategoryName: categoryName },
      });
    };

    return (
      <Box className="bg-white grid grid-cols-4 gap-4 p-4">
        {categories.map((category, i) => (
          <div
            key={category.code}
            onClick={() => gotoCategory(category.id, category.name)}
            className="flex flex-col space-y-2 items-center"
          >
            <img
              className="w-12 h-12"
              src={category.picUrl || foodCateSkeleton}
            />
            <Text size="xxSmall" className="text-gray">
              {category.name}
            </Text>
          </div>
        ))}
      </Box>
    );
  }
  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4">
      {foodCategoriesSkeleton.map((category, i) => (
        <div key={i} className="flex flex-col space-y-2 items-center">
          <img className="w-12 h-12" src={category.icon} />
          <Text size="xxSmall" className="text-gray">
            {category.name}
          </Text>
        </div>
      ))}
    </Box>
  );
};
