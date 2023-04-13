import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PopupExtendComponent } from './popup-extend/popup-extend.component';
// import { PopupDataModel, BindingTableModel } from '@shared/models/layerlist.model';
import { PopupDataModel,BindingTableModel } from 'src/app/shared/models/layerlist.model';
import { ObjFieldModel } from 'src/app/shared/models/main.model';
import { ApiReturnModel } from 'src/app/shared/models/global.model';
// import { ConfirmModalComponent } from '@reused/confirm-modal/confirm-modal.component';
import { PopupConfig } from 'src/reuse/shared/config/popup.config';
import { Basic } from 'src/app/core/lib/basic';
import { MainService } from 'src/app/core/services/main/main.service';
import { AutoFormProcess } from 'src/app/core/lib/auto-form-process';
import { MapApiService } from 'src/app/core/services/map/ol/map-api.service';
import { ObjClassModel } from 'src/app/shared/models/main.model';
import { slideDown } from 'src/app/core/animations/animations';

@Component({
  selector: 'map-popup-data',
  templateUrl: './popup-data.component.html',
  styleUrls: ['../../../../shared/scss/popup-infor.shared.scss', './popup-data.component.scss'],
  animations: [
    slideDown
  ]
})
export class PopupDataComponent implements OnInit {
  /********************************
   **Component hiển thị giao diện**
   **popup cho các lớp dữ liệu*****
   ********************************/ 
  //permission
  _isAdmin: boolean = false;
  _currentRole: string = "";
  // _permissionViewType: PermissionType = PermissionType.view;
  // _permissionUpdateType: PermissionType = PermissionType.update;
  // _permissionDeleteType: PermissionType = PermissionType.delete;
  currentLayer: ObjClassModel;
  linkTable: BindingTableModel[] = [];
  bindingObjClasses: ObjClassModel[] = [];
  //popup
  _data: any = {};
  _title: string = "";
  _layerCode: string = "";
  _layerSubCode: string = "";
  _basicInforFields: string[] = PopupConfig.basicInforFieldsWaterway;
  _notShowingFields: string[] = PopupConfig.notShowingFieldsWaterway;
  _basicInforData: object = {};
  _detailInforData: object = {};
  _currentLayerFields: ObjFieldModel[] = [];
  _currentPopupInfoCode: string = "";
  
  _isShowBasicInfor: boolean = true;
  _isShowDetailInfor: boolean = true;
  _isMinimizePopup: boolean = false;

  _popupSize: string = 'md';

  @Input() position:string;

  @Output() onClose = new EventEmitter<object>();
  @Output() onDeleteFeature = new EventEmitter<object>();
  @Output() onUpdateFeature = new EventEmitter<object>();

  @ViewChild(PopupExtendComponent) _popupExtend: PopupExtendComponent;
   //delete modal
  // @ViewChild(ConfirmModalComponent) deleteModal;
  title: string;
  subTitle: string;
  modalType: string;
  //link mng
  // @ViewChild(SubtableComponent) _subtableModal: SubtableComponent;

  scrollbarConfig: PerfectScrollbarConfigInterface = {};
  content: string = "";
  isHiddenPopup: boolean = true;
  _isPermPage: boolean = true;
  
  constructor(
    private toast: ToastrService,
    private mapApiService: MapApiService,
    private mainService: MainService
    ) {
      // this.checkIsPermPage(); 
  }

  ngOnInit(): void {
    //check permission
    // this._isAdmin = this.authService.isAdmin();
    // this._currentRole = this.authService.getCurrentRole();
    // this.loadData();
    if (!PopupConfig.position.includes(this.position)) this.position = 'top-left';
  }


  //#region sort original when show data

  originalOrder(){
    return 0;
  }

  orderBySeqNumber = (old, nw) => {
    if( old.value.seqNumber > nw.value.seqNumber){
      return 1
    } else {
      return -1
    }
  }
  
  //#endregion

  //#region open & close popup
  open(currentLayer: ObjClassModel, data: object, bindingObjClasses?: ObjClassModel[]){
    this._popupExtend.close();
    this.isHiddenPopup = false;
    this._isMinimizePopup = false;
    this._currentLayerFields = [];
    this._currentPopupInfoCode = "";

    this._title = currentLayer.name;
    this._data = data;
    this._layerCode = currentLayer.code;
    this._layerSubCode = currentLayer.subCode;
    this._isShowBasicInfor = true;
    this._isShowDetailInfor = true;
    this.bindingObjClasses = bindingObjClasses;
    this.currentLayer = currentLayer;
    this.getLayerFields(this._layerCode, this._layerSubCode);
    //get current layer and layer's subtable
  }

  close(){
    this.isHiddenPopup = true;
    // this.pubSubService.onClosedPopupData();
    this._popupExtend.close();
    this.onClose.emit();
  }
  
  openInfoModal(key: string, title: string, data: any){
    if (this._currentPopupInfoCode != key) {
      this._currentPopupInfoCode = key;
      this._popupExtend.open(title, this._popupSize, data);
    } else {
      this._currentPopupInfoCode = "";
      this._popupExtend.close();
    }
  }

  toggleBasicInfor(){
    this._isShowBasicInfor = !this._isShowBasicInfor;
  }

  toggleDetailInfor(){
    this._isShowDetailInfor = !this._isShowDetailInfor;
  }

  togglePopupMinimize(){
    this._isMinimizePopup = !this._isMinimizePopup;
    this._popupExtend.close();
  }

  togglePopupSize(size: string){
    this._popupSize = size;
  }

  headerClick(){
    if (this._isMinimizePopup) this._isMinimizePopup = !this._isMinimizePopup;
  }
  //#endregion

  //#region Format to show data
  reload() {
    this.mapApiService.featureLayerReadData(this._layerCode, this._layerSubCode, this._data.id)
    .then(rs => {
      let result = rs as ApiReturnModel;
      if (result.code == 0) {
        this._data = result.data;
        this.checkNotSharingFields(this._currentLayerFields);
      } else {
       this.toast.error(result.message);
      }
    }, error => {
      this.toast.error(error.message);
    })
    .catch(error =>{
      this.toast.error(error)
    })
  }

  getLayerFields(layerCode, layerSubCode){
    this.mainService.getListObjFields(layerCode, layerSubCode, "")
      .then(rs => {
        let result = rs as ApiReturnModel;
        debugger;
        if (result.code == 0) {
          this._currentLayerFields = result.data as ObjFieldModel[];
          this.checkNotSharingFields(this._currentLayerFields);
        } else {
          this.toast.error(result.message);
        }
      }, error => {
        this.toast.error(error.message);
      })
  }

  checkNotSharingFields(layerFields: ObjFieldModel[]) {
    //showing all layerfields & check basic || detail data
    this._basicInforData = {};
    this._detailInforData = {};
    for (let field of layerFields){
      if (this._basicInforFields.includes(field.code.toLowerCase())) {
        this._basicInforData[Basic.lowercaseFirstLetter(field.code)] = {
          value: this._data[Basic.lowercaseFirstLetter(field.code)],
          name: field.name,
          seqNumber: field.seqNum,
          dataType: field.dataType,
          parentCode: field.parentCode ? field.parentCode : "",
          parentCondition: field.parentCondition ? field.parentCondition : "",
          componentUi: field.componentUI ? field.componentUI : ""
        }
        if (field.allowShare === 0 ) delete this._basicInforData[Basic.lowercaseFirstLetter(field.code)];
      }
      else {
        this._detailInforData[Basic.lowercaseFirstLetter(field.code)] = {
          value: this._data[Basic.lowercaseFirstLetter(field.code)],
          name: field.name,
          seqNumber: field.seqNum,
          dataType: field.dataType,
          parentCode: field.parentCode ? field.parentCode : "",
          parentCondition: field.parentCondition ? field.parentCondition : "",
          componentUi: field.componentUI ? field.componentUI : ""
        }
        if (field.allowShare === 0 ) delete this._detailInforData[Basic.lowercaseFirstLetter(field.code)];
      }
    }
  } 

  checkConstraintFieldByAnother(parent: string, condition: string) :boolean{
    if (!parent) return true;
    else {
      let checkValueArr = [];
      if (Basic.checkValidJSONString(condition)) checkValueArr = JSON.parse(condition);
      if (!checkValueArr.length) return true;
      else {
        let bool = false;
        for (let val of checkValueArr) {
          if (this._data[Basic.lowercaseFirstLetter(parent)] && this._data[Basic.lowercaseFirstLetter(parent)].code === val) {
            bool = true;
            break;
          }
        }
        return bool;
      }
    }
  }


  checkAndFormatValue(data: PopupDataModel, value: string){
    if (data.dataType == "Date"){
      const [year, month, day] = value.split('-');
      return `${day}-${month}-${year}`;
    } else if (data.dataType == "DateTime") {
      const [date, time] = value.split(' ');
      const [year, month, day] = date.split('-');
      if (time) return `${time} ${day}-${month}-${year}`;
      else return `${day}-${month}-${year}`;
    } else {
      return value;
    }
  }

  formatTextArea(text: string){
    return AutoFormProcess.formatTextArea(text);
  }

  formatDate(date: string){
    const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
  }

  checkType(value){
    return typeof value;
  }

  openLinkTable(title: string, tableCode: string, layerCode: string){
    this._popupExtend.openByUrl(title, tableCode, layerCode);
  }

  checkNotShowingField(field: string){
    if (this._notShowingFields.includes(field)) return false;
    else return true;
  }
  //#endregion
}


