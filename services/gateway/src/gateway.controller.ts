import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductController } from '../../product/src/product.controller';
// type definetions of product.proto file



@Controller()
export class GatewayController implements OnModuleInit {
  constructor(
    // inject dynamic grpc client
    @Inject('PRODUCT_SERVICE') private readonly client: ClientGrpc,
  ) { }

  private grpcProductService: ProductController
  onModuleInit() {
    this.grpcProductService =
      this.client.getService<ProductController>('ProductController');
  }

  /**
   *
   * @param id id param forom url /:id
   * @returns { IProduct } product
   */
  @Get('product/:id') // decarotor for GET http method  expose an endpoint at /:id eg localhost:3000/1
  async GetProductById(
    // access param like this
    @Param('id') id: string,
  ) {

    // call method from remote service and get product by id
    return await this.grpcProductService.GetProductById({ id });
  }
}
