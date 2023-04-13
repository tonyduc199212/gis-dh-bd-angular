import { FileSizeType } from "src/app/shared/enums/file-size-type.enum";
export class Basic {
    public static addDays (date, daysToAdd) {
        var _24HoursInMilliseconds = 86400000;
        return new Date(date.getTime() + daysToAdd * _24HoursInMilliseconds);
    };

    public static arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }

    public static uuidGenerator(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static randomStrGenerator(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static formatDateToYYYYMMDD(date: Date){
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    public static generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    public static DateTimeLocalToDateTime(datetimeLocal: string) {
        if (datetimeLocal) {
            let returnData = "";
            let arr = datetimeLocal.split("T");
            returnData = arr[0] + " " + arr[1] + ":00"
            return returnData;
        } 
        else return null;
    }

    public static DateTimeToDateTimeLocal(datetime: string) {
        if (datetime) {
            let returnData = "";
            let arr = datetime.split(" ");
            if (arr[1]) returnData = arr[0] + "T" + arr[1].replace(":00", "")
            else returnData = arr[0] + "T00:00"
            return returnData;
        } 
        else return null;
    }

    public static maskPassword(password) {
        return Array(password.length + 1).join("*");
    }

    public static sort(array, byField, type) {
        if (type == "asc") array.sort((a, b) => parseFloat(a[byField]) - parseFloat(b[byField]));
        if (type == "desc") array.sort((a, b) => parseFloat(b[byField]) - parseFloat(a[byField]));
        return array;
    }

    public static sortObj(obj: object, byField, type) {
        let arr = []
        for (const [key, value] of Object.entries(obj)) {
            arr.push({
                key: key,
                value: value,
                sortField: value[byField]
            })
        }
        arr = this.sort(arr, "sortField", type);
        let newObj = {};
        arr.map(data => {
            newObj[data.key] = data.value
        })
        return newObj
    }

    public static pushObj(array, obj) {
        if (array.some(data => data.id === obj.id)) {
            return array;
        } else {
            array.push(obj);
            return array;
        }
    }

    public static removeItem(array, item) {
        return array.filter(i => i != item);
    }

    public static removeObj(array, obj) {
        return array.filter(item => item.id != obj.id);
    }

    public static removeObjByKey(array, obj, key) {
        return array.filter(item => item[key] != obj[key]);
    }

    public static removeObjByField(array, field, fieldValue) {
        return array.filter(item => item[field] != fieldValue);
    }

    public static pushData(array, data) {
        if (array.includes(data)) {
            return array;
        } else {
            array.push(data);
            return array;
        }
    }

    public static removeData(array, data) {
        return array.filter(item => item != data);
    }

    public static diffArray (arr1, arr2) {
        return arr1.filter(({ id: id1 }) => !arr2.some(({ id: id2 }) => id2 === id1));
    }

    public static diffArrayByCodeField (a, b) {
        const results = a.filter(({ code: id1 }) => !b.some(({ code: id2 }) => id2 === id1));
        return results;
    }

    public static replaceArrayWithArrayById(target_arr, replace_arr) {
        target_arr = target_arr.map(a => {
            let obj = replace_arr.find(a2=> a2.id == a.id);
            if (obj) return obj;
            return a;
        })
        return target_arr;
    }

    public static replaceOrAddObjectToArrayById(target_arr, object) {
        if (this.isArrayObjIncludesObject(target_arr, object)) {
            target_arr = target_arr.map(a => {
                if (a.id === object.id) return object
                else return a;
            })
        } else {
            target_arr.push(object);
        }
        return target_arr;
    }

    public static isArrayObjIncludesObject(arr, object){
        return arr.some(function(el) {
            return el.id === object.id;
        }); 
    }

    public static isArrayIncludesObjectById(arr: string[], object){
        return arr.some(function(el) {
            return el === object.id;
        }); 
    }

    public static isArrayIncludesObject(arr: any[], object){
        return arr.some(function(el) {
            return el.id === object.id;
        }); 
    }

    public static isArrayIncludesArray(arr1: any[], arr2: any[]){
       return arr2.every( _item => this.isArrayIncludesObject(arr1, _item) );
    }

    public static isExistPermission(arr, object){
        return  arr.some(a => {
            return (a.​​​permObject.id === object.​​​permObject.id && a.​​​permissionGroup.id === object.​​​permissionGroup.id);
        }); 
    }

    public static returnPermissionId(arr, object){
        let id = "";
        arr.map(a => {
            if (a.objClass.id === object.objClass.id && a.​​​permissionGroup.id === object.​​​permissionGroup.id) return id = a.id;
        })
        return id;
    }

    public static replaceOrAddAfterCheckPermission(target_arr, object) {
        let isInclude =  false;
        isInclude = target_arr.some(a => {
            return (a.objClass.id === object.objClass.id && a.​​​permissionGroup.id === object.​​​permissionGroup.id);
        }); 
        if (isInclude) {
            target_arr = target_arr.map(a => {
                if (a.objClass.id === object.objClass.id && a.​​​permissionGroup.id === object.​​​permissionGroup.id) return object;
                else return a;
            })
        } else {
            target_arr.push(object);
        }
        return target_arr;
    }

    public static lowercaseFirstLetter(string: string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    public static uppercaseFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public static removeLastCharacterFromString(string: string) {
        return string.substring(0, string.length - 1);
    }

    public static sortArrayByArray(arrTarget: any, arrSort: string[]) {
        
        let result = [];
        
        arrSort.forEach(function(key) {
            var found = false;
            arrTarget = arrTarget.filter(function(item) {
                if(!found && item[0].key.toLowerCase() == key) {
                    result.push(item);
                    found = true;
                    return false;
                } else 
                    return true;
            })
        })

        return result;
    }

    public static sortObjectByArray(object: object, arrSort: string[]) {
        
        var objToArr = Object.keys(object).map((key) => [{
            key: key,
            value: object[key]
        }]);
        
        let intersectArr  = this.sortArrayByArray(objToArr, arrSort);

        let returnObjIntersect = {}
        for (let item of intersectArr){
            returnObjIntersect[item[0].key] = item[0].value;
        }
        return returnObjIntersect;
    }


    public static diffenceBetweenObjects(objTarget: object, objRemove: object) {
        var result = {};
        var keys = Object.keys(objRemove);

        for (var key in objTarget) {
            if (!keys.includes(key)) {
                result[key] = objTarget[key];
            }
        }
        return result
    }

    public static exportExcel(data: any, title: string) {
        let date = new Date().getTime();
        let fileName = "ExportData_" + title + "_" + date + ".xlsx";
        var newBlob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64" });
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //     window.navigator.msSaveOrOpenBlob(newBlob, fileName);
        //     return;
        // }
        const exportData = window.URL.createObjectURL(newBlob);
        
        var link = document.createElement('a');
        link.href = exportData;
        link.download = fileName;

        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        
        setTimeout(function () {
            window.URL.revokeObjectURL(exportData);
            link.remove();
        }, 100);
    }

    public static formatDate(date: string){
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    public static formatDateTime(dateTime: string, showDateOnly?: boolean){
        const [date, time] = dateTime.split(' ');
        const [year, month, day] = date.split('-');
        if (!showDateOnly) {
            if (time) return `${time} ${day}-${month}-${year}`;
            else return `${day}-${month}-${year}`;
        } else return `${day}-${month}-${year}`;
    }

    public static formatDateYMD(dateTime: string){
        if (dateTime.includes(" ")){
            const [date, time] = dateTime.split(' ');
            return date;
        }
        return dateTime;
    }

    public static formatFileSize(size: number, type: FileSizeType) :number{
        let returnVal = 0;
        switch (type) {
            case "KB":
                returnVal = (size / (1024));
                break;
            case "MB":
                returnVal = (size / (1024*1024));
                break;
            case "GB":
                returnVal = (size / (1024*1024*1024));
                break;
            case "TB":
                returnVal = (size / (1024*1024*1024*1024));
                break;
            default:
                returnVal = size;
                break;
        }
        return returnVal;
    }

    public static trimAndRemoveDoubleSpace(str: string) :string{
        if (str)  {
            str = str + "";
            str = str.trim();
            str = str.replace(/\s+/g, ' ');
        }
        return str;
    }

    public static removeAllSpaces(str: string) :string{
        if (str) {
            str = str.trim();
            str = str.replace(/\s+/g, '');
        }
        return str;
    }

    public static checkValidJSONString(str: string) :boolean{
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    public static uintToString(uintArray) {
        var encodedString = String.fromCharCode.apply(null, uintArray),
            decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    }

    public static pushToFirstOfArray(array: any[], data: any) {
        const newArray = [data].concat(array);
        return newArray;
    }

    public static isImage(imageUrl: string) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg|JPG|PNG|JPEG|GIF|SVG)$/.test(imageUrl);
    }

    public static formatIndexPerPage(i: number, page: number) :number{
        let index = 0 as number;
        if (page == 1) index = i + 1;
        if (page > 1) index = (page - 1) * 10 + i + 1;
        return index;
    }

}

