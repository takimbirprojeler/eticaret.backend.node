import { Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductService } from '../../product/src/product.service';
// type definetions of product.proto file



@Controller()
export class GatewayController implements OnModuleInit {
  constructor(
    // inject dynamic grpc client
    @Inject('PRODUCT_SERVICE') private readonly client: ClientGrpc,
  ) {}

  private grpcService: ProductService;
  onModuleInit() {
      this.grpcService =
      this.client.getService<ProductService>('ProductController');
  }
  /**
   *
   * @param id id param forom url /:id
   * @returns { data: Product } product
   */
  @Get(':id') // decarotor for GET http method  expose an endpoint at /:id eg localhost:3000/1
  async getProduct(
    // access param like this
    @Param('id') id: string
  ) {
    // call method from remote service and get product by id
    return this.grpcService.FindById({ id });
  }

  @Post("/")
  async create(data: {}) {

    return  await this.grpcService.Create({});
  }

}
