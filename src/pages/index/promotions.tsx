import { Section } from "components/section";
import VoucherCard from "pages/card-voucher";
import React from "react";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { SwiperSlide, Swiper } from "swiper/react";
import { prepareCart } from "utils/product";
import { useNavigate, Box, Text } from "zmp-ui";
import { listPromotionState } from "states/promotion.state";
import { cartState } from "states/cart.state";
import voucherIcon from "../../static/icons/voucher.png";
const Promotions = () => {
  const navigate = useNavigate();
  const promotionListData = useRecoilValueLoadable(listPromotionState);
  const [cart, setCart] = useRecoilState(cartState);
  if (promotionListData.state === "hasValue" && promotionListData.contents)
    return (
      // <Section title="Deal xịn lấy ngay" padding="title-only">
      //   <Swiper slidesPerView={1.25} spaceBetween={16} className="">
      //     {promotionListData.contents
      //       .filter((e) => e.promotionType === 2)
      //       .map((promotion, index) => (
      //         <SwiperSlide key={index}>
      //           <VoucherCard
      //             key={promotion.promotionId}
      //             promotion={promotion}
      //             onClick={() => {
      //               setCart((prevCart) => {
      //                 let res = { ...prevCart };
      //                 res = {
      //                   ...prevCart,
      //                   promotionCode: promotion.promotionCode,
      //                 };
      //                 return prepareCart(res);
      //               }),
      //                 navigate("/cart");
      //             }}
      //             isUsed={cart.promotionCode === promotion.promotionCode}
      //             onCancle={() =>
      //               setCart((prevCart) => {
      //                 let res = { ...prevCart };
      //                 res = {
      //                   ...prevCart,
      //                   promotionCode: null,
      //                 };
      //                 return prepareCart(res);
      //               })
      //             }
      //           />
      //         </SwiperSlide>
      //       ))}
      //   </Swiper>
      // </Section>

      <Box p={4} mx={4} className="flex justify-between items-center outline-primary outline-dashed outline-2 outline-offset-2 rounded-lg ">
        <Box className="flex items-center ">
          <img className="w-8 h-8 mr-2" src={voucherIcon} alt="Voucher Icon" />
          <div>
            <Text>{`Có ${promotionListData.contents.length} ưu đãi đang chờ bạn !`}</Text>
          </div>
        </Box>
        <div>
          <Text
            onClick={() => navigate("/voucher")}
            className="cursor-pointer text-primary"
          >
            Xem
          </Text>
        </div>
      </Box>
    );
  else return (
    <Box p={4} mx={4} className="flex justify-between items-center outline-primary outline-dashed outline-2 outline-offset-2 rounded-lg ">
        <Box className="flex items-center ">
          <img className="w-8 h-8 mr-2" src={voucherIcon} alt="Voucher Icon" />
          <div>
            <Text>{`Đăng nhập để nhận ưu đãi !`}</Text>
          </div>
        </Box>
      </Box>
  );
};

export default Promotions;
