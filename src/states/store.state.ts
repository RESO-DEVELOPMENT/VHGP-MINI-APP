import storeApi from "api/store";
import { atom, selector } from "recoil";

export const selectedStoreIdState = atom<string>({
  key: "selectedStoreId",
  default: "",
});

export const listStoreState = selector({
  key: "listStore",
  get: async () => {
    const listStore = await storeApi.getListStore({
      page: 1,
      size: 10,
      brandCode: "VHGP",
    });
    return listStore.data.items;
  },
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    const stores = get(listStoreState);
    return stores;
  },
});

export const selectedStoreByIdState = selector({
  key: "selectedStoreById",
  get: async ({ get }) => {
    const id = get(selectedStoreIdState);
    const stores = get(listStoreState);
    return stores.filter((s) => s.id === id)[0];
  },
});
