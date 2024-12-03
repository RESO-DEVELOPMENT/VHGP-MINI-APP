import { useVirtualKeyboardVisible } from "hooks";

import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "../cart-icon/cart-icon";
import { OrderIcon } from "../order-icon";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "states/cart.state";
import { navigationMenuPathState } from "states/navigation.state";
import FloatingActionButton from "../cart-icon/FloatingActionButton";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/order": {
    label: "Đặt hàng",
    icon: <Icon icon="zi-add-story" />,
  },
  // "/qr": {
  //   label: "Mã QR",
  //   icon: <Icon icon="zi-qrline" />,
  // },
  "/history": {
    label: "Lịch sử",
    icon: <Icon icon="zi-memory" />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useRecoilState(navigationMenuPathState);
  const navigate = useNavigate();
  const location = useLocation();
  const quantityCart = useRecoilValue(cartState).totalQuantity;

  const noBottomNav = useMemo(
    () => NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname),
    [location]
  );

  const handleFabClick = () => {
    navigate("cart");
  };
  const shouldShowFAB = useMemo(() => {
    return location.pathname === "/order";
  }, [location.pathname]);

  if (noBottomNav) {
    return null;
  }

  return (
    <>
      <BottomNavigation
        id="footer"
        activeKey={activeTab}
        onChange={(key: TabKeys) => setActiveTab(key)}
        className="z-50"
      >
        {Object.entries(tabs).map(([path, { label, icon, activeIcon }]) => (
          <BottomNavigation.Item
            key={path}
            label={label}
            icon={icon}
            activeIcon={activeIcon}
            onClick={() => navigate(path)}
          />
        ))}
      </BottomNavigation>
      {/* Show giỏ hàng nếu như có > 0 sản phẩm */}
      {/* {shouldShowFAB && quantityCart > 0 && (
        <FloatingActionButton onClick={handleFabClick} icon={<CartIcon />} />
      )} */}
      {/* Luôn luôn show giỏ hàng */}
      {shouldShowFAB && (
        <FloatingActionButton onClick={handleFabClick} icon={<CartIcon />} />
      )}
    </>
  );
};

export default Navigation;
