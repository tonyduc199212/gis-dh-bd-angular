export const PopupConfig = { 
    position: ["top-right", "top-left"],
    notShowingFieldsWaterway: ["id", "coordinates", "coordinates_1", "geom", "srid"],
    basicInforFieldsWaterway: ["content", "title", "name", "code", "address", "email", "phonenumber", "contact", "establishyear", "ward", "district", "province", "area", "updatedat", "createdat", "note", "lat", "long", "confirmationstatus"],
    notShowingEditorFieldsWaterway: ["waterwayname", "waterwaycode", "objectid", "id", "srid", "geom", "statusupdat", "district", "districtcode", "ward", "wardcode", "province", "provincecode", "updatedat", "createdat", "lat", "long", "coordinates", "coordinates_1"],
    basicInforFieldsPatrol: ["content", "title", "problem", "code", "ward", "district", "province", "staff", "updatedat", "createdat", "note", "image", "waterway"],
    basicInforFieldsPatrolEval: ["code", "comment", "title", "status", "repair", "staff", "note", "updatedat", "createdat", "problem"],
    notShowingFieldsPatrolEval: ["id", "repairid", "staffid", "geom", "srid", "appliedfields", "coordinates"],
    imageFieldNames: ["image", "evidence"]
}