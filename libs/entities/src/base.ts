
export interface RecordBase {
    id?: string
    createdAt?: Readonly<number>; // timestamp
    updateAt?: number; // timestamp
    deleteAt?: number; // if record is deleted
}

// #endregion Record base
export class RecordBase { }