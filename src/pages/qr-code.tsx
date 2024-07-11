import React, { useEffect, useState } from "react";
import { Box, Header, Icon, Page } from "zmp-ui";
import QRCode from "react-qr-code";
import { useRecoilValueLoadable } from "recoil";
import { memberState } from "states/member.state";
import { Subscription } from "./profile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContentFallback } from "components/content-fallback";
import { MembershipWallets } from "./wallet/membership-wallet";
import { qrState } from "states/user.state";
import cart from "../static/icons/qrpoint.png";

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

  if (member.state === "hasValue" && member.contents === null) {
    return (
      <Page>
        <Header
          title="Mã QR"
          backIcon={<img className="text-primary" src={cart} />}
          onBackClick={() => {}}
          showBackIcon={true}
          className="py-4"
        />
        <Subscription />
      </Page>
    );
  }
  if (member.state === "hasValue" && member.contents !== null)
    return (
      <>
        <Header
          title="Mã QR"
          backIcon={<img className="text-primary" src={cart} />}
          onBackClick={() => {}}
          showBackIcon={true}
          className="py-4"
        />
        <Page className="p-4 flex items-center justify-center bg-primary min-h-screen">
          <div className="w-full bg-white h-auto p-6 rounded-lg shadow-lg">
            <Box>
              {member!.contents!.memberLevel.memberWallet ? (
                <MembershipWallets />
              ) : (
                ""
              )}
            </Box>
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
                Giao dịch của bạn
              </button>
            </div>
          </div>
        </Page>
      </>
    );
  return <Box />;
};

export default QRCodePage;
