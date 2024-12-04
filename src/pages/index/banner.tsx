import React, { FC } from "react";
import { Box, Text } from "zmp-ui";

export const Banner: FC = () => {
  return (
    <Box style={{ overflowX: "hidden" }} py={4}>
      <Box
        className="w-full max-w-sm mx-auto rounded-lg shadow-lg relative"
        style={{
          aspectRatio: '16/9',
          backgroundImage: "url('https://smartrealtors.vn/wp-content/uploads/2021/10/phan-khu-the-miyako-vinhomes-grand-park-phoi-canh.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)", 
            borderRadius: "inherit",
          }}
        />

        {/* Card Content */}
        <Box className="p-6 relative z-10 h-full flex flex-col justify-between">
          {/* Card Title */}
          <Text size="xLarge" className="text-white font-bold">
            Thẻ thành viên Chợ Vin
          </Text>

          {/* Short Description */}
          <Text size="normal" className="text-white opacity-90 mt-4 font-normal">
            Tận hưởng các ưu đãi đặc biệt chỉ dành cho thành viên.
          </Text>

          {/* Card Footer */}
          <Box className="flex items-center justify-between mt-4">
            <Text size="large" className="text-white font-medium">
              #0000-0000
            </Text>
            <Text size="small" className="text-white opacity-80">
              Exp. 12/2024
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


// import React, { FC, useState } from "react";
// import { useNavigate } from "react-router";
// import { useRecoilValueLoadable } from "recoil";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Box, Text } from "zmp-ui";
// import { Autoplay, Pagination, Navigation, EffectCards } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { memberState } from "states/member.state";

// export const Banner: FC = () => {
//   const member = useRecoilValueLoadable(memberState);
//   const navigate = useNavigate();
//   const gotoPage = () => {
//     navigate("/qr");
//   };
//   return (
//     <Box style={{ overflowX: "hidden" }} py={4}>
//       <Swiper
//         effect={"cards"}
//         grabCursor={true}
//         modules={[EffectCards, Autoplay, Pagination, Navigation]}
//         centeredSlides={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//       >
//         {member.state === "hasValue" &&
//           member.contents?.memberLevel.membershipCard.map((card, i) => (
//             <SwiperSlide key={i} className="px-4" onClick={() => gotoPage}>
//               <Box
//                 className="w-full rounded-xl aspect-[16/9] bg-cover bg-center bg-primary"
//                 style={{
//                   backgroundImage: `url(${card.membershipCardType.cardImg})`,
//                 }}
//               >
//                 <Text size="xLarge" className="p-4 text-white font-bold">
//                   {card.membershipCardType.name}
//                 </Text>
//               </Box>
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </Box>
//   );
// };
