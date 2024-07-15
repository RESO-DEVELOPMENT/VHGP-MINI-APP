import React, { FC, useState, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {
  listAreasVHGPState,
  getAreaInfosVHGPState,
} from "states/address.state";
import { addressState } from "states/order.state";
import { Area } from "types/vhgp-address";
import { Box, Picker, Text } from "zmp-ui";
import { PickerColumnOption, PickerDataType } from "zmp-ui/picker";

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
      setSelectedArea(areasLoadBalance.contents[0].id);
      setSelectedAreaName(areasLoadBalance.contents[0].name);
    }
  }, [areasLoadBalance]);

  useEffect(() => {
    if (
      areaInfoLoadable.state === "hasValue" &&
      areaInfoLoadable.contents !== null &&
      selectedArea !== undefined
    ) {
      setSelectedCluster(
        areaInfoLoadable.contents.listCluster[0].id.toString()
      );
      setSelectedClusterName(areaInfoLoadable.contents.listCluster[0].name);
      setSelectedBuilding(
        areaInfoLoadable.contents.listCluster[0].listBuilding[0].id.toString()
      );
      setSelectedBuildingName(
        areaInfoLoadable.contents.listCluster[0].listBuilding[0].name
      );
    }
  }, [areaInfoLoadable]);

  useEffect(() => {
    setAddress(
      `${selectedAreaName}, ${selectedClusterName}, ${selectedBuildingName}`
    );
  }, [selectedArea, selectedCluster, selectedBuilding]);

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
    const areas: Area[] = areasLoadBalance.contents;

    const areaOptions: PickerColumnOption[] = areas.map((area) => ({
      key: area.id.toString(),
      value: area.id,
      displayName: area.name,
    }));

    const clusterOptions: PickerColumnOption[] =
      areaInfoLoadable.state === "hasValue" &&
      areaInfoLoadable.contents !== null &&
      areaInfoLoadable.contents.listCluster.length > 0
        ? areaInfoLoadable.contents.listCluster.map((cluster) => ({
            key: cluster.id.toString(),
            value: cluster.id.toString(),
            displayName: cluster.name,
          }))
        : [
            {
              key: "",
              value: "",
              displayName: "______",
            },
          ];

    const buildingOptions: PickerColumnOption[] =
      areaInfoLoadable.state === "hasValue" &&
      areaInfoLoadable.contents !== null &&
      areaInfoLoadable.contents.listCluster.length > 0
        ? areaInfoLoadable.contents.listCluster
            .find((c) => c.id.toString() === selectedCluster)
            ?.listBuilding.flatMap((building) => ({
              key: building.id.toString(),
              value: building.id.toString(),
              displayName: building.name,
            })) ?? [
            {
              key: "",
              value: "",
              displayName: "______",
            },
          ]
        : [
            {
              key: "",
              value: "",
              displayName: "______",
            },
          ];

    const pickerData1: PickerDataType[] = [
      {
        name: "Area",
        options: areaOptions,
      },
    ];
    const pickerData2: PickerDataType[] = [
      {
        name: "Cluster",
        options: clusterOptions,
      },
    ];
    const pickerData3: PickerDataType[] = [
      {
        name: "Building",
        options: buildingOptions,
      },
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
            }
          }}
          mask={true}
          disabled={false}
          data={[...pickerData1]}
        />
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
            }
          }}
          mask={true}
          disabled={false}
          data={[...pickerData2]}
        />
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
          data={[...pickerData3]}
        />
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
