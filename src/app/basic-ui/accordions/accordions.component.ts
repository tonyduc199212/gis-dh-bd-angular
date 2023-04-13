import { Component, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { MapConfig } from 'src/app/core/services/map/ol/config/map-config.constant';
import { BasemapCode } from 'src/app/core/services/map/ol/enum/basemap.enum';
import { MapService } from 'src/app/core/services/map/ol/map.service';
import { ObjClassModel } from 'src/app/shared/models/main.model';
import { MapWidgetCodeEnum } from './shared/enums/widgets.enum';
import { LayerlistComponent } from './widgets/layerlist/layerlist.component';
import { MapApiService } from 'src/app/core/services/map/ol/map-api.service';
import { ApiReturnModel, ShapeModel } from 'src/app/shared/models/global.model';
import { GeocodingModel, MapClickedAPIModel } from 'src/app/core/services/map/ol/model/map-api.model';
import { GeocodingComponent } from './reuse/geocoding/geocoding.component';
import { PopupDataComponent } from './widgets/popup-data/popup-data.component';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/core/services/main/main.service';
@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss'],
})
export class AccordionsComponent implements OnInit {
  _map: Map;
  _view: View;
  _currentZoom: number = MapConfig.defaultMapSettings.zoomLevel;
  _currentSrid: string = MapConfig.defaultMapSettings.projectionCode;

  _isShowLayerlist: boolean = false;
  _isShowSearchWidget: boolean = false;
  showFooter = false
  _showingLayers: ObjClassModel[] = [];

  @ViewChild(PopupDataComponent) _popupInfor: PopupDataComponent;

  @ViewChild(LayerlistComponent) _layerlistWidget: LayerlistComponent;
  @ViewChild(GeocodingComponent) _geocodingWindow: GeocodingComponent;

  constructor(
    private mapService: MapService, 
    private mapApiService: MapApiService,
    private toast: ToastrService,
    private mainService: MainService
    ) { }

  ngOnInit(): void {
    // this.initMap()
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this._map.setTarget(null);
    this._map = null;
  }
  initMap(){
    this._map = this.mapService.initMap('map', {
      basemap: BasemapCode.ggstreets
    });
    this._view = this._map.getView();
    this._map.on('click', (e) => {
      this.getMapClickedInfor(e.coordinate);
    })
  }

  onClosePopupInfor(){
    this.mapService.removeHighlightFeature();
  }


  getCurrentObjClass(layerCode, layerSubCode, callback) {
    this.mainService.getObjClassByCodeAndSubCode(layerCode, layerSubCode).then(rs => {
      let result = rs as ApiReturnModel;
      //debugger;
      if (result.code == 0) {
        let data = result.data as ObjClassModel[];
        for (let oc of data) {
          if (oc.code.toLowerCase() === layerCode.toLowerCase()) {
            callback(oc);
            break;
          }
        }
      } else {
        this.toast.error(result.message);
      }
    }, error => {
      this.toast.error(error.message);
    })
  }
  openPopupData(currentLayer: ObjClassModel, data: any){
    // if (!this._isLoadBindingMng) {
    //   this.getListBindingManagement(currentLayer, data);
    // } else {
      //debugger;
      this._popupInfor.open(currentLayer, data);
      this._geocodingWindow.close();
      // this._popupEditor.close();
    // }
  }
  getMapClickedInfor(coordinate: number[]) {
    this._currentZoom = this._view.getZoom();
    console.log(`this._currentZoom::: `,coordinate," this._currentSrid::: ",this._currentSrid)
    this.mapApiService.getMapClickedInfor(this._showingLayers, coordinate, this._currentZoom, this._currentSrid).then((rs) => {
      let result = rs as ApiReturnModel;
      if (result.code == 0) {
        let clickedData = result.data as MapClickedAPIModel;
        let data = result.data;
        //debugger;
        if (!data.geom) {
          let shape = data.geom as ShapeModel;
          this.mapService.highlightFeature(shape);
          //lấy tên lớp dữ liệu
          this.getCurrentObjClass(clickedData.layerCode, "", (currentLayer: ObjClassModel) => {
            this.openPopupData(currentLayer, data);
          });
        } else {
          let geocodingData = data as GeocodingModel;
          this.showGeocodingWindow(geocodingData, coordinate);
        }
        // if (clickedData.layerCode && clickedData.id) this.getFeatureDataById(coordinate, clickedData);
      } else if (result.code == 4) {
        this._geocodingWindow.close();
        this._popupInfor.close();
      } else{
        this.toast.error(result.message);
        console.error("date time::: ", Date.now()," msg::: ", result.message);
      }
    }, error => {
      this.toast.error(error.message);
    })
  }

  showGeocodingWindow(data, coordinates){
    this._geocodingWindow.open(data, coordinates);
    this._popupInfor.close();
  }

  takeActionFromButtonGroup(action: MapWidgetCodeEnum){
    switch (action) {
      case MapWidgetCodeEnum.LAYERLIST:
        this._isShowLayerlist = !this._isShowLayerlist;
        if (this._isShowLayerlist) {
          this.openLayerlistWidget();
        }
        break;
      // case MapWidgetCodeEnum.SEARCHWIDGET:
      //   this._isShowSearchWidget = !this._isShowSearchWidget;
      //   if (this._isShowSearchWidget) {
      //     this.openSearchWidget();
      //   } else {
      //     this._searchWidget.close();
      //   }
      //   break;
    }
  }

    openLayerlistWidget() {
      // ////debugger;
      this._layerlistWidget.open();
      // if (this._isShowEditorWidget) this._editorWidget.close();
      // if (this._isShowSearchWidget) this._searchWidget.close();
      // if (this._isShowDirectionWidget) this._directionWidget.close();
      // if (this._isShowIncidentFeedback) this._incidentFeedback.close();
    }

    onCloseLayerlist(){
      this._isShowLayerlist = false;
    }

    onCheckLayerlist(layers: ObjClassModel[]) {
      this._showingLayers = layers;
    }

}
