import React from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box, Text } from "zmp-ui";
import { IoTicket } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdPayments } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { navigationMenuPathState } from "states/navigation.state";
import { on } from "zmp-framework/types/dom";

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  margin: "10px",
};
const swiperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffffff",
};

const iconSize = "40px";
const serviceIcons = [
  {
    icon: <MdPayments className="icon-color" size={iconSize} />,
    title: "Tích điểm",
    routeString: "/qr",
  },
  {
    icon: <FaCartPlus className="icon-color" size={iconSize} />,
    title: "Đặt món",
    routeString: "/order",
  },
  {
    icon: <IoTicket className="icon-color" size={iconSize} />,
    title: "Khuyến mãi",
    routeString: "/voucher",
  },
];
export const SwiperItem: FC = () => {
  const setActiveTab = useSetRecoilState(navigationMenuPathState);
  const navigate = useNavigate();

  // <SwiperSlide key={3} style={swiperStyle} onClick={() => navigate("/gifts-for-sale", {
  //   state: { isGift: false },
  // })
  // }>
  //   <div style={containerStyle}>
  //     <IoIosGift className="icon-color" size={iconSize} />
  //   </div>
  //   <div className="text-center text-sm">Đổi Điểm</div>
  // </SwiperSlide >,
  // <SwiperSlide key={4} style={swiperStyle} onClick={() => navigate("/gifts")}>
  //   <div style={containerStyle}>
  //     <IoIosSend className="icon-color" size={iconSize} />
  //   </div>
  //   <div className="text-center text-sm">Tặng quà</div>
  // </SwiperSlide>,

  return (
    <Box  className="bg-white grid grid-cols-2 gap-4 p-4">
      {serviceIcons.map((icon, index) => (
        <Box
          key={`icon-${index}`}
          onClick={() => {
            setActiveTab(icon.routeString);
            navigate(icon.routeString);
          }}
          className={`flex items-center shadow-sm border border-slate-400 p-4 rounded-lg ${serviceIcons.length % 2 === 1 && index === serviceIcons.length -1 ? "col-span-2 justify-start" : "justify-between"}`}
        >
          <Box className="flex-shrink-1 mr-4">{icon.icon}</Box>
          <Text size="xxSmall" className="text-gray">
            {icon.title}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
