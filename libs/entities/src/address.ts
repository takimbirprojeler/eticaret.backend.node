import { RecordBase } from "./base";
import { User } from "./user"

export interface Address extends RecordBase {
    user?: User | string; // user entity or id
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    createAt?: number 
}


export class Address extends RecordBase {
    constructor(data: Address) {    
        super()
        Object.assign(this, data)
    }
}