import React, { FC, useState, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { listAreasVHGPState, getAreaInfosVHGPState } from "states/address.state";
import { addressState } from "states/order.state";
import { Area } from "types/vhgp-address";
import { Box, Picker, Text} from "zmp-ui";
import { PickerColumnOption, PickerDataType } from "zmp-ui/picker";




const AddressPicker: FC = () => {
    //set Address
    const setAddress = useSetRecoilState(addressState);
    //Address Id
    const [selectedArea, setSelectedArea] = useState<string | undefined>();
    const [selectedCluster, setSelectedCluster] = useState<string | undefined>();
    const [selectedBuilding, setSelectedBuilding] = useState<string | undefined>();
    //Address Name
    const [selectedAreaName, setSelectedAreaName] = useState<string | undefined>();
    const [selectedClusterName, setSelectedClusterName] = useState<string | undefined>();
    const [selectedBuildingName, setSelectedBuildingName] = useState<string | undefined>();
    const areasLoadBalance = useRecoilValueLoadable(listAreasVHGPState);
  
    var areaInfoLoadable = useRecoilValueLoadable( getAreaInfosVHGPState((+selectedArea!) ) ); 
  
    // Sử dụng useEffect để thiết lập giá trị ban đầu cho selectedArea
    useEffect(() => {
      if (areasLoadBalance.state === "hasValue" && areasLoadBalance.contents !== null && selectedArea === undefined) {
        setSelectedArea(areasLoadBalance.contents[0].id); 
        setSelectedAreaName(areasLoadBalance.contents[0].name); 
      }
    }, [areasLoadBalance]);
    // Sử dụng useEffect để thiết lập giá trị ban đầu cho selectedArea
    useEffect(() => {
      if (areaInfoLoadable.state === "hasValue" && areaInfoLoadable.contents !== null && selectedArea !== undefined) {
        setSelectedCluster(areaInfoLoadable.contents.listCluster[0].id.toString()); 
        setSelectedClusterName(areaInfoLoadable.contents.listCluster[0].name); 

        setSelectedBuilding(areaInfoLoadable.contents.listCluster[0].listBuilding[0].id.toString())
        setSelectedBuildingName(areaInfoLoadable.contents.listCluster[0].listBuilding[0].name)
      }
    }, [areaInfoLoadable]);


    useEffect(() => {
        setAddress(`${selectedAreaName}, ${selectedClusterName}, ${selectedBuildingName}`);
    }, [selectedArea, selectedCluster, selectedBuilding]);
  

   
    if (areasLoadBalance.state === "loading") {
      return (
        <Box>
          <Text title="Đang tải dữ liệu tòa nhà..."></Text>
        </Box>
      );
    }
  
    if (areasLoadBalance.state === "hasValue" && areasLoadBalance.contents !== null) {
      const areas: Area[] = areasLoadBalance.contents;
  
      // Chuẩn bị options cho Picker
      const areaOptions: PickerColumnOption[] = areas.map((area) => ({
        key: area.id.toString(),
        value: area.id,
        displayName: area.name,
      }));
  
      // Chuẩn bị cluster và building options nếu areaInfoLoadable có giá trị
      const clusterOptions: PickerColumnOption[] = areaInfoLoadable.state === "hasValue" && areaInfoLoadable.contents !== null && areaInfoLoadable.contents.listCluster.length > 0
        ? areaInfoLoadable.contents.listCluster.map((cluster) => ({
            key: cluster.id.toString(),
            value: cluster.id.toString(),
            displayName: cluster.name,
          }))
        : [{
          key: "",
        value: "",
        displayName: "______",
        }];
  
        const buildingOptions: PickerColumnOption[] = areaInfoLoadable.state === "hasValue" && areaInfoLoadable.contents !== null && areaInfoLoadable.contents.listCluster.length > 0
        ? areaInfoLoadable.contents.listCluster.find((c) => c.id.toString() === selectedCluster)?.listBuilding.flatMap((building) => ({
            key: building.id.toString(),
            value: building.id.toString(),
            displayName: building.name,
          })) ?? [{
            key: "",
            value: "",
            displayName: "______",
          }]
        : [{
            key: "",
            value: "",
            displayName: "______",
          }];
      
  
      // Định nghĩa data cho Picker
      const pickerData: PickerDataType[] = [
        {
          name: "Area",
          options: areaOptions,
        },
        {
          name: "Cluster",
          options: clusterOptions,
        },
        {
          name: "Building",
          options: buildingOptions,
        },
      ];
  
      return (
        <Box>
          <Picker
            // label='Địa chỉ giao hàng'
            helperText='Chọn địa chỉ giao hàng của bạn'
            placeholder={`${selectedAreaName}, ${selectedClusterName}, ${selectedBuildingName}`}
            title='Cuộn để hiển thị thông tin'
            // action={{
            //   text: "Xác nhận",
            //   close: true,
            // }}
            onChange={(selectedValues) => {
              console.log(selectedValues)
              if(selectedValues.Area?.value && selectedValues.Area?.value.toString() !== selectedArea){
                setSelectedArea(selectedValues.Area?.value.toString())
               setSelectedAreaName(selectedValues.Area?.displayName)
              }
              if(selectedValues.Cluster?.value && selectedValues.Area?.value.toString() !== selectedCluster){
                setSelectedCluster(selectedValues.Cluster?.value.toString())
                setSelectedClusterName(selectedValues.Cluster?.displayName)
              }
              if(selectedValues.Building?.value && selectedValues.Area?.value.toString() !== selectedBuilding){
           
                setSelectedBuilding(selectedValues.Building?.value.toString())
                setSelectedBuildingName(selectedValues.Building?.displayName)

            }
             
  
            }}
            mask={true}
            disabled={false}
            data={pickerData}
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