import { FinalPrice } from "components/display/final-price";
import { ProductPicker } from "components/product/product-picker";
import { ProductSearchResultSkeleton } from "components/skeletons";
import React, { FC, Suspense } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { resultState, searchedProductsByKeywordState, selectedStoreIdState, selectedStoreNameState } from "state";
import { Store, TStore } from "types/store";
import { Product } from "types/store-menu";
import { Box, Text, useNavigate } from "zmp-ui";

import productSkeleton from "../../static/drink-skeleton.jpg";

const SearchResultContent: FC = () => {
  const result: Map<TStore, Product[]> = useRecoilValue(resultState);
  // console.log(result.entries());
  const setSelectedStoreIdState = useSetRecoilState(selectedStoreIdState);
  const setSelectedStoreNameState = useSetRecoilState(selectedStoreNameState);
  const navigate = useNavigate();

  const gotoStore = (store: Store) => {
    setSelectedStoreIdState(store.id);
    setSelectedStoreNameState(store.name);
    navigate("/store");
  };
  return (
    <Box flex flexDirection="column" className="bg-background flex-1 min-h-0">
      <Text.Title className="p-4 pt-0" size="small">
        Kết quả ({result.size})
      </Text.Title>
      {result.size > 0 ? (
        <Box className="px-4 py-0 space-y-4 flex-1 overflow-y-auto rounded">
          {Array.from(result.entries()).map(([store, products]) => (
            <div key={store.id} className="space-y-4">
              <Box
               p={2}
                className="bg-primary rounded-t-lg flex items-center"
                
              >
                <div onClick={() => gotoStore(store)}>

                <Text className="text-white font-semibold">{store.name}</Text>
                </div>
              </Box>

              {products.map((product) => (
                <ProductPicker
                  key={product.id}
                  product={product}
                  isUpdate={false}
                  storeId={store.id}
                >
                  {({ open }) => (
                    <div
                      onClick={open}
                      className="flex items-center space-x-4 p-2 bg-slate-400- rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer m-0"
                    >
                      <img
                        className="w-[50px] h-[50px] rounded-lg object-cover"
                        src={product.picUrl || productSkeleton}
                        alt={product.name}
                      />
                      <Box className="">
                        <Text className="font-medium">{product.name}</Text>
                        <Text size="xSmall" className="text-gray-500">
                          <FinalPrice>{product}</FinalPrice>
                        </Text>
                      </Box>
                    </div>
                  )}
                </ProductPicker>
              ))}
            </div>
          ))}
        </Box>
      ) : (
        <Box className="flex-1 flex justify-center items-center pb-24">
          <Text size="xSmall" className="text-gray">
            Không tìm thấy kết quả. Vui lòng thử lại.
          </Text>
        </Box>
      )}
    </Box>
  );
};

const SearchResultFallback: FC = () => {
  const result = [...new Array(5)];
  return (
    <Box flex flexDirection="column" className="bg-background flex-1 min-h-0">
      <Text.Title className="p-4 pt-0" size="small">
        Đang tìm kiếm...
      </Text.Title>
      <Box className="p-4 pt-0 space-y-4 flex-1 overflow-y-auto">
        {result.map((_, i) => (
          <ProductSearchResultSkeleton key={i} />
        ))}
      </Box>
    </Box>
  );
};

export const SearchResult: FC = () => {
  return (
    <Suspense fallback={<SearchResultFallback />}>
      <SearchResultContent />
    </Suspense>
  );
};
