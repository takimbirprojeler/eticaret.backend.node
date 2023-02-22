import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as express from 'express';
import type { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as ProtoLoader from '@grpc/proto-loader';
import * as GRPC from '@grpc/grpc-js';
import { expect } from 'chai';
import { GatewayModule } from '../src/gateway.module';
import { GatewayController } from '../src/gateway.controller';
import * as request from 'supertest';
import { ProductMock } from '@libs/constants';
describe('AppController (e2e)', () => {
  let server: Express;
  let app: INestApplication;
  let client: any;

  beforeAll((done) => {
    done();
  });

  beforeEach(async () => {
    server = express();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        GatewayModule,
        ClientsModule.register([
          {
            name: 'PRODUCT_SERVICE', // inject token - used to inject this client as service in controllers and other services
            transport: Transport.GRPC, // transporter
            options: {
              package: 'product', // need to match package name in .proto file
              protoPath: join(process.cwd(),"../", "../", "libs", 'proto/products.proto'), // protofile location
            },
          },
      ])],
        controllers: [GatewayController]
    }).compile();

       app = moduleRef.createNestApplication();
       await app.init();

   
  });

  afterAll(async () => {
    await app.close();
  });

  it('/product/:id (GET) Should? return a product', async () => {
    return request(app.getHttpServer())
      .get('/product/1')
      .expect(200)
      .expect({
        ...ProductMock.productById
      })
  });
});
