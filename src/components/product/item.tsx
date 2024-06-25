import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import React, { FC, useState } from "react";
import { Product } from "types/store-menu";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "./picker";
import drinkSekeleton from "../../static/drink-skeleton.jpg";

export const ProductItem: FC<{
  product: Product;
  onQuantityChange: number;
}> = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  return (
    <ProductPicker product={product} isUpdate={false}>
      {({ open }) => (
        <div className="space-y-2 relative" onClick={open}>
          {quantity > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              className="absolute bottom-0 right-0 w-9"
            >
              <circle
                cx="15"
                cy="15"
                r="11"
                stroke="#04bfad"
                strokeWidth="1"
                fill="white"
              />
              <text
                x="50%"
                y="50%"
                fontSize="15"
                textAnchor="middle"
                dy=".3em"
                fill="#04bfad"
              >
                {quantity}
              </text>
            </svg>
          )}
          <Box className="flex items-stretch w-full h-full overflow-hidden">
            <Box className="w-1/4 h-full flex-shrink-0">
              <img
                loading="lazy"
                src={product.picUrl || drinkSekeleton}
                className="object-cover object-center rounded-lg"
                style={{ aspectRatio: "1" }}
              />
            </Box>
            <Box className="w-2/3 pl-4 flex flex-1 flex-col m-2">
              <Text size="large">{product.name}</Text>
              <Text size="small" className="text-gray">{product.description}</Text>
              <Text size="normal" className=" mt-6 font-semibold">
                <DisplayPrice>{product.sellingPrice}</DisplayPrice>
              </Text>
            </Box>
          </Box>
        </div>
      )}
    </ProductPicker>
  );
};

