export class AutoFormDataModel {
    constructor() {
    }
    type: string;
    name: string;
    value:  any;
    componentUi: string;
    apiUrl: string;
    seqNumber: number;
    required: number;
    parentCode: string;
    parentCondition: string;
    preventEdit: number;
    regex: string;
    maxSize: number;
    minSize: number;
    maxValue: string;
    minValue: string;
    parentCmbUI: ParentCmbUIModel;
}

export class ParentCmbUIModel {
    code: string;
    queryParam: string;
}