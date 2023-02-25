import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CacheService } from './cache.service';

@Controller()
export class CacheController {
  constructor(private readonly cacheService: CacheService) { }

  @GrpcMethod()
  async GetCache(token: string): Promise<unknown | null> {

    return this.cacheService.get(token)
  }


  @GrpcMethod()
  async SetCache(data: { token: string, value: unknown, ttl: number }): Promise<string> {
    return this.cacheService.set(data)
  }


  @GrpcMethod()
  async DelCache(token: string) {
    await this.cacheService.del(token)
  }

  @GrpcMethod()
  async ResetCache() {
    this.cacheService.reset()
  }
}
