import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ObjClassModel } from 'src/app/shared/models/main.model';
import { MapConfig } from './config/map-config.constant';
import { ApiReturnModel } from 'src/app/shared/models/global.model';
import { GeocodingModel, MapClickedAPIModel, SpatialQueryModel } from './model/map-api.model';
import { ToastrService } from 'ngx-toastr';
import { DataLayersConst } from 'src/app/core/constant/data-layers.const';
import { promise } from 'protractor';
// import { DataLayersConst } from '@app/core/constant/api-main/data-layers.const';
// import { CommonCatsConst } from '@app/core/constant/api-main/common-cats.const';

@Injectable({
  providedIn: 'root'
})
export class MapApiService {
  mainApiUrl = "environment.MAIN_API_URL";
  srid: string = '1000' + environment.SRID.CITY_CODE;
  constructor(
    // private http: HttpClient,
    private toast: ToastrService) { }

  public getMapClickedInfor(showingLayers: ObjClassModel[], coordinates: number[], zoomLevel: number, srid: string):Promise<ApiReturnModel>{
    // let longitude = coordinates[0];    
    // let latitude = coordinates[1];   
    // let layers = "Ward;";
    // //let layers = "";
    // for (let layer of showingLayers) {
    //   layers += layer.code + ";";
    // }
    // layers = layers.substring(0, layers.length - 1);
    
    // const url = this.mainApiUrl.concat(DataLayersConst.GET_MAP_CLICKED_INFOR)
    //                               .replace("{layers}", layers)
    //                               .replace("{zoom}", zoomLevel + "");
    // return this.http.get(url);
    return new Promise((resolve, reject)=>{
      try {
        
        let result = new ApiReturnModel({
          "code": 0,
          "message": "test error",
          "data": {
            layerCode: "signal",
            layerName: "Báo hiệu",
            code: "Signal",
            name: "Báo hiệu",
            title: "Tiêu đề báo hiệu",
            createdAt: "2023-01-01",
            license: "có"
          }
        });
        resolve(result)
      } catch (error) {
        reject(error)
      }
    });
  }

  public featureLayerReadData(layerCode: string, layerSubCode: string, featureId: string):Promise<ApiReturnModel>{
    
    
    return new Promise((resolve, reject)=>{
      try {
        let result = new ApiReturnModel({
          "code": 1,
          "message": "test error",
          "data": {}
        });
        resolve(result)
      } catch (error) {
        reject(error)
      }
    });
    // return new ApiReturnModel({

    // })
    
    // let url = this.mainApiUrl.concat(DataLayersConst.FEATURE_LAYER_CRUD).replace("{layer_code}", layerCode).replace("{data_id}", featureId);
    
    // if (layerSubCode) url = url.replace("{layer_subCode}", layerSubCode);
    // else url = url.replace("/{layer_subCode}", "");

    // return this.http.get(url);
  }

}
