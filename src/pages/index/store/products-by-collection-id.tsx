import orderApi from "api/order";
import { DisplayPrice } from "components/display/price";
import { Sheet } from "components/fullscreen-sheet";
import { QuantityPicker } from "components/product/quantity-picker";
import { SingleOptionPicker } from "components/product/single-option-picker";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { cartState, childrenProductState } from "state";
import { ProductList } from "types/cart";
import { Collection, ProductTypeEnum } from "types/store-menu";
import { prepareCart } from "utils/product";
import { Box, Button, Text } from "zmp-ui";

export interface CollectionPickerProps {
  isUpdate: false;
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}
export const ProductsOfCollection: FC<CollectionPickerProps> = ({
  children,
  isUpdate,
}) => {
  const [cart, setCart] = useRecoilState(cartState);
  const childProducts = useRecoilValue(childrenProductState);
  // let currentChild = childProducts
  //   .filter(
  //     (p) =>
  //       collection &&
  //       collection.type === ProductTypeEnum.PARENT &&
  //       p.parentProductId === collection.id
  //   )
  //   .sort((a, b) => a.sellingPrice - b.sellingPrice);

  const [visible, setVisible] = useState(false);

  // const [menuProductId, setMenuProductId] = useState(
  //   childProducts ? null : collection?.menuProductId
  // );

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
    </>
  );
};
