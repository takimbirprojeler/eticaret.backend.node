import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [

    // register grpc dynamic grpc client as servise
    ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE', // inject token - used to inject this client as service in controllers and other services
      transport: Transport.GRPC, // transporter
      options: {
        package: 'product', // need to match package name in .proto file
        protoPath: join(__dirname, 'proto/products.proto'), // protofile location
      },
    },
  ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
