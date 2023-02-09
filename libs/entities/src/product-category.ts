import { RecordBase } from "./base";


export interface ProductCategory extends RecordBase {
    name: string
    description: string
}


export class ProductCategory extends RecordBase {
       constructor(data: ProductCategory) {
        super()
        Object.assign(this,data)
    }
}