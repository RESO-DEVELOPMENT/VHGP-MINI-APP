import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Header, Page, Tabs } from "zmp-ui";
import VoucherCard from "./card-voucher";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { prepareCart } from "utils/product";
import { cartState } from "states/cart.state";
import { listPromotionState } from "states/promotion.state";

const VoucherPage = () => {
  const navigate = useNavigate();
  const promotionListData = useRecoilValueLoadable(listPromotionState);
  const [cart, setCart] = useRecoilState(cartState);

  return (
    <Page className="flex flex-col" style={{ overflow: "hidden" }}>
      <Header title="Mã giảm giá" />
      {/* <SpecialOffers /> */}
      <Tabs scrollable defaultActiveKey={"0"} className="category-tabs">
        <Tabs.Tab key={0} label="Hiện có">
          <Suspense>
            {promotionListData.state === "hasValue" &&
            promotionListData.contents !== null ? (
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                {promotionListData.contents
                  .filter((e) => e.promotionType === 2)
                  .map((promotion) => (
                    <VoucherCard
                      key={promotion.promotionId}
                      promotion={promotion}
                      onClick={() => {
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: promotion.promotionCode,
                          };
                          return prepareCart(res);
                        }),
                          navigate("/cart");
                      }}
                      isUsed={cart.promotionCode === promotion.promotionCode}
                      onCancle={() =>
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: null,
                          };
                          return prepareCart(res);
                        })
                      }
                    />
                  ))}
              </div>
            ) : (
              <Box />
            )}
          </Suspense>
        </Tabs.Tab>
        <Tabs.Tab key={1} label="Của tôi">
          <Suspense>
            {promotionListData.state === "hasValue" &&
            promotionListData.contents !== null ? (
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                {promotionListData.contents
                  .filter((e) => e.promotionType === 3)
                  .map((promotion) => (
                    <VoucherCard
                      key={promotion.promotionId}
                      promotion={promotion}
                      onClick={() =>
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: promotion.promotionCode,
                          };
                          return prepareCart(res);
                        })
                      }
                      isUsed={cart.promotionCode === promotion.promotionCode}
                      onCancle={() =>
                        setCart((prevCart) => {
                          let res = { ...prevCart };
                          res = {
                            ...prevCart,
                            promotionCode: null,
                          };
                          return prepareCart(res);
                        })
                      }
                    />
                  ))}
              </div>
            ) : (
              <Box />
            )}
          </Suspense>
        </Tabs.Tab>
      </Tabs>
    </Page>
  );
};

export default VoucherPage;
