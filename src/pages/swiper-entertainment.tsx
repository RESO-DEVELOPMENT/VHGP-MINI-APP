import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

export const SwiperEn: FC = () => {
  const slides = [
    {
      image: "https://i.pinimg.com/736x/51/81/a2/5181a2f591084dd47950d6f0db08915f.jpg", 
      title: "Giới thiệu bạn bè nhận voucher ưu đãi",
    },
    {
      image: "https://i.pinimg.com/736x/24/51/5c/24515c4f9ecc393e3659174526bfcf22.jpg", 
      title: "Ra mắt chức năng Membership",
    },
    {
      image: "https://i.pinimg.com/736x/14/67/be/1467befc89994291a72affa3bb258766.jpg", 
      title: "Đặt nước bình tặng ngay trà sữa",
    },
    {
      image: "https://i.pinimg.com/736x/92/98/9c/92989c52f9b8a131ce6c4325e72b6b0a.jpg", 
      title: "Khuyến mãi giờ vàng mỗi ngày",
    },
  ];

  return (
    <Box m={4}>
      <Swiper
        spaceBetween={16}
        slidesPerView={2.2} // Hiển thị 2 slide chính và lòi ra một phần slide thứ 3
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "150px",
                borderRadius: "10px",
              }}
            />
            <Text className="mt-2 text-center font-medium">{slide.title}</Text>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};


// import React from "react";
// import { FC } from "react";
// import { useNavigate } from "react-router";
// import { useRecoilValueLoadable } from "recoil";
// import { listBlogState } from "states/blog.state";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import { Box, Text } from "zmp-ui";

// const container2Style: React.CSSProperties = {
//   position: "relative",
//   backgroundColor: "#ffffff",
//   borderRadius: "10px",
//   boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//   margin: "auto",
//   height: "150px",
//   width: "150px",
// };

// const NextButton = () => {
//   const swiper = useSwiper();
//   return (
//     <button onClick={() => swiper.slideNext()}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="25"
//         height="25"
//         fill="#dca447"
//         className="bi bi-arrow-right-circle-fill"
//         viewBox="0 0 16 16"
//       >
//         <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
//       </svg>
//     </button>
//   );
// };

// export const SwiperEn: FC = () => {
//   const blogList = useRecoilValueLoadable(listBlogState);
//   const navigate = useNavigate();
//   const gotoPage = (id: string) => {
//     navigate("/blog", { state: { id } });
//   };

//   return blogList.state === "hasValue" &&
//     blogList.contents !== null &&
//     blogList.contents.length > 0 ? (
//     <Box m={4}>
//       <Swiper spaceBetween={0} slidesPerView={2}>
//         {blogList.contents.map((item, index) => (
//           <SwiperSlide
//             key={`slide${index + 1}`}
//             onClick={() => gotoPage(item.id)}
//             className="p-1"
//           >
//             <div style={container2Style}>
//               <img
//                 src={item.image}
//                 alt={`Slide ${index + 1}`}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//             <div
//               className="slide-label m-3 text-sm font-medium"
//               style={{ textAlign: "center" }}
//             >
//               {item.title}
//             </div>
//           </SwiperSlide>
//         ))}
//         <div className="absolute top-1/3 right-0 transform -translate-y-1/2 z-10">
//           <NextButton />
//         </div>
//       </Swiper>
//     </Box>
//   ) : (
//     <Box
//       m={4}
//       className="h-[150px] rounded-lg flex items-center justify-center outline-white outline-dashed outline-3  "
//       style={{
//         background: "linear-gradient(to right, #D17842, #E9C46A, #D17842)",
//       }}
//     >
//       <Text size="large" className="text-white text-center font-bold">
//         Sắp diễn ra.....
//       </Text>
//     </Box>
//   );
// };
