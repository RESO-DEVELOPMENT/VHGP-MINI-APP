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
          <Box flex justifyContent="center" mt={0} py={3}>
            <Button
              prefixIcon={
                <Icon icon="zi-location-solid" className="text-red-500" />
              }
              variant="tertiary"
            >
              Nút 1
            </Button>
            <Button
              prefixIcon={<Icon icon="zi-send-solid" />}
              variant="tertiary"
            >
              Nút 2
            </Button>
          </Box>
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
