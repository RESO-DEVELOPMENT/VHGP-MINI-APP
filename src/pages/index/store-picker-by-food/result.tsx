import React, { Suspense } from "react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Icon, Text } from "zmp-ui";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
//TODO: design
import { selectedStoreIdState, storeIdsByCategoryState, storeState, storesByFoodCategoryState } from "states/store.state";
import storeSkeleton from "../../../static/store-skeleton.jpg";
import { Store } from "types/store";

export const StorePickerbyFoodResult: FC = () => {
  const setStoreSelected = useSetRecoilState(selectedStoreIdState);
  const setStoreState = useSetRecoilState(storeState);
  const navigate = useNavigate();
  const gotoStore = (store: Store) => {
    setStoreState(store);
    setStoreSelected(store.id);
    navigate("/store");
  };
  const storesByFoodCategory = useRecoilValueLoadable(storesByFoodCategoryState);
  switch (storesByFoodCategory.state) {
    case "loading" || "hasError":
      return (
        <Box className="flex-auto bg-background p-4 flex">
          <Suspense fallback={<h1>Chưa có kết quả</h1>}>
          </Suspense>
        </Box>
      );
    case "hasValue":
      const stores = storesByFoodCategory.contents;
      return (
        <Box className="flex-auto bg-background p-4 flex">
          <Suspense fallback={<h1>Chưa có kết quả</h1>}>
            <div className="bg-white rounded-xl overflow-hidden p-0 w-full">
              {stores.length == 0 ? <Text>Không có kết quả phù hợp</Text> : stores.map((store?) => store != null ? (
                <Box
                  key={store.id}
                  className="mb-5"
                  flex
                  onClick={() => gotoStore(store)}
                >
                  <div className="flex-none aspect-card relative w-3/12">
                    <img
                      src={storeSkeleton}
                      className="absolute w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <Box my={4} mx={5} className="w-9/12">
                    {/* {before} */}
                    <Text.Title size="small">{store.name}</Text.Title>
                    {/* {after} */}
                    <Box mx={0} mb={0} flex>
                      <Button
                        prefixIcon={
                          <Icon className="text-yellow-400" icon="zi-star-solid" />
                        }
                        size="small"
                        className="pl-0 relative"
                        variant="tertiary"
                      >
                        <span className="text-gray-500 font-semibold absolute top-2">
                          {/* {restaurant.rating} */}5.0
                        </span>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : null)}
            </div>
          </Suspense>
        </Box>
      );
  }
  return <></>
};
