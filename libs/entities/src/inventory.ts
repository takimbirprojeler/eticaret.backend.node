import { RecordBase } from "./base";

export interface Inventory extends RecordBase {
    quantity: number;
}



export class Inventory extends RecordBase {
       constructor(data: Inventory) {
        super()
        Object.assign(this,data)
    }
}