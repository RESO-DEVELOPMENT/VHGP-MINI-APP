import React, { Suspense } from "react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Icon, Text } from "zmp-ui";

//TODO: design
import logo from "../../../static/logo.png";

export const StorePickerbyFoodResult: FC = (foodKey: string) => {
  // console.log("Các cửa hàng nè");
  const navigate = useNavigate();

  return (
    <Box className="flex-auto bg-background p-4 flex">
      <Suspense fallback={<h1>Chưa có kết quả</h1>}>
        <div
          // onClick={onClick ?? viewDetail}
          className="bg-white rounded-xl overflow-hidden p-0"
        >
          <Box m={0} flex>
            <div className="flex-none aspect-card relative w-32">
              <img
                src={logo}
                className="absolute w-full h-full object-cover rounded-xl"
              />
            </div>
            <Box my={4} mx={5} className="min-w-auto">
              {/* {before} */}
              <Text.Title size="small">Demo</Text.Title>
              {/* {after} */}
              <Box mx={0} mb={0} flex>
                <Button
                  prefixIcon={
                    <Icon className="text-yellow-400" icon="zi-star-solid" />
                  }
                  size="small"
                  className="pl-0"
                  variant="tertiary"
                >
                  <span className="text-gray-500 font-semibold">
                    {/* {restaurant.rating} */}
                  </span>
                </Button>
                {/* <Button
                  prefixIcon={<Icon icon="zi-send-solid" />}
                  size="small"
                  variant="tertiary"
                >
                  <span className="text-gray-500">
                    <Distance location={restaurant.location} />
                  </span>
                </Button> */}
              </Box>
            </Box>
          </Box>
        </div>
      </Suspense>
    </Box>
  );
};
