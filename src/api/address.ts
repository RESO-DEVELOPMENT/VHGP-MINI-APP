import { BaseReponse as BaseReponse } from './../types/response';

import {  SingleReponse } from "types/response";
import { Area, Cluster } from "types/vhgp-address";
import { axiosInstances } from "utils/axios";

const requestVHGP = axiosInstances.vhgp;

const getAreas = (params?: { pageIndex?: number; pageSize?: number }) =>
  requestVHGP.get<BaseReponse<Area>>(`areas`, { params });

const getClusters = (areaId: number) =>
  requestVHGP.get<SingleReponse<Cluster>>(`areas/ByAreaId`, { params: { areaId } });

const vhgpApi = {
  getAreas,
  getClusters,
};

export default vhgpApi;
