import { RecordBase  } from "./base"
//#region Roles
export interface Role extends RecordBase {
    name: string;
    perms: Perm[];
    description?: string;
}

export interface Perm extends RecordBase {
    name: string;
    description?: string;
}
//#endregion Roles


export class Role extends RecordBase {
    constructor(data: Role) {
        super(data as RecordBase)
        Object.assign(this,data)
    }
}


export class Perm extends RecordBase {
    constructor(data: Perm) {
        super(data as RecordBase)
        Object.assign(this,data)
    }
}
