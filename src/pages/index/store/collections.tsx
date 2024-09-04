import { Section } from "components/section";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, Tabs } from "zmp-ui";
import { ProductPicker } from "components/product/picker";
import drinkSekeleton from "../../../static/skeletons/drink-skeleton.jpg";
import { DisplayPrice } from "components/display/price";
import { productsByCollectionId } from "states/product.state";
import { Collection } from "types/store-menu";

interface CollectionProps {
  collections: Collection[];
}
function cancleTab(event) {
  event.preventDefault(); // Ngăn chặn sự kiện click lan truyền lên các phần tử cha
  console.log("Click event propagation stopped");
}
export const Collections: FC<CollectionProps> = ({ collections }) => {
  return (
    <Tabs activeKey={"0"}>
      <Tabs.Tab disabled key="titleTab" label="Bộ sưu tập"></Tabs.Tab>
      {collections.map((collection, index) => {
        const productsByCollection = useRecoilValue(
          productsByCollectionId(collection.id)
        );
        if (productsByCollection.length <= 0) return null;

        return (
          <Tabs.Tab key={index} label={collection.name} className="pt-4">
            <Swiper slidesPerView={1.2} spaceBetween={4} className="">
              {productsByCollection.map((product) => (
                <SwiperSlide key={product.id} className="pl-4">
                  <ProductPicker product={product} isUpdate={false}>
                    {({ open }) => (
                      <Box className="space-y-2" onClick={open}>
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
                        <Text>{product.name}</Text>
                      </Box>
                    )}
                  </ProductPicker>
                </SwiperSlide>
              ))}
            </Swiper>
          </Tabs.Tab>
        );
      })}
    </Tabs>
  );
};
