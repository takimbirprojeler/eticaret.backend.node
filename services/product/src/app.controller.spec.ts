import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ProductService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ProductService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.FindOne({id: 1})).toMatchObject({"id": 1, "name": "samsung"});
    });
  });
});
