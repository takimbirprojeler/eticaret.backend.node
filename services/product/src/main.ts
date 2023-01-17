import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from "path"
async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
      options: {
    package: 'product',
    protoPath: join(__dirname, 'proto/products.proto'),
  } as MicroserviceOptions,
    
  })
  await app.listen();
}
bootstrap();
