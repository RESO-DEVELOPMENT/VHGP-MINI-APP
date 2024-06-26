import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Box, Tabs } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { productsByCategoryId } from "states/product.state";
import { categoriesByStore } from "states/menu.state";
import { Category } from "types/store-menu";
import { CategoryId } from "types/category";

interface ProductListProps {
  categories: Category[];
}
export const ProductList: FC<ProductListProps> = ({ categories }) => {
  return (
    <Tabs scrollable defaultActiveKey={"0"} className="category-tabs">
      {categories.map((category, index) => (
        <Tabs.Tab key={index} label={category.name} className="p-4">
          <ProductListTabContent categoryId={category.id} key={category.id} />
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

interface ProductListTabContentProps {
  categoryId: string;
}
export const ProductListTabContent: FC<ProductListTabContentProps> = ({
  categoryId,
}) => {
  const productsByCategoryLoadable = useRecoilValueLoadable(
    productsByCategoryId(categoryId)
  );
  if (productsByCategoryLoadable.state === "loading") {
    return <Box />;
  }
  if (
    productsByCategoryLoadable.state === "hasValue" &&
    productsByCategoryLoadable.contents
  ) {
    const productsByCategory = productsByCategoryLoadable.contents;
    return (
       <Box className="grid grid-cols-1 gap-4">
          {productsByCategory.length > 0 ? (
            productsByCategory.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onQuantityChange={0}
              />
            ))
          ) : (
            <h6 className="text-center">Chưa có sản phẩm</h6>
          )}
        </Box> 
    );
  }
  return <Box/>
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
