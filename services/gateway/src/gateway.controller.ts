import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

// type definetions of product.proto file

export interface IProduct {
  id: number;
  name: string;
}

export interface IProductService {
  findOne(data: { id: number }): IProduct;
}

@Controller()
export class GatewayController implements OnModuleInit {
  constructor(
    // inject dynamic grpc client
    @Inject('PRODUCT_SERVICE') private readonly client: ClientGrpc,
  ) {}

  private grpcService: IProductService;
  onModuleInit() {
    this.grpcService =
      this.client.getService<IProductService>('ProductController');
  }

  /**
   *
   * @param id id param forom url /:id
   * @returns { IProduct } product
   */
  @Get(':id') // decarotor for GET http method  expose an endpoint at /:id eg localhost:3000/1
  getProduct(
    // access param like this
    @Param('id') id: number,
  ): { id: number; name: string } {
    // call method from remote service and get product by id
     return this.grpcService.findOne({ id });
  }
}
