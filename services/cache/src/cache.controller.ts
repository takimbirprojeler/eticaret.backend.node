
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

  // @GrpcMethod("CacheService", "Reset")
  // async Reset() {
  //   this.cacheService.reset()
  // }
}
