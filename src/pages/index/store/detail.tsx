import React, { FC } from "react";
import { useRecoilValueLoadable } from "recoil";
import { selectedStoreByIdState } from "state";
import { Hours } from "types/hours";
import { Box, Button, Header, Icon, Page, Text } from "zmp-ui";
//TODO: design
import logo from "../../../static/logo.png";

const { Title } = Text;

//thông tin chi tiết của cửa hàng đang chpn
export const StoreDetail: FC = () => {
  //lấy store infor từ selectedStoreByIdState
  const currentStoreLoadable = useRecoilValueLoadable(selectedStoreByIdState);
  console.log(currentStoreLoadable);

  const currentStore = currentStoreLoadable.contents;
  return (
    <Page className="flex flex-col ">
      <Box>
        <Header title="Thông tin quán" className="z-10" />
      </Box>
      {/* Địa chỉ */}
      <Box
        mx={4}
        px={4}
        pb={2}
        className="bg-white bg-center bg-cover rounded-xl relative overflow-hidden "
        style={{
          backgroundImage: `url(${logo})`,
        }}
      >
        <Box
          className="bg-white rounded-xl text-center relative restaurant-detail-box"
          style={{ marginTop: 60 }}
        >
          <Title className="font-semibold mb-2" size="small">
            Địa chỉ
          </Title>
          <Text className="font-bold">{currentStore.name}</Text>
          <Text className="text-gray-500">{currentStore.address}</Text>
        </Box>
      </Box>

      {/* Giới thiệu */}
      <Box mx={4} mt={4}>
        <Title className="font-semibold mb-2" size="small">
          Giới Thiệu
        </Title>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          voluptas, corporis, doloremque nisi recusandae consequatur, magni
          ipsum deleniti sequi illo porro maxime voluptatibus vero animi
          excepturi repellat. Deleniti, corporis excepturi.
        </Text>
      </Box>
    </Page>
  );
};

function Time({ time }: { time: Hours }) {
  const [hour, minute, ampm] = time;
  return (
    <>
      {`${hour}`.padStart(2, "0")}:{`${minute}`.padStart(2, "0")} {ampm}
    </>
  );
}
