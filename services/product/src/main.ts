import { NestFactory } from '@nestjs/core';
import { AppModule } from './product.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
async function bootstrap() {
  // entry point for microservice, create a grpc server
  // 127.0.0.1:5000 if no host and port provided
  // clients will consume this service via package name
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath:  join(process.cwd(),"../", "../", "libs", 'proto/products.proto'),
    } as MicroserviceOptions,
  });
  await app.listen();
}
bootstrap();
