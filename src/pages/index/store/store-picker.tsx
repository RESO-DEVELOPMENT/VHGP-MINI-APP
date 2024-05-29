import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Store } from "../../../types/store";
import { Box, Text, useNavigate } from "zmp-ui";
import { useSetRecoilState } from "recoil";
import { selectedStoreIdState, selectedStoreNameState } from "states/store.state";

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
  //set lại Id cho Selected Store -> sử dụng trong hiện StorePage
  const setSelectedStoreIdState = useSetRecoilState(selectedStoreIdState);
  const setSelectedStoreNameState = useSetRecoilState(selectedStoreNameState);
  const navigate = useNavigate();

  const gotoStore = (store: Store) => {
    setSelectedStoreIdState(store.id);
    setSelectedStoreNameState(store.name);
    navigate("/store");
  };
  return (
    <>
      {children({
        open: () => gotoStore(store),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {store && (
            <Box className="space-y-6 mt-2" p={4}>
              <Box className="space-y-4 ml">
                <Text.Title>{store.name}</Text.Title>

                <Box className="flex justify-between">
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: store.address ?? "",
                      }}
                    ></div>
                  </Text>
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
