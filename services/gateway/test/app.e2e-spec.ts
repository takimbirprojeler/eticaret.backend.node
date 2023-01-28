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
import { AppModule } from '../../product/src/product.module';

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
      imports: [AppModule],
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

    const proto = ProtoLoader.loadSync('products.proto', {
      includeDirs: [join(__dirname, '../src/proto')],
    }) as any;

    const protoGRPC = GRPC.loadPackageDefinition(proto) as any;

    client = new protoGRPC.product.ProductController(
      'localhost:5001',
      GRPC.credentials.createInsecure(),
    );
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
