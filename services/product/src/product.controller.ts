import { Product } from '@libs/entities';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';


@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @GrpcMethod()
  async GetProductById({ id }: { id: string }): Promise<Product> {
    return {
      id: "1",
      name: "IPhone X"
    }
    return await this.productService.GetProductById(id);
  }
}
