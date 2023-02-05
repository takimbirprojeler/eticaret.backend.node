import { RecordBase } from "./base";
import { Role } from "./role";


//#region User
export interface User extends RecordBase {
    userName: string;
    firstName: string;
    lastName: string;
    phone?: string;  // both of one required, phone or email
    email?: string;
    roles: Role[];
}
//#endregion User


export class User extends RecordBase {

    constructor(data: Role) {
        super(data as RecordBase)
        Object.assign(this,data)
    }
}



