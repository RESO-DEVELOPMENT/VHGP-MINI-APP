import menuApi from "api/menu";
import { selector, selectorFamily } from "recoil";
import { selectedStoreIdState, storeState } from "./store.state";
import { Category, Collection, TMenu } from "types/store-menu";

export const menuByStore = selector<TMenu>({
  key: "menuByStore",
  get: async ({ get }) => {
    const store = get(storeState);
    const menu = await menuApi.getMenu(store.id);
    return menu.data;
  },
});
export const menuByStoreIdInput = selectorFamily<TMenu, string>({
  key: "menuByStoreIdInput",
  get:
    (storeId) =>
    async () => {
      const menu = await menuApi.getMenu(storeId);
      return menu.data;
    },
});

