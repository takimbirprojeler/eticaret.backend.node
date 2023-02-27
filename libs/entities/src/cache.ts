import { Address } from "./address";
import { Cart } from "./cart";
import { Discount } from "./discount";
import { Inventory } from "./inventory";
import { Product } from "./product";
import { ProductCategory } from "./product-category";
import { Role } from "./role";
import { Session } from "./session";
import { User } from "./user";

export type Cache =
    Address |
    Cart |
    Discount |
    Inventory |
    ProductCategory |
    Product |
    Role |
    Session |
    User; 