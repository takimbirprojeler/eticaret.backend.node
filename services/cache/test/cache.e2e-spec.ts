import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { CacheModule } from '../src/cache.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

describe('AppController (e2e)', () => {
  let app: INestMicroservice;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CacheModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'cache',
        protoPath: join(process.cwd(), '../', '../', 'libs', 'proto/cache.proto'),
      } as MicroserviceOptions,
    })
    await app.init();
  });

  it('/ (GET)', () => {
    
  });
});
