import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Store } from "./../../types/store";
import { Box, Button, Text, useNavigate } from "zmp-ui";

export interface StorePickerProps {
  store: Store;
  isUpdate: false;
  children: (methods: { open: () => void }) => ReactNode;
}
export const RecommendStorePicker: FC<StorePickerProps> = ({
  children,
  isUpdate,
  store,
}) => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const gotoStore = (storeId: string) => {
    navigate("/store", { state: { storeId } });
  };
  return (
    <>
      {children({
        open: () => gotoStore(store.id),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {store && (
            <Box className="space-y-6 mt-2" p={4}>
              <Box className="space-y-4 ml">
                <Text.Title>{store.name}</Text.Title>
                {/* <div className="flex justify-center items-center">
                  {" "}
                  <img
                    src={product.picUrl}
                    alt={product.name}
                    className="w-32 h-32 object-cover"
                  />
                </div> */}
                <Box className="flex justify-between">
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: store.address ?? "",
                      }}
                    ></div>
                  </Text>
                  {/* <Text className="ml-40 font-bold">
                    <DisplayPrice>{product.sellingPrice}</DisplayPrice>
                  </Text> */}
                </Box>
              </Box>
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
