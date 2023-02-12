import { Product } from '@libs/entities';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';


@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod()
  async FindOne({id }: { id: string }): Promise<Product> {
    return await this.productService.GetProductById(id);
  }
}
