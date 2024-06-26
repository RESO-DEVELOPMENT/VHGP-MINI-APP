import requestZaloApi from "utils/axios";
import {
  BaseReponse,
  BaseZaloApiResponse,
  LocationResponse,
  PhoneNumberResponse,
} from "types/response";
import { Cart } from "types/cart";
import { getPhoneNumber } from "zmp-sdk";
import { useRecoilValue } from "recoil";
import { accessTokenState, phoneTokenState } from "states/user.state";
import axios from "axios";

const getUserPhone = async (code: string, accessToken: string) => {
  // const api = axios({
  //   method: "post",
  //   headers: {
  //     access_token: accessToken,
  //     secret_key: "SICH83B5BLqUOxHU53Tx",
  //     code: code,
  //   },
  //   url: "https://graph.zalo.me/v2.0/me/info",
  // });
  return axios.get<BaseZaloApiResponse<PhoneNumberResponse>>(
    "https://graph.zalo.me/v2.0/me/info",
    {
      headers: {
        access_token: accessToken,
        secret_key: "B5NBw7U5gOoYWHbWXSck",
        code: code,
      },
    }
  );
};

const getUserLocation = async (code: string, accessToken: string) => {
  return axios.get<BaseZaloApiResponse<LocationResponse>>(
    "https://graph.zalo.me/v2.0/me/info",
    {
      headers: {
        access_token: accessToken,
        secret_key: "B5NBw7U5gOoYWHbWXSck",
        code: code,
      },
    }
  );
};
const zaloApi = {
  getUserPhone,
  getUserLocation,
};

export default zaloApi;
