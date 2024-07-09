import React, { useEffect, useState } from "react";
import { Box, Icon, Page } from "zmp-ui";
import QRCode from "react-qr-code";
import { useRecoilValueLoadable } from "recoil";
import { memberState } from "states/member.state";
import { Subscription } from "./profile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContentFallback } from "components/content-fallback";
import { MembershipWallets } from "./wallet/membership-wallet";
import { qrState } from "states/user.state";

const QRCodePage: React.FC = () => {
  const [countdown, setCountdown] = useState(120);
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const qrCode = useRecoilValueLoadable(qrState);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const member = useRecoilValueLoadable(memberState);

  useEffect(() => {
    // Thiết lập QR code ban đầu
    if (member.state === "hasValue" && member.contents !== null) {
      setQrCodeValue(
        code ?? member.contents.memberLevel.membershipCard[0].membershipCardCode
      );
    }
  }, [member.state, member.contents, code]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      if (member.state === "hasValue" && member.contents !== null) {
        setQrCodeValue(
          code ??
            member.contents.memberLevel.membershipCard[0].membershipCardCode
        );
      }
      setCountdown(120);
    }
  }, [countdown, member.state, member.contents, code]);

  if (member.state == "loading" || member.state == "hasError") {
    return <ContentFallback />;
  }

  return (
    <Page className="bg-primary p-4 text-black flex justify-center items-center min-h-screen pl-0 pr-0">
      <Box className="h-full w-full flex justify-center items-center ">
        <div className="bg-white p-5 rounded-lg w-11/12 ">
          {member.state === "hasValue" && member.contents !== null ? (
            <>
              {member.contents.memberLevel.memberWallet ? (
                <MembershipWallets />
              ) : (
                ""
              )}
              <div className="text-center">Đưa mã này vào thiết bị quét mã</div>
              <div className="flex justify-center my-8">
                <QRCode value={qrCodeValue ?? ""} />
              </div>
              <div className="text-center mb-4 text-lg">
                {countdown > 0 ? (
                  <span>QR code sẽ hết hạn trong: {countdown}s</span>
                ) : (
                  <span>QR code đã hết hạn</span>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="px-14 py-3 border-2 border-primary rounded-lg flex items-center"
                  onClick={() => navigate("/listTransaction")}
                >
                  <Icon icon="zi-clock-2" className="mr-2" />
                  Giao dịch của bạn
                </button>
              </div>
            </>
          ) : (
            <Subscription />
          )}
        </div>
      </Box>
    </Page>
  );
};

export default QRCodePage;
