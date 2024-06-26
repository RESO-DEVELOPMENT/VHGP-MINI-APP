import { Section } from "components/section";
import React, { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "components/product/picker";
import drinkSekeleton from "../../../static/drink-skeleton.jpg";
import { DisplayPrice } from "components/display/price";
import { productsByCollectionId } from "states/product.state";
import { Collection } from "types/store-menu";


interface CollectionProps {
  collections: Collection[];
}
export const Collections: FC<CollectionProps> = ({collections}) => {
  return (
    <>
      {collections.map((collection, index) => {
        const productsByCollection = useRecoilValue(
          productsByCollectionId(collection.id)
        );
        if (productsByCollection.length <= 0) return;
        return (
          <Section key={index} title={collection.name} padding="title-only">
            <Swiper slidesPerView={2} spaceBetween={4} className="">
              {productsByCollection.map((product) => (
                <SwiperSlide key={product.id} className="pl-4">
                  <ProductPicker product={product} isUpdate={false}>
                    {({ open }) => (
                      <div className="space-y-2" onClick={open}>
                        <Box className="relative w-full h-full">
                          <img
                            loading="lazy"
                            src={product.picUrl || drinkSekeleton}
                            className="w-full h-48 md:h-64 lg:h-72 xl:h-80 object-cover rounded-lg bg-skeleton"
                            alt={product.name}
                          />
                          <Text
                            size="normal"
                            className="absolute right-2 top-2 bg-primary text-white rounded-full px-4 py-1 border border-white"
                          >
                            <DisplayPrice>{product.sellingPrice}</DisplayPrice>
                          </Text>
                        </Box>
                        <Text className="text-base md:text-lg lg:text-xl xl:text-2xl">
                          {product.name}
                        </Text>
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
