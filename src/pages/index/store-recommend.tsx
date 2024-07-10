import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import { RecommendStorePicker } from "pages/index/store/store-picker";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import storeSkeleton from "./../../static/skeletons/store-skeleton.png";
import { nearbyStoresState } from "states/store.state";

export const RecommendContent: FC = () => {
  const recommendStores = useRecoilValue(nearbyStoresState);

  return (
    <Section title="Quán ngon gần bạn" padding="title-only">
      {recommendStores.map((store, index) => (
        <RecommendStorePicker key={index} store={store} isUpdate={false}>
          {({ open }) => (
            <div onClick={open} className="ml-3 flex ">
              <Box
                className="relative overflow-hidden rounded-lg shadow-md"
                style={{
                  width: "100px", // Điều chỉnh chiều rộng của hình ảnh
                  height: "100px", // Điều chỉnh chiều cao của hình ảnh
                }}
              >
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{
                    backgroundImage: `url(${store?.picUrl || storeSkeleton})`,
                  }}
                />
                <Text
                  size="small"
                  className="absolute right-2 top-2 bg-primary text-white px-2 py-1 rounded-full"
                >
                  <h6>HOT</h6>
                </Text>
              </Box>
              <Box className="ml-2 flex-col justify-start px-2 py-2 ">
                <Text className="font-bold" size="large">{store.name}</Text>
                <Text className=" mt-1" size="normal">{store.address}</Text>
              </Box>
              
            </div>
          )}
        </RecommendStorePicker>
      ))}
    </Section>
  );
};

export const RecommendFallback: FC = () => {
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
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
