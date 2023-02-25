import { Product } from '@libs/entities/src';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheController } from '../cache.controller';
import { CacheService } from '../cache.service';
import { productStub } from './stub/product.stub';

jest.mock("../cache.service")
describe('Cache controller', () => {
  let cacheController: CacheController;
  let cacheService: CacheService
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CacheController],
      providers: [CacheService],
    }).compile();

    cacheController = moduleRef.get<CacheController>(CacheController);
    cacheService = moduleRef.get<CacheService>(CacheService);
    jest.clearAllMocks();
  });

  describe("GetCache()", () => {
    let product: Product;
    beforeEach(async () => {
      product = await cacheController.GetCache(productStub("1").id)
    })

    it("it should call cacheService", () => {
      expect(cacheService.get).toBeCalledWith(product.id)
    })

    it("should return a product from cache", () => {
      expect(product).toEqual(productStub("1"))
    })

    it("should return null if item does not exist in cache", () => {
      expect(cacheController.GetCache("2")).toEqual(Promise.resolve(null))
    })
  });

  describe("setCache()", () => {
    let token: string;

    beforeEach(async () => {
      token = await cacheController.SetCache({ token: "1", value: productStub("1"), ttl: 0 })
    })

    it("should call cacheService.set()", () => {
      const spy = jest.spyOn(cacheService, 'set');
      expect(spy).toBeCalledWith({ token: "1", value: productStub("1"), ttl: 0 })
      expect(spy).toBeCalledTimes(1)
    })



    it("should return token", () => {
      expect(token).toEqual("1")
    })

  })


  describe("DelCache()", () => {
    let result: undefined | void
    beforeEach(async () => {
      result = await cacheController.DelCache("1")
    })
    it("should call cacheService.del()", () => {
      const spy = jest.spyOn(cacheService, 'del');

      expect(spy).toBeCalled()
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith("1")
    })

    it("should delete cache, and return void", () => {
      expect(result).toBeUndefined()
    })
  })

  describe("ResetCache()", () => {
    let result: undefined | void
    beforeEach(async () => {
      result = await cacheController.ResetCache()
    })

    it("should call cacheService.reset()", () => {
      const spy = jest.spyOn(cacheService, 'reset');
      expect(spy).toBeCalled()
      expect(spy).toBeCalledTimes(1)
    })

    it("should delete all cache, and return void", () => {
      expect(result).toBeUndefined()
    })
  })

});
