import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { categoriesState, selectedCategoryIdState } from "states/category.state";

export const Categories: FC = () => {
  const categories = useRecoilValue(categoriesState);
  // console.log(categories);
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate("/category");
  };

  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4">
      {categories.map((category, i) => (
        <div
          key={i}
          onClick={() => gotoCategory(category.id)}
          className="flex flex-col space-y-1 items-center"
        >
          <img className="w-16 h-16" src={category.picUrl} />
          <Text size="small" className="text-gray  text-center">
            {category.name}
          </Text>
        </div>
      ))}
    </Box>
  );
};
