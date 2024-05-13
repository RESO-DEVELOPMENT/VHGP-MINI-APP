import React, { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { foodCategoriesState, selectedCategoryIdState } from "state";
import { Box, useNavigate, Text } from "zmp-ui";

export const Categories: FC = () => {
  const foodCategories = useRecoilValue(foodCategoriesState);
  // console.log(foodCategories);
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string,categoryName :string) => {
    setSelectedCategoryId(categoryId);
    navigate("/stores-picker-by-food", {
      state: { foodCategoryName: categoryName },
    });
  };

  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4">
      {foodCategories.map((category, i) => (
        <div
          key={i}
          onClick={() => gotoCategory(category.id, category.name)}
          className="flex flex-col space-y-2 items-center"
        >
          <img className="w-12 h-12" src={category.icon} />
          <Text size="xxSmall" className="text-gray">
            {category.name}
          </Text>
        </div>
      ))}
    </Box>
  );
};
