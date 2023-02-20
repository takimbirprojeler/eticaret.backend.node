import { NestFactory } from '@nestjs/core';
import { CacheModule } from './cache.module';

async function bootstrap() {
  const app = await NestFactory.create( CacheModule);
  await app.listen(3000);
}
bootstrap();
