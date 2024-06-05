import menuApi from "api/menu";
import { selector } from "recoil";
import { storeState } from "./store.state";
import { Category, Collection, TMenu } from "types/store-menu";

export const menuByStore = selector<TMenu>({
  key: "menuByStore",
  get: async ({ get }) => {
    const store = get(storeState);
    const menu = await menuApi.getMenu(store.id);
    return menu.data;
  },
});

export const collectionsByStore = selector<Collection[]>({
  key: "collections",
  get: async ({ get }) => {
    const menu = get(menuByStore);
    return menu.collections;
  },
});

export const categoriesByStore = selector<Category[]>({
  key: "categories",
  get: async ({ get }) => {
    const menu = get(menuByStore);
    return menu.categories;
  },
});