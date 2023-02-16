import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller()
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get()
  getHello(): string {
    return this.cacheService.getHello();
  }
}
