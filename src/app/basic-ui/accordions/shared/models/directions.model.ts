export class SignModel {
    sign: number;
    value: string;
    text: string;
    icon: string;
}

export class PathModel {
    "distance": number;
    "geom_encoded": string;
    "time": number;
    "instructions": InstructionModel[];
}

export class InstructionModel {
    "distance": number;
    "heading": string;
    "sign": number;
    "street_name": string;
    "text": string;
    "time": number;
    "geom_encoded": string;
    sign_detail?: SignModel;
}
