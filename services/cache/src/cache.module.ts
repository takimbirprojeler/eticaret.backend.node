import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: "redis://localhost:6379"
      }
    })
  ],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheModule { }
