import { Address } from "./address";
import { RecordBase } from "./base";
import { Role } from "./role";
import { Session } from "./session";


//#region User
export interface User extends RecordBase {
    userName: string;
    firstName: string;
    lastName: string;
    phone?: string;  // both of one required, phone or email
    email?: string;
    address: Address[];
    roles: Role[];
    sessions: (Session | string)[]
}
//#endregion User


export class User extends RecordBase {

    constructor(data: Role) {
        super(data as RecordBase)
        Object.assign(this,data)
    }
}



