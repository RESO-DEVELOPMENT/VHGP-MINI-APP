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
    <div style={{ display: "flex", flexDirection: "row" }}>
      {" "}
      {/* Added a parent div to wrap the returned JSX */}
      {/* <Tabs scrollable={true} defaultActiveKey={"content-0"}> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {collections.map((collection, index) => (
          <div
            key={index}
            style={{
              margin: "5px 10px",
              maxWidth: "calc(25% - 20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn.hita.com.vn/storage/blog/am-thuc-doi-song/cach-nau-pho-3.jpeg"
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <Text>Bún Phở</Text>
          </div>
        ))}
      </div>
      {/* </Tabs> */}
    </div> // Closing the parent div
    /* {collections.map((collection, index) => {
        const productsByCollection = useRecoilValue(
          productsByCollectionId(collection.id)
        );
        if (productsByCollection.length <= 0) return;
        return (
          <>
            <Tabs.Tab disabled key="titleTab" label="Bộ sưu tập"></Tabs.Tab>
            <Tabs.Tab
              key={`content-0`}
              label={collection.name}
              className="pt-4"
            >
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
                              <DisplayPrice>
                                {product.sellingPrice}
                              </DisplayPrice>
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
          </>
        );
      })} */
  );
};
