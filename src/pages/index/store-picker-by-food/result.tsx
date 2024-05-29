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
import logo from "../../../static/logo.png";
import { TStore } from "types/store";
import { selectedStoreIdState, storeIdsByCategoryState } from "states/store.state";

export const StorePickerbyFoodResult: FC = (foodKey: string) => {
  const setStoreSelected = useSetRecoilState(selectedStoreIdState);

  const navigate = useNavigate();
  const gotoStore = (storeId: string) => {
    setStoreSelected(storeId);
    navigate("/store");
  };

  const storesByCategoryIdResponse = useRecoilValueLoadable(
    storeIdsByCategoryState
  );
  // console.log(storesByCategoryIdResponse);
  if(storesByCategoryIdResponse.state === "hasValue"){
    const stores = storesByCategoryIdResponse.contents;
    // console.log(stores);
    return (
      <Box className="flex-auto bg-background p-4 flex">
        <Suspense fallback={<h1>Chưa có kết quả</h1>}>
          <div className="bg-white rounded-xl overflow-hidden p-0 w-full">
            {stores.length == 0 ? <Text>Không có kết quả phù hợp</Text> : stores.map((store) => (
              <Box
                key={store.id}
                className="mb-5"
                flex
                onClick={() => gotoStore(store.id)}
              >
                <div className="flex-none aspect-card relative w-3/12">
                  <img
                    src={logo}
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
            ))}
          </div>
        </Suspense>
      </Box>
    );
  }
 return <></>
};
