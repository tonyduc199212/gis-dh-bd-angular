import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiReturnModel } from 'src/app/shared/models/global.model';
import { ObjClassModel } from 'src/app/shared/models/main.model';
// import { group } from 'console';
import { LayerGroupModel } from 'src/app/shared/models/layerlist.model';

@Injectable({
  providedIn: 'root'
})
export class LayerListService {

  constructor(
    // private http: HttpClient
    ) { }
  //#region System / Config / Layer Group

  getListLayerGroups():Promise<ApiReturnModel>{
    return new Promise((resolve, reject)=>{
      try {
        var layerList = [];
        layerList.push(
          new ObjClassModel({
          "code": "signal",
          "name": "Báo hiệu",
          "iconUrl":"assets/icon-layer/layer-map/map_baohieu.png",
          "layerUrl":"VungTau_141_95:dulieu_baohieu",
          "zoomMax":19,
          "zoomMin":12
        } as ObjClassModel))
        var groups = [];
        groups.push(
          new LayerGroupModel({
            "name" : "Nhóm báo hiệu",
            "code" : "BAOHIEU",
            "isFolder" : true,
            "isOpen" : true,
            "isExpand" : true,
            "childrend" : layerList,
            "icon" : "",
            "index" : 1
          })
        )
        var result = new ApiReturnModel({
          "code": 0,
          "message": "Ok",
          "data": groups
        });
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }) 
  }

  //#endregion
}
