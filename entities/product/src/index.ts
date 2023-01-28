export interface IStore {
    id: string
    name: string
    products: IProduct[]
}

export interface IProduct {
    id: string
    name: string
    price: number
    variants: IProduct[]
    description: string
    category: string
    store: IStore
}

export class Product implements IProduct {
    id: string
    name: string
    price: number
    variants: IProduct[]
    description: string
    category: string
    store: IStore
    constructor(data: IProduct) {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.variants = data.variants
        this.description = data.description
        this.category = data.category
        this.store = data.store
    }
}