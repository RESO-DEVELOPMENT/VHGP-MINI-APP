import { filter } from "lodash";
import { any, string } from "prop-types";
import React, { FC, useState, useEffect, useMemo } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {
  listAreasVHGPState,
  getAreaInfosVHGPState,
} from "states/address.state";
import { addressState } from "states/order.state";
import { Area } from "types/vhgp-address";
import { Box, Picker, Text } from "zmp-ui";
import { PickerColumnOption, PickerDataType } from "zmp-ui/picker";

type PickerValue = {
  Area?: { value: string; displayName: string };
  Cluster?: { value: string; displayName: string };
  Building?: { value: string; displayName: string };
};

const AddressPicker: FC = () => {
  const setAddress = useSetRecoilState(addressState);
  const [selectedArea, setSelectedArea] = useState<string | undefined>();
  const [selectedCluster, setSelectedCluster] = useState<string | undefined>();
  const [selectedBuilding, setSelectedBuilding] = useState<
    string | undefined
  >();
  const [selectedAreaName, setSelectedAreaName] = useState<
    string | undefined
  >();
  const [selectedClusterName, setSelectedClusterName] = useState<
    string | undefined
  >();
  const [selectedBuildingName, setSelectedBuildingName] = useState<
    string | undefined
  >();

  const areasLoadBalance = useRecoilValueLoadable(listAreasVHGPState);
  const areaInfoLoadable = useRecoilValueLoadable(
    getAreaInfosVHGPState(+selectedArea!)
  );

  useEffect(() => {
    if (
      areasLoadBalance.state === "hasValue" &&
      areasLoadBalance.contents !== null &&
      selectedArea === undefined
    ) {
      const { id, name } = areasLoadBalance.contents[0];
      setSelectedArea(id);
      setSelectedAreaName(name);
    }
  }, [areasLoadBalance, selectedArea]);

  useEffect(() => {
    if (
      areaInfoLoadable.state === "hasValue" &&
      areaInfoLoadable.contents !== null &&
      selectedArea !== undefined
    ) {
      const { id, name, listBuilding } =
        areaInfoLoadable.contents.listCluster[0];
      setSelectedCluster(id.toString());
      setSelectedClusterName(name);
      setSelectedBuilding(listBuilding[0].id.toString());
      setSelectedBuildingName(listBuilding[0].name);
    }
  }, [areaInfoLoadable, selectedArea]);

  useEffect(() => {
    if (
      areaInfoLoadable.state === "hasValue" &&
      areaInfoLoadable.contents !== null &&
      selectedCluster !== undefined
    ) {
      const selectedClusterInfo = areaInfoLoadable.contents.listCluster.find(
        (cluster) => cluster.id.toString() === selectedCluster
      );
      if (selectedClusterInfo) {
        const { id, name } = selectedClusterInfo.listBuilding[0];
        setSelectedBuilding(id.toString());
        setSelectedBuildingName(name);
      }
    }
  }, [selectedCluster, areaInfoLoadable]);

  useEffect(() => {
    setAddress(
      `${selectedAreaName}, ${selectedClusterName}, ${selectedBuildingName}`
    );
  }, [selectedAreaName, selectedClusterName, selectedBuildingName, setAddress]);

  const areaOptions = useMemo(() => {
    if (
      areasLoadBalance.state === "hasValue" &&
      areasLoadBalance.contents !== null
    ) {
      const areas: Area[] = areasLoadBalance.contents;
      return areas.map(({ id, name }) => ({
        key: id.toString(),
        value: id,
        displayName: name,
      }));
    }
    return [];
  }, [areasLoadBalance]);

  const clusterOptions = useMemo(() => {
    if (
      areaInfoLoadable.state === "hasValue" &&
      areaInfoLoadable.contents !== null &&
      areaInfoLoadable.contents.listCluster.length > 0
    ) {
      return areaInfoLoadable.contents.listCluster.map(({ id, name }) => ({
        key: id.toString(),
        value: id.toString(),
        displayName: name,
      }));
    }
    return [{ key: "", value: "", displayName: "______" }];
  }, [areaInfoLoadable]);

  const buildingOptions = useMemo(() => {
    if (
      areaInfoLoadable.state === "hasValue" &&
      areaInfoLoadable.contents !== null &&
      areaInfoLoadable.contents.listCluster.length > 0
    ) {
      return (
        areaInfoLoadable.contents.listCluster
          .find((c) => c.id.toString() === selectedCluster)
          ?.listBuilding.map(({ id, name }) => ({
            key: id.toString(),
            value: id.toString(),
            displayName: name,
          })) ?? [{ key: "", value: "", displayName: "______" }]
      );
    }
    return [{ key: "", value: "", displayName: "______" }];
  }, [areaInfoLoadable, selectedCluster]);

  if (areasLoadBalance.state === "loading") {
    return (
      <Box>
        <Text title="Đang tải dữ liệu tòa nhà..."></Text>
      </Box>
    );
  }

  if (
    areasLoadBalance.state === "hasValue" &&
    areasLoadBalance.contents !== null
  ) {
    const pickerData1: PickerDataType[] = [
      { name: "Area", options: areaOptions },
    ];
    const pickerData2: PickerDataType[] = [
      { name: "Cluster", options: clusterOptions },
    ];
    const pickerData3: PickerDataType[] = [
      { name: "Building", options: buildingOptions },
    ];

    return (
      <Box>
        <Picker
          helperText="Chọn địa chỉ giao hàng của bạn"
          placeholder={`${selectedAreaName}`}
          title="Cuộn để hiển thị thông tin"
          onChange={(selectedValues) => {
            if (
              selectedValues.Area?.value &&
              selectedValues.Area?.value.toString() !== selectedArea
            ) {
              setSelectedArea(selectedValues.Area?.value.toString());
              setSelectedAreaName(selectedValues.Area?.displayName);
              setSelectedCluster(undefined);
              setSelectedClusterName(undefined);
              setSelectedBuilding(undefined);
              setSelectedBuildingName(undefined);
            }
          }}
          mask={true}
          disabled={false}
          data={pickerData1}
        />

        {selectedCluster !== undefined && (
          <Picker
            helperText="Chọn địa chỉ giao hàng của bạn"
            placeholder={` ${selectedClusterName}`}
            title="Cuộn để hiển thị thông tin"
            onChange={(selectedValues) => {
              if (
                selectedValues.Cluster?.value &&
                selectedValues.Cluster?.value.toString() !== selectedCluster
              ) {
                setSelectedCluster(selectedValues.Cluster?.value.toString());
                setSelectedClusterName(selectedValues.Cluster?.displayName);
                setSelectedBuilding(undefined);
                setSelectedBuildingName(undefined);
              }
            }}
            mask={true}
            disabled={false}
            data={pickerData2}
          />
        )}
        {selectedBuilding !== undefined && (
          <Picker
            helperText="Chọn địa chỉ giao hàng của bạn"
            placeholder={`${selectedBuildingName}`}
            title="Cuộn để hiển thị thông tin"
            onChange={(selectedValues) => {
              if (
                selectedValues.Building?.value &&
                selectedValues.Building?.value.toString() !== selectedBuilding
              ) {
                setSelectedBuilding(selectedValues.Building?.value.toString());
                setSelectedBuildingName(selectedValues.Building?.displayName);
              }
            }}
            mask={true}
            disabled={false}
            data={pickerData3}
          />
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Text>Tải dữ liệu thất bại</Text>
      <Text>Vui lòng điền địa chỉ của bạn vào ghi chú</Text>
    </Box>
  );
};

export default AddressPicker;
