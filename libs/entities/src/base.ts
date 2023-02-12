
import { createId } from "@paralleldrive/cuid2"
//#region  Record base

export interface RecordBase {
    id: string
    createdAt: Readonly<number>; // timestamp
    updateAt: number; // timestamp
    deleteAt: number; // if record is deleted
    getCreateAtAsDate(): Date // get as date
    getUpdateAtAsDate(): Date
}

// #endregion Record base
export class RecordBase { }