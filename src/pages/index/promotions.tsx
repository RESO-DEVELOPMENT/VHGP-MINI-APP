import { Section } from "components/section";
import VoucherCard from "pages/card-voucher";
import React, { Suspense } from "react";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { listPromotionState, cartState, listPromotionMockState } from "state";
import { SwiperSlide, Swiper } from "swiper/react";
import { prepareCart } from "utils/product";
import { useNavigate, Box, Tabs, Text } from "zmp-ui";
import { RecommendStorePicker } from "./store/store-picker";
import storeSkeleton from "../../static/store-skeleton.jpg";

const Promtions = () => {
  const navigate = useNavigate();
  const promotionListData = useRecoilValueLoadable(listPromotionState);

  const promotionListMockData = useRecoilValueLoadable(listPromotionMockState);
  // console.log(promotionListData);
  const [cart, setCart] = useRecoilState(cartState);
  if (
    promotionListData.state === "hasValue" &&
    promotionListData.contents !== null &&
    promotionListData.contents.length > 0
  )
    return (
      <Section title="Deal xịn lấy ngay" padding="title-only">
        <Swiper slidesPerView={1.25} spaceBetween={16} className="">
          {promotionListData.contents
            .filter((e) => e.promotionType === 2)
            .map((promotion, index) => (
              <SwiperSlide key={index}>
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
              </SwiperSlide>
            ))}
        </Swiper>
      </Section>
    );
  else return <Box />;
};

export default Promtions;
