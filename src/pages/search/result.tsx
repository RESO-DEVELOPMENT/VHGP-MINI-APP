import React, { FC, Suspense } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { resultState } from "states/product.state";
import {
  selectedStoreIdState,
  selectedStoreNameState,
} from "states/store.state";
import { Store } from "types/store";
import { Product } from "types/store-menu";
import { Box, Text, useNavigate } from "zmp-ui";
import { FinalPrice } from "components/display/final-price";
import { ProductPicker } from "components/product/picker";
import { ProductSearchResultSkeleton } from "components/skeletons";
import productSkeleton from "static/drink-skeleton.jpg";

const SearchResultContent: FC = () => {
  const result: Map<Store, Product[]> = useRecoilValue(resultState);
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
                className="bg-primary rounded-t-lg flex justify-between items-center relative"
                
              >
                <Text  className="text-white font-semibold">{store.name}</Text>
                <Text size="small"  className="text-sm text-white absolute right-4 text-opacity-70" onClick={() => gotoStore(store)}>
                  Xem thêm
                </Text>
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
                      className="flex items-center gap-4 p-2 pt-0 bg-white rounded-lg shadow-md transition-colors duration-300 hover:bg-gray-200"
                    >
                      <img
                        className="w-16 h-16 rounded-lg object-cover"
                        src={product.picUrl || productSkeleton}
                        alt={product.name}
                      />
                      <Box className="flex flex-col">
                        <Text size="xLarge">{product.name}</Text>
                        <Text size="small">
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
  const navigate = useNavigate();

  return (
    <Suspense fallback={<SearchResultFallback />}>
      <SearchResultContent />
      <Box className="p-4 pt-0">
        <Text
          className="text-right text-blue-500 "
          onClick={() => navigate("/see-more")} // Add onClick event to navigate to see more
        >
          See More
        </Text>
      </Box>
    </Suspense>
  );
};
