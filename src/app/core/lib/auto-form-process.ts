// import { Basic } from '@core/lib/basic';
// import { AutoFormDataModel } from "@reused/shared/models/popup.model";
// import { DataRequirementResultModel } from '@shared/models/layerlist.model';
// import { ObjFieldModel } from '@app/shared/models/main.model';
// import { AutoFormRegex } from './auto-form-regex';
const spatialQueryFields = ['district', 'ward', 'province', 'waterway'];

export class AutoFormProcess {
    // public static FormatToShowing (data: any, isCreateForm: boolean, objFields: ObjFieldModel[], notShowingFields: string[]) {      
    //   let returnData = {}
    //     for (let field of objFields){
    //         if (checkShowingField(field.code, notShowingFields)) {
    //           if (field.dataType === "string") returnData[field.code] = {
    //             type: field.dataType,
    //             name: field.name,
    //             seqNumber: field.seqNum,
    //             value: isCreateForm ? null : data[Basic.lowercaseFirstLetter(field.code)],
    //             apiUrl: field.apiURL ? field.apiURL : "",
    //             componentUi: field.componentUI ? field.componentUI : "",
    //             required: typeof field.required == "number" ? field.required : 0,
    //             parentCode: field.parentCode ? field.parentCode : "",
    //             parentCondition: field.parentCondition ? field.parentCondition : "" ,
    //             preventEdit: typeof field.preventEdit == "number" ? field.preventEdit : 0,
    //             regex: field.validateRegex ? field.validateRegex : "",
    //             maxSize: typeof field.maxSize == "number" ? field.maxSize : null,
    //             minSize: typeof field.minSize == "number" ? field.minSize : null,
    //             maxValue: field.maxValue ? field.maxValue : "",
    //             minValue: field.minValue ? field.minValue : "",
    //             parentCmbUI: {
    //               code: "",
    //               queryParam: ""
    //             }
    //           } as AutoFormDataModel;
      
    //           if (field.componentUI == "Combobox(SingleChoice)") {
    //             let value;
    //             if (isCreateForm) value = null
    //             else value = data[Basic.lowercaseFirstLetter(field.code)] ? data[Basic.lowercaseFirstLetter(field.code)].code : null;
    //             let getParentCmbUI = (Basic.checkValidJSONString(field.extra) && JSON.parse(field.extra).parentCmbUI) ? JSON.parse(field.extra).parentCmbUI : {
    //               code: "",
    //               queryParam: ""
    //             }
    //             returnData[field.code] = {
    //               type: field.dataType,
    //               name: field.name,
    //               seqNumber: field.seqNum,
    //               value: value,
    //               apiUrl: field.apiURL ? field.apiURL : "",
    //               componentUi: field.componentUI ? field.componentUI : "",
    //               required: typeof field.required == "number" ? field.required : 0,
    //               parentCode: field.parentCode ? field.parentCode : "",
    //               parentCondition: field.parentCondition ? field.parentCondition : "",
    //               preventEdit: typeof field.preventEdit == "number" ? field.preventEdit : 0,
    //               regex: field.validateRegex ? field.validateRegex : "",
    //               maxSize: typeof field.maxSize == "number" ? field.maxSize : null,
    //               minSize: typeof field.minSize == "number" ? field.minSize : null,
    //               maxValue: field.maxValue ? field.maxValue : "",
    //               minValue: field.minValue ? field.minValue : "",
    //               parentCmbUI: getParentCmbUI
    //             } as AutoFormDataModel;                
    //           }
      
    //           if (field.componentUI == "Combobox(MultiChoice)") {
    //             let value;
    //             if (isCreateForm)  {
    //               value = null
    //             } else {
    //               let currentValue = data[Basic.lowercaseFirstLetter(field.code)] ? data[Basic.lowercaseFirstLetter(field.code)] : null;
    //               if (currentValue){
    //                 value = [];
    //                 for (let item of currentValue){
    //                   value.push(item.code)
    //                 }
    //               } else {
    //                 value = null;
    //               }
    //             } 
    //             let getParentCmbUI = (Basic.checkValidJSONString(field.extra) && JSON.parse(field.extra).parentCmbUI) ? JSON.parse(field.extra).parentCmbUI : {
    //               code: "",
    //               queryParam: ""
    //             }
    //             returnData[field.code] = {
    //               type: "ArrayObjType",
    //               name: field.name,
    //               seqNumber: field.seqNum,
    //               value: isCreateForm ? null : value,//dạng string[]
    //               apiUrl: field.apiURL ? field.apiURL : "",
    //               componentUi: field.componentUI ? field.componentUI : "",
    //               required: typeof field.required == "number" ? field.required : 0,
    //               parentCode: field.parentCode ? field.parentCode : "",
    //               parentCondition: field.parentCondition ? field.parentCondition : "",
    //               preventEdit: typeof field.preventEdit == "number" ? field.preventEdit : 0,
    //               regex: field.validateRegex ? field.validateRegex : "",
    //               maxSize: typeof field.maxSize == "number" ? field.maxSize : null,
    //               minSize: typeof field.minSize == "number" ? field.minSize : null,
    //               maxValue: field.maxValue ? field.maxValue : "",
    //               minValue: field.minValue ? field.minValue : "",
    //               parentCmbUI: getParentCmbUI
    //             } as AutoFormDataModel;
    //           }
              
    //           if (field.dataType === "double" || field.dataType === "int" || field.dataType === "float") returnData[field.code] = {
    //             type: field.dataType,
    //             name: field.name,
    //             seqNumber: field.seqNum,
    //             value:  isCreateForm ? null : data[Basic.lowercaseFirstLetter(field.code)],
    //             apiUrl: field.apiURL ? field.apiURL : "",
    //             componentUi: field.componentUI ? field.componentUI : "",
    //             required: typeof field.required == "number" ? field.required : 0,
    //             parentCode: field.parentCode ? field.parentCode : "",
    //             parentCondition: field.parentCondition ? field.parentCondition : "",
    //             preventEdit: typeof field.preventEdit == "number" ? field.preventEdit : 0,
    //             regex: field.validateRegex ? field.validateRegex : "",
    //             maxSize: typeof field.maxSize == "number" ? field.maxSize : null,
    //             minSize: typeof field.minSize == "number" ? field.minSize : null,
    //             maxValue: field.maxValue ? field.maxValue : "",
    //             minValue: field.minValue ? field.minValue : "",
    //             parentCmbUI: {
    //               code: "",
    //               queryParam: ""
    //             }
    //           } as AutoFormDataModel; 
      
    //           if (field.dataType === "Date") returnData[field.code] = {
    //             type: field.dataType,
    //             name: field.name,
    //             seqNumber: field.seqNum,
    //             value:  isCreateForm ? null : data[Basic.lowercaseFirstLetter(field.code)],//Basic.formatDateYMD(data[Basic.lowercaseFirstLetter(field.code)]),
    //             apiUrl: field.apiURL ? field.apiURL : "",
    //             componentUi: field.componentUI ? field.componentUI : "",
    //             required: typeof field.required == "number" ? field.required : 0,
    //             parentCode: field.parentCode ? field.parentCode : "",
    //             parentCondition: field.parentCondition ? field.parentCondition : "",
    //             preventEdit: typeof field.preventEdit == "number" ? field.preventEdit : 0,
    //             regex: field.validateRegex ? field.validateRegex : "",
    //             maxSize: typeof field.maxSize == "number" ? field.maxSize : null,
    //             minSize: typeof field.minSize == "number" ? field.minSize : null,
    //             maxValue: field.maxValue ? field.maxValue : "",
    //             minValue: field.minValue ? field.minValue : "",
    //             parentCmbUI: {
    //               code: "",
    //               queryParam: ""
    //             }
    //           } as AutoFormDataModel; 

    //           if (field.dataType === "DateTime") returnData[field.code] = {
    //             type: field.dataType,
    //             name: field.name,
    //             seqNumber: field.seqNum,
    //             value:  isCreateForm ? null : Basic.DateTimeToDateTimeLocal(data[Basic.lowercaseFirstLetter(field.code)]),
    //             apiUrl: field.apiURL ? field.apiURL : "",
    //             componentUi: field.componentUI ? field.componentUI : "",
    //             required: typeof field.required == "number" ? field.required : 0,
    //             parentCode: field.parentCode ? field.parentCode : "",
    //             parentCondition: field.parentCondition ? field.parentCondition : "",
    //             preventEdit: typeof field.preventEdit == "number" ? field.preventEdit : 0,
    //             regex: field.validateRegex ? field.validateRegex : "",
    //             maxSize: typeof field.maxSize == "number" ? field.maxSize : null,
    //             minSize: typeof field.minSize == "number" ? field.minSize : null,
    //             maxValue: field.maxValue ? field.maxValue : "",
    //             minValue: field.minValue ? field.minValue : "",
    //             parentCmbUI: {
    //               code: "",
    //               queryParam: ""
    //             }
    //           } as AutoFormDataModel; 
    //         }
    //     }
    //     return returnData;

    //     function checkShowingField(field: string, notShowingFields: string[]){
    //         if (notShowingFields.includes(field.toLowerCase())) return false;
    //         else return true;
    //     }
    // }

    // public static ProcessingDataToObject(data){
    //     let obj = {}
    //     for (const [key, value] of Object.entries(data)) {
    //       let _value = value as any;
    //       if (_value.componentUi == "Combobox(SingleChoice)") {
    //         let val = "";
    //         if (_value.value) {
    //           obj[key] = {
    //             code: _value.value
    //           }
    //           val = _value.value;
    //         } else {
    //           obj[key] = null
    //         }
    //         // update format when submit type is bool
    //         if(_value.type == "bool"){
    //           if(val == "true") obj[key] = true;
    //           else obj[key] = false;
    //         }
    //       } else if (_value.type == "ArrayObjType" && _value.componentUi == "Combobox(MultiChoice)") {
    //         if (_value.value) {
    //           let stringArr = _value.value as string[];
    //           let arr = [];
    //           for (let i of stringArr) {
    //             arr.push({
    //               code: i
    //             })
    //           }
    //           obj[key] = arr;
    //         } else {
    //           obj[key] = null
    //         }
    //       } else if (_value.type == "string" && _value.componentUi == "InputText"){
    //         obj[key] = Basic.trimAndRemoveDoubleSpace(_value.value);
    //       } else if (_value.type == "DateTime"){
    //         obj[key] = Basic.DateTimeLocalToDateTime(_value.value);
    //       } else {
    //         // obj[key] = _value.value ? _value.value + "" : "";
    //         obj[key] = _value.value;
    //       }
    //     }
    //     return obj;
    // }

    // public static ProcessingDataForPopupEditor(data){ 
    //   let obj = {}
    //   for (const [key, value] of Object.entries(data)) {
    //     let _value = value as any
    //     if (_value.componentUi == "Combobox(SingleChoice)") {
    //       if (_value.value) {
    //         obj[key] = {
    //           code: _value.value
    //         }
    //       } else {
    //         obj[key] = null
    //       }
    //     } else if (_value.type == "ArrayObjType" && _value.componentUi == "Combobox(MultiChoice)") {
    //       if (_value.value) {
    //         let stringArr = _value.value as string[];
    //         let arr = [];
    //         for (let i of stringArr) {
    //           arr.push({
    //             code: i
    //           })
    //         }
    //         obj[key] = arr;
    //       } else {
    //         obj[key] = null
    //       }
    //     } else if (_value.type == "string" && _value.componentUi == "InputText"){
    //       obj[key] = Basic.trimAndRemoveDoubleSpace(_value.value);
    //     } else if (_value.type == "DateTime"){
    //       obj[key] = Basic.DateTimeLocalToDateTime(_value.value);
    //     } else {
    //       obj[key] = _value.value;
    //     }
    //     //edit coordinates/district/ward
    //     if (spatialQueryFields.includes(key)) obj[key] = {
    //       code: _value.code
    //     };
    //     if ( key === "geom") {
    //       obj["geom"] = _value;
    //     }
    //     //applied fields
    //     if (key === "appliedFields") {
    //       obj["appliedFields"] = _value;
    //     }
    //   }
  
    //   return obj;
    // }

    // public static checkFirstInputKey(key: string, data: any){ 
    //   let focusInput: string[] = ["string", "double", "int", "float"];
    //   let focusFieldKey = '';
    //   for (const [key, value] of Object.entries(data)) {
    //     if (focusInput.includes(value['type'].toLowerCase())) {
    //       focusFieldKey = key;
    //       break;
    //     }
    //   }
    //   if (focusFieldKey == key) return true;
    //   else return false;
    // }

    // public static checkDataRequirement(data: object){ 
    //   let isValidData = true;
    //   let invalidFields = [];
    //   for (const [key, value] of Object.entries(data)) {
    //     let _value = value as any;
    //     if ((_value.required == 1 || _value.required == 3) && ((typeof _value.value != 'number' && !_value.value) || (typeof _value.value == 'number' && _value.value == null))) { 
    //       isValidData = false;
    //       invalidFields.push(_value.name)
    //     }
    //   }
    //   let returnData = {
    //     isValid: isValidData,
    //     invalidFields: invalidFields
    //   } as DataRequirementResultModel;
    //   return returnData;
    // }

    // public static validateData(data: object) : boolean { 
    //   let isValidData = true;
    //   for (const [key, value] of Object.entries(data)) {
    //     let _value = value as any;
    //     if ((_value.required == 1 || _value.required == 3) && ((typeof _value.value != 'number' && !_value.value) || (typeof _value.value == 'number' && _value.value == null))) { 
    //       isValidData = false;
    //     }
    //     if (_value.value) {
    //       let checkValid = AutoFormRegex.AutoValidate(_value.regex, _value.value, _value.maxSize, _value.minSize, _value.maxValue, _value.minValue);
    //       if (checkValid) isValidData = false;
    //     }
    //   }
    //   return isValidData;
    // }

    public static formatTextArea(text: string) {
      return text.replace(/\r?\n/g, '<br />');
    }
}

