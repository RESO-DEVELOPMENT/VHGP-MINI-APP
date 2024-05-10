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
  return (
    <>
      {collections.map((collection, index) => {
        const productsByCollectionId = useRecoilValue(
          storeProductsByCollectionIdState(collection.id)
        );
        return (
          <Section
            key={index}
            title={collection.name}
            padding="title-only"
          >
            <Swiper slidesPerView={1.25} spaceBetween={16} className="">
              {productsByCollectionId.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductPicker isUpdate={false} product={product} >
                    {({ open }) => (
                      <div onClick={open} className="space-y-3 ml-3">
                        <Box
                          className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                          style={{ backgroundImage: `url(${product.picUrl})` }}
                        >
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
