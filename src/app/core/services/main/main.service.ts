import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LayerGroupModel } from 'src/app/shared/models/layerlist.model';

import { Constant as MainConst} from '../../constant/api-main/Constant';
import { ApiReturnModel } from 'src/app/shared/models/global.model';
import { ObjClassModel, ObjFieldModel } from 'src/app/shared/models/main.model';
import { group } from 'console';
// import { Constant as SystemConst } from '@core/constant/api-system/Constant';
// import { Constant as TrackingConst} from '@core/constant/api-tracking/Constant';
// import { FuncModuleEnum } from '@app/shared/enums/func-module.enum';
// import { ApiReturnModel } from '@shared/models/global.model';
// import { ObjClassModel } from '@app/shared/models/main.model';
// import { CommonCatsConst } from '@app/core/constant/api-main/common-cats.const';
// import { DataLayersConst } from '@app/core/constant/api-main/data-layers.const';

@Injectable({
  providedIn: 'root'
})
/**
  * // INTRO: This service is used to call frequently used functions in the project
  */
export class MainService {
  mainApiUrl = environment.GEOSERVER;
  sidebarMenu: LayerGroupModel[] = [];

  constructor(
    // private http: HttpClient, 
    public toast: ToastrService) { }

  //#region Object Field
  getListObjFields(code: string, subCode: string, searchKey: string):Promise<ApiReturnModel>{
    // if (!subCode) subCode = ""
    
    // const url = this.mainApiUrl.concat(MainConst.LAYER_GET_FIELDS_WITH_SEARCH).replace("{layer_code}", code)
    //                                                                     .replace("{layer_subCode}", subCode)
    //                                                                     .replace("{searchKey}", searchKey);
    // return this.http.get(url);
    return new Promise((resolve, reject)=>{
      try {
        
        var groups = [];
        groups.push(
          new ObjFieldModel({
            "code": "layerName",
            "name": "Tên lớp",
            "allowShare": 1,
            "seqNum": 0,
            "componentUI":"TextView"
          } as ObjFieldModel)
        )
        groups.push(
          new ObjFieldModel({
            "code": "code",
            "name": "Mã",
            "allowShare": 1,
            "seqNum": 1,
            "componentUI":"TextView"

          } as ObjFieldModel)
        )
        groups.push(
          new ObjFieldModel({
            "code": "title",
            "name": "Tiêu đề",
            "allowShare": 1,
            "seqNum": 2,
            "componentUI":"TextView"

          } as ObjFieldModel)
        )
        groups.push(
          new ObjFieldModel({
            "code": "createdAt",
            "name": "Ngày tạo",
            "allowShare": 1,
            "seqNum": 3,
            "componentUI":"TextView"
          } as ObjFieldModel)
        )
        groups.push(
          new ObjFieldModel({
            "code": "license",
            "name": "Giấy phép",
            "allowShare": 1,
            "seqNum": 4,
            "componentUI":"TextView"
          } as ObjFieldModel)
        )
        var data = {};
        data['signal'] = groups;
        var result = new ApiReturnModel({
          "code": 0,
          "message": "Ok",
          "data": data[code]
        });
        resolve(result);
      } catch (error) {
        reject(error)
      }
    })
  }

  getObjClassByCodeAndSubCode(code: string, subCode: string):Promise<ApiReturnModel>{
    // if (!subCode) subCode = ""
    
    // const url = this.mainApiUrl.concat(MainConst.LAYER_GET_FIELDS_WITH_SEARCH).replace("{layer_code}", code)
    //                                                                     .replace("{layer_subCode}", subCode)
    //                                                                     .replace("{searchKey}", searchKey);
    // return this.http.get(url);
    return new Promise((resolve, reject)=>{
      try {
        var groups = [];
        groups.push(
          new ObjClassModel({
            "code": "signal",
            "name": "Báo hiệu",
            "iconUrl":"assets/icon-layer/layer-map/map_baohieu.png",
            "layerUrl":"VungTau_141_95:dulieu_baohieu",
            "zoomMax":19,
            "zoomMin":12
          } as ObjClassModel)
        )
        var result = new ApiReturnModel({
          "code": 0,
          "message": "Ok",
          "data": groups
        });
        resolve(result);
      } catch (error) {
        reject(error)
      }
    })
  }

  //#endregion
}
