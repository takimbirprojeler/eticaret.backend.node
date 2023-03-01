import { RecordBase } from "./base";
import { Discount } from "./discount";
import { Inventory } from "./inventory";
import { ProductCategory } from "./product-category";

export enum PriceType {
    TRY = "TL",
    USD = "USD",
    EUR = "EUR"
}

export interface IPrice {
    type: PriceType;
    unit: number;
    task: number;
}

export interface Product extends RecordBase {
    name?: string;
    brand?: string;
    sku?: string[]; // birden fazla barkoda sahip olabilir
    description?: string;
    price?: {
        type: PriceType;
        unit: number;
        task: number;
    };
    specs?: Record<string, string>;
    category?: ProductCategory | string; // entity or id 
    inventory?: Inventory | string;
    discount?: Discount | string; // maybe unnecessary
}



export class Product extends RecordBase {

    constructor(data: Product) {
        super()
        const { price, ...rest } = data

        if (price) {
            price.task = Number(price?.task.toFixed(3))
            price.unit = Number(price?.unit.toFixed(3))
        }
        Object.assign(this, rest, { price })
    }
}