// import { GroupPermissionModel } from "./user-permission.model";

export class ObjClassModel {
    constructor(obj?:ObjClassModel){
        if(obj){
            this.code = obj.code;
            this.createdAt = obj.createdAt;
            this.iconUrl = obj.iconUrl;
            this.id = obj.id;
            this.layerUrl = obj.layerUrl;
            this.name = obj.name;
            this.index = obj.index;
            this.zoomMax = obj.zoomMax;
            this.zoomMin = obj.zoomMin;
        }
    }
    code: string;
    createdAt: string;
    funcModuleCode: string;
    funcMenuCode: string[];
    hasPerm: number;
    hasShape: number;
    iconUrl: string;
    id: string;
    layerUrl: string;
    name: string;
    nameEn: string;
    shapeType: string;
    subCode: string;
    extra: string;
    index: number;
    zoomMax?: number;
    zoomMin?: number;
}

export class ObjClassEvent {
    objClass: ObjClassModel;
}

export class ObjFieldModel {
    constructor(obj?:ObjFieldModel){
        if(obj){
            this.code = obj.code,
            this.name = obj.name,
            this.allowShare = obj.allowShare,
            this.seqNum = obj.seqNum,
            this.componentUI = obj.componentUI
        }
    }
    allowShare: number;
    allowStatistic?: number;
    value?: any;
    code: string;
    createdAt: string;
    dataType: string;
    id: string;
    name: string;
    nameEn: string;
    objClassCode: string;
    objClassSubCode: string;
    apiURL: string;
    componentUI: string;
    seqNum: number;
    required: number;
    parentCode: string;
    parentCondition: string;
    preventEdit?: number;
    minSize?: number;
    maxSize?: number;
    minValue?: string;
    maxValue?: string;
    validateRegex?: string;
    extra: string;
}

export class ObjTypeModel {
    id?:	string;
    createdAt?: string;
    updatedAt?: string;
    code: string;
    name: string;
    objClass?: string;
    styleUI?: string;
}

export class ObjectModel {
    "code": string;
    "name": string;
    "objClass": string;
    "parentCode": string;
    "index": number;
    "icon": string;
    "isExpand": string;
    "isAdmin": number;
    "createdAt": string;
    "updatedAt": string;
    "id": string;
    "appliedFields": string;
}

export class DistrictModel {
    code: string;
    name: string;
    nameEn: string;
    level: string;
    id: string;
    createdAt: string;
    lgspId: string;
    syncStatus: string;
    syncDate: string;
}

export class WardModel {
    code: string;
    name: string;
    nameEn: string;
    level: string;
    id: string;
    createdAt: string;
    lgspId: string;
    syncStatus: string;
    syncDate: string;
    district: DistrictModel;
}

export class ProvinceModel {
    id: string;
    code: string;
    name: string;
    nameEn: string;
    level: string;
    lgspId: string;
    syncStatus: string;
    syncDate: string;
    coordinates: string;
    geom: string;
    srid: string;
    createdAt: string;
    updatedAt: string;
    appliedFields: string;
  }

  export class ObjCategoryModel {
    id:	string;
    createdAt?: string;
    updatedAt?: string;
    code: string;
    name: string;
}

export class ClusterPeGrConfigModel {
    "id": string;
    "code": string;
    "name": string;
    "descript": string;
    "avatar": string;
    "detail": string;
    "funcModuleCode": string;
    "createdAt": string;
    "updatedAt": string;
  }

