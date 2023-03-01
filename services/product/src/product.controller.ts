import { Product } from '@libs/entities';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';


@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @GrpcMethod()
  async GetProductById({ id }: { id: string }): Promise<{ data?: Product, error?: { message: string, code: string } }> {

    try {
      const data = await this.productService.GetProductById(id)
      return {
        data

      }
    } catch (error) {
      return {
        error: {
          message: `Product with id: ${id} not found`,
          code: "P1N" // proudct not found error code // todo implement this
        }
      }
    }
  }
}
