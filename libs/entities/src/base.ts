
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
export class RecordBase {

    constructor(data: RecordBase) {
        Object.assign(this, data)
        if (this.createdAt == null || this.createdAt == undefined) this.createdAt = Date.now()
        if (this.updateAt == null || this.updateAt == undefined) this.updateAt = Date.now()
        if (this.id == null || this.id == undefined) this.id = createId() 
    }


    update(data: RecordBase & any): void
    update<T>(data: RecordBase & T): void {
        Object.assign(this, data)
        this.updateAt = Date.now()
    }

    getCreateAtAsDate(): Date {
        return new Date(this.createdAt)
    }

    getUpdateAsDate(): Date {
        return new Date(this.updateAt)
    }
}