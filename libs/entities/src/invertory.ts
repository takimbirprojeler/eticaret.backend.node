import { RecordBase } from "./base";

export interface Invertory extends RecordBase {
    quantity: number;
}



export class Invertory extends RecordBase {
       constructor(data: Invertory) {
        super(data as RecordBase)
        Object.assign(this,data)
    }
}