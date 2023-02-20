import { Test, TestingModule } from '@nestjs/testing';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';

describe('AppController', () => {
  let cacheController: CacheController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CacheController],
      providers: [CacheService],
    }).compile();

    cacheController = app.get<CacheController>(CacheController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cacheController.getHello()).toBe('Hello World!');
    });
  });
});
