import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}


  @GrpcMethod('ProductService') 
  FindOne(data: IProductById): IProduct { 

    console.log(data)
    return this.productService.ProductById(data)
  } //    
}
