import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Heatmap as HeatmapLayer, Tile, Tile as TileLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS.js';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Icon, Text } from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
import { Circle, LineString, MultiLineString, MultiPoint, MultiPolygon, Polygon } from 'ol/geom';
import {fromCircle} from 'ol/geom/Polygon';
import * as olProj from 'ol/proj';
import {getArea, getLength} from 'ol/sphere';
import {decodeDeltas} from 'ol/format/Polyline';
import Polyline from 'ol/format/Polyline';
import * as olExtent from 'ol/extent';
import { MapConfig } from './config/map-config.constant';
import { environment } from 'src/environments/environment';
import { MapOptions } from './model/basemap.model';
import { BasemapCode } from './enum/basemap.enum';
import { ShapeModel } from 'src/app/shared/models/global.model';
import { ObjClassModel } from 'src/app/shared/models/main.model';
import { BaseLayerModel } from 'src/app/basic-ui/accordions/widgets/layerlist/layerlist.config';
import { StyleCodeEnum } from './enum/style.enum';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  _geoserver: string = environment.GEOSERVER;
  _map: Map;
  _basemaplayer = new TileLayer();
  _bmGgStr: XYZ; 
  _bmGgSat: XYZ;
  _bmVnptStr: XYZ;
  _bmOsm = new OSM();
  _view: View;
  _locate: Geolocation;
  _highlightLayer = new VectorLayer();

  constructor() { 
    //set basemap
    this._bmGgStr = new XYZ({
      url: MapConfig.basemapConfig.ggStreet,
    });
    this._bmGgSat = new XYZ({
      url: MapConfig.basemapConfig.ggSatellite,
    });
    this._bmVnptStr = new XYZ({
      url: MapConfig.basemapConfig.vnptStreet,
    });
    //init local VN2000 SRID
    proj4.defs('EPSG:1000' + environment.SRID.CITY_CODE, 
              `+proj=tmerc 
              +lat_0=0 +lon_0=${environment.SRID.CITY_LONGITUDE} 
              +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 
              +towgs84=-191.90441429, -39.30318279, -111.45032835, 0.00928836, 0.01975479, -0.00427372, 0.252906278 
              +units=m +no_defs`);
    register(proj4);
  }
  public setSourceForWMS(layerData: ObjClassModel):TileWMS{
    let geoserverUrl = this._geoserver; 
    let src = new TileWMS({
      url: geoserverUrl,
      params: {
        // 'LAYERS': 'VungTau_141_95:dulieu_baohieu',
        'LAYERS': layerData.layerUrl,
        'TILED': true
      },
    });
    return src;
  }

  setLayerStyle(type: StyleCodeEnum, stroke?: string, fill?: string, options?: any) {
    if (!stroke) stroke = MapConfig.highlightFeature.stroke;
    if (!fill) fill = MapConfig.highlightFeature.fill;
    if (options) {
      if (!options['iconUrl']) options['iconUrl'] = MapConfig.highlightFeature.iconUrl;
      if (!options['lineWidth']) options['lineWidth'] = MapConfig.highlightFeature.lineWidth;
      if (!options['lineCap']) options['lineCap'] = MapConfig.highlightFeature.lineCap;
      if (!options['lineDash']) options['lineDash'] = MapConfig.highlightFeature.lineDash;
    } else {
      options = {};
      options['iconUrl'] = MapConfig.highlightFeature.iconUrl;
      options['lineWidth'] = MapConfig.highlightFeature.lineWidth;
      options['lineCap'] = MapConfig.highlightFeature.lineCap;
      options['lineDash'] = MapConfig.highlightFeature.lineDash;
    }
    
    const _stroke = new Stroke({
      color: stroke, 
      width: options['lineWidth'],
      lineCap: options['lineCap'],
      lineDash: options['lineDash']
    });
    const _fill = new Fill({color: fill});
    const styles = {     
      'LineString': new Style({
        stroke: _stroke,
        
      }),
      'MultiLineString': new Style({
        stroke: _stroke
      }),
      'MultiPolygon': new Style({
        stroke: _stroke,
        fill: _fill,
      }),
      'Polygon': new Style({
        stroke: _stroke,
        fill: _fill,
      }),
      'circle': new Style({
        image: new CircleStyle({
          fill: _fill,
          stroke: _stroke,
          radius: 6
        })
      }),
      'square': new Style({
        image: new RegularShape({
          fill: _fill,
          stroke: _stroke,
          points: 4,
          radius: 18,
          angle: Math.PI / 4,
        }),
      }),
      'rectangle': new Style({
        image: new RegularShape({
          fill: _fill,
          stroke: _stroke,
          radius: 36 / Math.SQRT2,
          radius2: 20,
          points: 4,
          angle: 0,
          scale: [1, 0.5],
        }),
      }),
      'triangle': new Style({
        image: new RegularShape({
          fill: _fill,
          stroke: _stroke,
          points: 3,
          radius: 10,
          rotation: Math.PI / 4,
          angle: 0,
        }),
      }),
      'star': new Style({
        image: new RegularShape({
          fill: _fill,
          stroke: _stroke,
          points: 5,
          radius: 10,
          radius2: 4,
          angle: 0,
        }),
      }),
      'cross': new Style({
        image: new RegularShape({
          fill: _fill,
          stroke: _stroke,
          points: 4,
          radius: 10,
          radius2: 0,
          angle: 0,
        }),
      }),
      'x': new Style({
        image: new RegularShape({
          fill: _fill,
          stroke: _stroke,
          points: 4,
          radius: 10,
          radius2: 0,
          angle: Math.PI / 4,
        }),
      }),
      'stacked': [
        new Style({
          image: new RegularShape({
            fill: _fill,
            stroke: _stroke,
            points: 4,
            radius: 5,
            angle: Math.PI / 4,
            displacement: [0, 10],
          }),
        }),
        new Style({
          image: new RegularShape({
            fill: _fill,
            stroke: _stroke,
            points: 4,
            radius: 10,
            angle: Math.PI / 4,
          }),
        }),
      ],
      'icon': new Style({
        image: new Icon({
          src: options['iconUrl']
        })
      })
    };
    return styles[type];
  }
  public highlightFeature(shape: ShapeModel, stroke?: string, fill?: string) {
    try {
      this.removeHighlightFeature();
      let feature;
      if (shape.type == "Point") {
        feature = new Feature(new Point(shape.coordinates));
        if (stroke && fill) feature.setStyle(this.setLayerStyle(StyleCodeEnum.SQUARE, stroke, fill));
        else feature.setStyle(this.setLayerStyle(StyleCodeEnum.SQUARE));
      } 
      if (shape.type == "LineString") {
        feature = new Feature(new LineString(shape.coordinates));
        feature.setStyle(this.setLayerStyle(StyleCodeEnum.POLYLINE));
      } 
      if (shape.type == "Polygon") {
        feature = new Feature(new Polygon(shape.coordinates));
        feature.setStyle(this.setLayerStyle(StyleCodeEnum.POLYGON));
      } 
      if (shape.type == "MultiLineString") {
        feature = new Feature(new MultiLineString(shape.coordinates));
        feature.setStyle(this.setLayerStyle(StyleCodeEnum.MULTIPOLYLINE));
      } 
      if (shape.type == "MultiPolygon") {
        feature = new Feature(new MultiPolygon(shape.coordinates));
        feature.setStyle(this.setLayerStyle(StyleCodeEnum.MULTIPOLYGON));
      } 
      const source = new VectorSource({
        features: [feature],
      });
      this._highlightLayer = new VectorLayer({
        source: source,
      });
      this._highlightLayer.setZIndex(3);
      this._map.addLayer(this._highlightLayer);
    } catch (error) {
      console.error(error)
    }
    
  }


  public removeHighlightFeature() { 
    // if (this._highlightLayer) this._map.removeLayer(this._highlightLayer);
  }
  public setTilesToMap(tiles: TileLayer<TileWMS>[]){
    for(let tile of tiles){
      this._map.addLayer(tile)
    }
  }
  public setLayersToMap(layers: ObjClassModel[]){
    for(let layer of layers){
      this._map.addLayer(this.setTileForWMS(layer))
    }
  }
  public setTileForWMS(layerData: ObjClassModel, visible: boolean = false):TileLayer<TileWMS>{
    let src = this.setSourceForWMS(layerData);
    let tile = new Tile({
      className: layerData.code,
      source: src,
      maxZoom: layerData.zoomMax ?? 19,
      minZoom: layerData.zoomMin ?? 10,
      visible:  visible
    });
    return tile;
  }
  public setSourceForXYZNew(layerData: ObjClassModel[], baseBata: BaseLayerModel[]) {
    let _layers = "";
    // let licenseKey = this._geoserverLicenseKey;
    for (let layer of layerData) {
      _layers += layer.code + "__";
    }
    for (let _layer of baseBata) {
      if (_layer.layer && _layer.isCheck) _layers += _layer.layer + "__"
    }
    _layers = _layers.substring(0, _layers.length - 1);
    _layers = _layers.substring(0, _layers.length - 1).trim();
    if(!_layers || _layers=="") return null;
    let geoserverUrl = this._geoserver; 
    let src = new XYZ({
      attributions:[],
      wrapX: false,
      tileUrlFunction: function(tileCoord) {
        const z = tileCoord[0];
        const x = tileCoord[1];
        const y = tileCoord[2];
        var timestamp = Math.random();
        return `${geoserverUrl}/v2/map/${_layers}/${z}/${x}/${y}?t=${timestamp}`;
      }
    });
    return src;
  }
  public initMap(mapId?: string, options?: MapOptions): Map {
    //check id
    let projection = MapConfig.defaultMapSettings.projection, lat = MapConfig.defaultMapSettings.centerLat, lon = MapConfig.defaultMapSettings.centerLon;
    if (!mapId) mapId = MapConfig.defaultMapSettings.mapId;
    
    if (options){
      if (options.basemap) {
        this.toogleBasemap(options.basemap);
      } else {
        this.toogleBasemap(BasemapCode.osm);
      }
      if (options.srid == MapConfig.defaultMapSettings.projection4326) {
        projection = options.srid;
        lat = MapConfig.defaultMapSettings.centerLat4326;
        lon = MapConfig.defaultMapSettings.centerLon4326;
      }
    }
    //set View
    this._view = new View({
      center: [lon, lat],
      zoom: MapConfig.defaultMapSettings.zoomLevel,
      maxZoom: MapConfig.defaultMapSettings.maxZoom,
      minZoom: MapConfig.defaultMapSettings.minZoom,
      projection: projection,
      constrainResolution: true
    })

    this._map = new Map({
      view: this._view,
      layers: [
        this._basemaplayer,
      ],
      target: mapId,
      controls: []
    });



    return this._map;
  }
  
  //#region Basic Controls
  public locate(callback){
    this._locate = new Geolocation({
      projection: MapConfig.defaultMapSettings.projection,
      tracking: true
    });
    this._locate.once('change', function(evt) {
      if (this._locate.getPosition()) {
        this.flyToPoint(15, this._locate.getPosition());
        this.addPoint(this._locate.getPosition(), {
          name: MapConfig.locate.layerName,
          scale: MapConfig.locate.iconScale,
          iconUrl: MapConfig.locate.iconUrl
        });
        callback(this._locate.getPosition())
      }
    }.bind(this));
  }

  public cancelLocate(){
    this.removeLayerByName(MapConfig.locate.layerName);
  }

  public zoomIn(){
    this._view.animate({zoom: this._view.getZoom() + 1});

  }

  public zoomOut(){
    this._view.animate({zoom: this._view.getZoom() - 1});
  }

  public backToHome(){
    this.flyToPoint(MapConfig.defaultMapSettings.zoomLevel, [MapConfig.defaultMapSettings.centerLon, MapConfig.defaultMapSettings.centerLat])
  }

  public flyToPoint(zoom: number, center: number[]){
    this._view.animate({zoom: zoom}, {center: center});
  }

  public zoomToFeature(shape: ShapeModel) {
    let feature;
    if (shape.type == "Point") {
      feature = new Feature(new Point(shape.coordinates));
    } 
    if (shape.type == "MultiPoint") {
      feature = new Feature(new MultiPoint(shape.coordinates));
    } 
    if (shape.type == "LineString") {
      feature = new Feature(new LineString(shape.coordinates));
    } 
    if (shape.type == "Polygon") {
      feature = new Feature(new Polygon(shape.coordinates));
    } 
    if (shape.type == "MultiLineString") {
      feature = new Feature(new MultiLineString(shape.coordinates));
    } 
    if (shape.type == "MultiPolygon") {
      feature = new Feature(new MultiPolygon(shape.coordinates));
    } 
    const source = new VectorSource({
      features: [feature],
    });
    this._view.fit(source.getExtent());
  }

  public toogleBasemap(code: BasemapCode) {
    switch (code) {
      case BasemapCode.ggstreets:
        this._basemaplayer.setSource(this._bmGgStr);
        break;
      case BasemapCode.ggsat:
        
        this._basemaplayer.setSource(this._bmGgSat);
        break;
      case BasemapCode.vnptstreets:
        
        this._basemaplayer.setSource(this._bmVnptStr);
        break;
      case BasemapCode.osm:
        this._basemaplayer.setSource(this._bmOsm);
        break;
    }
  }

  public setView(coordinates: number[], zoom: number) {
    this._view.setCenter(coordinates);
    this._view.setZoom(zoom);
  }
  public removeLayerByName(name: string) {
    let map = this._map;
    this._map.getLayers().forEach(function(layer) {
      if (layer && layer.get('name') === name) {
        map.removeLayer(layer);
      }
    });
  }
  //#endregion

  //#region Vector layers

  //#endregion
}
