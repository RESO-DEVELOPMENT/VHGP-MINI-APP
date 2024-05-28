import { selector, selectorFamily } from "recoil";
import { Product, ProductTypeEnum } from "types/store-menu";
import { menuByStoreState } from "./menu.state";

export const productsState = selector<Product[]>({
  key: "products",
  get: async ({ get }) => {
    const menu = get(menuByStoreState);
    return menu.products.filter(
      (product) =>
        product.type === ProductTypeEnum.SINGLE ||
        product.type === ProductTypeEnum.PARENT
    );
  },
});

export const childrenProductState = selector<Product[]>({
  key: "childProducts",
  get: async ({ get }) => {
    const menu = get(menuByStoreState);
    return menu.products.filter(
      (product) => product.type === ProductTypeEnum.CHILD
    );
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products
      .filter(
        (product) => product.type === "SINGLE" || product.type === "PARENT"
      )
      .sort((a, b) => b.displayOrder - a.displayOrder);
  },
});

export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter(
        (product) =>
          product.categoryId.includes(categoryId) &&
          (product.type === "SINGLE" || product.type === "PARENT")
      );
    },
});
