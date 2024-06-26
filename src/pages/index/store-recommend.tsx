import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import { RecommendStorePicker } from "pages/index/store/store-picker";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, useNavigate } from "zmp-ui";
import storeSkeleton from "./../../static/store-skeleton.jpg";
import { nearbyStoresState } from "states/store.state";

export const RecommendContent: FC = () => {
  const recommendStores = useRecoilValue(nearbyStoresState);

  return (

    <Section title="Quán ngon gần bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="">
        {recommendStores.map((store) => (
          <SwiperSlide key={store.id}>
            {/* Các cửa hàng được recomment render ở đây */}
            <RecommendStorePicker store={store} isUpdate={false}>
              {({ open }) => (
                <div onClick={open} className="space-y-3 ml-3">
                  <Box
                    className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                    style={{ backgroundImage: `url(${store?.picUrl || storeSkeleton})` }}
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
