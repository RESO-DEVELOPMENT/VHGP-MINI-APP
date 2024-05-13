import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import { RecommendStorePicker } from "pages/index/store/store-picker";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { nearbyStoresState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, useNavigate } from "zmp-ui";
import storeSkeleton from "./../../static/store-skeleton.jpg";

export const RecommendContent: FC = () => {
  //state: nơi gọi api lấy danh sách sản phẩm bán, cần sửa lại cho nó có thể lấy ra các cửa hàng
  //sửa thành lấy danh sách cửa hàng
  const recommendStores = useRecoilValue(nearbyStoresState);
  // console.log(recommendStores)
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
            {/* Các cửa hàng được recomment render ở đây */}
            <RecommendStorePicker store={store} isUpdate={false}>
              {({ open }) => (
                <div onClick={open} className="space-y-3 ml-3">
                  <Box
                    className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                    style={{ backgroundImage: `url(${store.picUrl || storeSkeleton})` }}
                  >
                    <Text
                      size="small"
                      className="absolute right-2 top-2  bg-red-500 text-white h-5 px-[8px] rounded-full"
                    >
                      <h6>HOT</h6>
                    </Text>
                  </Box>
                  <Box className="space-y-1">
                    <Text size="normal">{store.name}</Text>
                  </Box>
                </div>
              )}
            </RecommendStorePicker>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

//Phần sẽ dc hiển thị khi RecommendContent đag chạy
export const RecommendFallback: FC = () => {
  //5 cửa hàng trống sẽ dc hiển thị khi đợi chạy dữ liệu
  const recommendStores = [...new Array(5)];
  return (
    <Section title="Quán ăn gần bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendStores.map((_, i) => (
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
    //Fallback sẽ dc hiển thị khi  <RecommendContent /> đag xử lý dữ liệu
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
