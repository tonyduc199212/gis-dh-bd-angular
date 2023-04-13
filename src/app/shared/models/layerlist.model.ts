import { ObjClassModel } from "./main.model";

export class LayerGroupModel {
    constructor(obj?){
        if(obj){
            this.layerName = obj.layerName;
            this.name = obj.name;
            this.code = obj.code;
            this.isFolder = obj.isFolder;
            this.isOpen = obj.isOpen;
            this.isExpand = obj.isExpand;
            this.childrend = obj.childrend;
            this.icon = obj.icon;
            this.index = obj.index;
        }
    }
    layerName?: string;
    funcModuleCode: string;
    name?: string;
    code?: string;
    isFolder: boolean;
    isOpen?: boolean;
    isAdmin?: boolean;
    isExpand?: boolean;
    childrend: ObjClassModel[];
    id: string;
    icon?: string;
    index: number;
} 

export class ActionLayerGroupModel {
    data: LayerGroupModel;
    id: string;
    action: string;
} 

export class CreateLayerGroupModel {
    name: string;
    code: string;
    isFolder?: boolean;
    index?: number;
} 

export class LayerEditorModel {
    code: string;
    subCode: string;
    name: string;
}

export class ClickResultModel {
    data: any;
    objClass: LayerEditorModel;
}

export class UpdateObjFieldModel {
    name: string;
    nameEn: string;
    seqNum: number;
    required: number;
    allowStatistic: number;
}

export class PopupDataModel {
    value: any;
    name: string;
    seqNumber: number;
    dataType: string;
}

export class ObjClassEvent {
    objClass: ObjClassModel;
}

export class ObjTypeModel {
    id:	string;
    createdAt: string;
    updatedAt: string;
    code: string;
    name: string;
    objClass: string;
}

export class BindingTableModel {
    code: string;
    subCode: string;
    name: string;
    id: string;
    iconCode?: string;
    btnColor?: string;
    permissionObjClass?: ObjClassModel;
}

export class DataRequirementResultModel {
    isValid: boolean;
    invalidFields: string[];
}