import { Product } from '@libs/entities';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController  {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod()
  async FindById(data: { id: string}): Promise<{ data: Partial<Product> }>  {
    return await this.productService.FindById(data);
  } 

  @GrpcMethod()
  async Create(data: {}) {
   
    return  await this.productService.Create({})
  }
}
