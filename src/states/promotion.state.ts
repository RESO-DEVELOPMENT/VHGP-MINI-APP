import { selector } from "recoil";
import { memberState } from "./user.state";
import userApi from "api/user";


export const listPromotionState = selector({
  key: "listPromotion",
  get: async ({ get }) => {
    const member = get(memberState);
    if (member) {
      const listOrder = await userApi.getListPromotion(
        member?.membershipId || ""
      );
      return listOrder.data;
    }
    return null;
  },
});


