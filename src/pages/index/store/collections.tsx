import { Section } from "components/section";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import {
  storeCollectionsByIdState,
  storeProductsByCollectionIdState,
} from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { CollectionPicker, ProductsOfCollection } from "./products-by-collection-id";

//TODO: design
import logo from "../../../static/logo.png";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import product from "utils/product";
import { Product } from "types/store-menu";

export const Collections: FC = (collectionId: string) => {
  const collections = useRecoilValue(storeCollectionsByIdState);
  //  console.log(collections)

  //lấy products dựa trên collection được chọn
  const productsByCollectionId = useRecoilValue(
    storeProductsByCollectionIdState("a16a15d5-66cf-41ca-89c5-90171321f5fd")
  );
  console.log(productsByCollectionId);

  return (
    <>
      {collections.map((collection) => (
        <Section
          key={collection.id}
          title={collection.name}
          padding="title-only"
        >
          <Swiper slidesPerView={1.25} spaceBetween={16} className="">
            {productsByCollectionId.map((product) => (
              <SwiperSlide key={collection.id}>
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
      ))}
    </>
  );
};

