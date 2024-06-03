import { atom, selector, selectorFamily } from "recoil";
import { Product, ProductTypeEnum } from "types/store-menu";
import { menuByStore } from "./menu.state";
import { wait } from "utils/async";
import { Store } from "types/store";
import { listStoreState, storeMenuByInputIdState } from "./store.state";

export const productsByStore = selector<Product[]>({
  key: "productsByStore",
  get: async ({ get }) => {
    const menu = get(menuByStore);
    return menu.products;
  },
});

export const productsByCollectionId = selectorFamily<Product[], string>({
  key: "productsByCollectionId",
  get:
    (collectionId: string) =>
    async ({ get }) => {
      const products = get(productsByStore);
      return products.filter(
        (product) =>
          product.collectionIds.includes(collectionId) &&
          product.type !== "CHILD"
      );
    },
});

export const productsByCategoryId = selectorFamily<Product[], string>({
  key: "productsByCategoryId",
  get:
    (categoryId: string) =>
    async ({ get }) => {
      const products = get(productsByStore);
      return products.filter(
        (product) =>
          product.categoryId === categoryId && product.type !== "CHILD"
      );
    },
});

export const productsState = selector<Product[]>({
  key: "products",
  get: async ({ get }) => {
    const menu = get(menuByStore);
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
    const menu = get(menuByStore);
    return menu.products.filter(
      (product) => product.type === ProductTypeEnum.CHILD
    );
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.sort((a, b) => b.displayOrder - a.displayOrder);
  },
});

export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter((product) =>
        product.categoryId.includes(categoryId)
      );
    },
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Map<Store, Product[]>>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return new Map<Store, Product[]>();
    }
    const resMap = get(searchedProductsByKeywordState(keyword));
    await wait(500);
    return resMap as Map<Store, Product[]>;
  },
});

export const isAddedProductState = atom({
  key: "isAddedProductState",
  default: false,
});

export const searchedProductsByKeywordState = selectorFamily<
  Map<Store, Product[]>,
  string
>({
  key: "searchedProductsByKeyword",
  get:
    (keyword: string) =>
    async ({ get }) => {
      const stores = get(listStoreState);
      // console.log(stores);
      //nơi lưu trữ kết quả trả về
      const res: Map<Store, Product[]> = new Map();
      stores.map((store) => {
        let menu = get(storeMenuByInputIdState(store.id));
        let products = menu.products.filter(
          (p) =>
            p.type == ProductTypeEnum.PARENT || p.type == ProductTypeEnum.SINGLE
        );
        let avaiProducts: Product[] = products.filter((product) =>
          product.name
            .trim()
            .toLowerCase()
            .includes(keyword.trim().toLowerCase())
        );
        if (avaiProducts.length >= 2) {
          res.set(store, [avaiProducts[0], avaiProducts[1]]);
        } else if (avaiProducts.length == 1) {
          res.set(store, [avaiProducts[0]]);
        }
      });
      return res;
    },
});

export const currentStoreChildrenProductNoParamState = selector<Product[]>({
  key: "currentStoreChildrenProduct",
  get: async ({ get }) => {
    const menu = get(menuByStore);
    return menu.products.filter(
      (product) => product.type === ProductTypeEnum.CHILD
    );
  },
});

export const currentStoreChildrenProductState = selectorFamily<
  Product[],
  string
>({
  key: "currentStoreChildrenProduct",
  get:
    (storeId: string) =>
    async ({ get }) => {
      if (storeId.length == 0) return [];
      const menu = get(storeMenuByInputIdState(storeId));
      return menu.products.filter(
        (product) => product.type === ProductTypeEnum.CHILD
      );
    },
});
