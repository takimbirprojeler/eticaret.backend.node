export interface IStore {
    id: string;
    name: string;
    products: IProduct[];
}
export interface IProduct {
    id: string;
    name: string;
    price: number;
    variants: IProduct[];
    description: string;
    category: string;
    store: IStore;
}
export declare class Product implements IProduct {
    id: string;
    name: string;
    price: number;
    variants: IProduct[];
    description: string;
    category: string;
    store: IStore;
    constructor(data: IProduct);
}
//# sourceMappingURL=index.d.ts.map