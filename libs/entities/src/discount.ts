import { RecordBase } from "./base";

export interface Discount extends RecordBase {
    name: string;
    description?: string;
    discountPercent: number;
    active: boolean;
}


export class Discount extends RecordBase {
       constructor(data: Discount) {
        super(data as RecordBase)
        Object.assign(this,data)
    }
}