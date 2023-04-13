export class BaseLayerModel {
  name: string;
  layer: string;
  isCheck: boolean;
  imageUrl: string;
  id: string;
}

export const BaseLayerData = [
  // {
//   name: "layer-list-stream_boundary_layer",
//   layer: "bienluong",
//   isCheck: true,
//   imageUrl: "assets/icon-layer/basemap/map_bienluong.png",
//   id: "StreamBoundaryLayer"
// },{
//   name: "layer-list-flow_map_layer",
//   layer: "binhdo",
//   isCheck: true,
//   imageUrl: "assets/icon-layer/basemap/map_binhdo.png",
//   id: "FlowMapLayer"
// },{
//   name: "layer-list-administrative_layer",
//   layer: "nenvtu_hch",
//   isCheck: true,
//   imageUrl: "assets/icon-layer/basemap/map_hanhchinh.png",
//   id: "AdministrativeLayer"
// }
] as BaseLayerModel[];