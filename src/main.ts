import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 1234;
  logger.debug(`API listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
