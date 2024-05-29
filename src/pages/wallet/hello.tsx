import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import iconWallet from "../../static/icons8-wallet-50.png";
import iconUser from "../../static/icons8-user-60.png";

import { UserInfo } from "types/user";
import { userState } from "states/user.state";

import { DisplayValue } from "components/display/value";
export interface MemberBalanceProps {
  memberInfo?: UserInfo;
}
export const WelcomeUser: FC<MemberBalanceProps> = ({ memberInfo }) => {
  const user = useRecoilValueLoadable(userState);
  // console.log("user", user);
  // const money = memberInfo?.memberLevel.memberWallet.find(
  //   (e) => e.walletType.name === "MONEY"
  // );
  const money = memberInfo?.memberLevel.memberWallet[0];
  return (
    <Header
      className={`app-header no-border pl-4 flex-none pb-[6px] custom-header`}
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <img
              className="w-8 h-8 rounded-lg border-inset"
              src={memberInfo?.avatar || iconUser}
            />

            <Box>
              <Text className=" flex">
                <Text className="mr-1.5 font-bold">Chào</Text>
                {user.state === "hasValue" ? (
                  <Text className="font-bold">{memberInfo?.fullname || user.contents.name}</Text>
                ) : (
                  <Text className="font-bold">...</Text>
                )}
              </Text>
              <Box className="flex" alignItems="center">
                <Text size="normal" className="font-bold text-primary flex">
                  <DisplayValue value={money?.balance ?? 0} />
                  <img className="w-5 h-5 ml-1.5" src={iconWallet} />
                </Text>
              </Box>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};
