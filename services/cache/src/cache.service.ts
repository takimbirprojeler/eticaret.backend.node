import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  getHello(): string {
    return 'Hello World!';
  }
}
