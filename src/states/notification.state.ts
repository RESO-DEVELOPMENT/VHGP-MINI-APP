import { atom } from "recoil";
import logo from "static/logos/logo-vhgp.jpg";
import { Notification } from "../types/notification";

export const notificationsState = atom<Notification[]>({
  key: "notification",

  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng Bean, bạn có thể dùng ứng dụng này để tiết kiệm thời gian sử dụng",
    },
    {
      id: 2,
      image: logo,
      title: "Giảm 50% lần đầu mua hàng",
      content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    },
  ],
});
