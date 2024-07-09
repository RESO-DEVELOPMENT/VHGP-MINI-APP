import React, { FC } from "react";
import { Spinner } from "zmp-ui";
import vhgpLogo from "static/logos/logo-vhgp.jpg";

export const ContentFallback: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <Spinner visible logo={vhgpLogo} />
    </div>
  );
};
