
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { CacheService } from './cache.service';
import {
  ICacheInput,
  ICache
} from './interfaces/cache.interface';

@GrpcService()
export class CacheController {
  constructor(private readonly cacheService: CacheService) { }
  @GrpcMethod("CacheService", "Get")
  async Get(data: ICacheInput): Promise<ICache> {
    return await this.cacheService.get(data.id)
  }


  @GrpcMethod("CacheService", "Set")
  async Set(data: ICacheInput): Promise<void> {
    await this.cacheService.set(data)
  }


  @GrpcMethod("CacheService", "Del")
  async Del({ id }: ICacheInput): Promise<void> {
    await this.cacheService.del(id)
  }


  @GrpcMethod("CacheService", "Reset")
  async Reset() {
    await this.cacheService.reset()
  }
}
