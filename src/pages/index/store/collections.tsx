import { Section } from "components/section";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import {
  storeCollectionsByIdState,
  storeProductsByCollectionIdState,
} from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "components/product/picker";

export const Collections: FC = (collectionId: string) => {
  const collections = useRecoilValue(storeCollectionsByIdState);
  // console.log(collections)
  return (
    <>
      {collections.map((collection, index) => {
        const productsByCollectionId = useRecoilValue(
          storeProductsByCollectionIdState(collection.id)
        );
        return (
          <Section key={index} title={collection.name} padding="title-only">
            <Swiper slidesPerView={1.5} spaceBetween={-70} className="">
              {productsByCollectionId.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductPicker isUpdate={false} product={product}>
                    {({ open }) => (
                      <div onClick={open} className="space-y-3 ml-3">
                        <Box className="w-9/12 aspect-square relative">
                          <img
                            loading="lazy"
                            src={product.picUrl}
                            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
                          />
                        </Box>
                        <Box className="space-y-1">
                          <Text size="normal">{product.name}</Text>
                        </Box>
                      </div>
                    )}
                  </ProductPicker>
                </SwiperSlide>
              ))}
            </Swiper>
          </Section>
        );
      })}
    </>
  );
};
