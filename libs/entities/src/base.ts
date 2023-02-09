
import { createId } from "@paralleldrive/cuid2"
//#region  Record base

export interface RecordBase {
    id?: string;
    createdAt?: number; // timestamp
    updateAt?: number; // timestamp
    deleteAt?: number; // if record is deleted

}

// #endregion Record base
export class RecordBase  {}