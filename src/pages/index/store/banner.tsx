import React, { FC } from "react";
import { Box } from "zmp-ui";

//TODO: design
import logo from "./../../../static/logo.png";

export const StoreBanner: FC = (banner: string) => {
  return (
    <Box
      m={3}
      className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
      style={{ backgroundImage: `url(${logo})` }}
    ></Box>
  );
};
