import { Section } from "components/section";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import {
  storeCollectionsByIdState,
  storeProductsByCollectionIdState,
} from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { ProductsOfCollection } from "./products-by-collection-id";
import { DisplayPrice } from "components/display/price";



export const Collections: FC = (collectionId: string) => {
  const collections = useRecoilValue(storeCollectionsByIdState);

  return (
    <>
      {collections.map((collection, index) => {
        //lấy products dựa trên collection được chọn
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
                  <ProductsOfCollection isUpdate={false}>
                    {({ open }) => (
                      <div onClick={open} className="space-y-3 ml-3">
                        <Box
                          className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                          style={{ backgroundImage: `url(${product.picUrl})` }}
                        >
                          <Text
                            size="small"
                            className="absolute right-2 top-2  bg-red-500 text-white h-5 px-[8px] rounded-full"
                          >
                            <DisplayPrice>{product.sellingPrice}</DisplayPrice>
                          </Text>
                        </Box>
                        <Box className="space-y-1">
                          <Text size="normal">{product.name}</Text>
                        </Box>
                      </div>
                    )}
                  </ProductsOfCollection>
                </SwiperSlide>
              ))}
            </Swiper>
          </Section>
        );
      })}
    </>
  );
};
