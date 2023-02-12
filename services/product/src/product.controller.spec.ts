import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('AppController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [ProductController],
        providers: [ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productController.FindOne({ id: "1" })).toStrictEqual({
        id: 1,
        name: 'samsung',
      });
    });
  });
});
