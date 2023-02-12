import { RecordBase } from "./base";
import { Discount } from "./discount";
import { Inventory } from "./inventory";
import { ProductCategory } from "./product-category";

export enum PriceType {
    TRY = "TL",
    USD = "USD",
    EUR = "EUR"
}


export interface Product extends RecordBase {
    name: string;
    brand: string;
    sku: string[]; // birden fazla barkoda sahip olabilir
    description?: string;
    specs: Record<string, string>,
    price: {
        type: PriceType;
        unit: number;
        task: number;
    };
    category: ProductCategory | string; // entity or id 
    inventory: Inventory | string;
    discount: Discount | string; // maybe unnecessary
}



export class Product extends RecordBase {
    constructor(data: Product) {
        super()
        Object.assign(this,data)
    }
}