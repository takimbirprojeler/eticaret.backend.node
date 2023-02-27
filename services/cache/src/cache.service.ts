import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { CacheSetInput } from './interfaces/cache.interface';
@Injectable()
export class CacheService {

  constructor(@InjectRedis() readonly redis: Redis) { }

<<<<<<< Updated upstream
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
=======
  async get(token: string): Promise<unknown | null> {
    try {
      return JSON.parse(await this.redis.get(token)).value;
    } catch (e) {
      return null;
    }
  }

  async set(data: { token: string, value: unknown, ttl: number }) {
    const { token, value, ttl } = data;
    await this.redis.set(token, JSON.stringify({ value }), "EX", ttl);
    return token;
  }

  async del(token: string): Promise<void> {
    await this.redis.del(token);
  }

  async reset(): Promise<void> {
    await this.redis.flushall();
  }
>>>>>>> Stashed changes

}
