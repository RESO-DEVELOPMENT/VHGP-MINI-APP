import { Section } from "components/section";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "components/product/picker";
import drinkSekeleton from "../../../static/drink-skeleton.jpg";
import { DisplayPrice } from "components/display/price";
import { productsByCollectionId } from "states/product.state";
import { collectionsByStore } from "states/menu.state";

export const Collections: FC = () => {
  const collections = useRecoilValue(collectionsByStore);
  return (
    <>
      {collections.map((collection, index) => {
        const productsByCollection = useRecoilValue(productsByCollectionId(collection.id));
        if (productsByCollection.length <= 0) return;
        return (
          <Section key={index} title={collection.name} padding="title-only">
            <Swiper slidesPerView={2} spaceBetween={4} className="">
              {productsByCollection.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductPicker isUpdate={false} product={product}>
                    {({ open }) => (
                      <div onClick={open} className="space-y-3 ml-3">
                        <Box className="w-full aspect-square relative">
                          <img
                            loading="lazy"
                            src={product.picUrl || drinkSekeleton}
                            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
                          />
                        </Box>
                        <Text
                          size="small"
                          className="absolute right-2 top-2  bg-primary text-white h-5 px-[8px] rounded-full"
                        >
                          <DisplayPrice>{product.sellingPrice}</DisplayPrice>
                        </Text>
                        <Box className="space-y-1">
                          <Text size="xLarge">{product.name}</Text>
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
