import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService, DEFAULT_REDIS_NAMESPACE, InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
@Injectable()
export class CacheService {


  constructor(@InjectRedis() readonly redis: Redis) { }



  async get(token: string): Promise<unknown | null> {
    try {
      return JSON.parse(await this.redis.get(token)).value
    } catch { return null }

  }

  async set(data: { token: string, value: unknown, ttl: number }) {
    const { token, value, ttl } = data
    await this.redis.set(token, JSON.stringify({ value }), "EX", ttl)
    return token
  }

  async del(token: string): Promise<void> {
    await this.redis.del(token)
  }

  async reset(): Promise<void> {
    await this.redis.flushall()
  }

}
