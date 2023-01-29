import { Injectable } from '@nestjs/common';
import { IProduct, IProductById } from './product.interfaces';

@Injectable()
export class ProductService {
  ProductById(data: IProductById): IProduct {
    const products = [
      {
        id: 0,
        name: 'iphone',
      },
      {
        id: 1,
        name: 'samsung',
      },
      {
        id: 2,
        name: 'lg',
      },
    ];
    return products[data.id] || { id: -1, name: 'notfound' };
  }
}
