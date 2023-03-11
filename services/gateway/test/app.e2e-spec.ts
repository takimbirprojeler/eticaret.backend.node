import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as express from 'express';
import type { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as ProtoLoader from '@grpc/proto-loader';
import * as GRPC from '@grpc/grpc-js';
import { expect } from 'chai';
import { ProductModule } from '../../product/src/product.module';
import { Product } from '@libs/entities/src';
import { createClient } from "@nestjs/testing"


interface IProductService {
  findOne: (input: { id: string }) => Product
}


describe('AppController (e2e)', () => {
  let server: Express;
  let app: INestApplication;
  let client: any;

  beforeAll((done) => {
    done();
  });

  beforeEach(async () => {
    server = express();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = module.createNestApplication(new ExpressAdapter(server));
    app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'product',
        url: 'localhost:5001',
        protoPath: 'products.proto',
        loader: {
          includeDirs: [join(__dirname, '../src/proto')],
          keepCase: true,
        },
      },
    });
    await app.startAllMicroservices();
    await app.init();


    client = createClient<IProductService>([join(__dirname, '../src/proto')])
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await new Promise<void>((resolve) => {
      client.findOne({ id: 1 }, (err, result) => {
        expect(err).to.be.null;
        expect(result).to.eql({
          id: 1,
          name: 'samsung',
        });
        resolve();
      });
    });
  });
});
