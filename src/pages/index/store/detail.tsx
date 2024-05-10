import React, { FC } from "react";
import { useRecoilValueLoadable } from "recoil";
import { selectedStoreByIdState } from "state";
import { Hours } from "types/hours";
import { Box, Text } from "zmp-ui";

//TODO: design
import logo from "../../../static/logo.png";

const { Title } = Text;

//thông tin chi tiết của cửa hàng đang chpn
export const StoreDetail: FC = () => {
  //lấy store infor từ selectedStoreByIdState
  const currentStoreLoadable = useRecoilValueLoadable(selectedStoreByIdState);
  // console.log(currentStoreLoadable);

  const currentStore = currentStoreLoadable.contents;
  return (
    <Box className="flex flex-col ">
      <Box m={5}>
        <div className="relative aspect-video w-full">
          <img
            src={logo}
            className="absolute w-full h-full object-cover rounded-xl"
          />
        </div>
        <Box
          mx={4}
          className="bg-white rounded-2xl text-center relative restaurant-detail-box"
          p={4}
          style={{ marginTop: -60 }}
        >
          <Text className="font-bold">{currentStore.name}</Text>
          <Text className="text-gray-500">{currentStore.address}</Text>
        </Box>
      </Box>
    </Box>
  );
};

