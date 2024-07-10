
export interface Area {
    id: number,
    name: string,
    //TODO: add Cluster type
    listCluster: Cluster[]
}

export interface Cluster {
    id: number,
    name: string,
    listBuilding: Building[]
}

export interface Building {
    id: number,
    name: string,
    hubId: number,
    longitude: number,
    latitude: number   
}

  
   
  