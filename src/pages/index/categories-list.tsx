import React, { FC, useState } from "react";
import { Section } from "components/section";
import { useRecoilValueLoadable } from "recoil";
import { Box, Tabs, Icon, Text } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { productsByCategoryId } from "states/product.state";
import { Category } from "types/store-menu";
import skeleton from "../../static/skeletons/fast-food.png";
import { Divider } from "components/divider";

interface ProductListProps {
  categories: Category[];
}
export const Categories: FC<ProductListProps> = ({ categories }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="px-4 mt-4">
        <div className="grid grid-cols-4 gap-4">
          {showMore
            ? categories.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-1 items-center w-20"
                >
                  <img className="w-14 h-14" src={skeleton} />
                  <Text
                    size="small"
                    className="text-gray text-center truncate overflow-hidden text-ellipsis w-full"
                  >
                    {category.name}
                  </Text>
                </div>
              ))
            : categories.slice(0, 8).map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-1 items-center w-20"
                >
                  <img className="w-16 h-16" src={skeleton} />
                  <Text
                    size="small"
                    className="text-gray text-center truncate overflow-hidden text-ellipsis w-full"
                  >
                    {category.name}
                  </Text>
                </div>
              ))}
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        {categories.length > 8 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="pt-2 border-none rounded-full cursor-pointer "
          >
            {showMore ? "Đóng" : "Hiện"}{" "}
            {!showMore ? (
              <Icon icon="zi-chevron-down" />
            ) : (
              <Icon icon="zi-chevron-up" />
            )}
          </button>
        )}
      </div>
      {categories.map((category, index) => (
        <>
          <ProductListTabContent
            categoryName={category.name}
            categoryId={category.id}
            key={category.id}
          />
          <Divider />
        </>
      ))}
    </>
  );
};

interface ProductListTabContentProps {
  categoryId: string;
  categoryName: string;
}
export const ProductListTabContent: FC<ProductListTabContentProps> = ({
  categoryId,
  categoryName,
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
      <>
        <div>
          <Box className="grid grid-cols-2 gap-2">
            <div className="text-xl font-bold ml-3">{categoryName}</div>
            <br />
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
        </div>
      </>
    );
  }
  return <Box />;
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
