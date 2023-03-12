import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { ICacheInput, ICache } from './interfaces/cache.interface';


@Injectable()
export class CacheService {

  private readonly logger = new Logger(CacheService.name);
  constructor(@InjectRedis() readonly redis: Redis) { }

  async get(token: string): Promise<ICache> {

    this.logger.log(`cache get request: ${new Date().toLocaleString()}`)
    try {
      return JSON.parse(await this.redis.get(token)).value;
    } catch (e) {
      return {
        error: {
          message: 'Cache not found',
          code: 'C1G',
        },
      };
    }
  }

  async set(data: ICacheInput) {
    const { id, cache, ttl } = data;
    this.logger.log(`cache set request: ${new Date().toLocaleString()}`)
    await this.redis.set(id, JSON.stringify(cache), 'EX', ttl)
  }

  async del(token: string): Promise<void> {
    this.logger.log(`cache del request: ${new Date().toLocaleString()}`)
    await this.redis.del(token)
  }

  async reset(): Promise<void> {
    this.logger.log(`cache reset request: ${new Date().toLocaleString()}`)
    await this.redis.flushdb()
  }
}
