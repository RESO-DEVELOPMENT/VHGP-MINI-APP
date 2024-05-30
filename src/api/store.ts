import { Store } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";

const getListStore = (params?: any) =>
  requestWebAdmin.get<BaseReponse<Store>>(`brands/stores`, {
    params,
  });

const storeApi = {
  getListStore,
};

export default storeApi;
