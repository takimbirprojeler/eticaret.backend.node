// import { getRedisToken, RedisService } from '@liaoliaots/nestjs-redis';
// import { CacheModule } from '../cache.module';
// import { Test, TestingModule } from '@nestjs/testing';
// import { CacheController } from '../cache.controller';
// import { CacheService } from '../cache.service';
// import { redis } from '../__mocks__/redis';

// describe('Cache module', () => {

//     let moduleRef: TestingModule
//     beforeEach(async () => {
//         moduleRef = await Test.createTestingModule({
//             imports: [
//                 {
//                     module: class CacheModule { },
//                     controllers: [CacheController],
//                     providers: [CacheService, {
//                         provide: getRedisToken("default"),
//                         useValue: redis
//                     }]
//                 }
//             ]
//         }).compile();


//     });

//     it("should CacheModule defined", () => {

//         //expect(moduleRef).toBeDefined()
//     })

//     // it("should have CacheController defined", () => {
//     //     const cacheContoller: CacheController = moduleRef.get(CacheController)
//     //     expect(cacheContoller).toBeDefined()
//     // })

//     // it("should have CacheService defined", () => {
//     //     const cacheService: CacheService = moduleRef.get(CacheService)
//     //     expect(cacheService).toBeDefined()
//     // })

//     // it("should have RedisService defined", async () => {
//     //     const redisService: RedisService = await moduleRef.resolve(getRedisToken('default'))
//     //     expect(redisService).toBeDefined()
//     // })

// });
