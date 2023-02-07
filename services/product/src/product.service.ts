import { Injectable, OnModuleInit } from '@nestjs/common';
import { IProduct, IProductById } from './product.interfaces';

@Injectable()
export class ProductService implements OnModuleInit {
  onModuleInit() {
    
  }
  ProductById(data: { id: string}) {
    const products = [
      {
        id: "apple",
        name: 'iphone'
      },
   
    ];
    return {
      data: products[0]
    };
  }
}
