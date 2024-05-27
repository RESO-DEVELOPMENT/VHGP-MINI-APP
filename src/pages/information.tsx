import { ListRenderer } from "components/list-renderer";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { memberState, userState } from "state";
import { Box, Text } from "zmp-react";
import userSkeleton from "../static/icons8-user-60.png";
import { Icon } from "zmp-ui";

import logo from "static/logo.png";

const InformationPage = () => {
  const navigate = useNavigate();
  // const user = useRecoilValueLoadable(userState);
  const member = useRecoilValueLoadable(memberState);
  console.log(member);
  const handleBackClick = () => {
    navigate(-1);
  };
  return member.state === "hasValue" && member.contents !== null ? (
    <div className="flex-1  p-3">
     
        <div className="mt-40 mb-8 ">
          <img 
            src={member.contents?.picUrl || userSkeleton}
            alt="User Avatar"
            className="w-50 h-40 object-none mx-auto rounded-full bg-zinc-200"
          />
        </div>
  

      <ListRenderer 
        items={[
          {
            left: (
              <Box className="mr-1 ">
                <Text size="small">
                  <Icon icon="zi-user-solid" className="text-primary"/>
                </Text>
              </Box>
            ),
            right: (
              <Box flex className="">
                {member.contents.fullname || ""}
              </Box>
            ),
          },
          {
            left: (
              <Box className="mr-1">
                <Text size="small">
                  <Icon icon="zi-call-solid" className="text-primary" />
                </Text>
              </Box>
            ),
            right: (
              <Box flex className="">
                {member.contents.phoneNumber || ""}
              </Box>
            ),
          },
          {
            left: (
              <Box className="mr-1">
                <Text size="small">
                  <Icon icon="zi-at" className="text-primary" />
                </Text>
              </Box>
            ),
            right: <Box>{member.contents.email || ""}</Box>,
          },
          {
            left: (
              <Box className="mr-1">
                <Text size="small">
                  <Icon icon="zi-stranger-solid" className="text-primary" />
                </Text>
              </Box>
            ),
            right: <Box flex>{member.contents.gender || ""}</Box>,
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      ></ListRenderer>
    </div>
  ) : (
    <Box />
  );
};

export default InformationPage;
