import { Banner } from "pages/index/banner";
import { Subscription } from "pages/profile";
import { SwiperEn } from "pages/swiper-entertainment";
import { SwiperItem } from "pages/swiper-items";
import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { getStorage } from "zmp-sdk";
import { Box, Page, Spinner, Text } from "zmp-ui";
import { WelcomeUser } from "./hello";
import { memberState } from "states/user.state";
import { selectedStoreIndexState } from "states/store.state";
import { ContentFallback } from "components/content-fallback";



const WalletScreen: React.FunctionComponent = () => {
  const member = useRecoilValueLoadable(memberState);
  const setStoreIdx = useSetRecoilState(selectedStoreIndexState);

  const flexContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  useEffect(() => {
    getStorage({
      keys: ["storeIndex"],
      success: (data) => {
        const { storeIndex } = data;
        setStoreIdx(storeIndex ?? 0);
      },
      fail: (error) => {
        setStoreIdx(0);
        console.log(error);
      },
    });
  }, []);

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box className="flex-1 overflow-auto">
        {member.state === "loading" ? ( // Show the spinner when loading
          <ContentFallback />
        ) : member.state === "hasValue" && member.contents !== null ? (
          <>
            <WelcomeUser memberInfo={member.contents} />
            <Banner />
            <Box className="mx-4 mt-4" style={flexContainerStyle}>
              <Text.Title size="normal">Dịch vụ</Text.Title>
            </Box>
            <SwiperItem />
            <Box className="mx-4 mt-8" style={flexContainerStyle}>
              <Text.Title size="normal">Chương trình</Text.Title>
            </Box>
            <SwiperEn />
          </>
        ) : (
          <>
            <Box className="h-24" />
            <Subscription />
            <SwiperItem />
            <Box className="mx-4 mt-4" style={flexContainerStyle}>
              {/* <Text.Title size="normal">Chương trình</Text.Title> */}
            </Box>
            <SwiperEn />
          </>
        )}
      </Box>
    </Page>
  );
};

export default WalletScreen;
