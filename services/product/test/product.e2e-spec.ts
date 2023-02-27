import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from '../src/product.module';
import { ProductService } from '../src/product.service';
import { PriceType } from '@libs/entities/src';
import { ProductController } from '../src/product.controller';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import type {Express} from 'express';


describe('ProductController e2e', () => {
  let app: INestMicroservice | INestMicroservice & { Close: () => void };

  const mockProductService = {
    GetProductById: jest.fn(product=>{
      return {
        id: "1",
        name: "IPhone X",
        brand: "Apple",
        sku: ["1234", "1235"],
        description: "Apple Iphone x, 64gb",
        specs: {
            display: "Super Retina HD, 5.8-inch (diagonal) all-screen OLED Multi-Touch display, HDR",
            resulation: "2436-by-1125-pixel resolution at 458 ppi, 1,000,000:1 contrast ratio (typical)",
            memory: "8gb",
            chipset: "64 bit mimariye sahip A11 Bionic çip,Nöral sistem,tümleşik M11 yardımcı hareket işlemcisi"
        },
        price: {
            type: PriceType.TRY,
            unit: 6.099,
            task: 10,
        },
        category: "1"
      };
    })
  }

  let defn;
  let client;

  beforeAll(()=>{
    defn = protoLoader.loadSync(join(process.cwd(),"../", "../", "libs", 'proto/products.proto'));
    const  proto: any = grpc.loadPackageDefinition(defn).product;
    client = new  proto.ProductController("localhost:5000", grpc.credentials.createInsecure());
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{
        provide: ProductService,
        useValue: mockProductService
      }]
    })
    .compile();

    app = await moduleFixture.createNestMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'product',
        protoPath:  join(process.cwd(),"../", "../", "libs", 'proto/products.proto'),
      } as MicroserviceOptions,
    });
    await app.listen();
  });

  it('/ (GET)', async () => {
    const result = await new Promise(resolve => {
      client.GetProductById({ id: "1" }, (err, res) => {
        resolve(res)
      })
    })
    console.log(result);
  });

  afterAll(()=>{
    app.close();
  })


});

