import React, { } from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box } from "zmp-ui";
import { IoTicket } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  backgroundColor: "#ffffff",
  padding: "10px",
  borderRadius: "10px",
  width: "100%",
  height: "60px",
};
const iconSize = "35px";
export const SwiperItem: FC = () => {
  const navigate = useNavigate();
  const swiperSlides1 = [
    <SwiperSlide key={0} onClick={() => navigate("/qr")}>
      <div style={containerStyle}>
        <MdPayments className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Tích điểm</div>
    </SwiperSlide>,
    <SwiperSlide key={2} onClick={() => navigate("/order")}>
      <div style={containerStyle}>
        <FaCartPlus className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm">Đặt món</div>
    </SwiperSlide>,
    <SwiperSlide key={3} onClick={() => navigate("/voucher")}>
      <div style={containerStyle}>
        <IoTicket className="icon-color" size={iconSize} />
      </div>
      <div className="text-center text-sm w-full">Khuyến mãi</div>
    </SwiperSlide>,
  ];
  return (
    <Box m={2}>
      <Swiper
        spaceBetween={2}
        slidesPerView={4}
      >
        {swiperSlides1}
      </Swiper>
    </Box>
  );
};
