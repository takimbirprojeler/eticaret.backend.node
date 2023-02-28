import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { ICacheInput, ICache } from './interfaces/cache.interface';
@Injectable()
export class CacheService {

  constructor(@InjectRedis() readonly redis: Redis) { }


  async get(token: string): Promise<ICache> {
    try {
      return JSON.parse(await this.redis.get(token)).value;
    } catch (e) {
      return {
        error: {
          message: "Cache not found",
          code: "C1G"
        }
      };
    }
  }

  async set(data: ICacheInput) {
    const { id, cache, ttl } = data;
    await this.redis.set(id, JSON.stringify(cache), "EX", ttl);
  }

  async del(token: string): Promise<void> {
    await this.redis.del(token);
  }

  async reset(): Promise<void> {
    await this.redis.flushall();
  }
}
