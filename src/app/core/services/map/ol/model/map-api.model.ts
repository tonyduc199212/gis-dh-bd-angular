import { ShapeModel } from "src/app/shared/models/global.model";
// import { ObjClassModel, ObjTypeModel } from "@app/shared/models/main.model";

export class MapClickedAPIModel {
  id: string;
  layerCode: string;
  distance?: string;
  index?: string;
  layerName: string;
}

export class ImportExcelResultModel {
  data: any;   
  totalElements: number;   
  totalFail: number;
  totalSuccess: number;
}

export class GeocodingModel {
  id: string;
  code: string;
  name: string;
  district: AdministrativeGeocodingModel;
  province: AdministrativeGeocodingModel;
  lgspId: string;
  syncStatus: string;
  syncDate: string;
}

export class AdministrativeGeocodingModel {
  id: string;
  code: string;
  name: string;
}

export class WaterwayModel {
  id: string;
  code: string;
  name: string;
  geom: ShapeModel;
}

// export class SpatialQueryCreateModel {
//   layer: ObjClassModel;
//   coordinates: number[];
//   administrative: GeocodingModel;
//   waterway: WaterwayModel;
// }


export class SpatialQueryModel {
  administrative: GeocodingModel;
  waterway: WaterwayModel;
}

// export class WaterwayFullModel {
// 		"id": string;
// 		"code": string;
// 		"name": string;
// 		"title": string;
// 		"content": string;
// 		"managementStation": string;
// 		"relevantLegal": string;
// 		"maximumRadiusOfCurvature": string;
// 		"minimumRadiusOfCurvature": string;
// 		"exploitLevel": string;
// 		"technicalLevel": string;
// 		"lengthObtainTechnicalStandards": string;
// 		"lengthNotObtainTechnicalStandards": string;
// 		"length": string;
// 		"guardCorridorEdgeWidth": string;
// 		"guardCorridorStreamWidth": string;
// 		"narrowestWidth": string;
// 		"widest": string;
// 		"lowestDeep": string;
// 		"deepest": string;
// 		"governingBody": string;
// 		"sitesRightEdge": string;
// 		"sitesLeftEdge": string;
// 		"area": string;
// 		"layerId": string;
// 		"managementType": string;
// 		"waterWayType": string;
// 		"manager": string;
// 		"downSteamLocation": string;
// 		"upStreamLocation": string;
// 		"note": string;
// 		"createdAt": string;
// 		"updatedAt": string;
// 		"confirmationStatus": ObjTypeModel;
// 		"deleted": boolean;
// 		"lat": string;
// 		"long": string;
// 		"coordinates": string;
// 		"coordinates_1": string;
// 		"geom": ShapeModel;
// 		"srid": string;
// 		"appliedFields": string[];
//   }
