"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.variants = data.variants;
        this.description = data.description;
        this.category = data.category;
        this.store = data.store;
    }
}
exports.Product = Product;
//# sourceMappingURL=index.js.map