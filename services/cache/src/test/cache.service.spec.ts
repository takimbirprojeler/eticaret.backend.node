import { Product } from '@libs/entities/src';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { productStub } from './stub/product.stub';
import { getRedisToken, RedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { redis } from '../__mocks__/redis';

describe('Cache service', () => {
    let cacheService: CacheService


    beforeEach(async () => {

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [CacheService,
                {
                    provide: getRedisToken('default'),
                    useValue: {
                        ...redis,

                    }
                }
            ],
        }).compile();

        cacheService = moduleRef.get<CacheService>(CacheService);

    });

    it('should be defined', () => {
        expect(cacheService).toBeDefined();

    });

    it("should client defined", () => {
        expect(cacheService.redis).toBeDefined()
    })
    describe("Get()", () => {
        let product: Promise<unknown | null>;
        
        beforeEach(async () => {
            cacheService.get = jest.fn().mockImplementation(async (token: string) => {

                try {
                    return JSON.parse(await redis.get(token)).value
                } catch {
                    return null
                }
            })
            product = cacheService.get(productStub("1").id)
        })

        it("should call redis.get()", () => {
            const spy = jest.spyOn(cacheService.redis, "get")
            expect(spy).toBeCalledTimes(1)
        })

        it("should return a value if item exist", () => {
            expect(product).resolves.toEqual(productStub("1"))
        })


        it("should return null if item doesnt exist", () => {
            expect(cacheService.get("2")).resolves.toEqual(null)
        })



    });

    describe("Set()", () => {
        let product;

        beforeEach(async () => {

            product = cacheService.set({
                token: "1",
                value: productStub("1"),
                ttl: 60
            })
        })

        it("should call redis.get()", () => {
            const spy = jest.spyOn(cacheService.redis, "set")
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith("1", JSON.stringify({ value: productStub("1") }), "EX", 60)
        })


        it("should return a value", () => {

            expect(product).resolves.toEqual("1")
        })
    });



    describe("Del()", () => {
        let product;

        beforeEach(async () => {

            product = cacheService.del("1")
        })

        it("should call redis.del()", () => {
            const spy = jest.spyOn(cacheService.redis, "del")
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith("1")
        })


        it("should return resolve", () => {

            expect(product).resolves.not.toThrowError()
        })



    });

    describe("Reset()", () => {
        let product;

        beforeEach(async () => {

            product = cacheService.reset()
        })

        it("should call redis.flushall()", () => {
            const spy = jest.spyOn(cacheService.redis, "flushall")
            expect(spy).toBeCalledTimes(1)
        })


        it("should return resolve", () => {

            expect(product).resolves.not.toThrowError()
        })
    });
});
