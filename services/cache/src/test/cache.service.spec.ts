import { Product } from '@libs/entities/src';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { productStub } from './stub/product.stub';
import { RedisService, RedisModule, getRedisToken } from '@liaoliaots/nestjs-redis';
import { ICache } from '../interfaces/cache.interface';

import { Redis } from "ioredis"
import { CacheController } from '../cache.controller';
describe('Cache service', () => {
    let cacheService: CacheService
    let get: jest.Mock;
    let set: jest.Mock;
    let del: jest.Mock;
    let flushdb: jest.Mock;
    beforeEach(async () => {


        const mockRedis = {
            set: jest.fn(),
        };

        const mockRedisService = {
            getClient: jest.fn((token: string) => mockRedis),
        };


        get = jest.fn();
        set = jest.fn();
        del = jest.fn();
        flushdb = jest.fn();
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRedisToken('default'),
                    useValue: {
                        get,
                        set,
                        del,
                        flushdb
                    }
                }, CacheService],

        })
            .compile();

        cacheService = moduleRef.get<CacheService>(CacheService);



    });

    it('should be defined', () => {
        expect(cacheService).toBeDefined();

    });

    it("should client defined", () => {
        expect(cacheService.redis).toBeDefined()
    })
    describe("Get()", () => {
        let product: ICache;

        beforeEach(async () => {

            product = await cacheService.get("1")
        })

        it("should call redis.get()", () => {

            expect(cacheService.redis.get).toBeCalledTimes(1)
        })

    });

    describe("Set()", () => {
        let product;

        beforeEach(async () => {

            await cacheService.set({
                id: "1",
                cache: { product: productStub("1") },
                ttl: 60
            })
        })

        it("should call redis.sert()", () => {

            expect(cacheService.redis.set).toBeCalledTimes(1)
        })


    });

    describe("Del()", () => {
        beforeEach(async () => {

            await cacheService.del("1")
        })

        it("should call redis.del()", () => {

            expect(cacheService.redis.del).toBeCalledTimes(1)
        })


    });

    describe("Reset()", () => {

        beforeEach(async () => {

            await cacheService.reset()
        })

        it("should call redis.flushdb()", () => {
            expect(cacheService.redis.flushdb).toBeCalledTimes(1)
        })


    });
});
