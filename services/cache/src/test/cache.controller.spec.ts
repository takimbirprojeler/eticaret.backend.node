import { Product } from '@libs/entities/src';
import { Test, TestingModule } from '@nestjs/testing';
import { ICache } from 'src/interfaces/cache.interface';
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
    let cache: ICache;
    beforeEach(async () => {
      cache = await cacheController.Get({ id: productStub("1").id }) as ICache
    })

    it("it should call cacheService.get()", () => {
      expect(cacheService.get).toBeCalledWith(cache.product.id)
    })

    it("should return a product from cache", () => {

      expect(cache).toEqual({ product: productStub("1") as Product })
    })

    it("should return products fron cache", async () => {
      expect(await cacheController.Get({ id: "2" })).toEqual({
        products: [productStub("1"), productStub("1")]
      })
    })

    it("should return error", async () => {

      expect(await cacheController.Get({ id: "3" })).toEqual({
        error: {
          message: "Cache not found",
          code: "C1G"
        }
      })
    })

  });

  describe("set()", () => {


    beforeEach(async () => {
      await cacheController.Set({ id: "1", cache: { product: productStub("1") }, ttl: 0 })
    })

    it("should call cacheService.set()", () => {
      expect(cacheService.set).toBeCalledWith({ id: "1", cache: { product: productStub("1") }, ttl: 0 })
      expect(cacheService.set).toBeCalledTimes(1)
    })

  })


  describe("DelCache()", () => {
    beforeEach(async () => {
      await cacheController.Del({ id: "1" })
    })
    it("should call cacheService.del()", () => {


      expect(cacheService.del).toBeCalledTimes(1)
      expect(cacheService.del).toBeCalledWith("1")
    })

  })

  describe("ResetCache()", () => {
    beforeEach(async () => {
      await cacheController.Reset()
    })

    it("should call cacheService.reset()", () => {
      expect(cacheService.reset).toBeCalled()
    })


  })

});
