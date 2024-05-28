import { atom, selector, selectorFamily } from "recoil";
import { Product, ProductTypeEnum } from "types/store-menu";
import { currentStoreMenuState, menuByStoreState } from "./menu.state";
import { wait } from "utils/async";

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

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  },
});

export const storeProductsByCollectionIdState = selectorFamily({
  key: "storeProductsByCollectionId",
  get:
    (collectionId: string) =>
    async ({ get }) => {
      const menu = get(currentStoreMenuState);
      const productsByCollectionId = menu.products.filter(
        (p) => p.collectionIds.includes(collectionId) && p.type === "PARENT"
      );
      return productsByCollectionId;
    },
});

export const storeProductsByCategoryIdState = selectorFamily<Product[], string>(
  {
    key: "storeProductsByCategoryId",
    get:
      (categoryId: string) =>
      async ({ get }) => {
        const menu = get(currentStoreMenuState);
        const result = menu.products.filter(
          (p) =>
            p.categoryId == categoryId &&
            (p.type === ProductTypeEnum.SINGLE ||
              p.type === ProductTypeEnum.PARENT)
        );
        return result;
      },
  }
);

export const currentStoreChildrenProductState = selector<Product[]>({
  key: "currentStoreChildrenProduct",
  get: async ({ get }) => {
    const menu = get(currentStoreMenuState);
    return menu.products.filter(
      (product) => product.type === ProductTypeEnum.CHILD
    );
  },
});

export const isAddedProductState = atom({
  key: "isAddedProductState",
  default: false,
});
