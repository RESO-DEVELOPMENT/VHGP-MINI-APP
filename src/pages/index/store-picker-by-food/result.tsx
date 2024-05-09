import React, { Suspense } from "react";
import { FC } from "react";
import { Box } from "zmp-ui";

export const StorePickerbyFoodResult: FC = (foodKey: string) => {
  // console.log("Các cửa hàng nè");
  return (
    <Box className="flex-1 bg-background p-4 flex">
      <Suspense fallback={<h1>Chưa có kết quả</h1>}>
        <h1 className="text-red-300">Xin chào</h1>
      </Suspense>
    </Box>
  );
};
