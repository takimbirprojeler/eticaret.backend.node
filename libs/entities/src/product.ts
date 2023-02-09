import { RecordBase } from "./base";
import { Discount } from "./discount";
import { Invertory } from "./invertory";
import { ProductCategory } from "./product-category";

export enum PriceUnit {
    TRY = "TL",
    USD = "USD",
    EUR = "EUR"
}
export interface Product extends RecordBase {
    name?: string;
    sku?: string[]; // birden fazla barkoda sahip olabilir
    description?: string;
    brand?: string;
    specs?: Record<string, unknown>[]
    price?: {
        unitType: PriceUnit;
        priceUnit: number;
        task: number;
    };
    category?: ProductCategory | string; // entity or id 
    invertory?: Invertory | string;
    discount?: Discount | string; // maybe unnecessary
}



export class Product extends RecordBase {
    constructor(data: Product) {
        super()
        Object.assign(this, data)
    }
}

