export class ShapeModel {
    constructor() {
    }
    type: string;
    coordinates: any;
}

export class ApiReturnModel {
    constructor(obj?) {
        if(obj){
            this.message = obj.message;
            this.code = obj.code;
            this.data = obj.data;
        }
    }
    message: string;
    code: number;
    data: any;
}