import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { Product } from "types/store-menu";
import { Box, Radio, Text } from "zmp-ui";

export const SingleOptionPicker: FC<{
  variant: Product[];
  value: string;
  defaultValue: string;
  varianName: string;
  onChange: (value: string) => void;
}> = ({ variant, value, defaultValue, varianName, onChange }) => {
  // console.log(variant)
  return (
    <Box my={4} className="space-y-2">
      <Text.Title size="small">{varianName}</Text.Title>
      <Radio.Group
        className="flex flex-col space-y-3"
        name={varianName}
        defaultValue={defaultValue}
        value={value}
        onChange={(selectedOption: string) => {
          onChange(selectedOption);
        }}
      >
        {variant.length > 0 && variant.map((option) => (
          <Radio
            key={option.menuProductId}
            value={option.menuProductId}
            className={(value === option.menuProductId ? "font-bold" : "") + "flex items-center"}
          >
            <Box className="w-[360px] flex justify-between items-center">
              <Text
                className={
                  value === option.menuProductId
                    ? "font-bold"
                    : ""
                }
              >
                Size {option.size}
              </Text>
              <Text
                className={
                  value === option.menuProductId
                    ? "font-bold"
                    : ""
                }
              >
                <DisplayPrice>{option.sellingPrice}</DisplayPrice>
              </Text>
            </Box>
          </Radio>
        ))}
      </Radio.Group>
    </Box>
  );
};
