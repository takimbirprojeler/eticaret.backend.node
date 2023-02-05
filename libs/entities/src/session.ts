import { RecordBase } from "./base"
import { User } from "./user"


export interface Session extends RecordBase {
    token: string;
    user: User | string; // user or id key
    location: string;
    device: string;
    browser: string;
    os: string;
}


export class Session extends RecordBase {

    constructor(data: Session) {
        super(data as RecordBase)
        Object.assign(this, data)
    }
}