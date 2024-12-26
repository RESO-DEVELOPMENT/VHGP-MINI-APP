import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userStateLogin, initializeUserLoginState } from "states/user.state";

const AutoLogin = () => {
  const setUserLogin = useSetRecoilState(userStateLogin);
  const initializeUserLogin = useRecoilValue(initializeUserLoginState);

  useEffect(() => {
    const userLoginData = localStorage.getItem("userLogin");
    if (userLoginData) {
      const userLogin = JSON.parse(userLoginData);
      setUserLogin(userLogin);
    }
  }, [setUserLogin, initializeUserLogin]);

  return null;
};

export default AutoLogin;