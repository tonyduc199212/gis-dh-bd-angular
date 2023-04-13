import { BasemapCode } from "../enum/basemap.enum";

export class MapOptions {
  showZoom?: boolean;
  basemap?: BasemapCode;
  srid?: string;
}