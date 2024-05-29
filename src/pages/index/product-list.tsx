import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { selectedStoreCategoriesState } from "states/store.state";
import { storeProductsByCategoryIdState } from "states/product.state";

export const ProductListContent: FC = () => {
  // const products = useRecoilValue(productsState);
  const categories = useRecoilValue(selectedStoreCategoriesState);
  // console.log(categories);
  // const cart = useRecoilValue(cartState);

  return (
    // <Section title="Danh sách sản phẩm">
    //   <Box className="grid grid-cols-2 gap-4">
    //     {products.map((product) => (
    //       <ProductItem
    //         key={product.id}
    //         product={product}
    //         onQuantityChange={0}
    //       />
    //     ))}
    //   </Box>
    // </Section>
    <>
      {categories.map((categorie) => {
        const productsByCategoryId = useRecoilValueLoadable(
          storeProductsByCategoryIdState(categorie.id)
        );
        // console.log(productsByCategoryId)
        return (
          <Section key={categorie.id} title={categorie.name}>
            <Box className="grid grid-cols-2 gap-4">
              {productsByCategoryId.contents.length > 0 ? (
                <>
                  {productsByCategoryId.state === "hasValue" &&
                    productsByCategoryId.contents.map((product) => (
                      <ProductItem
                        key={product.id}
                        product={product}
                        onQuantityChange={0}
                      />
                    ))}
                </>
              ) : (
                <h6>Chưa có sản phẩm</h6>
              )}
            </Box>
          </Section>
        );
      })}
    </>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
