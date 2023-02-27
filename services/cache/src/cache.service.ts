import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { CacheSetInput } from './interfaces/cache.interface';
@Injectable()
export class CacheService {


  constructor(@InjectRedis() readonly redis: Redis) { }

  async get(data: { key: string }): Promise<Cache> {

    try {
      return await JSON.parse(await this.redis.get(data.key)).value as Cache
    } catch (error) {

      throw new Error("cache not fould")
    }
  }

  async set(data: CacheSetInput) {
    const { key, cache, ttl } = data
    await this.redis.set(key, JSON.stringify({ cache }), "EX", ttl)
    return key
  }

  // async del(token: string): Promise<void> {
  //   await this.redis.del(token)
  // }

  // async reset(): Promise<void> {
  //   await this.redis.flushall()
  // }

}
