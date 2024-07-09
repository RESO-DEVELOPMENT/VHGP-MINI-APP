import React, { FC } from "react";
import {  Header } from "zmp-ui";

export const Welcome: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
    />
  );
};
