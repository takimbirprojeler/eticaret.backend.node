import { Controller, Get, OnModuleInit, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppService } from './app.service';


export interface IGrpcService {
  findOne(data: {id: number}): {id: number, name: string};
}


@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  private grpcService: IGrpcService;
   onModuleInit() {   
    this.grpcService = this.client.getService<IGrpcService>('ProductService'); 
  }                                                                       


  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, './proto/products.proto'),
    }
  }) // <-- Add
  private client: ClientGrpc;  // <-- this
  @Get(":id")
  getProduct(
    @Param("id") id: number
  ): { id: number, name: string} {
    return this.grpcService.findOne({ id })
  }
}
