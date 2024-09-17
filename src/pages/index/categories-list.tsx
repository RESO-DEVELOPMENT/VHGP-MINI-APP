import React, { FC, useState } from "react";
import { Section } from "components/section";
import { useRecoilValueLoadable } from "recoil";
import { Box, Tabs, Icon } from "zmp-ui";
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
      <div>
        <div className="grid grid-cols-4 gap-4">
          {showMore
            ? categories.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src={skeleton}
                    style={{
                      padding: "5px",
                      height: "70px",
                      width: "70px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="text-base whitespace-nowrap overflow-hidden text-ellipsis w-20 text-center">
                    {category.name}
                  </div>
                </div>
              ))
            : categories.slice(0, 8).map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src={skeleton}
                    style={{
                      padding: "5px",
                      height: "70px",
                      width: "70px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="text-base whitespace-nowrap overflow-hidden text-ellipsis w-20 text-center">
                    {category.name}
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        {categories.length > 8 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-5 py-2 border-none rounded-full cursor-pointer m-2.5"
          >
            {showMore ? "Show Less" : "Show More"}{" "}
            {!showMore ? (
              <Icon icon="zi-chevron-down" />
            ) : (
              <Icon icon="zi-chevron-up" />
            )}
          </button>
        )}
      </div>
      <Divider />
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
