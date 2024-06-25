import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { productsByCategoryId } from "states/product.state";
import { categoriesByStore } from "states/menu.state";

export const ProductListContent: FC = () => {
  const categories = useRecoilValue(categoriesByStore);


  return (
    <>
      {categories.map((categorie) => {
        const productsByCategory = useRecoilValue(productsByCategoryId(categorie.id));
        return (
          <Section key={categorie.id} title={categorie.name}>
            <Box className="grid grid-cols-1 gap-4">
              {productsByCategory.length > 0 ? (
                <>
                  {productsByCategory.map((product) => (
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
      <Box className="grid grid-cols-2">
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
