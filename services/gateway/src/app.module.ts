import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
    {
      name: 'PRODUCT_PACKAGE',
      transport: Transport.GRPC,
      options: {
        package: 'product',
        protoPath: join(__dirname, 'proto/products.proto'),
      },
    },
  ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
