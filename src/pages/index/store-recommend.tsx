import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import { StoreRecommend } from "components/store/store-picker";
import { StorePicker } from "pages/cart/store-picker";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { listStoreState, recommendProductsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import logo from "./../../static/logo.png";

export const RecommendContent: FC = () => {
  //state: nơi gọi api lấy danh sách sản phẩm bán, cần sửa lại cho nó có thể lấy ra các cửa hàng
  //sửa thành lấy danh sách cửa hàng
  const recommendStores = useRecoilValue(listStoreState);
  /*
    1 cửa hàng gồm các thông tin sau (mẫu)
  {
    address : "P. Đông Hòa -TX Dĩ An - Tỉnh Bình Dương"
    brandId : "e40d5dee-fc46-4ba1-a2f3-e50a8140d1a6"
    code : "BEAN-NVH"
    email : "duong.nguyen@reso.vn"
    id : "21e7e18a-569f-46bf-a926-69c5198d4d78"
    lat : "10.8753031"
    locationNearby : "Tầng G_Tầng 2_Tầng 3_Tầng 4_Tầng 5_Tầng 6"
    long : "106.8004487"
    name : "Bean Nhà Văn Hóa "
    shortName : "Bean Nhà văn hoá SV"
    status : "Active"
    wifiName : null
    wifiPassword : null
  }
  */

  return (
    //Phần hiện "Quán ăn gần bạn"
    <Section title="Quán ăn gần bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="">
        {recommendStores.map((store) => (
          <SwiperSlide key={store.id}>
            <StoreRecommend store={store} isUpdate={false}>
              {({ open }) => (
                <div onClick={open} className="space-y-3 ml-3">
                  <Box
                    className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                    style={{ backgroundImage: `url(${logo})` }}
                  >
                    <Text
                      size="small"
                      className="absolute right-2 top-2  bg-red-700 text-white h-5 px-[8px] rounded-full"
                    >
                      <h6>HOT</h6>
                    </Text>
                  </Box>
                  <Box className="space-y-1">
                    <Text size="normal">{store.name}</Text>
                  </Box>
                </div>
              )}
            </StoreRecommend>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(5)];
  console.log("tới đây");
  return (
    <Section title="Quán ăn gần bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Recommend: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
