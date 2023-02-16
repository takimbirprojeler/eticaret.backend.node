import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.getHttpAdapter().getInstance().set('json spaces', 2);
  await app.listen(3000);
}
bootstrap();
