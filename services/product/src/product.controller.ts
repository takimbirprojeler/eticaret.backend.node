import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IProduct, IProductById } from './product.interfaces';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod()
  FindOne(data: IProductById): IProduct {
    console.log(data);
    return this.productService.ProductById(data);
  } //
}
