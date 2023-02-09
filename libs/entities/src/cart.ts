import { RecordBase } from "./base";
import { Product } from "./product";
import { User } from "./user";


export interface CartItem extends RecordBase {
    Cart: Cart | string;
    product: Product | string;
    quantity: number;
    
}
export interface Cart extends RecordBase {
    user: User | string; // user or userid
    total: number;
    items: (CartItem | string)[]
}


export class Cart extends RecordBase {

    constructor(data: Cart) {
        super()
        Object.assign(this,data)
    }
}

export class CartItem extends RecordBase {

    constructor(data: CartItem) {
        super()
        Object.assign(this, data)
    }
}