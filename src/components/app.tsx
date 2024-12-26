import React, { useEffect } from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { getConfig } from "utils/config";
import { Layout } from "./navigation-menu/layout";
import { ConfigProvider } from "./config-provider";
import { ProductContextProvider } from "context/app-context";
import { initializeUserLoginState, useInitializeUserLogin, userStateLogin } from "states/user.state";
import AutoLogin from "context/AutoLogin";

const MyApp = () => {
  

  return (
    <RecoilRoot>
  <AutoLogin/>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <ProductContextProvider>
          <App>
            <SnackbarProvider>
              <ZMPRouter>
                <Layout />
              </ZMPRouter>
            </SnackbarProvider>
          </App>
        </ProductContextProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
