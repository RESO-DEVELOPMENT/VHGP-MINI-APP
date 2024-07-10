import { a } from "@react-spring/web";
import vhgpApi from "api/address";
import { selector, selectorFamily } from "recoil";
import { Area, Cluster } from "types/vhgp-address";


export const listAreasVHGPState = selector({
  key: "listAreasVHGP",
  get: async () => {
    const listAreas = await vhgpApi.getAreas({
      pageIndex: 1,
      pageSize: 100,
  });
    return listAreas.data;
  },
});

export const getAreaInfosVHGPState = selectorFamily<Area, number>({
  key: "getAreaInfosVHGPState",
  get: (areaId: number) => async () => {
    const response = await vhgpApi.getClusters(areaId);
    return response.data; // Unwrap the data from the response
  },
});
