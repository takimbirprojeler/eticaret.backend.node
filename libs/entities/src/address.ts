import { RecordBase } from "./base";
import { User } from "./user"

export interface Address {
    user: User | string; // user entity or id
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
}


export class Address extends RecordBase {
    constructor(data: Address) {
        super(data as RecordBase)
        Object.assign(this, data)
    }
}