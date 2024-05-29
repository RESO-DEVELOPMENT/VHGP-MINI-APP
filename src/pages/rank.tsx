import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { memberState } from "states/user.state";
import { Box, Progress, Text } from "zmp-ui";

const SkeletonLoader: React.FunctionComponent = () => {
  return (
    <Box
      p={4}
      height={150}
      className="bg-primary rounded-lg grid grid-cols-2 animate-pulse"
    >
      <div className="col-span-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="col-span-1 text-right space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2 ml-auto"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 ml-auto"></div>
      </div>
      <div className="col-span-2 -mb-8">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </Box>
  );
};

const RankInfo: React.FunctionComponent = () => {
  const memberResponse = useRecoilValueLoadable(memberState);
  // console.log(memberResponse);
  if (memberResponse.state === "loading") {
    return <SkeletonLoader />;
  }

  if (memberResponse.state === "hasError") {
    return <div>Error loading data</div>;
  }

  if (memberResponse.state === "hasValue" && memberResponse.contents != null) {
    const memberLevel = memberResponse.contents.memberLevel;

    return (
      <Box
        p={4}
        height={150}
        className="bg-primary rounded-lg grid grid-cols-2"
      >
        <div className="col-span-1">
          <Text size="large">Hạng Thành Viên</Text>
          <Text size="xLarge" className="font-semibold">
            {memberLevel.name}
          </Text>
        </div>
        <div className="col-span-1 text-right">
          <Text size="large">Điểm Tích Lũy</Text>
          <Text size="xLarge" className="font-semibold">
            {memberLevel.point}
          </Text>
        </div>
        <div className="col-span-2 -mb-8">
          <Progress
            strokeWidth={10}
            strokeColor={"#ffd93d"}
            completed={memberLevel.point}
            maxCompleted={memberLevel.maxPoint}
          />
        </div>
        <Text size="large">{memberLevel.name}</Text>
        <Text size="large" className="col-span-1 text-right">
          {memberLevel.nextLevelName}
        </Text>
      </Box>
    );
  }

  return null;
};

export default RankInfo;
