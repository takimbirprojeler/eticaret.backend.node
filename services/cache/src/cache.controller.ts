
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { CacheService } from './cache.service';
import {
  CacheGetErrorResponse,
  CacheGetInput,
  CacheGetResponse,
  CacheSetErrorResponse,
  CacheSetInput,
  CacheSetResponse
} from './interfaces/cache.interface';

@GrpcService()
export class CacheController {
  constructor(private readonly cacheService: CacheService) { }

<<<<<<< Updated upstream
  @GrpcMethod("CacheService", "Get")
  async Get(data: CacheGetInput): Promise<CacheGetResponse | CacheGetErrorResponse> {
    try {
      return await this.cacheService.get(data)
        .then((data) =>
          ({ response: { data: data } }) satisfies CacheGetResponse)
    } catch (e) {
      return {
        response: {
          data: null,
          error: {
            message: "Cache could not be retrived",
            code: "C1G"
          }
        }
      }
    }
  }


  @GrpcMethod("CacheService", "Set")
  async Set(data: CacheSetInput): Promise<CacheSetResponse | CacheSetErrorResponse> {
    try {
      return await this.cacheService.set(data)
        .then((data) =>
          ({
            response: { data: { key: data } }
          }) satisfies CacheSetResponse) as CacheSetResponse
    } catch (e) {
      return {
        response: {
          data: null,
          error: {
            message: "Cache could not be set",
            code: "C1S"
          }
        }
      }
    }
  }


  // @GrpcMethod("CacheService", "Del")
  // async Del(token: string) {
  //   await this.cacheService.del(token)
  // }
=======
  @GrpcMethod("CacheService")
  async GetCache(token: string): Promise<unknown | null> {

    return this.cacheService.get(token)
  }
  
  @GrpcMethod("CacheService")
  async SetCache(data: { token: string, value: unknown, ttl: number }): Promise<string> {
    return this.cacheService.set(data)
  }


  @GrpcMethod("CacheService")
  async DelCache(token: string) {
    await this.cacheService.del(token)
  }
>>>>>>> Stashed changes

  // @GrpcMethod("CacheService", "Reset")
  // async Reset() {
  //   this.cacheService.reset()
  // }
}
