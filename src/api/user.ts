import { TStore } from "types/store";
import requestWebAdmin from "utils/axios";
import { BaseReponse } from "types/response";
import { User, UserInfo, UserLogin } from "types/user";
import { Promotion } from "types/promotion";

import { axiosInstances } from "utils/axios";

const apiKey = "34519997-3D4B-4B31-857F-D6612082C11B";

const requestPomotion = axiosInstances.promotion;
const getListStore = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TStore>>(`brands/stores`, {
    params,
  });

const userLogin = (phone: string, name: string) => {
  const data = {
    phone: phone,
    brandCode: null,
    fullName: name,
  };
  //Cái cần chạy
  return requestPomotion.post<UserLogin>(
    `/memberships/signin-zalo?apiKey=${apiKey}`,
    data
  );
  // Cái có thể chạy nhưng chưa đúng
  // return requestPomotion.post<UserLogin>(
  //   `/memberships/signin-zalo?apiKey=E40D5DEE-FC46-4BA1-A2F3-E50A8140D1A6`,
  //   data
  // );
};

// const getListPromotion = (id: string, params?: any) =>
//   requestPomotion.get<Promotion[]>(`memberships/${id}/promotions`, {
//     params,
//   });
const getListPromotion = (id: string) =>
  requestPomotion.get<Promotion[]>(
    `memberships/${id}/promotions?apiKey=${apiKey}`
  );

const getUserInfo = (id: string, params?: any) =>
  requestPomotion.get<UserInfo>(`memberships/${id}`, {
    params,
  });
const generateQrCode = (id: string, params?: any) =>
  requestPomotion.get<string>(`memberships/${id}/qr`, {
    params,
  });

const userApi = {
  getListStore,
  userLogin,
  getListPromotion,
  generateQrCode,
  getUserInfo,
};

export default userApi;
