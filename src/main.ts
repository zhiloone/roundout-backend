import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const port = process.env.PORT || 1234;
  await app.listen(port);
  logger.log(`API listening on port ${port}`);
}
bootstrap();
