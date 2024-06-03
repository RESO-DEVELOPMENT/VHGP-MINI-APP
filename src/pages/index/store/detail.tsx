import React, { FC } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Box, Text } from "zmp-ui";

import storeSkeleton from "../../../static/store-skeleton.jpg";
import { selectedStoreByIdState, storeState } from "states/store.state";

export const StoreDetail: FC = () => {
  //lấy store infor từ selectedStoreByIdState
  const currentStoreLoadable = useRecoilValueLoadable(selectedStoreByIdState);
  const currentStoreState = useRecoilValue(storeState);
  // console.log(currentStoreLoadable);

  if (currentStoreLoadable.state === "hasValue") {
    const currentStore = currentStoreLoadable.contents;
    return (
      <Box className="flex flex-col ">
        <Box m={5}>
          <div className="relative aspect-video w-full rounded-lg">
            <img
              src={storeSkeleton}
              className="absolute w-full h-full object-cover "
            />
          </div>
          <Box
            mx={4}
            className="relative bg-primary border rounded-lg border-primary text-center"
            p={4}
            style={{ marginTop: -60 }}
          >
            <Text className="font-bold">{currentStoreState.name || "Tên quán"}</Text>
            <Text className="text-gray-500">{currentStoreState.address || "Địa chỉ"}</Text>
          </Box>
        </Box>
      </Box>
    );
  } else return (<>Không thể tải dữ liệu của quán</>);
};




