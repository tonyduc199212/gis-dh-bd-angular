import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import { PubSubService } from '@core/services/pub-sub/pub-sub.service';
// import { LayerListService } from '@core/services/layerlist/layerlist.service';
import { LayerListService } from 'src/app/core/services/layerlist/layerlist.service';
// import { ObjClassModel } from '@shared/models/main.model';
// import { LayerGroupModel } from '@shared/models/layerlist.model';
// import { ApiReturnModel } from '@shared/models/global.model';
// import { Basic } from '@core/lib/basic';
import { ToastrService } from 'ngx-toastr';
// import { PermissionType } from '@core/services/permission/enums/permission.enum';
// import { AuthService } from '@core/services/auth/auth.service';
import { Map } from 'ol';
// import { MapService } from '@app/core/services/map/ol/map.service';
import { MapService } from 'src/app/core/services/map/ol/map.service';
// import { BasemapCode } from '@app/core/services/map/ol/enum/basemap.enum';
import { BasemapCode } from 'src/app/core/services/map/ol/enum/basemap.enum';
import { BaseLayerData } from './layerlist.config';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { ObjClassModel } from 'src/app/shared/models/main.model';
import { Basic } from 'src/app/core/lib/basic';
import { LayerGroupModel } from 'src/app/shared/models/layerlist.model';
import { PubSubService } from 'src/app/core/services/pub-sub/pub-sub.service';
import { ApiReturnModel } from 'src/app/shared/models/global.model';

@Component({
  selector: 'map-layerlist',
  templateUrl: './layerlist.component.html',
  styleUrls: ['./layerlist.component.scss']
})
export class LayerlistComponent implements OnInit {

  /******************************
   **Component hiển thị đồng bộ**
   **giao diện của layerlist*****
   ******************************/ 
  @Output() onChecked = new EventEmitter<object>();
  @Output() onZoomToLayer = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<object>();
  @Input() map: Map;

  scrollbarConfig: PerfectScrollbarConfigInterface = {};
  _widgetSize: string = "md";
  _currentBasemap: string = "streets";
  _isCheckAll: boolean = false;

  showingLayers: ObjClassModel[] = [];
  listLayers: ObjClassModel[] = [];
  _showLayerlistData: LayerGroupModel[] = [];

  isCollapseDataLayer: boolean = false;
  isCollapseBaseLayer: boolean = false;
  baselayerData = BaseLayerData;
  datalayer = new TileLayer(); 
  datalayerSrc: XYZ;
  _layerMap = []
  constructor( private pubSubService: PubSubService,
    private toast:ToastrService, 
    private layerListService: LayerListService, private mapService: MapService) { 
      //subcribes when search select layer and turn layer visible
      this.pubSubService.onSelectLayerSubjectEvent.subscribe(data=>{
        let objData = data as ObjClassModel;
        if (!this.checkListLayersIncludesLayer(objData)) this.toggleLayer(objData, true);
      });
  }
 
  ngOnInit(): void {
    this.loadDataByGroup();
    if (this.map) this.initAllLayers();
  }
  ngAfterViewInit(): void {
    if(this.mapService._map) this.initAllLayers();
  }

  ngOnChanges(): void {
    if (this.map) {
      this.initAllLayers();
    }
  }

  //#region Main Func
  open() {
    ////debugger;
    if (this.listLayers.length == 0)  {
      this.loadDataByGroup();
    }
  }
 
  loadDataByGroup(){
    this.layerListService.getListLayerGroups().then(rs => {
      let result = rs as ApiReturnModel;
      if (result.code == 0) {
        this._showLayerlistData = result.data as LayerGroupModel[];
        this.listLayers = [];
        for (let group of this._showLayerlistData) {
          this.listLayers = this.listLayers.concat(group.childrend);
        }
        // console.log("this.listLayers::: ",this.listLayers)
      } else {
        this.toast.error(result.message);
      }
    }, error => {
      this.toast.error(error.message);
    })
  }

  checkListLayersIncludesLayer(layer: ObjClassModel) :boolean {
    let isIncludes = false;
    for (let _layers of this.showingLayers) {
      if (_layers.id === layer.id) {
        isIncludes = true;
        break;
      }
    }
    return isIncludes;
  }

  close(){
    this.onClose.emit();
  }
  //#endregion

  //#region Init Func
  initCheckbox(item){
    return Basic.isArrayIncludesObject(this.showingLayers, item)
  }

  initAllLayers(){
    let allLayers = this.listLayers;
    // this._layerMap = this._layerMap.concat(this.map.getLayers());
    this.mapService.setLayersToMap(allLayers);
    // for(let _layer of allLayers){
    //   let _tile = this.mapService.setTileForWMS(_layer);
    //   _tile.setZIndex(1);
    //   this._layerMap.push(_tile);
    // }
    ////debugger;
    // this.datalayerSrc = this.mapService.setSourceForXYZNew(allLayers.reverse(), this.baselayerData);
    // if(this.datalayerSrc!=null){
    //   this.datalayer.setSource(this.datalayerSrc);
    // }
    // this.datalayer.setZIndex(1);
    // if (this.map) this.map.addLayer(this.datalayer);
  }
  //#endregion
 
  //#region Handle Func
  toggleWidgetSize(size: string) {
    this._widgetSize = size;
  }

  toggleAllLayers(data: ObjClassModel[], isVisible: boolean){
    this.showingLayers = [];
    for (let item of data){
      if (isVisible){
        this.showingLayers.push(item);      
      } else {
        this.showingLayers = Basic.removeObjByKey(this.showingLayers, item, 'id');
      }
    }
    for(let _layer of this.map.getAllLayers()) {
      ////debugger;
      if( data.find((item)=>{return item.code == _layer.getClassName()})!=null ){
        _layer.setVisible(isVisible);
      }
    }
    this._isCheckAll = isVisible;
    this.resetSource();
    this.onChecked.emit(this.showingLayers);
  }
 
  toggleLayer(data: ObjClassModel, isVisible: boolean){
    // if (isVisible){
    //   this.showingLayers.push(data);
    // } else {
    //   this.showingLayers = Basic.removeObjByKey(this.showingLayers, data, 'id');
    // }
    for(let _layer of this.map.getAllLayers()) {
      if(_layer.getClassName() == data.code){
        _layer.setVisible(isVisible);
        break;
      }
    }
    this.onChecked.emit(this.showingLayers);
    this.resetSource();
    this._isCheckAll = this.isCheckAllLayer();
  }

  isCheckAllLayer(){
    return this.listLayers.every(v => Basic.isArrayIncludesObject(this.showingLayers, v));
  }
 
  collapseDataLayer(){
    this.isCollapseDataLayer = !this.isCollapseDataLayer;
  }
 
  collapseZoningLayer(){
    this.isCollapseBaseLayer = !this.isCollapseBaseLayer;
  }
 
  zoomToLayer(layer: ObjClassModel){
    // this.onZoomToLayer.emit(layer);
    // this.mapService.zoomToLayerExtent(layer)
  }

  toggleBasemap(basemap: string){
    this._currentBasemap = basemap;
    if (this._currentBasemap == 'streets') this.mapService.toogleBasemap(BasemapCode.ggstreets);
    if (this._currentBasemap == 'satellite') this.mapService.toogleBasemap(BasemapCode.ggsat);
  }

  resetSource(){
    let allLayers = this.showingLayers;
    this.datalayerSrc = this.mapService.setSourceForXYZNew(allLayers.reverse(), this.baselayerData);
    this.datalayer.setSource(this.datalayerSrc);
  }
  //#endregion

}
