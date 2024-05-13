import React, { FC } from "react";
import { useRecoilValueLoadable } from "recoil";
import { selectedStoreByIdState } from "state";
import { Hours } from "types/hours";
import { Box, Text } from "zmp-ui";

//TODO: design
import logo from "../../../static/logo.png";
//TODO: skeleton for error || null url image
import storeSkeleton from "../../../static/store-skeleton.jpg";
// const { Title } = Text;

//thông tin chi tiết của cửa hàng đang chpn
export const StoreDetail: FC = () => {
  //lấy store infor từ selectedStoreByIdState
  const currentStoreLoadable = useRecoilValueLoadable(selectedStoreByIdState);
  // console.log(currentStoreLoadable);

  if(currentStoreLoadable.state === "hasValue"){
    const currentStore = currentStoreLoadable.contents; 
    return (
      <Box className="flex flex-col ">
      <Box m={5}>
        <div className="relative aspect-video w-full rounded-lg">
          <img
            src={currentStore.picUrl ||storeSkeleton}
            className="absolute w-full h-full object-cover "
          />
        </div>
        <Box
          mx={4}
          className="relative bg-primary border rounded-lg border-primary text-center"
          p={4}
          style={{ marginTop: -60 }}
        >
          <Text className="font-bold">{currentStore.name || "Tên quán"}</Text>
          <Text className="text-gray-500">{currentStore.address || "Địa chỉ"}</Text>
        </Box>
      </Box>
    </Box> 
    );
  }else return (<>Không thể tải dữ liệu của quán</>);
  const currentStore = currentStoreLoadable.contents;
  
};



 
